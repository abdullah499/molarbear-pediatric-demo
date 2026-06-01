/* global React */
const { useState: useRevState, useMemo: useRevMemo } = React;

// ============================================================
// REVIEWS PAGE — aggregator + capture flow
// ============================================================

const REVIEWS = [
  { id: 1, src: "google", rating: 5, name: "Priya M.", role: "Mom of two (4 & 7)", date: "2 weeks ago", body: "First dental visit ever for our 4-year-old and she literally asked when we get to go back. The 'tooth count' game was genius and the hygienist let her hold the suction. We left with a sticker collection and zero tears. Booking a sibling visit next week.", verified: true, tags: ["First visit", "Anxiety"] },
  { id: 2, src: "google", rating: 5, name: "Daniel K.", role: "Dad of one (9)", date: "1 month ago", body: "Our son has sensory sensitivities and previous dentists didn't get it. Dr. Maren spent 20 minutes just letting him touch every instrument before starting. Front desk had noise-cancelling headphones ready without us even asking. This is what pediatric care should be.", verified: true, tags: ["Sensory", "Special needs"] },
  { id: 3, src: "healthgrades", rating: 5, name: "Tasha B.", role: "Mom of three", date: "3 weeks ago", body: "Insurance verification took one hour like they promised. The written estimate matched the final bill TO THE DOLLAR. After years of dental surprise bills with our old practice this felt almost suspicious. It wasn't. Just well-run.", verified: true, tags: ["Insurance", "Billing"] },
  { id: 4, src: "yelp", rating: 4, name: "Marcus W.", role: "Dad of two", date: "2 months ago", body: "Genuinely warm staff and the office is gorgeous — feels more like a kids' museum than a dental office. Only ding: parking at the Downtown Den can be tricky weekday mornings. Westside is easier if you have flexibility.", verified: true, tags: ["Locations"] },
  { id: 5, src: "google", rating: 5, name: "Lin O.", role: "Mom of one (5)", date: "1 week ago", body: "First filling for our daughter. She was terrified. They used 'sleepy juice' (nitrous), let her pick the show on the ceiling tv, and gave her a tiny tooth pillow to hold. She fell asleep halfway through. Walked out asking for ice cream. Wild.", verified: true, tags: ["Sedation", "Filling"] },
  { id: 6, src: "google", rating: 5, name: "Sam R.", role: "Foster parent", date: "3 weeks ago", body: "I foster medically complex kids and Molar Bear is the only practice that has consistently been on time, communicated clearly with our case managers, and accepted Medicaid without making us feel like second-class patients. They are the gold standard.", verified: true, tags: ["Medicaid", "Special needs"] },
  { id: 7, src: "healthgrades", rating: 5, name: "Jenny T.", role: "Mom of one (2)", date: "5 days ago", body: "Knee-to-knee exam for our toddler at her first visit. Dr. Wynn explained every single step in a calm voice that worked on both my kid AND me. We got the full picture (no early decay! teeth coming in straight) without a single tear.", verified: true, tags: ["First visit", "Toddler"] },
  { id: 8, src: "google", rating: 4, name: "Pat L.", role: "Dad of three", date: "1 month ago", body: "Took some scheduling acrobatics to get three siblings done back-to-back but the front desk made it work. They even paused between kids so the next one could 'inspect' the room. The wait list email is responsive — we got bumped up twice.", verified: true, tags: ["Family", "Scheduling"] },
  { id: 9, src: "yelp", rating: 5, name: "Cara D.", role: "Mom of one (11)", date: "2 weeks ago", body: "Took my 11-year-old for an ortho screening. Dr. Maren said her bite was fine and we didn't need braces yet — could've upsold us easily and didn't. That earned my loyalty for the next ten years.", verified: true, tags: ["Ortho", "Honesty"] },
];

const STATS = {
  total: 487,
  avg: 4.92,
  google: { count: 312, avg: 4.9 },
  healthgrades: { count: 98, avg: 5.0 },
  yelp: { count: 77, avg: 4.8 },
};

const SOURCE_META = {
  google: { name: "Google", color: "#F4845F", letter: "G" },
  yelp: { name: "Yelp", color: "#c75a3a", letter: "Y" },
  healthgrades: { name: "Healthgrades", color: "#6FCFB2", letter: "H" },
};

// ============================================================
// STAR ROW
// ============================================================
function Stars({ rating, size = 16 }) {
  return (
    <div style={{ display: "inline-flex", gap: 2 }} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
          <path d="M12 2 L14.9 8.6 L22 9.5 L16.8 14.4 L18.2 21.5 L12 18 L5.8 21.5 L7.2 14.4 L2 9.5 L9.1 8.6 Z"
            fill={n <= Math.round(rating) ? "#F2C94C" : "rgba(42,24,16,0.15)"}
            stroke="#2A1810" strokeWidth="1" strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  );
}

// ============================================================
// HERO + AGGREGATE
// ============================================================
function ReviewsHero() {
  return (
    <section style={{ paddingTop: 56, paddingBottom: 40, position: "relative", overflow: "hidden" }} data-screen-label="01 Reviews hero">
      <div style={{ position: "absolute", top: -120, right: "-10%", width: 520, height: 520, borderRadius: "50%", background: "#FBEED4", filter: "blur(60px)", opacity: 0.7, pointerEvents: "none" }} />
      <div className="container" style={{ position: "relative" }}>
        <div style={{ maxWidth: 820 }}>
          <div className="eyebrow">From real Molar Bear families</div>
          <h1 style={{ fontSize: "clamp(48px, 6.5vw, 92px)", lineHeight: 0.95, marginTop: 16, letterSpacing: "-0.025em" }}>
            487 parents have <span className="wavy">said it before.</span>
          </h1>
          <p style={{ marginTop: 22, fontSize: 19, color: "#4a3326", maxWidth: 640 }}>
            All reviews pulled directly from Google, Healthgrades, and Yelp. We don't edit them, sort them, or pay for them.
          </p>
        </div>

        {/* Aggregate card */}
        <div style={{ marginTop: 40, background: "#fff", border: "2px solid #2A1810", borderRadius: 28, boxShadow: "10px 10px 0 #2A1810", padding: 32, display: "grid", gridTemplateColumns: "1fr 2fr", gap: 36 }} className="agg-card">
          {/* Big number */}
          <div style={{ borderRight: "1px dashed rgba(42,24,16,0.2)", paddingRight: 36 }} className="agg-big">
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 84, lineHeight: 1 }}>{STATS.avg}</div>
              <div style={{ fontSize: 22, color: "#7a3e22" }}>/ 5</div>
            </div>
            <div style={{ marginTop: 6 }}>
              <Stars rating={STATS.avg} size={22} />
            </div>
            <div style={{ marginTop: 12, fontSize: 14, color: "#4a3326" }}>
              <strong>{STATS.total} verified reviews</strong> across three platforms · last 24 months
            </div>
          </div>

          {/* Per-source */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="src-grid">
            {Object.entries(STATS).filter(([k]) => SOURCE_META[k]).map(([k, v]) => {
              const meta = SOURCE_META[k];
              return (
                <div key={k} style={{ background: "#FBEED4", borderRadius: 16, padding: 18, border: "1px solid rgba(42,24,16,0.1)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: meta.color, color: "#2A1810", border: "2px solid #2A1810", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>{meta.letter}</div>
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>{meta.name}</div>
                      <div style={{ fontSize: 11, color: "#7a3e22", fontFamily: "var(--font-mono)" }}>{v.count} REVIEWS</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Stars rating={v.avg} />
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>{v.avg}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .agg-card { grid-template-columns: 1fr !important; }
            .agg-big { border-right: 0 !important; border-bottom: 1px dashed rgba(42,24,16,0.2); padding-right: 0 !important; padding-bottom: 24px; }
            .src-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

// ============================================================
// FILTER STRIP + REVIEW WALL
// ============================================================
function ReviewWall() {
  const [src, setSrc] = useRevState("all");
  const [tag, setTag] = useRevState("all");

  const allTags = useRevMemo(() => {
    const s = new Set();
    REVIEWS.forEach((r) => r.tags.forEach((t) => s.add(t)));
    return ["all", ...Array.from(s)];
  }, []);

  const filtered = useRevMemo(() => REVIEWS.filter((r) => {
    if (src !== "all" && r.src !== src) return false;
    if (tag !== "all" && !r.tags.includes(tag)) return false;
    return true;
  }), [src, tag]);

  const sourceTabs = [
    { id: "all", label: "All sources" },
    { id: "google", label: "Google" },
    { id: "healthgrades", label: "Healthgrades" },
    { id: "yelp", label: "Yelp" },
  ];

  return (
    <section style={{ paddingTop: 24 }} data-screen-label="02 Review wall">
      <div className="container">
        {/* Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {sourceTabs.map((t) => (
              <button key={t.id} onClick={() => setSrc(t.id)} style={{
                padding: "10px 16px",
                borderRadius: 999,
                border: `2px solid ${src === t.id ? "#2A1810" : "rgba(42,24,16,0.15)"}`,
                background: src === t.id ? "#2A1810" : "#fff",
                color: src === t.id ? "#FFF6E8" : "#2A1810",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                transition: "all 0.12s",
              }}>{t.label}</button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#7a3e22" }}>
            <span style={{ fontFamily: "var(--font-mono)" }}>TOPIC</span>
            <select value={tag} onChange={(e) => setTag(e.target.value)} style={{
              padding: "8px 14px",
              borderRadius: 999,
              border: "2px solid rgba(42,24,16,0.15)",
              background: "#fff",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 14,
            }}>
              {allTags.map((t) => <option key={t} value={t}>{t === "all" ? "Any topic" : t}</option>)}
            </select>
          </div>
        </div>

        {/* Masonry-ish wall */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="wall-grid">
          {filtered.map((r) => {
            const meta = SOURCE_META[r.src];
            return (
              <article key={r.id} style={{
                background: "#fff",
                border: "2px solid #2A1810",
                borderRadius: 22,
                padding: 24,
                boxShadow: "6px 6px 0 #2A1810",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}>
                {/* Source ribbon */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 10px", background: meta.color, color: "#2A1810", borderRadius: 999, border: "2px solid #2A1810", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, letterSpacing: 0.5 }}>
                    <span style={{ width: 18, height: 18, borderRadius: 6, background: "#fff", display: "grid", placeItems: "center", fontSize: 11 }}>{meta.letter}</span>
                    {meta.name}
                  </div>
                  {r.verified && <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#4ea98e", letterSpacing: 1.2 }}>✓ VERIFIED</div>}
                </div>

                {/* Stars + date */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Stars rating={r.rating} />
                  <div style={{ fontSize: 11, color: "#7a3e22", fontFamily: "var(--font-mono)", letterSpacing: 0.4 }}>{r.date.toUpperCase()}</div>
                </div>

                {/* Body */}
                <p style={{ fontSize: 14.5, color: "#2A1810", lineHeight: 1.55, flex: 1 }}>"{r.body}"</p>

                {/* Reviewer */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 12, borderTop: "1px dashed rgba(42,24,16,0.15)" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: meta.color, border: "2px solid #2A1810", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "#2A1810", flexShrink: 0 }}>{r.name.split(" ").map((w) => w[0]).join("")}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14 }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: "#7a3e22" }}>{r.role}</div>
                  </div>
                </div>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {r.tags.map((t) => (
                    <button key={t} onClick={() => setTag(t)} style={{ padding: "4px 10px", background: "#FBEED4", border: "1px solid rgba(42,24,16,0.1)", borderRadius: 999, fontSize: 11, fontFamily: "var(--font-display)", fontWeight: 600, color: "#7a3e22", cursor: "pointer" }}>#{t}</button>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 24px", color: "#7a3e22" }}>
            No reviews match those filters yet. Try widening up.
          </div>
        )}

        <div style={{ marginTop: 32, textAlign: "center" }}>
          <button className="btn btn-ghost">Load 12 more reviews</button>
        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) {
          .wall-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .wall-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// SHARE YOUR STORY — capture flow
// ============================================================
function CaptureFlow() {
  const [step, setStep] = useRevState(1);
  const [rating, setRating] = useRevState(0);
  const [hover, setHover] = useRevState(0);
  const [where, setWhere] = useRevState("");

  if (step === 3) {
    return (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div style={{ display: "inline-grid", placeItems: "center", width: 80, height: 80, borderRadius: "50%", background: "#6FCFB2", border: "3px solid #2A1810", boxShadow: "5px 5px 0 #2A1810", marginBottom: 18 }}>
          <span style={{ fontSize: 38 }}>💛</span>
        </div>
        <h3 style={{ fontSize: 26 }}>Off you go!</h3>
        <p style={{ marginTop: 10, fontSize: 15, color: "#4a3326", maxWidth: 380, marginInline: "auto" }}>
          We're opening {where || "your chosen platform"} in a new tab. Thanks for taking the 2 minutes — it genuinely keeps our small practice going.
        </p>
        <button onClick={() => { setStep(1); setRating(0); setWhere(""); }} className="btn btn-ghost" style={{ marginTop: 22 }}>Send another</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.4, color: "#7a3e22", textAlign: "center" }}>STEP {step} OF 2</div>

      {step === 1 && (
        <div>
          <h3 style={{ fontSize: 26, textAlign: "center", marginTop: 8 }}>How was your visit?</h3>
          <div style={{ marginTop: 24, display: "flex", justifyContent: "center", gap: 8 }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)} onClick={() => setRating(n)} style={{
                background: "transparent", border: 0, cursor: "pointer", padding: 4,
              }} aria-label={`${n} stars`}>
                <svg width="52" height="52" viewBox="0 0 24 24" style={{ transition: "transform 0.12s", transform: hover === n || rating === n ? "scale(1.1)" : "scale(1)" }}>
                  <path d="M12 2 L14.9 8.6 L22 9.5 L16.8 14.4 L18.2 21.5 L12 18 L5.8 21.5 L7.2 14.4 L2 9.5 L9.1 8.6 Z"
                    fill={n <= (hover || rating) ? "#F2C94C" : "#fff"}
                    stroke="#2A1810" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
          <div style={{ marginTop: 16, textAlign: "center", fontSize: 13, color: "#7a3e22", minHeight: 20 }}>
            {rating === 5 && "Amazing — please share that!"}
            {rating === 4 && "So glad. We'd love to hear what to improve."}
            {rating > 0 && rating < 4 && "Sorry to hear it. Let's talk privately — no public post needed."}
          </div>

          <div style={{ marginTop: 22, textAlign: "right" }}>
            <button disabled={rating === 0} onClick={() => setStep(2)} className="btn btn-coral" style={{ opacity: rating ? 1 : 0.4 }}>
              Next →
            </button>
          </div>
        </div>
      )}

      {step === 2 && rating >= 4 && (
        <div>
          <h3 style={{ fontSize: 24, textAlign: "center", marginTop: 8 }}>Where would you like to post it?</h3>
          <p style={{ textAlign: "center", color: "#7a3e22", fontSize: 13, marginTop: 6 }}>We'll open your chosen platform — review stays yours, in your own words.</p>

          <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }} className="post-grid">
            {Object.entries(SOURCE_META).map(([k, m]) => (
              <button key={k} onClick={() => setWhere(m.name)} style={{
                background: where === m.name ? m.color : "#fff",
                border: `2px solid ${where === m.name ? "#2A1810" : "rgba(42,24,16,0.15)"}`,
                borderRadius: 16,
                padding: 16,
                cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                transition: "all 0.12s",
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "#fff", border: "2px solid #2A1810", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>{m.letter}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14 }}>{m.name}</div>
              </button>
            ))}
          </div>

          <div style={{ marginTop: 22, display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => setStep(1)} className="btn btn-ghost">← Back</button>
            <button disabled={!where} onClick={() => setStep(3)} className="btn btn-coral" style={{ opacity: where ? 1 : 0.4 }}>Take me there →</button>
          </div>
        </div>
      )}

      {step === 2 && rating < 4 && (
        <div>
          <h3 style={{ fontSize: 24, textAlign: "center", marginTop: 8 }}>Help us fix it first.</h3>
          <p style={{ textAlign: "center", color: "#4a3326", fontSize: 14, marginTop: 8, maxWidth: 460, marginInline: "auto" }}>
            Public reviews shouldn't be how feedback finds us. Tell our practice manager directly and we'll make it right — same day where we can.
          </p>
          <div style={{ marginTop: 18 }}>
            <textarea rows={4} placeholder="What happened? Anything we should know..." style={{ width: "100%", padding: 14, borderRadius: 14, border: "2px solid rgba(42,24,16,0.15)", fontSize: 14, fontFamily: "var(--font-body)" }} />
          </div>
          <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <button onClick={() => setStep(1)} className="btn btn-ghost">← Back</button>
            <button onClick={() => { setWhere("our practice manager"); setStep(3); }} className="btn btn-coral">Send privately →</button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 480px) {
          .post-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function ShareYourStory() {
  return (
    <section style={{ background: "#FBEED4" }} data-screen-label="03 Share your story">
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
        <div className="share-text">
          <div className="eyebrow">Already came in?</div>
          <h2 style={{ fontSize: "clamp(36px, 4.5vw, 56px)", marginTop: 12 }}>Tell the next family.</h2>
          <p style={{ marginTop: 16, fontSize: 17, color: "#4a3326", maxWidth: 520 }}>
            Reviews are how new families find us — most pediatric practices live or die by Google. If your visit went well, two minutes here helps a future cub.
          </p>
          <ul style={{ marginTop: 20, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "We never edit, gate, or filter reviews",
              "Negative feedback goes to our manager privately",
              "All public reviews are HIPAA-aware — leave out specifics",
            ].map((b, i) => (
              <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "#2A1810" }}>
                <div style={{ width: 22, height: 22, borderRadius: 999, background: "#6FCFB2", border: "1.5px solid #2A1810", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>✓</div>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ background: "#fff", border: "2px solid #2A1810", borderRadius: 28, padding: 30, boxShadow: "10px 10px 0 #2A1810" }}>
          <CaptureFlow />
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          section[data-screen-label="03 Share your story"] .container { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// PRESS / RECOGNITION
// ============================================================
function PressStrip() {
  const items = [
    { label: "Local Parents Mag", quote: "Best pediatric dentist 2024 & 2025" },
    { label: "City Health Bd.", quote: "Provider of Excellence" },
    { label: "AAPD member", quote: "Board-certified pediatric specialists" },
    { label: "ADA accredited", quote: "Full digital + sedation accreditation" },
  ];
  return (
    <section className="compact" data-screen-label="04 Press strip">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }} className="press-grid">
          {items.map((p, i) => (
            <div key={i} style={{ background: "#fff", border: "1px dashed rgba(42,24,16,0.25)", borderRadius: 18, padding: 20 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 1.4, color: "#7a3e22" }}>RECOGNIZED BY</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, marginTop: 6 }}>{p.label}</div>
              <div style={{ fontSize: 13, color: "#4a3326", marginTop: 8 }}>"{p.quote}"</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .press-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .press-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ============================================================
// PAGE
// ============================================================
function ReviewsPage() {
  return (
    <>
      <ReviewsHero />
      <ReviewWall />
      <PressStrip />
      <ShareYourStory />
    </>
  );
}

Object.assign(window, { ReviewsPage });

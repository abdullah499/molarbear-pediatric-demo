/* global React, BearMascot */
const { useState } = React;

// ============================================================
// HERO
// ============================================================
function JourneyHero({ onBookClick }) {
  return (
    <section style={{ paddingTop: 56, paddingBottom: 40, position: "relative", overflow: "hidden" }} data-screen-label="01 Journey hero">
      <div style={{ position: "absolute", top: 60, right: -120, width: 360, height: 360, borderRadius: "50%", background: "#FBEED4", filter: "blur(40px)", opacity: 0.7, pointerEvents: "none" }} />
      <div className="container journey-hero" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 48, alignItems: "center" }}>
        <div>
          <div className="eyebrow">Helping patients · 1 of 4</div>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 76px)", lineHeight: 0.98, marginTop: 14, letterSpacing: "-0.03em" }}>
            See exactly what happens, <span className="wavy">step by step.</span>
          </h1>
          <p style={{ marginTop: 22, fontSize: 19, maxWidth: 560, color: "#4a3326" }}>
            Most parents tell us the unknown is the scariest part. So we drew the whole journey — from the first phone call to the post-visit treat — and laid every common treatment side by side so you can compare.
          </p>
          <div style={{ marginTop: 26, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#visualizer" className="btn btn-coral">Walk the journey ↓</a>
            <a href="#compare" className="btn btn-ghost">Compare treatments</a>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ background: "#6FCFB2", borderRadius: 32, aspectRatio: "1/1", border: "3px solid #2A1810", boxShadow: "10px 10px 0 #2A1810", display: "grid", placeItems: "center", padding: 24 }}>
            <BearMascot pose="tooth" size={260} />
          </div>
          <div style={{ position: "absolute", top: -14, right: -14, transform: "rotate(8deg)" }}>
            <div className="sticker" style={{ background: "#F2C94C" }}>🗺️ 6 steps · ~45 min</div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .journey-hero { grid-template-columns: 1fr !important; }
          .journey-hero > div:last-child { max-width: 320px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// JOURNEY VISUALIZER — interactive 6-step path
// ============================================================
const JOURNEY_STEPS = [
  { id: 0, icon: "📞", title: "Book", time: "5 min", color: "#FBEED4",
    short: "Online or call. We pre-verify insurance before you arrive.",
    detail: "Pick a time at any of our 3 locations. We text a confirmation + a short intake form. Your insurance is verified in the background so there are no surprises at the desk.",
    parent: "What you do: pick a slot, fill the form.",
    kid: "What your kid sees: nothing yet — just hears 'we have a fun dentist visit coming up'." },
  { id: 1, icon: "👋", title: "Arrive", time: "10 min", color: "#FFE9DF",
    short: "Walk-through, meet the team, choose your treasure-chest toy.",
    detail: "Kids get a tour of the chair, the suction wand ('Mr. Slurpy'), and the overhead light. They press the buttons. They sit in the chair. They get a sticker. Zero examination pressure on visit one if they're not ready.",
    parent: "What you do: check in at the front desk, get coffee.",
    kid: "What your kid sees: a big sea-themed waiting room with a fish tank. A friendly hygienist who lets them touch every tool." },
  { id: 2, icon: "🔍", title: "Examine", time: "10 min", color: "#E8F6F0",
    short: "Gentle count, photos, sometimes one digital x-ray.",
    detail: "We use a small handheld camera + low-dose digital x-ray only when clinically indicated. The doctor talks through everything on a screen with you and your kid. No surprises.",
    parent: "What you do: sit chairside, see what we see on the monitor.",
    kid: "What your kid sees: a cool flashlight, a tiny mirror, fun pictures of their own teeth on the TV." },
  { id: 3, icon: "🪥", title: "Clean", time: "12 min", color: "#F1ECFF",
    short: "Soft polish, sweep, fluoride varnish in their flavor of choice.",
    detail: "We skip the ultrasonic scaler unless we need it. Polishing paste comes in bubblegum, watermelon, or cookie dough. Fluoride varnish is brushed on in 30 seconds and tastes like nothing.",
    parent: "What you do: hang out. Maybe take a picture.",
    kid: "What your kid sees: 'tooth tickling' and getting to pick their flavor." },
  { id: 4, icon: "🗒️", title: "Plan", time: "5 min", color: "#FBEED4",
    short: "Doctor walks you through findings + any next steps, in plain English.",
    detail: "If there's something to address (a small cavity, a sealant opportunity, an ortho check) we show you exactly what we see, what the options are, and what each costs after insurance. Nothing scheduled in a rush.",
    parent: "What you do: ask questions. We expect a lot of them.",
    kid: "What your kid sees: doctor showing them their own tooth on the big screen." },
  { id: 5, icon: "🎁", title: "Celebrate", time: "3 min", color: "#FFE9DF",
    short: "Treasure chest, sticker pack, brushing kit to take home.",
    detail: "Every visit ends with a small ritual: pick a toy from the treasure chest, get a new toothbrush in their color of choice, and a sticker for the wall of fame.",
    parent: "What you do: head out with a follow-up scheduled.",
    kid: "What your kid sees: A WIN. They want to come back." },
];

function JourneyVisualizer() {
  const [active, setActive] = useState(0);
  const step = JOURNEY_STEPS[active];

  return (
    <section id="visualizer" style={{ paddingTop: 80, paddingBottom: 80, background: "#fff" }} data-screen-label="02 Journey visualizer">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Journey visualizer</div>
          <h2>The whole visit, beat by beat.</h2>
          <p>Tap a step to see what you do, what your kid sees, and roughly how long it takes.</p>
        </div>

        {/* Track */}
        <div className="jv-track" style={{ position: "relative", marginBottom: 36 }}>
          {/* Connecting line — desktop horizontal, mobile vertical */}
          <div className="jv-line" style={{ position: "absolute", top: 38, left: 38, right: 38, height: 4, background: "repeating-linear-gradient(90deg, #2A1810 0 8px, transparent 8px 16px)", zIndex: 0 }} />
          <div className="jv-steps" style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, zIndex: 1 }}>
            {JOURNEY_STEPS.map((s, i) => {
              const isActive = active === i;
              return (
                <button key={s.id} onClick={() => setActive(i)}
                  className="jv-step"
                  style={{
                    background: "transparent", border: 0, padding: 0, cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                  }}>
                  <div style={{
                    width: 76, height: 76, borderRadius: 999,
                    background: isActive ? "#F4845F" : s.color,
                    border: "3px solid #2A1810",
                    boxShadow: isActive ? "0 6px 0 #2A1810" : "0 4px 0 #2A1810",
                    display: "grid", placeItems: "center",
                    fontSize: 32, transform: isActive ? "translateY(-2px)" : "none",
                    transition: "transform 0.15s, box-shadow 0.15s",
                  }}>{s.icon}</div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: isActive ? "#F4845F" : "#2A1810" }}>{i + 1}. {s.title}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "#7a3e22", marginTop: 2 }}>{s.time}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active step detail panel */}
        <div style={{
          background: step.color, border: "3px solid #2A1810",
          borderRadius: 28, padding: 36, boxShadow: "8px 8px 0 #2A1810",
        }} className="jv-detail">
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 28, alignItems: "start" }} className="jv-detail-grid">
            <div style={{ fontSize: 88, lineHeight: 1 }}>{step.icon}</div>
            <div>
              <div className="eyebrow">Step {active + 1} of 6 · ~{step.time}</div>
              <h3 style={{ fontSize: 36, marginTop: 6, fontFamily: "var(--font-display)" }}>{step.title}</h3>
              <p style={{ marginTop: 14, fontSize: 18, maxWidth: 700, color: "#2A1810" }}>{step.detail}</p>
              <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="jv-perspectives">
                <div style={{ background: "#fff", borderRadius: 16, padding: 18, border: "2px solid #2A1810" }}>
                  <div className="eyebrow">For you</div>
                  <div style={{ marginTop: 6, fontWeight: 600, fontSize: 15 }}>{step.parent}</div>
                </div>
                <div style={{ background: "#fff", borderRadius: 16, padding: 18, border: "2px solid #2A1810" }}>
                  <div className="eyebrow">For your kid</div>
                  <div style={{ marginTop: 6, fontWeight: 600, fontSize: 15 }}>{step.kid}</div>
                </div>
              </div>
              <div style={{ marginTop: 22, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="btn btn-ghost btn-sm" onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0}
                  style={{ opacity: active === 0 ? 0.4 : 1 }}>← Previous</button>
                <button className="btn btn-coral btn-sm" onClick={() => setActive(Math.min(JOURNEY_STEPS.length - 1, active + 1))} disabled={active === JOURNEY_STEPS.length - 1}
                  style={{ opacity: active === JOURNEY_STEPS.length - 1 ? 0.4 : 1 }}>Next step →</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .jv-line { display: none; }
          .jv-steps { grid-template-columns: repeat(3, 1fr) !important; gap: 18px !important; row-gap: 24px !important; }
          .jv-detail { padding: 24px !important; }
          .jv-detail-grid { grid-template-columns: 1fr !important; gap: 10px !important; }
          .jv-detail-grid > div:first-child { font-size: 56px !important; }
          .jv-perspectives { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 460px) {
          .jv-steps { grid-template-columns: repeat(2, 1fr) !important; }
          .jv-step > div:first-child { width: 64px !important; height: 64px !important; font-size: 26px !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// TREATMENT COMPARISON TABLE
// ============================================================
const TREATMENTS = [
  { name: "Sealant", emoji: "🛡️",
    bestFor: "Newly-erupted 6-yr molars; deep grooves with no decay.",
    visits: "1 visit", chairTime: "~10 min/tooth", anesth: "None",
    pain: "None", recovery: "Eat right after",
    cost: "$45–70/tooth", insuranceCov: "Usually 80–100%",
    age: "5–14" },
  { name: "Cleaning + fluoride", emoji: "🪥",
    bestFor: "Every healthy kid, every 6 months.",
    visits: "Recurring", chairTime: "~25 min", anesth: "None",
    pain: "None", recovery: "None",
    cost: "$110 / visit", insuranceCov: "Usually 100%",
    age: "1+" },
  { name: "Small filling", emoji: "🦷",
    bestFor: "Small cavity caught early — usually one surface of a baby tooth.",
    visits: "1 visit", chairTime: "~30 min", anesth: "Topical + injection",
    pain: "Soft cheek 1–2 hr", recovery: "Soft food a few hours",
    cost: "$180–260/tooth", insuranceCov: "Typically 60–80%",
    age: "3+" },
  { name: "Stainless crown", emoji: "👑",
    bestFor: "Larger decay on a baby molar that filling can't hold.",
    visits: "1 visit", chairTime: "~45 min", anesth: "Injection (laughing gas option)",
    pain: "Mild for a day", recovery: "Soft food 24 hr",
    cost: "$320–420", insuranceCov: "Typically 50–80%",
    age: "3+" },
  { name: "Sedation (N₂O)", emoji: "🌬️",
    bestFor: "Kids who need help relaxing for any procedure.",
    visits: "Add-on", chairTime: "+5 min setup", anesth: "Nitrous + topical",
    pain: "None during", recovery: "Wears off in 5 min",
    cost: "+$85 / visit", insuranceCov: "Sometimes covered",
    age: "4+" },
  { name: "Ortho referral", emoji: "🦴",
    bestFor: "Bite or alignment concerns we spot during cleaning.",
    visits: "Consult only here", chairTime: "~15 min", anesth: "None",
    pain: "None", recovery: "None",
    cost: "Free w/ visit", insuranceCov: "n/a (referral)",
    age: "6+" },
];

function ComparisonTable() {
  const [highlighted, setHighlighted] = useState(null);
  const rows = [
    { key: "bestFor", label: "Best for" },
    { key: "age", label: "Typical age" },
    { key: "visits", label: "Visits" },
    { key: "chairTime", label: "Chair time" },
    { key: "anesth", label: "Anesthesia" },
    { key: "pain", label: "After-visit feel" },
    { key: "recovery", label: "Recovery" },
    { key: "cost", label: "Out-of-pocket range" },
    { key: "insuranceCov", label: "Insurance" },
  ];

  return (
    <section id="compare" style={{ paddingTop: 80, paddingBottom: 80 }} data-screen-label="03 Comparison table">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Treatment comparison</div>
          <h2>Compare the six most common treatments.</h2>
          <p>Real time estimates, real out-of-pocket ranges, real recovery. Hover a column to focus it.</p>
        </div>

        {/* Desktop table */}
        <div className="ct-desktop" style={{ overflow: "auto", borderRadius: 24, border: "3px solid #2A1810", boxShadow: "8px 8px 0 #2A1810", background: "#fff" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 880 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "20px 18px", background: "#FBEED4", borderBottom: "3px solid #2A1810", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase", color: "#7a3e22", width: 200 }}></th>
                {TREATMENTS.map((t, i) => (
                  <th key={t.name}
                    onMouseEnter={() => setHighlighted(i)} onMouseLeave={() => setHighlighted(null)}
                    style={{ padding: "20px 14px", background: highlighted === i ? "#F4845F" : "#FBEED4", color: highlighted === i ? "#fff" : "#2A1810", borderBottom: "3px solid #2A1810", borderLeft: "1px solid rgba(42,24,16,0.1)", textAlign: "center", transition: "background 0.15s, color 0.15s", verticalAlign: "top" }}>
                    <div style={{ fontSize: 28 }}>{t.emoji}</div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginTop: 4 }}>{t.name}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={row.key} style={{ background: ri % 2 === 0 ? "#fff" : "#FFFBF2" }}>
                  <td style={{ padding: "16px 18px", fontWeight: 700, fontSize: 14, color: "#7a3e22", fontFamily: "var(--font-display)", borderBottom: "1px solid rgba(42,24,16,0.06)" }}>{row.label}</td>
                  {TREATMENTS.map((t, i) => (
                    <td key={i}
                      onMouseEnter={() => setHighlighted(i)} onMouseLeave={() => setHighlighted(null)}
                      style={{ padding: "16px 14px", fontSize: 14, color: "#2A1810", textAlign: "center", borderLeft: "1px solid rgba(42,24,16,0.06)", borderBottom: "1px solid rgba(42,24,16,0.06)", background: highlighted === i ? "rgba(244,132,95,0.08)" : "transparent", transition: "background 0.15s" }}>
                      {t[row.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked cards */}
        <div className="ct-mobile" style={{ display: "none", flexDirection: "column", gap: 16 }}>
          {TREATMENTS.map((t) => (
            <div key={t.name} style={{ background: "#fff", border: "3px solid #2A1810", borderRadius: 20, boxShadow: "5px 5px 0 #2A1810", overflow: "hidden" }}>
              <div style={{ background: "#FBEED4", padding: "16px 18px", borderBottom: "3px solid #2A1810", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontSize: 32 }}>{t.emoji}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19 }}>{t.name}</div>
              </div>
              <div style={{ padding: "8px 0" }}>
                {rows.map((row, i) => (
                  <div key={row.key} style={{ display: "grid", gridTemplateColumns: "130px 1fr", padding: "10px 18px", borderTop: i === 0 ? "none" : "1px solid rgba(42,24,16,0.06)", gap: 12 }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", color: "#7a3e22", paddingTop: 2 }}>{row.label}</div>
                    <div style={{ fontSize: 14.5, fontWeight: 500 }}>{t[row.key]}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 20, fontSize: 13, color: "#7a3e22", textAlign: "center", maxWidth: 720, marginInline: "auto" }}>
          Ranges are typical for our area — your exact out-of-pocket depends on your plan. We verify before your visit so nothing is a surprise.
        </p>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .ct-desktop { display: none !important; }
          .ct-mobile { display: flex !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// CTA BAND
// ============================================================
function JourneyCTA({ onBookClick }) {
  return (
    <section style={{ paddingTop: 40, paddingBottom: 40 }} data-screen-label="04 Journey CTA">
      <div className="container">
        <div style={{ background: "#F4845F", border: "3px solid #2A1810", borderRadius: 32, boxShadow: "10px 10px 0 #2A1810", padding: "44px 36px", display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center" }} className="jcta">
          <div>
            <h2 style={{ color: "#fff", fontSize: "clamp(28px, 4vw, 42px)" }}>Ready to walk through it for real?</h2>
            <p style={{ color: "#FFF6E8", marginTop: 10, fontSize: 17, opacity: 0.95 }}>Or keep planning — head to the cost calculator next.</p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={onBookClick} className="btn btn-ink">Book a visit →</button>
            <a href="Plan-Your-Treatment.html" className="btn" style={{ background: "#fff", color: "#2A1810", boxShadow: "0 4px 0 #2A1810" }}>Plan your treatment</a>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .jcta { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// EXPORTED PAGE
// ============================================================
function TreatmentJourneyPage({ onBookClick }) {
  return (
    <>
      <JourneyHero onBookClick={onBookClick} />
      <JourneyVisualizer />
      <ComparisonTable />
      <DecideToolkit currentTool="journey" />
      <JourneyCTA onBookClick={onBookClick} />
    </>
  );
}

Object.assign(window, { TreatmentJourneyPage });

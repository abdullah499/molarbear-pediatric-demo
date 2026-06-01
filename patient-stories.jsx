/* global React, BearMascot, DecideToolkit */
const { useState, useRef } = React;

// ============================================================
// HERO
// ============================================================
function StoriesHero({ onBookClick }) {
  return (
    <section style={{ paddingTop: 56, paddingBottom: 40, position: "relative", overflow: "hidden" }} data-screen-label="01 Stories hero">
      <div style={{ position: "absolute", top: 40, left: -100, width: 320, height: 320, borderRadius: "50%", background: "#F1ECFF", filter: "blur(40px)", opacity: 0.85, pointerEvents: "none" }} />
      <div className="container stories-hero" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 48, alignItems: "center" }}>
        <div>
          <div className="eyebrow">Helping patients · 4 of 4</div>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 76px)", lineHeight: 0.98, marginTop: 14, letterSpacing: "-0.03em" }}>
            Hear it from <span className="wavy">the families.</span>
          </h1>
          <p style={{ marginTop: 22, fontSize: 19, maxWidth: 560, color: "#4a3326" }}>
            Twenty-three families recorded short videos about their experience here — the nervous first visit, the cavity that turned out to be no big deal, the kid who now asks when they get to go back.
          </p>
          <div style={{ marginTop: 26, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#featured-video" className="btn btn-coral">Play the featured story ↓</a>
            <a href="#library" className="btn btn-ghost">Browse all stories</a>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ background: "#A0522D", borderRadius: 32, aspectRatio: "1/1", border: "3px solid #2A1810", boxShadow: "10px 10px 0 #2A1810", display: "grid", placeItems: "center", padding: 24 }}>
            <BearMascot pose="wave" size={260} />
          </div>
          <div style={{ position: "absolute", bottom: -16, right: -10, transform: "rotate(6deg)" }}>
            <div className="sticker" style={{ background: "#F2C94C" }}>🎥 23 short videos</div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .stories-hero { grid-template-columns: 1fr !important; }
          .stories-hero > div:last-child { max-width: 320px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// VIDEO CARD — placeholder thumbnail with play button overlay
// ============================================================

const PALETTE_BGS = [
  { from: "#FBEED4", to: "#F4845F" },
  { from: "#E8F6F0", to: "#6FCFB2" },
  { from: "#F1ECFF", to: "#A0522D" },
  { from: "#FFE9DF", to: "#F2C94C" },
  { from: "#FFF6E8", to: "#c75a3a" },
];

function PlayButton({ size = 64, onClick }) {
  return (
    <button onClick={onClick} aria-label="Play video" style={{
      width: size, height: size, borderRadius: 999,
      background: "#F4845F", border: "3px solid #2A1810",
      boxShadow: "0 5px 0 #2A1810",
      display: "grid", placeItems: "center",
      cursor: "pointer",
      transition: "transform 0.1s",
      padding: 0,
    }}
      onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px) scale(1.04)"}
      onMouseOut={(e) => e.currentTarget.style.transform = "none"}>
      <svg width={size * 0.42} height={size * 0.42} viewBox="0 0 24 24">
        <path d="M 6 4 L 20 12 L 6 20 Z" fill="#fff" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function VideoThumb({ story, big = false, paletteIdx = 0, onPlay }) {
  const pal = PALETTE_BGS[paletteIdx % PALETTE_BGS.length];
  return (
    <div style={{ position: "relative" }}>
      <div style={{
        position: "relative", aspectRatio: big ? "16/9" : "4/3",
        borderRadius: big ? 28 : 18,
        overflow: "hidden",
        border: "3px solid #2A1810",
        boxShadow: big ? "10px 10px 0 #2A1810" : "5px 5px 0 #2A1810",
        background: `linear-gradient(135deg, ${pal.from} 0%, ${pal.to} 100%)`,
      }}>
        {/* Subtle stripe pattern */}
        <div style={{
          position: "absolute", inset: 0,
          background: "repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0 12px, transparent 12px 24px)",
        }} />

        {/* Placeholder text */}
        <div style={{
          position: "absolute", top: 16, left: 16,
          background: "rgba(42,24,16,0.85)", color: "#FFF6E8",
          fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: 1.4,
          textTransform: "uppercase", padding: "5px 9px", borderRadius: 99, fontWeight: 700,
        }}>📹 {story.duration}</div>

        {/* Center play */}
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
          <PlayButton size={big ? 84 : 56} onClick={() => onPlay && onPlay(story)} />
        </div>

        {/* Bottom info */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: big ? "24px 28px" : "16px 18px",
          background: "linear-gradient(to top, rgba(42,24,16,0.92) 0%, rgba(42,24,16,0.0) 100%)",
          color: "#FFF6E8",
        }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: big ? 24 : 17, lineHeight: 1.15 }}>{story.title}</div>
          <div style={{ marginTop: 6, fontSize: big ? 14 : 12.5, opacity: 0.85, fontFamily: "var(--font-mono)" }}>{story.who}</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// VIDEO MODAL (mock player)
// ============================================================
function VideoModal({ story, onClose }) {
  if (!story) return null;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(42,24,16,0.88)",
      display: "grid", placeItems: "center",
      padding: 20,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "#2A1810", border: "3px solid #FFF6E8", borderRadius: 24,
        maxWidth: 900, width: "100%",
        overflow: "hidden",
      }}>
        <div style={{
          position: "relative", aspectRatio: "16/9",
          background: `linear-gradient(135deg, ${PALETTE_BGS[0].from}, ${PALETTE_BGS[0].to})`,
        }}>
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
            <PlayButton size={96} />
          </div>
          <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(42,24,16,0.85)", color: "#FFF6E8", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase", padding: "6px 10px", borderRadius: 99, fontWeight: 700 }}>📹 {story.duration} · MP4 placeholder</div>
          <button onClick={onClose} aria-label="Close" style={{ position: "absolute", top: 14, right: 14, width: 40, height: 40, borderRadius: 99, background: "#fff", border: "2px solid #2A1810", fontWeight: 900, fontSize: 18, cursor: "pointer" }}>×</button>
        </div>
        <div style={{ padding: "24px 28px", color: "#FFF6E8" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase", opacity: 0.7, fontWeight: 700 }}>{story.who}</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, marginTop: 6 }}>{story.title}</div>
          <p style={{ marginTop: 14, opacity: 0.9, fontSize: 16, lineHeight: 1.55, maxWidth: 720 }}>{story.summary}</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// FEATURED VIDEO
// ============================================================
const FEATURED_STORY = {
  id: "featured",
  title: "\"Our daughter went from terrified to asking when she can come back.\"",
  who: "Priya & Mira (age 6) · Westside",
  duration: "2:14",
  summary: "After a rough experience at a different practice, Mira was scared of any dentist visit. Dr. Reyes started with a tour and let her hold every tool before anything happened. By the second visit, Mira was the one walking her little brother through what to expect.",
  pull: "She used to cry on the drive over. Now she packs her own treasure-chest list.",
  tag: "Anxiety",
};

function FeaturedVideo({ onPlay }) {
  return (
    <section id="featured-video" style={{ paddingTop: 80, paddingBottom: 80, background: "#fff" }} data-screen-label="02 Featured story">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Featured story</div>
          <h2>"She used to cry on the drive over."</h2>
          <p>Priya's two-minute story about Mira's turnaround — anxiety to enthusiasm in three visits.</p>
        </div>

        <div className="fv-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 28, alignItems: "center" }}>
          <VideoThumb big story={FEATURED_STORY} paletteIdx={0} onPlay={onPlay} />
          <div>
            <div style={{ background: "#FBEED4", border: "3px solid #2A1810", borderRadius: 24, padding: 28, boxShadow: "6px 6px 0 #2A1810", position: "relative" }}>
              <div style={{ fontSize: 60, lineHeight: 1, color: "#F4845F", fontFamily: "var(--font-display)" }}>"</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 24, marginTop: -10, lineHeight: 1.25 }}>{FEATURED_STORY.pull}</div>
              <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 99, background: "#F4845F", color: "#fff", display: "grid", placeItems: "center", fontWeight: 800, fontFamily: "var(--font-display)" }}>P</div>
                <div>
                  <div style={{ fontWeight: 700 }}>Priya M.</div>
                  <div style={{ fontSize: 13, color: "#7a3e22" }}>Mira's mom · 3 visits</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .fv-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// STORY LIBRARY — filterable grid
// ============================================================

const TAGS = ["All", "First visits", "Anxiety", "Cavities", "Special needs", "Sedation", "Trauma", "Teens"];

const STORIES = [
  { id: "s1", title: "First visit at 14 months — and she didn't cry once.", who: "Jordan H. · with Theo (14 mo)", duration: "1:48", tag: "First visits", summary: "Theo's first dental visit. Doctor used the knee-to-knee position with mom, three minutes flat, sticker handed off, done. Jordan walks through how the practice prepped them by text the night before." },
  { id: "s2", title: "He has sensory differences. They figured it out faster than his school did.", who: "Maria L. · with Diego (8)", duration: "3:02", tag: "Special needs", summary: "Diego's autism means lights, sounds, and sudden touch are a lot. The team set up a sensory-light visit, narrated every step, and used the tell-show-do method. Maria talks about what worked and what she now asks for every visit." },
  { id: "s3", title: "Two cavities. Zero tears. One stuffed sloth.", who: "Devon B. · with Aria (5)", duration: "1:35", tag: "Cavities", summary: "Aria had two small fillings on her baby molars. Devon describes the laughing-gas walkthrough, the rainbow ceiling, and how the doctor stopped twice to check in with Aria before continuing." },
  { id: "s4", title: "The chipped front tooth that was fixed in 25 minutes.", who: "Sam W. · with Marcus (8)", duration: "2:21", tag: "Trauma", summary: "Bike accident on a Saturday. Same-day visit, bonded composite repair, color-matched perfectly. Sam talks through what to do at home in the moment and what the visit actually cost." },
  { id: "s5", title: "I was the anxious one — my kid was fine.", who: "Lena R. · with Noah (4)", duration: "1:58", tag: "Anxiety", summary: "Lena had bad memories of childhood dentistry. The practice gave her a parent-prep call before Noah's first visit so she could be calm in the chair. Noah did great. Lena cried — happy ones." },
  { id: "s6", title: "Laughing gas turned the crown visit into a non-event.", who: "Carla S. · with Zara (7)", duration: "2:05", tag: "Sedation", summary: "Zara needed two stainless crowns. With N₂O, she watched a movie through the procedure and asked if she could come back for another one. Carla covers cost, recovery, and how they prepped." },
  { id: "s7", title: "She's 16 and actually asks for cleanings now.", who: "Anita P. · with daughter Maya (16)", duration: "1:42", tag: "Teens", summary: "Pediatric care that scales up to teen-appropriate. Anita talks about how the team treats Maya like the decision-maker and respects her input on everything." },
  { id: "s8", title: "Switched from a chain office. Won't go back.", who: "Marco D. · with twins Eli & Theo (6)", duration: "2:33", tag: "First visits", summary: "Marco compares the previous practice's assembly-line feel with the calm, individualized approach at Molar Bear. Notes specifically: the doctor knows the kids by name." },
  { id: "s9", title: "The cavity we caught at 3 that saved a crown at 5.", who: "Hannah T. · with Lily (5)", duration: "1:29", tag: "Cavities", summary: "Hannah's story of catching a tiny cavity early and treating it with a small filling — and why their previous office had wanted to wait." },
];

function StoryLibrary({ onPlay }) {
  const [tag, setTag] = useState("All");
  const visible = tag === "All" ? STORIES : STORIES.filter((s) => s.tag === tag);

  return (
    <section id="library" style={{ paddingTop: 80, paddingBottom: 80 }} data-screen-label="03 Story library">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Story library</div>
          <h2>Filter by what you want to hear about.</h2>
          <p>Short videos, recorded in their living rooms. No script — we ask three questions and let them talk.</p>
        </div>

        {/* Tag filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {TAGS.map((t) => {
            const isOn = tag === t;
            return (
              <button key={t} onClick={() => setTag(t)} style={{
                padding: "10px 18px",
                borderRadius: 999,
                background: isOn ? "#2A1810" : "#fff",
                color: isOn ? "#FFF6E8" : "#2A1810",
                border: "2px solid #2A1810",
                fontWeight: 700, fontSize: 14, cursor: "pointer",
                fontFamily: "var(--font-display)",
              }}>{t}</button>
            );
          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: 24 }}>
          {visible.map((s, i) => (
            <div key={s.id} style={{ display: "flex", flexDirection: "column", gap: 10, cursor: "pointer" }} onClick={() => onPlay(s)}>
              <VideoThumb story={s} paletteIdx={i + 1} onPlay={onPlay} />
              <div style={{ padding: "0 4px" }}>
                <div style={{ display: "inline-block", fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", color: "#7a3e22", fontWeight: 700, background: "#FBEED4", padding: "3px 8px", borderRadius: 99, border: "1.5px solid #2A1810" }}>{s.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PULL-QUOTE BAND
// ============================================================
const QUOTES = [
  { q: "It is the only place my son asks to go back to.", n: "K. Williams" },
  { q: "They explained every cost up front — no surprises.", n: "R. Patel" },
  { q: "The kindest hygienist we've ever met.", n: "J. Park" },
  { q: "From scared to bragging in three visits.", n: "M. Garcia" },
];

function QuoteBand() {
  return (
    <section style={{ paddingTop: 40, paddingBottom: 40 }} data-screen-label="04 Quote band">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {QUOTES.map((q, i) => (
            <div key={i} style={{
              background: ["#FBEED4", "#E8F6F0", "#F1ECFF", "#FFE9DF"][i % 4],
              border: "3px solid #2A1810", borderRadius: 20, padding: 22,
              boxShadow: "5px 5px 0 #2A1810",
            }}>
              <div style={{ fontSize: 36, lineHeight: 1, color: "#F4845F", fontFamily: "var(--font-display)" }}>"</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, marginTop: -8, lineHeight: 1.25 }}>{q.q}</div>
              <div style={{ marginTop: 12, fontSize: 13, color: "#7a3e22", fontFamily: "var(--font-mono)", letterSpacing: 0.5 }}>— {q.n}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CTA
// ============================================================
function StoriesCTA({ onBookClick }) {
  return (
    <section style={{ paddingTop: 40, paddingBottom: 40 }} data-screen-label="05 Stories CTA">
      <div className="container">
        <div style={{ background: "#2A1810", color: "#FFF6E8", border: "3px solid #2A1810", borderRadius: 32, boxShadow: "10px 10px 0 #A0522D", padding: "44px 36px", display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center" }} className="scta">
          <div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)" }}>Add yours after your first visit?</h2>
            <p style={{ marginTop: 10, fontSize: 17, opacity: 0.85 }}>We send a one-question prompt a week after. No pressure — most families say yes.</p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={onBookClick} className="btn btn-coral">Book a visit →</button>
            <a href="Treatment-Journey.html" className="btn btn-ghost" style={{ color: "#FFF6E8", borderColor: "#FFF6E8" }}>See what to expect</a>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .scta { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// AGGREGATE STRIP — trust numbers
// ============================================================
function StoriesAggregate() {
  const stats = [
    { n: "4.9", l: "aggregate rating", c: "#F4845F" },
    { n: "487", l: "verified reviews", c: "#6FCFB2" },
    { n: "23", l: "patient films", c: "#F2C94C" },
    { n: "96%", l: "would refer a friend", c: "#A0522D" },
  ];
  return (
    <section className="compact" data-screen-label="01b Aggregate">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="agg-strip">
          {stats.map((s, i) => (
            <div key={i} style={{ background: "#fff", border: "3px solid #2A1810", borderRadius: 22, boxShadow: "6px 6px 0 #2A1810", padding: "24px 20px" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 48, lineHeight: 1, color: s.c, letterSpacing: "-0.03em" }}>{s.n}</div>
              <div style={{ marginTop: 8, fontSize: 13.5, color: "#4a3326", textWrap: "balance" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 760px) { .agg-strip { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  );
}

// ============================================================
// BEFORE / AFTER — draggable slider gallery
// ============================================================
function BeforeAfterSlider({ id, beforeColor, afterColor, beforeHint, afterHint }) {
  const [pos, setPos] = useState(50);
  const ref = useRef(null);
  const dragging = useRef(false);

  const move = (clientX) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };
  const onDown = (e) => { dragging.current = true; move((e.touches ? e.touches[0] : e).clientX); };
  const onMove = (e) => { if (dragging.current) move((e.touches ? e.touches[0] : e).clientX); };
  const onUp = () => { dragging.current = false; };

  return (
    <div
      ref={ref}
      onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
      onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
      style={{
        position: "relative", aspectRatio: "4/3", borderRadius: 22, overflow: "hidden",
        border: "3px solid #2A1810", boxShadow: "8px 8px 0 #2A1810", cursor: "ew-resize",
        userSelect: "none", touchAction: "none", background: beforeColor,
      }}>
      {/* BEFORE layer (full) */}
      <div style={{ position: "absolute", inset: 0 }}>
        <image-slot id={`${id}-before`} shape="rect" placeholder={beforeHint} style={{ width: "100%", height: "100%" }}></image-slot>
      </div>
      {/* AFTER layer (clipped from the right) */}
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 0 0 ${pos}%)`, background: afterColor }}>
        <image-slot id={`${id}-after`} shape="rect" placeholder={afterHint} style={{ width: "100%", height: "100%" }}></image-slot>
      </div>
      {/* Labels */}
      <div style={{ position: "absolute", left: 12, top: 12, background: "rgba(42,24,16,0.85)", color: "#FFF6E8", fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: 1.2, textTransform: "uppercase", padding: "4px 9px", borderRadius: 99, fontWeight: 700 }}>Before</div>
      <div style={{ position: "absolute", right: 12, top: 12, background: "#6FCFB2", color: "#2A1810", fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: 1.2, textTransform: "uppercase", padding: "4px 9px", borderRadius: 99, fontWeight: 700, border: "2px solid #2A1810" }}>After</div>
      {/* Divider + handle */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, width: 4, background: "#2A1810", transform: "translateX(-2px)" }} />
      <div style={{
        position: "absolute", top: "50%", left: `${pos}%`, transform: "translate(-50%, -50%)",
        width: 44, height: 44, borderRadius: 99, background: "#F4845F", border: "3px solid #2A1810",
        boxShadow: "0 4px 0 #2A1810", display: "grid", placeItems: "center", color: "#fff", fontWeight: 900, fontSize: 16,
      }}>⟷</div>
    </div>
  );
}

function StoriesBeforeAfter() {
  const cases = [
    { id: "ba-chip", beforeColor: "#FBEED4", afterColor: "#E8F6F0", beforeHint: "Before — chipped front tooth", afterHint: "After — bonded composite repair", tag: "Trauma repair", title: "Chipped front tooth, fixed in 25 minutes", note: "Marcus · age 8 · 1 visit" },
    { id: "ba-cav", beforeColor: "#FFE9DF", afterColor: "#E8F6F0", beforeHint: "Before — baby molar with decay", afterHint: "After — tooth-colored filling", tag: "Small filling", title: "Two cavities, color-matched fillings", note: "Aria · age 5 · 1 visit" },
    { id: "ba-crown", beforeColor: "#F1ECFF", afterColor: "#E8F6F0", beforeHint: "Before — broken-down molar", afterHint: "After — white zirconia crown", tag: "Crown", title: "A molar saved with a white crown", note: "Zara · age 7 · 1 visit" },
  ];
  return (
    <section style={{ background: "#FBEED4" }} data-screen-label="03b Before & after">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Real results · honest, never retouched</div>
          <h2>Drag to see the difference.</h2>
          <p>Real Molar Bear patients, same chair, same lighting. Slide the handle on each one to reveal the result.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="ba-grid">
          {cases.map((c) => (
            <div key={c.id}>
              <BeforeAfterSlider {...c} />
              <div style={{ marginTop: 14 }}>
                <div style={{ display: "inline-block", fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", color: "#7a3e22", fontWeight: 700, background: "#fff", padding: "3px 8px", borderRadius: 99, border: "1.5px solid #2A1810" }}>{c.tag}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19, marginTop: 8, lineHeight: 1.2 }}>{c.title}</div>
                <div style={{ marginTop: 4, fontSize: 13, color: "#7a3e22", fontFamily: "var(--font-mono)" }}>{c.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 920px) { .ba-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 620px) { .ba-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ============================================================
// WRITTEN REVIEWS — filterable grid
// ============================================================
const SR_REVIEWS = [
  { name: "Priya M.", role: "Mira's mom", src: "Google", topic: "Anxiety", date: "2 weeks ago", stars: 5, body: "She used to cry on the drive over. Dr. Reyes let her hold every tool first and now she packs her own treasure-chest list. Three visits and she's a different kid." },
  { name: "Daniel K.", role: "Dad of one (9)", src: "Google", topic: "Special needs", date: "1 month ago", stars: 5, body: "Our son has sensory sensitivities and previous dentists didn't get it. They had noise-cancelling headphones ready before we even asked. This is what pediatric care should be." },
  { name: "Tasha B.", role: "Mom of three", src: "Healthgrades", topic: "Insurance", date: "3 weeks ago", stars: 5, body: "Insurance verified in an hour like they promised, and the written estimate matched the final bill to the dollar. After years of surprise bills this felt almost suspicious. It wasn't." },
  { name: "Lin O.", role: "Mom of one (5)", src: "Google", topic: "Sedation", date: "1 week ago", stars: 5, body: "First filling and she was terrified. They used laughing gas, let her pick the ceiling show, gave her a tooth pillow to hold. She fell asleep halfway through and walked out asking for ice cream." },
  { name: "Sam R.", role: "Foster parent", src: "Google", topic: "Medicaid", date: "3 weeks ago", stars: 5, body: "The only practice that's consistently on time, communicates clearly with our case managers, and accepts Medicaid without making us feel like second-class patients. The gold standard." },
  { name: "Cara D.", role: "Mom of one (11)", src: "Yelp", topic: "Honesty", date: "2 weeks ago", stars: 4, body: "Took my 11-year-old for an ortho screening. They said her bite was fine and we didn't need braces yet — could've upsold us easily and didn't. Earned my loyalty for the next ten years." },
];

function StarRow({ n = 5, size = 15 }) {
  return (
    <div style={{ display: "inline-flex", gap: 2 }} aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
          <path d="M12 2 L14.9 8.6 L22 9.5 L16.8 14.4 L18.2 21.5 L12 18 L5.8 21.5 L7.2 14.4 L2 9.5 L9.1 8.6 Z"
            fill={i <= n ? "#F2C94C" : "rgba(42,24,16,0.15)"} stroke="#2A1810" strokeWidth="1" strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  );
}

function StoriesReviews() {
  const topics = ["All", ...Array.from(new Set(SR_REVIEWS.map((r) => r.topic)))];
  const [topic, setTopic] = useState("All");
  const shown = topic === "All" ? SR_REVIEWS : SR_REVIEWS.filter((r) => r.topic === topic);

  return (
    <section style={{ background: "#fff" }} data-screen-label="04 Written reviews">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">In writing</div>
          <h2>What parents say, unedited.</h2>
          <p>Pulled from Google, Healthgrades, and Yelp. Filter by what you want to read about.</p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {topics.map((t) => {
            const on = topic === t;
            return (
              <button key={t} onClick={() => setTopic(t)} style={{
                padding: "10px 18px", borderRadius: 999,
                background: on ? "#2A1810" : "#fff", color: on ? "#FFF6E8" : "#2A1810",
                border: "2px solid #2A1810", fontWeight: 700, fontSize: 14, cursor: "pointer",
                fontFamily: "var(--font-display)",
              }}>{t}</button>
            );
          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="sr-grid">
          {shown.map((r, i) => (
            <article key={i} style={{ background: "#FBEED4", border: "2px solid #2A1810", borderRadius: 22, padding: 24, boxShadow: "6px 6px 0 #2A1810", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <StarRow n={r.stars} />
                <span style={{ fontSize: 11, color: "#7a3e22", fontFamily: "var(--font-mono)", letterSpacing: 0.4 }}>{r.date.toUpperCase()}</span>
              </div>
              <p style={{ fontSize: 14.5, color: "#2A1810", lineHeight: 1.55, flex: 1 }}>"{r.body}"</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: 12, borderTop: "1px dashed rgba(42,24,16,0.18)" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14 }}>{r.name} <span style={{ color: "#7a3e22", fontWeight: 500, fontSize: 12 }}>· {r.role}</span></span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "#7a3e22", letterSpacing: 0.6 }}>{r.src}</span>
              </div>
            </article>
          ))}
        </div>

        <div style={{ marginTop: 28, textAlign: "center" }}>
          <a href="Reviews.html" className="btn btn-ghost">Read all 487 reviews →</a>
        </div>
      </div>
      <style>{`
        @media (max-width: 1000px) { .sr-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px) { .sr-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ============================================================
// PAGE
// ============================================================
function PatientStoriesPage({ onBookClick }) {
  const [open, setOpen] = useState(null);
  const onPlay = (s) => setOpen(s);
  const onClose = () => setOpen(null);
  return (
    <>
      <StoriesHero onBookClick={onBookClick} />
      <StoriesAggregate />
      <FeaturedVideo onPlay={onPlay} />
      <StoryLibrary onPlay={onPlay} />
      <StoriesBeforeAfter />
      <StoriesReviews />
      <QuoteBand />
      <DecideToolkit />
      <StoriesCTA onBookClick={onBookClick} />
      <VideoModal story={open} onClose={onClose} />
    </>
  );
}

Object.assign(window, { PatientStoriesPage });

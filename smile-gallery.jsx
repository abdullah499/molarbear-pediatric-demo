/* global React, BearMascot */
const { useState, useRef, useEffect, useCallback } = React;

// ============================================================
// HERO
// ============================================================
function GalleryHero() {
  return (
    <section style={{ paddingTop: 56, paddingBottom: 40, position: "relative", overflow: "hidden" }} data-screen-label="01 Gallery hero">
      <div style={{ position: "absolute", top: 40, right: -100, width: 320, height: 320, borderRadius: "50%", background: "#FFE9DF", filter: "blur(40px)", opacity: 0.8, pointerEvents: "none" }} />
      <div className="container gallery-hero" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 48, alignItems: "center" }}>
        <div>
          <div className="eyebrow">Helping patients · 3 of 4</div>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 76px)", lineHeight: 0.98, marginTop: 14, letterSpacing: "-0.03em" }}>
            Drag to see <span className="wavy">the difference.</span>
          </h1>
          <p style={{ marginTop: 22, fontSize: 19, maxWidth: 560, color: "#4a3326" }}>
            Real kids, real treatments. Every photo on this page was taken in our chair with permission from the parents. Drag the handle to compare before and after.
          </p>
          <div style={{ marginTop: 26, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#featured" className="btn btn-coral">See the featured smile ↓</a>
            <a href="#more" className="btn btn-ghost">Browse the gallery</a>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ background: "#FFE9DF", borderRadius: 32, aspectRatio: "1/1", border: "3px solid #2A1810", boxShadow: "10px 10px 0 #2A1810", display: "grid", placeItems: "center", padding: 24 }}>
            <BearMascot pose="tooth" size={260} />
          </div>
          <div style={{ position: "absolute", top: -10, right: -16, transform: "rotate(8deg)" }}>
            <div className="sticker" style={{ background: "#F4845F", color: "#fff", borderColor: "#2A1810" }}>📸 240+ smiles</div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .gallery-hero { grid-template-columns: 1fr !important; }
          .gallery-hero > div:last-child { max-width: 320px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// BEFORE / AFTER SLIDER COMPONENT
// ============================================================

function BeforeAfter({ beforeLabel = "Before", afterLabel = "After", beforeSrc, afterSrc, beforePlaceholder, afterPlaceholder, aspect = "4/3", initial = 50, big = false }) {
  const [pos, setPos] = useState(initial);
  const wrap = useRef(null);
  const dragging = useRef(false);

  const move = useCallback((clientX) => {
    if (!wrap.current) return;
    const r = wrap.current.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      move(x);
    };
    const onUp = () => { dragging.current = false; document.body.style.userSelect = ""; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [move]);

  const onStart = (e) => {
    dragging.current = true;
    document.body.style.userSelect = "none";
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    move(x);
    e.preventDefault();
  };

  const onKey = (e) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
  };

  const placeholderStyle = {
    width: "100%", height: "100%", display: "grid", placeItems: "center",
    fontFamily: "var(--font-mono)", fontSize: 12, textAlign: "center", padding: 16,
  };

  return (
    <div
      ref={wrap}
      onMouseDown={onStart}
      onTouchStart={onStart}
      tabIndex={0}
      onKeyDown={onKey}
      role="slider"
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0} aria-valuemax={100}
      style={{
        position: "relative", width: "100%", aspectRatio: aspect,
        borderRadius: big ? 28 : 18,
        overflow: "hidden",
        border: "3px solid #2A1810",
        boxShadow: big ? "10px 10px 0 #2A1810" : "5px 5px 0 #2A1810",
        cursor: "ew-resize",
        background: "#FBEED4",
        touchAction: "none",
        outline: "none",
      }}
    >
      {/* AFTER — full background */}
      <div style={{ position: "absolute", inset: 0 }}>
        {afterSrc ? (
          <img src={afterSrc} alt={afterLabel} style={{ width: "100%", height: "100%", objectFit: "cover" }} draggable={false} />
        ) : (
          <div className="img-placeholder" style={placeholderStyle}>{afterPlaceholder || `Photo: ${afterLabel}`}</div>
        )}
      </div>
      {/* BEFORE — clipped */}
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {beforeSrc ? (
          <img src={beforeSrc} alt={beforeLabel} style={{ width: "100%", height: "100%", objectFit: "cover" }} draggable={false} />
        ) : (
          <div className="img-placeholder" style={{ ...placeholderStyle, background: "linear-gradient(135deg, #FBEED4 0%, #F4845F 100%)" }}>{beforePlaceholder || `Photo: ${beforeLabel}`}</div>
        )}
      </div>

      {/* Labels */}
      <div style={{ position: "absolute", top: 12, left: 12, background: "#2A1810", color: "#FFF6E8", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase", padding: "6px 10px", borderRadius: 99, fontWeight: 700 }}>{beforeLabel}</div>
      <div style={{ position: "absolute", top: 12, right: 12, background: "#F4845F", color: "#fff", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase", padding: "6px 10px", borderRadius: 99, fontWeight: 700 }}>{afterLabel}</div>

      {/* Divider */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, width: 4, background: "#FFF6E8", boxShadow: "0 0 0 1.5px #2A1810", transform: "translateX(-50%)", pointerEvents: "none" }} />
      {/* Handle */}
      <div style={{
        position: "absolute", top: "50%", left: `${pos}%`,
        transform: "translate(-50%, -50%)",
        width: 48, height: 48, borderRadius: 99,
        background: "#FFF6E8", border: "3px solid #2A1810",
        boxShadow: "0 4px 0 #2A1810",
        display: "grid", placeItems: "center",
        pointerEvents: "none",
      }}>
        <svg width="22" height="22" viewBox="0 0 22 22">
          <path d="M 7 6 L 3 11 L 7 16" fill="none" stroke="#2A1810" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 15 6 L 19 11 L 15 16" fill="none" stroke="#2A1810" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

// ============================================================
// FEATURED CASE
// ============================================================

const FEATURED = {
  name: "Maya, age 7",
  procedure: "2 baby molars · stainless crowns + sealants",
  duration: "1 visit · 45 minutes",
  story: "Maya came in with two cavities that had grown past the point where a simple filling would hold. We placed stainless steel crowns on both baby molars in a single visit, with laughing gas for comfort. She walked out, picked a stuffed sloth from the treasure chest, and asked if she could come back next week.",
  before: { label: "Day of visit", note: "Visible decay, top-down view of two lower molars." },
  after: { label: "6-week follow-up", note: "Crowns seated, gums healed, no sensitivity reported." },
  notes: [
    { k: "Total chair time", v: "45 min" },
    { k: "Anesthesia", v: "Topical + N₂O" },
    { k: "Recovery", v: "Soft food, 24 hr" },
    { k: "Parent paid", v: "$284 after PPO" },
  ],
};

function FeaturedCase() {
  return (
    <section id="featured" style={{ paddingTop: 80, paddingBottom: 80, background: "#fff" }} data-screen-label="02 Featured before-after">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Featured case</div>
          <h2>One visit, two crowns, one happy 7-year-old.</h2>
        </div>

        <div className="fc-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 36, alignItems: "start" }}>
          <BeforeAfter
            big
            beforeLabel="Before"
            afterLabel="After"
            aspect="4/3"
            beforePlaceholder="📸 Intra-oral photo: 2 baby molars with visible decay"
            afterPlaceholder="📸 Intra-oral photo: 2 stainless crowns, 6 weeks out" />
          <div>
            <div style={{ background: "#FBEED4", border: "3px solid #2A1810", borderRadius: 24, padding: 28, boxShadow: "6px 6px 0 #2A1810" }}>
              <div className="eyebrow">Patient</div>
              <h3 style={{ fontSize: 30, marginTop: 6, fontFamily: "var(--font-display)" }}>{FEATURED.name}</h3>
              <div style={{ marginTop: 4, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: 1.2, textTransform: "uppercase", color: "#7a3e22", fontWeight: 700 }}>{FEATURED.procedure}</div>
              <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.6 }}>{FEATURED.story}</p>
              <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {FEATURED.notes.map((n) => (
                  <div key={n.k} style={{ background: "#fff", border: "2px solid #2A1810", borderRadius: 12, padding: "10px 12px" }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", color: "#7a3e22", fontWeight: 700 }}>{n.k}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2, fontFamily: "var(--font-display)" }}>{n.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .fc-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// GALLERY GRID
// ============================================================
const FILTERS = [
  { id: "all", label: "All smiles" },
  { id: "fillings", label: "Fillings" },
  { id: "crowns", label: "Crowns" },
  { id: "sealants", label: "Sealants" },
  { id: "ortho", label: "Ortho referrals" },
  { id: "trauma", label: "Trauma" },
];

const CASES = [
  { name: "Eli, 6", tag: "sealants", label: "4 sealants · 20 min", beforeNote: "Deep grooves, no decay yet", afterNote: "Sealed and protected" },
  { name: "Sofia, 9", tag: "fillings", label: "2 small fillings · 30 min", beforeNote: "Two pinhole cavities, baby molars", afterNote: "Tooth-colored composite" },
  { name: "Jordan, 5", tag: "crowns", label: "1 stainless crown · 35 min", beforeNote: "Decay too deep for a filling", afterNote: "Crown seated, no sensitivity" },
  { name: "Aria, 11", tag: "ortho", label: "Ortho referral consult", beforeNote: "Crowding on lower arch", afterNote: "Phase-1 ortho underway" },
  { name: "Marcus, 8", tag: "trauma", label: "Chipped front tooth · 25 min", beforeNote: "Bike fall — front incisor chipped", afterNote: "Bonded repair, same color match" },
  { name: "Lily, 4", tag: "fillings", label: "1 filling, first one ever", beforeNote: "Tiny cavity caught at checkup", afterNote: "Filling done, no tears" },
  { name: "Noah, 10", tag: "sealants", label: "Upgraded sealants · 25 min", beforeNote: "Old sealants worn down", afterNote: "Re-applied on permanent molars" },
  { name: "Zara, 7", tag: "crowns", label: "2 stainless crowns · 45 min", beforeNote: "Decay on both lower molars", afterNote: "Crowns + N₂O, easy visit" },
];

function GalleryGrid() {
  const [filter, setFilter] = useState("all");
  const visible = filter === "all" ? CASES : CASES.filter((c) => c.tag === filter);

  return (
    <section id="more" style={{ paddingTop: 80, paddingBottom: 80 }} data-screen-label="03 Gallery grid">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Gallery</div>
          <h2>More smiles from our chair.</h2>
          <p>Drag any photo to compare. Names changed and photos shared with parent permission.</p>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {FILTERS.map((f) => {
            const isOn = filter === f.id;
            return (
              <button key={f.id} onClick={() => setFilter(f.id)} style={{
                padding: "10px 18px",
                borderRadius: 999,
                background: isOn ? "#2A1810" : "#fff",
                color: isOn ? "#FFF6E8" : "#2A1810",
                border: "2px solid #2A1810",
                fontWeight: 700, fontSize: 14, cursor: "pointer",
                fontFamily: "var(--font-display)",
              }}>{f.label}</button>
            );
          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: 24 }}>
          {visible.map((c, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <BeforeAfter
                aspect="4/3"
                initial={45}
                beforeLabel="Before"
                afterLabel="After"
                beforePlaceholder={`📸 ${c.beforeNote}`}
                afterPlaceholder={`📸 ${c.afterNote}`}
              />
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17 }}>{c.name}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: 1, textTransform: "uppercase", color: "#7a3e22", fontWeight: 700, marginTop: 2 }}>{c.label}</div>
              </div>
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
function GalleryCTA({ onBookClick }) {
  return (
    <section style={{ paddingTop: 40, paddingBottom: 40 }} data-screen-label="04 Gallery CTA">
      <div className="container">
        <div style={{ background: "#FBEED4", border: "3px solid #2A1810", borderRadius: 32, boxShadow: "10px 10px 0 #2A1810", padding: "44px 36px", display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center" }} className="gcta">
          <div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)" }}>Want to hear how the visit felt, in their own words?</h2>
            <p style={{ marginTop: 10, fontSize: 17, color: "#4a3326" }}>Patient stories — kid-and-parent video testimonials, two minutes each.</p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="Patient-Stories.html" className="btn btn-coral">Watch stories →</a>
            <button onClick={onBookClick} className="btn btn-ghost">Book a visit</button>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .gcta { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function SmileGalleryPage({ onBookClick }) {
  return (
    <>
      <GalleryHero />
      <FeaturedCase />
      <GalleryGrid />
      <DecideToolkit currentTool="smiles" />
      <GalleryCTA onBookClick={onBookClick} />
    </>
  );
}

Object.assign(window, { SmileGalleryPage });

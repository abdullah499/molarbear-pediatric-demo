/* global React, ReactDOM, BearMascot, Logo */
const { useState, useEffect, useRef } = React;

// ============================================================
// SHARED — Real-photo placeholder slot
// "REPLACE WITH REAL PHOTO" pill + dim hint + dashed sticker frame
// ============================================================

function PhotoSlot({ width, height, caption, aspect, tint = "#FBEED4", rotate = 0, src }) {
  const dim = `${width}×${height}`;
  return (
    <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
      <div
        className="lp-photoslot"
        style={{
          position: "relative",
          aspectRatio: aspect || `${width}/${height}`,
          background: src
            ? `${tint}`
            : `repeating-linear-gradient(45deg, rgba(42,24,16,0.05) 0 10px, rgba(42,24,16,0.10) 10px 20px), ${tint}`,
          border: src ? "3px solid #2A1810" : "3px dashed #2A1810",
          borderRadius: 24,
          boxShadow: "8px 8px 0 #2A1810",
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
          transform: rotate ? `rotate(${rotate}deg)` : "none",
        }}
      >
        {src ? (
          <img src={src} alt={typeof caption === "string" ? caption : ""} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: 16, textAlign: "center" }}>
          <div style={{
            background: "#F4845F",
            color: "#fff",
            border: "2px solid #2A1810",
            boxShadow: "3px 3px 0 #2A1810",
            padding: "8px 16px",
            borderRadius: 999,
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}>
            ◎ Replace with real photo
          </div>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "#2A1810",
            background: "rgba(255,246,232,0.85)",
            padding: "4px 10px",
            borderRadius: 6,
          }}>{dim}px · jpg/webp</div>
        </div>
        )}
      </div>
      {caption && (
        <figcaption style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#4a3326", textAlign: "center", lineHeight: 1.45 }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ============================================================
// MINIMAL LANDING HEADER — no full nav, single goal page
// ============================================================

function LandingHeader() {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(255,246,232,0.94)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(42,24,16,0.08)",
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 28px" }}>
        <Logo size="md" />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href="tel:5551234386" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17,
            color: "#2A1810",
          }} className="lp-phone">
            📞 (555) 123-CHEW
          </a>
          <a href="#book" className="btn btn-coral btn-sm" style={{ fontSize: 14 }}>Book first visit →</a>
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .lp-phone span, .lp-phone-text { display: none; }
        }
      `}</style>
    </header>
  );
}

// ============================================================
// 1 · HERO — Problem-aware headline + Promise hint
// ============================================================

function LandingHero() {
  return (
    <section style={{ paddingTop: 56, paddingBottom: 72, position: "relative", overflow: "hidden" }} data-screen-label="01 Hero">
      <div style={{ position: "absolute", top: 80, right: -120, width: 520, height: 520, borderRadius: "50%", background: "#FBEED4", filter: "blur(60px)", opacity: 0.7, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -100, left: -100, width: 340, height: 340, borderRadius: "50%", background: "#6FCFB2", filter: "blur(70px)", opacity: 0.25, pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 56, alignItems: "center" }} >
        <div className="lp-hero-text">
          <div className="sticker" style={{ background: "#6FCFB2" }}>
            🐻 New patients · First visit free
          </div>
          <h1 style={{ fontSize: "clamp(44px, 6.2vw, 84px)", lineHeight: 0.98, marginTop: 22, letterSpacing: "-0.03em" }}>
            Finally, a dentist your kid <span className="wavy">won't cry about.</span>
          </h1>
          <p style={{ marginTop: 22, fontSize: 19, maxWidth: 560, color: "#4a3326" }}>
            Gentle pediatric dental care for ages 1-12. Most kids leave asking when they can come back. Board-certified pediatric specialists, three Riverside locations, same-week openings.
          </p>

          <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <a href="#book" className="btn btn-coral" style={{ fontSize: 17, padding: "16px 26px" }}>Book their first visit →</a>
            <a href="tel:5551234386" className="btn btn-ghost">📞 (555) 123-CHEW</a>
          </div>

          {/* Trust strip — 4 badges */}
          <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(4, auto)", gap: 20, alignItems: "center" }} className="lp-trust">
            <div>
              <div style={{ display: "flex", gap: 1 }}>
                {[1,2,3,4,5].map(i => <span key={i} style={{ color: "#F2C94C", fontSize: 18 }}>★</span>)}
              </div>
              <div style={{ fontSize: 12, marginTop: 4, fontWeight: 700 }}>4.9 · 2,847 reviews</div>
            </div>
            <div style={{ width: 1, height: 32, background: "rgba(42,24,16,0.15)" }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: 14 }}>Board-Certified</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#7a3e22" }}>Pediatric specialists</div>
            </div>
            <div style={{ width: 1, height: 32, background: "rgba(42,24,16,0.15)" }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: 14 }}>12,000+ kids</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#7a3e22" }}>Treated since 2019</div>
            </div>
          </div>
        </div>

        {/* Hero visual */}
        <div style={{ position: "relative" }} className="lp-hero-img">
          <div style={{
            background: "#F4845F",
            borderRadius: 36,
            aspectRatio: "4/5",
            position: "relative",
            overflow: "hidden",
            border: "3px solid #2A1810",
            boxShadow: "10px 10px 0 #2A1810",
          }}>
            <image-slot id="lp-hero-photo" shape="rect" fetchpriority="high" placeholder="Hero — kid mid-high-five with a dentist, real office, warm light" style={{ width: "100%", height: "100%" }}></image-slot>
          </div>

          {/* Floating sticker 1 — kid quote */}
          <div style={{ position: "absolute", top: -16, left: -28, transform: "rotate(-6deg)" }}>
            <div style={{ background: "#FFF6E8", border: "3px solid #2A1810", padding: "12px 18px", borderRadius: 20, boxShadow: "5px 5px 0 #2A1810", maxWidth: 220 }}>
              <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 16, lineHeight: 1.2 }}>"Mom, that was actually fun."</div>
              <div style={{ fontSize: 11, marginTop: 6, opacity: 0.65 }}>— Mason, age 7 (first visit)</div>
            </div>
          </div>

          {/* Floating sticker 2 — risk reversal */}
          <div style={{ position: "absolute", bottom: 24, right: -32, transform: "rotate(5deg)" }}>
            <div style={{ background: "#F2C94C", border: "3px solid #2A1810", padding: "12px 18px", borderRadius: 20, boxShadow: "5px 5px 0 #2A1810" }}>
              <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 15 }}>First visit on us</div>
              <div style={{ fontSize: 11, marginTop: 4, opacity: 0.75 }}>Exam · cleaning · x-rays</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          section[data-screen-label="01 Hero"] .container { grid-template-columns: 1fr !important; }
          .lp-hero-img { max-width: 520px; margin: 0 auto; }
        }
        @media (max-width: 560px) {
          .lp-trust { grid-template-columns: 1fr 1fr !important; gap: 14px !important; }
          .lp-trust > div:nth-child(2), .lp-trust > div:nth-child(4) { display: none; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// 2 · PROBLEM AGITATION — "You've been here before."
// ============================================================

function ProblemAgitation() {
  const pains = [
    { icon: "😢", text: "Crying in the car on the way over." },
    { icon: "✊", text: "White-knuckle grip in the waiting room." },
    { icon: "😩", text: "A dentist with no patience for a wiggler." },
    { icon: "💸", text: "A bill that arrived two weeks later — and stung." },
    { icon: "🦷", text: "Bedtime brushing fights for a month after." },
  ];

  return (
    <section style={{ background: "#2A1810", color: "#FFF6E8", padding: "96px 0" }} data-screen-label="02 Problem">
      <div className="container">
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <div className="eyebrow" style={{ color: "#F4845F", opacity: 1 }}>You've been here before</div>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 60px)", marginTop: 14, color: "#FFF6E8" }}>
            Every "kid-friendly" dentist <em style={{ fontStyle: "normal", color: "#F4845F" }}>says</em> they're kid-friendly.
          </h2>
          <p style={{ marginTop: 20, fontSize: 19, opacity: 0.78, maxWidth: 600, margin: "20px auto 0" }}>
            Few actually are. If any of these sound familiar, you're in the right place.
          </p>
        </div>

        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, maxWidth: 1100, margin: "56px auto 0" }}>
          {pains.map((p, i) => (
            <div key={i} style={{
              background: "rgba(255,246,232,0.06)",
              border: "1px solid rgba(255,246,232,0.12)",
              borderRadius: 18,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}>
              <div style={{ fontSize: 28 }}>{p.icon}</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, lineHeight: 1.3 }}>{p.text}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 56, textAlign: "center", fontSize: 18, opacity: 0.75, maxWidth: 600, margin: "56px auto 0" }}>
          It doesn't have to be like that. <span style={{ color: "#6FCFB2", fontWeight: 700 }}>Keep scrolling.</span>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// 3 · PROMISE — 4 differentiators
// ============================================================

function Promise_() {
  const diffs = [
    {
      num: "01",
      color: "#F4845F",
      title: "We meet your kid where they are.",
      desc: "Anxious? Wiggly? Nonverbal? We adapt. Every kid gets a custom plan, not a script. First visits run 30 minutes — never a clock-watching 12-minute slot.",
    },
    {
      num: "02",
      color: "#6FCFB2",
      title: "No surprise costs. Ever.",
      desc: "We verify your insurance before you arrive and text you a confirmed estimate within an hour of booking. Plain-English coverage, no jargon, no statements in the mail you can't read.",
    },
    {
      num: "03",
      color: "#F2C94C",
      title: "Sedation when needed — never as a shortcut.",
      desc: "We try every non-invasive technique first: weighted blankets, ceiling TVs, tell-show-do, your kid's playlist. When sedation is the right call, you'll know exactly why and what to expect.",
    },
    {
      num: "04",
      color: "#A0522D",
      title: "An office your kid wants to visit.",
      desc: "Themed treatment rooms. Picked-by-the-kid show on the ceiling TV. Prize wall at the end. Parents stay in the room — always. We earn their trust; we don't just distract them.",
    },
  ];

  return (
    <section style={{ padding: "104px 0" }} data-screen-label="03 Promise">
      <div className="container">
        <div className="section-head" style={{ textAlign: "center", margin: "0 auto 64px" }}>
          <div className="eyebrow">Here's what we do differently</div>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 60px)", marginTop: 14 }}>
            Four things every <span className="wavy">other dentist</span> gets wrong.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="lp-promise-grid">
          {diffs.map((d) => (
            <div key={d.num} style={{
              background: "#fff",
              border: "2px solid #2A1810",
              borderRadius: 24,
              padding: 36,
              boxShadow: `8px 8px 0 ${d.color}`,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: d.color,
                  border: "2px solid #2A1810",
                  display: "grid", placeItems: "center",
                  fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20,
                  color: "#2A1810",
                }}>{d.num}</div>
                <h3 style={{ fontSize: 24, flex: 1 }}>{d.title}</h3>
              </div>
              <p style={{ fontSize: 16, color: "#4a3326", lineHeight: 1.55 }}>{d.desc}</p>
            </div>
          ))}
        </div>

        {/* Team photo — slot for real photo */}
        <div style={{ marginTop: 56, maxWidth: 1100, margin: "56px auto 0" }}>
          <PhotoSlot
            width={1200}
            height={800}
            src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&q=80&auto=format&fit=crop"
            caption={<>Dr. <strong>{"{{LAST_NAME}}"}</strong> and the team — Riverside, IL</>}
          />
        </div>

        <style>{`
          @media (max-width: 820px) {
            .lp-promise-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

// ============================================================
// 3.5 · OFFICE TOUR — 3 real-photo slots
// ============================================================

function OfficeTour() {
  const slots = [
    { caption: <>Where the magic happens — treatment room 02</>, src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80&auto=format&fit=crop" },
    { caption: <>Their chair, their show — ceiling screen view</>, src: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1200&q=80&auto=format&fit=crop" },
    { caption: <>The prize wall (yes, every visit)</>, src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80&auto=format&fit=crop" },
  ];

  return (
    <section style={{ padding: "104px 0", background: "#FFF6E8" }} data-screen-label="03b Office Tour">
      <div className="container">
        <div className="section-head" style={{ textAlign: "center", margin: "0 auto 56px" }}>
          <div className="eyebrow">Take a look around</div>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 56px)", marginTop: 14 }}>
            Yes, it really <span className="wavy">looks like this.</span>
          </h2>
          <p style={{ marginTop: 18, color: "#4a3326", fontSize: 18, maxWidth: 640, margin: "18px auto 0" }}>
            No fluorescent dread, no cold metal. The room your kid sees first sets the tone for the next ten years of dental visits.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }} className="lp-tour-grid">
          {slots.map((s, i) => (
            <PhotoSlot
              key={i}
              width={1200}
              height={800}
              src={s.src}
              caption={s.caption}
              tint={i === 1 ? "#FBEED4" : "#FFF6E8"}
              rotate={i === 0 ? -0.6 : i === 2 ? 0.6 : 0}
            />
          ))}
        </div>

        <style>{`
          @media (max-width: 820px) {
            .lp-tour-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

// ============================================================
// 4 · PROOF — testimonials + authority + numbers
// ============================================================

function Proof() {
  const testimonials = [
    {
      quote: "My son Mason has autism and we'd been turned away by two dentists. Dr. Solano and his team spent 40 minutes just letting him explore the chair. By visit three, he sat for a full cleaning. I cried in the parking lot.",
      parent: "Jennifer R.",
      kid: "Mason, age 8",
      color: "#F4845F",
      initial: "J",
    },
    {
      quote: "Avery is four and has a gag reflex from hell. Dr. Park got her through her first cleaning by letting her hold the mirror and pick the polish flavor. We left with a sticker and a kid who wants to come back. Speechless.",
      parent: "Priya M.",
      kid: "Avery, age 4",
      color: "#6FCFB2",
      initial: "P",
    },
    {
      quote: "Booked online at 11pm. Confirmed slot for 9am the next morning. Insurance verified before we walked in. They texted me the exact out-of-pocket — $0 — before I got out of the car. This is how healthcare should work.",
      parent: "Marcus T.",
      kid: "Theo, age 6",
      color: "#F2C94C",
      initial: "M",
    },
  ];

  const credentials = [
    { label: "Board-Certified Pediatric Dentists", sub: "American Board of Pediatric Dentistry (AAPD)" },
    { label: "Top Dentists 2024", sub: "Riverside Magazine, 4 years running" },
    { label: "Hospital Privileges", sub: "Riverside Children's Hospital, OR-based sedation" },
    { label: "CPR / PALS certified team", sub: "Every clinical staff member, recertified yearly" },
  ];

  return (
    <section style={{ background: "#FBEED4", padding: "104px 0" }} data-screen-label="04 Proof">
      <div className="container">
        <div className="section-head" style={{ textAlign: "center", margin: "0 auto 56px" }}>
          <div className="eyebrow">2,847 reviews · 4.9 stars · 92% referred by another parent</div>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 60px)", marginTop: 14 }}>
            Don't take our word for it.
          </h2>
          <p style={{ marginTop: 16, color: "#4a3326", fontSize: 18, maxWidth: 600, margin: "16px auto 0" }}>
            Real parents. Real kids. Specific situations. (We text every parent after their visit asking how it went — these are the answers.)
          </p>
        </div>

        {/* Testimonial cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="lp-proof-grid">
          {testimonials.map((t, i) => (
            <div key={i} style={{
              background: "#fff",
              border: "2px solid #2A1810",
              borderRadius: 24,
              padding: 28,
              boxShadow: "6px 6px 0 #2A1810",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}>
              <div style={{ display: "flex", gap: 1 }}>
                {[1,2,3,4,5].map(s => <span key={s} style={{ color: "#F2C94C", fontSize: 18 }}>★</span>)}
              </div>
              <p style={{ fontSize: 16, lineHeight: 1.55, color: "#2A1810", flex: 1 }}>"{t.quote}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 14, borderTop: "1px dashed rgba(42,24,16,0.18)" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: t.color, color: "#fff",
                  display: "grid", placeItems: "center",
                  fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18,
                  border: "2px solid #2A1810",
                }}>{t.initial}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{t.parent}</div>
                  <div style={{ fontSize: 12, color: "#7a3e22" }}>{t.kid}'s mom</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Credentials row */}
        <div style={{
          marginTop: 48,
          background: "#fff",
          border: "2px solid #2A1810",
          borderRadius: 24,
          padding: 32,
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24,
        }} className="lp-creds-grid">
          {credentials.map((c, i) => (
            <div key={i} style={{
              borderRight: i < 3 ? "1px dashed rgba(42,24,16,0.18)" : "none",
              paddingRight: i < 3 ? 24 : 0,
            }} className="lp-cred-cell">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#6FCFB2", display: "grid", placeItems: "center", color: "#2A1810", fontWeight: 800, fontSize: 14 }}>✓</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>{c.label}</div>
              </div>
              <div style={{ marginTop: 8, fontSize: 12, color: "#7a3e22", lineHeight: 1.5 }}>{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Numbers bar */}
        <div style={{
          marginTop: 24,
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0,
          background: "#2A1810", color: "#FFF6E8",
          borderRadius: 24,
          padding: "28px 0",
        }} className="lp-numbers-grid">
          {[
            { n: "12,000+", l: "kids treated" },
            { n: "4.9★", l: "average rating" },
            { n: "92%", l: "come from parent referrals" },
            { n: "<1 hr", l: "to confirmed estimate" },
          ].map((n, i) => (
            <div key={i} style={{
              textAlign: "center",
              borderRight: i < 3 ? "1px solid rgba(255,246,232,0.15)" : "none",
              padding: "0 16px",
            }} className="lp-num-cell">
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 36, color: "#F2C94C" }}>{n.n}</div>
              <div style={{ fontSize: 13, opacity: 0.75, marginTop: 4 }}>{n.l}</div>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 960px) {
            .lp-proof-grid { grid-template-columns: 1fr !important; }
            .lp-creds-grid { grid-template-columns: 1fr 1fr !important; }
            .lp-creds-grid > div { border-right: none !important; padding-right: 0 !important; }
            .lp-numbers-grid { grid-template-columns: 1fr 1fr !important; gap: 16px 0 !important; }
            .lp-numbers-grid > div:nth-child(odd) { border-right: 1px solid rgba(255,246,232,0.15); }
            .lp-numbers-grid > div:nth-child(2) { border-right: none !important; }
            .lp-stats-grid { grid-template-columns: 1fr !important; max-width: 420px; }
          }
          @media (max-width: 480px) {
            .lp-numbers-grid { grid-template-columns: 1fr !important; }
            .lp-numbers-grid > div { border-right: none !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

// ============================================================
// 5 · PICTURE — the after-state
// ============================================================

function Picture() {
  return (
    <section style={{ padding: "104px 0", position: "relative", overflow: "hidden" }} data-screen-label="05 Picture">
      <div style={{ position: "absolute", top: 60, left: -80, width: 320, height: 320, borderRadius: "50%", background: "#F2C94C", filter: "blur(60px)", opacity: 0.25, pointerEvents: "none" }} />

      <div className="container lp-picture-grid" style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 56, alignItems: "center" }}>
        <div className="lp-picture-text">
          <div className="eyebrow">Imagine</div>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 56px)", marginTop: 14, lineHeight: 1.0 }}>
            The next dentist visit goes <span className="wavy">like this.</span>
          </h2>
          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { icon: "🚪", t: "Your kid skips into the office.", s: "High-fives the front desk. Asks if Mol the bear is in today." },
              { icon: "🪑", t: "They climb into the chair on their own.", s: "Pick their polish flavor. Pick the show on the ceiling TV." },
              { icon: "🎟️", t: "They leave with a sticker and a smile.", s: "Tell you, on the way home, that they actually liked it." },
              { icon: "🌱", t: "They grow up unafraid of the dentist.", s: "Because nothing about it ever scared them in the first place." },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: "#FBEED4",
                  border: "2px solid #2A1810",
                  display: "grid", placeItems: "center",
                  fontSize: 22,
                  flexShrink: 0,
                }}>{row.icon}</div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 19 }}>{row.t}</div>
                  <div style={{ marginTop: 4, fontSize: 15, color: "#4a3326" }}>{row.s}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 36 }}>
            <a href="#book" className="btn btn-coral" style={{ fontSize: 17, padding: "16px 26px" }}>Book their first visit →</a>
          </div>
        </div>

        <div style={{ position: "relative" }} className="lp-picture-img">
          <div style={{
            background: "#6FCFB2",
            borderRadius: 32,
            aspectRatio: "1/1",
            overflow: "hidden",
            border: "3px solid #2A1810",
            boxShadow: "10px 10px 0 #2A1810",
          }}>
            <image-slot id="lp-picture-photo" shape="rect" placeholder="Photo — kid grinning post-visit holding a sticker prize" style={{ width: "100%", height: "100%" }}></image-slot>
          </div>
          {/* sticker */}
          <div style={{ position: "absolute", top: -20, right: -16, transform: "rotate(8deg)" }}>
            <div className="sticker" style={{ background: "#F4845F", color: "#fff", borderColor: "#2A1810", fontSize: 14, padding: "10px 16px" }}>★ The whole reason we do this ★</div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          section[data-screen-label="05 Picture"] .container { grid-template-columns: 1fr !important; }
          .lp-picture-img { max-width: 480px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// 6 · PUSH — risk reversal + soft urgency (the BOOK section)
// ============================================================

function Push() {
  return (
    <section id="book" style={{ background: "#F4845F", color: "#fff", padding: "104px 0", position: "relative", overflow: "hidden" }} data-screen-label="06 Push (book)">
      <div style={{ position: "absolute", top: -40, right: -40, opacity: 0.18 }}>
        <BearMascot pose="wave" size={320} />
      </div>

      <div className="container" style={{ position: "relative" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <div className="sticker" style={{ background: "#F2C94C", borderColor: "#2A1810", color: "#2A1810" }}>
            🎟️ First visit on us — new patients only
          </div>
          <h2 style={{ fontSize: "clamp(40px, 5.5vw, 68px)", marginTop: 22, lineHeight: 1.0, color: "#FFF6E8" }}>
            Your kid's first visit is <em style={{ fontStyle: "normal", color: "#F2C94C" }}>completely free.</em>
          </h2>
          <p style={{ marginTop: 22, fontSize: 19, color: "#FFF6E8", opacity: 0.95, maxWidth: 620, margin: "22px auto 0" }}>
            Exam. Cleaning. X-rays if needed. A real conversation with the doctor. No charge, no obligation, no pressure to book treatment.
          </p>
        </div>

        {/* Booking card */}
        <div style={{
          marginTop: 48,
          maxWidth: 720,
          margin: "48px auto 0",
          background: "#FFF6E8",
          color: "#2A1810",
          border: "3px solid #2A1810",
          boxShadow: "10px 10px 0 #2A1810",
          borderRadius: 28,
          padding: 40,
        }} className="lp-book-card">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="lp-book-grid">
            <a href="Contact.html" style={{
              background: "#2A1810", color: "#FFF6E8",
              borderRadius: 20, padding: 28,
              textAlign: "center",
              border: "2px solid #2A1810",
              transition: "transform 0.12s",
            }} onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ fontSize: 36 }}>📅</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, marginTop: 8 }}>Book online</div>
              <div style={{ fontSize: 13, opacity: 0.8, marginTop: 6 }}>60-second secure form. Most slots within 1-2 weeks.</div>
              <div style={{ marginTop: 14, fontWeight: 700, color: "#F4845F" }}>Continue →</div>
            </a>
            <a href="tel:5551234386" style={{
              background: "#fff",
              borderRadius: 20, padding: 28,
              textAlign: "center",
              border: "2px solid #2A1810",
              color: "#2A1810",
              transition: "transform 0.12s",
            }} onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ fontSize: 36 }}>📞</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, marginTop: 8 }}>(555) 123-CHEW</div>
              <div style={{ fontSize: 13, color: "#7a3e22", marginTop: 6 }}>Real human, every call. Returned same-day.</div>
              <div style={{ marginTop: 14, fontWeight: 700, color: "#F4845F" }}>Call now →</div>
            </a>
          </div>

          <div style={{
            marginTop: 24,
            padding: "16px 20px",
            background: "#FBEED4",
            borderRadius: 14,
            display: "flex",
            gap: 14,
            alignItems: "center",
            fontSize: 14,
            lineHeight: 1.5,
          }}>
            <span style={{ fontSize: 22 }}>🛡️</span>
            <div>
              <strong>Our promise:</strong> If you're not 100% comfortable after the first visit, you don't come back. Simple as that.
            </div>
          </div>

          <div style={{ marginTop: 16, textAlign: "center", fontSize: 13, color: "#7a3e22" }}>
            Schedules fill fast — most new-patient slots are 1-2 weeks out. Grab a time before they're gone.
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// 7 · PRICE — pricing clarity
// ============================================================

function Price() {
  return (
    <section style={{ padding: "104px 0" }} data-screen-label="07 Price">
      <div className="container">
        <div className="section-head" style={{ textAlign: "center", margin: "0 auto 56px" }}>
          <div className="eyebrow">Straightforward pricing</div>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 56px)", marginTop: 14 }}>
            No surprise bills. <span className="wavy">Ever.</span>
          </h2>
          <p style={{ marginTop: 16, color: "#4a3326", fontSize: 18, maxWidth: 600, margin: "16px auto 0" }}>
            Three ways to pay. All of them transparent. We text you a confirmed estimate within 1 business hour of booking.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, maxWidth: 1080, margin: "0 auto" }} className="lp-price-grid">
          {/* New patient */}
          <div style={{
            background: "#fff",
            border: "2px solid #2A1810",
            borderRadius: 24,
            padding: 32,
            boxShadow: "6px 6px 0 #2A1810",
            display: "flex", flexDirection: "column", gap: 14,
          }}>
            <div className="sticker" style={{ background: "#F2C94C", alignSelf: "flex-start" }}>Most popular</div>
            <h3 style={{ fontSize: 22, marginTop: 6 }}>First visit</h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 44, color: "#F4845F" }}>$0</div>
              <div style={{ fontSize: 14, color: "#7a3e22" }}>new patients only</div>
            </div>
            <div style={{ fontSize: 14, color: "#4a3326", lineHeight: 1.6 }}>Exam, cleaning, fluoride varnish, and x-rays if clinically needed. Plus a full conversation with the doctor about anything on your mind.</div>
            <a href="#book" className="btn btn-coral" style={{ alignSelf: "flex-start", marginTop: 6 }}>Book free visit →</a>
          </div>

          {/* Insurance */}
          <div style={{
            background: "#fff",
            border: "2px solid #2A1810",
            borderRadius: 24,
            padding: 32,
            boxShadow: "6px 6px 0 #6FCFB2",
            display: "flex", flexDirection: "column", gap: 14,
          }}>
            <div className="eyebrow" style={{ marginBottom: 0 }}>For most families</div>
            <h3 style={{ fontSize: 22 }}>Insurance accepted</h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 32, color: "#2A1810" }}>15+ plans</div>
            </div>
            <div style={{ fontSize: 14, color: "#4a3326", lineHeight: 1.6 }}>Delta Dental, Aetna, Cigna, BCBS/Anthem, MetLife, Guardian, United, plus Medicaid & CHIP. We file claims for you. Coverage verified before your visit.</div>
            <a href="Insurance.html" className="btn btn-ghost" style={{ alignSelf: "flex-start", marginTop: 6 }}>Check yours →</a>
          </div>

          {/* Membership */}
          <div style={{
            background: "#fff",
            border: "2px solid #2A1810",
            borderRadius: 24,
            padding: 32,
            boxShadow: "6px 6px 0 #F4845F",
            display: "flex", flexDirection: "column", gap: 14,
          }}>
            <div className="eyebrow" style={{ marginBottom: 0 }}>No insurance?</div>
            <h3 style={{ fontSize: 22 }}>Membership plan</h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 44, color: "#F4845F" }}>$35</div>
              <div style={{ fontSize: 16, color: "#7a3e22" }}>/ kid / month</div>
            </div>
            <div style={{ fontSize: 14, color: "#4a3326", lineHeight: 1.6 }}>Two cleanings & exams per year. Free fluoride. 20% off all treatments. No deductibles. Cancel anytime.</div>
            <a href="#book" className="btn btn-ghost" style={{ alignSelf: "flex-start", marginTop: 6 }}>Learn more →</a>
          </div>
        </div>

        <style>{`
          @media (max-width: 960px) {
            .lp-price-grid { grid-template-columns: 1fr !important; max-width: 480px; }
          }
        `}</style>
      </div>
    </section>
  );
}


// ============================================================
// 8 · FAQ — pre-empt 8 objections
// ============================================================

function LandingFAQ() {
  const faqs = [
    {
      q: "What if my child is scared or has had a bad experience before?",
      a: "We see this every day. Dr. Park specializes in 'first-visit success' for kids with dental anxiety — including kids who've been turned away elsewhere. Our first visits are 30 minutes (not the industry-standard 12), and we never push a child past their comfort. Most anxious kids leave their first visit calmer than they walked in.",
    },
    {
      q: "At what age should my child first come?",
      a: "The American Academy of Pediatric Dentistry recommends a first visit by age 1, or within 6 months of the first tooth. The visit is brief, friendly, and mostly about getting your child comfortable with us. Parents stay in the room the entire time.",
    },
    {
      q: "Do you accept my insurance?",
      a: "We're in-network with 15+ major plans: Delta Dental, Aetna, Cigna, BCBS/Anthem, MetLife, Guardian, United Healthcare, plus Medicaid and CHIP in Illinois. Tell us your plan when you book — we verify coverage and text you a confirmed estimate within 1 business hour.",
    },
    {
      q: "What if my child needs sedation?",
      a: "We offer nitrous (laughing gas) for kids 4+, oral conscious sedation, and hospital-based general anesthesia for complex cases. But we always try non-sedation techniques first: weighted blankets, headphones, tell-show-do, your kid's playlist. Sedation is a tool, not a shortcut.",
    },
    {
      q: "How long does the first visit take?",
      a: "Plan for about 30 minutes door-to-door. That's longer than most offices on purpose — we want your child to get comfortable, not rushed through. New-patient paperwork is done online before you arrive, so the waiting room is for sticker-picking, not clipboarding.",
    },
    {
      q: "What if my child has special needs?",
      a: "Dr. Solano trained in adaptive techniques at Boston Children's and specializes in kids with sensory sensitivities, autism, and developmental differences. Every location has a sensory-friendly room with low lights, weighted blankets, noise-canceling headphones, and quiet equipment. Tell us what your kid needs when you book.",
    },
    {
      q: "Do you handle dental emergencies?",
      a: "Yes — every weekday we hold same-day slots open for emergencies. Knocked-out permanent tooth? Put it in milk and come straight in. After hours, our voicemail routes directly to the on-call dentist's mobile, returned within 20 minutes.",
    },
    {
      q: "What's the difference between a pediatric and a regular dentist?",
      a: "Pediatric dentists complete 2-3 additional years of specialty training after dental school, focused entirely on infants, children, teens, and kids with special needs. We're board-certified by the American Board of Pediatric Dentistry. We don't see adult patients — kids are 100% of what we do.",
    },
  ];

  const [open, setOpen] = useState(0);

  return (
    <section style={{ background: "#FBEED4", padding: "104px 0" }} data-screen-label="08 FAQ">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 56, alignItems: "start" }} className="lp-faq-grid">
          <div style={{ position: "sticky", top: 100 }} className="lp-faq-side">
            <div className="eyebrow">What parents ask first</div>
            <h2 style={{ fontSize: "clamp(36px, 4.5vw, 52px)", marginTop: 14, lineHeight: 1.0 }}>Eight honest answers.</h2>
            <p style={{ marginTop: 18, color: "#4a3326", fontSize: 17 }}>
              The questions parents ask us most often, in plain English. If yours isn't here, text us at <a href="sms:5551234386" style={{ color: "#A0522D", fontWeight: 700 }}>(555) 123-CHEW</a> — we reply within an hour.
            </p>
            <div style={{ marginTop: 28, padding: 20, background: "#fff", border: "2px solid #2A1810", borderRadius: 20, display: "flex", gap: 14, alignItems: "center" }}>
              <BearMascot pose="peek" size={56} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Still wondering?</div>
                <a href="#book" style={{ marginTop: 4, display: "inline-block", color: "#F4845F", fontWeight: 700, fontSize: 14 }}>Book a free visit anyway →</a>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {faqs.map((f, i) => (
              <div key={i} style={{
                background: "#fff",
                border: "2px solid rgba(42,24,16,0.08)",
                borderRadius: 18,
                overflow: "hidden",
              }}>
                <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                  width: "100%",
                  padding: "20px 24px",
                  background: "transparent",
                  border: 0,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  textAlign: "left",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 17,
                  color: "#2A1810",
                  cursor: "pointer",
                }}>
                  <span>{f.q}</span>
                  <span style={{
                    width: 30, height: 30, borderRadius: 999, background: open === i ? "#F4845F" : "#FFF6E8",
                    color: open === i ? "#fff" : "#2A1810",
                    display: "grid", placeItems: "center", fontSize: 17,
                    flexShrink: 0,
                    transition: "all 0.15s",
                    transform: open === i ? "rotate(45deg)" : "rotate(0)",
                  }}>+</span>
                </button>
                {open === i && (
                  <div style={{ padding: "0 24px 22px", color: "#4a3326", fontSize: 15, lineHeight: 1.6 }}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 960px) {
            .lp-faq-grid { grid-template-columns: 1fr !important; }
            .lp-faq-side { position: static !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

// ============================================================
// 8.5 · AFTER YOU BOOK — 3-step reassurance
// ============================================================

function AfterYouBook() {
  const steps = [
    {
      title: "We confirm by text within 1 hour",
      body: "No phone tag, no waiting on hold. You'll know the visit is locked in before you finish your coffee.",
      bg: "#F4845F", fg: "#FFF6E8", badgeBg: "#FFF6E8", badgeFg: "#2A1810",
    },
    {
      title: "You get a new-patient form",
      body: "5 minutes, fillable on your phone. Insurance details, medical history, anything we should know about your kid. Done before you walk in.",
      bg: "#6FCFB2", fg: "#2A1810", badgeBg: "#2A1810", badgeFg: "#6FCFB2",
    },
    {
      title: "Walk in, no surprises",
      body: "Free parking out front, themed waiting room, prize wall on the way out. Most first visits are 45 minutes, start to sticker.",
      bg: "#F4845F", fg: "#FFF6E8", badgeBg: "#FFF6E8", badgeFg: "#2A1810",
    },
  ];

  return (
    <section style={{ padding: "104px 0" }} data-screen-label="08b After you book">
      <div className="container">
        <div className="section-head" style={{ textAlign: "center", margin: "0 auto 64px" }}>
          <div className="eyebrow">No mystery, no surprises</div>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 56px)", marginTop: 14 }}>
            Here's what happens <span className="wavy">after you book.</span>
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 28,
          maxWidth: 1140,
          margin: "0 auto",
          paddingTop: 28,
        }} className="lp-steps-grid">
          {steps.map((s, i) => (
            <div key={i} style={{ position: "relative", paddingTop: 14 }}>
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: -14,
                  left: -14,
                  width: 64, height: 64,
                  borderRadius: "50%",
                  background: s.badgeBg,
                  color: s.badgeFg,
                  border: "3px solid #2A1810",
                  boxShadow: "5px 5px 0 #2A1810",
                  display: "grid", placeItems: "center",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700, fontSize: 26,
                  zIndex: 2,
                }}
              >
                {i + 1}
              </div>
              <div className="lp-step-card" style={{
                background: s.bg,
                color: s.fg,
                border: "3px solid #2A1810",
                borderRadius: 24,
                padding: "32px 28px 28px 28px",
                boxShadow: "8px 8px 0 #2A1810",
                minHeight: 240,
                display: "flex", flexDirection: "column", gap: 12,
              }}>
                <h3 style={{ fontSize: 22, lineHeight: 1.15, color: s.fg, marginTop: 16 }}>{s.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.55, color: s.fg, opacity: 0.92 }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 900px) {
            .lp-steps-grid { grid-template-columns: 1fr !important; max-width: 520px; gap: 36px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

// ============================================================
// 9 · FINAL CTA — last chance
// ============================================================

function FinalCTA() {
  return (
    <section style={{ background: "#2A1810", color: "#FFF6E8", padding: "120px 0 100px", position: "relative", overflow: "hidden" }} data-screen-label="09 Final CTA">
      <div style={{ position: "absolute", bottom: -120, left: "50%", transform: "translateX(-50%)", opacity: 0.08 }}>
        <BearMascot pose="tooth" size={500} />
      </div>

      <div className="container" style={{ position: "relative", textAlign: "center", maxWidth: 780 }}>
        <div className="eyebrow" style={{ color: "#F4845F", opacity: 1 }}>Ready when you are</div>
        <h2 style={{ fontSize: "clamp(48px, 6.5vw, 84px)", marginTop: 18, lineHeight: 0.95, color: "#FFF6E8" }}>
          Let's get that first visit on the <span style={{ color: "#F2C94C" }}>calendar.</span>
        </h2>
        <p style={{ marginTop: 24, fontSize: 19, opacity: 0.82, maxWidth: 600, margin: "24px auto 0" }}>
          Book online in 60 seconds, or call <a href="tel:5551234386" style={{ color: "#F2C94C", fontWeight: 700 }}>(555) 123-CHEW</a>. New patients usually find a spot within the next 1-2 weeks.
        </p>

        <div style={{ marginTop: 36, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="Contact.html" className="btn btn-coral" style={{ fontSize: 17, padding: "18px 30px" }}>Book their first visit →</a>
          <a href="tel:5551234386" className="btn btn-ghost" style={{ color: "#FFF6E8", borderColor: "#FFF6E8" }}>📞 (555) 123-CHEW</a>
        </div>

        <div style={{ marginTop: 40, fontSize: 13, opacity: 0.6, fontFamily: "var(--font-mono)" }}>
          MON-FRI 8AM-6PM · SAT 9AM-2PM · EVERY CALL RETURNED SAME-DAY
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MINIMAL FOOTER for landing page — w/ building exterior thumb
// ============================================================

function LandingFooter() {
  return (
    <footer style={{ background: "#2A1810", color: "#FFF6E8", padding: "56px 0 40px", borderTop: "1px solid rgba(255,246,232,0.1)" }}>
      <div className="container lp-foot-grid" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 36, alignItems: "center", marginBottom: 32 }}>
        <div style={{ width: 240, flexShrink: 0 }} className="lp-foot-thumb">
          <div style={{
            position: "relative",
            aspectRatio: "3/2",
            border: "3px solid #FFF6E8",
            borderRadius: 16,
            overflow: "hidden",
          }}>
            <img src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80&auto=format&fit=crop" alt="Office exterior" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </div>
        <div>
          <div className="eyebrow" style={{ color: "#F4845F", opacity: 1, marginBottom: 8 }}>You'll know it when you see it</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, lineHeight: 1.25 }}>
            Look for this when you pull up.
          </div>
          <div style={{ marginTop: 6, fontSize: 15, opacity: 0.78 }}>
            {"{{STREET_ADDRESS}}"} · free parking out front · accessible entrance on the south side.
          </div>
        </div>
      </div>

      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20, fontSize: 13, opacity: 0.6, borderTop: "1px solid rgba(255,246,232,0.1)", paddingTop: 24 }}>
        <div>© 2026 Molar Bear Pediatric Dental, P.C. · Board-Certified · HIPAA compliant</div>
        <div style={{ display: "flex", gap: 20 }}>
          <a href="Privacy.html">Privacy</a>
          <a href="Notice-of-Privacy.html">Notice of Privacy Practices</a>
          <a href="Home.html">Full site</a>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          footer .lp-foot-grid { grid-template-columns: 1fr !important; text-align: center; }
          footer .lp-foot-thumb { width: 200px !important; margin: 0 auto; }
        }
      `}</style>
    </footer>
  );
}

// ============================================================
// STICKY MOBILE CTA BAR — fixed bottom, mobile only
// ============================================================

function StickyMobileCTA() {
  return (
    <div className="lp-sticky-cta" role="navigation" aria-label="Quick actions" style={{
      position: "fixed",
      left: 0, right: 0, bottom: 0,
      zIndex: 100,
      padding: "12px 14px calc(12px + env(safe-area-inset-bottom))",
      background: "rgba(255,246,232,0.96)",
      backdropFilter: "blur(10px)",
      borderTop: "2px solid #2A1810",
      boxShadow: "0 -6px 0 rgba(42,24,16,0.06)",
      display: "none",
      gap: 10,
    }}>
      <a href="#book" className="btn btn-coral" style={{
        flex: 1, justifyContent: "center", minHeight: 52, fontSize: 16, padding: "14px 18px",
      }}>Book a Visit</a>
      <a href={"tel:{{PHONE_E164}}"} className="btn btn-mint" style={{
        flex: 1, justifyContent: "center", minHeight: 52, fontSize: 16, padding: "14px 18px",
      }}>📞 Call</a>
      <style>{`
        @media (max-width: 768px) {
          .lp-sticky-cta { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

// ============================================================
// BEFORE / AFTER — draggable demo
// ============================================================
function LPSlider() {
  const [pos, setPos] = useState(50);
  const ref = useRef(null);
  const dragging = useRef(false);
  const move = (clientX) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };
  const down = (e) => { dragging.current = true; move((e.touches ? e.touches[0] : e).clientX); };
  const mv = (e) => { if (dragging.current) move((e.touches ? e.touches[0] : e).clientX); };
  const up = () => { dragging.current = false; };
  return (
    <div ref={ref}
      onMouseDown={down} onMouseMove={mv} onMouseUp={up} onMouseLeave={up}
      onTouchStart={down} onTouchMove={mv} onTouchEnd={up}
      style={{ position: "relative", aspectRatio: "4/3", borderRadius: 28, overflow: "hidden", border: "3px solid #2A1810", boxShadow: "10px 10px 0 #2A1810", cursor: "ew-resize", userSelect: "none", touchAction: "none", background: "#FBEED4" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <image-slot id="lp-ba-before" shape="rect" placeholder="Before — chipped front tooth" style={{ width: "100%", height: "100%" }}></image-slot>
      </div>
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 0 0 ${pos}%)`, background: "#E8F6F0" }}>
        <image-slot id="lp-ba-after" shape="rect" placeholder="After — bonded composite repair" style={{ width: "100%", height: "100%" }}></image-slot>
      </div>
      <div style={{ position: "absolute", left: 14, top: 14, background: "rgba(42,24,16,0.85)", color: "#FFF6E8", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.2, textTransform: "uppercase", padding: "5px 10px", borderRadius: 99, fontWeight: 700 }}>Before</div>
      <div style={{ position: "absolute", right: 14, top: 14, background: "#6FCFB2", color: "#2A1810", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.2, textTransform: "uppercase", padding: "5px 10px", borderRadius: 99, fontWeight: 700, border: "2px solid #2A1810" }}>After</div>
      <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, width: 4, background: "#2A1810", transform: "translateX(-2px)" }} />
      <div style={{ position: "absolute", top: "50%", left: `${pos}%`, transform: "translate(-50%, -50%)", width: 48, height: 48, borderRadius: 99, background: "#F4845F", border: "3px solid #2A1810", boxShadow: "0 4px 0 #2A1810", display: "grid", placeItems: "center", color: "#fff", fontWeight: 900, fontSize: 18 }}>⟷</div>
    </div>
  );
}

function LandingBeforeAfter() {
  return (
    <section style={{ background: "#FBEED4", padding: "96px 0" }} data-screen-label="Before & after">
      <div className="container lp-ba-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.05fr", gap: 56, alignItems: "center" }}>
        <div>
          <div className="eyebrow">Drag the handle</div>
          <h2 style={{ fontSize: "clamp(32px, 4.5vw, 54px)", marginTop: 14, lineHeight: 1.0 }}>
            From dreading it to <span className="wavy">bragging about it.</span>
          </h2>
          <p style={{ marginTop: 18, fontSize: 18, color: "#4a3326", maxWidth: 460 }}>
            Real Molar Bear patients — same chair, same lighting, no retouching. A chipped front tooth, bonded and color-matched in a single 25-minute visit.
          </p>
          <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#book" className="btn btn-coral" style={{ fontSize: 16 }}>Book their visit →</a>
            <a href="Smile-Gallery.html" className="btn btn-ghost">See more cases</a>
          </div>
        </div>
        <LPSlider />
      </div>
      <style>{`
        @media (max-width: 900px) { .lp-ba-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ============================================================
// INTERACTIVE JOURNEY — 6-step stepper
// ============================================================
const LP_JOURNEY = [
  { icon: "📞", title: "Book", time: "5 min", body: "Online or by phone. We pre-verify your insurance in the background so there are zero surprises at the desk." },
  { icon: "👋", title: "Arrive", time: "10 min", body: "A play corner, a friendly hello, and a tour of the chair. Kids press the buttons and meet Mol before anything happens." },
  { icon: "🔍", title: "Examine", time: "10 min", body: "A gentle count and photos, with one low-dose x-ray only if it's needed. We talk through everything on the screen with you." },
  { icon: "🪥", title: "Clean", time: "12 min", body: "Soft polish, then fluoride varnish in their flavor of choice. No scary scaler unless we truly need it." },
  { icon: "🗒️", title: "Plan", time: "5 min", body: "Findings in plain English, with honest pricing for any next step. Nothing scheduled in a rush." },
  { icon: "🎁", title: "Celebrate", time: "3 min", body: "Treasure chest, a new toothbrush, and a sticker for the wall of fame. The win that makes them want to come back." },
];

function LandingJourney() {
  const [active, setActive] = useState(0);
  const step = LP_JOURNEY[active];
  return (
    <section style={{ padding: "96px 0" }} data-screen-label="Journey">
      <div className="container">
        <div className="section-head" style={{ textAlign: "center", margin: "0 auto 48px" }}>
          <div className="eyebrow">Every step, before you commit</div>
          <h2 style={{ fontSize: "clamp(32px, 4.5vw, 54px)", marginTop: 14 }}>
            What the whole visit <span className="wavy">actually looks like.</span>
          </h2>
        </div>

        {/* Step pills */}
        <div className="lp-jstep-row" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, marginBottom: 32 }}>
          {LP_JOURNEY.map((s, i) => {
            const on = active === i;
            return (
              <button key={i} onClick={() => setActive(i)} style={{
                background: "transparent", border: 0, padding: 0, cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              }}>
                <div style={{
                  width: 68, height: 68, borderRadius: 999,
                  background: on ? "#F4845F" : "#FBEED4",
                  border: "3px solid #2A1810",
                  boxShadow: on ? "0 6px 0 #2A1810" : "0 4px 0 #2A1810",
                  display: "grid", placeItems: "center", fontSize: 28,
                  transform: on ? "translateY(-2px)" : "none", transition: "transform 0.12s, box-shadow 0.12s",
                }}>{s.icon}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13.5, color: on ? "#F4845F" : "#2A1810" }}>{i + 1}. {s.title}</div>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div style={{ background: "#FFF6E8", border: "3px solid #2A1810", borderRadius: 28, padding: 36, boxShadow: "8px 8px 0 #2A1810", display: "grid", gridTemplateColumns: "auto 1fr", gap: 28, alignItems: "center" }} className="lp-jdetail">
          <div style={{ fontSize: 80, lineHeight: 1 }}>{step.icon}</div>
          <div>
            <div className="eyebrow">Step {active + 1} of 6 · ~{step.time}</div>
            <h3 style={{ fontSize: 32, marginTop: 6 }}>{step.title}</h3>
            <p style={{ marginTop: 12, fontSize: 18, color: "#4a3326", maxWidth: 680 }}>{step.body}</p>
            <div style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button className="btn btn-ghost btn-sm" onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0} style={{ opacity: active === 0 ? 0.4 : 1 }}>← Previous</button>
              <button className="btn btn-coral btn-sm" onClick={() => setActive(Math.min(LP_JOURNEY.length - 1, active + 1))} disabled={active === LP_JOURNEY.length - 1} style={{ opacity: active === LP_JOURNEY.length - 1 ? 0.4 : 1 }}>Next step →</button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) {
          .lp-jstep-row { grid-template-columns: repeat(3, 1fr) !important; row-gap: 22px !important; }
          .lp-jdetail { grid-template-columns: 1fr !important; gap: 10px !important; padding: 24px !important; }
          .lp-jdetail > div:first-child { font-size: 56px !important; }
        }
        @media (max-width: 460px) { .lp-jstep-row { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  );
}

// ============================================================
// COUNTDOWN — soft scarcity for new-patient slots
// ============================================================
function useLPCountdown() {
  const target = React.useMemo(() => {
    const now = new Date();
    const d = new Date(now);
    const day = d.getDay();
    const untilSunday = (7 - day) % 7 || 7;
    d.setDate(d.getDate() + untilSunday);
    d.setHours(23, 59, 59, 0);
    return d;
  }, []);
  const compute = () => {
    const diff = Math.max(0, target - new Date());
    return [Math.floor(diff / 3.6e6), Math.floor((diff % 3.6e6) / 6e4), Math.floor((diff % 6e4) / 1000)];
  };
  const [t, setT] = useState(compute);
  useEffect(() => {
    const id = setInterval(() => setT(compute()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function LandingCountdown() {
  const [h, m, s] = useLPCountdown();
  return (
    <section style={{ padding: "64px 0" }} data-screen-label="Countdown">
      <div className="container">
        <div style={{ background: "#2A1810", color: "#FFF6E8", borderRadius: 32, border: "3px solid #2A1810", boxShadow: "12px 12px 0 #F4845F", padding: "40px 44px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }} className="lp-count">
          <div style={{ maxWidth: 520 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: 1.6, textTransform: "uppercase", color: "#F2C94C", fontWeight: 700 }}>This week's new-patient openings</div>
            <h3 style={{ fontSize: "clamp(26px, 3.4vw, 40px)", marginTop: 10, color: "#FFF6E8", lineHeight: 1.1 }}>
              <span style={{ color: "#F2C94C" }}>6 free first visits</span> left before the schedule rolls over.
            </h3>
            <p style={{ marginTop: 12, fontSize: 15, color: "rgba(255,246,232,0.78)" }}>
              Most new-patient slots book 1–2 weeks out. Grab this week's before they're gone — the timer resets Sunday at midnight.
            </p>
            <a href="#book" className="btn btn-coral" style={{ marginTop: 18, fontSize: 16 }}>Claim a free first visit →</a>
          </div>
          <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
            {[["HRS", h], ["MIN", m], ["SEC", s]].map(([l, v]) => (
              <div key={l} style={{ minWidth: 78, padding: "16px 14px", background: "rgba(255,246,232,0.07)", border: "2px solid rgba(255,246,232,0.18)", borderRadius: 16, textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 34, color: "#FFF6E8", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{String(v).padStart(2, "0")}</div>
                <div style={{ marginTop: 6, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 1.6, color: "#F2C94C" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) { .lp-count { flex-direction: column; align-items: flex-start; } }
      `}</style>
    </section>
  );
}

// ============================================================
// PAGE
// ============================================================

function LandingPage() {
  return (
    <>
      <LandingHeader />
      <main>
        <LandingHero />
        <ProblemAgitation />
        <Promise_ />
        <OfficeTour />
        <Proof />
        <LandingBeforeAfter />
        <Picture />
        <LandingJourney />
        <Push />
        <Price />
        <InsuranceChecker />
        <LandingCountdown />
        <LandingFAQ />
        <AfterYouBook />
        <FinalCTA />
      </main>
      <LandingFooter />
      <StickyMobileCTA />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<LandingPage />);

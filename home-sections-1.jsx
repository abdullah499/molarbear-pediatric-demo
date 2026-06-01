/* global React, BearMascot */
const { useState, useEffect, useRef } = React;

// ============================================================
// HERO
// ============================================================

function Hero({ onBookClick }) {
  return (
    <section style={{ paddingTop: 60, paddingBottom: 80, position: "relative", overflow: "hidden" }} data-screen-label="01 Hero">
      {/* Background blobs */}
      <div style={{ position: "absolute", top: 100, right: -100, width: 480, height: 480, borderRadius: "50%", background: "#FBEED4", filter: "blur(40px)", opacity: 0.5, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "#F4845F", filter: "blur(50px)", opacity: 0.2, pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 56, alignItems: "center" }} >
        <div>
          <div className="sticker" style={{ background: "#6FCFB2", borderColor: "#2A1810" }}>
            ✨ Multi-provider · Same-week openings
          </div>
          <h1 style={{ fontSize: "clamp(48px, 6.5vw, 86px)", lineHeight: 0.98, marginTop: 24, letterSpacing: "-0.03em" }}>
            Where small smiles get <span className="wavy">big high-fives.</span>
          </h1>
          <p style={{ marginTop: 24, fontSize: 19, maxWidth: 540, color: "#4a3326" }}>
            Gentle pediatric dental care for ages 0-18. Three providers, three locations, zero scary clipboards.
            Book online in under 2 minutes — we verify your insurance before you arrive.
          </p>
          <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <button className="btn btn-coral" onClick={onBookClick} style={{ fontSize: 17, padding: "16px 26px" }}>Book a visit →</button>
            <a href="#services" className="btn btn-ghost">Browse services</a>
          </div>

          {/* Trust strip */}
          <div style={{ marginTop: 48, display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "flex", gap: 1 }}>
                {[1,2,3,4,5].map(i => <span key={i} style={{ color: "#F2C94C", fontSize: 18 }}>★</span>)}
              </div>
              <div style={{ fontSize: 13, marginTop: 4, fontWeight: 600 }}>4.9 · 2,800+ Google reviews</div>
            </div>
            <div style={{ width: 1, height: 36, background: "rgba(42,24,16,0.15)" }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>Board-Certified</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#7a3e22" }}>Pediatric specialists</div>
            </div>
            <div style={{ width: 1, height: 36, background: "rgba(42,24,16,0.15)" }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>15+ insurers</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#7a3e22" }}>Including Medicaid</div>
            </div>
          </div>
        </div>

        {/* Hero visual */}
        <div style={{ position: "relative" }}>
          <div style={{
            background: "#6FCFB2",
            borderRadius: 40,
            aspectRatio: "4/5",
            position: "relative",
            overflow: "hidden",
            border: "3px solid #2A1810",
            boxShadow: "10px 10px 0 #2A1810",
          }}>
            <img src="hero-kid.jpg" alt="A happy young patient brushing their teeth" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>

          {/* Floating stickers */}
          <div style={{ position: "absolute", top: -20, left: -30, transform: "rotate(-8deg)" }}>
            <div style={{ background: "#FFF6E8", border: "3px solid #2A1810", padding: "12px 18px", borderRadius: 20, boxShadow: "5px 5px 0 #2A1810", fontFamily: "'Fredoka', sans-serif" }}>
              <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.6, textTransform: "uppercase", letterSpacing: 1 }}>First visit</div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>Free sticker pack 🎟️</div>
            </div>
          </div>

          <div style={{ position: "absolute", bottom: 24, right: -28, transform: "rotate(6deg)" }}>
            <div style={{ background: "#F2C94C", border: "3px solid #2A1810", padding: "14px 18px", borderRadius: 20, boxShadow: "5px 5px 0 #2A1810", fontFamily: "'Fredoka', sans-serif", maxWidth: 220 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <BearMascot pose="peek" size={48} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>"I'm here to help — and I never bite."</div>
                  <div style={{ fontSize: 11, marginTop: 4, opacity: 0.7 }}>— Mol, mascot-in-chief</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section[data-screen-label="01 Hero"] .container { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// LOGO STRIP / INSURANCE LOGOS
// ============================================================

function TrustStrip() {
  const insurers = ["Delta Dental", "Aetna", "Cigna", "MetLife", "Guardian", "Anthem", "BlueCross", "United HC"];
  return (
    <section className="tight" style={{ background: "#FBEED4", borderTop: "2px solid #2A1810", borderBottom: "2px solid #2A1810" }} data-screen-label="02 Insurance strip">
      <div className="container" style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: 1.6, textTransform: "uppercase", fontWeight: 700 }}>
          In-network with
        </div>
        <div style={{ display: "flex", gap: 28, flexWrap: "wrap", alignItems: "center", flex: 1, justifyContent: "center" }}>
          {insurers.map((i) => (
            <div key={i} style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, opacity: 0.65 }}>{i}</div>
          ))}
        </div>
        <a href="#insurance" className="btn btn-sm btn-ink">Check yours →</a>
      </div>
    </section>
  );
}

// ============================================================
// SERVICES PREVIEW
// ============================================================

function Services({ onBookClick }) {
  const services = [
    { id: "first", icon: "🧸", title: "First visit (ages 1-4)", desc: "We follow the AAPD 'first tooth, first visit' guideline. Gentle intro, lap exam with parent, no scary tools.", color: "#F4845F", duration: "20-30 min" },
    { id: "clean", icon: "🪥", title: "Cleanings & exams", desc: "Twice-a-year visits with fluoride treatment, brushing coaching, and a thorough exam for each tooth.", color: "#6FCFB2", duration: "45 min" },
    { id: "seal", icon: "🛡️", title: "Sealants", desc: "Quick painless coating on back molars — proven to prevent 80% of cavities in the chewing surfaces.", color: "#F2C94C", duration: "30 min" },
    { id: "fill", icon: "🦷", title: "Fillings & restorations", desc: "Tooth-colored composite fillings. Numbing gel before any shot — we're not in a hurry.", color: "#A0522D", duration: "45-60 min" },
    { id: "sed", icon: "💤", title: "Sedation dentistry", desc: "Nitrous (laughing gas), oral sedation, or hospital general anesthesia for kids who need extra help.", color: "#F4845F", duration: "Varies" },
    { id: "emerg", icon: "🚨", title: "Emergency care", desc: "Knocked out a tooth? Bleeding that won't stop? Call us — same-day appointments held open.", color: "#6FCFB2", duration: "Same-day" },
    { id: "ortho", icon: "✨", title: "Orthodontic referrals", desc: "Early screening from age 7. We coordinate directly with trusted local orthodontists.", color: "#F2C94C", duration: "Consult" },
    { id: "spec", icon: "💛", title: "Special needs care", desc: "Sensory-friendly rooms, longer appointments, and providers trained in adaptive techniques.", color: "#A0522D", duration: "60+ min" },
  ];

  return (
    <section id="services" data-screen-label="03 Services">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">What we do</div>
          <h2>Every kind of care — for every kind of kid.</h2>
          <p>From the first tooth peeking through to the last orthodontic check before college. Eight core services, all under one (very friendly) roof.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {services.map((s) => (
            <div key={s.id} className="card" style={{ display: "flex", flexDirection: "column", gap: 14, padding: 24, transition: "transform 0.15s, box-shadow 0.15s", cursor: "pointer" }}
              onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 32px rgba(42,24,16,0.12)"; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(42,24,16,0.06)"; }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: s.color, display: "grid", placeItems: "center", fontSize: 28 }}>{s.icon}</div>
              <h3 style={{ fontSize: 20 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "#4a3326", flex: 1 }}>{s.desc}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4, paddingTop: 14, borderTop: "1px dashed rgba(42,24,16,0.15)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#7a3e22", textTransform: "uppercase", letterSpacing: 0.8 }}>{s.duration}</span>
                <button onClick={onBookClick} style={{ background: "transparent", border: 0, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "#F4845F", cursor: "pointer", whiteSpace: "nowrap" }}>Book →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHY US
// ============================================================

function WhyUs() {
  const features = [
    { num: "01", title: "Three providers, more open slots.", desc: "Same-week appointments. If one of our dentists is booked, the others can almost always see you within 48 hours.", color: "#F4845F" },
    { num: "02", title: "Built for sensitive kids.", desc: "Weighted blankets, noise-canceling headphones, ceiling TVs in every room. Parents stay in the room — always.", color: "#6FCFB2" },
    { num: "03", title: "Insurance verified before you arrive.", desc: "Tell us your plan when you book. We check coverage and quote your visit cost before you walk in. No bill surprises.", color: "#F2C94C" },
    { num: "04", title: "Reminders that actually work.", desc: "Friendly SMS the day before. One-tap confirm or reschedule. We've cut no-shows by 64% (and freed up more same-week slots).", color: "#A0522D" },
  ];

  return (
    <section style={{ background: "#FBEED4" }} data-screen-label="04 Why us">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Why parents pick Molar Bear</div>
          <h2>The boring stuff, done right.</h2>
          <p>We can't make the dentist exciting (we try). But we can make every other part — booking, billing, reminders, follow-up — feel like 2026 instead of 1995.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {features.map((f) => (
            <div key={f.num} style={{
              background: "#fff", padding: 28, borderRadius: 24,
              border: "2px solid #2A1810",
              boxShadow: `6px 6px 0 ${f.color}`,
            }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 800, color: f.color }}>{f.num}</div>
              <h3 style={{ fontSize: 22, marginTop: 10 }}>{f.title}</h3>
              <p style={{ marginTop: 12, fontSize: 14, color: "#4a3326" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TEAM
// ============================================================

function Team() {
  const team = [
    { id: "amelia", name: "Dr. Amelia Park, DDS", role: "Founder · Anxious-kid specialist", bio: "Board-certified pediatric dentist. 12 years at Children's Memorial before opening Molar Bear in 2019. Known for her 'no-shot promise' first visits.", spec: ["Ages 4-12", "Dental anxiety", "First fillings"], color: "#F4845F" },
    { id: "ben", name: "Dr. Ben Solano, DMD", role: "Babies & special needs", bio: "Specializes in infants under 2 and kids with sensory sensitivities. Trained in adaptive techniques at Boston Children's.", spec: ["Ages 0-3", "Autism-friendly", "Lap exams"], color: "#6FCFB2" },
    { id: "maya", name: "Dr. Maya Okafor, DDS", role: "Sedation & complex care", bio: "Hospital-trained sedation dentist. Handles all our nitrous, oral sedation, and OR-based general anesthesia cases.", spec: ["All ages", "Sedation", "Complex restorations"], color: "#F2C94C" },
  ];

  return (
    <section id="team" data-screen-label="05 Team">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Meet the team</div>
          <h2>Three dentists. Zero scary white coats.</h2>
          <p>Each of our providers is a board-certified pediatric specialist with at least 8 years experience. We hire for warmth as carefully as we hire for clinical skill.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 24 }}>
          {team.map((t) => (
            <div key={t.id} className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ background: t.color, aspectRatio: "4/3", position: "relative", borderBottom: "2px solid #2A1810" }}>
                <image-slot id={`team-${t.id}`} shape="rect" placeholder={`Photo of ${t.name}`} style={{ width: "100%", height: "100%" }}></image-slot>
              </div>
              <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                <div>
                  <h3 style={{ fontSize: 20 }}>{t.name}</h3>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#7a3e22", textTransform: "uppercase", letterSpacing: 0.8, marginTop: 6 }}>{t.role}</div>
                </div>
                <p style={{ fontSize: 14, color: "#4a3326", flex: 1 }}>{t.bio}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {t.spec.map((s) => (
                    <span key={s} style={{ padding: "4px 10px", background: "#FFF6E8", border: "1px solid rgba(42,24,16,0.15)", borderRadius: 999, fontSize: 12, fontWeight: 600 }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INSURANCE CHECKER (HIPAA-safe — no PHI collected)
// Just public categories: insurer + plan tier → typical price ranges
// ============================================================

function InsuranceChecker() {
  const [insurer, setInsurer] = useState("");
  const [plan, setPlan] = useState("");

  const popularInsurers = [
    { id: "delta", name: "Delta Dental", inNetwork: true },
    { id: "aetna", name: "Aetna", inNetwork: true },
    { id: "cigna", name: "Cigna", inNetwork: true },
    { id: "bcbs", name: "BCBS / Anthem", inNetwork: true },
    { id: "medicaid", name: "Medicaid / CHIP", inNetwork: true },
    { id: "other", name: "Other / Not sure", inNetwork: null },
  ];

  // Range data — public, not personalized
  const rangeData = {
    PPO: { cleaning: "$0 – $25", sealant: "$0 – $15 / tooth", filling: "$25 – $90", crown: "$120 – $260" },
    HMO: { cleaning: "$0 – $10", sealant: "$0 – $20 / tooth", filling: "$15 – $60", crown: "$80 – $200" },
    Medicaid: { cleaning: "$0", sealant: "$0", filling: "$0", crown: "$0 – $20" },
    "Self-pay": { cleaning: "$95 – $145", sealant: "$45 – $65 / tooth", filling: "$165 – $280", crown: "$650 – $950" },
  };

  const selectedInsurer = popularInsurers.find(i => i.id === insurer);
  const ranges = plan ? rangeData[plan] : null;

  const reset = () => { setInsurer(""); setPlan(""); };

  return (
    <section id="insurance" style={{ background: "#2A1810", color: "#FFF6E8" }} data-screen-label="06 Insurance checker">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 56, alignItems: "center" }} className="insurance-grid">
          <div>
            <div className="eyebrow" style={{ color: "#F4845F", opacity: 1 }}>Insurance — at a glance</div>
            <h2 style={{ fontSize: "clamp(36px, 4.5vw, 56px)", marginTop: 12 }}>Get a typical price range — <em style={{ color: "#6FCFB2", fontStyle: "normal" }}>no card needed.</em></h2>
            <p style={{ marginTop: 20, fontSize: 17, opacity: 0.8, maxWidth: 480 }}>
              Pick your insurer and plan type to see typical out-of-pocket ranges for the most common visits. Final pricing is confirmed by our team through our secure intake after you book — never through this form.
            </p>
            <ul style={{ marginTop: 28, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "No member ID, no name, no PHI collected here",
                "Ranges based on our last 12 months of in-network claims",
                "Real personalized quote sent securely within 1 business hour",
                "HIPAA-compliant intake when you book"
              ].map((b) => (
                <li key={b} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 15 }}>
                  <span style={{ color: "#6FCFB2", marginTop: 2, fontWeight: 800 }}>✓</span>{b}
                </li>
              ))}
            </ul>
          </div>

          {/* Card */}
          <div style={{ background: "#FFF6E8", color: "#2A1810", borderRadius: 28, padding: 32, boxShadow: "10px 10px 0 #A0522D", border: "3px solid #FFF6E8" }}>

            {/* Privacy badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 11px", borderRadius: 999, background: "#6FCFB2", fontSize: 11, fontFamily: "var(--font-mono)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 16 }}>
              🔒 No personal info needed
            </div>

            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, marginBottom: 4 }}>
              {!insurer && "Who's your insurer?"}
              {insurer && !plan && "What kind of plan?"}
              {insurer && plan && "Your typical visit estimate"}
            </div>
            <div style={{ fontSize: 13, color: "#7a3e22", marginBottom: 20 }}>
              {!insurer && "Pick from the most common — your card stays in your wallet."}
              {insurer && !plan && "Look on the front of your card if you're not sure."}
              {insurer && plan && "Per-visit out-of-pocket ranges based on our recent in-network data."}
            </div>

            {/* Step 1: Insurer */}
            {!insurer && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {popularInsurers.map((i) => (
                  <button key={i.id} onClick={() => setInsurer(i.id)} style={{
                    background: "#fff",
                    border: "2px solid rgba(42,24,16,0.1)",
                    padding: "16px 14px",
                    borderRadius: 14,
                    fontFamily: "inherit",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                    textAlign: "left",
                    color: "#2A1810",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    transition: "all 0.15s",
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = "#F4845F"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(42,24,16,0.1)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                    <span>{i.name}</span>
                    {i.inNetwork === true && <span style={{ fontSize: 11, color: "#4ea98e", fontWeight: 700 }}>✓ In-network</span>}
                    {i.inNetwork === null && <span style={{ fontSize: 11, color: "#7a3e22", fontWeight: 500 }}>We'll verify when you book</span>}
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Plan tier */}
            {insurer && !plan && (
              <>
                {selectedInsurer.id !== "other" && selectedInsurer.id !== "medicaid" && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
                    {["PPO", "HMO", "Self-pay"].map((p) => (
                      <button key={p} onClick={() => setPlan(p)} style={{
                        background: "#fff",
                        border: "2px solid rgba(42,24,16,0.1)",
                        padding: "16px 12px",
                        borderRadius: 12,
                        fontFamily: "inherit",
                        fontWeight: 700,
                        fontSize: 15,
                        cursor: "pointer",
                        color: "#2A1810",
                        transition: "all 0.15s",
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.borderColor = "#F4845F"; }}
                      onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(42,24,16,0.1)"; }}>
                        {p}
                        <div style={{ fontSize: 11, fontWeight: 500, opacity: 0.65, marginTop: 4 }}>
                          {p === "PPO" && "Most flexible"}
                          {p === "HMO" && "Lower premiums"}
                          {p === "Self-pay" && "No insurance"}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {selectedInsurer.id === "medicaid" && (
                  <button onClick={() => setPlan("Medicaid")} className="btn btn-coral" style={{ width: "100%", padding: "14px" }}>
                    See Medicaid / CHIP coverage →
                  </button>
                )}
                {selectedInsurer.id === "other" && (
                  <div style={{ background: "#fff", borderRadius: 14, padding: 18, fontSize: 14, lineHeight: 1.5 }}>
                    <div style={{ fontWeight: 700, marginBottom: 6 }}>Not in our top 5? No problem.</div>
                    We're in-network with 15+ plans total. Book a visit and we'll verify your coverage and text you a confirmed estimate within 1 business hour — completely securely.
                    <button onClick={reset} className="btn btn-sm btn-ink" style={{ marginTop: 14 }}>Pick different insurer</button>
                  </div>
                )}
              </>
            )}

            {/* Step 3: Ranges */}
            {insurer && plan && ranges && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "#6FCFB2", borderRadius: 12, marginBottom: 18 }}>
                  <span style={{ fontSize: 22 }}>✓</span>
                  <div>
                    <div style={{ fontWeight: 800 }}>{selectedInsurer.name} · {plan}</div>
                    <div style={{ fontSize: 12, opacity: 0.8 }}>Based on our last 12 months of claims</div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {[
                    { l: "Cleaning + exam", v: ranges.cleaning, icon: "🪥" },
                    { l: "Sealants", v: ranges.sealant, icon: "🛡️" },
                    { l: "Composite filling", v: ranges.filling, icon: "🦷" },
                    { l: "Pediatric crown", v: ranges.crown, icon: "👑" },
                  ].map((row, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 4px", borderBottom: i < 3 ? "1px dashed rgba(42,24,16,0.12)" : "0" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}><span style={{ fontSize: 18 }}>{row.icon}</span>{row.l}</span>
                      <span style={{ fontWeight: 700, fontSize: 15 }}>{row.v}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(244,132,95,0.1)", borderRadius: 10, fontSize: 12, color: "#7a3e22", lineHeight: 1.5 }}>
                  These are typical ranges, not a personal quote. Book a visit and we'll text you confirmed pricing within 1 business hour.
                </div>

                <button className="btn btn-coral" style={{ marginTop: 16, width: "100%" }}>Book a visit →</button>
                <button onClick={reset} style={{ background: "transparent", border: 0, color: "#7a3e22", marginTop: 12, width: "100%", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>← Start over</button>
              </>
            )}

            {/* Step 2 back button (other path) */}
            {insurer && !plan && selectedInsurer.id !== "other" && (
              <button onClick={() => setInsurer("")} style={{ background: "transparent", border: 0, color: "#7a3e22", marginTop: 12, width: "100%", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>← Pick different insurer</button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .insurance-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "2px solid rgba(42,24,16,0.12)",
  background: "#fff",
  fontSize: 15,
  fontFamily: "inherit",
  color: "#2A1810",
};
const labelStyle = { fontWeight: 700, fontSize: 14, display: "block", marginBottom: 8 };

Object.assign(window, { Hero, TrustStrip, Services, WhyUs, Team, InsuranceChecker });

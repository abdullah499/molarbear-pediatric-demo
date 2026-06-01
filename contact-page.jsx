/* global React, BearMascot */
const { useState } = React;

// ============================================================
// CONTACT HERO + APPOINTMENT FORM
// ============================================================

function ContactHero() {
  return (
    <section style={{ paddingTop: 56, paddingBottom: 40, position: "relative", overflow: "hidden" }} data-screen-label="01 Contact hero">
      <div style={{ position: "absolute", top: -120, right: "-8%", width: 480, height: 480, borderRadius: "50%", background: "#FBEED4", filter: "blur(60px)", opacity: 0.7, pointerEvents: "none" }} />
      <div className="container" style={{ position: "relative", maxWidth: 900, textAlign: "center" }}>
        <div className="eyebrow">Book · Call · Visit</div>
        <h1 style={{ fontSize: "clamp(48px, 7vw, 100px)", lineHeight: 0.95, marginTop: 16, letterSpacing: "-0.03em" }}>
          Let's get that visit on the <span className="wavy">calendar.</span>
        </h1>
        <p style={{ marginTop: 22, fontSize: 19, color: "#4a3326", maxWidth: 640, margin: "22px auto 0" }}>
          Most appointments confirmed within 1 business hour. Or call us — we love a real human voice.
        </p>

        <div style={{ marginTop: 28, display: "inline-flex", gap: 10, padding: 10, background: "#fff", borderRadius: 999, border: "2px solid #2A1810", boxShadow: "0 4px 0 #2A1810" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", fontFamily: "var(--font-display)", fontWeight: 600 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ea98e", display: "inline-block" }}></span>
            Open now — until 6pm
          </div>
        </div>
      </div>
    </section>
  );
}

function JetFormNotice() {
  return (
    <div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", background: "#FBEED4", borderRadius: 999, border: "2px solid #2A1810", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.4 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ea98e" }}></span>
        SECURE · HIPAA · BAA-COVERED
      </div>

      <h2 style={{ fontSize: "clamp(32px, 4vw, 44px)", marginTop: 20, lineHeight: 1.05 }}>
        Booking happens through our <span className="wavy">secure JetForm.</span>
      </h2>
      <p style={{ marginTop: 16, fontSize: 16, color: "#4a3326", maxWidth: 520, lineHeight: 1.55 }}>
        To protect your family's health information, we don't take appointment details over an open web form. We use <strong>JetForm</strong> — a HIPAA-compliant intake platform we have a signed Business Associate Agreement (BAA) with.
      </p>

      {/* What's covered */}
      <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="jetform-grid">
        {[
          { icon: "🔒", label: "End-to-end encrypted in transit and at rest" },
          { icon: "📑", label: "Signed BAA on file with JetForm Health, Inc." },
          { icon: "🏥", label: "PHI never touches this website's servers" },
          { icon: "🗂️", label: "Audit-logged access, 7-year retention" },
        ].map((it, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: 14, background: "#FBEED4", borderRadius: 14, border: "1px solid rgba(42,24,16,0.1)" }}>
            <div style={{ fontSize: 20, lineHeight: 1 }}>{it.icon}</div>
            <div style={{ fontSize: 13, color: "#2A1810", lineHeight: 1.45 }}>{it.label}</div>
          </div>
        ))}
      </div>

      {/* CTA — open JetForm */}
      <div style={{ marginTop: 32, padding: 24, background: "#2A1810", borderRadius: 20, color: "#FFF6E8" }}>
        <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "#F4845F", display: "grid", placeItems: "center", border: "2px solid #FFF6E8", flexShrink: 0 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2 L4 6 V12 C4 17 7 21 12 22 C17 21 20 17 20 12 V6 Z" stroke="#FFF6E8" strokeWidth="2" strokeLinejoin="round" />
              <path d="M9 12 L11 14 L15 10" stroke="#FFF6E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20 }}>Continue on JetForm →</div>
            <div style={{ fontSize: 13, opacity: 0.78, marginTop: 4 }}>Opens in a new secure window · ~3 minutes</div>
          </div>
          <a href="https://jetform.health/molar-bear/intake" target="_blank" rel="noopener noreferrer" className="btn btn-coral" style={{ fontSize: 15 }}>
            Open secure form ↗
          </a>
        </div>
      </div>

      {/* Small print */}
      <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontSize: 13, color: "#4a3326" }} className="jetform-grid">
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 1.4, color: "#7a3e22" }}>NOT READY FOR THE FORM?</div>
          <div style={{ marginTop: 6 }}>Call <a href="tel:5551234386" style={{ fontWeight: 700, color: "#A0522D" }}>(555) 123-CHEW</a> — a real front-desk human will book over the phone.</div>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 1.4, color: "#7a3e22" }}>RETURNING FAMILY?</div>
          <div style={{ marginTop: 6 }}>Log in to the <a href="https://jetform.health/molar-bear/portal" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, color: "#A0522D" }}>Parent Portal</a> to pick a slot from your saved profile.</div>
        </div>
      </div>

      <div style={{ marginTop: 20, fontSize: 11, color: "#7a3e22", fontFamily: "var(--font-mono)", lineHeight: 1.6, letterSpacing: 0.3 }}>
        Our <a href="Notice-of-Privacy.html" style={{ textDecoration: "underline" }}>Notice of Privacy Practices</a> describes how we may use and disclose PHI. By submitting the JetForm intake, you acknowledge receipt of this notice. SMS reminders are optional; standard rates apply.
      </div>

      <style>{`
        @media (max-width: 700px) {
          .jetform-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function BookingForm_DEPRECATED() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    location: "",
    service: "",
    childAge: "",
    isNew: "",
    date: "",
    time: "",
    parentName: "",
    childName: "",
    phone: "",
    email: "",
    insurance: "",
    notes: "",
  });

  const locations = [
    { id: "downtown", name: "Downtown Den", addr: "148 Maple Row · Suite 200", color: "#F4845F" },
    { id: "westside", name: "Westside Cave", addr: "3201 Birch Ave", color: "#6FCFB2" },
    { id: "northside", name: "Northside Lodge", addr: "8 Pinecone Plaza", color: "#F2C94C" },
  ];

  const services = [
    "First visit / new patient (under 4)",
    "Cleaning & checkup",
    "Sealants",
    "Filling consultation",
    "Sedation consult",
    "Emergency / urgent",
    "Orthodontic screening",
    "Special needs consult",
    "Something else",
  ];

  const times = ["8:00 AM", "9:30 AM", "11:00 AM", "1:30 PM", "3:00 PM", "4:30 PM"];

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));

  if (step === 5) {
    return (
      <div style={{ textAlign: "center", padding: "60px 24px" }}>
        <div style={{ display: "inline-grid", placeItems: "center", width: 96, height: 96, borderRadius: "50%", background: "#6FCFB2", border: "3px solid #2A1810", boxShadow: "6px 6px 0 #2A1810", marginBottom: 24 }}>
          <span style={{ fontSize: 48 }}>✓</span>
        </div>
        <h2 style={{ fontSize: 40 }}>You're on the books!</h2>
        <p style={{ fontSize: 17, color: "#4a3326", marginTop: 14, maxWidth: 480, marginInline: "auto" }}>
          We'll text {data.phone || "you"} within an hour to confirm. Insurance pre-check kicks off automatically — you'll have your estimate before the visit.
        </p>
        <div style={{ marginTop: 28, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="Home.html" className="btn btn-coral">Back to home</a>
          <button className="btn btn-ghost" onClick={() => { setStep(1); setData({ location: "", service: "", childAge: "", isNew: "", date: "", time: "", parentName: "", childName: "", phone: "", email: "", insurance: "", notes: "" }); }}>Book another</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Step indicator */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28, justifyContent: "center" }}>
        {[1, 2, 3, 4].map((n) => (
          <div key={n} style={{
            width: step >= n ? 44 : 28, height: 6, borderRadius: 4,
            background: step >= n ? "#F4845F" : "rgba(42,24,16,0.12)",
            transition: "width 0.2s, background 0.2s",
          }} />
        ))}
      </div>

      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#7a3e22", letterSpacing: 1.4, textAlign: "center", marginBottom: 12 }}>
        STEP {step} OF 4
      </div>

      {step === 1 && (
        <div>
          <h3 style={{ fontSize: 28, textAlign: "center" }}>Which location works best?</h3>
          <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }} className="loc-grid">
            {locations.map((l) => (
              <button key={l.id} onClick={() => set("location", l.id)} style={{
                background: data.location === l.id ? l.color : "#fff",
                border: `2px solid ${data.location === l.id ? "#2A1810" : "rgba(42,24,16,0.15)"}`,
                borderRadius: 18,
                padding: 18,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
              }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17 }}>{l.name}</div>
                <div style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "#4a3326", marginTop: 6, letterSpacing: 0.4 }}>{l.addr}</div>
              </button>
            ))}
          </div>

          <div style={{ marginTop: 32 }}>
            <label style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15 }}>What kind of visit?</label>
            <select value={data.service} onChange={(e) => set("service", e.target.value)} style={fieldStyle}>
              <option value="">— Choose —</option>
              {services.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div style={{ marginTop: 28, textAlign: "right" }}>
            <button
              disabled={!data.location || !data.service}
              onClick={() => setStep(2)}
              className="btn btn-coral"
              style={{ opacity: data.location && data.service ? 1 : 0.4 }}
            >Next →</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 style={{ fontSize: 28, textAlign: "center" }}>Tell us about your kiddo.</h3>

          <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={labelStyle}>Child's age</label>
              <select value={data.childAge} onChange={(e) => set("childAge", e.target.value)} style={fieldStyle}>
                <option value="">— Select —</option>
                <option>Under 1</option>
                <option>1-2</option>
                <option>3-5</option>
                <option>6-9</option>
                <option>10-13</option>
                <option>14-17</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>New to Molar Bear?</label>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                {["Yes, new", "Returning"].map((v) => (
                  <button key={v} onClick={() => set("isNew", v)} style={{
                    flex: 1,
                    padding: "12px 14px",
                    borderRadius: 12,
                    border: `2px solid ${data.isNew === v ? "#2A1810" : "rgba(42,24,16,0.15)"}`,
                    background: data.isNew === v ? "#FBEED4" : "#fff",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                  }}>{v}</button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Anything we should know? (optional)</label>
            <textarea value={data.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Special needs, anxiety, current pain, etc." rows={3} style={{ ...fieldStyle, minHeight: 80, resize: "vertical", fontFamily: "var(--font-body)" }} />
          </div>

          <div style={{ marginTop: 28, display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => setStep(1)} className="btn btn-ghost">← Back</button>
            <button
              disabled={!data.childAge || !data.isNew}
              onClick={() => setStep(3)}
              className="btn btn-coral"
              style={{ opacity: data.childAge && data.isNew ? 1 : 0.4 }}
            >Next →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 style={{ fontSize: 28, textAlign: "center" }}>Pick a day + time.</h3>
          <p style={{ textAlign: "center", color: "#7a3e22", fontSize: 14, marginTop: 8 }}>These are example slots — we'll confirm the exact time within an hour.</p>

          <div style={{ marginTop: 24 }}>
            <label style={labelStyle}>Preferred date</label>
            <input type="date" value={data.date} onChange={(e) => set("date", e.target.value)} style={fieldStyle} />
          </div>

          <div style={{ marginTop: 20 }}>
            <label style={labelStyle}>Preferred time</label>
            <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
              {times.map((t) => (
                <button key={t} onClick={() => set("time", t)} style={{
                  padding: "12px",
                  borderRadius: 12,
                  border: `2px solid ${data.time === t ? "#2A1810" : "rgba(42,24,16,0.15)"}`,
                  background: data.time === t ? "#F4845F" : "#fff",
                  color: data.time === t ? "#fff" : "#2A1810",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                }}>{t}</button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 28, display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => setStep(2)} className="btn btn-ghost">← Back</button>
            <button
              disabled={!data.date || !data.time}
              onClick={() => setStep(4)}
              className="btn btn-coral"
              style={{ opacity: data.date && data.time ? 1 : 0.4 }}
            >Next →</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h3 style={{ fontSize: 28, textAlign: "center" }}>Last step — how do we reach you?</h3>

          <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={labelStyle}>Parent / guardian name</label>
              <input value={data.parentName} onChange={(e) => set("parentName", e.target.value)} placeholder="Alex Rivera" style={fieldStyle} />
            </div>
            <div>
              <label style={labelStyle}>Child's name</label>
              <input value={data.childName} onChange={(e) => set("childName", e.target.value)} placeholder="Pip" style={fieldStyle} />
            </div>
            <div>
              <label style={labelStyle}>Phone (for SMS reminders)</label>
              <input value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="(555) 123-4567" style={fieldStyle} />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="alex@email.com" style={fieldStyle} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Insurance plan (we'll verify)</label>
              <input value={data.insurance} onChange={(e) => set("insurance", e.target.value)} placeholder="e.g. Delta Dental PPO, Aetna, Medicaid" style={fieldStyle} />
            </div>
          </div>

          <div style={{ marginTop: 16, padding: 14, background: "#FBEED4", borderRadius: 12, fontSize: 13, color: "#4a3326" }}>
            🛡️ HIPAA-compliant. We'll never share your info. Standard SMS rates apply for reminders.
          </div>

          <div style={{ marginTop: 28, display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => setStep(3)} className="btn btn-ghost">← Back</button>
            <button
              disabled={!data.parentName || !data.phone}
              onClick={() => setStep(5)}
              className="btn btn-coral"
              style={{ fontSize: 16, opacity: data.parentName && data.phone ? 1 : 0.4 }}
            >Confirm visit 🐻</button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 700px) {
          .loc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

const labelStyle = { fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, display: "block", marginBottom: 6, color: "#2A1810" };
const fieldStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "2px solid rgba(42,24,16,0.15)",
  background: "#fff",
  fontSize: 15,
  fontFamily: "var(--font-body)",
  marginTop: 8,
  color: "#2A1810",
};

// ============================================================
// FORM + QUICK INFO LAYOUT
// ============================================================

function ContactMain() {
  return (
    <section style={{ paddingTop: 0 }} data-screen-label="02 Booking form">
      <div className="container contact-grid" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 32, alignItems: "start" }}>
        <div style={{ background: "#fff", borderRadius: 32, border: "2px solid #2A1810", boxShadow: "10px 10px 0 #2A1810", padding: 40 }} className="form-card">
          <JetFormNotice />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "#F4845F", color: "#fff", borderRadius: 24, border: "2px solid #2A1810", boxShadow: "6px 6px 0 #2A1810", padding: 24 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.4, opacity: 0.9 }}>PHONE</div>
            <div style={{ marginTop: 10, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26 }}>(555) 123-CHEW</div>
            <div style={{ marginTop: 6, fontSize: 14, opacity: 0.92 }}>Mon-Fri 8am-6pm · Sat 9am-2pm</div>
            <a href="tel:5551234386" className="btn btn-ink" style={{ marginTop: 16, fontSize: 14 }}>📞 Call now</a>
          </div>

          <div style={{ background: "#6FCFB2", borderRadius: 24, border: "2px solid #2A1810", boxShadow: "6px 6px 0 #2A1810", padding: 24 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.4 }}>EMERGENCY</div>
            <div style={{ marginTop: 10, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22 }}>Knocked-out tooth? Bleeding won't stop?</div>
            <div style={{ marginTop: 8, fontSize: 14 }}>Same-day slots are held open every weekday. After hours, voicemail routes to the on-call dentist.</div>
            <a href="tel:5559119119" className="btn btn-ink" style={{ marginTop: 16, fontSize: 14 }}>📞 Urgent line</a>
          </div>

          <div style={{ background: "#fff", borderRadius: 24, border: "1px solid rgba(42,24,16,0.1)", padding: 24 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.4, color: "#7a3e22" }}>FRONT DESK</div>
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
              <a href="mailto:hello@molarbear.dental" style={{ display: "flex", alignItems: "center", gap: 10 }}><span>✉️</span>hello@molarbear.dental</a>
              <a href="sms:5551234386" style={{ display: "flex", alignItems: "center", gap: 10 }}><span>💬</span>Text us anytime</a>
              <a href="https://jetform.health/molar-bear/new-patient.pdf" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 10 }}><span>📋</span>New-patient forms (PDF)</a>
              <a href="mailto:hello@molarbear.dental?subject=Refer%20a%20friend" style={{ display: "flex", alignItems: "center", gap: 10 }}><span>🦷</span>Refer a friend → $25</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .form-card { padding: 24px !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// LOCATIONS BLOCK — three cards with stylized maps
// ============================================================

function LocationsGrid() {
  const locations = [
    {
      name: "Downtown Den",
      addr1: "148 Maple Row · Suite 200",
      addr2: "Downtown, 10005",
      hours: "Mon-Fri 8am-6pm",
      phone: "(555) 123-4386",
      mapBg: "#F4845F",
      pinX: "62%", pinY: "44%",
      features: ["Underground parking", "Sensory-friendly room", "Hospital sedation"],
    },
    {
      name: "Westside Cave",
      addr1: "3201 Birch Ave",
      addr2: "Westside, 10112",
      hours: "Mon-Sat 8am-5pm",
      phone: "(555) 123-4386",
      mapBg: "#6FCFB2",
      pinX: "30%", pinY: "60%",
      features: ["Two sensory rooms", "ASL interpreter", "Family bathroom"],
    },
    {
      name: "Northside Lodge",
      addr1: "8 Pinecone Plaza",
      addr2: "Northside, 10201",
      hours: "Mon-Sat 9am-7pm",
      phone: "(555) 123-4386",
      mapBg: "#F2C94C",
      pinX: "48%", pinY: "30%",
      features: ["Late Tue/Thu till 7pm", "Drive-up valet", "Playground view"],
    },
  ];

  return (
    <section style={{ background: "#FBEED4" }} data-screen-label="03 Locations">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Three locations · one bear</div>
          <h2>Find the den nearest you.</h2>
          <p>Same gentle care at all three offices. Same providers rotate so your kid sees familiar faces wherever you go.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="locs-grid">
          {locations.map((l, i) => (
            <div key={i} style={{
              background: "#fff",
              borderRadius: 28,
              border: "2px solid #2A1810",
              overflow: "hidden",
              boxShadow: "8px 8px 0 #2A1810",
            }}>
              {/* Stylized map */}
              <div style={{ position: "relative", aspectRatio: "4/3", background: l.mapBg, borderBottom: "2px solid #2A1810", overflow: "hidden" }}>
                {/* faux street lines */}
                <svg viewBox="0 0 400 300" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 }}>
                  <path d="M0 150 L400 150" stroke="#fff" strokeWidth="6" />
                  <path d="M200 0 L200 300" stroke="#fff" strokeWidth="6" />
                  <path d="M0 80 L400 80" stroke="#fff" strokeWidth="2" opacity="0.5" />
                  <path d="M0 220 L400 220" stroke="#fff" strokeWidth="2" opacity="0.5" />
                  <path d="M80 0 L80 300" stroke="#fff" strokeWidth="2" opacity="0.5" />
                  <path d="M320 0 L320 300" stroke="#fff" strokeWidth="2" opacity="0.5" />
                  <rect x="220" y="100" width="60" height="40" fill="#fff" opacity="0.3" rx="4" />
                  <rect x="100" y="170" width="50" height="35" fill="#fff" opacity="0.3" rx="4" />
                  <circle cx="350" cy="220" r="22" fill="#fff" opacity="0.3" />
                </svg>
                {/* Pin */}
                <div style={{ position: "absolute", left: l.pinX, top: l.pinY, transform: "translate(-50%, -100%)" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50% 50% 50% 0",
                    background: "#2A1810",
                    transform: "rotate(-45deg)",
                    display: "grid", placeItems: "center",
                    boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                  }}>
                    <div style={{ transform: "rotate(45deg)", color: "#fff", fontSize: 22 }}>🐻</div>
                  </div>
                </div>
              </div>

              <div style={{ padding: 28 }}>
                <h3 style={{ fontSize: 24 }}>{l.name}</h3>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#7a3e22", marginTop: 8, letterSpacing: 0.4, lineHeight: 1.6 }}>
                  {l.addr1}<br />{l.addr2}
                </div>
                <div style={{ marginTop: 16, fontSize: 14, color: "#4a3326" }}>
                  🕒 {l.hours}<br />
                  📞 {l.phone}
                </div>
                <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                  {l.features.map((f, j) => (
                    <div key={j} style={{ fontSize: 13, color: "#4a3326" }}>· {f}</div>
                  ))}
                </div>
                <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`Molar Bear ${l.name}, ${l.addr1}, ${l.addr2}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-coral"
                    style={{ fontSize: 13 }}
                  >One-click directions →</a>
                  <a href={`tel:${l.phone.replace(/\D/g, "")}`} className="btn btn-sm btn-ghost" style={{ fontSize: 13, padding: "8px 14px" }}>Call</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .locs-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 720px) {
          .locs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// QUICK FAQ — pre-visit questions
// ============================================================

function ContactFAQ() {
  const faqs = [
    { q: "What if my child has never been to a dentist?", a: "Tell us on the form (Step 2) and we'll book a slightly longer first visit. No drills, no scary words — just a meet-and-greet and a tooth count." },
    { q: "Do you take my insurance?", a: "We're in-network with Delta Dental, Aetna, Cigna, BCBS/Anthem, MetLife, Guardian, and Medicaid/CHIP. We'll verify and email you a benefits estimate before the visit." },
    { q: "What about emergencies after hours?", a: "Call our urgent line — voicemail routes directly to the on-call pediatric dentist's mobile. They will return your call within 20 minutes." },
    { q: "Can I bring siblings to the appointment?", a: "Yes — we have a play corner in every waiting room. If you'd like back-to-back appointments for siblings, mention it in the notes field." },
  ];

  return (
    <section data-screen-label="04 Pre-visit FAQ">
      <div className="container" style={{ maxWidth: 880 }}>
        <div className="section-head">
          <div className="eyebrow">Pre-visit questions</div>
          <h2>Common questions before you book.</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((f, i) => (
            <details key={i} style={{
              background: "#fff",
              borderRadius: 18,
              padding: 24,
              border: "1px solid rgba(42,24,16,0.1)",
              boxShadow: "0 2px 8px rgba(42,24,16,0.04)",
            }}>
              <summary style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 18,
                cursor: "pointer",
                listStyle: "none",
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                alignItems: "center",
              }}>
                {f.q}
                <span style={{ fontSize: 22, color: "#F4845F", flexShrink: 0 }}>+</span>
              </summary>
              <p style={{ marginTop: 14, fontSize: 15, color: "#4a3326" }}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CONTACT PAGE
// ============================================================

function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactMain />
      <LocationsGrid />
      <ContactFAQ />
    </>
  );
}

Object.assign(window, { ContactPage });

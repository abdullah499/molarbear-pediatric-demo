/* global React */
const { useState } = React;

// ============================================================
// BOOKING MODAL — multi-step
// ============================================================

function BookingModal({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    childName: "",
    age: "",
    reason: "checkup",
    location: "downtown",
    provider: "any",
    date: "",
    time: "",
    parentName: "",
    phone: "",
    email: "",
    insurance: "",
    sms: true,
  });

  if (!open) return null;

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const reset = () => { setStep(0); onClose(); };

  const reasons = [
    { id: "checkup", icon: "🪥", label: "Routine checkup" },
    { id: "first", icon: "🧸", label: "First visit (age 1-4)" },
    { id: "cavity", icon: "🦷", label: "Tooth pain / cavity" },
    { id: "emergency", icon: "🚨", label: "Emergency" },
    { id: "ortho", icon: "✨", label: "Orthodontic consult" },
    { id: "other", icon: "💬", label: "Something else" },
  ];

  const locations = [
    { id: "downtown", name: "Downtown Den", addr: "148 Maple Row" },
    { id: "westside", name: "Westside Cave", addr: "3201 Birch Ave" },
    { id: "northside", name: "Northside Lodge", addr: "8 Pinecone Plaza" },
  ];

  const providers = [
    { id: "any", name: "First available", subtitle: "Soonest slot, any provider" },
    { id: "amelia", name: "Dr. Amelia Park", subtitle: "Anxious kids, ages 4+" },
    { id: "ben", name: "Dr. Ben Solano", subtitle: "Babies & toddlers, special needs" },
    { id: "maya", name: "Dr. Maya Okafor", subtitle: "Sedation specialist" },
  ];

  const slots = ["Tue · Jul 8 · 9:00am", "Tue · Jul 8 · 2:30pm", "Wed · Jul 9 · 10:15am", "Thu · Jul 10 · 4:00pm", "Fri · Jul 11 · 8:30am", "Sat · Jul 12 · 11:00am"];

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(42,24,16,0.55)",
        backdropFilter: "blur(6px)",
        display: "grid", placeItems: "center",
        padding: 16,
        animation: "fadeIn 0.18s ease-out",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: "#FFF6E8",
        borderRadius: 28,
        width: "100%",
        maxWidth: 720,
        maxHeight: "92vh",
        overflow: "auto",
        position: "relative",
        boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
        animation: "popIn 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}>
        {/* Header */}
        <div style={{ position: "sticky", top: 0, background: "#FFF6E8", padding: "24px 28px 16px", borderBottom: "1px solid rgba(42,24,16,0.08)", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div className="eyebrow">Book a visit</div>
              <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600, fontSize: 26, marginTop: 4 }}>
                {step === 0 && "What brings you in?"}
                {step === 1 && "Pick a time"}
                {step === 2 && "Your contact info"}
                {step === 3 && "You're all set! 🎉"}
              </div>
            </div>
            <button onClick={reset} style={{ background: "transparent", border: 0, width: 40, height: 40, borderRadius: 999, fontSize: 24, cursor: "pointer" }} aria-label="Close">×</button>
          </div>

          {/* Progress */}
          <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{
                flex: 1, height: 6, borderRadius: 99,
                background: i <= step ? "#F4845F" : "rgba(42,24,16,0.1)",
                transition: "background 0.25s",
              }} />
            ))}
          </div>
        </div>

        <div style={{ padding: "28px" }}>
          {/* Step 0 — reason + age */}
          {step === 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <label style={{ fontWeight: 700, fontSize: 14, display: "block", marginBottom: 10 }}>Reason for visit</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
                  {reasons.map((r) => (
                    <button key={r.id} onClick={() => update("reason", r.id)}
                      style={{
                        background: form.reason === r.id ? "#F4845F" : "#fff",
                        color: form.reason === r.id ? "#fff" : "#2A1810",
                        border: form.reason === r.id ? "2px solid #F4845F" : "2px solid rgba(42,24,16,0.1)",
                        padding: "14px 14px",
                        borderRadius: 16,
                        textAlign: "left",
                        fontWeight: 600, fontSize: 14,
                        display: "flex", alignItems: "center", gap: 10,
                      }}>
                      <span style={{ fontSize: 20 }}>{r.icon}</span>{r.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ fontWeight: 700, fontSize: 14, display: "block", marginBottom: 8 }}>Child's first name</label>
                  <input value={form.childName} onChange={(e) => update("childName", e.target.value)} placeholder="Sammy" style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontWeight: 700, fontSize: 14, display: "block", marginBottom: 8 }}>Child's age</label>
                  <input value={form.age} onChange={(e) => update("age", e.target.value)} placeholder="6" style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={{ fontWeight: 700, fontSize: 14, display: "block", marginBottom: 10 }}>Location</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
                  {locations.map((l) => (
                    <button key={l.id} onClick={() => update("location", l.id)} style={{
                      background: form.location === l.id ? "#2A1810" : "#fff",
                      color: form.location === l.id ? "#FFF6E8" : "#2A1810",
                      border: form.location === l.id ? "2px solid #2A1810" : "2px solid rgba(42,24,16,0.1)",
                      padding: "14px 14px",
                      borderRadius: 16,
                      textAlign: "left",
                      fontWeight: 600, fontSize: 14,
                    }}>
                      <div>{l.name}</div>
                      <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2, fontWeight: 500 }}>{l.addr}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1 — provider + time */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <label style={{ fontWeight: 700, fontSize: 14, display: "block", marginBottom: 10 }}>Preferred provider</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {providers.map((p) => (
                    <button key={p.id} onClick={() => update("provider", p.id)} style={{
                      background: form.provider === p.id ? "#6FCFB2" : "#fff",
                      color: "#2A1810",
                      border: form.provider === p.id ? "2px solid #4ea98e" : "2px solid rgba(42,24,16,0.1)",
                      padding: "12px 14px",
                      borderRadius: 14, textAlign: "left",
                      fontWeight: 600, fontSize: 14,
                    }}>
                      <div>{p.name}</div>
                      <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2, fontWeight: 500 }}>{p.subtitle}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontWeight: 700, fontSize: 14, display: "block", marginBottom: 10 }}>Available this week</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
                  {slots.map((s) => (
                    <button key={s} onClick={() => update("time", s)} style={{
                      background: form.time === s ? "#F4845F" : "#fff",
                      color: form.time === s ? "#fff" : "#2A1810",
                      border: form.time === s ? "2px solid #F4845F" : "2px solid rgba(42,24,16,0.1)",
                      padding: "14px 14px",
                      borderRadius: 14,
                      fontWeight: 600, fontSize: 14,
                    }}>
                      {s}
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: 12, fontSize: 13, color: "#7a3e22" }}>Don't see a time? <a href="tel:5551234386" style={{ textDecoration: "underline", fontWeight: 600 }}>Call us at (555) 123-CHEW</a></div>
              </div>
            </div>
          )}

          {/* Step 2 — contact info */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={labelStyle}>Parent name</label>
                  <input value={form.parentName} onChange={(e) => update("parentName", e.target.value)} placeholder="Jamie Lee" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="(555) 123-4567" style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="jamie@example.com" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Insurance provider <span style={{ fontWeight: 400, opacity: 0.6 }}>(optional — we'll verify before your visit)</span></label>
                <select value={form.insurance} onChange={(e) => update("insurance", e.target.value)} style={inputStyle}>
                  <option value="">— Select —</option>
                  <option>Delta Dental</option>
                  <option>Aetna</option>
                  <option>Cigna</option>
                  <option>MetLife</option>
                  <option>Guardian</option>
                  <option>BlueCross BlueShield</option>
                  <option>Medicaid / CHIP</option>
                  <option>Self-pay</option>
                  <option>Other</option>
                </select>
              </div>
              <label style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: 14, background: "#fff", borderRadius: 12, border: "2px solid rgba(42,24,16,0.08)", cursor: "pointer" }}>
                <input type="checkbox" checked={form.sms} onChange={(e) => update("sms", e.target.checked)} style={{ marginTop: 3 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>Send me SMS reminders</div>
                  <div style={{ fontSize: 13, color: "#7a3e22", marginTop: 2 }}>We'll text 24h before — easy to confirm or reschedule with one tap.</div>
                </div>
              </label>
            </div>
          )}

          {/* Step 3 — confirmation */}
          {step === 3 && (
            <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
              <div style={{ display: "inline-block", padding: 0 }}>
                <svg width="100" height="100" viewBox="0 0 220 220">
                  <circle cx="110" cy="110" r="100" fill="#6FCFB2" />
                  <path d="M 70 115 L 100 145 L 155 85" stroke="#fff" strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 28, marginTop: 16 }}>
                See you {form.time || "soon"}!
              </h3>
              <p style={{ marginTop: 12, color: "#7a3e22", maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>
                We've sent a confirmation to <strong>{form.email || "your email"}</strong>. {form.sms ? "A reminder will text 24 hours before your appointment." : ""}
              </p>
              <div style={{ marginTop: 28, padding: 20, background: "#fff", borderRadius: 16, textAlign: "left", maxWidth: 420, margin: "28px auto 0" }}>
                <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.5, textTransform: "uppercase", letterSpacing: 1 }}>Appointment</div>
                <div style={{ marginTop: 8, fontWeight: 700 }}>{form.childName || "Your child"}{form.age ? `, age ${form.age}` : ""}</div>
                <div style={{ marginTop: 4, fontSize: 14, opacity: 0.75 }}>{reasons.find(r => r.id === form.reason)?.label}</div>
                <div style={{ marginTop: 4, fontSize: 14, opacity: 0.75 }}>{locations.find(l => l.id === form.location)?.name} · {locations.find(l => l.id === form.location)?.addr}</div>
                <div style={{ marginTop: 4, fontSize: 14, opacity: 0.75 }}>{providers.find(p => p.id === form.provider)?.name}</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div style={{ position: "sticky", bottom: 0, background: "#FFF6E8", padding: "16px 28px", borderTop: "1px solid rgba(42,24,16,0.08)", display: "flex", justifyContent: "space-between", gap: 12 }}>
          {step > 0 && step < 3 ? (
            <button className="btn btn-ghost" onClick={back}>← Back</button>
          ) : <div />}
          {step < 2 && <button className="btn btn-coral" onClick={next}>Continue →</button>}
          {step === 2 && <button className="btn btn-coral" onClick={next}>Confirm booking →</button>}
          {step === 3 && <button className="btn btn-coral" onClick={reset}>Done</button>}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.94) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "2px solid rgba(42,24,16,0.1)",
  background: "#fff",
  fontSize: 15,
  fontFamily: "inherit",
  color: "#2A1810",
};
const labelStyle = { fontWeight: 700, fontSize: 14, display: "block", marginBottom: 8 };

Object.assign(window, { BookingModal });

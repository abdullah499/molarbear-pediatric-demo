/* global React */
const { useState: useNPState } = React;

const NP_PHONE_DISPLAY = "(555) 123-CHEW";
const NP_PHONE_TEL = "5551234386";

// ============================================================
// 1 · WELCOME HERO
// ============================================================
function NPHero({ onBook }) {
  return (
    <section style={{ paddingTop: 48, paddingBottom: 32, position: "relative", overflow: "hidden" }} data-screen-label="01 Welcome hero">
      <div style={{ position: "absolute", top: -140, right: "-10%", width: 520, height: 520, borderRadius: "50%", background: "#FBEED4", filter: "blur(60px)", opacity: 0.8, pointerEvents: "none" }} />
      <div className="container" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 48, alignItems: "center" }}>
        <div className="np-hero-text">
          <div className="sticker" style={{ marginBottom: 18 }}>🧸 New here? You picked a good one.</div>
          <h1 style={{ fontSize: "clamp(42px, 6vw, 82px)", lineHeight: 0.96, letterSpacing: "-0.03em" }}>
            Your child's first visit, <span className="wavy">made easy.</span>
          </h1>
          <p style={{ marginTop: 22, fontSize: 19, color: "#4a3326", maxWidth: 540 }}>
            We slow down for first-timers. A longer, gentle appointment, parents in the room the whole time, and your insurance checked before you arrive. No drills, no scary words, no surprise bills.
          </p>
          <div style={{ marginTop: 30, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <button className="btn btn-coral" onClick={onBook} style={{ fontSize: 17, padding: "16px 26px" }}>Book your first visit →</button>
            <a href={`tel:${NP_PHONE_TEL}`} className="btn btn-ghost" style={{ fontSize: 16 }}>📞 Call {NP_PHONE_DISPLAY}</a>
          </div>
          <div style={{ marginTop: 26, display: "flex", gap: 24, flexWrap: "wrap", fontSize: 14, color: "#4a3326" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ea98e" }}></span> Most visits booked this week</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span>🛡️</span> Insurance verified for you</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span>⭐</span> 4.9 from 2,800+ parents</div>
          </div>
        </div>

        {/* Hero photo slot */}
        <div className="np-hero-art" style={{ position: "relative" }}>
          <div style={{ background: "#6FCFB2", borderRadius: 28, border: "3px solid #2A1810", boxShadow: "10px 10px 0 #2A1810", overflow: "hidden", aspectRatio: "4/5" }}>
            <image-slot id="np-hero" shape="rect" placeholder="Photo: smiling child in the dental chair, parent beside them" style={{ width: "100%", height: "100%" }}></image-slot>
          </div>
          <div className="sticker" style={{ position: "absolute", bottom: -14, left: -14, transform: "rotate(3deg)", background: "#fff" }}>🦷 First visit from age 1</div>
        </div>
      </div>

      <style>{`
        @media (max-width: 920px) {
          section[data-screen-label="01 Welcome hero"] .container { grid-template-columns: 1fr !important; }
          .np-hero-art { max-width: 420px; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// 2 · WHAT TO EXPECT
// ============================================================
function NPExpect() {
  const steps = [
    { n: "01", c: "#F4845F", t: "Arrive and settle in", d: "Come about 10 minutes early. There is a play corner, friendly faces, and zero rush. Your child can warm up at their own pace." },
    { n: "02", c: "#6FCFB2", t: "Meet your dentist and team", d: "We show your kid the chair, the tooth counter (a little mirror), and the water sprayer. They can sit if they want to. We always ask first." },
    { n: "03", c: "#F2C94C", t: "A gentle look and clean", d: "We count teeth, brush, polish, and paint on fluoride. Your child picks the flavor. You stay in the room the entire time." },
    { n: "04", c: "#A0522D", t: "A plan in plain words", d: "Your dentist tells you what they saw in clear language, answers every question, and only suggests next steps if your child truly needs them." },
    { n: "05", c: "#F4845F", t: "Sticker and high five", d: "Every kid leaves with a sticker and a brand new toothbrush. We help you set the next visit before you reach the parking lot." },
  ];
  return (
    <section data-screen-label="02 What to expect">
      <div className="container">
        <div className="section-head" style={{ maxWidth: 760 }}>
          <div className="eyebrow">What to expect · about 45 minutes</div>
          <h2>The first visit, step by step.</h2>
          <p>Knowing what is coming makes it easier for everyone. Here is exactly how a first appointment goes, from the front door to the sticker.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }} className="np-steps">
          {steps.map((s) => (
            <div key={s.n} style={{ background: "#fff", border: "2px solid #2A1810", borderRadius: 22, padding: "28px 22px 24px", boxShadow: "6px 6px 0 #2A1810", position: "relative" }}>
              <div style={{ position: "absolute", top: -18, left: 20, padding: "5px 13px", background: s.c, borderRadius: 999, border: "2px solid #2A1810", fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, color: "#2A1810" }}>{s.n}</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19, marginTop: 8, lineHeight: 1.1 }}>{s.t}</div>
              <div style={{ fontSize: 14, color: "#4a3326", marginTop: 10, lineHeight: 1.5 }}>{s.d}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, padding: "18px 22px", background: "#FBEED4", borderRadius: 16, fontSize: 15, color: "#4a3326", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 20 }}>💛</span>
          <span>Nervous kid, or a first visit ever? Tell us when you book and we set aside extra time so nobody feels rushed.</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 1080px) { .np-steps { grid-template-columns: 1fr 1fr 1fr !important; } }
        @media (max-width: 720px) { .np-steps { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .np-steps { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ============================================================
// 3 · NEW PATIENT FORMS
// ============================================================
function NPForms() {
  return (
    <section style={{ background: "#FBEED4" }} data-screen-label="03 New patient forms">
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 40, alignItems: "center" }} >
        <div className="np-forms-text">
          <div className="eyebrow">Paperless intake</div>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", marginTop: 12 }}>Do the paperwork in your pajamas.</h2>
          <p style={{ marginTop: 16, fontSize: 17, color: "#4a3326", maxWidth: 520 }}>
            Fill out the new patient forms online before you come in. It takes about 5 minutes and means you walk straight back to the chair instead of filling out a clipboard in the waiting room.
          </p>
          <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="https://jetform.health/molar-bear/new-patient" target="_blank" rel="noopener noreferrer" className="btn btn-coral">Start my forms online ↗</a>
            <a href="https://jetform.health/molar-bear/new-patient.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">📋 Download PDF forms</a>
          </div>
          <p style={{ marginTop: 16, fontSize: 13, color: "#7a3e22", fontFamily: "var(--font-mono)", letterSpacing: 0.3, lineHeight: 1.6 }}>
            Forms run on JetForm, our HIPAA-compliant intake system. Your information never touches this website.
          </p>
        </div>

        <div style={{ background: "#fff", borderRadius: 24, border: "2px solid #2A1810", boxShadow: "8px 8px 0 #2A1810", padding: 28 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.4, color: "#7a3e22" }}>WHAT YOU WILL FILL OUT</div>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { t: "Child and parent details", d: "Names, birthday, who is bringing them in." },
              { t: "Health history", d: "Allergies, medications, anything we should know." },
              { t: "Insurance card", d: "Snap a photo and we verify benefits before the visit." },
              { t: "Consent and privacy", d: "Sign once, securely, no printing needed." },
            ].map((it, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#6FCFB2", color: "#2A1810", display: "grid", placeItems: "center", flexShrink: 0, fontSize: 13, fontWeight: 700, border: "2px solid #2A1810" }}>✓</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{it.t}</div>
                  <div style={{ fontSize: 13.5, color: "#4a3326", marginTop: 2 }}>{it.d}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18, padding: "12px 14px", background: "#FBEED4", borderRadius: 12, fontSize: 13, color: "#4a3326" }}>
            No time before the visit? You can finish everything on a tablet when you arrive.
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 920px) {
          section[data-screen-label="03 New patient forms"] .container { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// 4 · INSURANCE & PAYMENT  (with mini Insurance Checker)
// ============================================================
function NPInsurance() {
  const carriers = [
    "Delta Dental", "Aetna", "Cigna", "BCBS / Anthem",
    "MetLife", "Guardian", "UnitedHealthcare", "Medicaid / CHIP",
  ];
  return (
    <section data-screen-label="04 Insurance and payment">
      <div className="container">
        <div className="section-head" style={{ maxWidth: 760 }}>
          <div className="eyebrow">Insurance and payment</div>
          <h2>Most insurance is accepted. No surprise bills.</h2>
          <p>We are in network with the carriers below and we file claims for many more. Tell us your plan and we confirm your coverage before the first visit, in writing.</p>
        </div>

        {/* Mini insurance checker */}
        <div style={{ background: "#2A1810", borderRadius: 28, padding: "32px 32px 28px", color: "#FFF6E8", boxShadow: "10px 10px 0 #F4845F" }} className="np-checker">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.4, opacity: 0.7 }}>INSURANCE CHECKER · NO PERSONAL INFO</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, marginTop: 6 }}>Check your plan in 30 seconds.</div>
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: 1.2, color: "#6FCFB2", fontWeight: 700, whiteSpace: "nowrap" }}>9 in-network · $0 to check</div>
          </div>

          <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }} className="np-carrier-grid">
            {carriers.map((c) => (
              <a key={c} href="Insurance.html#checker" style={{
                background: "rgba(255,246,232,0.07)",
                border: "1.5px solid rgba(255,246,232,0.22)",
                borderRadius: 14,
                padding: "14px 12px",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 14,
                color: "#FFF6E8",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                transition: "background 0.12s, border-color 0.12s",
              }}
                onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,246,232,0.16)"; e.currentTarget.style.borderColor = "#6FCFB2"; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255,246,232,0.07)"; e.currentTarget.style.borderColor = "rgba(255,246,232,0.22)"; }}
              >
                <span>{c}</span>
                <span style={{ opacity: 0.5 }}>→</span>
              </a>
            ))}
          </div>

          <div style={{ marginTop: 22, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <a href="Insurance.html#checker" className="btn btn-coral">Open the full Insurance Checker →</a>
            <span style={{ fontSize: 14, opacity: 0.8 }}>See typical coverage and a price range for every treatment.</span>
          </div>
        </div>

        {/* Payment + Cub Club */}
        <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="np-pay-grid">
          <div style={{ background: "#fff", border: "2px solid #2A1810", borderRadius: 24, boxShadow: "6px 6px 0 #2A1810", padding: 28 }}>
            <h3 style={{ fontSize: 22 }}>Ways to pay</h3>
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { t: "Insurance, Medicaid, HSA and FSA", d: "We bill your carrier directly, coordinate secondary plans, and take HSA or FSA cards at checkout." },
                { t: "Pay in full, 5% off", d: "Settle on the day of treatment and we take 5% off your share." },
                { t: "0% payment plans", d: "Split larger treatment across 3 or 6 months interest-free, or 12 months through CareCredit." },
              ].map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#F2C94C", color: "#2A1810", display: "grid", placeItems: "center", flexShrink: 0, fontSize: 12, fontWeight: 700, border: "2px solid #2A1810" }}>✓</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{p.t}</div>
                    <div style={{ fontSize: 13.5, color: "#4a3326", marginTop: 2 }}>{p.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#6FCFB2", border: "2px solid #2A1810", borderRadius: 24, boxShadow: "6px 6px 0 #2A1810", padding: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
              <h3 style={{ fontSize: 22 }}>No insurance? The Cub Club.</h3>
              <div style={{ background: "#2A1810", color: "#FFF6E8", padding: "5px 11px", borderRadius: 999, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, whiteSpace: "nowrap" }}>$249 / yr</div>
            </div>
            <p style={{ marginTop: 12, fontSize: 15, color: "#1a3a30", lineHeight: 1.5 }}>
              Our in-house membership for uninsured families. One flat yearly fee covers every cleaning, exam, X-ray, and fluoride for the year, plus 20% off other treatment. No deductibles, no annual max, no waiting.
            </p>
            <a href="Insurance.html#cubclub" className="btn btn-ink" style={{ marginTop: 18, fontSize: 14 }}>See Cub Club benefits →</a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) { .np-carrier-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 860px) { .np-pay-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 480px) {
          .np-carrier-grid { grid-template-columns: 1fr !important; }
          .np-checker { padding: 24px 20px !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// 5 · WHAT TO BRING / BEFORE YOU ARRIVE
// ============================================================
function NPBring() {
  const items = [
    { icon: "🪪", t: "Photo ID", d: "For the parent or guardian bringing the child in." },
    { icon: "💳", t: "Insurance or Medicaid card", d: "Or a photo of it. We handle the rest." },
    { icon: "💊", t: "List of medications and allergies", d: "Anything your child takes or reacts to." },
    { icon: "🧸", t: "A comfort item", d: "A favorite stuffed animal or blanket for nervous kiddos." },
  ];
  return (
    <section style={{ background: "#FBEED4" }} data-screen-label="05 Before you arrive">
      <div className="container">
        <div className="section-head" style={{ maxWidth: 760 }}>
          <div className="eyebrow">Before you arrive</div>
          <h2>A short checklist for the big day.</h2>
          <p>Bring these along and you are set. If you finished your forms online, you can skip ahead and walk right back.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="np-bring-grid">
          {items.map((it, i) => (
            <div key={i} style={{ background: "#fff", border: "2px solid #2A1810", borderRadius: 20, padding: 24, boxShadow: "5px 5px 0 #2A1810" }}>
              <div style={{ fontSize: 30, lineHeight: 1 }} aria-hidden="true">{it.icon}</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, marginTop: 12 }}>{it.t}</div>
              <div style={{ fontSize: 13.5, color: "#4a3326", marginTop: 6, lineHeight: 1.5 }}>{it.d}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20, background: "#fff", border: "2px solid #2A1810", borderRadius: 20, boxShadow: "5px 5px 0 #2A1810", padding: 28, display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center" }} className="np-arrive">
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20 }}>🕒 Arrive about 10 minutes early</div>
            <p style={{ marginTop: 8, fontSize: 15, color: "#4a3326", maxWidth: 620 }}>
              That gives your child a moment to settle in, and the front desk time to finish anything left on your forms. Free parking sits right out front at every location, with step free access to the door.
            </p>
          </div>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Molar+Bear+Downtown+Den,+148+Maple+Row+Suite+200"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-coral"
            style={{ whiteSpace: "nowrap" }}
          >Get directions →</a>
        </div>
      </div>

      <style>{`
        @media (max-width: 940px) { .np-bring-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 720px) { .np-arrive { grid-template-columns: 1fr !important; } }
        @media (max-width: 440px) { .np-bring-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ============================================================
// 6 · NEW PATIENT FAQ
// ============================================================
function NPFaq() {
  const faqs = [
    { q: "How much does the first visit cost?", a: "For most insured families a routine first visit, exam, cleaning, and X-rays is fully covered, so your out of pocket is often $0. We verify your exact benefits before you come in and send a written estimate if anything will not be covered." },
    { q: "Do you take my insurance?", a: "We are in network with Delta Dental, Aetna, Cigna, BCBS and Anthem, MetLife, Guardian, UnitedHealthcare, Humana, and Medicaid and CHIP. We also file claims for many out of network plans. Use the Insurance Checker above to see your typical coverage." },
    { q: "What if my child is nervous or has never been to a dentist?", a: "This is what we do all day. Tell us when you book and we set aside extra time. Your child can explore the room first, sit in the chair only if they want to, and you stay beside them the whole visit. No drills and no scary words on a first visit." },
    { q: "My kid has not seen a dentist in years. Is that a problem?", a: "Not at all, and there is no lecture. We simply start where you are, get a clear picture, and build a calm plan to catch up. Plenty of our families come to us after a long gap." },
    { q: "What ages do you see?", a: "From the first tooth, usually around age one, all the way through the teen years. Our team is trained specifically in pediatric care, including kids with sensory needs and special health care needs." },
    { q: "What if we have a dental emergency?", a: "Call us and we hold same day slots open every weekday for urgent visits. After hours, our voicemail routes straight to the on call pediatric dentist, who calls back within about 20 minutes." },
    { q: "What if we do not have insurance?", a: "You have options. Many treatments can be split into interest free monthly payments, and our Cub Club membership covers all preventive care for one flat yearly fee with 20% off everything else." },
  ];
  return (
    <section data-screen-label="06 New patient FAQ">
      <div className="container" style={{ maxWidth: 880 }}>
        <div className="section-head">
          <div className="eyebrow">First visit questions</div>
          <h2>The things parents ask us most.</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((f, i) => (
            <details key={i} style={{ background: "#fff", borderRadius: 18, padding: 24, border: "1px solid rgba(42,24,16,0.1)", boxShadow: "0 2px 8px rgba(42,24,16,0.04)" }}>
              <summary style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
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
// 7 · TRUST STRIP
// ============================================================
function NPTrust() {
  return (
    <section className="compact" style={{ background: "#6FCFB2", color: "#2A1810" }} data-screen-label="07 Trust strip">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "auto auto auto 1.4fr", gap: 32, alignItems: "center" }} className="np-trust-grid">
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 44, lineHeight: 1 }}>12 yrs</div>
            <div style={{ fontSize: 14, color: "#1a3a30", marginTop: 6 }}>caring for kids in this community</div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 44, lineHeight: 1 }}>4.9 ★</div>
            <div style={{ fontSize: 14, color: "#1a3a30", marginTop: 6 }}>across 2,800+ parent reviews</div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 44, lineHeight: 1 }}>8,400+</div>
            <div style={{ fontSize: 14, color: "#1a3a30", marginTop: 6 }}>little patients and counting</div>
          </div>
          <div style={{ background: "#fff", border: "2px solid #2A1810", borderRadius: 20, boxShadow: "5px 5px 0 #2A1810", padding: 24 }}>
            <div style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.45 }}>
              "My 4 year old was terrified of dentists. They gave her time, let her hold the mirror herself, and she walked out asking when she could come back."
            </div>
            <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: 0.4, color: "#7a3e22" }}>PRIYA M. · GOOGLE REVIEW</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13 }}>🐻 No upsell. Honest care, only what your kid needs.</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 920px) {
          .np-trust-grid { grid-template-columns: 1fr 1fr !important; }
          .np-trust-grid > div:nth-child(4) { grid-column: 1 / -1; }
        }
        @media (max-width: 460px) {
          .np-trust-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// 8 · OFFICE DETAILS  (three dens, each with map + directions)
// ============================================================
function NPOffices() {
  const locations = [
    { name: "Downtown Den", addr1: "148 Maple Row · Suite 200", addr2: "Downtown, 10005", hours: "Mon-Fri 8am-6pm", mapBg: "#F4845F", pinX: "62%", pinY: "44%" },
    { name: "Westside Cave", addr1: "3201 Birch Ave", addr2: "Westside, 10112", hours: "Mon-Sat 8am-5pm", mapBg: "#6FCFB2", pinX: "30%", pinY: "60%" },
    { name: "Northside Lodge", addr1: "8 Pinecone Plaza", addr2: "Northside, 10201", hours: "Mon-Sat 9am-7pm", mapBg: "#F2C94C", pinX: "48%", pinY: "30%" },
  ];
  return (
    <section data-screen-label="08 Office details">
      <div className="container">
        <div className="section-head" style={{ maxWidth: 760 }}>
          <div className="eyebrow">Visit us · three dens</div>
          <h2>Find the den nearest you.</h2>
          <p>Same gentle care at all three offices. Phone, hours, and one click directions for each one below.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="np-loc-grid">
          {locations.map((l, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 28, border: "2px solid #2A1810", overflow: "hidden", boxShadow: "8px 8px 0 #2A1810" }}>
              {/* Stylized map */}
              <div style={{ position: "relative", aspectRatio: "4/3", background: l.mapBg, borderBottom: "2px solid #2A1810", overflow: "hidden" }} role="img" aria-label={`Map showing Molar Bear ${l.name} at ${l.addr1}`}>
                <svg viewBox="0 0 400 300" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 }} aria-hidden="true">
                  <path d="M0 150 L400 150" stroke="#fff" strokeWidth="6" />
                  <path d="M200 0 L200 300" stroke="#fff" strokeWidth="6" />
                  <path d="M0 80 L400 80" stroke="#fff" strokeWidth="2" opacity="0.5" />
                  <path d="M0 220 L400 220" stroke="#fff" strokeWidth="2" opacity="0.5" />
                  <path d="M80 0 L80 300" stroke="#fff" strokeWidth="2" opacity="0.5" />
                  <path d="M320 0 L320 300" stroke="#fff" strokeWidth="2" opacity="0.5" />
                  <rect x="220" y="100" width="60" height="40" fill="#fff" opacity="0.3" rx="4" />
                  <rect x="100" y="170" width="50" height="35" fill="#fff" opacity="0.3" rx="4" />
                </svg>
                <div style={{ position: "absolute", left: l.pinX, top: l.pinY, transform: "translate(-50%, -100%)" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50% 50% 50% 0", background: "#2A1810", transform: "rotate(-45deg)", display: "grid", placeItems: "center", boxShadow: "0 6px 12px rgba(0,0,0,0.2)" }}>
                    <div style={{ transform: "rotate(45deg)", color: "#fff", fontSize: 22 }} aria-hidden="true">🐻</div>
                  </div>
                </div>
              </div>

              <div style={{ padding: 26 }}>
                <h3 style={{ fontSize: 23 }}>{l.name}</h3>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#7a3e22", marginTop: 8, letterSpacing: 0.4, lineHeight: 1.6 }}>
                  {l.addr1}<br />{l.addr2}
                </div>
                <div style={{ marginTop: 14, fontSize: 14, color: "#4a3326", lineHeight: 1.7 }}>
                  🕒 {l.hours}<br />
                  📞 <a href={`tel:${NP_PHONE_TEL}`} style={{ fontWeight: 700, color: "#A0522D" }}>{NP_PHONE_DISPLAY}</a>
                </div>
                <div style={{ marginTop: 18, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`Molar Bear ${l.name}, ${l.addr1}, ${l.addr2}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-coral"
                    style={{ fontSize: 13 }}
                  >Directions →</a>
                  <a href={`tel:${NP_PHONE_TEL}`} className="btn btn-sm btn-ghost" style={{ fontSize: 13, padding: "8px 14px" }}>Call</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .np-loc-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 720px) { .np-loc-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ============================================================
// 9 · CLOSING CTA
// ============================================================
function NPClosing({ onBook }) {
  return (
    <section className="compact" data-screen-label="09 Closing CTA">
      <div className="container">
        <div style={{ background: "#F4845F", borderRadius: 32, border: "2px solid #2A1810", boxShadow: "10px 10px 0 #2A1810", padding: "56px 48px", position: "relative", overflow: "hidden", textAlign: "center" }} className="np-closing">
          <div style={{ position: "relative", maxWidth: 680, margin: "0 auto" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: 1.6, textTransform: "uppercase", color: "#fff", opacity: 0.85 }}>Ready when you are</div>
            <h2 style={{ fontSize: "clamp(34px, 5vw, 56px)", marginTop: 12, color: "#fff" }}>Let's get that first visit booked.</h2>
            <p style={{ marginTop: 14, fontSize: 18, color: "#fff", opacity: 0.95 }}>
              Pick a time that works for your family. We check your insurance and send a friendly reminder before the day.
            </p>
            <div style={{ marginTop: 28, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn btn-ink" onClick={onBook} style={{ fontSize: 17, padding: "16px 26px" }}>Book your first visit →</button>
              <a href={`tel:${NP_PHONE_TEL}`} className="btn btn-ghost" style={{ color: "#fff", borderColor: "#fff", fontSize: 16 }}>📞 Or call {NP_PHONE_DISPLAY}</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) { .np-closing { padding: 40px 24px !important; } }
      `}</style>
    </section>
  );
}

// ============================================================
// MOBILE STICKY ACTION BAR — Book + Call, always reachable
// ============================================================
function NPMobileBar({ onBook }) {
  return (
    <div className="np-mobilebar" style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 60,
      background: "#FFF6E8", borderTop: "2px solid #2A1810",
      padding: "10px 14px", display: "none", gap: 10,
      boxShadow: "0 -6px 20px -12px rgba(42,24,16,0.4)",
    }}>
      <button className="btn btn-coral" onClick={onBook} style={{ flex: 2, justifyContent: "center" }}>Book first visit →</button>
      <a href={`tel:${NP_PHONE_TEL}`} className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} aria-label={`Call ${NP_PHONE_DISPLAY}`}>📞 Call</a>
      <style>{`
        @media (max-width: 768px) { .np-mobilebar { display: flex !important; } }
      `}</style>
    </div>
  );
}

// ============================================================
// PAGE
// ============================================================
function NewPatientsPage({ onBook }) {
  return (
    <>
      <NPHero onBook={onBook} />
      <NPExpect />
      <NPForms />
      <NPInsurance />
      <NPBring />
      <NPFaq />
      <NPTrust />
      <DecideToolkit />
      <NPOffices />
      <NPClosing onBook={onBook} />
      <NPMobileBar onBook={onBook} />
    </>
  );
}

Object.assign(window, { NewPatientsPage });

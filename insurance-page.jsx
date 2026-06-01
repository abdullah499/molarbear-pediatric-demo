/* global React */
const { useState: useInsState, useMemo: useInsMemo } = React;

// ============================================================
// INSURANCE PAGE — info-only, no PHI required
// ============================================================
// We removed the old name / DOB / member-ID form. Parents pick
// a carrier and we show general coverage tiers + treatment cost
// ranges. To run an actual eligibility check we ask them to book
// a visit and we do it on the back end (HIPAA-compliant channel).
// ============================================================

const IN_NETWORK = [
  {
    id: "delta", name: "Delta Dental",
    plans: "PPO · Premier · Medicaid",
    network: "in",
    color: "#F4845F",
    preventive: 100, basic: 80, major: 50,
    deductible: "$50",
    annualMax: "$1,500 – $2,000",
    notes: "Most common plan we see. Cleanings & exams almost always 100% with no waiting period.",
  },
  {
    id: "aetna", name: "Aetna",
    plans: "DMO · PPO · Dental Fund",
    network: "in",
    color: "#6FCFB2",
    preventive: 100, basic: 80, major: 50,
    deductible: "$50",
    annualMax: "$1,250 – $2,000",
    notes: "DMO plans require a primary dentist on file — easy to switch to us, takes 24-48 hrs.",
  },
  {
    id: "cigna", name: "Cigna",
    plans: "DPPO · Total Care",
    network: "in",
    color: "#F2C94C",
    preventive: 100, basic: 80, major: 50,
    deductible: "$50",
    annualMax: "$1,000 – $1,500",
    notes: "Total Care plans add an in-house orthodontic benefit — useful for kids needing early intervention.",
  },
  {
    id: "bcbs", name: "BCBS / Anthem",
    plans: "Dental Blue · FEP · Medicaid",
    network: "in",
    color: "#A0522D",
    preventive: 100, basic: 80, major: 50,
    deductible: "$25 – $50",
    annualMax: "$1,000 – $1,500",
    notes: "Federal Employee Program (FEP) members get enhanced coverage — typically zero out-of-pocket preventive.",
  },
  {
    id: "metlife", name: "MetLife",
    plans: "PDP Plus · TakeAlong Dental",
    network: "in",
    color: "#F4845F",
    preventive: 100, basic: 80, major: 50,
    deductible: "$50",
    annualMax: "$1,000 – $2,000",
    notes: "PDP Plus is the wider network and includes us. TakeAlong follows you across employers.",
  },
  {
    id: "guardian", name: "Guardian",
    plans: "DentalGuard PPO · Managed DentalGuard",
    network: "in",
    color: "#6FCFB2",
    preventive: 100, basic: 80, major: 50,
    deductible: "$50",
    annualMax: "$1,500",
    notes: "Many Guardian plans waive the deductible on preventive — bring your card and we'll confirm.",
  },
  {
    id: "united", name: "UnitedHealthcare",
    plans: "Options PPO · Dental Choice",
    network: "in",
    color: "#F2C94C",
    preventive: 100, basic: 80, major: 50,
    deductible: "$50",
    annualMax: "$1,000 – $1,500",
    notes: "Frequency limit is typically 2 cleanings per calendar year, not every 6 months — schedule accordingly.",
  },
  {
    id: "humana", name: "Humana",
    plans: "Dental PPO · Loyalty Plus",
    network: "in",
    color: "#A0522D",
    preventive: 100, basic: 80, major: 50,
    deductible: "$50",
    annualMax: "$1,000 – $1,500",
    notes: "Loyalty Plus increases the annual max each year you stay — great for ortho-bound kids.",
  },
  {
    id: "medicaid", name: "Medicaid / CHIP",
    plans: "State Medicaid · CHIP Dental",
    network: "in",
    color: "#F4845F",
    preventive: 100, basic: 100, major: 80,
    deductible: "$0",
    annualMax: "No annual max for kids",
    notes: "All preventive and basic restorative covered at $0 out-of-pocket. Bring the Medicaid card to the first visit.",
  },
];

const OON = [
  {
    id: "principal", name: "Principal",
    plans: "PPO",
    network: "oon",
    color: "#A0522D",
    preventive: 80, basic: 60, major: 40,
    deductible: "$50 – $100",
    annualMax: "$1,000 – $1,500",
    notes: "We file claims for you. Reimbursement goes straight to your bank account in 2-4 weeks.",
  },
  {
    id: "ameritas", name: "Ameritas",
    plans: "PPO · Indemnity",
    network: "oon",
    color: "#6FCFB2",
    preventive: 80, basic: 60, major: 40,
    deductible: "$50",
    annualMax: "$1,000 – $1,500",
    notes: "Indemnity plans pay a fixed dollar amount per procedure regardless of where you go.",
  },
  {
    id: "sunlife", name: "Sun Life",
    plans: "PPO",
    network: "oon",
    color: "#F2C94C",
    preventive: 80, basic: 60, major: 40,
    deductible: "$50",
    annualMax: "$1,000 – $1,500",
    notes: "Common employer plan. Out-of-network reimbursement is usually 80% of allowed amount.",
  },
  {
    id: "lincoln", name: "Lincoln Financial",
    plans: "DentalConnect PPO",
    network: "oon",
    color: "#F4845F",
    preventive: 80, basic: 60, major: 40,
    deductible: "$50",
    annualMax: "$1,000 – $2,000",
    notes: "Strong preventive reimbursement even out of network. Pre-treatment estimate recommended for ortho.",
  },
  {
    id: "standard", name: "Standard Insurance",
    plans: "Dental PPO",
    network: "oon",
    color: "#A0522D",
    preventive: 80, basic: 60, major: 40,
    deductible: "$50",
    annualMax: "$1,000 – $1,500",
    notes: "Pacific NW employer favorite. Reimbursement follows the UCR fee schedule.",
  },
  {
    id: "other", name: "Other / I'm not sure",
    plans: "Any carrier",
    network: "oon",
    color: "#FBEED4",
    preventive: 80, basic: 60, major: 40,
    deductible: "Varies",
    annualMax: "Varies",
    notes: "Bring your card to the first visit (or photo it ahead) — we'll verify benefits and email you a written estimate before any treatment.",
  },
];

const ALL_CARRIERS = [...IN_NETWORK, ...OON];

// Treatment cost ranges — used inside the carrier card and the
// standalone treatments section.
const TREATMENTS = [
  { id: "exam", name: "Comprehensive first-visit exam", code: "D0150", billed: [80, 110], tier: "preventive" },
  { id: "clean", name: "Child cleaning (prophy)", code: "D1120", billed: [60, 90], tier: "preventive" },
  { id: "fluoride", name: "Fluoride varnish", code: "D1206", billed: [25, 40], tier: "preventive" },
  { id: "xray", name: "Bitewing X-rays (2-4 films)", code: "D0272-D0274", billed: [45, 95], tier: "preventive" },
  { id: "pano", name: "Panoramic X-ray", code: "D0330", billed: [85, 140], tier: "preventive" },
  { id: "sealant", name: "Sealants (per tooth)", code: "D1351", billed: [35, 60], tier: "preventive" },
  { id: "filling", name: "Tooth-colored filling (1-2 surfaces)", code: "D2391-D2392", billed: [130, 250], tier: "basic" },
  { id: "extract", name: "Simple extraction (baby tooth)", code: "D7140", billed: [90, 180], tier: "basic" },
  { id: "pulp", name: "Pulpotomy (baby root canal)", code: "D3220", billed: [180, 280], tier: "basic" },
  { id: "crown", name: "Stainless steel crown", code: "D2930", billed: [250, 400], tier: "major" },
  { id: "nitrous", name: "Nitrous oxide sedation", code: "D9230", billed: [50, 100], tier: "basic" },
  { id: "oral-sed", name: "Oral conscious sedation", code: "D9248", billed: [150, 300], tier: "major" },
  { id: "emerg", name: "Emergency exam (limited)", code: "D0140", billed: [75, 150], tier: "preventive" },
  { id: "space", name: "Space maintainer (fixed)", code: "D1510", billed: [350, 500], tier: "basic" },
];

// Calculate parent's out-of-pocket range given a carrier's coverage tiers
function calcOOP(carrier, t) {
  const pct = carrier[t.tier] / 100;
  const lo = Math.round(t.billed[0] * (1 - pct));
  const hi = Math.round(t.billed[1] * (1 - pct));
  return [lo, hi];
}

// ============================================================
// HERO
// ============================================================
function InsuranceHero({ onScrollChecker }) {
  return (
    <section style={{ paddingTop: 56, paddingBottom: 32, position: "relative", overflow: "hidden" }} data-screen-label="01 Insurance hero">
      <div style={{ position: "absolute", top: -120, left: "-8%", width: 480, height: 480, borderRadius: "50%", background: "#FBEED4", filter: "blur(60px)", opacity: 0.8, pointerEvents: "none" }} />
      <div className="container" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 48, alignItems: "center" }} >
        <div className="ins-hero-text">
          <div className="eyebrow">No surprise bills · ever</div>
          <h1 style={{ fontSize: "clamp(48px, 6.2vw, 88px)", lineHeight: 0.96, marginTop: 16, letterSpacing: "-0.025em" }}>
            What does your plan <span className="wavy">actually cover?</span>
          </h1>
          <p style={{ marginTop: 22, fontSize: 18, color: "#4a3326", maxWidth: 540 }}>
            Pick your carrier below — we'll show typical coverage and a price range for every treatment we offer. <strong>No name, no member ID, no personal info.</strong> Just the numbers.
          </p>
          <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn btn-coral" onClick={onScrollChecker}>Look up my plan ↓</button>
            <a href="#treatments" className="btn btn-ghost">See treatment prices</a>
          </div>
          <div style={{ marginTop: 32, display: "flex", gap: 28, flexWrap: "wrap", fontSize: 13, color: "#4a3326" }}>
            <div><strong style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "#2A1810" }}>9</strong><div>plans in-network</div></div>
            <div><strong style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "#2A1810" }}>5+</strong><div>more we file for</div></div>
            <div><strong style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "#2A1810" }}>$0</strong><div>verification fee</div></div>
          </div>
        </div>

        {/* Illustrated card mock */}
        <div style={{ position: "relative", height: 380 }} className="ins-hero-card">
          <div style={{ position: "absolute", inset: "20px 40px", background: "#6FCFB2", borderRadius: 24, border: "2px solid #2A1810", boxShadow: "8px 8px 0 #2A1810", padding: 24, transform: "rotate(-4deg)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 1.4, color: "#2A1810" }}>DENTAL · BENEFIT GUIDE</div>
            <div style={{ marginTop: 10, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "#2A1810" }}>Delta Dental PPO</div>
            <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {[{ l: "Preventive", v: "100%" }, { l: "Basic", v: "80%" }, { l: "Major", v: "50%" }].map((s) => (
                <div key={s.l} style={{ background: "rgba(42,24,16,0.08)", padding: 8, borderRadius: 8 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 1, opacity: 0.7 }}>{s.l.toUpperCase()}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: "absolute", inset: "70px 0 0 80px", background: "#fff", borderRadius: 24, border: "2px solid #2A1810", boxShadow: "8px 8px 0 #2A1810", padding: 20, transform: "rotate(3deg)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#6FCFB2", display: "grid", placeItems: "center", border: "2px solid #2A1810", fontSize: 18 }}>✓</div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14 }}>Cleaning & exam</div>
                <div style={{ fontSize: 11, color: "#4a3326", fontFamily: "var(--font-mono)" }}>WITH IN-NETWORK PLAN</div>
              </div>
            </div>
            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12 }}>
              <div style={{ background: "#FBEED4", padding: 10, borderRadius: 10 }}><div style={{ color: "#7a3e22", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 1 }}>BILLED</div><div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginTop: 2 }}>$165</div></div>
              <div style={{ background: "#FBEED4", padding: 10, borderRadius: 10 }}><div style={{ color: "#7a3e22", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 1 }}>COVERED</div><div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginTop: 2, color: "#4ea98e" }}>$165</div></div>
              <div style={{ background: "#FBEED4", padding: 10, borderRadius: 10, gridColumn: "1 / -1" }}><div style={{ color: "#7a3e22", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 1 }}>YOUR OUT-OF-POCKET</div><div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, marginTop: 2, color: "#4ea98e" }}>$0</div></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ins-hero-text + .ins-hero-card { display: none; }
          section[data-screen-label="01 Insurance hero"] .container { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// PLAN LOOKUP — no PHI, just info
// ============================================================
function PlanLookup() {
  const [carrierId, setCarrierId] = useInsState("");
  const carrier = useInsMemo(() => ALL_CARRIERS.find((c) => c.id === carrierId), [carrierId]);

  return (
    <section id="checker" data-screen-label="02 Plan lookup">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Plan lookup · no sign-in required</div>
          <h2>Pick your carrier.</h2>
          <p>We don't ask for your name, date of birth, or member ID. Just your carrier — we'll show typical coverage and price ranges.</p>
        </div>

        {/* Carrier grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }} className="lookup-grid">
          {ALL_CARRIERS.map((c) => (
            <button key={c.id} onClick={() => {
              setCarrierId(c.id);
              setTimeout(() => {
                const el = document.getElementById("plan-result");
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 100;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }, 50);
            }} style={{
              background: carrierId === c.id ? c.color : "#fff",
              border: `2px solid ${carrierId === c.id ? "#2A1810" : "rgba(42,24,16,0.12)"}`,
              borderRadius: 16,
              padding: "16px 14px",
              cursor: "pointer",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 14,
              color: "#2A1810",
              textAlign: "left",
              transition: "all 0.12s",
              boxShadow: carrierId === c.id ? "4px 4px 0 #2A1810" : "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 6,
            }}>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: 1.2,
                padding: "2px 8px",
                borderRadius: 999,
                background: c.network === "in" ? "rgba(111,207,178,0.4)" : "rgba(244,132,95,0.25)",
                color: "#2A1810",
              }}>
                {c.network === "in" ? "IN-NETWORK" : "WE FILE CLAIMS"}
              </span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>

        {/* Result card */}
        <div id="plan-result" style={{ marginTop: 32, scrollMarginTop: 100 }}>
          {!carrier && (
            <div style={{ padding: "40px 24px", background: "#FBEED4", borderRadius: 22, border: "1px dashed rgba(42,24,16,0.2)", textAlign: "center", color: "#7a3e22", fontFamily: "var(--font-display)", fontSize: 16 }}>
              Pick a carrier above to see coverage details.
            </div>
          )}
          {carrier && <CarrierCard carrier={carrier} />}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .lookup-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 800px) {
          .lookup-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .lookup-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// CARRIER CARD — shown after selecting a plan
// ============================================================
function CarrierCard({ carrier }) {
  const inNet = carrier.network === "in";
  return (
    <div style={{
      background: "#fff",
      borderRadius: 28,
      border: "2px solid #2A1810",
      boxShadow: "10px 10px 0 #2A1810",
      overflow: "hidden",
    }}>
      {/* Header band */}
      <div style={{ background: carrier.color, padding: "28px 32px", borderBottom: "2px solid #2A1810", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.4, color: "#2A1810", opacity: 0.75 }}>
            {inNet ? "✓ IN-NETWORK · ALL THREE LOCATIONS" : "FILED OUT-OF-NETWORK"}
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 32, marginTop: 4, color: "#2A1810" }}>{carrier.name}</div>
          <div style={{ fontSize: 13, color: "#2A1810", opacity: 0.75, marginTop: 4 }}>{carrier.plans}</div>
        </div>
        <div style={{ width: 64, height: 64, borderRadius: 16, background: "#fff", border: "2px solid #2A1810", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "#2A1810" }}>
          {carrier.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
        </div>
      </div>

      {/* Coverage tier stats */}
      <div style={{ padding: 28, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }} className="cov-grid">
        <Stat label="Preventive" value={`${carrier.preventive}%`} accent="#6FCFB2" hint="Cleanings, exams, X-rays, fluoride" />
        <Stat label="Basic" value={`${carrier.basic}%`} accent="#F2C94C" hint="Fillings, extractions, sealants" />
        <Stat label="Major" value={`${carrier.major}%`} accent="#F4845F" hint="Crowns, sedation, pulpotomy" />
        <Stat label="Deductible" value={carrier.deductible} accent="#FBEED4" hint="Per calendar year" />
        <Stat label="Annual max" value={carrier.annualMax} accent="#FBEED4" hint="Per child" />
      </div>

      {/* Note */}
      <div style={{ margin: "0 28px 28px", padding: 18, background: "#FBEED4", borderRadius: 16, display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{ fontSize: 18, lineHeight: 1 }}>ℹ️</div>
        <div style={{ fontSize: 14, color: "#4a3326", lineHeight: 1.55 }}>{carrier.notes}</div>
      </div>

      {/* Treatment table */}
      <div style={{ padding: "0 28px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
          <h3 style={{ fontSize: 22 }}>Treatment cost ranges</h3>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.2, color: "#7a3e22" }}>
            BILLED · YOUR ESTIMATED SHARE
          </div>
        </div>

        <div style={{ border: "1px solid rgba(42,24,16,0.1)", borderRadius: 18, overflow: "hidden" }}>
          {TREATMENTS.map((t, i) => {
            const [lo, hi] = calcOOP(carrier, t);
            const tierColor = t.tier === "preventive" ? "#6FCFB2" : t.tier === "basic" ? "#F2C94C" : "#F4845F";
            const yourShare = lo === 0 && hi === 0 ? "$0" : lo === hi ? `$${lo}` : `$${lo} – $${hi}`;
            return (
              <div key={t.id} style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto auto",
                gap: 14,
                alignItems: "center",
                padding: "14px 18px",
                background: i % 2 === 0 ? "#fff" : "rgba(251,238,212,0.4)",
                borderBottom: i < TREATMENTS.length - 1 ? "1px solid rgba(42,24,16,0.06)" : "none",
              }} className="tx-row">
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: tierColor }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: "#7a3e22", fontFamily: "var(--font-mono)" }}>{t.code} · {t.tier}</div>
                </div>
                <div style={{ textAlign: "right", fontSize: 14, color: "#4a3326", fontFamily: "var(--font-mono)" }}>
                  ${t.billed[0]}–${t.billed[1]}
                </div>
                <div style={{ textAlign: "right", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: lo === 0 && hi === 0 ? "#4ea98e" : "#2A1810", minWidth: 80 }}>
                  {yourShare}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 14, fontSize: 12, color: "#7a3e22", fontFamily: "var(--font-mono)", lineHeight: 1.5 }}>
          * Ranges are typical billed fees in our area. Final amounts depend on your specific plan year, frequency limits, and remaining annual max. We confirm exact numbers at booking.
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "#2A1810", color: "#FFF6E8", padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>Want exact numbers for your plan?</div>
          <div style={{ fontSize: 13, opacity: 0.75, marginTop: 4 }}>Book a visit — we run eligibility through our HIPAA-compliant portal and email a written estimate before treatment.</div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a href="Contact.html" className="btn btn-coral">Book a visit →</a>
          <a href="tel:5551234386" className="btn btn-ghost" style={{ color: "#FFF6E8", borderColor: "#FFF6E8" }}>📞 Call us</a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cov-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .cov-grid { grid-template-columns: 1fr !important; }
          .tx-row { grid-template-columns: auto 1fr !important; row-gap: 6px; }
          .tx-row > div:nth-child(3), .tx-row > div:nth-child(4) { grid-column: 1 / -1; text-align: left !important; }
        }
      `}</style>
    </div>
  );
}

function Stat({ label, value, accent, hint }) {
  return (
    <div style={{ background: accent, border: "1px solid rgba(42,24,16,0.15)", borderRadius: 16, padding: 16 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 1.2, color: "#2A1810", opacity: 0.75 }}>{label.toUpperCase()}</div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, marginTop: 4, color: "#2A1810" }}>{value}</div>
      <div style={{ fontSize: 11, color: "#2A1810", opacity: 0.7, marginTop: 4 }}>{hint}</div>
    </div>
  );
}

// ============================================================
// TREATMENTS — standalone reference (without any plan)
// ============================================================
function TreatmentsSection() {
  const tiers = ["preventive", "basic", "major"];
  const grouped = useInsMemo(() => {
    return tiers.map((tier) => ({
      tier,
      label: tier === "preventive" ? "Preventive care" : tier === "basic" ? "Basic care" : "Major / specialty",
      desc: tier === "preventive"
        ? "Routine care that prevents future problems. Usually covered at 80-100% by every plan."
        : tier === "basic"
        ? "Fillings, extractions, sealants. Typically 60-80% covered after deductible."
        : "Crowns, sedation, pulpotomies. Typically 40-60% covered.",
      color: tier === "preventive" ? "#6FCFB2" : tier === "basic" ? "#F2C94C" : "#F4845F",
      items: TREATMENTS.filter((t) => t.tier === tier),
    }));
  }, []);

  return (
    <section id="treatments" style={{ background: "#FBEED4" }} data-screen-label="03 Treatments">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Treatment menu · billed fees</div>
          <h2>Every treatment, every price.</h2>
          <p>Posted fees, no carrier required. These are typical billed amounts before insurance — pick a plan above to see your estimated out-of-pocket.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {grouped.map((g) => (
            <div key={g.tier} style={{ background: "#fff", border: "2px solid #2A1810", borderRadius: 24, padding: 28, boxShadow: "6px 6px 0 #2A1810" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: g.color, border: "2px solid #2A1810", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>
                  {g.tier === "preventive" ? "✓" : g.tier === "basic" ? "🩹" : "✦"}
                </div>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <h3 style={{ fontSize: 24, margin: 0 }}>{g.label}</h3>
                  <div style={{ fontSize: 14, color: "#4a3326", marginTop: 4 }}>{g.desc}</div>
                </div>
              </div>

              <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }} className="tx-cards">
                {g.items.map((t) => (
                  <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#FBEED4", borderRadius: 12, gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                      <div style={{ fontSize: 11, color: "#7a3e22", fontFamily: "var(--font-mono)", marginTop: 2 }}>{t.code}</div>
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "#2A1810", whiteSpace: "nowrap" }}>
                      ${t.billed[0]}–${t.billed[1]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .tx-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// CUB CLUB — in-house membership (unchanged)
// ============================================================
function CubClub() {
  return (
    <section id="cubclub" data-screen-label="04 Cub Club membership">
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 40, alignItems: "center" }} >
        <div className="cub-text">
          <div className="eyebrow">For uninsured families</div>
          <h2 style={{ fontSize: "clamp(36px, 4.5vw, 56px)", marginTop: 12 }}>The Cub Club.</h2>
          <p style={{ marginTop: 16, fontSize: 17, color: "#4a3326", maxWidth: 520 }}>
            Skip the middleman. One flat yearly fee covers every preventive thing a cub needs — and discounts the rest.
          </p>
          <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="Contact.html" className="btn btn-coral">Sign up →</a>
            <a href="Contact.html" className="btn btn-ghost">See full benefit sheet</a>
          </div>
        </div>

        <div style={{ background: "#2A1810", borderRadius: 32, padding: 36, color: "#FFF6E8", border: "2px solid #2A1810", boxShadow: "10px 10px 0 #F4845F" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.6, opacity: 0.7 }}>CUB CLUB · ANNUAL</div>
              <div style={{ marginTop: 6, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 56, lineHeight: 1 }}>$249<span style={{ fontSize: 18, opacity: 0.6 }}> / child / yr</span></div>
              <div style={{ marginTop: 4, fontSize: 13, opacity: 0.7 }}>$199 for each additional sibling</div>
            </div>
            <div style={{ background: "#F4845F", color: "#2A1810", padding: "6px 12px", borderRadius: 999, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12 }}>SAVE ~40%</div>
          </div>
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
            {[
              "2 cleanings & 2 exams per year",
              "All X-rays (panoramic + bitewings)",
              "Fluoride treatments at each visit",
              "Emergency exam included (no copay)",
              "20% off fillings, sealants, sedation",
              "No deductibles, no annual max, no waiting period",
            ].map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#6FCFB2", color: "#2A1810", display: "grid", placeItems: "center", flexShrink: 0, fontSize: 12, fontWeight: 700 }}>✓</div>
                <div>{b}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section[data-screen-label="04 Cub Club membership"] .container { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// FAQ — money questions
// ============================================================
function InsuranceFAQ() {
  const faqs = [
    { q: "Why don't you ask for my member ID on this page?", a: "We don't need it to show you typical coverage. Member ID and date of birth are protected health info (PHI), and we only collect those over secure HIPAA-compliant channels — at the front desk or in our patient portal once you book." },
    { q: "Are these price ranges what I'll actually pay?", a: "The 'billed' numbers are real fees from our schedule. The 'your share' column is an estimate based on the carrier's typical coverage tier. Your specific plan year, frequency limits, and remaining annual max can change the final number — we always confirm in writing before treatment." },
    { q: "What if my child has secondary insurance?", a: "We coordinate benefits automatically. Primary plan is billed first, then the secondary picks up the rest — usually reducing your out-of-pocket to zero for preventive care." },
    { q: "Do you take Medicaid / CHIP?", a: "Yes. All three locations accept state Medicaid and CHIP dental. There is no copay for preventive visits. Bring your child's Medicaid card to the first appointment." },
    { q: "What if I'm between insurance plans?", a: "Sign up for the Cub Club month-to-month at $29/month, no commitment. Cancel anytime when your new plan kicks in." },
    { q: "Do you submit pre-authorization for sedation?", a: "Always. For nitrous, oral sedation, or hospital cases, we file pre-auth so you have the carrier's written estimate before the appointment is scheduled." },
    { q: "Can you bill my HSA / FSA?", a: "Yes. Bring the card or routing details and we'll process it at checkout." },
  ];

  return (
    <section style={{ background: "#FBEED4" }} data-screen-label="06 FAQ">
      <div className="container" style={{ maxWidth: 880 }}>
        <div className="section-head">
          <div className="eyebrow">Money questions</div>
          <h2>The stuff parents actually ask.</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((f, i) => (
            <details key={i} style={{ background: "#fff", borderRadius: 18, padding: 24, border: "1px solid rgba(42,24,16,0.1)" }}>
              <summary style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", gap: 12 }}>
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
// HOW IT WORKS
// ============================================================
function HowItWorks() {
  const steps = [
    { n: "01", t: "Pick your carrier above", d: "No personal info — just the plan name.", c: "#F4845F" },
    { n: "02", t: "See typical coverage", d: "Preventive / basic / major tiers, deductible, annual max.", c: "#6FCFB2" },
    { n: "03", t: "Check treatment prices", d: "Every code we bill, with your estimated share applied.", c: "#F2C94C" },
    { n: "04", t: "Book when ready", d: "We verify the exact numbers privately and email a written estimate.", c: "#A0522D" },
  ];

  return (
    <section data-screen-label="05 How it works">
      <div className="container">
        <div className="section-head" style={{ textAlign: "center", marginInline: "auto" }}>
          <div className="eyebrow">No surprises · No PHI on this page</div>
          <h2>How the lookup works.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="how-grid">
          {steps.map((s, i) => (
            <div key={i} style={{ background: "#fff", border: "2px solid #2A1810", borderRadius: 22, padding: 24, boxShadow: "6px 6px 0 #2A1810", position: "relative" }}>
              <div style={{ position: "absolute", top: -18, left: 18, padding: "4px 12px", background: s.c, borderRadius: 999, border: "2px solid #2A1810", fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, color: "#2A1810" }}>{s.n}</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19, marginTop: 8 }}>{s.t}</div>
              <div style={{ fontSize: 13, color: "#4a3326", marginTop: 8, lineHeight: 1.55 }}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1000px) {
          .how-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .how-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// PAGE
// ============================================================
function InsurancePage() {
  const onScrollChecker = () => {
    const el = document.getElementById("checker");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };
  return (
    <>
      <InsuranceHero onScrollChecker={onScrollChecker} />
      <PlanLookup />
      <TreatmentsSection />
      <HowItWorks />
      <CubClub />
      <InsuranceFAQ />
    </>
  );
}

Object.assign(window, { InsurancePage });

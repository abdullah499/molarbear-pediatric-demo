/* global React, BearMascot, DecideToolkit */
const { useState, useMemo, useEffect, useRef } = React;

const fmt = (n) => `$${Math.round(n).toLocaleString()}`;

// ============================================================
// HERO
// ============================================================
function PlanHero() {
  return (
    <section style={{ paddingTop: 56, paddingBottom: 36, position: "relative", overflow: "hidden" }} data-screen-label="01 Plan hero">
      <div style={{ position: "absolute", top: 80, left: -120, width: 360, height: 360, borderRadius: "50%", background: "#E8F6F0", filter: "blur(40px)", opacity: 0.8, pointerEvents: "none" }} />
      <div className="container plan-hero" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 48, alignItems: "center" }}>
        <div>
          <div className="eyebrow">Helping patients · 2 of 4</div>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 76px)", lineHeight: 0.98, marginTop: 14, letterSpacing: "-0.03em" }}>
            Decide, estimate, <span className="wavy">book.</span>
          </h1>
          <p style={{ marginTop: 22, fontSize: 19, maxWidth: 560, color: "#4a3326" }}>
            Two short steps before you set foot in the door. First we point you to the right starting visit. Then we price it out with your insurance and a payment plan, with no login and no spam.
          </p>
          <div style={{ marginTop: 26, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#finder" className="btn btn-coral">Start the finder ↓</a>
            <a href="#calculator" className="btn btn-ghost">Jump to calculator</a>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ background: "#F2C94C", borderRadius: 32, aspectRatio: "1/1", border: "3px solid #2A1810", boxShadow: "10px 10px 0 #2A1810", display: "grid", placeItems: "center", padding: 24 }}>
            <BearMascot pose="peek" size={260} />
          </div>
          <div style={{ position: "absolute", bottom: -16, left: -16, transform: "rotate(-6deg)" }}>
            <div className="sticker" style={{ background: "#6FCFB2" }}>💡 No login. No spam.</div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .plan-hero { grid-template-columns: 1fr !important; }
          .plan-hero > div:last-child { max-width: 320px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// STEP RAIL — 01 Find your fit · 02 Estimate the cost
// ============================================================
function StepRail({ activeStep, finderDone, onJump }) {
  const steps = [
    { n: "01", label: "Find your fit", sub: "A 4-question finder" },
    { n: "02", label: "Estimate the cost", sub: "Insurance + payment plans" },
  ];
  return (
    <div className="container" style={{ marginTop: 8, marginBottom: 8 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, background: "#fff", border: "2px solid #2A1810", borderRadius: 20, padding: 14, boxShadow: "5px 5px 0 #2A1810" }} className="rail-grid">
        {steps.map((s, i) => {
          const stepNo = i + 1;
          const active = activeStep === stepNo;
          const done = stepNo === 1 && finderDone;
          return (
            <button key={s.n} onClick={() => onJump(stepNo)} style={{
              textAlign: "left", cursor: "pointer", background: active ? "#FFF6E8" : "transparent",
              border: `2px solid ${active ? "#F4845F" : "rgba(42,24,16,0.12)"}`, borderRadius: 14,
              padding: "12px 16px", display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
                background: done ? "#6FCFB2" : active ? "#F4845F" : "#fff",
                border: "2px solid #2A1810", color: done || active ? "#fff" : "#2A1810",
                display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15,
              }}>{done ? "✓" : s.n}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "#2A1810" }}>{s.label}</div>
                <div style={{ fontSize: 12.5, color: "#7a3e22", fontFamily: "var(--font-mono)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.sub}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// PERSONALIZED TREATMENT FINDER
// ============================================================
const FINDER_STEPS = [
  {
    id: "age", title: "How old is your child?", sub: "We tailor the visit to your kid's stage.",
    options: [
      { value: "0-2", label: "0–2 years", emoji: "🍼", note: "First-tooth checkup" },
      { value: "3-5", label: "3–5 years", emoji: "🧸", note: "Building habits" },
      { value: "6-9", label: "6–9 years", emoji: "🚲", note: "Permanent molars" },
      { value: "10-13", label: "10–13 years", emoji: "🎒", note: "Pre-teen / ortho" },
      { value: "14-18", label: "14–18 years", emoji: "🎧", note: "Teen care" },
    ],
  },
  {
    id: "concern", title: "What's the main reason?", sub: "Pick the closest one. We'll figure the rest out together.",
    options: [
      { value: "routine", label: "Just due for a checkup", emoji: "🪥" },
      { value: "first", label: "First-ever dentist visit", emoji: "👋" },
      { value: "pain", label: "They're in pain right now", emoji: "🚨" },
      { value: "cavity", label: "Pretty sure there's a cavity", emoji: "🦷" },
      { value: "ortho", label: "Bite or alignment concern", emoji: "🦴" },
      { value: "anxiety", label: "Last visit didn't go well", emoji: "💛" },
    ],
  },
  {
    id: "urgency", title: "How soon do you need to be seen?", sub: "We hold same-day slots for pain. The rest is flexible.",
    options: [
      { value: "today", label: "Today, there's pain", emoji: "⚡" },
      { value: "week", label: "This week", emoji: "📅" },
      { value: "month", label: "Within a month", emoji: "🗓️" },
      { value: "flex", label: "Whenever works", emoji: "🌿" },
    ],
  },
  {
    id: "insurance", title: "Insurance situation?", sub: "We accept most major plans and offer a flat self-pay rate.",
    options: [
      { value: "ppo", label: "Have PPO dental", emoji: "🛡️" },
      { value: "hmo", label: "Have HMO / Medicaid / CHIP", emoji: "🏥" },
      { value: "none", label: "Paying out of pocket", emoji: "💵" },
      { value: "unsure", label: "Not sure", emoji: "🤔" },
    ],
  },
];

// A recommendation now also carries a `preset` for the calculator
// (item id -> qty, or id -> { qty, tier }) and the matching insurance id.
function recommend(answers) {
  const { concern, urgency, age, insurance } = answers;
  const ins = insurance === "ppo" ? "ppo" : insurance === "hmo" ? "hmo" : insurance === "none" ? "none" : "ppo";

  if (concern === "pain" || urgency === "today") {
    return {
      visit: "Same-day emergency visit", icon: "🚨", match: "Urgent care",
      blurb: "We'll get you in today. Expect a focused exam, an x-ray of the tooth in question, and a plan you walk out with.",
      duration: "~30 min",
      includes: ["Focused exam", "Targeted x-ray", "Pain relief plan", "Follow-up scheduled"],
      next: { label: "See emergency care", href: "Services.html#service-emerg" },
      preset: { newpatient: 1, xray: 1, filling: { qty: 1, tier: "comp2" } }, insurance: ins,
    };
  }
  if (concern === "first" || age === "0-2") {
    return {
      visit: "Happy First Visit", icon: "👋", match: "Gentle intro",
      blurb: "A meet-the-team visit. No pressure to do anything they're not ready for. The first goal is making it fun.",
      duration: "~25 min",
      includes: ["Office tour", "Sit-in-chair practice", "Knee-to-knee exam", "Brushing demo for caregivers"],
      next: { label: "Learn about first visits", href: "Services.html#service-first" },
      preset: { newpatient: 1, cleaning: 1 }, insurance: ins,
    };
  }
  if (concern === "cavity") {
    return {
      visit: "Cavity check + treatment plan", icon: "🦷", match: "Diagnose + fix",
      blurb: "Exam, targeted x-ray, and photos. If we confirm a cavity we walk you through filling vs. crown vs. watch-and-wait, with costs.",
      duration: "~40 min",
      includes: ["Exam + photos", "1–2 x-rays", "Filling/crown plan", "Same-day filling if simple"],
      next: { label: "Compare treatments", href: "Treatment-Journey.html#compare" },
      preset: { newpatient: 1, xray: 1, filling: { qty: 1, tier: "comp2" } }, insurance: ins,
    };
  }
  if (concern === "ortho") {
    return {
      visit: "Ortho readiness consult", icon: "🦴", match: "Plan ahead",
      blurb: "We check bite, spacing, and jaw growth, and tell you honestly if it's time for a referral or worth waiting six months.",
      duration: "~30 min",
      includes: ["Bite analysis", "Photos + measurements", "Referral if needed", "No upsell"],
      next: { label: "About ortho referrals", href: "Services.html#service-ortho" },
      preset: { newpatient: 1, xray: 1 }, insurance: ins,
    };
  }
  if (concern === "anxiety") {
    return {
      visit: "Confidence-rebuild visit", icon: "💛", match: "Take it slow",
      blurb: "We start with a tour, take it at their pace, and add laughing gas if they want to try it. Nothing happens without their nod.",
      duration: "~45 min",
      includes: ["Tour first", "Optional nitrous", "Doctor-led pacing", "Parent in room"],
      next: { label: "About sedation", href: "Services.html#service-sed" },
      preset: { newpatient: 1, cleaning: 1, nitrous: 1 }, insurance: ins,
    };
  }
  return {
    visit: "6-month wellness checkup", icon: "🪥", match: "Routine care",
    blurb: "Cleaning, fluoride, exam, and any sealants if their molars are ready. The standard half-year visit.",
    duration: "~45 min",
    includes: ["Cleaning + polish", "Fluoride varnish", "Full exam", "Sealants if indicated"],
    next: { label: "What's in a cleaning", href: "Services.html#service-clean" },
    preset: { newpatient: 1, cleaning: 1, xray: 1, sealant: 2 }, insurance: ins,
  };
}

function TreatmentFinder({ onComplete, onBookClick }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const totalSteps = FINDER_STEPS.length;
  const isDone = step >= totalSteps;
  const current = FINDER_STEPS[step] || FINDER_STEPS[0];
  const pct = (Math.min(step, totalSteps) / totalSteps) * 100;
  const rec = isDone ? recommend(answers) : null;

  useEffect(() => { if (isDone && rec && onComplete) onComplete(rec); }, [isDone]);

  const choose = (val) => {
    const next = { ...answers, [current.id]: val };
    setAnswers(next);
    setTimeout(() => setStep(step + 1), 180);
  };
  const reset = () => { setStep(0); setAnswers({}); if (onComplete) onComplete(null); };
  const back = () => setStep(Math.max(0, step - 1));

  return (
    <section id="finder" style={{ paddingTop: 40, paddingBottom: 40, background: "#fff" }} data-screen-label="02 Treatment finder">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Step 01 · Personalized treatment finder</div>
          <h2>Four questions. One clear next step.</h2>
        </div>

        <div style={{ background: "#FFF6E8", border: "3px solid #2A1810", borderRadius: 28, boxShadow: "8px 8px 0 #2A1810", overflow: "hidden", maxWidth: 880, marginInline: "auto" }}>
          {/* Progress bar */}
          <div style={{ background: "#FBEED4", padding: "14px 22px", borderBottom: "2px solid #2A1810", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: 1.4, textTransform: "uppercase", color: "#7a3e22", fontWeight: 700 }}>
              {isDone ? "Recommendation" : `Question ${step + 1} of ${totalSteps}`}
            </div>
            <div style={{ flex: 1, maxWidth: 360, height: 10, background: "#fff", borderRadius: 99, border: "2px solid #2A1810", overflow: "hidden" }}>
              <div style={{ width: `${isDone ? 100 : pct}%`, height: "100%", background: "#F4845F", transition: "width 0.3s" }} />
            </div>
            <button onClick={reset} style={{ background: "transparent", border: 0, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: 1, color: "#7a3e22", textTransform: "uppercase", fontWeight: 700, cursor: "pointer" }}>Reset</button>
          </div>

          <div style={{ padding: 32 }}>
            {!isDone && (
              <>
                <h3 style={{ fontSize: 30, fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>{current.title}</h3>
                <p style={{ marginTop: 8, color: "#4a3326", fontSize: 16 }}>{current.sub}</p>
                <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 12 }}>
                  {current.options.map((opt) => {
                    const selected = answers[current.id] === opt.value;
                    return (
                      <button key={opt.value} onClick={() => choose(opt.value)}
                        style={{
                          background: selected ? "#F4845F" : "#fff", color: selected ? "#fff" : "#2A1810",
                          border: "2.5px solid #2A1810", borderRadius: 18, padding: "18px 16px", textAlign: "left",
                          boxShadow: selected ? "0 5px 0 #2A1810" : "0 3px 0 #2A1810",
                          transition: "transform 0.1s, box-shadow 0.1s, background 0.1s", cursor: "pointer",
                          display: "flex", flexDirection: "column", gap: 8, minHeight: 96,
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 5px 0 #2A1810"; }}
                        onMouseOut={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = selected ? "0 5px 0 #2A1810" : "0 3px 0 #2A1810"; }}>
                        <div style={{ fontSize: 28, lineHeight: 1 }}>{opt.emoji}</div>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>{opt.label}</div>
                        {opt.note && <div style={{ fontSize: 12.5, opacity: 0.8, fontFamily: "var(--font-mono)" }}>{opt.note}</div>}
                      </button>
                    );
                  })}
                </div>
                {step > 0 && (
                  <button onClick={back} style={{ marginTop: 22, background: "transparent", border: 0, color: "#7a3e22", fontWeight: 700, fontFamily: "var(--font-display)", fontSize: 14, cursor: "pointer" }}>← Back</button>
                )}
              </>
            )}

            {isDone && rec && (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, alignItems: "center" }} className="rec-head">
                  <div style={{ fontSize: 64, background: "#FBEED4", border: "3px solid #2A1810", borderRadius: 20, width: 96, height: 96, display: "grid", placeItems: "center" }}>{rec.icon}</div>
                  <div>
                    <div className="eyebrow" style={{ marginBottom: 4 }}>Best fit · {rec.match}</div>
                    <h3 style={{ fontSize: 32, fontFamily: "var(--font-display)" }}>{rec.visit}</h3>
                    <div style={{ marginTop: 4, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: 1.4, textTransform: "uppercase", color: "#7a3e22", fontWeight: 700 }}>Duration: {rec.duration}</div>
                  </div>
                </div>
                <p style={{ marginTop: 20, fontSize: 18, color: "#2A1810", maxWidth: 640 }}>{rec.blurb}</p>

                <div style={{ marginTop: 20, background: "#fff", border: "2px solid #2A1810", borderRadius: 16, padding: "16px 20px" }}>
                  <div className="eyebrow">What's included</div>
                  <ul style={{ margin: "10px 0 0 0", padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }} className="rec-includes">
                    {rec.includes.map((i) => (
                      <li key={i} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 15, fontWeight: 500 }}>
                        <span style={{ color: "#6FCFB2", fontWeight: 900, fontSize: 18 }}>✓</span> {i}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <button onClick={onBookClick} className="btn btn-coral">Book this visit →</button>
                  <a href={rec.next.href} className="btn btn-ghost">{rec.next.label}</a>
                  <button onClick={reset} className="btn btn-ghost">Start over</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 600px) {
          .rec-head { grid-template-columns: 1fr !important; gap: 12px !important; }
          .rec-includes { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// HANDOFF BANNER — Finder result -> Calculator
// ============================================================
function HandoffBanner({ rec, onContinue }) {
  return (
    <div className="container" style={{ marginBottom: 8 }}>
      <div style={{ background: "#2A1810", color: "#FFF6E8", borderRadius: 24, padding: "28px 32px", display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 28, alignItems: "center", boxShadow: "8px 8px 0 #F4845F" }} className="handoff">
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.6, textTransform: "uppercase", color: "#F2C94C" }}>Handing off to step two</div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 32px)", marginTop: 10, color: "#FFF6E8", lineHeight: 1.1 }}>
            Your fit is <span style={{ color: "#F2C94C" }}>{rec.visit}</span>. Want to price it out?
          </h3>
          <p style={{ marginTop: 12, fontSize: 15, color: "rgba(255,246,232,0.78)", maxWidth: 520 }}>
            We'll pre-fill the calculator with this visit so you can adjust quantities, materials, insurance, and a payment plan. No email required.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button onClick={onContinue} className="btn btn-coral" style={{ width: "100%", justifyContent: "center" }}>Continue to estimate →</button>
          <a href="#calculator" onClick={onContinue} style={{ textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.2, textTransform: "uppercase", color: "rgba(255,246,232,0.62)" }}>Pre-filled and ready</a>
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) { .handoff { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

// ============================================================
// CUSTOM COST CALCULATOR
// ============================================================
const COST_ITEMS = [
  { id: "newpatient", label: "New-patient exam", emoji: "👋", base: 95, cov: { ppo: 1.0, hmo: 1.0, medicaid: 1.0, none: 0 } },
  { id: "cleaning", label: "Cleaning + fluoride", emoji: "🪥", base: 110, cov: { ppo: 1.0, hmo: 1.0, medicaid: 1.0, none: 0 } },
  { id: "xray", label: "Digital x-ray set", emoji: "🩻", base: 65, cov: { ppo: 0.9, hmo: 0.8, medicaid: 1.0, none: 0 } },
  { id: "sealant", label: "Sealant", emoji: "🛡️", base: 55, perUnit: true, max: 8, unit: "tooth", cov: { ppo: 0.9, hmo: 0.8, medicaid: 1.0, none: 0 } },
  {
    id: "filling", label: "Tooth-colored filling", emoji: "🦷", perUnit: true, max: 6, unit: "tooth", cov: { ppo: 0.7, hmo: 0.6, medicaid: 0.9, none: 0 },
    tiers: [{ value: "comp1", label: "1 surface", price: 180 }, { value: "comp2", label: "2+ surfaces", price: 260 }],
  },
  {
    id: "crown", label: "Crown", emoji: "👑", perUnit: true, max: 4, unit: "tooth", cov: { ppo: 0.6, hmo: 0.5, medicaid: 0.8, none: 0 },
    tiers: [{ value: "steel", label: "Stainless steel", price: 370 }, { value: "zir", label: "White zirconia", price: 520 }],
  },
  { id: "nitrous", label: "Laughing gas", emoji: "🌬️", base: 85, cov: { ppo: 0.3, hmo: 0.2, medicaid: 0.5, none: 0 } },
  { id: "extraction", label: "Simple extraction", emoji: "🪛", base: 180, perUnit: true, max: 4, unit: "tooth", cov: { ppo: 0.7, hmo: 0.6, medicaid: 0.9, none: 0 } },
];

const INSURANCE_OPTIONS = [
  { id: "ppo", label: "PPO dental", sub: "Delta, MetLife, Cigna, BCBS…" },
  { id: "hmo", label: "HMO dental", sub: "Aetna, United, Humana HMO…" },
  { id: "medicaid", label: "Medicaid / CHIP", sub: "State plan, fully covered" },
  { id: "none", label: "Self-pay", sub: "15% courtesy discount" },
];

const PAYMENT_PLANS = [
  { value: "full", label: "Pay in full", months: 1, apr: 0, discount: 0.05, note: "5% off, paid today" },
  { value: "split3", label: "3 payments", months: 3, apr: 0, discount: 0, note: "0% APR, no fees" },
  { value: "month6", label: "6 months", months: 6, apr: 0, discount: 0, note: "0% APR via CareCredit" },
  { value: "month12", label: "12 months", months: 12, apr: 0.06, discount: 0, note: "CareCredit · 6% APR" },
];

function itemUnitPrice(item, tier) {
  if (item.tiers) {
    const t = item.tiers.find((x) => x.value === tier) || item.tiers[0];
    return t.price;
  }
  return item.base;
}
function itemFromPrice(item) { return item.tiers ? item.tiers[0].price : item.base; }

// Normalize a finder preset ({id: qty} or {id:{qty,tier}}) into selected shape.
function normalizePreset(preset) {
  const out = {};
  Object.entries(preset || {}).forEach(([id, v]) => {
    const item = COST_ITEMS.find((x) => x.id === id);
    if (!item) return;
    const qty = typeof v === "number" ? v : v.qty;
    const tier = typeof v === "object" && v.tier ? v.tier : (item.tiers ? item.tiers[0].value : undefined);
    out[id] = { qty, tier };
  });
  return out;
}

function CostCalculator({ preset, presetToken, presetInsurance }) {
  const [insurance, setInsurance] = useState("ppo");
  const [selected, setSelected] = useState({ newpatient: { qty: 1 }, cleaning: { qty: 1 }, xray: { qty: 1 } });
  const [payment, setPayment] = useState("split3");

  // Apply Finder handoff preset.
  useEffect(() => {
    if (presetToken && preset) {
      setSelected(normalizePreset(preset));
      if (presetInsurance) setInsurance(presetInsurance);
    }
  }, [presetToken]);

  const isOn = (id) => !!selected[id];
  const toggle = (id) => {
    const item = COST_ITEMS.find((x) => x.id === id);
    setSelected((s) => {
      const next = { ...s };
      if (s[id]) delete next[id];
      else next[id] = { qty: 1, tier: item.tiers ? item.tiers[0].value : undefined };
      return next;
    });
  };
  const setQty = (id, n) => setSelected((s) => {
    const item = COST_ITEMS.find((x) => x.id === id);
    const max = item.max || 1;
    const clamped = Math.max(1, Math.min(max, n));
    return { ...s, [id]: { ...s[id], qty: clamped } };
  });
  const setTier = (id, tier) => setSelected((s) => ({ ...s, [id]: { ...s[id], tier } }));

  const { gross, covered, youBeforePlan } = useMemo(() => {
    let g = 0, c = 0;
    Object.entries(selected).forEach(([id, val]) => {
      const item = COST_ITEMS.find((x) => x.id === id);
      if (!item) return;
      const line = itemUnitPrice(item, val.tier) * (val.qty || 1);
      g += line;
      c += line * (item.cov[insurance] || 0);
    });
    let you = insurance === "none" ? g * 0.85 : g - c;
    return { gross: g, covered: c, youBeforePlan: Math.max(0, you) };
  }, [selected, insurance]);

  const plan = PAYMENT_PLANS.find((p) => p.value === payment);
  const afterDiscount = youBeforePlan * (1 - plan.discount);
  const total = afterDiscount * (1 + plan.apr);
  const monthly = plan.months > 1 ? total / plan.months : 0;
  const planAdjust = total - youBeforePlan; // negative = saving, positive = interest

  const lineCount = Object.keys(selected).length;

  return (
    <section id="calculator" style={{ paddingTop: 40, paddingBottom: 80 }} data-screen-label="03 Cost calculator">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Step 02 · Custom cost calculator</div>
          <h2>Estimate your visit before you book.</h2>
          <p>Pick your insurance, check what you might need, choose a payment plan. We update the total live. These are typical out-of-pocket ranges, verified in writing before the visit.</p>
        </div>

        <div className="cc-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 28, alignItems: "start" }}>
          {/* LEFT — builder */}
          <div style={{ background: "#fff", border: "3px solid #2A1810", borderRadius: 24, boxShadow: "8px 8px 0 #2A1810", overflow: "hidden" }}>
            {/* Insurance toggle */}
            <div style={{ padding: 22, borderBottom: "2px solid #2A1810", background: "#FBEED4" }}>
              <div className="eyebrow">Insurance</div>
              <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }} className="cc-ins-grid">
                {INSURANCE_OPTIONS.map((opt) => {
                  const sel = insurance === opt.id;
                  return (
                    <button key={opt.id} onClick={() => setInsurance(opt.id)}
                      style={{
                        background: sel ? "#2A1810" : "#fff", color: sel ? "#FFF6E8" : "#2A1810",
                        border: "2px solid #2A1810", borderRadius: 14, padding: "12px 14px", textAlign: "left", cursor: "pointer",
                      }}>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>{opt.label}</div>
                      <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>{opt.sub}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Items */}
            <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              {COST_ITEMS.map((item) => {
                const on = isOn(item.id);
                const sel = selected[item.id] || {};
                const unitPrice = itemUnitPrice(item, sel.tier);
                const lineTotal = unitPrice * (sel.qty || 1);
                const covPct = Math.round((item.cov[insurance] || 0) * 100);
                return (
                  <div key={item.id} style={{ borderRadius: 16, background: on ? "#FFF6E8" : "transparent", border: `2px solid ${on ? "#2A1810" : "transparent"}`, transition: "background 0.15s" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 14, alignItems: "center", padding: "12px 14px" }}>
                      <button onClick={() => toggle(item.id)} aria-label={on ? "Remove" : "Add"} style={{
                        width: 28, height: 28, borderRadius: 8, border: "2.5px solid #2A1810",
                        background: on ? "#F4845F" : "#fff", display: "grid", placeItems: "center", padding: 0, cursor: "pointer", flexShrink: 0,
                      }}>
                        {on && <span style={{ color: "#fff", fontWeight: 900, fontSize: 16, lineHeight: 1 }}>✓</span>}
                      </button>
                      <button onClick={() => toggle(item.id)} style={{ background: "transparent", border: 0, textAlign: "left", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 22 }}>{item.emoji}</span>
                        <span>
                          <div style={{ fontWeight: 700, fontSize: 15.5, fontFamily: "var(--font-display)" }}>{item.label}</div>
                          <div style={{ fontSize: 12.5, color: "#7a3e22", fontFamily: "var(--font-mono)" }}>From {fmt(itemFromPrice(item))}{item.perUnit ? " ea" : ""} · {covPct}% covered</div>
                        </span>
                      </button>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: "#2A1810", minWidth: 64, textAlign: "right" }}>
                        {on ? fmt(lineTotal) : <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: 1.4, textTransform: "uppercase", color: "#F4845F" }}>Add +</span>}
                      </div>
                    </div>

                    {/* Expansion: tiers + quantity */}
                    {on && (item.tiers || item.perUnit) && (
                      <div style={{ padding: "0 14px 16px 52px", display: "flex", flexDirection: "column", gap: 14 }}>
                        {item.tiers && (
                          <div>
                            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 1.4, textTransform: "uppercase", color: "#7a3e22", marginBottom: 8 }}>Option</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                              {item.tiers.map((tr) => {
                                const active = (sel.tier || item.tiers[0].value) === tr.value;
                                return (
                                  <button key={tr.value} onClick={() => setTier(item.id, tr.value)} style={{
                                    padding: "8px 14px", borderRadius: 999, border: `2px solid ${active ? "#F4845F" : "rgba(42,24,16,0.18)"}`,
                                    background: active ? "#F4845F" : "#fff", color: active ? "#fff" : "#2A1810",
                                    fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12.5, cursor: "pointer",
                                  }}>{tr.label} · {fmt(tr.price)}</button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        {item.perUnit && (
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 1.4, textTransform: "uppercase", color: "#7a3e22" }}>Quantity ({item.unit}{(sel.qty || 1) !== 1 ? "s" : ""})</div>
                              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "#F4845F" }}>{sel.qty || 1}</div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                              <button onClick={() => setQty(item.id, (sel.qty || 1) - 1)} style={{ width: 34, height: 34, borderRadius: 99, border: "2px solid #2A1810", background: "#FBEED4", fontWeight: 900, fontSize: 18, cursor: "pointer", padding: 0 }}>−</button>
                              <input type="range" min={1} max={item.max} value={sel.qty || 1} onChange={(e) => setQty(item.id, parseInt(e.target.value, 10))} style={{ flex: 1, accentColor: "#F4845F" }} />
                              <button onClick={() => setQty(item.id, (sel.qty || 1) + 1)} style={{ width: 34, height: 34, borderRadius: 99, border: "2px solid #2A1810", background: "#FBEED4", fontWeight: 900, fontSize: 18, cursor: "pointer", padding: 0 }}>+</button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT — summary */}
          <div className="cc-sticky" style={{ position: "sticky", top: 100, background: "#2A1810", color: "#FFF6E8", border: "3px solid #2A1810", borderRadius: 24, boxShadow: "8px 8px 0 #F4845F", overflow: "hidden" }}>
            <div style={{ padding: "22px 24px 18px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: 1.4, textTransform: "uppercase", color: "#F2C94C", fontWeight: 700 }}>Your estimate</div>
              {lineCount === 0 ? (
                <div style={{ padding: "40px 0", textAlign: "center", fontFamily: "var(--font-display)", fontSize: 20, color: "rgba(255,246,232,0.5)" }}>Check an item to begin.</div>
              ) : (
                <>
                  <div style={{ fontSize: 54, fontFamily: "var(--font-display)", fontWeight: 700, marginTop: 6, lineHeight: 1, color: "#F2C94C" }}>{fmt(total)}</div>
                  {monthly > 0 && (
                    <div style={{ marginTop: 8, fontSize: 14, color: "rgba(255,246,232,0.85)" }}>
                      about <strong style={{ fontFamily: "var(--font-display)" }}>{fmt(monthly)}/mo</strong> × {plan.months}
                    </div>
                  )}
                </>
              )}
            </div>

            {lineCount > 0 && (
              <>
                {/* Money breakdown */}
                <div style={{ padding: "18px 24px", display: "flex", flexDirection: "column", gap: 9, background: "rgba(255,246,232,0.05)", borderTop: "1px solid rgba(255,246,232,0.15)", borderBottom: "1px solid rgba(255,246,232,0.15)" }}>
                  <Row label="Treatment cost" value={fmt(gross)} />
                  {insurance !== "none" && <Row label="Insurance covers" value={`− ${fmt(covered)}`} />}
                  {insurance === "none" && <Row label="Self-pay courtesy 15%" value={`− ${fmt(gross * 0.15)}`} />}
                  <Row label="Your responsibility" value={fmt(youBeforePlan)} />
                  {plan.discount > 0 && <Row label="Paid-in-full 5% off" value={`− ${fmt(youBeforePlan * plan.discount)}`} />}
                  {plan.apr > 0 && <Row label={`Financing (${Math.round(plan.apr * 100)}% APR)`} value={`+ ${fmt(planAdjust)}`} />}
                  <div style={{ height: 1, background: "rgba(255,246,232,0.25)", margin: "4px 0" }} />
                  <Row label="Total" value={fmt(total)} bold />
                </div>

                {/* Payment plan selector */}
                <div style={{ padding: "18px 24px" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: 1.4, textTransform: "uppercase", color: "rgba(255,246,232,0.6)", marginBottom: 10 }}>Payment plan</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {PAYMENT_PLANS.map((p) => {
                      const active = payment === p.value;
                      return (
                        <button key={p.value} onClick={() => setPayment(p.value)} style={{
                          textAlign: "left", cursor: "pointer", padding: "11px 14px", borderRadius: 12,
                          border: `2px solid ${active ? "#F2C94C" : "rgba(255,246,232,0.18)"}`,
                          background: active ? "rgba(242,201,76,0.12)" : "transparent", color: "#FFF6E8",
                          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10,
                        }}>
                          <div>
                            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14 }}>{p.label}</div>
                            <div style={{ fontSize: 11.5, color: "rgba(255,246,232,0.6)", marginTop: 2, fontFamily: "var(--font-mono)" }}>{p.note}</div>
                          </div>
                          <span style={{ width: 16, height: 16, borderRadius: "50%", background: active ? "#F2C94C" : "transparent", border: "2px solid #F2C94C", flexShrink: 0 }} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ padding: "0 24px 22px" }}>
                  <div style={{ fontSize: 12.5, color: "rgba(255,246,232,0.62)", lineHeight: 1.5 }}>
                    We verify exact coverage before the visit. Financing through CareCredit, soft credit check only.
                  </div>
                  <a href="Contact.html" className="btn btn-coral" style={{ marginTop: 14, width: "100%", justifyContent: "center" }}>Lock in this visit →</a>
                  <a href="Insurance.html#checker" style={{ marginTop: 10, display: "block", textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.2, textTransform: "uppercase", color: "#F2C94C", fontWeight: 700 }}>Check my insurance →</a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 920px) {
          .cc-grid { grid-template-columns: 1fr !important; }
          .cc-sticky { position: static !important; }
          .cc-ins-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 460px) {
          .cc-ins-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function Row({ label, value, bold }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, fontSize: bold ? 19 : 14, fontWeight: bold ? 700 : 500, fontFamily: bold ? "var(--font-display)" : "var(--font-body)" }}>
      <span style={{ opacity: bold ? 1 : 0.92 }}>{label}</span>
      <span style={{ fontVariantNumeric: "tabular-nums", color: bold ? "#F2C94C" : "#FFF6E8" }}>{value}</span>
    </div>
  );
}

// ============================================================
// CTA
// ============================================================
function PlanCTA() {
  return (
    <section style={{ paddingTop: 40, paddingBottom: 40 }} data-screen-label="04 Plan CTA">
      <div className="container">
        <div style={{ background: "#6FCFB2", border: "3px solid #2A1810", borderRadius: 32, boxShadow: "10px 10px 0 #2A1810", padding: "44px 36px", display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center" }} className="pcta">
          <div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)" }}>Want to see real results before you book?</h2>
            <p style={{ marginTop: 10, fontSize: 17, color: "#1a3a31" }}>Browse before-and-after smiles or hear it straight from other parents.</p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="Smile-Gallery.html" className="btn btn-ink">Before & after →</a>
            <a href="Patient-Stories.html" className="btn" style={{ background: "#fff", color: "#2A1810", boxShadow: "0 4px 0 #2A1810" }}>Patient stories</a>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) { .pcta { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ============================================================
// PAGE — composes Finder -> handoff -> Calculator
// ============================================================
function PlanYourTreatmentPage({ onBookClick }) {
  const [finderRec, setFinderRec] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [preset, setPreset] = useState(null);
  const [presetToken, setPresetToken] = useState(0);
  const calcRef = useRef(null);

  const scrollTo = (el) => {
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const onContinue = (e) => {
    if (e) e.preventDefault();
    if (finderRec) {
      setPreset(finderRec.preset);
      setPresetToken((n) => n + 1);
    }
    setActiveStep(2);
    setTimeout(() => scrollTo(calcRef.current), 60);
  };

  const onJump = (stepNo) => {
    setActiveStep(stepNo);
    scrollTo(stepNo === 1 ? document.getElementById("finder") : calcRef.current);
  };

  return (
    <>
      <PlanHero />
      <StepRail activeStep={activeStep} finderDone={!!finderRec} onJump={onJump} />
      <TreatmentFinder onComplete={(rec) => { setFinderRec(rec); if (rec) setActiveStep(1); }} onBookClick={onBookClick} />
      {finderRec && <HandoffBanner rec={finderRec} onContinue={onContinue} />}
      <div ref={calcRef}>
        <CostCalculator preset={preset} presetToken={presetToken} presetInsurance={finderRec ? finderRec.insurance : null} />
      </div>
      <DecideToolkit currentTool="finder" />
      <PlanCTA />
    </>
  );
}

Object.assign(window, { PlanYourTreatmentPage });

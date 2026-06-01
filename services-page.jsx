/* global React, BearMascot */
const { useState, useEffect } = React;

// ============================================================
// SERVICES HERO
// ============================================================

function ServicesHero({ onBookClick }) {
  return (
    <section style={{ paddingTop: 60, paddingBottom: 60, position: "relative", overflow: "hidden" }} data-screen-label="01 Services hero">
      <div style={{ position: "absolute", top: 80, right: -80, width: 360, height: 360, borderRadius: "50%", background: "#FBEED4", filter: "blur(40px)", opacity: 0.6, pointerEvents: "none" }} />

      <div className="container services-hero-grid" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 48, alignItems: "center" }}>
        <div>
          <div className="eyebrow">Care menu</div>
          <h1 style={{ fontSize: "clamp(48px, 6vw, 84px)", lineHeight: 0.98, marginTop: 16, letterSpacing: "-0.03em" }}>
            Everything your kid's teeth need. <span className="wavy">In one warm office.</span>
          </h1>
          <p style={{ marginTop: 24, fontSize: 19, maxWidth: 580, color: "#4a3326" }}>
            Eight core services, fully covered by most insurance. Browse below — or just book a visit and we'll figure it out together.
          </p>
          <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn btn-coral" onClick={onBookClick} style={{ fontSize: 17, padding: "16px 26px" }}>Book a visit →</button>
            <a href="#service-first" className="btn btn-ghost">Explore services ↓</a>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div style={{ background: "#F4845F", borderRadius: 32, aspectRatio: "1/1", border: "3px solid #2A1810", boxShadow: "10px 10px 0 #2A1810", overflow: "hidden", position: "relative" }}>
            <image-slot id="services-hero" shape="rect" placeholder="Photo: dental kit / tools laid out neatly, or a kid in the chair" style={{ width: "100%", height: "100%" }}></image-slot>
          </div>
          <div style={{ position: "absolute", bottom: -16, left: -24, transform: "rotate(-6deg)" }}>
            <div className="sticker" style={{ background: "#6FCFB2" }}>🪥 8 services, 3 locations</div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .services-hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// SERVICES TOC — sticky horizontal nav
// ============================================================

function ServicesTOC() {
  const services = [
    { id: "first", label: "First visit" },
    { id: "clean", label: "Cleanings" },
    { id: "seal", label: "Sealants" },
    { id: "fill", label: "Fillings" },
    { id: "sed", label: "Sedation" },
    { id: "emerg", label: "Emergency" },
    { id: "ortho", label: "Orthodontics" },
    { id: "spec", label: "Special needs" },
  ];

  const [active, setActive] = useState("first");

  useEffect(() => {
    const onScroll = () => {
      // Find which service is currently in view
      for (let i = services.length - 1; i >= 0; i--) {
        const el = document.getElementById(`service-${services[i].id}`);
        if (el && el.getBoundingClientRect().top < 200) {
          setActive(services[i].id);
          return;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{
      position: "sticky", top: 80, zIndex: 30,
      background: "rgba(255,246,232,0.85)",
      backdropFilter: "blur(12px)",
      borderTop: "1px solid rgba(42,24,16,0.08)",
      borderBottom: "1px solid rgba(42,24,16,0.08)",
      padding: "12px 0",
    }}>
      <div className="container no-scrollbar" style={{ overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 6, minWidth: "max-content" }}>
          {services.map((s) => (
            <a key={s.id} href={`#service-${s.id}`} style={{
              padding: "8px 14px",
              borderRadius: 999,
              fontWeight: 600,
              fontSize: 14,
              color: active === s.id ? "#fff" : "#2A1810",
              background: active === s.id ? "#2A1810" : "transparent",
              whiteSpace: "nowrap",
              transition: "all 0.15s",
            }}>{s.label}</a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PER-SERVICE EXTRAS — process steps, outcome, FAQs
// keyed by service id (keeps the service objects lean)
// ============================================================
const SERVICE_EXTRAS = {
  first: {
    result: "A kid who isn't scared of visit two.",
    process: [
      ["Settle in", "Play-corner warm-up, no rushing. Your child meets the team at their own pace."],
      ["Tour the chair", "We show the mirror, the light, the 'water sprayer' — and let them press the buttons."],
      ["Knee-to-knee count", "Your child sits in your lap while we gently count teeth and brush on fluoride."],
      ["Plan + sticker", "Findings in plain words, every question answered, sticker and toothbrush on the way out."],
    ],
    faqs: [
      ["How early is too early?", "Per AAPD, by age 1 or within 6 months of the first tooth. The visit is short, friendly, and mostly about comfort."],
      ["Will my child have to lie back?", "Only if they want to. Most first exams happen in your lap, knee-to-knee. No pressure on day one."],
    ],
  },
  clean: {
    result: "Stops about 90% of future problems before they start.",
    process: [
      ["Soft polish", "Plaque and tartar removed gently — no sharp tools for kids under 6."],
      ["Fluoride varnish", "Painted on in 30 seconds. Your child picks the flavor."],
      ["Full pediatric exam", "Every tooth checked; low-dose digital x-rays only if clinically needed."],
      ["Written care plan", "A summary of anything we saw, with your next visit pre-booked."],
    ],
    faqs: [
      ["How often should my child come in?", "Every 6 months for most kids. We'll flag if your child needs a tighter schedule."],
      ["Are x-rays safe?", "We use low-dose digital x-rays and only when there's a clinical reason. We always explain why first."],
    ],
  },
  seal: {
    result: "Up to 80% fewer cavities on sealed molars.",
    process: [
      ["Clean + dry the tooth", "No anesthesia, no shots — completely painless."],
      ["Paint on the resin", "BPA-free coating brushed onto the chewing surface like nail polish."],
      ["Cure with a blue light", "A few seconds per tooth sets it hard."],
      ["Recheck every visit", "We touch up any wear before it fully wears off."],
    ],
    faqs: [
      ["When should molars be sealed?", "Right as the permanent 6- and 12-year molars come in, before decay has a chance to start."],
      ["Do sealants hurt?", "Not at all — there's no drilling and no numbing. Most kids are surprised it's already done."],
    ],
  },
  fill: {
    result: "A quiet, color-matched fix that lasts 7–10 years.",
    process: [
      ["Numb gently", "Strawberry topical gel first, so the tiny injection is barely felt. Nitrous if helpful."],
      ["Remove the decay", "We narrate every step in kid-friendly words and stop whenever they need a pause."],
      ["Place the composite", "Tooth-colored, BPA-free resin shaped to match the tooth exactly."],
      ["Polish + check the bite", "Smoothed and adjusted so it feels like nothing changed."],
    ],
    faqs: [
      ["Will it hurt?", "We numb thoroughly and check in constantly. Most kids feel pressure at most, never sharp pain."],
      ["Metal or white fillings?", "Always tooth-colored composite — no silver amalgam, no metal taste, blends right in."],
    ],
  },
  sed: {
    result: "A calm visit your child barely remembers.",
    process: [
      ["Pre-visit consult", "We talk through which tier fits, the expected effects, and recovery — by phone, before the day."],
      ["Choose the right tier", "Nitrous, oral sedation, or hospital GA, matched to age, anxiety, and the work needed."],
      ["Monitored throughout", "Vitals watched the whole time, with a parent in the room for nitrous and oral cases."],
      ["Gentle recovery", "Nitrous wears off in minutes; we send clear aftercare for the deeper options."],
    ],
    faqs: [
      ["Is sedation safe for kids?", "Yes, when done by trained providers with proper monitoring. Dr. Okafor is hospital-trained for our deeper cases."],
      ["Do you sedate by default?", "Never. We try weighted blankets, headphones, and tell-show-do first. Sedation is a tool, not a shortcut."],
    ],
  },
  emerg: {
    result: "Seen the same day, stabilized fast.",
    process: [
      ["Phone triage", "A trained team member assesses urgency in under 5 minutes when you call."],
      ["Same-day slot", "We hold emergency slots open at every location, every weekday."],
      ["Stabilize what's urgent", "We fix the immediate problem and ease the pain right away."],
      ["Plan the follow-up", "Any further care is scheduled calmly, never rushed in the moment."],
    ],
    faqs: [
      ["My kid knocked out a tooth — what now?", "If it's a permanent tooth, put it in milk and come straight in. Call us on the way and we'll be ready."],
      ["What about after hours?", "Our voicemail routes to the on-call dentist's mobile, returned within about 20 minutes."],
    ],
  },
  ortho: {
    result: "The right timing — never braces you don't need.",
    process: [
      ["Age-7 screening", "A quick bite, spacing, and jaw-growth check, included in a regular cleaning."],
      ["Photos + measurements", "We document so the orthodontist doesn't have to repeat x-rays."],
      ["Refer only if it's time", "If waiting six months is smarter, we'll tell you that honestly."],
      ["Keep cleaning through braces", "We care for teeth around brackets the whole way through."],
    ],
    faqs: [
      ["Do you do braces in-house?", "We don't — we screen and refer to three local orthodontists we've personally vetted for kids."],
      ["Isn't age 7 too early?", "It's a screening, not braces. Early screening catches issues that are far easier to guide than fix later."],
    ],
  },
  spec: {
    result: "Care built around your child, not the schedule.",
    process: [
      ["Pre-visit walkthrough", "Come tour the office any morning so the real visit feels familiar."],
      ["Sensory setup", "Dimmable lights, sound dampening, weighted blankets, and quiet equipment ready to go."],
      ["Every step narrated", "Tell-show-do pacing, with breaks whenever your child needs one."],
      ["Longer appointment", "Booked at 60–90 minutes so nothing is rushed."],
    ],
    faqs: [
      ["What conditions do you support?", "Autism, ADHD, sensory sensitivities, and medical complexity. Two of three locations have dedicated sensory rooms."],
      ["Can I tell you what works for my kid?", "Please do. Share what helps when you book and we build the visit around it, coordinating with OTs and your pediatrician."],
    ],
  },
};

// ============================================================
// SERVICE DETAIL — reusable section
// ============================================================

function ServiceDetail({ id, num, eyebrow, title, tagline, color, included, who, duration, costRange, image, reverse, onBookClick }) {
  const extra = SERVICE_EXTRAS[id] || {};
  return (
    <section id={`service-${id}`} style={{ padding: "80px 0", scrollMarginTop: 140 }} data-screen-label={`${num} ${eyebrow}`}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center", direction: reverse ? "rtl" : "ltr" }} className="service-grid">
          <div style={{ direction: "ltr" }}>
            <div style={{ background: color, aspectRatio: "4/5", borderRadius: 32, border: "3px solid #2A1810", boxShadow: "10px 10px 0 #2A1810", overflow: "hidden", position: "relative" }}>
              <image-slot id={`service-photo-${id}`} shape="rect" placeholder={image} style={{ width: "100%", height: "100%" }}></image-slot>
            </div>
          </div>

          <div style={{ direction: "ltr" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: color, display: "grid", placeItems: "center", border: "2px solid #2A1810", fontFamily: "var(--font-display)", fontWeight: 700 }}>{num}</div>
              <div className="eyebrow">{eyebrow}</div>
            </div>
            <h2 style={{ fontSize: "clamp(36px, 4.5vw, 56px)" }}>{title}</h2>
            <p style={{ fontSize: 19, color: "#4a3326", marginTop: 16, maxWidth: 540 }}>{tagline}</p>

            <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
              {included.map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 24, height: 24, borderRadius: 999, background: color, color: "#fff", display: "grid", placeItems: "center", fontSize: 13, fontWeight: 800, marginTop: 2, flexShrink: 0, border: "2px solid #2A1810" }}>✓</div>
                  <div style={{ fontSize: 15 }}><strong>{b.title}</strong> — {b.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              <div style={{ padding: 14, background: "#fff", borderRadius: 14, border: "1px solid rgba(42,24,16,0.1)" }}>
                <div className="eyebrow" style={{ fontSize: 10 }}>Who it's for</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginTop: 4 }}>{who}</div>
              </div>
              <div style={{ padding: 14, background: "#fff", borderRadius: 14, border: "1px solid rgba(42,24,16,0.1)" }}>
                <div className="eyebrow" style={{ fontSize: 10 }}>Time</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginTop: 4 }}>{duration}</div>
              </div>
              <div style={{ padding: 14, background: "#fff", borderRadius: 14, border: "1px solid rgba(42,24,16,0.1)" }}>
                <div className="eyebrow" style={{ fontSize: 10 }}>Typical cost</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginTop: 4 }}>{costRange}</div>
              </div>
            </div>

            <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={onBookClick} className="btn btn-coral">Book this →</button>
              <a href="Insurance.html" className="btn btn-ghost">Check coverage</a>
            </div>
          </div>
        </div>

        {/* How it works + outcome + FAQs */}
        {(extra.process || extra.faqs) && (
          <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }} className="svc-extras">
            {/* Process */}
            {extra.process && (
              <div>
                <div className="eyebrow">How it works</div>
                <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 14 }}>
                  {extra.process.map(([label, desc], i) => (
                    <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, background: color, color: "#2A1810", border: "2px solid #2A1810", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>{i + 1}</div>
                      <div>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16.5 }}>{label}</div>
                        <div style={{ fontSize: 14, color: "#4a3326", marginTop: 4, lineHeight: 1.5 }}>{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {extra.result && (
                  <div style={{ marginTop: 20, padding: "16px 20px", background: "#FBEED4", border: "2px solid #2A1810", borderRadius: 16, display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 22, lineHeight: 1 }}>🎯</span>
                    <div><strong style={{ fontFamily: "var(--font-display)" }}>What success looks like:</strong> {extra.result}</div>
                  </div>
                )}
              </div>
            )}

            {/* FAQ */}
            {extra.faqs && (
              <div>
                <div className="eyebrow">Good to know</div>
                <h3 style={{ fontSize: 24, marginTop: 8, marginBottom: 14 }}>Common questions</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {extra.faqs.map(([q, a], i) => (
                    <details key={i} style={{ background: "#fff", borderRadius: 16, padding: "18px 20px", border: "2px solid rgba(42,24,16,0.1)" }}>
                      <summary style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16.5, cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                        {q}
                        <span style={{ fontSize: 22, color: "#F4845F", flexShrink: 0 }}>+</span>
                      </summary>
                      <p style={{ marginTop: 12, fontSize: 14.5, color: "#4a3326", lineHeight: 1.6 }}>{a}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .service-grid { grid-template-columns: 1fr !important; direction: ltr !important; }
          .svc-extras { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// SERVICES PAGE — composed
// ============================================================

function ServicesPage({ onBookClick }) {
  const services = [
    {
      id: "first", num: "01", eyebrow: "FIRST VISIT (AGES 1-4)",
      title: "The very first checkup, done gently.",
      tagline: "Following the American Academy of Pediatric Dentistry: first tooth, first visit. No drills, no scary words — just a friendly hello.",
      color: "#F4845F",
      included: [
        { title: "Knee-to-knee exam", desc: "Your child sits in your lap while we count teeth together." },
        { title: "Fluoride varnish", desc: "Painless, applied with a tiny brush. Strawberry or bubblegum." },
        { title: "Brushing coaching", desc: "We show you and them the right technique for tiny mouths." },
        { title: "Take-home pack", desc: "Sticker, toothbrush, brushing chart, bravery badge." },
      ],
      who: "Ages 1-4", duration: "20-30 min", costRange: "Free with most plans",
      image: "Photo: parent + toddler at first visit",
    },
    {
      id: "clean", num: "02", eyebrow: "CLEANINGS & EXAMS",
      title: "Every six months. Every tooth. Every time.",
      tagline: "The cornerstone of pediatric dentistry. Twice-yearly cleanings stop 90% of future problems before they start.",
      color: "#6FCFB2",
      included: [
        { title: "Gentle scaling + polish", desc: "Plaque and tartar removed without sharp tools for kids under 6." },
        { title: "Fluoride treatment", desc: "Choose your flavor — bubblegum, strawberry, mint, or cotton candy." },
        { title: "Full exam by a pediatric dentist", desc: "Every tooth checked, x-rays if needed (digital, low-dose)." },
        { title: "Personalized care plan", desc: "Written summary of any issues + your next visit pre-booked." },
      ],
      who: "All ages", duration: "45 min", costRange: "$0 – $25 with insurance",
      image: "Photo: hygienist working with a smiling kid",
    },
    {
      id: "seal", num: "03", eyebrow: "SEALANTS",
      title: "Cavity prevention that lasts up to 10 years.",
      tagline: "A thin protective coating painted onto chewing surfaces of back molars. Painless, quick, and proven to prevent 80% of cavities in those teeth.",
      color: "#F2C94C",
      included: [
        { title: "Tooth cleaned + dried", desc: "No anesthesia, no shots — completely painless." },
        { title: "BPA-free resin applied", desc: "Brushed on like nail polish, cured with a small blue light." },
        { title: "Done in 30 minutes for 4 teeth", desc: "Most kids finish all four molars in one visit." },
        { title: "Recheck at every cleaning", desc: "We touch up if any wear before they fully wear off." },
      ],
      who: "Ages 6-14, when permanent molars erupt", duration: "30 min", costRange: "$0 – $20 per tooth",
      image: "Photo: dental sealant being applied",
    },
    {
      id: "fill", num: "04", eyebrow: "FILLINGS & RESTORATIONS",
      title: "If a cavity does happen — we go slow.",
      tagline: "Tooth-colored composite fillings (no metal). Numbing gel before any shot. We narrate everything in kid-friendly language.",
      color: "#A0522D",
      included: [
        { title: "Pre-visit conversation", desc: "We explain what's happening to your child in age-appropriate words." },
        { title: "Topical numbing first", desc: "Strawberry gel for 60 seconds — the actual injection is barely noticed." },
        { title: "Tooth-matched composite", desc: "White, BPA-free, blends in completely. Lasts 7-10 years." },
        { title: "Optional nitrous", desc: "Laughing gas available if your child is especially anxious." },
      ],
      who: "Ages 4+ (younger needs special approach)", duration: "45-60 min", costRange: "$25 – $90 with insurance",
      image: "Photo: dental room with friendly setup",
    },
    {
      id: "sed", num: "05", eyebrow: "SEDATION DENTISTRY",
      title: "For kids who need a little extra help.",
      tagline: "Three tiers of sedation — picked based on your child's age, anxiety, and treatment needs. Always with a parent in the room.",
      color: "#F4845F",
      included: [
        { title: "Nitrous oxide (laughing gas)", desc: "Mildest option. Kid stays awake but relaxed. Wears off in minutes." },
        { title: "Oral conscious sedation", desc: "A liquid med 30 min before the visit. Drowsy but responsive." },
        { title: "Hospital general anesthesia", desc: "For complex cases or kids under 4 needing extensive work. Coordinated with Children's Memorial." },
        { title: "Pre-visit phone consult", desc: "We talk through which option fits, expected effects, and recovery." },
      ],
      who: "All ages with anxiety or special needs", duration: "Varies by tier", costRange: "Covered by most plans for medical necessity",
      image: "Photo: peaceful sedation setup room",
    },
    {
      id: "emerg", num: "06", eyebrow: "EMERGENCY CARE",
      title: "Same-day. Every weekday.",
      tagline: "Knocked-out tooth, broken filling, swelling, bleeding that won't stop — call us first. We hold same-day slots open at every location.",
      color: "#6FCFB2",
      included: [
        { title: "Phone triage in <5 minutes", desc: "A trained team member assesses urgency on the call." },
        { title: "Same-day in-clinic slot", desc: "Every weekday, 2 emergency slots reserved at each location." },
        { title: "After-hours on-call", desc: "Voicemail directs to the on-call dentist's cell phone." },
        { title: "Quick stabilization", desc: "We fix what's urgent now, plan follow-up care for later." },
      ],
      who: "All ages", duration: "Same-day", costRange: "Varies — quoted before treatment",
      image: "Photo: phone call / emergency reception",
    },
    {
      id: "ortho", num: "07", eyebrow: "ORTHODONTIC REFERRALS",
      title: "Early screening from age 7.",
      tagline: "We don't do braces in-house, but we screen every kid starting at age 7 (per AAPD guidelines) and refer to one of three trusted local orthodontists.",
      color: "#F2C94C",
      included: [
        { title: "Age-7 orthodontic screening", desc: "Quick assessment for bite, crowding, jaw alignment — included in every cleaning." },
        { title: "Coordinated referral", desc: "We share records directly so you don't re-do x-rays." },
        { title: "Three vetted local orthos", desc: "We've personally vetted each one for kid-friendliness and pricing." },
        { title: "Continued cleanings during braces", desc: "We keep cleaning teeth around brackets — easier than it sounds." },
      ],
      who: "Ages 7+", duration: "Screening: 5 min during cleaning", costRange: "Screening is free",
      image: "Photo: kid with braces smiling",
    },
    {
      id: "spec", num: "08", eyebrow: "SPECIAL NEEDS CARE",
      title: "Sensory-friendly. Always.",
      tagline: "Two of our three locations have dedicated sensory rooms. All our providers are trained in adaptive techniques for kids with autism, ADHD, sensory sensitivities, or medical complexity.",
      color: "#A0522D",
      included: [
        { title: "Sensory-friendly rooms", desc: "Dimmable lights, sound dampening, weighted blankets available." },
        { title: "Longer appointments", desc: "Booked at 60-90 min instead of 30-45 — no rushing." },
        { title: "Pre-visit walkthroughs", desc: "Come in any morning to tour the office before the actual visit." },
        { title: "Coordinated with care team", desc: "We work with OTs, behavioral specialists, and pediatricians directly." },
      ],
      who: "Any child needing extra support", duration: "60-90 min", costRange: "Same as standard care",
      image: "Photo: calm sensory-friendly treatment room",
    },
  ];

  return (
    <>
      <ServicesHero onBookClick={onBookClick} />
      <ServicesTOC />
      {services.map((s, i) => (
        <ServiceDetail key={s.id} {...s} reverse={i % 2 === 1} onBookClick={onBookClick} />
      ))}
      <ServicesCompare />
    </>
  );
}

// ============================================================
// COMPARE TABLE — services x ages
// ============================================================

function ServicesCompare() {
  const ages = ["0-2", "3-5", "6-10", "11-14", "15-18"];
  const matrix = [
    { service: "First visit", values: ["✓", "—", "—", "—", "—"] },
    { service: "Cleanings & exams", values: ["✓", "✓", "✓", "✓", "✓"] },
    { service: "Fluoride treatment", values: ["✓", "✓", "✓", "✓", "✓"] },
    { service: "Sealants", values: ["—", "—", "✓", "✓", "✓"] },
    { service: "Fillings", values: ["—", "✓", "✓", "✓", "✓"] },
    { service: "Sedation", values: ["✓*", "✓", "✓", "✓", "✓"] },
    { service: "Emergency care", values: ["✓", "✓", "✓", "✓", "✓"] },
    { service: "Ortho screening", values: ["—", "—", "✓", "✓", "✓"] },
    { service: "Special needs support", values: ["✓", "✓", "✓", "✓", "✓"] },
  ];

  return (
    <section style={{ background: "#FBEED4" }} data-screen-label="10 Services at a glance">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">At a glance</div>
          <h2>Which services apply to your kid's age?</h2>
        </div>

        <div style={{ overflowX: "auto" }} className="no-scrollbar">
          <table style={{
            width: "100%", minWidth: 720, borderCollapse: "separate", borderSpacing: 0,
            background: "#fff", borderRadius: 20, overflow: "hidden",
            border: "2px solid #2A1810",
          }}>
            <thead>
              <tr style={{ background: "#2A1810", color: "#FFF6E8" }}>
                <th style={{ textAlign: "left", padding: 20, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16 }}>Service</th>
                {ages.map((a) => (
                  <th key={a} style={{ textAlign: "center", padding: 20, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, whiteSpace: "nowrap" }}>Ages {a}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, i) => (
                <tr key={i} style={{ borderTop: i > 0 ? "1px solid rgba(42,24,16,0.08)" : "0" }}>
                  <td style={{ padding: 20, fontWeight: 700, fontSize: 15, borderTop: i > 0 ? "1px solid rgba(42,24,16,0.08)" : "0" }}>{row.service}</td>
                  {row.values.map((v, j) => (
                    <td key={j} style={{
                      textAlign: "center", padding: 20, fontSize: 18, fontWeight: 800,
                      color: v === "✓" || v === "✓*" ? "#4ea98e" : "rgba(42,24,16,0.25)",
                      borderTop: i > 0 ? "1px solid rgba(42,24,16,0.08)" : "0",
                    }}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 14, fontSize: 13, color: "#7a3e22" }}>* Sedation for infants is hospital-based GA only, used rarely and for medical necessity.</div>
      </div>
    </section>
  );
}

Object.assign(window, { ServicesPage });

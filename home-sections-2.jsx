/* global React, BearMascot */
const { useState, useEffect, useRef } = React;

// ============================================================
// FIRST VISIT — what to expect (step-by-step)
// ============================================================

function FirstVisit() {
  const steps = [
    { num: "1", title: "Walk in to the den", desc: "Cozy waiting room with a play corner, picture books, and zero waiting-room TV. Parents check in on an iPad while kids meet Mol.", time: "0 min" },
    { num: "2", title: "Tour your treatment room", desc: "A friendly hygienist shows your kid the chair, the 'tooth counter' (mirror), and the 'water sprayer.' We let them sit if they want — no pressure.", time: "5 min" },
    { num: "3", title: "Count those teeth", desc: "Gentle exam. Parents stay in the room (always). We count, brush, polish, and apply fluoride varnish — pick the flavor.", time: "10 min" },
    { num: "4", title: "Talk to the dentist", desc: "Your provider reviews findings with you in plain English, answers every question, and recommends next steps if needed.", time: "20 min" },
    { num: "5", title: "Sticker time + reschedule", desc: "Every kid leaves with a sticker, a brand-new brush, and a high-five. We text you next visit options before you leave the parking lot.", time: "30 min" },
  ];

  return (
    <section data-screen-label="07 First visit">
      <div className="container">
        <div className="section-head" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32, alignItems: "end", maxWidth: "100%" }}>
          <div>
            <div className="eyebrow">What to expect</div>
            <h2>Your first visit, end to end.</h2>
          </div>
          <p style={{ color: "#4a3326", fontSize: 17 }}>
            New office anxiety is real — for parents AND kids. Here's exactly what happens, from the front door to the parking lot. Plan on about 30 minutes.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, position: "relative" }} className="visit-grid">
          {/* Connecting line */}
          <div style={{ position: "absolute", top: 36, left: 28, right: 28, height: 3, borderTop: "3px dashed #A0522D", zIndex: 0 }} />

          {steps.map((s) => (
            <div key={s.num} style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: "#F4845F", color: "#fff",
                fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 32,
                display: "grid", placeItems: "center",
                border: "3px solid #2A1810",
                boxShadow: "4px 4px 0 #2A1810",
              }}>{s.num}</div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#7a3e22", textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>+ {s.time}</div>
                <h4 style={{ fontSize: 18, marginTop: 6 }}>{s.title}</h4>
                <p style={{ fontSize: 14, color: "#4a3326", marginTop: 8 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 900px) {
            .visit-grid { grid-template-columns: 1fr !important; }
            .visit-grid > div > div:first-child { width: 60px; height: 60px; font-size: 26px; }
          }
        `}</style>
      </div>
    </section>
  );
}

// ============================================================
// REVIEWS CAROUSEL
// ============================================================

function Reviews() {
  const reviews = [
    { name: "Priya M.", initial: "P", color: "#F4845F", date: "2 weeks ago", source: "Google", stars: 5, text: "My 4yo was terrified of dentists. Dr. Park gave her time, let her hold the mirror herself, and turned a 30-min exam into the highlight of her week. We left with a sticker AND a confident kid." },
    { name: "Marcus T.", initial: "M", color: "#6FCFB2", date: "1 month ago", source: "Google", stars: 5, text: "Booked online at 11pm, had a confirmed slot for the next morning. Insurance was verified before we arrived. No paperwork in the lobby. This is what every healthcare visit should feel like." },
    { name: "Eleanor S.", initial: "E", color: "#F2C94C", date: "1 month ago", source: "Yelp", stars: 5, text: "Dr. Solano is a wizard with anxious toddlers. He sat on the floor with my 2yo for 10 minutes before even touching her. We've been to 3 other peds dentists — this is the one." },
    { name: "Jamal K.", initial: "J", color: "#A0522D", date: "2 months ago", source: "Google", stars: 5, text: "My son has autism and previous dental visits were nightmares. Molar Bear has a sensory room. They turned down the lights, gave him noise-canceling headphones, and let him bring his iPad. Game changer." },
    { name: "Sophia L.", initial: "S", color: "#F4845F", date: "3 months ago", source: "Google", stars: 5, text: "The SMS reminders are GENIUS. I forgot we had an appointment until the text came at 4pm the day before. One tap to confirm. Same thing for rescheduling when my kid got sick." },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % reviews.length), 6000);
    return () => clearInterval(id);
  }, [reviews.length]);

  return (
    <section id="reviews" style={{ background: "#6FCFB2", color: "#2A1810" }} data-screen-label="08 Reviews">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 56, alignItems: "center" }} className="reviews-grid">
          <div>
            <div className="eyebrow">What parents say</div>
            <h2 style={{ fontSize: "clamp(36px, 4.5vw, 56px)", marginTop: 12 }}>4.9 stars across 2,800+ reviews.</h2>
            <p style={{ marginTop: 16, fontSize: 17, color: "#1a3a30" }}>We text every parent after their visit asking how it went. Honest, unfiltered, public.</p>

            <div style={{ marginTop: 32, display: "flex", gap: 24, flexWrap: "wrap" }}>
              {[
                { src: "Google", count: "1,940", stars: "4.9" },
                { src: "Yelp", count: "640", stars: "4.8" },
                { src: "Healthgrades", count: "220", stars: "5.0" },
              ].map((s) => (
                <div key={s.src} style={{ background: "#FFF6E8", border: "2px solid #2A1810", padding: "14px 18px", borderRadius: 16 }}>
                  <div style={{ fontWeight: 800, fontSize: 22 }}>{s.stars} ★</div>
                  <div style={{ fontSize: 12, marginTop: 2 }}>{s.count} on {s.src}</div>
                </div>
              ))}
            </div>
            <a href="Reviews.html" className="btn btn-ink" style={{ marginTop: 28 }}>Read all reviews →</a>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -16, left: -8, transform: "rotate(-4deg)", zIndex: 2 }}>
              <div className="sticker" style={{ background: "#F2C94C" }}>★ Verified ★ Real ★ Recent</div>
            </div>

            {/* Carousel */}
            <div style={{ position: "relative", height: 320 }}>
              {reviews.map((r, i) => (
                <div key={i} style={{
                  position: "absolute", inset: 0,
                  background: "#FFF6E8",
                  border: "3px solid #2A1810",
                  borderRadius: 24,
                  padding: 28,
                  boxShadow: "8px 8px 0 #2A1810",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  opacity: active === i ? 1 : 0,
                  transform: active === i ? "translateY(0)" : "translateY(10px)",
                  transition: "opacity 0.4s, transform 0.4s",
                  pointerEvents: active === i ? "auto" : "none",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: r.color, color: "#fff", fontWeight: 800, fontSize: 20, display: "grid", placeItems: "center" }}>{r.initial}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800 }}>{r.name}</div>
                      <div style={{ fontSize: 12, color: "#7a3e22" }}>{r.date} · via {r.source}</div>
                    </div>
                    <div style={{ display: "flex", gap: 1 }}>
                      {[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= r.stars ? "#F2C94C" : "rgba(0,0,0,0.1)" }}>★</span>)}
                    </div>
                  </div>
                  <p style={{ fontSize: 17, lineHeight: 1.5, fontWeight: 500, flex: 1 }}>"{r.text}"</p>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 24 }}>
              {reviews.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} aria-label={`Review ${i + 1}`} style={{
                  width: active === i ? 28 : 10, height: 10,
                  borderRadius: 999,
                  background: active === i ? "#2A1810" : "rgba(42,24,16,0.25)",
                  border: 0, padding: 0, cursor: "pointer",
                  transition: "width 0.2s, background 0.2s",
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .reviews-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// LOCATIONS — one-click directions
// ============================================================

function Locations() {
  const locations = [
    { id: "downtown", name: "Downtown Den", addr: "148 Maple Row · Suite 200", city: "Riverside, IL 60546", hours: "Mon-Fri 8a-6p · Sat 9a-2p", phone: "(555) 123-CHEW", color: "#F4845F" },
    { id: "westside", name: "Westside Cave", addr: "3201 Birch Ave", city: "Riverside, IL 60546", hours: "Mon-Thu 9a-5p · Fri 8a-3p", phone: "(555) 123-2433", color: "#6FCFB2" },
    { id: "northside", name: "Northside Lodge", addr: "8 Pinecone Plaza", city: "Riverside, IL 60546", hours: "Tue-Fri 10a-6p · Sat 9a-2p", phone: "(555) 123-7676", color: "#F2C94C" },
  ];

  const [active, setActive] = useState("downtown");
  const current = locations.find(l => l.id === active);

  return (
    <section id="contact" data-screen-label="09 Locations">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Visit us</div>
          <h2>Three dens. Same warm welcome.</h2>
          <p>Each location is fully equipped with sensory rooms, sedation capability, and free parking. Tap any one for one-click directions.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }} className="locations-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {locations.map((l) => (
              <button key={l.id} onClick={() => setActive(l.id)} style={{
                background: active === l.id ? l.color : "#fff",
                border: active === l.id ? "2px solid #2A1810" : "2px solid rgba(42,24,16,0.1)",
                borderRadius: 20,
                padding: 24,
                textAlign: "left",
                cursor: "pointer",
                transition: "transform 0.15s",
                fontFamily: "inherit",
                boxShadow: active === l.id ? "4px 4px 0 #2A1810" : "none",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20 }}>{l.name}</div>
                    <div style={{ fontSize: 14, marginTop: 4, color: active === l.id ? "#2A1810" : "#4a3326" }}>{l.addr}</div>
                    <div style={{ fontSize: 14, color: active === l.id ? "#2A1810" : "#4a3326" }}>{l.city}</div>
                  </div>
                  <div style={{ fontSize: 24 }}>📍</div>
                </div>
                <div style={{ marginTop: 12, fontSize: 13, color: active === l.id ? "#2A1810" : "#7a3e22", fontWeight: 600 }}>{l.hours}</div>
              </button>
            ))}
          </div>

          {/* Map placeholder */}
          <div style={{
            background: "#FBEED4",
            border: "2px solid #2A1810",
            borderRadius: 24,
            minHeight: 440,
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Cartoon map */}
            <svg viewBox="0 0 600 440" width="100%" height="100%" style={{ display: "block" }}>
              {/* Background streets */}
              <rect x="0" y="0" width="600" height="440" fill="#FBEED4" />
              {/* Park / blob */}
              <ellipse cx="120" cy="120" rx="80" ry="60" fill="#6FCFB2" opacity="0.4" />
              <ellipse cx="480" cy="320" rx="100" ry="70" fill="#6FCFB2" opacity="0.3" />
              {/* Streets */}
              <line x1="0" y1="180" x2="600" y2="180" stroke="#fff" strokeWidth="14" />
              <line x1="0" y1="300" x2="600" y2="300" stroke="#fff" strokeWidth="10" />
              <line x1="220" y1="0" x2="220" y2="440" stroke="#fff" strokeWidth="14" />
              <line x1="420" y1="0" x2="420" y2="440" stroke="#fff" strokeWidth="10" />

              {/* Pins */}
              {[
                { x: 220, y: 180, id: "downtown", color: "#F4845F" },
                { x: 420, y: 300, id: "westside", color: "#6FCFB2" },
                { x: 220, y: 300, id: "northside", color: "#F2C94C" },
              ].map((p) => (
                <g key={p.id} onClick={() => setActive(p.id)} style={{ cursor: "pointer" }}>
                  <path d={`M ${p.x} ${p.y - 30} a 18 18 0 1 1 0 36 L ${p.x - 12} ${p.y + 24} L ${p.x} ${p.y + 40} L ${p.x + 12} ${p.y + 24} L ${p.x} ${p.y + 6} z`}
                    fill={p.color} stroke="#2A1810" strokeWidth={active === p.id ? "4" : "3"} />
                  <circle cx={p.x} cy={p.y - 12} r="6" fill="#FFF6E8" />
                </g>
              ))}
            </svg>

            {/* Bottom info card */}
            <div style={{ position: "absolute", bottom: 20, left: 20, right: 20, background: "#fff", border: "2px solid #2A1810", borderRadius: 16, padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18 }}>{current.name}</div>
                <div style={{ fontSize: 14, color: "#4a3326", marginTop: 2 }}>{current.addr} · {current.city}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <a href={`tel:${current.phone.replace(/[^\d]/g, "")}`} className="btn btn-sm btn-mint">📞 Call</a>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(current.addr + " " + current.city)}`} target="_blank" rel="noreferrer" className="btn btn-sm btn-coral">🚗 Directions</a>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .locations-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

// ============================================================
// FAQ
// ============================================================

function FAQ() {
  const faqs = [
    { q: "At what age should my child first see a dentist?", a: "We follow the American Academy of Pediatric Dentistry guideline: by age 1, or within 6 months of the first tooth erupting. The first visit is brief, friendly, and mostly about getting your child comfortable. Parents stay in the room the whole time." },
    { q: "Do you accept my insurance?", a: "We're in-network with 15+ major plans including Delta Dental, Aetna, Cigna, MetLife, Guardian, Anthem BCBS, United Healthcare, plus Medicaid and CHIP in Illinois. Use our Insurance Checker above to verify coverage and get an estimate before booking." },
    { q: "What if my child is really anxious?", a: "We've got you. Every room has a ceiling TV, weighted blankets, and noise-canceling headphones. We offer nitrous oxide (laughing gas) for kids 4+, oral conscious sedation, and hospital-based general anesthesia for complex cases. Dr. Park specializes in 'first-visit success' for anxious kids." },
    { q: "Will the visit hurt?", a: "We work hard to keep visits painless. We use numbing gel before any shot, distract with movies during cleanings, and never push a child past their comfort. If anything is going to be uncomfortable, we tell you and your child first." },
    { q: "How do SMS reminders work?", a: "When you book, opt in to text reminders. We send a friendly text 24 hours before your appointment with a one-tap 'Confirm' or 'Reschedule' link. We'll also send a text when you arrive in the parking lot — no waiting-room check-in needed." },
    { q: "What happens in a dental emergency?", a: "Call us first at (555) 123-CHEW — we hold same-day slots open every weekday for emergencies. Knocked-out permanent tooth? Put it in milk and come straight in. After hours, our voicemail directs you to the on-call provider's cell phone." },
    { q: "Can siblings be seen at the same time?", a: "Yes! We schedule siblings back-to-back or in adjacent rooms whenever possible. Just mention it when you book — we can usually get 2-3 kids in within the same hour." },
    { q: "Do you offer payment plans?", a: "For larger treatments not fully covered by insurance, we offer 0% financing through CareCredit and our in-house monthly payment plans. We'll quote the full cost (and your out-of-pocket) before any treatment starts." },
  ];

  const [open, setOpen] = useState(0);

  return (
    <section style={{ background: "#FBEED4" }} data-screen-label="10 FAQ">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 56, alignItems: "start" }} className="faq-grid">
          <div style={{ position: "sticky", top: 100 }}>
            <div className="eyebrow">Common questions</div>
            <h2 style={{ fontSize: "clamp(36px, 4.5vw, 52px)", marginTop: 12 }}>Asked & answered.</h2>
            <p style={{ marginTop: 16, color: "#4a3326", fontSize: 17 }}>If you don't see your question, text us at (555) 123-CHEW — we usually reply within an hour.</p>
            <div style={{ marginTop: 32, padding: 20, background: "#fff", border: "2px solid #2A1810", borderRadius: 20, display: "flex", gap: 14, alignItems: "center" }}>
              <BearMascot pose="wave" size={60} />
              <div>
                <div style={{ fontWeight: 700 }}>Still wondering?</div>
                <div style={{ fontSize: 13, color: "#7a3e22" }}>Mol answers tougher ones live.</div>
                <a href="Contact.html" style={{ marginTop: 6, display: "inline-block", color: "#F4845F", fontWeight: 700, fontSize: 14 }}>Chat with us →</a>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
                  fontSize: 18,
                  color: "#2A1810",
                  cursor: "pointer",
                }}>
                  <span>{f.q}</span>
                  <span style={{
                    width: 32, height: 32, borderRadius: 999, background: open === i ? "#F4845F" : "#FFF6E8",
                    color: open === i ? "#fff" : "#2A1810",
                    display: "grid", placeItems: "center", fontSize: 18,
                    flexShrink: 0,
                    transition: "all 0.15s",
                    transform: open === i ? "rotate(45deg)" : "rotate(0)",
                  }}>+</span>
                </button>
                {open === i && (
                  <div style={{ padding: "0 24px 24px", color: "#4a3326", fontSize: 15, lineHeight: 1.6 }}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .faq-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

// ============================================================
// BLOG PREVIEW
// ============================================================

function BlogPreview() {
  const posts = [
    { tag: "First visits", title: "When should your baby see a dentist for the first time?", excerpt: "Hint: it's earlier than most parents think. Here's exactly when, what happens, and how to prep your toddler.", read: "5 min", color: "#F4845F" },
    { tag: "Sleep tips", title: "Why your kid's pacifier might be affecting their bite (and what to do)", excerpt: "Most kids will stop on their own. For the ones who don't, here are 4 gentle strategies that actually work.", read: "4 min", color: "#6FCFB2" },
    { tag: "Insurance", title: "Decoding your dental EOB: a parent's plain-English guide", excerpt: "What 'allowed amount,' 'PPO,' and 'preventive' actually mean — and how to spot a billing error.", read: "7 min", color: "#F2C94C" },
  ];

  return (
    <section id="blog" data-screen-label="11 Blog">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="eyebrow">From the blog</div>
            <h2 style={{ fontSize: "clamp(36px, 4.5vw, 52px)", marginTop: 12 }}>Patient resources.</h2>
          </div>
          <a href="Blog.html" className="btn btn-ghost">All articles →</a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {posts.map((p, i) => (
            <a key={i} href="Blog.html" style={{ display: "block", textDecoration: "none", color: "inherit" }}>
              <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", height: "100%", transition: "transform 0.15s, box-shadow 0.15s" }}
                onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 32px rgba(42,24,16,0.12)"; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(42,24,16,0.06)"; }}>
                <div style={{ aspectRatio: "16/10", background: p.color, position: "relative", borderBottom: "1px solid rgba(42,24,16,0.1)" }}>
                  <image-slot id={`blog-${i}`} shape="rect" placeholder={`Blog hero — ${p.tag}`} style={{ width: "100%", height: "100%" }}></image-slot>
                </div>
                <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#7a3e22", textTransform: "uppercase", letterSpacing: 1 }}>{p.tag}</span>
                    <span style={{ fontSize: 12, color: "#7a3e22" }}>{p.read} read</span>
                  </div>
                  <h3 style={{ fontSize: 21 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: "#4a3326", flex: 1 }}>{p.excerpt}</p>
                  <div style={{ fontWeight: 700, color: "#F4845F", fontSize: 14 }}>Read article →</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MANIFESTO — founder pull-quote
// ============================================================

function Manifesto() {
  return (
    <section style={{ background: "#FBEED4", borderTop: "2px solid #2A1810", borderBottom: "2px solid #2A1810" }} data-screen-label="Manifesto">
      <div className="container" style={{ maxWidth: 980, textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
          <BearMascot pose="wave" size={64} />
        </div>
        <div style={{ fontSize: 64, lineHeight: 0.6, color: "#F4845F", fontFamily: "'Fredoka', sans-serif", fontWeight: 700 }}>“</div>
        <p style={{
          fontFamily: "'Fredoka', sans-serif", fontWeight: 500,
          fontSize: "clamp(26px, 3.6vw, 44px)", lineHeight: 1.25, margin: "8px auto 0",
          letterSpacing: "-0.01em", color: "#2A1810", textWrap: "balance", maxWidth: 880,
        }}>
          We treat the kid first and the teeth second. If a nervous four-year-old leaves
          <span className="wavy"> braver than they walked in</span>, the cleaning took care of itself.
        </p>
        <div style={{ marginTop: 28, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: 1.6, textTransform: "uppercase", fontWeight: 700, color: "#7a3e22" }}>
          Dr. Amelia Park · Founder
        </div>
      </div>
    </section>
  );
}

// ============================================================
// HOME CLOSING CTA — book a visit band
// ============================================================

function HomeClosingCTA({ onBookClick }) {
  return (
    <section data-screen-label="Closing CTA">
      <div className="container">
        <div style={{ background: "#F4845F", border: "3px solid #2A1810", borderRadius: 36, boxShadow: "12px 12px 0 #2A1810", padding: "64px 48px", position: "relative", overflow: "hidden", textAlign: "center" }} className="home-cta">
          <div style={{ position: "absolute", top: -40, right: -30, opacity: 0.16 }}>
            <BearMascot pose="tooth" size={260} />
          </div>
          <div style={{ position: "relative", maxWidth: 680, margin: "0 auto" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: 1.6, textTransform: "uppercase", color: "#FFF6E8", opacity: 0.9, fontWeight: 700 }}>Ready when you are</div>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", marginTop: 14, color: "#FFF6E8", lineHeight: 1.0 }}>
              Let's get that first visit on the <span style={{ color: "#F2C94C" }}>calendar.</span>
            </h2>
            <p style={{ marginTop: 18, fontSize: 18, color: "#FFF6E8", opacity: 0.95, maxWidth: 560, margin: "18px auto 0" }}>
              Book online in under two minutes, or call and a real human picks up. Insurance verified before you arrive — no surprise bills.
            </p>
            <div style={{ marginTop: 30, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn btn-ink" onClick={onBookClick} style={{ fontSize: 17, padding: "16px 28px" }}>Book a visit →</button>
              <a href="tel:5551234386" className="btn btn-ghost" style={{ color: "#FFF6E8", borderColor: "#FFF6E8", fontSize: 16 }}>📞 (555) 123-CHEW</a>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 600px) { .home-cta { padding: 44px 24px !important; } }
      `}</style>
    </section>
  );
}

Object.assign(window, { FirstVisit, Reviews, Locations, FAQ, BlogPreview, Manifesto, HomeClosingCTA });

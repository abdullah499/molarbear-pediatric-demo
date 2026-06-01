/* global React */
const { useState, useEffect, useRef } = React;

// ============================================================
// MASCOT — Molar Bear, various poses (reusable SVG)
// ============================================================

function BearMascot({ pose = "wave", size = 200 }) {
  // Base bear face — variations through "pose"
  const base = (
    <>
      {/* Ears */}
      <circle cx="55" cy="55" r="28" fill="#A0522D" />
      <circle cx="165" cy="55" r="28" fill="#A0522D" />
      <circle cx="55" cy="55" r="14" fill="#F4845F" />
      <circle cx="165" cy="55" r="14" fill="#F4845F" />
      {/* Head */}
      <circle cx="110" cy="115" r="75" fill="#A0522D" />
      {/* Snout */}
      <ellipse cx="110" cy="140" rx="40" ry="32" fill="#F4D8B8" />
      {/* Cheek blush */}
      <circle cx="70" cy="135" r="10" fill="#F4845F" opacity="0.4" />
      <circle cx="150" cy="135" r="10" fill="#F4845F" opacity="0.4" />
    </>
  );

  return (
    <svg width={size} height={size} viewBox="0 0 220 220" style={{ display: "block" }}>
      {base}
      {pose === "wave" && (
        <>
          {/* Eyes happy */}
          <path d="M 78 105 Q 85 98 92 105" stroke="#2A1810" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M 128 105 Q 135 98 142 105" stroke="#2A1810" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <ellipse cx="110" cy="130" rx="8" ry="6" fill="#2A1810" />
          <path d="M 90 150 Q 110 168 130 150" stroke="#2A1810" strokeWidth="3" fill="none" strokeLinecap="round" />
          <rect x="105" y="152" width="10" height="13" rx="2" fill="#fff" stroke="#2A1810" strokeWidth="2" />
          {/* Waving paw */}
          <circle cx="185" cy="100" r="20" fill="#A0522D" />
          <circle cx="185" cy="100" r="10" fill="#F4D8B8" />
        </>
      )}
      {pose === "peek" && (
        <>
          <circle cx="85" cy="105" r="7" fill="#2A1810" />
          <circle cx="135" cy="105" r="7" fill="#2A1810" />
          <circle cx="87" cy="103" r="2" fill="#fff" />
          <circle cx="137" cy="103" r="2" fill="#fff" />
          <ellipse cx="110" cy="130" rx="8" ry="6" fill="#2A1810" />
          <path d="M 92 152 Q 110 162 128 152" stroke="#2A1810" strokeWidth="3" fill="none" strokeLinecap="round" />
          <rect x="105" y="153" width="10" height="11" rx="2" fill="#fff" stroke="#2A1810" strokeWidth="2" />
        </>
      )}
      {pose === "tooth" && (
        <>
          <path d="M 78 105 Q 85 98 92 105" stroke="#2A1810" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M 128 105 Q 135 98 142 105" stroke="#2A1810" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <ellipse cx="110" cy="130" rx="8" ry="6" fill="#2A1810" />
          <path d="M 80 148 Q 110 175 140 148" stroke="#2A1810" strokeWidth="3" fill="none" strokeLinecap="round" />
          <rect x="98" y="148" width="11" height="16" rx="2" fill="#fff" stroke="#2A1810" strokeWidth="2" />
          <rect x="112" y="148" width="11" height="16" rx="2" fill="#fff" stroke="#2A1810" strokeWidth="2" />
        </>
      )}
    </svg>
  );
}

// ============================================================
// LOGO LOCKUP — small version for header
// ============================================================

function Logo({ size = "md", onClick }) {
  const sizes = {
    sm: { mark: 36, fs: 20 },
    md: { mark: 48, fs: 26 },
    lg: { mark: 64, fs: 36 },
  }[size];

  return (
    <a href="Home.html" onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
      <svg width={sizes.mark} height={sizes.mark} viewBox="0 0 220 220">
        <circle cx="55" cy="55" r="28" fill="#A0522D" />
        <circle cx="165" cy="55" r="28" fill="#A0522D" />
        <circle cx="55" cy="55" r="14" fill="#F4845F" />
        <circle cx="165" cy="55" r="14" fill="#F4845F" />
        <circle cx="110" cy="115" r="75" fill="#A0522D" />
        <ellipse cx="110" cy="140" rx="40" ry="32" fill="#F4D8B8" />
        <circle cx="85" cy="105" r="7" fill="#2A1810" />
        <circle cx="135" cy="105" r="7" fill="#2A1810" />
        <ellipse cx="110" cy="130" rx="8" ry="6" fill="#2A1810" />
        <path d="M 90 150 Q 110 168 130 150" stroke="#2A1810" strokeWidth="3" fill="none" strokeLinecap="round" />
        <rect x="105" y="152" width="10" height="13" rx="2" fill="#fff" stroke="#2A1810" strokeWidth="2" />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.95, whiteSpace: "nowrap" }}>
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: sizes.fs, letterSpacing: -0.5, color: "#2A1810" }}>Molar Bear</div>
        <div style={{ fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase", color: "#7a3e22", marginTop: 2, fontWeight: 700 }}>Pediatric Dental</div>
      </div>
    </a>
  );
}

// ============================================================
// HEADER — sticky, with mobile menu + Book CTA
// ============================================================

function SiteHeader({ onBookClick, currentPage = "home" }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home", href: "Home.html" },
    { id: "newpatients", label: "New Patients", href: "New-Patients.html", pill: true },
    { id: "services", label: "Services", href: "Services.html" },
    { id: "journey", label: "Journey", href: "Treatment-Journey.html", pill: true },
    { id: "plan", label: "Plan", href: "Plan-Your-Treatment.html", pill: true },
    { id: "smiles", label: "Smiles", href: "Smile-Gallery.html", pill: true },
    { id: "stories", label: "Stories", href: "Patient-Stories.html", pill: true },
    { id: "about", label: "About", href: "About.html" },
    { id: "insurance", label: "Insurance", href: "Insurance.html" },
    { id: "reviews", label: "Reviews", href: "Reviews.html" },
    { id: "contact", label: "Contact", href: "Contact.html" },
  ];

  return (
    <>
      {/* Top utility bar */}
      <div style={{ background: "#2A1810", color: "#FFF6E8", fontSize: 13, padding: "8px 0" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div className="top-utility-left" style={{ display: "flex", gap: 20, alignItems: "center", opacity: 0.85, flexWrap: "wrap" }}>
            <span>📅 Mon-Fri 8am-6pm · Sat 9am-2pm</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>🛡️ HIPAA-compliant</span>
          </div>
          <div className="top-utility-right" style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <a href="tel:5551234386" style={{ fontFamily: "var(--font-display)", fontWeight: 600, whiteSpace: "nowrap" }}>📞 (555) 123-CHEW</a>
            <span style={{ opacity: 0.5 }}>·</span>
            <a href="Home.html#contact">Get directions →</a>
          </div>
        </div>
      </div>

      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: scrolled ? "rgba(255,246,232,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px) saturate(120%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px) saturate(120%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(42,24,16,0.12)" : "1px solid transparent",
        boxShadow: scrolled ? "0 6px 20px -12px rgba(42,24,16,0.25)" : "none",
        transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
      }}>
        <div className="container header-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 28px", flexWrap: "wrap", rowGap: 12 }}>
          <Logo size="md" />

          <nav className="desktop-nav" style={{ display: "flex", gap: 4, rowGap: 6, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              const base = {
                padding: "8px 11px",
                borderRadius: 999,
                fontWeight: 600,
                fontSize: 13.5,
                letterSpacing: "-0.005em",
                color: isActive ? "#F4845F" : "#2A1810",
                transition: "background 0.15s",
              };
              if (item.pill) {
                base.background = isActive ? "#F4845F" : "#FBEED4";
                base.color = isActive ? "#fff" : "#7a3e22";
              }
              return (
                <a key={item.id} href={item.href} style={base}
                  onMouseOver={(e) => { if (!isActive && !item.pill) e.currentTarget.style.background = "rgba(42,24,16,0.05)"; if (item.pill && !isActive) e.currentTarget.style.background = "#f4e0bc"; }}
                  onMouseOut={(e) => { if (!isActive && !item.pill) e.currentTarget.style.background = "transparent"; if (item.pill && !isActive) e.currentTarget.style.background = "#FBEED4"; }}>
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="header-cta" style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button className="btn btn-coral header-book" onClick={onBookClick}>Book a visit →</button>
            <button
              className="nav-toggle"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              style={{
                display: "none", width: 46, height: 46, borderRadius: 14,
                border: "2px solid #2A1810", background: "#fff",
                alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 5,
                boxShadow: "3px 3px 0 #2A1810", padding: 0,
              }}
            >
              <span style={{ display: "block", width: 20, height: 2.5, background: "#2A1810", borderRadius: 2, transition: "transform 0.2s, opacity 0.2s", transform: mobileOpen ? "translateY(7.5px) rotate(45deg)" : "none" }} />
              <span style={{ display: "block", width: 20, height: 2.5, background: "#2A1810", borderRadius: 2, transition: "opacity 0.15s", opacity: mobileOpen ? 0 : 1 }} />
              <span style={{ display: "block", width: 20, height: 2.5, background: "#2A1810", borderRadius: 2, transition: "transform 0.2s", transform: mobileOpen ? "translateY(-7.5px) rotate(-45deg)" : "none" }} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown panel */}
        {mobileOpen && (
          <div className="mobile-nav" style={{
            background: "rgba(255,246,232,0.98)",
            backdropFilter: "blur(12px) saturate(120%)",
            WebkitBackdropFilter: "blur(12px) saturate(120%)",
            borderBottom: "1px solid rgba(42,24,16,0.12)",
            boxShadow: "0 12px 28px -16px rgba(42,24,16,0.4)",
            padding: "12px 0 20px",
          }}>
            <div className="container" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <a key={item.id} href={item.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "14px 16px", borderRadius: 14, minHeight: 52,
                      fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17,
                      background: isActive ? "#F4845F" : (item.pill ? "#FBEED4" : "transparent"),
                      color: isActive ? "#fff" : "#2A1810",
                      border: isActive ? "0" : "1px solid rgba(42,24,16,0.08)",
                    }}>
                    {item.label}
                    <span style={{ opacity: 0.5 }}>→</span>
                  </a>
                );
              })}
              <button className="btn btn-coral" onClick={() => { setMobileOpen(false); onBookClick(); }} style={{ marginTop: 8, width: "100%", justifyContent: "center", minHeight: 52 }}>
                Book a visit →
              </button>
            </div>
          </div>
        )}
      </header>

      <style>{`
        /* Tablet: nav wraps to its own centered row */
        @media (max-width: 1180px) and (min-width: 861px) {
          .header-inner { row-gap: 12px; }
          .desktop-nav { order: 3; width: 100%; justify-content: center !important; }
          .header-cta { order: 2; }
        }
        /* Mobile: hide the wrapping nav, show the hamburger */
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .nav-toggle { display: inline-flex !important; }
        }
        @media (max-width: 420px) {
          .header-book { display: none !important; }
        }
        @media (max-width: 520px) {
          .top-utility-right { display: none !important; }
          .top-utility-left { font-size: 11px !important; gap: 10px !important; }
        }
      `}</style>
    </>
  );
}

// ============================================================
// FOOTER
// ============================================================

function SiteFooter({ onBookClick }) {
  return (
    <footer style={{ background: "#2A1810", color: "#FFF6E8", padding: "80px 0 32px", marginTop: 80 }}>
      <div className="container">
        {/* Big CTA */}
        <div style={{
          background: "#A0522D",
          borderRadius: 32,
          padding: "56px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
          flexWrap: "wrap",
          marginBottom: 80,
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", right: -40, top: -20, opacity: 0.25 }}>
            <BearMascot pose="wave" size={280} />
          </div>
          <div style={{ position: "relative", maxWidth: 600 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: 1.6, textTransform: "uppercase", opacity: 0.75 }}>Ready when you are</div>
            <h2 style={{ fontSize: 48, marginTop: 12, fontFamily: "'Fredoka', sans-serif", fontWeight: 600 }}>Let's get that first checkup on the calendar.</h2>
            <p style={{ marginTop: 16, opacity: 0.85, fontSize: 17 }}>Most appointments available this week. Insurance pre-verified before you arrive.</p>
            <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn btn-coral" onClick={onBookClick}>Book a visit →</button>
              <a href="tel:5551234386" className="btn btn-ghost" style={{ color: "#FFF6E8", borderColor: "#FFF6E8" }}>📞 Call (555) 123-CHEW</a>
            </div>
          </div>
        </div>

        {/* Columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr", gap: 36, paddingBottom: 48, borderBottom: "1px solid rgba(255,246,232,0.15)" }} className="footer-grid">
          <div>
            <Logo size="md" />
            <p style={{ marginTop: 20, opacity: 0.75, fontSize: 15, maxWidth: 320 }}>
              Pediatric dentistry for brave little patients. 3 locations across the metro — same gentle care at each one.
            </p>
            <div style={{ marginTop: 24, display: "flex", gap: 8 }}>
              {["IG", "FB", "TT", "YT"].map((s) => (
                <div key={s} style={{ width: 38, height: 38, borderRadius: 999, background: "rgba(255,246,232,0.1)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 13 }}>{s}</div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, marginBottom: 16 }}>Care</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 15, opacity: 0.8 }}>
              <a href="Services.html">All services</a>
              <a href="Services.html#service-first">First visit</a>
              <a href="Services.html#service-clean">Cleanings & sealants</a>
              <a href="Services.html#service-sed">Sedation dentistry</a>
              <a href="Services.html#service-emerg">Emergency care</a>
              <a href="Services.html#service-ortho">Orthodontic referrals</a>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, marginBottom: 16 }}>Decide with us</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 15, opacity: 0.8 }}>
              <a href="Treatment-Journey.html">Treatment journey</a>
              <a href="Plan-Your-Treatment.html">Plan your treatment</a>
              <a href="Smile-Gallery.html">Before & after smiles</a>
              <a href="Patient-Stories.html">Patient stories</a>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, marginBottom: 16 }}>For parents</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 15, opacity: 0.8 }}>
              <a href="Insurance.html">Check insurance</a>
              <a href="Blog.html">Patient resources</a>
              <a href="Reviews.html">Reviews</a>
              <a href="Contact.html">Contact us</a>
              <a href="About.html">About Molar Bear</a>
              <a href="Contact.html">Refer a friend</a>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, marginBottom: 16 }}>Visit us</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 15, opacity: 0.8 }}>
              <div>
                <div style={{ fontWeight: 700, color: "#FFF6E8", opacity: 1 }}>Downtown Den</div>
                <div>148 Maple Row · Suite 200</div>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: "#FFF6E8", opacity: 1 }}>Westside Cave</div>
                <div>3201 Birch Ave</div>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: "#FFF6E8", opacity: 1 }}>Northside Lodge</div>
                <div>8 Pinecone Plaza</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32, fontSize: 13, opacity: 0.55, flexWrap: "wrap", gap: 12 }}>
          <div>© 2026 Molar Bear Pediatric Dental, P.C. · HIPAA compliant · ADA accessible</div>
          <div style={{ display: "flex", gap: 20 }}>
            <a href="Privacy.html">Privacy</a>
            <a href="Terms.html">Terms</a>
            <a href="Notice-of-Privacy.html">Notice of Privacy Practices</a>
            <a href="Accessibility.html">Accessibility</a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .footer-grid { grid-template-columns: 1fr 1fr 1fr !important; }
        }
        @media (max-width: 720px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

// ============================================================
// DECIDE-ON-YOUR-OWN-TIME — reusable toolkit grid
// Numbered card grid linking to every decision tool on the site.
// Usage: <DecideToolkit currentTool="finder" /> (optional: dims current card)
// ============================================================
const DECIDE_TOOLS = [
  { id: "finder",   num: "01", meta: "2 min · interactive",  title: "Treatment Finder",  blurb: "Four questions, one recommendation. No email gate.",                    href: "Plan-Your-Treatment.html#finder",     color: "#FBEED4" },
  { id: "calc",     num: "02", meta: "60 sec · indicative",  title: "Cost Calculator",   blurb: "Build a plan, see a transparent estimate with payment options.",       href: "Plan-Your-Treatment.html#calculator", color: "#FFE9DF" },
  { id: "compare",  num: "03", meta: "Table · 6 columns",    title: "Compare treatments",blurb: "The most-asked treatments side by side. Time, money, longevity.",      href: "Treatment-Journey.html#compare",      color: "#E8F6F0" },
  { id: "smiles",   num: "04", meta: "24 cases · 5 services",title: "Before · After",    blurb: "Drag the handle. Real patients, same chair, same lighting.",          href: "Smile-Gallery.html",                  color: "#F1ECFF" },
  { id: "journey",  num: "05", meta: "6 steps · stepper",    title: "The Journey",       blurb: "Every step laid out plainly \u2014 from booking to final polish.",     href: "Treatment-Journey.html#visualizer",   color: "#FBEED4" },
  { id: "insurance",num: "06", meta: "No PHI \u00b7 30 sec", title: "Insurance check",   blurb: "Tell us your insurer and plan. We show the typical coverage range.",   href: "Insurance.html",                      color: "#FFE9DF" },
];

function DecideToolkit({ currentTool }) {
  return (
    <section style={{ paddingTop: 80, paddingBottom: 80, background: "#FFF6E8", borderTop: "1px solid rgba(42,24,16,0.08)", borderBottom: "1px solid rgba(42,24,16,0.08)" }} data-screen-label="Decide toolkit">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "end", gap: 24, marginBottom: 44 }} className="dt-head">
          <div style={{ maxWidth: 760 }}>
            <div className="eyebrow">Helping patients · self-serve toolkit</div>
            <h2 style={{ fontSize: "clamp(34px, 4.5vw, 54px)", marginTop: 10, fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
              Decide on your own time.
            </h2>
            <p style={{ marginTop: 14, fontSize: 18, color: "#4a3326", maxWidth: 640 }}>
              Five small tools to help you weigh a treatment quietly, in your own kitchen, before you ever pick up the phone.
            </p>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: 1.4, textTransform: "uppercase", color: "#7a3e22", fontWeight: 700, whiteSpace: "nowrap" }}>
            6 tools · 0 sign-ups
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }} className="dt-grid">
          {DECIDE_TOOLS.map((t) => {
            const isCurrent = currentTool === t.id;
            return (
              <a key={t.id} href={t.href}
                className="dt-card"
                style={{
                  background: t.color,
                  border: "2.5px solid #2A1810",
                  borderRadius: 22,
                  padding: 26,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  boxShadow: "5px 5px 0 #2A1810",
                  transition: "transform 0.12s, box-shadow 0.12s",
                  position: "relative",
                  minHeight: 220,
                  opacity: isCurrent ? 0.72 : 1,
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "7px 7px 0 #2A1810"; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "5px 5px 0 #2A1810"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 36, color: "#2A1810", letterSpacing: "-0.02em", lineHeight: 1 }}>{t.num}</div>
                  {isCurrent && (
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 1.4, textTransform: "uppercase", color: "#7a3e22", background: "#fff", border: "1.5px solid #2A1810", padding: "3px 8px", borderRadius: 99, fontWeight: 700 }}>You're here</div>
                  )}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase", color: "#7a3e22", fontWeight: 700 }}>{t.meta}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, lineHeight: 1.15, color: "#2A1810", marginTop: 2 }}>{t.title}</div>
                <div style={{ fontSize: 14.5, color: "#4a3326", lineHeight: 1.45, flex: 1 }}>{t.blurb}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "#2A1810" }}>
                  <span>Open</span>
                  <span style={{ width: 32, height: 32, borderRadius: 99, background: "#2A1810", color: "#FFF6E8", display: "grid", placeItems: "center", fontWeight: 800 }}>→</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .dt-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 620px) {
          .dt-head { grid-template-columns: 1fr !important; }
          .dt-grid { grid-template-columns: 1fr !important; }
          .dt-card { min-height: 0 !important; padding: 22px !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// Export to window
// ============================================================
Object.assign(window, { BearMascot, Logo, SiteHeader, SiteFooter, DecideToolkit });

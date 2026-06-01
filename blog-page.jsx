/* global React */
const { useState: useBlogState, useMemo: useBlogMemo } = React;

// ============================================================
// BLOG INDEX — patient resources & posts
// ============================================================

const POSTS = [
  {
    id: "first-visit",
    title: "What to expect at your child's first dental visit",
    excerpt: "A 4-minute read for first-time parents. Spoiler: no drills, no scary words, and there are stickers.",
    category: "First visit",
    color: "#F4845F",
    read: 4,
    date: "Mar 4, 2026",
    author: "Dr. Maren Vega",
    featured: true,
  },
  {
    id: "fluoride",
    title: "Fluoride: what's safe, what works, what to skip",
    excerpt: "Toothpaste pea-sized vs. rice-sized, water levels, varnish at the office — a parent's plain-English guide.",
    category: "Science",
    color: "#6FCFB2",
    read: 6,
    date: "Feb 21, 2026",
    author: "Dr. Sam Wynn",
    featured: true,
  },
  {
    id: "tooth-knocked-out",
    title: "Tooth just got knocked out? Do this in the next 30 minutes.",
    excerpt: "A step-by-step for the moment after a fall. Save this page on your phone — seriously.",
    category: "Emergency",
    color: "#c75a3a",
    read: 3,
    date: "Feb 14, 2026",
    author: "Dr. Maren Vega",
  },
  {
    id: "sensory-friendly",
    title: "Inside our sensory-friendly rooms (and how to prep your kid)",
    excerpt: "We toured the sensory rooms with an OT to figure out what actually helps anxious and neurodivergent kids.",
    category: "Special needs",
    color: "#A0522D",
    read: 7,
    date: "Feb 7, 2026",
    author: "Sky Park, RDH",
  },
  {
    id: "thumb-sucking",
    title: "When thumb-sucking becomes a problem (and when it doesn't)",
    excerpt: "Most kids quit by age 4 on their own. Here's what to do — and not do — until then.",
    category: "Habits",
    color: "#F2C94C",
    read: 5,
    date: "Jan 28, 2026",
    author: "Dr. Sam Wynn",
  },
  {
    id: "cavities-prevention",
    title: "Why some kids get cavities no matter what you do",
    excerpt: "Genetics, saliva, enamel — the inherited stuff parents quietly blame themselves for.",
    category: "Science",
    color: "#6FCFB2",
    read: 6,
    date: "Jan 18, 2026",
    author: "Dr. Maren Vega",
  },
  {
    id: "sedation-explained",
    title: "Laughing gas, oral sedation, hospital cases — explained",
    excerpt: "What each level actually feels like, who it's for, and how we decide together.",
    category: "Sedation",
    color: "#F4845F",
    read: 8,
    date: "Jan 10, 2026",
    author: "Dr. Maren Vega",
  },
  {
    id: "school-snacks",
    title: "School snacks that won't trash your kid's teeth",
    excerpt: "Lunchbox upgrades from a pediatric dentist who also packs three lunches a day.",
    category: "Nutrition",
    color: "#F2C94C",
    read: 4,
    date: "Dec 30, 2025",
    author: "Sky Park, RDH",
  },
  {
    id: "braces-when",
    title: "When is the right age to see an orthodontist?",
    excerpt: "AAPD says 7. Here's why — and how we decide whether to wait or pull the trigger.",
    category: "Ortho",
    color: "#A0522D",
    read: 5,
    date: "Dec 18, 2025",
    author: "Dr. Sam Wynn",
  },
];

const RESOURCES = [
  { icon: "📋", title: "New patient packet (PDF)", desc: "Fill out before visit · 4 pages", color: "#F4845F", href: "https://jetform.health/molar-bear/new-patient.pdf" },
  { icon: "🆘", title: "Dental emergency one-pager", desc: "Print + put on the fridge", color: "#6FCFB2", href: "mailto:hello@molarbear.dental?subject=Send%20me%20the%20emergency%20one-pager" },
  { icon: "🦷", title: "Brushing chart for kids", desc: "Sticker calendar · ages 3-9", color: "#F2C94C", href: "mailto:hello@molarbear.dental?subject=Send%20me%20the%20brushing%20chart" },
  { icon: "🥪", title: "Tooth-friendly snack list", desc: "Pediatrician + dietician approved", color: "#A0522D", href: "mailto:hello@molarbear.dental?subject=Send%20me%20the%20snack%20list" },
];

const CATEGORIES = ["All", "First visit", "Science", "Emergency", "Special needs", "Habits", "Sedation", "Nutrition", "Ortho"];

// ============================================================
// HERO
// ============================================================
function BlogHero({ onSubscribe }) {
  return (
    <section style={{ paddingTop: 56, paddingBottom: 32, position: "relative", overflow: "hidden" }} data-screen-label="01 Blog hero">
      <div style={{ position: "absolute", top: -120, right: "-8%", width: 480, height: 480, borderRadius: "50%", background: "#FBEED4", filter: "blur(60px)", opacity: 0.7, pointerEvents: "none" }} />
      <div className="container" style={{ position: "relative", maxWidth: 880 }}>
        <div className="eyebrow">Notes from the den</div>
        <h1 style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.95, marginTop: 16, letterSpacing: "-0.025em" }}>
          Plain-English answers to <span className="wavy">parent questions.</span>
        </h1>
        <p style={{ marginTop: 22, fontSize: 19, color: "#4a3326", maxWidth: 640 }}>
          Written by the actual dentists, hygienists, and front-desk humans who answer these questions all day. No fluff, no scare-mongering.
        </p>
        <div style={{ marginTop: 26, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button className="btn btn-coral" onClick={onSubscribe}>Subscribe (1× / month)</button>
          <a href="#resources" className="btn btn-ghost">Download a one-pager</a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FEATURED — two big cards
// ============================================================
function FeaturedPosts() {
  const featured = POSTS.filter((p) => p.featured);
  return (
    <section style={{ paddingTop: 24, paddingBottom: 24 }} data-screen-label="02 Featured">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }} className="feat-grid">
          {featured.map((p, i) => (
            <a key={p.id} href={`#${p.id}`} style={{
              background: "#fff",
              border: "2px solid #2A1810",
              borderRadius: 28,
              overflow: "hidden",
              boxShadow: "10px 10px 0 #2A1810",
              transition: "transform 0.15s, box-shadow 0.15s",
              display: "flex", flexDirection: "column",
            }} onMouseOver={(e) => { e.currentTarget.style.transform = "translate(-2px, -2px)"; e.currentTarget.style.boxShadow = "12px 12px 0 #2A1810"; }} onMouseOut={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "10px 10px 0 #2A1810"; }}>
              {/* Cover */}
              <div className="img-placeholder" style={{ aspectRatio: "16/9", borderRadius: 0, background: p.color, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(135deg, rgba(255,255,255,0.07) 0 14px, rgba(255,255,255,0.14) 14px 28px)` }} />
                <div style={{ position: "relative", textAlign: "center", padding: 24, color: "rgba(42,24,16,0.55)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1 }}>
                  COVER · {p.category.toUpperCase()}
                </div>
              </div>
              {/* Body */}
              <div style={{ padding: 28, flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "inline-flex", alignSelf: "flex-start", padding: "5px 12px", background: p.color, color: "#2A1810", borderRadius: 999, border: "2px solid #2A1810", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1, fontWeight: 700 }}>{p.category.toUpperCase()}</div>
                <h2 style={{ fontSize: "clamp(24px, 2.5vw, 32px)", marginTop: 14, lineHeight: 1.1 }}>{p.title}</h2>
                <p style={{ marginTop: 12, fontSize: 15, color: "#4a3326", flex: 1 }}>{p.excerpt}</p>
                <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px dashed rgba(42,24,16,0.15)", fontSize: 12, color: "#7a3e22", fontFamily: "var(--font-mono)" }}>
                  <span>{p.author.toUpperCase()}</span>
                  <span>{p.read} MIN · {p.date.toUpperCase()}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .feat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// MAIN GRID + FILTERS + SEARCH
// ============================================================
function PostGrid() {
  const [cat, setCat] = useBlogState("All");
  const [q, setQ] = useBlogState("");

  const list = useBlogMemo(() => POSTS.filter((p) => !p.featured).filter((p) => {
    if (cat !== "All" && p.category !== cat) return false;
    if (q && !(`${p.title} ${p.excerpt}`).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [cat, q]);

  return (
    <section data-screen-label="03 All posts">
      <div className="container">
        <div className="section-head" style={{ marginBottom: 32 }}>
          <div className="eyebrow">Browse the den</div>
          <h2>All articles.</h2>
        </div>

        {/* Filter row */}
        <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap", marginBottom: 28 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", flex: 1, minWidth: 0 }}>
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCat(c)} style={{
                padding: "8px 14px",
                borderRadius: 999,
                border: `2px solid ${cat === c ? "#2A1810" : "rgba(42,24,16,0.15)"}`,
                background: cat === c ? "#2A1810" : "#fff",
                color: cat === c ? "#FFF6E8" : "#2A1810",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.12s",
              }}>{c}</button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "2px solid rgba(42,24,16,0.15)", borderRadius: 999, padding: "8px 14px", minWidth: 240 }}>
            <span style={{ opacity: 0.5 }}>🔎</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles..." style={{ border: 0, outline: "none", background: "transparent", fontSize: 14, fontFamily: "var(--font-body)", flex: 1, minWidth: 0 }} />
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="post-grid">
          {list.map((p) => (
            <a key={p.id} href={`#${p.id}`} style={{
              background: "#fff",
              border: "1px solid rgba(42,24,16,0.1)",
              borderRadius: 22,
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(42,24,16,0.05)",
              transition: "transform 0.15s, box-shadow 0.15s",
              display: "flex", flexDirection: "column",
            }} onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 30px rgba(42,24,16,0.1)"; }} onMouseOut={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 8px 24px rgba(42,24,16,0.05)"; }}>
              <div className="img-placeholder" style={{ aspectRatio: "5/3", borderRadius: 0, background: p.color, position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0 10px, rgba(255,255,255,0.12) 10px 20px)` }} />
                <div style={{ position: "relative", color: "rgba(42,24,16,0.5)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 1 }}>COVER</div>
              </div>
              <div style={{ padding: 22, flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "inline-flex", alignSelf: "flex-start", padding: "3px 9px", background: "#FBEED4", color: "#7a3e22", borderRadius: 999, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 0.8, fontWeight: 700 }}>{p.category.toUpperCase()}</div>
                <h3 style={{ fontSize: 19, marginTop: 12, lineHeight: 1.2 }}>{p.title}</h3>
                <p style={{ marginTop: 10, fontSize: 14, color: "#4a3326", flex: 1, lineHeight: 1.5 }}>{p.excerpt}</p>
                <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", fontSize: 11, color: "#7a3e22", fontFamily: "var(--font-mono)", paddingTop: 12, borderTop: "1px dashed rgba(42,24,16,0.12)" }}>
                  <span>{p.author.split(" ").slice(0, 2).join(" ").toUpperCase()}</span>
                  <span>{p.read} MIN</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {list.length === 0 && (
          <div style={{ padding: "60px 24px", textAlign: "center", color: "#7a3e22" }}>
            No articles match "{q || cat}". Try a different category.
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 1000px) {
          .post-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .post-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// RESOURCES BAND — printable downloads
// ============================================================
function Resources() {
  return (
    <section id="resources" style={{ background: "#FBEED4" }} data-screen-label="04 Printables">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Printables & resources</div>
          <h2>Stuff for the fridge.</h2>
          <p>One-pagers we hand out at the front desk — saved you the trip.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }} className="res-grid">
          {RESOURCES.map((r, i) => (
            <a key={i} href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel={r.href.startsWith("http") ? "noopener noreferrer" : undefined} style={{
              background: "#fff",
              border: "2px solid #2A1810",
              borderRadius: 22,
              padding: 22,
              boxShadow: "6px 6px 0 #2A1810",
              display: "flex", flexDirection: "column", gap: 12,
              transition: "transform 0.12s",
            }} onMouseOver={(e) => { e.currentTarget.style.transform = "translate(-2px, -2px)"; }} onMouseOut={(e) => { e.currentTarget.style.transform = ""; }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: r.color, border: "2px solid #2A1810", display: "grid", placeItems: "center", fontSize: 26 }}>{r.icon}</div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>{r.title}</div>
                <div style={{ fontSize: 12, color: "#7a3e22", marginTop: 4 }}>{r.desc}</div>
              </div>
              <div style={{ marginTop: "auto", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.2, color: "#A0522D" }}>DOWNLOAD →</div>
            </a>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .res-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .res-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ============================================================
// NEWSLETTER
// ============================================================
function Newsletter() {
  const [email, setEmail] = useBlogState("");
  const [submitted, setSubmitted] = useBlogState(false);

  return (
    <section data-screen-label="05 Newsletter">
      <div className="container">
        <div style={{ background: "#2A1810", color: "#FFF6E8", borderRadius: 32, padding: "48px 40px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -40, top: -40, width: 240, height: 240, borderRadius: "50%", background: "#F4845F", opacity: 0.15, pointerEvents: "none" }} />
          <div style={{ position: "absolute", left: -60, bottom: -60, width: 200, height: 200, borderRadius: "50%", background: "#6FCFB2", opacity: 0.12, pointerEvents: "none" }} />

          <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 36, alignItems: "center" }} className="news-grid">
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: 1.6, opacity: 0.7 }}>BEAR PAW MAIL · ONCE A MONTH</div>
              <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600, fontSize: "clamp(32px, 4vw, 48px)", marginTop: 12 }}>
                One useful thing in your inbox.
              </h2>
              <p style={{ marginTop: 12, opacity: 0.85, fontSize: 16, maxWidth: 480 }}>
                One question we got that month, answered clearly. That's it. No promos, no birthday upsells, no &ldquo;we miss you&rdquo; nags.
              </p>
            </div>

            <div>
              {submitted ? (
                <div style={{ background: "#6FCFB2", color: "#2A1810", borderRadius: 18, padding: 24, border: "2px solid #FFF6E8" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20 }}>You're in 🐻</div>
                  <div style={{ marginTop: 6, fontSize: 14 }}>Confirmation email on its way to {email}. First letter ships the 1st of next month.</div>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }} style={{ background: "#FFF6E8", color: "#2A1810", borderRadius: 18, padding: 20, border: "2px solid #FFF6E8" }}>
                  <label style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14 }}>Your email</label>
                  <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="parent@email.com" style={{ flex: 1, minWidth: 180, padding: "12px 14px", borderRadius: 999, border: "2px solid rgba(42,24,16,0.15)", fontSize: 15, fontFamily: "var(--font-body)" }} />
                    <button type="submit" className="btn btn-coral" style={{ fontSize: 14 }}>Subscribe →</button>
                  </div>
                  <div style={{ marginTop: 10, fontSize: 11, color: "#7a3e22", fontFamily: "var(--font-mono)" }}>UNSUBSCRIBE IN ONE CLICK · NO SHARING WITH 3RD PARTIES</div>
                </form>
              )}
            </div>
          </div>

          <style>{`
            @media (max-width: 800px) {
              .news-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// AUTHORS — meet the writers
// ============================================================
function Authors() {
  const authors = [
    { name: "Dr. Maren Vega", role: "Lead pediatric dentist · founder", posts: 24, color: "#F4845F", init: "MV" },
    { name: "Dr. Sam Wynn", role: "Pediatric dentist · sedation lead", posts: 18, color: "#6FCFB2", init: "SW" },
    { name: "Sky Park, RDH", role: "Hygienist · sensory specialist", posts: 11, color: "#F2C94C", init: "SP" },
  ];
  return (
    <section className="compact" data-screen-label="06 Authors">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24, flexWrap: "wrap", gap: 10 }}>
          <div>
            <div className="eyebrow">Who writes here</div>
            <h2 style={{ fontSize: 36, marginTop: 8 }}>Meet the writers.</h2>
          </div>
          <a href="About.html" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "#A0522D" }}>Full team on About →</a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="auth-grid">
          {authors.map((a, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid rgba(42,24,16,0.1)", borderRadius: 22, padding: 24, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: a.color, border: "2px solid #2A1810", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "#2A1810", flexShrink: 0 }}>{a.init}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17 }}>{a.name}</div>
                <div style={{ fontSize: 12, color: "#7a3e22", marginTop: 3 }}>{a.role}</div>
                <div style={{ marginTop: 8, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1, color: "#A0522D" }}>{a.posts} POSTS →</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .auth-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ============================================================
// PAGE
// ============================================================
function BlogPage() {
  const onSubscribe = () => {
    const el = document.querySelector("[data-screen-label='05 Newsletter']");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };
  return (
    <>
      <BlogHero onSubscribe={onSubscribe} />
      <FeaturedPosts />
      <PostGrid />
      <Authors />
      <Resources />
      <Newsletter />
    </>
  );
}

Object.assign(window, { BlogPage });

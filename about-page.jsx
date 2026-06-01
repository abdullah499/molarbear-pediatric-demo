/* global React, BearMascot */
const { useState } = React;

// ============================================================
// ABOUT HERO
// ============================================================

function AboutHero({ onBookClick }) {
  return (
    <section style={{ paddingTop: 60, paddingBottom: 80, position: "relative", overflow: "hidden" }} data-screen-label="01 About hero">
      <div style={{ position: "absolute", top: -120, left: "-10%", width: 460, height: 460, borderRadius: "50%", background: "#FBEED4", filter: "blur(60px)", opacity: 0.7, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -100, right: "-6%", width: 360, height: 360, borderRadius: "50%", background: "#6FCFB2", filter: "blur(80px)", opacity: 0.35, pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 56, alignItems: "center" }}>
        <div>
          <div className="eyebrow">About Molar Bear</div>
          <h1 style={{ fontSize: "clamp(48px, 6.5vw, 96px)", lineHeight: 0.95, marginTop: 16, letterSpacing: "-0.03em" }}>
            We make brave <span className="wavy">brushers</span>, one wiggly tooth at a time.
          </h1>
          <p style={{ marginTop: 24, fontSize: 20, maxWidth: 600, color: "#4a3326" }}>
            Started by a pediatric dentist and a mom of three who got tired of waiting rooms that smelled like a hospital. Today: 14 providers, 3 sensory-friendly locations, 8,400+ happy little patients.
          </p>
          <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn btn-coral" onClick={onBookClick} style={{ fontSize: 17, padding: "16px 26px" }}>Meet us in person →</button>
            <a href="#team" className="btn btn-ghost">See our team ↓</a>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "180px 180px",
            gap: 16,
          }}>
            <div style={{ background: "#F4845F", borderRadius: 24, border: "3px solid #2A1810", overflow: "hidden", gridRow: "span 2", boxShadow: "8px 8px 0 #2A1810" }}>
              <image-slot id="about-hero-1" shape="rect" placeholder="Photo: team huddle, all in scrubs" style={{ width: "100%", height: "100%" }}></image-slot>
            </div>
            <div style={{ background: "#6FCFB2", borderRadius: 24, border: "3px solid #2A1810", overflow: "hidden", boxShadow: "6px 6px 0 #2A1810" }}>
              <image-slot id="about-hero-2" shape="rect" placeholder="Photo: kid grinning, missing tooth" style={{ width: "100%", height: "100%" }}></image-slot>
            </div>
            <div style={{ background: "#F2C94C", borderRadius: 24, border: "3px solid #2A1810", overflow: "hidden", boxShadow: "6px 6px 0 #2A1810" }}>
              <image-slot id="about-hero-3" shape="rect" placeholder="Photo: lobby interior" style={{ width: "100%", height: "100%" }}></image-slot>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: -20, right: -20, transform: "rotate(8deg)" }}>
            <div className="sticker" style={{ background: "#fff", fontSize: 14 }}>🐻 Est. 2014</div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .container > div:first-child + div { display: none; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// STORY — timeline
// ============================================================

function OurStory() {
  const beats = [
    { year: "2014", title: "Two parents, one dental chair", body: "Dr. Maya Chen and her partner Tom (also a pediatric dentist) opened a single chair in a remodeled bungalow on Maple Row. First-day patient: Maya's own 4-year-old." },
    { year: "2016", title: "We outgrew the bungalow", body: "By the end of year two we had 1,200 patients on the books and a waiting list of 300 more. Time to move." },
    { year: "2018", title: "Downtown Den opens", body: "Our flagship location — 8 chairs, a sensory-friendly room, and the world's first vending machine that dispenses toothbrushes instead of candy bars." },
    { year: "2021", title: "Westside Cave", body: "Second location on the west side. Designed in partnership with two occupational therapists for maximum sensory accessibility." },
    { year: "2024", title: "Northside Lodge", body: "Third location with extended evening + Saturday hours. We now serve 8,400 active patient families across three locations." },
    { year: "2026", title: "Today: 14 providers, one bear", body: "Six pediatric dentists, three hygienists, two orthodontic specialists, three care coordinators — and Mol, our resident plushie mascot." },
  ];

  return (
    <section style={{ background: "#FBEED4" }} data-screen-label="02 Our story">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Our story</div>
          <h2>From one bungalow to three locations — in 12 years.</h2>
          <p>The honest version. No marketing puffery.</p>
        </div>

        <div style={{ position: "relative", paddingLeft: 36 }}>
          <div style={{ position: "absolute", left: 16, top: 12, bottom: 12, width: 3, background: "repeating-linear-gradient(to bottom, #2A1810 0 8px, transparent 8px 16px)" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {beats.map((b, i) => (
              <div key={i} style={{ position: "relative" }}>
                <div style={{
                  position: "absolute",
                  left: -36, top: 4,
                  width: 36, height: 36, borderRadius: "50%",
                  background: i % 2 === 0 ? "#F4845F" : "#6FCFB2",
                  border: "3px solid #2A1810",
                  display: "grid", placeItems: "center",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700, fontSize: 13,
                  color: "#fff",
                }}>{i + 1}</div>
                <div style={{ background: "#fff", borderRadius: 20, padding: 24, border: "1px solid rgba(42,24,16,0.08)", boxShadow: "0 4px 12px rgba(42,24,16,0.04)" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 6 }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 14, color: "#c75a3a" }}>{b.year}</div>
                    <div style={{ width: 1, height: 14, background: "rgba(42,24,16,0.2)" }} />
                    <h3 style={{ fontSize: 22 }}>{b.title}</h3>
                  </div>
                  <p style={{ color: "#4a3326", fontSize: 16, marginTop: 8 }}>{b.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MISSION / VALUES
// ============================================================

function Values() {
  const values = [
    { num: "01", title: "Kids first, parents second, paperwork last.", body: "We talk to your child like a person, not a patient. If something hurts or feels weird, we stop and figure it out together. Paperwork gets done after the visit, not before.", color: "#F4845F" },
    { num: "02", title: "No surprise bills. Ever.", body: "Every treatment plan is quoted in writing before we start. Insurance is verified up front. If something changes mid-visit, we pause and ask first.", color: "#6FCFB2" },
    { num: "03", title: "Sensory-first design.", body: "Dimmable lights, sound-dampened rooms, weighted blankets, fidget toys. Every space designed in partnership with two pediatric OTs.", color: "#F2C94C" },
    { num: "04", title: "Honest with the hard stuff.", body: "If your kid has a cavity, we'll tell you why. If a baby tooth can wait, we'll tell you that too. We don't recommend treatments kids don't need.", color: "#A0522D" },
  ];

  return (
    <section data-screen-label="03 Our values">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">What we stand for</div>
          <h2>Four promises we make to every family who walks in.</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }} className="values-grid">
          {values.map((v) => (
            <div key={v.num} style={{
              background: "#fff",
              border: "1px solid rgba(42,24,16,0.08)",
              borderRadius: 28,
              padding: 36,
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", background: v.color, opacity: 0.18 }} />
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                fontWeight: 700,
                color: v.color,
                letterSpacing: 1.5,
                marginBottom: 14,
                position: "relative",
              }}>{v.num}</div>
              <h3 style={{ fontSize: 28, position: "relative" }}>{v.title}</h3>
              <p style={{ marginTop: 14, color: "#4a3326", fontSize: 16, position: "relative" }}>{v.body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// BY THE NUMBERS
// ============================================================

function ByTheNumbers() {
  const stats = [
    { num: "8,400+", label: "active little patients", color: "#F4845F" },
    { num: "12", label: "years in business", color: "#6FCFB2" },
    { num: "14", label: "providers + specialists", color: "#F2C94C" },
    { num: "4.9", label: "average review (1,247 reviews)", color: "#A0522D" },
    { num: "3", label: "sensory-friendly locations", color: "#F4845F" },
    { num: "0", label: "shame-based dentistry", color: "#6FCFB2" },
  ];

  return (
    <section style={{ background: "#2A1810", color: "#FFF6E8" }} data-screen-label="04 By the numbers">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow" style={{ color: "#FBEED4", opacity: 0.8 }}>By the numbers</div>
          <h2 style={{ color: "#FFF6E8" }}>What 12 years of pediatric care adds up to.</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} style={{
              background: "rgba(255,246,232,0.04)",
              border: "1px solid rgba(255,246,232,0.12)",
              borderRadius: 24,
              padding: 36,
            }}>
              <div style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 72,
                lineHeight: 1,
                color: s.color,
                letterSpacing: "-0.04em",
              }}>{s.num}</div>
              <div style={{ marginTop: 10, fontSize: 15, opacity: 0.85, textWrap: "balance" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// TEAM — full grid (more than home)
// ============================================================

function FullTeam() {
  const team = [
    { name: "Dr. Maya Chen", role: "Founder · Pediatric Dentist (DDS)", traits: ["Sensory-friendly cert.", "Speaks Mandarin", "Loves shark teeth"], color: "#F4845F" },
    { name: "Dr. Tom Vasquez", role: "Co-founder · Pediatric Dentist (DDS)", traits: ["Sedation specialist", "Habla Español", "Plays guitar at visits"], color: "#6FCFB2" },
    { name: "Dr. Priya Kapoor", role: "Pediatric Dentist (DDS, MS)", traits: ["Special needs cert.", "ASD-trained", "Triathlete"], color: "#F2C94C" },
    { name: "Dr. Amara Diallo", role: "Pediatric Dentist (DMD)", traits: ["Emergency care lead", "Speaks French", "Foster dog mom"], color: "#A0522D" },
    { name: "Dr. Jin Park", role: "Pediatric Dentist (DDS)", traits: ["Infant oral health", "Speaks Korean", "Knits during lunch"], color: "#F4845F" },
    { name: "Dr. Sam Okafor", role: "Pediatric Dentist (DDS)", traits: ["Teen dental anxiety", "Habla Español", "Plays video games"], color: "#6FCFB2" },
    { name: "Lena Walsh, RDH", role: "Lead Hygienist", traits: ["10+ years experience", "Loves stickers", "Tap dancer"], color: "#F2C94C" },
    { name: "Marcus Reyes, RDH", role: "Hygienist", traits: ["Bilingual EN/ES", "Magic tricks for nervous kids", "Surfs weekends"], color: "#A0522D" },
    { name: "Joy Tanaka, RDH", role: "Hygienist", traits: ["ASL fluent", "Sensory-cert.", "Plants enthusiast"], color: "#F4845F" },
    { name: "Bea Hollis", role: "Care Coordinator", traits: ["Insurance whisperer", "Always has snacks", "Knows every kid's name"], color: "#6FCFB2" },
    { name: "Theo Park", role: "Office Manager · Westside", traits: ["12 years here", "Coffee aficionado", "Dad of twins"], color: "#F2C94C" },
    { name: "Nadia Iqbal", role: "Front Desk · Downtown", traits: ["Bilingual EN/Urdu", "Best smile in the office", "Bakes for the team"], color: "#A0522D" },
  ];

  return (
    <section id="team" style={{ background: "#FBEED4" }} data-screen-label="05 Meet the team">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Meet the bears</div>
          <h2>14 humans who actually like 9-year-olds.</h2>
          <p>Every provider is pediatric-trained — not adult dentists who happen to see kids on the side. Six languages spoken in-office.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }} className="team-grid">
          {team.map((p, i) => (
            <div key={i} style={{
              background: "#fff",
              borderRadius: 24,
              border: "1px solid rgba(42,24,16,0.08)",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(42,24,16,0.05)",
            }}>
              <div style={{ background: p.color, aspectRatio: "1/1.05", borderBottom: "1px solid rgba(42,24,16,0.1)", overflow: "hidden" }}>
                <image-slot id={`team-${i}`} shape="rect" placeholder={`Photo: ${p.name}`} style={{ width: "100%", height: "100%" }}></image-slot>
              </div>
              <div style={{ padding: 20 }}>
                <h3 style={{ fontSize: 19 }}>{p.name}</h3>
                <div style={{ fontSize: 13, color: "#7a3e22", marginTop: 4, fontWeight: 600 }}>{p.role}</div>
                <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 4 }}>
                  {p.traits.map((t, j) => (
                    <div key={j} style={{ fontSize: 13, color: "#4a3326", display: "flex", gap: 6, alignItems: "center" }}>
                      <span style={{ color: p.color, fontWeight: 800 }}>·</span>{t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .team-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 800px) {
          .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// OFFICES TOUR
// ============================================================

function OfficesTour() {
  const offices = [
    {
      name: "Downtown Den",
      address: "148 Maple Row · Suite 200",
      tagline: "Our flagship. 8 chairs. The vending machine of toothbrushes.",
      features: ["Sensory-friendly room", "Hospital sedation coord.", "8 treatment chairs", "Free underground parking"],
      color: "#F4845F",
      photo: "Photo: Downtown lobby with bear mural",
    },
    {
      name: "Westside Cave",
      address: "3201 Birch Ave",
      tagline: "Designed by OTs from the studs up. Quietest office we have.",
      features: ["Two sensory rooms", "ASL interpreter on staff", "5 treatment chairs", "Family bathroom + nursing room"],
      color: "#6FCFB2",
      photo: "Photo: Westside calm waiting area",
    },
    {
      name: "Northside Lodge",
      address: "8 Pinecone Plaza",
      tagline: "Saturday hours + 7pm weeknights. For working parents.",
      features: ["Sat 9-2 + late Tue/Thu", "Drive-up valet for runs", "6 treatment chairs", "Streetside playground view"],
      color: "#F2C94C",
      photo: "Photo: Northside exterior storefront",
    },
  ];

  return (
    <section data-screen-label="06 Offices tour">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Where to find us</div>
          <h2>Three locations. Same hugs, different parking.</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="offices-grid">
          {offices.map((o, i) => (
            <div key={i} style={{
              background: "#fff",
              borderRadius: 28,
              border: "2px solid #2A1810",
              overflow: "hidden",
              boxShadow: "6px 6px 0 #2A1810",
            }}>
              <div style={{ background: o.color, aspectRatio: "4/3", overflow: "hidden", borderBottom: "2px solid #2A1810" }}>
                <image-slot id={`office-${i}`} shape="rect" placeholder={o.photo} style={{ width: "100%", height: "100%" }}></image-slot>
              </div>
              <div style={{ padding: 28 }}>
                <h3 style={{ fontSize: 28 }}>{o.name}</h3>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#7a3e22", marginTop: 6, letterSpacing: 0.4 }}>{o.address}</div>
                <p style={{ marginTop: 16, fontSize: 15, color: "#4a3326" }}>{o.tagline}</p>
                <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                  {o.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 14 }}>
                      <span style={{ color: o.color, fontWeight: 800, fontSize: 16, lineHeight: 1 }}>★</span>
                      {f}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <a href="Contact.html" className="btn btn-sm btn-ink" style={{ fontSize: 13 }}>Directions →</a>
                  <a href="tel:5551234386" className="btn btn-sm btn-ghost" style={{ fontSize: 13, padding: "8px 14px" }}>Call</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .offices-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 720px) {
          .offices-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// COMMUNITY
// ============================================================

function Community() {
  const items = [
    { icon: "🏫", title: "School visits", body: "We visit 22 partner schools every year, including 8 Title I schools, for free brushing classes and dental screenings." },
    { icon: "🦷", title: "Free first visit", body: "Every child under 4 from a SNAP-eligible family gets their first visit completely free — no insurance needed." },
    { icon: "🎁", title: "Halloween candy buyback", body: "We pay $1/lb for leftover Halloween candy and ship it to military families overseas. 2,400 lbs collected last year." },
    { icon: "📚", title: "Library partnership", body: "Free 'Brush Like a Bear' picture book at all 12 public library locations. We wrote it. Mol illustrated it." },
  ];

  return (
    <section style={{ background: "#FBEED4" }} data-screen-label="07 Community">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Beyond the clinic</div>
          <h2>What we do when we're not in scrubs.</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }} className="comm-grid">
          {items.map((it, i) => (
            <div key={i} style={{
              background: "#fff",
              border: "1px solid rgba(42,24,16,0.1)",
              borderRadius: 24,
              padding: 32,
              display: "flex",
              gap: 20,
              alignItems: "flex-start",
            }}>
              <div style={{
                width: 64, height: 64,
                borderRadius: 20,
                background: "#FBEED4",
                display: "grid", placeItems: "center",
                fontSize: 32,
                flexShrink: 0,
                border: "2px solid #2A1810",
              }}>{it.icon}</div>
              <div>
                <h3 style={{ fontSize: 22 }}>{it.title}</h3>
                <p style={{ marginTop: 8, color: "#4a3326", fontSize: 15 }}>{it.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .comm-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// PRESS & AWARDS
// ============================================================

function Press() {
  const badges = [
    { label: "Top Pediatric Practice", source: "Parents Magazine", year: "2025" },
    { label: "Best of Metro Dental", source: "City Weekly", year: "2024" },
    { label: "AAPD Member Practice", source: "Am. Acad. Pediatric Dentistry", year: "Since 2014" },
    { label: "Sensory-Inclusive Cert.", source: "KultureCity", year: "2023" },
    { label: "Best Place to Work", source: "Metro Biz", year: "2025" },
    { label: "ADA Accredited", source: "American Dental Assoc.", year: "Active" },
  ];

  return (
    <section data-screen-label="08 Press and awards">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Press · Awards · Memberships</div>
          <h2>The credentials, for the parents who like to check.</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} className="press-grid">
          {badges.map((b, i) => (
            <div key={i} style={{
              background: "#fff",
              border: "1px solid rgba(42,24,16,0.1)",
              borderRadius: 18,
              padding: "22px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17 }}>{b.label}</div>
              <div style={{ fontSize: 13, color: "#7a3e22" }}>{b.source}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, opacity: 0.6, marginTop: 6, letterSpacing: 0.6 }}>{b.year}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .press-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .press-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// CAREERS CTA
// ============================================================

function CareersCTA() {
  return (
    <section style={{ paddingBottom: 32 }} data-screen-label="09 Careers">
      <div className="container">
        <div style={{
          background: "#6FCFB2",
          border: "3px solid #2A1810",
          borderRadius: 32,
          padding: 48,
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 32,
          alignItems: "center",
          boxShadow: "10px 10px 0 #2A1810",
        }} className="careers-grid">
          <div>
            <div className="eyebrow">Careers</div>
            <h2 style={{ fontSize: 40, marginTop: 8 }}>Hiring 2 hygienists + 1 pediatric dentist.</h2>
            <p style={{ marginTop: 12, fontSize: 17, color: "#2A1810", maxWidth: 580 }}>
              We pay 12% above market median. Four weeks PTO, fully paid health, every Friday at 3pm. No production quotas. Ever.
            </p>
          </div>
          <a href="Contact.html" className="btn btn-ink" style={{ fontSize: 16 }}>See open roles →</a>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .careers-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// MANIFESTO — founder pull-quote
// ============================================================

function AboutManifesto() {
  return (
    <section style={{ background: "#2A1810", color: "#FFF6E8" }} data-screen-label="Manifesto">
      <div className="container" style={{ maxWidth: 960, textAlign: "center" }}>
        <div style={{ fontSize: 64, lineHeight: 0.6, color: "#F4845F", fontFamily: "'Fredoka', sans-serif", fontWeight: 700 }}>“</div>
        <p style={{
          fontFamily: "'Fredoka', sans-serif", fontWeight: 500,
          fontSize: "clamp(26px, 3.6vw, 44px)", lineHeight: 1.25, margin: "8px auto 0",
          letterSpacing: "-0.01em", color: "#FFF6E8", textWrap: "balance", maxWidth: 880,
        }}>
          We opened the kind of office we wished existed when our own kids needed it —
          <span style={{ color: "#6FCFB2" }}> warm, unhurried, and honest about the hard stuff.</span>
          Twelve years later, that is still the whole job.
        </p>
        <div style={{ marginTop: 28, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: 1.6, textTransform: "uppercase", fontWeight: 700, color: "#F2C94C" }}>
          Dr. Maya Chen · Founder
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ABOUT CLOSING CTA — book a visit band
// ============================================================

function AboutClosingCTA({ onBookClick }) {
  return (
    <section data-screen-label="Closing CTA">
      <div className="container">
        <div style={{ background: "#F4845F", border: "3px solid #2A1810", borderRadius: 36, boxShadow: "12px 12px 0 #2A1810", padding: "60px 48px", position: "relative", overflow: "hidden", textAlign: "center" }} className="about-cta">
          <div style={{ position: "absolute", bottom: -50, left: -30, opacity: 0.16 }}>
            <BearMascot pose="peek" size={240} />
          </div>
          <div style={{ position: "relative", maxWidth: 680, margin: "0 auto" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: 1.6, textTransform: "uppercase", color: "#FFF6E8", opacity: 0.9, fontWeight: 700 }}>Come say hi</div>
            <h2 style={{ fontSize: "clamp(34px, 5vw, 60px)", marginTop: 14, color: "#FFF6E8", lineHeight: 1.0 }}>
              Meet the team in <span style={{ color: "#F2C94C" }}>person.</span>
            </h2>
            <p style={{ marginTop: 18, fontSize: 18, color: "#FFF6E8", opacity: 0.95, maxWidth: 540, margin: "18px auto 0" }}>
              Book a first visit at any of our three dens — or just call and we'll find a time that works for your family.
            </p>
            <div style={{ marginTop: 30, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn btn-ink" onClick={onBookClick} style={{ fontSize: 17, padding: "16px 28px" }}>Book a visit →</button>
              <a href="tel:5551234386" className="btn btn-ghost" style={{ color: "#FFF6E8", borderColor: "#FFF6E8", fontSize: 16 }}>📞 (555) 123-CHEW</a>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 600px) { .about-cta { padding: 44px 24px !important; } }
      `}</style>
    </section>
  );
}

// ============================================================
// ABOUT PAGE — composed
// ============================================================

function AboutPage({ onBookClick }) {
  return (
    <>
      <AboutHero onBookClick={onBookClick} />
      <AboutManifesto />
      <OurStory />
      <Values />
      <ByTheNumbers />
      <FullTeam />
      <OfficesTour />
      <Community />
      <Press />
      <CareersCTA />
      <AboutClosingCTA onBookClick={onBookClick} />
    </>
  );
}

Object.assign(window, { AboutPage });

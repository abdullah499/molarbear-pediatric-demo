/* global React */
// Shared simple legal/policy page renderer.
// Reused by Privacy.html, Terms.html, Notice-of-Privacy.html, Accessibility.html.

function LegalPage({ eyebrow, title, lastUpdated, intro, sections, contactBlock }) {
  return (
    <>
      {/* Hero */}
      <section style={{ padding: "72px 0 32px", background: "#FBEED4", borderBottom: "2px solid #2A1810" }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="eyebrow">{eyebrow}</div>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 60px)", marginTop: 12, lineHeight: 1.02 }}>{title}</h1>
          <div style={{ marginTop: 18, fontFamily: "var(--font-mono)", fontSize: 13, color: "#7a3e22", letterSpacing: 0.6 }}>
            Last updated: {lastUpdated}
          </div>
          {intro && (
            <p style={{ marginTop: 24, fontSize: 18, color: "#4a3326", lineHeight: 1.55, maxWidth: 720 }}>{intro}</p>
          )}
        </div>
      </section>

      {/* Body */}
      <section style={{ padding: "64px 0 96px" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 2.4fr", gap: 56, alignItems: "start", maxWidth: 1100 }} className="legal-grid">
          {/* TOC */}
          <aside style={{ position: "sticky", top: 96 }} className="legal-toc">
            <div className="eyebrow" style={{ marginBottom: 10 }}>On this page</div>
            <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {sections.map((s, i) => (
                <li key={i}>
                  <a href={`#sec-${i + 1}`} style={{ fontSize: 14, color: "#2A1810", textDecoration: "none" }}>
                    <span style={{ fontFamily: "var(--font-mono)", color: "#A0522D", marginRight: 8 }}>{String(i + 1).padStart(2, "0")}</span>
                    {s.h}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          {/* Sections */}
          <article style={{ fontSize: 16, lineHeight: 1.7, color: "#2A1810" }}>
            {sections.map((s, i) => (
              <section key={i} id={`sec-${i + 1}`} style={{ marginBottom: 48, scrollMarginTop: 120 }}>
                <h2 style={{ fontSize: 26, marginBottom: 14 }}>
                  <span style={{ fontFamily: "var(--font-mono)", color: "#A0522D", marginRight: 12, fontSize: 16 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.h}
                </h2>
                {s.body.map((para, j) => (
                  typeof para === "string"
                    ? <p key={j} style={{ marginBottom: 14, color: "#3a2418" }}>{para}</p>
                    : <ul key={j} style={{ paddingLeft: 22, marginBottom: 14 }}>
                        {para.map((li, k) => <li key={k} style={{ marginBottom: 8 }}>{li}</li>)}
                      </ul>
                ))}
              </section>
            ))}

            {contactBlock && (
              <section style={{
                marginTop: 32,
                padding: 28,
                background: "#FFF6E8",
                border: "2px solid #2A1810",
                borderRadius: 20,
                boxShadow: "6px 6px 0 #2A1810",
              }}>
                <h3 style={{ fontSize: 22, marginBottom: 12 }}>Questions about this?</h3>
                <div style={{ fontSize: 15, lineHeight: 1.6, color: "#3a2418" }}>{contactBlock}</div>
              </section>
            )}
          </article>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .legal-grid { grid-template-columns: 1fr !important; }
            .legal-toc { position: static !important; padding: 16px; border: 2px dashed rgba(42,24,16,0.18); border-radius: 14px; }
          }
        `}</style>
      </section>
    </>
  );
}

Object.assign(window, { LegalPage });

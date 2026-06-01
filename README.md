# Molar Bear — Pediatric Dental Website

A complete multi-page marketing site for a pediatric dental practice. Static
HTML — no build step, no server. React + Babel are loaded from a CDN and the
page components are transpiled in the browser, so you can deploy the folder
exactly as-is.

## Deploy to Netlify (via GitHub)

1. **Create a GitHub repo** and push *the contents of this folder* to the repo
   root (so `index.html` sits at the top level of the repo — not inside a
   subfolder).
   ```bash
   cd molarbear-website
   git init
   git add .
   git commit -m "Molar Bear website"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```

2. **Connect to Netlify:** New site → Import from Git → pick the repo.
   - Build command: *(leave empty)*
   - Publish directory: `.`
   Netlify reads `netlify.toml` and serves the files directly.

3. Done. The root URL loads `index.html` (the home page).

## After it's live

- **Custom domain:** Netlify → Domain settings. Then open `og-image.png`'s URL
  references — search the HTML for `molarbear.netlify.app` and replace it with
  your real domain so social-share previews point at the right place.
- **Drag-and-drop deploy alternative:** you can skip GitHub and just drag this
  whole folder onto app.netlify.com/drop.

## What's in here

| File(s) | Purpose |
|---|---|
| `index.html` | Entry point (copy of `Home.html`) — what the root URL serves |
| `*.html` | One file per page (Home, Services, About, Contact, legal, …) |
| `brand.css` | Global brand styles, fonts, color variables |
| `site-chrome.jsx` | Shared header, footer, logo, mascot |
| `booking-modal.jsx` | Appointment booking modal |
| `*-page.jsx`, `home-*.jsx`, `*.jsx` | Per-page React components |
| `image-slot.js`, `stock-images.js` | Image placeholders + default stock photos |
| `hero-kid.jpg` | Local hero photo |
| `favicon.svg`, `logo.svg` | Bear-mark brand marks |
| `og-image.png` | Social-share preview image |
| `netlify.toml` | Netlify publish config |

## Swapping in real photos

Most photos load from stock image services (Unsplash etc.) referenced in
`stock-images.js`. To use your own, edit the URLs there, or drop image files
into this folder and point the entries at them (e.g. `"hero-photo": "my-hero.jpg"`).

## Notes

- Pages are linked with relative `.html` links, so everything works on any
  static host (Netlify, GitHub Pages, Cloudflare Pages, S3, …).
- No analytics, cookies, or backend are wired up. The booking modal and contact
  forms are front-end only — connect them to a form handler (Netlify Forms,
  Formspree, etc.) when you're ready to collect real submissions.

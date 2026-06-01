/**
 * stock-images.js — populates each <image-slot> with a default `src` based
 * on its id. User drops still override. Loaded after image-slot.js.
 */

(() => {
  // i.pravatar.cc for people (reliable avatar service, img=1..70)
  const av = (n) => `https://i.pravatar.cc/600?img=${n}`;

  // Unsplash for scenes — &w=800&q=80&auto=format&fit=crop
  const u = (id) => `https://images.unsplash.com/photo-${id}?w=900&q=80&auto=format&fit=crop`;

  // Picsum seeded for generic scenes that need to be reliable
  const ps = (seed) => `https://picsum.photos/seed/${seed}/800/600`;

  const STOCK = {
    // ---------- HOME ----------
    "hero-photo": u("1588776814546-1ffcf47267a5"),        // dental setting

    "team-amelia": av(47),
    "team-ben": av(33),
    "team-maya": av(45),

    "blog-0": ps("blog-brushing"),
    "blog-1": ps("blog-sealants"),
    "blog-2": ps("blog-emergency"),

    // ---------- ABOUT ----------
    "about-hero-1": u("1581594693700-c2f57d92f74e"),       // team-y
    "about-hero-2": av(56),                                 // kid grinning
    "about-hero-3": u("1576091160550-2173dba999ef"),       // bright interior

    "team-0": av(47),  "team-1": av(33),  "team-2": av(48),  "team-3": av(36),
    "team-4": av(15),  "team-5": av(60),  "team-6": av(20),  "team-7": av(11),
    "team-8": av(49),  "team-9": av(25),  "team-10": av(8),  "team-11": av(44),

    "office-0": u("1629909613654-28e377c37b09"),
    "office-1": u("1606811971618-4486d14f3f99"),
    "office-2": u("1609840114035-3c981b782dfe"),

    // ---------- SERVICES ----------
    "services-hero": u("1588776814546-1ffcf47267a5"),
    "service-photo-first": av(64),
    "service-photo-clean": u("1606811951341-1c40dd06da0e"),
    "service-photo-seal": u("1606811951341-1c40dd06da0e"),
    "service-photo-fill": u("1629909613654-28e377c37b09"),
    "service-photo-sed": u("1576091160550-2173dba999ef"),
    "service-photo-emerg": av(31),
    "service-photo-ortho": av(56),
    "service-photo-spec": u("1576091160550-2173dba999ef"),

    // ---------- NEW PATIENTS ----------
    "np-hero": u("1629909613654-28e377c37b09"),            // child in dental chair, parent beside

    // ---------- LANDING ----------
    "lp-hero-photo": u("1588776814546-1ffcf47267a5"),      // kid + dentist, warm office
    "lp-picture-photo": av(56),                            // kid grinning post-visit
  };

  function apply(root = document) {
    root.querySelectorAll("image-slot:not([data-stock-applied])").forEach((el) => {
      const id = el.id;
      const url = STOCK[id];
      if (url && !el.getAttribute("src")) {
        el.setAttribute("src", url);
      }
      el.setAttribute("data-stock-applied", "");
    });
  }

  if (document.readyState !== "loading") apply();
  else document.addEventListener("DOMContentLoaded", () => apply());

  // React mounts slots after the initial DOMContentLoaded — watch for them.
  new MutationObserver((muts) => {
    for (const m of muts) {
      m.addedNodes && m.addedNodes.forEach((n) => {
        if (!n.querySelectorAll) return;
        if (n.tagName === "IMAGE-SLOT") apply(n.parentNode || document);
        else if (n.querySelector("image-slot")) apply(n);
      });
    }
  }).observe(document.documentElement, { childList: true, subtree: true });

  window.STOCK_IMAGES = STOCK;
})();

#!/usr/bin/env python3
"""Point every page's social-share (og:image / twitter:image) URL at your real domain.

Usage:
    python set-domain.py https://your-real-site.netlify.app

Run this once after you know your Netlify site URL so link previews
(WhatsApp, iMessage, LinkedIn, etc.) show the correct preview image.
"""
import glob, re, sys

if len(sys.argv) != 2:
    print(__doc__); sys.exit(1)

new = sys.argv[1].rstrip("/")
# Matches whatever domain is currently baked into the og/twitter image tags.
pat = re.compile(r'https?://[^/"]+(?=/og-image\.png)')

n = 0
for f in glob.glob("*.html"):
    s = open(f, encoding="utf-8").read()
    s2 = pat.sub(new, s)
    if s2 != s:
        open(f, "w", encoding="utf-8").write(s2); n += 1
print(f"Updated {n} files -> {new}/og-image.png")

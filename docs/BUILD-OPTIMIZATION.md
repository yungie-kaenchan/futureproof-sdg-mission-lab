# Build Optimization — Production Readiness

Quick wins to apply before pilot launch. None are blocking the SPU submission demo, but they substantially improve perceived performance and Lighthouse scores.

---

## 1. Subset Material Symbols Rounded (14.9 MB → ~300 KB)

> **Implementation note (May 2026):** `pyftsubset` with the obvious flag combos drops some glyph IDs that the ligature substitution table references, so a few icons (`edit`, `bookmark`, `arrow_forward`, `add`) silently disappear in the local subset even though they're listed in `--text=`. The recipe below produces a 303 KB woff2 — workable for production — but **we recommend using Google Fonts' CDN-hosted subset** (which their server-side tooling handles correctly) and keeping the local TTF as a fallback for offline dev.
>
> **Production-ready alternative — recommended:**
>
> ```html
> <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
> ```
>
> Google's server delivers a properly subsetted variable font with full glyph coverage and gzip transport.

The full variable font ships with ~3,500 glyphs. The platform uses ~30. Subsetting drops the icon font from **14.9 MB to <100 KB** with no visible change.

### Recipe (one-time, ~10 minutes)

```bash
# 1. Install fonttools (Python 3)
pip install fonttools brotli

# 2. List the icons we use
cat > /tmp/used-icons.txt <<'EOF'
visibility translate rocket_launch biotech gavel auto_awesome
edit_note forum dashboard search support_agent storefront
mic add edit save bookmark close arrow_back arrow_forward
expand_more check filter_alt help target person_add share
celebration map home star translate group military_tech
cloud_done radio_button_unchecked
EOF

# 3. Subset: keep only those glyphs + their ligatures
pyftsubset \
  assets/fonts/MaterialSymbolsRounded.ttf \
  --output-file=assets/fonts/MaterialSymbolsRounded.subset.woff2 \
  --flavor=woff2 \
  --layout-features='*' \
  --glyph-names \
  --symbol-cmap \
  --legacy-cmap \
  --notdef-glyph \
  --notdef-outline \
  --recommended-glyphs \
  --name-legacy \
  --drop-tables= \
  --name-IDs='*' \
  --name-languages='*' \
  --text="$(cat /tmp/used-icons.txt | tr '\n' ' ')"

# 4. Update @font-face in src/input.css to point at the subset
```

After step 4, change [src/input.css](../src/input.css) lines 6–13:

```css
@font-face {
  font-family: 'Material Symbols Rounded';
  font-style: normal;
  font-weight: 100 700;
  font-display: block;
  src: url('/assets/fonts/MaterialSymbolsRounded.subset.woff2') format('woff2-variations');
}
```

`woff2` compression typically halves the size again. End result: **~80 KB** for all icons we use, served once with HTTP cache.

If you add new icons later, regenerate the subset by adding their names to `/tmp/used-icons.txt` and re-running step 3.

---

## 2. Use `font-display: swap` for body fonts

Already applied via the Google Fonts `&display=swap` URL parameter — no action needed. This means body text shows immediately in fallback (system-ui) and swaps to Google Sans Display / Google Sans Text when the network font lands.

For Material Symbols, we use `font-display: block` (≈3 sec block period) intentionally — icons are meaningless without the font, so a brief blank slot is preferable to seeing literal text like "rocket_launch".

---

## 3. SST self-hosted (when license is in place)

`SST` is listed first in every font-family stack but is currently a soft fallback (Google Sans wins because most machines don't have SST installed). When you have the licensed font files:

```bash
mkdir -p assets/fonts
cp /path/to/SST-Roman.woff2 assets/fonts/SST.woff2
cp /path/to/SST-Bold.woff2 assets/fonts/SST-Bold.woff2
```

Then add to the top of [src/input.css](../src/input.css):

```css
@font-face {
  font-family: 'SST';
  src: url('/assets/fonts/SST.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'SST';
  src: url('/assets/fonts/SST-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}
```

No CSS class changes needed — every rule already lists `'SST'` first.

---

## 4. Image-slot lazy loading

When you generate the AI graphics for the slots in `docs/screenshots/README.md`, add `loading="lazy"` and explicit width/height to every `<img>`:

```html
<img src="/assets/ai/hero-feature.png" loading="lazy" width="1600" height="900" alt="" />
```

Same for `srcset` if you ship multiple resolutions. Lighthouse scores: this single change typically adds 5–8 points to Performance on cold load.

---

## 5. CSS subset (Tailwind purge)

Tailwind already purges unused classes via the `content` glob in [tailwind.config.js](../tailwind.config.js). Verify by checking the production build:

```bash
npm run build
ls -lh styles.css        # expect <50 KB minified
gzip -c styles.css | wc -c   # expect <12 KB after gzip
```

If the file is much larger, audit `content:` to ensure it covers all `pages/`, `src/`, and `index.html` but excludes `node_modules`.

---

## 6. Lighthouse pass before submission

Run from a deployed Netlify URL (not localhost — local serves don't compress):

```bash
npx lighthouse https://futureproof.yungie.one --view --preset=desktop
npx lighthouse https://futureproof.yungie.one --view --preset=mobile
```

Targets: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 90+.

Common findings to expect on first run:

- **CLS (Cumulative Layout Shift)** — fix by adding `width`/`height` to every `<img>` and `aspect-ratio` to every `.slot`. Both already done in the codebase; CLS should be ~0.
- **LCP (Largest Contentful Paint)** — usually the hero `<h1>`. Already plain text, so ~1 s.
- **TBT (Total Blocking Time)** — should be near zero; we don't ship any heavy JS bundles.
- **Render-blocking resources** — Google Fonts CSS is render-blocking. Mitigate via `<link rel="preload" as="style" ... onload="this.rel='stylesheet'">`. Optional; only matters if the score is below target.

---

## 7. Asset budget targets

| Asset | Target gzipped size | Notes |
|---|---|---|
| `index.html` | < 8 KB | Mostly text |
| `styles.css` | < 12 KB | Tailwind-purged |
| Material Symbols subset | < 30 KB | After step 1 |
| Each Google Sans weight | ~25 KB | Lazy-loaded by browser |
| Hero AI graphic | < 200 KB | WebP preferred |
| Per-mission scenario JSON | < 4 KB | Already structured this way |

Total first-paint payload should land at **<150 KB gzipped** for the landing page.

---

## When to do each

| Item | When |
|---|---|
| §1 Material Symbols subset | Before first deploy — biggest single saving |
| §2 font-display | Already done |
| §3 SST self-host | Whenever the SST license is in place |
| §4 Image lazy loading | When AI graphics are generated and dropped into `/assets/ai/` |
| §5 CSS subset verification | Every deploy |
| §6 Lighthouse pass | Day 17 / Day 19 / Day 20 |
| §7 Asset budget audit | Day 19 final review |

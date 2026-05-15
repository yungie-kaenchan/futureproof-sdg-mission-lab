# Landing Page Background Image Assets

This directory holds the full-bleed background image for the FUTUREPROOF
entry portal (`/sandbox/redesign-preview/landing.html` and eventually
`/pages/index.html`).

## Files expected here

| Filename                       | Dimensions   | Aspect | Used on        | File size target |
|--------------------------------|--------------|--------|----------------|------------------|
| `bg-landing-desktop.webp`      | 1920 × 1080  | 16:9   | ≥ 1441px wide  | 220–320 KB       |
| `bg-landing-tablet.webp`       | 1440 × 900   | 16:10  | 769–1440px     | 160–230 KB       |
| `bg-landing-mobile.webp`       | 828 × 1792   | 9:19.5 | ≤ 768px        | 110–170 KB       |

(Optional: provide `.avif` versions at the same names + paths for even
smaller payloads on modern browsers; the picture element already prefers
WebP, AVIF would require one additional `<source type="image/avif">`.)

## How the picture element picks these up

`landing.html` references these exact paths via a `<picture>` element with
three `<source>` queries — no code changes required after dropping files in.
The viewport size determines which file loads:

- Mobile (≤ 768px) → `bg-landing-mobile.webp`
- Tablet (769–1440px) → `bg-landing-tablet.webp`
- Desktop (≥ 1441px) → `bg-landing-desktop.webp`

If a file is missing for a given breakpoint, the browser falls back to the
default `<img>` source (desktop). If ALL files are missing, the page
gracefully shows its fallback gradient + starfield instead.

## Workflow

1. Generate the image using `PROMPT.md` in this same directory (paste into
   ChatGPT Image 2.0 / GPT Image / equivalent).
2. Pick the best of the 4 generated variations.
3. Upscale to 4K master via Magnific.ai or Topaz Gigapixel AI.
4. Export three sizes using your image editor or Squoosh.app:
   - 1920 × 1080 (desktop)
   - 1440 × 900 (tablet)
   - 828 × 1792 (mobile portrait — separately generated or cropped)
5. Convert each to WebP at quality 82–85.
6. Drop the three files into this directory with the exact filenames
   above.
7. Open `/sandbox/redesign-preview/landing.html` — the image fades in
   automatically, the placeholder badge disappears.
8. Inspect the three overlay zones (DevTools → `.bg-overlay`) and tune
   the opacity values if needed for your specific image.

## Tuning the overlay (after the image lands)

The overlay is defined in `landing.html` under `.bg-overlay`. Three zones:

```css
background:
  /* Top band — for SDG colour bar + SYSTEM mark */
  linear-gradient(180deg,
    rgba(5, 13, 31, 0.55) 0%,   /* ← tune higher if top text is unreadable */
    rgba(5, 13, 31, 0.20) 18%,
    transparent 28%),
  /* Center spotlight — vignette behind the FUTUREPROOF wordmark */
  radial-gradient(ellipse 70vw 60vh at 50% 52%,
    rgba(5, 13, 31, 0.62) 0%,   /* ← tune higher if wordmark doesn't pop */
    rgba(5, 13, 31, 0.40) 45%,
    transparent 72%),
  /* Bottom band — for footer legibility */
  linear-gradient(180deg,
    transparent 70%,
    rgba(5, 13, 31, 0.55) 88%,  /* ← tune higher if footer text is unreadable */
    rgba(5, 13, 31, 0.82) 100%);
```

Typical tune: ±0.10 on any value. If your final image has very dark areas
where text sits, dial these DOWN. If it has bright golden areas, dial UP.

## Production deployment note

When this design migrates from sandbox into `/pages/index.html`, the
relative paths in the picture element need to update from
`../../assets/landing/...` to `/assets/landing/...` (absolute path,
served from web root). The Netlify build serves the assets directory at
the root automatically — no extra config needed.

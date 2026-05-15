# Landing Page Background Image — Generation Prompt

**Target tool:** ChatGPT Image 2.0 (GPT Image) — works equivalently in
Midjourney v6+ and Google Gemini Imagen 3.

**Aspect ratio:** 16:9 widescreen (1792 × 1024 or higher).
**Quality:** Maximum / highest setting.
**Output format:** PNG or high-quality JPG, then converted to WebP for production.

---

## ⭐ PRIMARY PROMPT — Direction A · "The Connected Figure"

Paste this verbatim into ChatGPT Image 2.0. Generate 4–6 variations.

```
A cinematic, high-fashion editorial photograph for a sustainability-themed
educational platform landing page. 16:9 widescreen aspect ratio. Ultra-high
resolution suitable for 2K-4K display. Photographed, not illustrated.

SUBJECT: A young Thai person, gender-neutral, mid-twenties, photographed
in soft three-quarter profile. The figure is positioned in the left third
of the frame, eyes closed or gazing peacefully toward a distant horizon
of golden light. Their expression conveys quiet determination and
contemplation — neither smiling nor sombre. Skin is rendered with
natural warmth. The figure wears a contemporary minimal garment in
off-white or warm linen, no logos, no patterns. Hair is dark and softly
lit at the edges by rim light.

COMPOSITION: Wide cinematic frame. The figure occupies the left third
(rule of thirds, left vertical). The right two-thirds of the frame is
a soft, slightly out-of-focus expanse — atmospheric and visually quiet —
leaving clean negative space for a large title overlay. The center
contains drifting dust motes catching directional light.

SDG INTEGRATION: A delicate holographic aurora arcs across the upper
edge of the frame, descending gently toward the horizon. The aurora is
NOT a literal logo or wheel — it is atmospheric light that subtly
contains a prismatic gradient of the seventeen UN SDG colors
(turquoise, red, green, yellow, blue, orange, violet, magenta)
softened and diffused like northern lights. The aurora feels
meteorological, not graphic. It suggests interconnection without
naming it.

LIGHTING: Editorial high-fashion lighting reminiscent of Annie Leibovitz
or Paolo Roversi. Strong warm golden-hour rim light from the right side
catching the figure's silhouette. Soft fill shadow on the left of the
face. Chiaroscuro contrast with deep navy shadows. Shallow depth of
field — the subject is critically sharp, the background diffuses into
bokeh.

MOOD: Reverent, hopeful, contemplative. A still from a slow, beautiful
film about human flourishing. Restraint over spectacle. The photograph
should feel like it could hang in a museum, not on a billboard.

PALETTE: Dominated by deep navy and warm bronze, with bone-white skin
tones. The seventeen SDG colors appear ONLY within the aurora overlay,
softened into atmospheric light. The image as a whole reads as
monochrome-warm with prismatic accents.

TEXTURE: Subtle film grain consistent with a high-end medium-format
camera. Atmospheric haze in the mid-ground. The image should feel
photographed on Kodak Portra or Fujifilm GFX, not digitally rendered.
```

## UNIVERSAL NEGATIVE PROMPT — append to any direction

```
AVOID: UN logo, literal SDG color wheel, infographics, icons, graphic
design elements, flag imagery, text, words, numerals, watermarks,
corporate stock photo aesthetic, smiling-at-camera handshake imagery,
multiple-people-forming-a-circle unity cliché, oversaturated neon
colors, cartoon, anime, illustration, 3D render, AI artifacts on hands,
clutter in the center of the frame, vignettes that draw attention to
the center.
```

---

## 🔁 ALTERNATE DIRECTION B — "The Sustainable Vista" (landscape-led)

Use if you'd rather not feature a human subject.

```
A cinematic landscape photograph at golden-hour dawn over a Thai rice
terrace in the Northern highlands. 16:9 widescreen. Mist rolls between
the terraces, catching warm directional light. In the upper third of
the frame, a delicate aurora arcs across the sky — a soft prismatic
gradient subtly containing the 17 UN SDG colors as atmospheric light,
never as a literal logo. The lower third is darker, anchoring the
composition. Empty center for headline overlay. Slow film still
aesthetic, shot on medium-format, deep depth of field, slight grain.
Reverent and quiet. Style: Sebastião Salgado meets Murray Fredericks.
No people, no text, no infographic elements.
```

## 🔁 ALTERNATE DIRECTION C — "Hands Holding Light" (most minimal)

Most abstract; easiest to handle with text overlay.

```
A close-up editorial photograph of two cupped hands of indeterminate
ethnicity holding a soft sphere of refracted light. 16:9 widescreen.
The light within the hands fractures into a delicate prismatic gradient
containing the 17 UN SDG colors, but the colors are atmospheric and
diffused, not graphic. The hands are positioned in the lower-left third
of the frame. The background is a soft deep-navy void with subtle dust
motes catching directional light. Shallow depth of field, high-fashion
editorial lighting, the style of Hermès or Loewe campaign photography.
Skin tone neutral and warm. No skin imperfections retouched out — film
realism preserved. Reverent, minimal, gallery-grade. No text, no logos.
```

---

## 📱 MOBILE PORTRAIT VERSION

For best mobile rendering, generate a SECOND image at 9:16 portrait.
Re-use the same direction (A/B/C) but swap these lines into the prompt:

**Replace** `16:9 widescreen aspect ratio` →
`9:16 portrait aspect ratio for mobile display, suitable for 1080×1920`

**Replace** `figure occupies the left third` →
`subject occupies the lower third, with upper two-thirds reserved for headline overlay; aurora arcs across the upper edge`

**Replace** any horizontal composition direction with vertical equivalent.

If you skip this step, the desktop 16:9 image will be auto-cropped to
portrait on mobile via `object-position: 30% center` — acceptable but
not optimal.

---

## OUTPUT SPECIFICATIONS

| Step | Tool | Output |
|---|---|---|
| 1. Generate | ChatGPT Image 2.0 | 4× variations at maximum quality, 16:9 |
| 2. Pick | Manual selection | The one with cleanest center negative space + no AI hand artifacts + readable aurora |
| 3. Upscale | Magnific.ai or Topaz Gigapixel AI | 3840 × 2160 master |
| 4. Export desktop | Photoshop / Affinity / Squoosh | 1920 × 1080 |
| 5. Export tablet | Same | 1440 × 900 |
| 6. Export mobile | Generate 9:16 separately OR rely on object-position crop | 828 × 1792 |
| 7. Convert to WebP | [Squoosh.app](https://squoosh.app) | Quality 82–85 |
| 8. Drop in | This directory | `bg-landing-desktop.webp` · `bg-landing-tablet.webp` · `bg-landing-mobile.webp` |

## QA CHECKLIST (before committing)

Before you save the image as final, scroll through these:

- [ ] **Center is quiet** — the area where "FUTUREPROOF" will sit is not
      visually busy. Squint at the image; the center should feel like
      negative space.
- [ ] **No literal SDG iconography** — no logo, no wheel, no flag, no
      letters or numerals visible anywhere.
- [ ] **Hands and faces** (if present) — no AI distortion. Extra fingers,
      melted features, doubled eyes are all hard fails — regenerate.
- [ ] **Subject ethnicity reads as Thai or pan-Asian** — without leaning
      into stereotype (no overt traditional dress, no folkloric props).
- [ ] **Aurora reads as light** — not as graphic. If it looks like a
      rainbow stripe, it's too saturated; regenerate.
- [ ] **Contrast** — drop a black "FUTUREPROOF" placeholder over the
      center in Photoshop. Can you read it? Cross-check the overlay
      values will compensate if not.
- [ ] **Mood** — does this feel like a slow film still, or a corporate
      stock photo? If the latter, regenerate.

---

## TONING THE OVERLAY AFTER THE IMAGE LANDS

The CSS in `landing.html` defines a three-zone gradient overlay. Once
your real image is in place, you'll likely want to tune one or two of
the opacity values. See `README.md` in this directory for the full
tuning table.

---

*This prompt was generated for FUTUREPROOF: SDGs Mission Lab — a
Mahidol University faculty-led project. Image generation should comply
with the Creative Commons BY-NC-ND license terms documented in the
landing page footer and the platform's PDPA framework.*

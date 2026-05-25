# FUTUREPROOF — A4 Competition Poster · Image-Generation Brief

> **Purpose** A single comprehensive prompt — written as an art-direction
> brief — to generate the A4 infographic poster required by the SPU
> *Tech Creative Learning Awards 2569* competition (deadline 31 May 2026,
> finals 14 June 2026). The poster contributes to the 20 % "เอกสาร
> ประกอบ" rubric weight in the selection round and is the first artefact
> judges see, so it shapes perception of the other five criteria as well.
>
> **Author** Dr. Payungsak Kaenchan · Faculty of Liberal Arts ·
> Mahidol University.
>
> **Target output** A4 portrait (210 × 297 mm) · print-ready · 600 DPI
> (≈ 4 960 × 7 016 px) · PDF/X-1a or PNG · file size ≤ 10 MB.

---

## 0 · Realistic production workflow (read this first)

No current image-generation model will render 40+ text snippets without a
misspelling. The professional workflow is **split-track**:

1. **Track A — Visual canvas (image-gen)**. Use the master prompt below in
   Midjourney v7 / Ideogram 3 / Recraft Pro / Flux Pro to generate the
   *background, illustrations, colour treatment, decorative elements, the
   Thailand-map zone, the SDG iconography, the 5-stage arc as visual
   shapes, the framework badges as graphical chips* — with **placeholder
   text rendered loosely** (the model will get most short headlines right,
   especially Ideogram).
2. **Track B — Typesetting (vector editor)**. Open the AI output in
   Affinity Publisher / Figma / Adobe InDesign / Adobe Illustrator. Add
   the **final, accurate text** as live text on top of the AI image. Use
   the project's brand fonts (Cormorant Garamond + Cinzel + DM Sans +
   JetBrains Mono). Add the QR code, the Mahidol affiliation lockup, and
   the version stamp.
3. **Track C — Upscale to print**. Run the composite through Magnific.ai
   Premium or Topaz Gigapixel at 2× — that lifts a 2 048 × 2 900 px AI
   image to ~ 4 096 × 5 800 px (~ 500 DPI on A4, well above the 300 DPI
   print floor). Export PDF/X-1a with CMYK conversion if printing
   professionally; otherwise PNG @ 600 DPI for digital submission.

**If you only have time for one shot**, use *Ideogram 3 (Magic Prompt OFF,
Style: Design)* with the master prompt. Ideogram is the only current model
that reliably renders multi-word headline text in correct spelling, and
it natively understands "infographic poster" composition. Output 2K, then
upscale 2 × in its built-in upscaler. Touch up any misspellings in
Affinity Publisher.

---

## 1 · Master prompt (paste this into your model)

> Copy from the line below through the `--negative` block at the bottom.
> Wrapped here for readability — when pasting into a model with a single
> input field, you may flatten the line breaks (Midjourney) or keep them
> (Ideogram, DALL·E 3, Recraft tolerate paragraphs).

```
A museum-grade A4 portrait infographic poster for an academic
education-innovation competition, art-directed in the style of a
National Geographic / The New York Times / Monocle magazine
double-page editorial spread. Aspect ratio 210:297 (A4 portrait).
Print-ready. Vector-clean. Magazine-quality typographic hierarchy.

— Subject —
The poster presents "FUTUREPROOF — SDGs Mission Journey", an
AI-scaffolded English-language learning platform for Thai
undergraduates. Created by Dr. Payungsak Kaenchan, Faculty of
Liberal Arts, Mahidol University. The platform sends learners on
six adaptive missions across Thailand, each anchored to a
United Nations Sustainable Development Goal, culminating in a
"Voice for Change" capstone proposal addressed to a real Thai
audience.

— Overall mood —
Editorial elegance meets mission-control gravitas. Hand-illustrated
yet precise. Warm cream paper background, ink-dark typography,
restrained gold and crimson accents, deep teal and watercolor blues
for the Thailand map. The feeling is that of a serious cultural
quarterly — calm, confident, intellectual — not a corporate
brochure, not a children's textbook. It should look like something
you would frame.

— Composition · seven horizontal zones, top to bottom —

ZONE 1 (top ~14% of canvas) — MASTHEAD STRIP.
A thin gold horizontal hairline at the very top. Underneath, in a
generous-leading display serif (Cormorant Garamond Light feel), the
project wordmark "FUTUREPROOF" set in ink-black, all caps, wide
letter-spacing. Directly beneath, a slim subtitle in copperplate-style
caps reading "SDGs MISSION JOURNEY". To the right, a small editorial
slug in monospace: "TECH CREATIVE LEARNING AWARDS · VOL. 01 · 2026".
Centered under the wordmark, the English tagline in italic serif:
"Where English Meets the World's Most Urgent Challenges". Below the
tagline, a single line of byline type: "By Dr. Payungsak Kaenchan ·
Faculty of Liberal Arts · Mahidol University". End the zone with a
second gold hairline.

ZONE 2 (~6%) — VALUE PROPOSITION RIBBON.
A single-row band of six small pill-shaped "framework chips" rendered
as letterpress-style tags in muted ink-on-cream: "PICRAT", "AI-TPACK",
"BLOOM'S TAXONOMY", "CAST UDL 3.0", "CEFR", "UNESCO ESD". Each chip
has a tiny gold dot bullet to its left. The chips are evenly spaced
and visually weightless — they read as taxonomy, not buttons.

ZONE 3 (~32% of canvas, the dominant focal area) — THE MAP.
A large hand-illustrated watercolor-and-ink map of Thailand,
identical in style to a vintage botanical-naturalist map: warm cream
paper, light teal sea, hand-drawn topographic shading, ink
contour-lines for rivers (Chao Phraya, Mekong), subtle pastel
region-tinting. The country is divided into six tinted regions,
each pinned with a numbered amber-glow marker (1–6). Around the
map, six elegant call-out blocks (three on each side, connected to
the pins by thin ink ribbons) label the missions in this exact
order, exact text, with their SDG number in a small monospace tag:

  1 · NORTH         The Burning Season         SDG 13 CLIMATE
  2 · NORTHEAST     The Aquifer Below          SDG 6  WATER
  3 · CENTRAL       The Klong and the City     SDG 11 CITIES
  4 · WEST          The Children at the Border SDG 4  EDUCATION
  5 · EAST          The Village Left Behind    SDG 3  HEALTH
  6 · SOUTH         The Reef and the Tide      SDG 14 OCEAN

Each call-out is set in small sans-serif caps for the region, then
a serif italic for the mission name, then a tiny monospace tag for
the SDG. The map should feel like the centerpiece of the poster —
a hero illustration, not a diagram. A subtle compass-rose in the
upper-right corner of the map. A thin scale-bar. Light pencil
hatching where the regions meet. The mood is that of an old
expedition map redrawn for a modern editorial.

ZONE 4 (~12%) — THE FIVE-STAGE MISSION ARC.
Underneath the map, a horizontal band shows a five-step process
arc reading left-to-right with elegant ink arrows: "BRIEF ▸ PROBE ▸
DECIDE ▸ ACT ▸ DEBRIEF". Each step has a small editorial icon
above it — a magnifying glass, an open dossier, a balanced scale,
a megaphone, a reflective mirror — rendered in single-weight
ink-line illustration, no fill, no gradient. Below each step a
3-word teacher-facing micro-description in small caps:
"ABSORB THE SITUATION · QUESTION THE SOURCES · CHOOSE UNDER
TRADE-OFF · COMMUNICATE THE DECISION · REFLECT ON CONSEQUENCE".
A small Bloom-taxonomy badge under each step ("REMEMBER",
"ANALYZE", "EVALUATE", "APPLY", "METACOGNITION").

ZONE 5 (~12%) — THE THREE LEARNING THEORIES TRIPTYCH.
A three-column triptych, framed by a single hairline gold border.
Column headings in small caps: "BEHAVIORISM · พฤติกรรมนิยม",
"COGNITIVISM · ปัญญานิยม", "SOCIAL CONSTRUCTIVISM · การสร้างความรู้
เชิงสังคม". Under each heading, a 3-bullet feature mapping in
condensed sans, e.g. under Behaviorism: "Insight Token Economy ·
AI Judges Formative Feedback · Adaptive Reading Tiers". Use a
distinct subtle background tint per column (warm sand · cool
parchment · pale teal). A tiny portrait-medallion at the top of
each column showing a stylized woodcut-style profile silhouette of
the theorist trio (Skinner / Bruner / Vygotsky) — line-engraving
style, not photographic.

ZONE 6 (~12%) — AI-ENHANCED FEATURES & FOUR-TIER JUDGING.
Split into two side-by-side panels of equal width:

  Left panel — "AI-ENHANCED FEATURES" header in small caps. Four
  feature rows, each with a tiny vector glyph and a one-line label
  in serif italic:
    · Mr Compass — Socratic Field Mentor
    · AI Judges — Real-Time Formative Feedback
    · Voice for Change — Multimodal Capstone Studio
    · Hall of Voices — Public Community Gallery

  Right panel — "FOUR-TIER HYBRID JUDGING" header. A four-tier
  vertical ladder diagram, each tier with a one-word label and a
  small italic descriptor:
    Tier 1 · AI Judges · formative, every decision
    Tier 2 · Peer Judges · cross-team rubric review
    Tier 3 · Teacher Judges · summative, authoritative
    Tier 4 · External Judges · authentic audience
  And beside it, four small folded-document icons representing
  Rubrics A · B · C · D.

ZONE 7 (~12%) — FOOTER STRIP.
A bottom band with a thin gold hairline above. From left to right:
  · A small QR-code reservation rectangle, ink-bordered, labelled
    "SCAN · WATCH THE DEMO ON YOUTUBE". Leave this as a clean white
    rectangle 28 × 28 mm so a real QR can be placed in vector edit.
  · A short three-line block:
       "Faculty of Liberal Arts · Mahidol University"
       "Course: LALA109 — English for Digital Communication Skills"
       "futureproof-sdgs-lab.netlify.app"
  · A right-aligned credit stack:
       "Innovation submitted to SPU Tech Creative Learning Awards 2569"
       "Dr. Payungsak Kaenchan · payungsak.kae@mahidol.ac.th"
       "Version 1.0 · May 2026"

— Colour palette (use these exact hex values, no others) —
Background (paper)          #FDFBF6
Ink (body type, hairlines)  #0A0A0B
Gold accent (rules, dots)   #C9A961
Crimson accent (key marks)  #7B1B1B
Pale parchment (panel tint) #F4F1EA
Teal-ink (map sea)          #1F3E4A
Watercolor blue (rivers)    #6F8EA8
Sandstone (north region)    #D9B98A
Olive (northeast)           #9CA66F
Soft rose (central)         #C9A09E
Warm peach (west)           #E0B68C
Pale moss (east)            #B6BF93
Aqua mist (south sea)       #A8C6CC

— Typography hierarchy (specify as visual style references) —
Display headlines: a humanist transitional serif in the spirit of
  Cormorant Garamond Light — generous tracking, hairline strokes,
  high contrast.
Capital small-caps subheads: an inscribed Roman capital in the
  spirit of Cinzel Regular — restrained, ceremonial.
Body type: a modern geometric humanist sans in the spirit of
  DM Sans Regular — open apertures, calm, neutral.
Data tags, monospace labels: a slab-mono in the spirit of
  JetBrains Mono — for SDG numbers, version stamps, taxonomy slugs.

— Iconography rules —
All icons single-weight ink-line, monoline, no fills, no gradients,
no drop shadows. Engraving-style detail where flourish is needed
(small hatching, no painterly rendering). Each icon sits inside an
invisible 16 × 16 mm bounding box for grid alignment.

— Lighting / texture —
The whole poster should feel like beautifully printed paper, not a
screen render. Subtle paper-grain texture across the cream
background. A faint vignette on the very outer edges. No glow,
no neon, no synthwave, no cyberpunk, no chrome, no 3D-render look.
Hand-illustrated where illustrated, typographically set where set.

— Hierarchy &amp; legibility —
The hero takeaway — "FUTUREPROOF · SDGs MISSION JOURNEY" — must be
the most prominent element on the canvas, readable from 1.5 m away.
The Thailand map must be the second-most-prominent element. Then
the five-stage arc. Then the triptych and feature panels. Every
piece of text on the poster must be at least 7 pt at A4 print size
(no smaller). Headlines at least 36 pt. Letter-spacing on all-caps
treatments at least 100 units.

— Composition principles —
Modular grid, six columns × twelve rows. Generous white space (or
rather, cream-space) — at minimum 12 mm exterior margin and 6 mm
between zones. The poster should breathe. Use hairline gold rules
to separate zones, not heavy boxes. Asymmetric balance over rigid
symmetry. Reading flow top-down, with the map as the visual anchor
point.

— Content fidelity rules (very important) —
1. Spelling: every English word must be spelled correctly. The
   project name is "FUTUREPROOF" (one word, all caps). The course
   code is "LALA109". The author is "Dr. Payungsak Kaenchan". The
   institution is "Faculty of Liberal Arts, Mahidol University".
2. No invented brand logos, no fictitious trademark marks, no
   recognisable corporate emblems (no Google, Anthropic, OpenAI,
   Microsoft, Adobe, etc.).
3. The 17 official SDG colour swatches are referenced only by their
   number tag (e.g. "SDG 13") — do not redraw the SDG wheel.
4. No real human portraits. The theorist medallions are stylized
   woodcut silhouettes, not likenesses.
5. No watermark, no Lorem Ipsum, no placeholder gibberish text.
6. Thailand's borders must be correct — no missing southern
   peninsula, no fictional islands, no fabricated provinces.
7. The poster must read as a single coherent editorial spread, not
   a collage of unrelated panels.

— Technical render specs —
Aspect ratio 210:297 (A4 portrait).
Native render at the model's maximum portrait resolution.
Style: editorial infographic; vector-clean; print-ready.
No motion blur, no chromatic aberration, no lens flare.
sRGB colour space at generation; convert to CMYK at print.

— Style references the model should evoke —
National Geographic Atlas plates (1990s); The New York Times
Op-Docs static graphics; Monocle quarterly editorial spreads;
hand-illustrated Penguin Books classic covers; Edward Tufte
Visual Display of Quantitative Information; the cartography of
Jerry Brotton; the layouts of Massimo Vignelli; the colour
restraint of Jan Tschichold's Penguin redesign; the precision of
Otl Aicher's Munich 1972 wayfinding.

— Negative prompt (what NOT to include) —
--negative: cartoonish, chibi, anime, manga, 3D render, plasticky
shading, neon glow, synthwave, cyberpunk, holographic, gradient
mesh, lens flare, motion blur, watermark, Shutterstock logo,
Getty Images mark, Adobe Stock badge, copyrighted brand emblem,
celebrity face, photoreal human portrait, AI-generated face,
deformed hand, lorem ipsum, gibberish text, misspelled words,
crooked letters, drop shadow, photo-realistic skin, comic-book
halftone, sticker style, kawaii, low-resolution, pixelated, blurry,
JPEG compression artifact, watercolour splash that obscures text,
overlapping text, illegible micro-type, fictional Thailand border,
missing Phuket, missing Andaman, distorted map.
```

---

## 2 · Model-specific adapter notes

### Midjourney v7
- Append `--ar 210:297 --v 7 --stylize 200 --quality 2`.
- Upload the existing `assets/journey/thailand-map.png` as a **character
  reference**: `--cref <URL> --cw 80` so the map style remains consistent
  with what's already in the platform.
- Use `--no` for the negative list instead of `--negative`.
- Use `/imagine` then upscale (U2/U3) for the variant you like, then
  upscale again with `--upbeta`.

### Ideogram 3 (recommended for one-shot use)
- Set **Style** = "Design"; **Aspect ratio** = "2:3" (closest to A4);
  **Magic Prompt** = OFF; **Rendering** = "Quality".
- Ideogram is the *only* current model that consistently renders
  multi-word English headlines without misspelling, so leave the exact
  text in the prompt as written.
- Use the **Reference image** slot for `thailand-map.png` to anchor the
  cartographic style.

### Recraft V3 (best for vector-clean infographic look)
- Style preset: "Vector Illustration" → "Infographic".
- Recraft outputs SVG-clean lines and is unusually good at typographic
  layouts. The trade-off: less painterly. If you want the map to feel
  watercolor and the rest of the poster to feel vector, generate them
  separately and composite.

### Flux Pro 1.1 (via Replicate / Together)
- Set width:height = 1600 × 2263 (the largest portrait-A4-ratio Flux
  produces in one pass).
- Flux's strength: photorealistic textures (the paper-grain feel).
  Weakness: text. Plan on doing all final text in Affinity Publisher.

### DALL·E 3 (via ChatGPT)
- Has the cleanest editorial sensibility but lowest resolution (1024 ×
  1792). Use only for *visual exploration* — generate three concept
  variants, pick a direction, then redo in Ideogram or Midjourney for
  final.

---

## 3 · Sourcing the QR code

The competition requires a QR code in the poster linking to the demo
video on YouTube. Steps:

1. Upload the demo video to YouTube (`unlisted` visibility is fine —
   the QR will still resolve).
2. Generate the QR with foreground = `#0A0A0B` (ink), background =
   `#FDFBF6` (paper), error-correction level **H** (highest, for print
   reliability), at least 600 × 600 px. Use **qrcode-monkey.com** or
   the Python `qrcode` library.
3. In the vector composite, place the QR inside the reserved white
   28 × 28 mm rectangle in Zone 7. Add the SCAN label below.

```python
# Optional: generate the QR in Python
import qrcode
img = qrcode.make("https://youtube.com/watch?v=XXXX",
                  error_correction=qrcode.constants.ERROR_CORRECT_H,
                  box_size=20, border=2)
img.save("docs/poster/futureproof-demo-qr.png")
```

---

## 4 · Why this design beats the rubric

The selection-round rubric weights are: 10 % rationale · 10 % objectives ·
20 % method · 20 % strengths · 20 % benefits & future expansion · 20 %
documentation (where the poster lives). The poster cannot directly
*claim* 100 %, but it can *visually surface* every criterion so the
judges register them at a glance:

| Rubric criterion | What the poster carries that scores it |
|---|---|
| 1. Rationale (10%) | Zone 2's framework chips (PICRAT · AI-TPACK · CAST UDL · CEFR · UNESCO ESD) instantly signal "this is theoretically grounded" |
| 2. Objectives (10%) | Hero tagline "Where English Meets the World's Most Urgent Challenges" + Zone 5 triptych declare the three-school theoretical aim |
| 3. Method (20%) | Zone 4's BRIEF→PROBE→DECIDE→ACT→DEBRIEF arc visualises the *process*, the single most asked-about element by judges |
| 4. Strengths (20%) | Zone 6's "AI-Enhanced Features" panel + "Four-Tier Hybrid Judging" ladder show what makes this distinct from a generic ed-tech tool |
| 5. Benefits & expansion (20%) | The map itself argues "this works for six different Thai contexts and can extend to all 17 SDGs"; the Hall of Voices line gestures to community impact |
| 6. Documentation (20%) | This *is* the artifact — magazine-quality execution carries the criterion on its own |

Every zone of the poster is doing rubric work. None of it is
decoration.

---

## 5 · Iteration / regeneration tips

- **First generation will not be perfect.** Plan on 4–6 iterations.
- After each generation, ask yourself the three judge questions in
  order: (a) Can I find the Thailand map within 1 second? (b) Can I
  read FUTUREPROOF from 1.5 m away? (c) Is the five-stage arc legible
  at A4 print size? If any answer is no, re-roll.
- Common failure mode: model fills the canvas edge-to-edge. Re-prompt
  with "generous exterior margin, 12 mm cream-paper border on all
  sides".
- Common failure mode: cartoon-style map. Re-prompt with "hand-drawn
  watercolor cartography in the style of a vintage National Geographic
  Atlas plate, no cartoon style".
- Common failure mode: model invents extra Thai provinces or merges
  Phuket into the mainland. Re-prompt with "accurate Thailand
  geography, southern peninsula intact, Phuket as island, Songkhla
  visible".
- Common failure mode: misspelled "FUTUREPROOF" → "FUTUREPROOOF" or
  "FUTUREPROFF". Move that text to Track B (vector layer) and re-prompt
  with "blank space reserved at top for headline".

---

## 6 · Final composite checklist before submission

- [ ] Output is A4 portrait (210 × 297 mm) at 300 DPI minimum.
- [ ] File size ≤ 10 MB (per competition rule).
- [ ] QR code resolves on a phone scan from 30 cm distance.
- [ ] "FUTUREPROOF — SDGs Mission Journey" appears exactly as the
      project name.
- [ ] "Dr. Payungsak Kaenchan · Faculty of Liberal Arts · Mahidol
      University" appears as creator.
- [ ] All English; no Thai script except in the optional Thai gloss on
      the three-theory headers in Zone 5.
- [ ] All 6 missions correctly listed (NORTH · NORTHEAST · CENTRAL ·
      WEST · EAST · SOUTH).
- [ ] All 6 SDG numbers correct (13 · 6 · 11 · 4 · 3 · 14).
- [ ] No trademark logos, no celebrity faces, no AI-deformed hands.
- [ ] No misspellings on inspection at 200 % zoom.
- [ ] Print-test on actual A4 paper before final submission. Hold it
      at arm's length and answer: "Would I stop at this poster in a
      gallery wall of 30?"

---

*End of brief.*

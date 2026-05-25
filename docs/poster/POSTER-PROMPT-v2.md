# FUTUREPROOF — A4 Competition Poster · v2 (Iceberg Composition)

> **Status** Re-designed prompt incorporating: the final submission docx
> content, the existing watercolor Thailand-map illustration, the website
> brand-design system (Mission Control × Editorial Elegance), and the
> two-half "iceberg" composition idea — what learners see above the line,
> what supports it below.
>
> **Target generators** ChatGPT (GPT-4o + DALL·E 3 / GPT Image 1) and
> Gemini (Imagen 3 / Imagen 4). Same master prompt with platform-specific
> adapter clauses at the end.
>
> **Output target** A4 portrait (210 × 297 mm) · 4K–8K resolution PNG
> after upscaling (~ 4 960 × 7 016 px @ 600 DPI is the print-ready floor).
>
> **Author** Dr. Payungsak Kaenchan · Faculty of Liberal Arts · Mahidol
> University.

---

## 0 · How to use this prompt (60-second workflow)

1. **Attach the reference image first.** In ChatGPT or Gemini, click the
   image-attachment icon and upload
   `/Users/yungie/futureproof-project/assets/journey/thailand-map.png`.
   This is *non-negotiable* — the prompt explicitly tells the model to
   match the map's watercolor-and-ink style for the upper half. Without
   the reference image, the model will invent a generic map and the
   brand-consistency claim breaks.

2. **Paste the master prompt** (§1 below) verbatim into the chat.

3. **For ChatGPT only:** append the adapter clause in §2.1.
   **For Gemini only:** append the adapter clause in §2.2.

4. **Generate.** First pass will be ~ 1024–2048 px on the longest edge.

5. **Upscale.** Run the result through Magnific.ai Premium (4×) or Topaz
   Gigapixel AI (4×) or Gemini's built-in upscale. Target ≥ 4 960 px on
   the long edge for print-quality A4.

6. **Quality-check.** Use the §5 checklist before saving as final.

If the first generation needs adjustment, use the iteration tips in §4 —
each common failure mode has a copy-paste re-roll clause.

---

## 1 · Master Prompt (paste verbatim, after attaching `thailand-map.png`)

> Copy from the line below through the end of §1. Wrapped here for
> readability; flatten line breaks if your model needs single-line input.

```
Create a single A4 portrait infographic poster, ultra-high resolution
(generate at the maximum native portrait size your model supports —
ideally 2048×2730 or larger), for an academic education-innovation
competition entry. The poster represents the project "FUTUREPROOF — SDG
Mission Journey" by Dr. Payungsak Kaenchan, Faculty of Liberal Arts,
Mahidol University. The attached image (thailand-map.png) is a reference
for the map illustration style you must match in the upper half.

— OVERALL COMPOSITION —
The poster has a deliberate "iceberg" composition with one thin gold
horizontal rule placed at exactly 55% from the top — splitting the
canvas into an upper 55% and a lower 45%. The two halves feel
architecturally connected but stylistically distinct:
  • UPPER 55% — warm, illustrated, gamified, mission-driven.
    Watercolor-and-ink map of Thailand, soft pastel regions, hand-drawn
    architectural icons. This is what learners see.
  • LOWER 45% — cooler, technical, diagrammatic, blueprint-like.
    Ink-line schematics, restrained color, monospace data tags. This is
    the pedagogical foundation that supports the upper half.
Do NOT draw an actual iceberg or ice. The metaphor lives in the
proportions and the visual register, not in a literal illustration.

— BACKGROUND —
Cream paper #FDFBF6 across both halves with a barely-visible paper-grain
texture. A thin gold #C9A961 horizontal hairline divides the halves. A
subtle blueprint-grid pattern (1mm spacing, 8% opacity, ink) overlays
only the lower 45%, reinforcing its technical register.

— UPPER HALF, top to bottom —

ZONE A (top ~8% of canvas) · MASTHEAD
A thin gold hairline at the very top of the page. Below it, centered:
  - The project wordmark "FUTUREPROOF" in a humanist transitional serif
    (style of Cormorant Garamond Light), all caps, ~ 110 pt, ink-black,
    wide letter-spacing (~ 0.05em). 
  - Directly below, in inscribed Roman caps (style of Cinzel Regular),
    smaller (~ 28 pt), gold #C9A961: "SDG MISSION JOURNEY"
  - One line below in italic serif (~ 14 pt), ink-dark #1F1F23:
    "Where English Meets the World's Most Urgent Challenges"
  - On the right edge, a small editorial slug in JetBrains Mono mono
    (~ 9 pt, gold): "Tech Creative Learning Awards · 2026"
  - On the left edge in same mono style: "Vol. 01 · Faculty of Liberal Arts"
  - Centered below the tagline, in DM Sans light (~ 12 pt):
    "By Dr. Payungsak Kaenchan · Faculty of Liberal Arts, Mahidol University"
A second gold hairline closes this zone.

ZONE B (next ~32% of canvas) · THE THAILAND JOURNEY (THE HERO ELEMENT)
The Thailand map from the attached reference image is centered here at
~ 55% of the zone width on the LEFT. Render the map in EXACTLY the
watercolor-and-ink style of the reference: cream paper, soft teal sea,
six tinted regions (sandstone, olive, soft rose, peach, moss, aqua mist),
amber-glow pin markers numbered 1 through 6, hand-drawn architectural
icons (Doi Inthanon temple, modern train, rice paddies, the Khon Kaen
water tower, Bangkok skyline, Khlong Toey houses on stilts, EEC industrial
complex, container port, Andaman limestone karsts, longtail boat, coral
reef). Border outlines of Thailand are geographically accurate; the
southern peninsula intact, Phuket as island, Mekong river curving along
the east. A small compass-rose in the upper-right of the map (N/E/W/S).
The map is the visual anchor of the entire poster — judges should
recognize it within one second.

To the RIGHT of the map, six mission callout cards in a 3×2 grid, each
~ 28% wide × 16% tall:

  Card 1 · NORTH · CHIANG MAI
    Title: "The Burning Season"
    Tension: "Clean air vs. agricultural livelihood"
    SDG tag in monospace red chip: "SDG 13 · CLIMATE"
  
  Card 2 · NORTHEAST · KHON KAEN
    Title: "The Aquifer Below"
    Tension: "Today's water vs. the next generation"
    SDG tag: "SDG 6 · WATER"
  
  Card 3 · CENTRAL · BANGKOK
    Title: "The Klong and the City"
    Tension: "Flood defence vs. canal-side tenure"
    SDG tag: "SDG 11 · CITIES"
  
  Card 4 · WEST · TAK / MAE SOT
    Title: "The Children at the Border"
    Tension: "National curriculum vs. cross-border continuity"
    SDG tag: "SDG 4 · EDUCATION"
  
  Card 5 · EAST · EEC FRINGE
    Title: "The Village Left Behind"
    Tension: "Industrial growth vs. community health"
    SDG tag: "SDG 3 · HEALTH"
  
  Card 6 · SOUTH · ANDAMAN
    Title: "The Reef and the Tide"
    Tension: "Tourism revenue vs. marine recovery"
    SDG tag: "SDG 14 · OCEAN"

Each card has an ink-line border, cream background, an amber pin number,
the region name in monospace caps (~ 8 pt gold), the mission title in
italic serif (~ 14 pt ink), the tension in DM Sans light (~ 9 pt
console-dim grey), and the SDG chip at the bottom-right corner.

ZONE C (~9% of canvas) · THE FIVE-STAGE MISSION ARC
A horizontal band visualising how learners traverse each mission. Five
connected cards reading left-to-right with thin ink arrows ▸ between
them. The five stages and their iconography:

  BRIEF ▸ PROBE ▸ DECIDE ▸ ACT ▸ DEBRIEF

  Each stage has:
  - A small monoline ink-illustrated icon above it (~ 24 pt height):
    BRIEF: an open folder/dossier
    PROBE: a magnifying glass over a stack of documents
    DECIDE: a balanced two-pan scale
    ACT: a megaphone
    DEBRIEF: a circular arrow / reflection mirror
  - The stage name in Cinzel caps (~ 14 pt, ink)
  - A one-line Bloom-taxonomy badge below (~ 8 pt mono, gold):
    BRIEF → "REMEMBER / UNDERSTAND"
    PROBE → "ANALYZE"
    DECIDE → "EVALUATE"
    ACT → "APPLY"
    DEBRIEF → "METACOGNITION"

ZONE D (~6% of canvas) · UI FEATURES & GAMIFICATION
A two-column band beneath the arc. Both columns use ink-line monoline
icons paired with one-line labels in italic serif.

LEFT COLUMN: "What Learners Experience"
  ◆ Mr. Compass — Socratic AI Field Mentor
  ◆ AI Judges — three formative evaluators
  ◆ Insight Tokens — earn / spend on scaffolds
  ◆ 6 SDG Keystones — unlock the capstone
  ◆ Voice for Change Studio — multimodal proposal
  ◆ Hall of Voices — public showcase gallery

RIGHT COLUMN: "How the Game Flows"
A small flowchart with rounded-rectangle nodes connected by thin ink
arrows, reading left-to-right:
  Sign-up → CEFR Diagnostic → Avatar → Mission Select → 5-Stage Arc
  → Token Award → Repeat for 6 Missions → Voice for Change Capstone
  → Certificate + Hall of Voices

A thin gold hairline closes the upper half here.

═══════════════ THE GOLD HORIZONTAL RULE — DIVIDER ═══════════════
A single thin gold #C9A961 hairline rule spans the full width of the
poster. To its left in small mono caps: "ABOVE: WHAT LEARNERS SEE".
To its right: "BELOW: THE PEDAGOGICAL FOUNDATION".

— LOWER HALF, top to bottom —

The lower 45% takes on a different visual register: more architectural,
more diagrammatic. The cream background continues, but a subtle 8%-opacity
blueprint-grid texture overlays it. Color palette restraints: ink-black
text, gold accents, occasional crimson for emphasis, no watercolor
pastels.

ZONE E (top ~3% of lower half) · SECTION HEADER
Centered in Cinzel caps (~ 18 pt ink): "THE FOUNDATION"
A monospace subhead beneath in gold (~ 10 pt):
"PEDAGOGY · LEARNING THEORY · ARCHITECTURE · COMPLIANCE"

ZONE F (~30% of canvas) · THREE-COLUMN FOUNDATION

COLUMN 1 — PEDAGOGICAL SPINE
  Header in Cinzel caps: "PEDAGOGY"
  
  Subsection 1: "Two Load-Bearing Frameworks"
    ◆ PICRAT — every mission lives at Interactive-Amplifies floor; 
      capstone reaches Creative-Transforms (Kimmons et al. 2020)
    ◆ AI-TPACK — boundary between what AI handles (scale, consistency)
      and what humans handle (authority, cultural authenticity) 
      (Mishra & Koehler 2006; Mishra et al. 2023)
  
  Subsection 2: "Universal Design for Learning 3.0 (CAST 2024)"
    Three small horizontal pill-bars labelled:
    [ MULTIPLE MEANS OF ENGAGEMENT ]
    [ MULTIPLE MEANS OF REPRESENTATION ]
    [ MULTIPLE MEANS OF ACTION / EXPRESSION ]
  
  Subsection 3: "Bloom's Revised Taxonomy ladder"
    A small vertical ladder diagram with six rungs from REMEMBER (bottom)
    up to CREATE (top). Each rung tagged with the FUTUREPROOF mission
    stage that exercises it (e.g. CREATE = "Voice for Change capstone")

COLUMN 2 — THREE LEARNING THEORIES (the triptych)
  Header: "THREE LEARNING THEORIES, OPERATIONALISED"
  
  Three small panels stacked vertically, each with a warm tint:
  
  Panel 1 (warm sand tint):
    "BEHAVIORISM · พฤติกรรมนิยม"
    Skinner · Pavlov · Watson
    ◆ Insight Tokens (operant conditioning)
    ◆ AI Judges (immediate feedback)
    ◆ Keystones (variable-interval reinforcement)
    ◆ Adaptive Reading Tiers (shaping)
  
  Panel 2 (cool parchment tint):
    "COGNITIVISM · ปัญญานิยม"
    Bruner · Ausubel · Sweller · Mayer
    ◆ 5-stage arc (cognitive load chunking)
    ◆ Pre-Mission Brief (advance organizer)
    ◆ Voice for Change studio (CTML dual-coding)
    ◆ Integrity Meter (metacognition)
  
  Panel 3 (pale teal tint):
    "SOCIAL CONSTRUCTIVISM · การสร้างความรู้เชิงสังคม"
    Vygotsky · Lave & Wenger · Bruner
    ◆ 3-role asymmetric team (co-construction)
    ◆ Mr Compass (MKO within ZPD)
    ◆ Hall of Voices (community of practice)
    ◆ Peer Judges (social mediation)
  
  Below the triptych, a small monospace strip listing supporting
  theorists with no panel (just text chips, ~ 7 pt ink):
  "Krashen i+1 · Hattie · Flavell · UNESCO ESD · Paul & Elder · 
   Coyle-Hood-Marsh · P21"

COLUMN 3 — ARCHITECTURE & ASSESSMENT
  Header: "ARCHITECTURE & ASSESSMENT"
  
  Subsection 1: "Tech Stack Layer Diagram"
    Six horizontal stacked rectangles, each labelled with the layer name
    in Cinzel caps (gold) and the technology in mono (ink):
    [ PRESENTATION ]   HTML5 · Tailwind CSS · Vanilla JS
    [ IDENTITY ]       Firebase Auth + PDPA-gated consent
    [ DATA ]           Firebase Realtime DB · Firebase Storage
    [ AI PROXY ]       Netlify Functions · Claude API · Stability AI
    [ PEDAGOGY ]       System Prompts encoding Rubric B + Mr Compass
    [ CONTENT ]        6 vetted Thai-context scenarios · 3 CEFR tiers
  
  Subsection 2: "The Four-Rubric Suite"
    A 2×2 grid of small folded-document icons, each labelled:
    Rubric A — Voice for Change Holistic (teacher · summative)
    Rubric B — Mission Decision Quality (AI · formative)
    Rubric C — CEFR Language Development (pre/post · evaluator)
    Rubric D — Soft Skills Demonstration (teacher + peer)
  
  Subsection 3: "Four-Tier Hybrid Judging"
    A vertical ladder of four tiers with single-word labels and italic
    descriptors:
    Tier 1 · AI Judges        formative · every decision
    Tier 2 · Peer Judges      cross-team · post-mission
    Tier 3 · Teacher Judges   summative · authoritative
    Tier 4 · External Judges  authentic audience · showcase

ZONE G (~5% of canvas) · COMPLIANCE & CREDENTIALS BAND
A horizontal strip with five small badge-style ink-line icons each with
a one-line caption underneath in mono (~ 7 pt):
  [shield icon] · PDPA Compliant · พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562
  [accessibility person] · WCAG 2.1 AA · accessible to all learners
  [globe + students] · UDL 3.0 · CAST Guidelines (2024)
  [mobile phone] · Mobile-first from 360 px upward · PWA-ready
  [SDG colour wheel] · 6 of 17 UN Sustainable Development Goals

ZONE H (bottom ~5%) · FOOTER STRIP
Three columns separated by thin gold vertical hairlines:

  Left column:
    A 28 × 28 mm clean white square reserved for the QR code, with
    a thin ink border. Below it in mono caps (~ 7 pt):
    "SCAN · WATCH THE DEMO"
  
  Centre column (three lines, DM Sans light ~ 9 pt):
    "futureproof.yungie.one"
    "Faculty of Liberal Arts · Mahidol University"
    "Course: LALA109 — English for Digital Communication Skills"
  
  Right column (three lines, mono caps ~ 7 pt, gold):
    "TECH CREATIVE LEARNING AWARDS"
    "DR. PAYUNGSAK KAENCHAN"
    "VERSION 2.0 · MAY 2026"

— COLOR PALETTE (use these exact hex values, no others) —
Paper background       #FDFBF6
Ink (body text)        #0A0A0B
Gold accent            #C9A961
Gold glow              #E8C77A
Crimson accent         #7B1B1B
Pale parchment tint    #F4F1EA
Console grey (data)    #1F1F23
Console dim (subtext)  #8B8B92
Teal-ink (map sea)     #1F3E4A
Watercolor blue        #6F8EA8
Sandstone (north)      #D9B98A
Olive (northeast)      #9CA66F
Soft rose (central)    #C9A09E
Warm peach (west)      #E0B68C
Pale moss (east)       #B6BF93
Aqua mist (south sea)  #A8C6CC

— TYPOGRAPHY HIERARCHY (visual style references) —
Display headlines    → humanist transitional serif (style of Cormorant 
                       Garamond Light) — generous tracking, high contrast
Section headers      → inscribed Roman caps (style of Cinzel Regular) —
                       restrained, ceremonial
Body type            → geometric humanist sans (style of DM Sans Regular)
                       — calm, open apertures
Data tags / mono     → slab monospace (style of JetBrains Mono Regular)
                       — for SDG numbers, version stamps, taxonomy slugs
Thai parallel text   → IBM Plex Sans Thai (paired cleanly with DM Sans)
                       — only for the few Thai phrases in the document

— ICONOGRAPHY RULES —
All icons single-weight ink-line, monoline (1pt stroke equivalent), no
fills, no gradients, no drop shadows, no glow. Engraving-style hatching
only where flourish is required. Each icon sits inside an invisible
16 × 16 mm bounding box for grid alignment. The map's hand-illustrated
architectural elements (temple, train, skyline, etc.) are the only
exception — they may use watercolor washes and ink hatching matching
the reference image style.

— LIGHTING / TEXTURE —
The whole poster should feel like beautifully printed paper, not a
screen render. Subtle paper-grain texture across the cream background.
A faint vignette on the very outer edges. NO glow, NO neon, NO synthwave,
NO cyberpunk, NO chrome, NO 3D-render look, NO photographic skin.
Hand-illustrated where illustrated; typographically set where set.

— HIERARCHY & LEGIBILITY —
The hero takeaway — "FUTUREPROOF · SDG MISSION JOURNEY" — must be the
most prominent element on the canvas, readable from 1.5 m away. The
Thailand map must be the second-most-prominent element. Then the
five-stage arc. Then the triptych and feature panels. Every piece of
text on the poster must be readable at A4 print size (no body text
below 7 pt at A4 scale). Headlines at least 36 pt. Letter-spacing on
all-caps treatments at least 0.05em.

— CONTENT FIDELITY RULES (CRITICAL) —
1. SPELLING: every English word must be spelled correctly. The project
   name is exactly "FUTUREPROOF" (one word, all caps, no separator).
   Course code is exactly "LALA109". Author is exactly "Dr. Payungsak
   Kaenchan". Institution is exactly "Faculty of Liberal Arts, Mahidol
   University". Thai phrases must be spelled correctly: "ภารกิจเอสดีจี
   เพื่ออนาคต" appears once as a subtitle; "พ.ร.บ. คุ้มครองข้อมูล
   ส่วนบุคคล พ.ศ. 2562" appears once as the compliance badge.
2. NO INVENTED LOGOS — no Google, Anthropic, OpenAI, Microsoft, Adobe
   emblems. The SDG numbers are referenced as text tags only; do not
   redraw the UN SDG wheel.
3. NO PHOTOREAL HUMAN FACES — no celebrity faces, no AI-generated
   portraits, no recognizable likenesses. Theorist names are text-only.
4. THAILAND'S BORDERS MUST BE GEOGRAPHICALLY ACCURATE — southern
   peninsula intact, Phuket as island, Songkhla visible, no fictional
   provinces. Match the reference image's geography exactly.
5. NO WATERMARK, NO LOREM IPSUM, NO PLACEHOLDER GIBBERISH.
6. NO PHOTOREALISTIC LIGHTING — no harsh shadows, no studio glow, no
   3D plastic finishes. The whole poster is illustrated and
   typographically set.
7. The poster must read as a single coherent editorial spread, not a
   collage of unrelated panels. The horizontal gold rule at 55% is the
   only major structural division.

— TECHNICAL RENDER SPECS —
Aspect ratio: A4 portrait (210:297 ≈ 1:1.414)
Generate at maximum native portrait resolution available
Style: editorial infographic · vector-clean · print-ready
No motion blur, no chromatic aberration, no lens flare
sRGB color space at generation
The reference image (thailand-map.png) anchors the upper-half map
style: replicate its watercolor washes, ink contour lines, region
tinting, amber pin markers, and hand-drawn building icons exactly.

— STYLE REFERENCES THE MODEL SHOULD EVOKE —
The composition should feel like a hybrid of:
  • National Geographic atlas plates (1990s) for the map
  • The New York Times Op-Docs static infographics for the lower half
  • Monocle quarterly editorial spreads for the typographic restraint
  • Edward Tufte's Visual Display for the information density
  • Massimo Vignelli's late-modernist layouts for the grid discipline
  • Otl Aicher's Munich 1972 wayfinding for the iconography clarity
  • Jan Tschichold's Penguin redesign for the color restraint

— NEGATIVE PROMPT (what NOT to include) —
cartoonish · chibi · anime · manga · 3D render · plasticky shading ·
neon glow · synthwave · cyberpunk · holographic · gradient mesh · lens
flare · motion blur · watermark · Shutterstock logo · Getty Images mark ·
Adobe Stock badge · copyrighted brand emblem · celebrity face ·
photoreal human portrait · AI-generated face · deformed hand · lorem
ipsum · gibberish text · misspelled words · crooked letters · drop
shadow · photo-realistic skin · comic-book halftone · sticker style ·
kawaii · low-resolution · pixelated · blurry · JPEG compression
artifact · watercolour splash that obscures text · overlapping text ·
illegible micro-type · fictional Thailand border · missing Phuket ·
missing Andaman · distorted map · iceberg illustration · ice imagery ·
literal water/sea divider.
```

---

## 2 · Platform-specific adapter clauses (append ONE to the master prompt)

### 2.1 · For ChatGPT (GPT-4o image generation, DALL·E 3 / GPT Image 1)

Append this paragraph to the END of the master prompt:

> ChatGPT-specific direction: Use the attached image (thailand-map.png) as
> a strong style and composition reference for the upper-half map region.
> Match its watercolor-ink hybrid style, region tinting, amber pin
> markers, and hand-drawn building icons. Generate the largest portrait
> size you natively support (1024×1792). After generation, I will
> separately upscale to 4K/8K using Magnific.ai or Topaz Gigapixel — so
> generate at maximum native fidelity rather than worrying about final
> print size. Render typographic detail clearly; if a long technical
> term appears, prefer rendering it accurately even if you have to
> slightly enlarge that text element.

### 2.2 · For Gemini (Imagen 3 / Imagen 4 via Gemini 2.5)

Append this paragraph to the END of the master prompt:

> Gemini-specific direction: Use the attached image (thailand-map.png) as
> a style anchor for the watercolor map region. Generate at the highest
> portrait resolution your Imagen model supports (typically 2048×2730 or
> larger). Imagen renders typographic detail with high fidelity — please
> spell every word exactly as shown in this prompt; do not paraphrase.
> If the model offers an upscale option after generation, use it (target
> ≥ 4 960 px on the long edge for print-quality A4 at 600 DPI).

---

## 3 · QR code generation (independent of image-gen)

The poster reserves a 28×28 mm white square for the QR code. Generate it
separately and overlay in your vector editor (Affinity Publisher, Figma,
Adobe Illustrator):

```python
# Optional: Python QR generator
import qrcode
img = qrcode.make(
    "https://www.youtube.com/watch?v=YOUR_DEMO_VIDEO_ID",
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=20, border=2,
)
img.save("docs/poster/futureproof-demo-qr.png")
```

Foreground: `#0A0A0B` (ink). Background: `#FDFBF6` (paper). Error
correction level H (highest, survives print imperfections).

---

## 4 · Iteration tips (common failure modes & re-roll language)

| Failure mode | Re-roll clause to append |
|---|---|
| Model invents extra Thai provinces or distorts the southern peninsula | "Match the Thailand borders from the reference image exactly. Phuket is an island, Songkhla is visible, the southern peninsula reaches Malaysia. No fictional provinces." |
| Body text becomes cartoonish or sticker-styled | "Reduce all illustration to editorial line-art and watercolor wash. Remove any cartoon outlines, kawaii features, or sticker-style elements. Re-render in a National Geographic atlas-plate style." |
| Misspelled "FUTUREPROOF" (variants like FUTUREPROOOF or FUTUREPROF) | "Render the project title as the exact eight letters F-U-T-U-R-E-P-R-O-O-F with no duplication or omission. If you cannot render text accurately, leave a blank rectangle in that position and I will add text in a vector editor." |
| Edge-to-edge bleed with no margins | "Add a 12 mm cream-paper margin on all four sides. The gold rule at 55% does not extend into the margin." |
| Lower half too colorful, breaks the iceberg metaphor | "Reduce the lower 45% to ink + gold + cream only. Remove all watercolor pastels from the lower half. The pedagogical foundation should feel restrained and technical, not vibrant." |
| Map region is too small relative to the rest | "Enlarge the Thailand map to occupy at least 35% of the upper half's vertical space. It is the visual anchor of the entire poster." |
| Five-stage arc icons look generic | "Replace the stage icons with: BRIEF = an open folder/dossier with text lines; PROBE = a magnifying glass over stacked documents; DECIDE = a balanced two-pan scale; ACT = a stylized megaphone; DEBRIEF = a circular arrow forming a reflection-loop. All monoline ink, no fills." |
| Theorist names misrendered (Vyogtsky, Skinnre, etc.) | "Spell theorist names exactly: Skinner, Pavlov, Watson, Vygotsky, Lave, Wenger, Bruner, Ausubel, Sweller, Mayer, Hattie, Krashen, Flavell. If any name cannot be rendered accurately, leave a small blank chip and I will add the name in a vector editor." |
| Lower half feels disconnected from upper half | "Bridge the two halves visually: the gold hairline at 55% is the only structural divider. The same cream paper continues through both halves; only the texture overlay (blueprint grid at 8% opacity) differentiates the lower." |

---

## 5 · Pre-submission checklist

Before saving the final upscaled file:

- [ ] Output is A4 portrait at ≥ 4 960 × 7 016 px (600 DPI on A4).
- [ ] File size ≤ 10 MB after PNG compression (per SPU rule).
- [ ] QR code reservation rectangle is empty and clean (you will add the
      QR separately in Affinity / Figma / Illustrator).
- [ ] "FUTUREPROOF — SDG Mission Journey" reads correctly.
- [ ] "Dr. Payungsak Kaenchan" reads correctly.
- [ ] "Faculty of Liberal Arts · Mahidol University" reads correctly.
- [ ] All 6 missions correctly labelled (NORTH · NORTHEAST · CENTRAL ·
      WEST · EAST · SOUTH) with correct SDG numbers (13, 6, 11, 4, 3, 14).
- [ ] All theorist names spelled correctly (audit the lower half).
- [ ] No trademark logos visible.
- [ ] No celebrity faces or AI-deformed hands visible.
- [ ] The horizontal gold rule sits at ~ 55% from top.
- [ ] The upper half feels warm and illustrated; the lower half feels
      cooler and technical. Both share cream paper.
- [ ] Thailand map borders are geographically accurate.
- [ ] Print test on actual A4 paper before final submission. At arm's
      length, can you read FUTUREPROOF? Can you find the map within
      1 second? Can you identify all 6 missions?

---

## 6 · Why this design serves the SPU rubric

The selection-round rubric weights are 10/10/20/20/20/20 % across six
criteria (rationale · objectives · method · strengths · benefits ·
documentation). The poster cannot directly claim 100% of any criterion
on its own — but it can visually surface all six in the first 10 seconds
a judge looks at it. Each zone of the poster carries rubric weight:

| Rubric criterion | Where the poster delivers |
|---|---|
| Rationale (10%) | Zone E "THE FOUNDATION" header + Column 1 PEDAGOGY signals theoretical grounding from the first glance below the line |
| Objectives (10%) | The hero tagline + the six mission tension lines in Zone B communicate the learning ambition |
| Method (20%) | Zone C five-stage arc visualises the *process*, which is the single most-asked-about element by judges; Zone F Column 3 shows the architecture |
| Strengths (20%) | Zone D "What Learners Experience" surfaces Mr Compass, AI Judges, Tokens, Keystones, Voice for Change, Hall of Voices in one panel — the differentiators in one glance |
| Benefits (20%) | The Thailand map itself argues "this works for six different Thai contexts"; the Hall of Voices line gestures to community-level impact |
| Documentation (20%) | This *is* the artifact — magazine-quality execution carries the criterion on its own |

The iceberg composition is itself a rubric argument: it tells the judge
"there is more to this innovation than the gamified surface; ask me
about the foundation." That framing primes the judge to look for depth
in the rest of the submission package (the application docx, the four
rubric PDFs, the teacher's manual).

---

*End of brief.*

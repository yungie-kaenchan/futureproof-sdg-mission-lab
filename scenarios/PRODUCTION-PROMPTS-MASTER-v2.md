# FUTUREPROOF — Asset Production Prompt Master (v2 · VIDEO)

*All six FUTUREPROOF missions. Every prompt maps 1:1 to the exact path the code already expects (or will expect once runtime code lands).* · last updated 2026-05-22

> Origin: `scripts/gen-production-prompts.py` for missions 1–2; missions 3–6 authored directly against the design masters at `scenarios/sdgXX-…-v1/PRODUCTION-MASTER.md`.

## How to use this document

- **WIRING CONTRACT.** Filenames and paths in this document are load-bearing. Produce the asset, drop it at the stated path, and it appears in the mission with NO code change. Do not rename.
- **SCRIPTS ARE VERBATIM** (spoken AND burned-in subtitle): every spoken word must match the script exactly — it is the same text shown on screen and in the `.vtt` caption. Paraphrasing breaks the caption sync and the comprehension items that quote stakeholders.
- **GROUNDING DISCIPLINE.** Composite roles, never real individuals; no invented precise statistics; Thai context with dignity. This mirrors the scenario notice and the DPIA.
- **Audio/video engine behaviour.** The player auto-detects a missing file and shows a graceful "production pending" chip — so partial delivery never breaks a demo. Ship each asset as you finish it.

### Status per mission (2026-05-22)

| # | Mission | Runtime code | Hero | Stakeholder portraits | Stakeholder videos | Captions (.vtt) | Diagrams/charts |
|--:|---|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | Khon Kaen (SDG 6) | ✅ wired | ✅ live | ✅ 4/4 live | ❌ 0/4 — produce A1–A4 | ✅ live | ✅ live |
| 2 | Chiang Mai (SDG 13) | ✅ wired | ✅ live | ✅ 4/4 live | ✅ 4/4 live | ✅ live | ✅ live |
| 3 | Bangkok (SDG 11) | ✅ wired | ✅ live | ✅ 4/4 live | ✅ 4/4 live | ✅ live | ✅ live |
| 4 | Andaman (SDG 14) | ✅ wired | ✅ live | ✅ 4/4 live | ✅ 4/4 live | ✅ live | ✅ live |
| 5 | Mae Sot (SDG 4) | ✅ wired | ✅ live | ✅ 4/4 live | ✅ 4/4 live | ✅ live | ✅ live |
| 6 | EEC fringe (SDG 3) | ❌ not yet built | ❌ produce | ❌ 0/4 | ❌ 0/4 | ❌ author | ❌ produce |

> Missions 4–6 do not yet have runtime modules under `src/scenarios/`. The prompts below are still authoritative for asset production — generation can happen in parallel with the runtime-code build. Once the code lands, each asset auto-wires at the stated path.


---

# MISSION 1 — “The Aquifer Below Khon Kaen” (SDG 6, Northeast)

_Status: wired, captions shipped, MP3 audio MISSING. Produce A1–A4 first (highest visible impact). Each is a short video clip with the English subtitle text burned into the picture._

## Part A — Video dispatches (English subtitles BURNED IN)

### A1. Stakeholder 01 — Smallholder rice farmer

- **Thai role label:** เกษตรกรผู้ปลูกข้าวรายย่อย
- **Tool:** Video production (filmed actor OR AI talking-avatar) with the EXACT English subtitle text BURNED INTO the picture — no sidecar track
- **WIRE TO (exact path — drop file here, auto-wires):** /assets/scenarios/sdg06-khonkaen/video/01-rice-farmer.mp4
- **Subtitle burn-in source (.vtt):** /assets/scenarios/sdg06-khonkaen/audio/01-rice-farmer.vtt  (the exact words to BURN into the video — verbatim)
- **Portrait pairs with:** /assets/scenarios/sdg06-khonkaen/images/stakeholder-01.svg
- **Target duration:** 32 s  (script ≈ 72 words → ~135 wpm)
- **Voice profile:** Weathered, unhurried Northeastern (Isan) Thai man speaking English with a natural Isan-Thai accent. Dignified, tired but not defeated; the calm of someone stating a plain fact.
- **Performance direction:** Quiet conviction. No anger, no pleading. A short pause after 'Now?' and before 'That is just how the ground works.'
- **Video & subtitle spec:** 1080p (≥720p) MP4 H.264 + AAC, 16:9, ≤ ~12 MB. Speaker visible, neutral background. Burn the English subtitle text (below) into the lower third — high-contrast, 2 lines max, timed to speech. Do NOT ship a sidecar .vtt; the subtitles are part of the picture.

**SCRIPT (verbatim — speak exactly this):**

> My family has farmed this land for three generations. The shallow well in our yard — it used to run all year. Now? By March, it gives nothing. I hear the province will dig deeper wells in town. I do not blame them. People need to drink. But the water under our feet is the same water. If they pull more, mine runs dry sooner. That is just how the ground works.

**QA checklist:**
- [ ] Spoken words AND the burned-in subtitles EXACTLY match the script — no paraphrase, no added 'um', no dropped clause.
- [ ] Length within ±3 s of 32 s.
- [ ] Accent reads as authentic Thai-English for the role, never cartoonish or mocking.
- [ ] Loudness normalised to ~ -16 LUFS; no clipping; clean tail.
- [ ] Exported as MP4 (H.264/AAC) and placed exactly at /assets/scenarios/sdg06-khonkaen/video/01-rice-farmer.mp4 — filename is load-bearing, do not rename.

### A2. Stakeholder 02 — PWA Operations Manager

- **Thai role label:** ผู้จัดการฝ่ายปฏิบัติการ การประปาส่วนภูมิภาคขอนแก่น
- **Tool:** Video production (filmed actor OR AI talking-avatar) with the EXACT English subtitle text BURNED INTO the picture — no sidecar track
- **WIRE TO (exact path — drop file here, auto-wires):** /assets/scenarios/sdg06-khonkaen/video/02-pwa-manager.mp4
- **Subtitle burn-in source (.vtt):** /assets/scenarios/sdg06-khonkaen/audio/02-pwa-manager.vtt  (the exact words to BURN into the video — verbatim)
- **Portrait pairs with:** /assets/scenarios/sdg06-khonkaen/images/stakeholder-02.svg
- **Target duration:** 32 s  (script ≈ 73 words → ~137 wpm)
- **Voice profile:** Composed, professional Thai woman, central-Thai English, administrative register. Measured authority, not cold.
- **Performance direction:** Brisk and factual; a firm landing on the final three words 'But taps must run.'
- **Video & subtitle spec:** 1080p (≥720p) MP4 H.264 + AAC, 16:9, ≤ ~12 MB. Speaker visible, neutral background. Burn the English subtitle text (below) into the lower third — high-contrast, 2 lines max, timed to speech. Do NOT ship a sidecar .vtt; the subtitles are part of the picture.

**SCRIPT (verbatim — speak exactly this):**

> Our statutory mandate is clear: continuous potable water to around two hundred thousand residents in this service area. In each of the last three drought years, we came within days of supply interruption. The twelve-well expansion is sized to provide a residual margin during a one-in-fifty-year dry season. We have heard the concerns from rural districts and from the university working paper. We are prepared to commission additional monitoring. But taps must run.

**QA checklist:**
- [ ] Spoken words AND the burned-in subtitles EXACTLY match the script — no paraphrase, no added 'um', no dropped clause.
- [ ] Length within ±3 s of 32 s.
- [ ] Accent reads as authentic Thai-English for the role, never cartoonish or mocking.
- [ ] Loudness normalised to ~ -16 LUFS; no clipping; clean tail.
- [ ] Exported as MP4 (H.264/AAC) and placed exactly at /assets/scenarios/sdg06-khonkaen/video/02-pwa-manager.mp4 — filename is load-bearing, do not rename.

### A3. Stakeholder 03 — Food-processing facility Production Director

- **Thai role label:** ผู้อำนวยการฝ่ายผลิต โรงงานแปรรูปอาหารในแอ่งขอนแก่น
- **Tool:** Video production (filmed actor OR AI talking-avatar) with the EXACT English subtitle text BURNED INTO the picture — no sidecar track
- **WIRE TO (exact path — drop file here, auto-wires):** /assets/scenarios/sdg06-khonkaen/video/03-plant-director.mp4
- **Subtitle burn-in source (.vtt):** /assets/scenarios/sdg06-khonkaen/audio/03-plant-director.vtt  (the exact words to BURN into the video — verbatim)
- **Portrait pairs with:** /assets/scenarios/sdg06-khonkaen/images/stakeholder-03.svg
- **Target duration:** 30 s  (script ≈ 66 words → ~132 wpm)
- **Voice profile:** Confident corporate Thai man, polished central-Thai English, the cadence of a prepared statement. Reasonable, guarded.
- **Performance direction:** Controlled and lawyerly; slight emphasis on 'good faith' and 'predictable regulatory environment'.
- **Video & subtitle spec:** 1080p (≥720p) MP4 H.264 + AAC, 16:9, ≤ ~12 MB. Speaker visible, neutral background. Burn the English subtitle text (below) into the lower third — high-contrast, 2 lines max, timed to speech. Do NOT ship a sidecar .vtt; the subtitles are part of the picture.

**SCRIPT (verbatim — speak exactly this):**

> Our facility holds a groundwater extraction permit issued under the framework that has governed industrial water use in this region for nearly five decades. We extract from the deep confined layer, well below any household well. Our extraction volume is monitored and reported quarterly. We support sustainable allocation. We do not support retroactive cancellation of permits granted in good faith. A predictable regulatory environment is essential.

**QA checklist:**
- [ ] Spoken words AND the burned-in subtitles EXACTLY match the script — no paraphrase, no added 'um', no dropped clause.
- [ ] Length within ±3 s of 30 s.
- [ ] Accent reads as authentic Thai-English for the role, never cartoonish or mocking.
- [ ] Loudness normalised to ~ -16 LUFS; no clipping; clean tail.
- [ ] Exported as MP4 (H.264/AAC) and placed exactly at /assets/scenarios/sdg06-khonkaen/video/03-plant-director.mp4 — filename is load-bearing, do not rename.

### A4. Stakeholder 04 — Community Health Volunteer (อสม.)

- **Thai role label:** อาสาสมัครสาธารณสุขประจำหมู่บ้าน
- **Tool:** Video production (filmed actor OR AI talking-avatar) with the EXACT English subtitle text BURNED INTO the picture — no sidecar track
- **WIRE TO (exact path — drop file here, auto-wires):** /assets/scenarios/sdg06-khonkaen/video/04-health-volunteer.mp4
- **Subtitle burn-in source (.vtt):** /assets/scenarios/sdg06-khonkaen/audio/04-health-volunteer.vtt  (the exact words to BURN into the video — verbatim)
- **Portrait pairs with:** /assets/scenarios/sdg06-khonkaen/images/stakeholder-04.svg
- **Target duration:** 34 s  (script ≈ 68 words → ~120 wpm)
- **Voice profile:** Warm, grounded Isan Thai woman, English with an Isan accent, the voice of a trusted village figure who has seen a lot.
- **Performance direction:** Gentle, sincere, rising to a quiet plea on the last sentence 'Please remember the children when you decide.'
- **Video & subtitle spec:** 1080p (≥720p) MP4 H.264 + AAC, 16:9, ≤ ~12 MB. Speaker visible, neutral background. Burn the English subtitle text (below) into the lower third — high-contrast, 2 lines max, timed to speech. Do NOT ship a sidecar .vtt; the subtitles are part of the picture.

**SCRIPT (verbatim — speak exactly this):**

> I have walked the houses in my sub-district for eleven years. When the shallow wells fail in March, families turn to ponds or river water. Within two weeks, mothers bring children with diarrhoea to our health post. Older residents stop drinking enough because they do not trust the taste. Dehydration in the elderly is a quieter problem, but it is real. Please remember the children when you decide.

**QA checklist:**
- [ ] Spoken words AND the burned-in subtitles EXACTLY match the script — no paraphrase, no added 'um', no dropped clause.
- [ ] Length within ±3 s of 34 s.
- [ ] Accent reads as authentic Thai-English for the role, never cartoonish or mocking.
- [ ] Loudness normalised to ~ -16 LUFS; no clipping; clean tail.
- [ ] Exported as MP4 (H.264/AAC) and placed exactly at /assets/scenarios/sdg06-khonkaen/video/04-health-volunteer.mp4 — filename is load-bearing, do not rename.

_Optional secondary audio already has shipped .vtt scripts in assets/scenarios/sdg06-khonkaen/audio/ (crisis-dispatch.vtt, tribunal-open.vtt) and full voice-direction in scenarios/sdg06-khonkaen-aquifer-v1/PRODUCTION-PROMPTS.md §A5–A6 — reuse those scripts verbatim; not repeated here to avoid drift._

## Part B — Stakeholder portraits

### B1. Portrait 01 — Smallholder rice farmer

- **Tool:** ChatGPT Image / Midjourney / SDXL — stylised editorial portrait
- **WIRE TO (exact path):** /assets/scenarios/sdg06-khonkaen/images/stakeholder-01.svg
- **Note on format:** Code references a .svg path. Either (a) export the render as SVG-wrapped raster at this exact filename, or (b) save as .png/.webp and change only the file extension in src/scenarios/<mission>-content.js portrait field. Filename stem must stay the same.
- **Prompt:** Stylised, dignified editorial portrait illustration of a smallholder rice farmer — a COMPOSITE role, not a real person. Three-quarter view, calm direct gaze, neutral studio background, warm ochre palette consistent with a serious editorial console UI. Mature, respectful, agency and competence in the face — never pitiable. Subtle Thai contextual cues appropriate to the role, understated. Flat-ish editorial vector-illustration feel, soft grain, no photo-realism.
- **Negative prompt:** photoreal face of a real identifiable person, celebrity likeness, logos, brand marks, text, watermark, distorted hands, extra fingers, low-res, oversaturated, stereotyped 'poverty' tropes, pity framing
- **Output spec:** Square 1:1, ≥ 800×800, transparent or neutral-paper background; consistent lighting/style across all four portraits in the mission so the stakeholder grid feels one set.

**QA:**
- [ ] Reads as a composite role, not an identifiable individual.
- [ ] Dignity check: competent and human, no poverty-porn.
- [ ] Style consistent with the other 3 portraits in the same mission.
- [ ] Placed at the exact path (or extension-only change made in the content module).

### B2. Portrait 02 — PWA Operations Manager

- **Tool:** ChatGPT Image / Midjourney / SDXL — stylised editorial portrait
- **WIRE TO (exact path):** /assets/scenarios/sdg06-khonkaen/images/stakeholder-02.svg
- **Note on format:** Code references a .svg path. Either (a) export the render as SVG-wrapped raster at this exact filename, or (b) save as .png/.webp and change only the file extension in src/scenarios/<mission>-content.js portrait field. Filename stem must stay the same.
- **Prompt:** Stylised, dignified editorial portrait illustration of a pwa operations manager — a COMPOSITE role, not a real person. Three-quarter view, calm direct gaze, neutral studio background, soft steel-blue palette consistent with a serious editorial console UI. Mature, respectful, agency and competence in the face — never pitiable. Subtle Thai contextual cues appropriate to the role, understated. Flat-ish editorial vector-illustration feel, soft grain, no photo-realism.
- **Negative prompt:** photoreal face of a real identifiable person, celebrity likeness, logos, brand marks, text, watermark, distorted hands, extra fingers, low-res, oversaturated, stereotyped 'poverty' tropes, pity framing
- **Output spec:** Square 1:1, ≥ 800×800, transparent or neutral-paper background; consistent lighting/style across all four portraits in the mission so the stakeholder grid feels one set.

**QA:**
- [ ] Reads as a composite role, not an identifiable individual.
- [ ] Dignity check: competent and human, no poverty-porn.
- [ ] Style consistent with the other 3 portraits in the same mission.
- [ ] Placed at the exact path (or extension-only change made in the content module).

### B3. Portrait 03 — Food-processing Production Director

- **Tool:** ChatGPT Image / Midjourney / SDXL — stylised editorial portrait
- **WIRE TO (exact path):** /assets/scenarios/sdg06-khonkaen/images/stakeholder-03.svg
- **Note on format:** Code references a .svg path. Either (a) export the render as SVG-wrapped raster at this exact filename, or (b) save as .png/.webp and change only the file extension in src/scenarios/<mission>-content.js portrait field. Filename stem must stay the same.
- **Prompt:** Stylised, dignified editorial portrait illustration of a food-processing production director — a COMPOSITE role, not a real person. Three-quarter view, calm direct gaze, neutral studio background, warm bronze palette consistent with a serious editorial console UI. Mature, respectful, agency and competence in the face — never pitiable. Subtle Thai contextual cues appropriate to the role, understated. Flat-ish editorial vector-illustration feel, soft grain, no photo-realism.
- **Negative prompt:** photoreal face of a real identifiable person, celebrity likeness, logos, brand marks, text, watermark, distorted hands, extra fingers, low-res, oversaturated, stereotyped 'poverty' tropes, pity framing
- **Output spec:** Square 1:1, ≥ 800×800, transparent or neutral-paper background; consistent lighting/style across all four portraits in the mission so the stakeholder grid feels one set.

**QA:**
- [ ] Reads as a composite role, not an identifiable individual.
- [ ] Dignity check: competent and human, no poverty-porn.
- [ ] Style consistent with the other 3 portraits in the same mission.
- [ ] Placed at the exact path (or extension-only change made in the content module).

### B4. Portrait 04 — Community Health Volunteer (อสม.)

- **Tool:** ChatGPT Image / Midjourney / SDXL — stylised editorial portrait
- **WIRE TO (exact path):** /assets/scenarios/sdg06-khonkaen/images/stakeholder-04.svg
- **Note on format:** Code references a .svg path. Either (a) export the render as SVG-wrapped raster at this exact filename, or (b) save as .png/.webp and change only the file extension in src/scenarios/<mission>-content.js portrait field. Filename stem must stay the same.
- **Prompt:** Stylised, dignified editorial portrait illustration of a community health volunteer (อสม.) — a COMPOSITE role, not a real person. Three-quarter view, calm direct gaze, neutral studio background, sage green palette consistent with a serious editorial console UI. Mature, respectful, agency and competence in the face — never pitiable. Subtle Thai contextual cues appropriate to the role, understated. Flat-ish editorial vector-illustration feel, soft grain, no photo-realism.
- **Negative prompt:** photoreal face of a real identifiable person, celebrity likeness, logos, brand marks, text, watermark, distorted hands, extra fingers, low-res, oversaturated, stereotyped 'poverty' tropes, pity framing
- **Output spec:** Square 1:1, ≥ 800×800, transparent or neutral-paper background; consistent lighting/style across all four portraits in the mission so the stakeholder grid feels one set.

**QA:**
- [ ] Reads as a composite role, not an identifiable individual.
- [ ] Dignity check: competent and human, no poverty-porn.
- [ ] Style consistent with the other 3 portraits in the same mission.
- [ ] Placed at the exact path (or extension-only change made in the content module).

## Part C — Scene & data images

### C1. Hero image (journey card / briefing)

- **Tool:** ChatGPT Image / Midjourney
- **WIRE TO (exact path):** /assets/scenarios/sdg06-khonkaen/images/hero.webp
- **Prompt:** Editorial wide image: the Khorat Plateau dry-season landscape above Khon Kaen — a cracked paddy edge and a deep municipal wellhead in the mid-distance under a high hot sky; restrained, cinematic, console-editorial palette (obsidian/bronze/bone), no people foreground, no text.
- **Negative prompt:** photoreal face of a real identifiable person, celebrity likeness, logos, brand marks, text, watermark, distorted hands, extra fingers, low-res, oversaturated, stereotyped 'poverty' tropes, pity framing
- **Output spec:** 16:9, ≥ 1600px wide, .webp; muted so gold UI text stays legible over it. (Optional — SVG baseline already ships; this is an upgrade.)

**QA:**
- [ ] No fabricated precise statistics rendered as if real — numbers shown must be the pedagogical/illustrative values from the production master, labelled as such where visible.
- [ ] Legible at the size it renders in the dossier (test in-page).
- [ ] Placed at the exact path; filename unchanged.

### C2. Aquifer cross-section (dossier diagram)

- **Tool:** Illustrator / SVG (keep vector)
- **WIRE TO (exact path):** /assets/scenarios/sdg06-khonkaen/images/aquifer-crosssection.svg
- **Prompt:** Clean labelled cross-section: surface, upper recharge layer with shallow household wells, deep confined layer with the municipal wellfield, a rock-salt zone below; arrows showing drawdown and potential saline intrusion. Editorial, restrained, bilingual-ready labels. Numbers illustrative only.
- **Negative prompt:** photoreal face of a real identifiable person, celebrity likeness, logos, brand marks, text, watermark, distorted hands, extra fingers, low-res, oversaturated, stereotyped 'poverty' tropes, pity framing
- **Output spec:** SVG, viewBox ~ 1000×640, legible at 720px. Baseline already ships — upgrade for clarity only.

**QA:**
- [ ] No fabricated precise statistics rendered as if real — numbers shown must be the pedagogical/illustrative values from the production master, labelled as such where visible.
- [ ] Legible at the size it renders in the dossier (test in-page).
- [ ] Placed at the exact path; filename unchanged.

### C3. Drawdown chart (data-interpretation)

- **Tool:** Vega/Observable → export SVG
- **WIRE TO (exact path):** /assets/scenarios/sdg06-khonkaen/images/drawdown-chart.svg
- **Prompt:** Simple line/area chart: water-table depth over ~10 years trending down, three drought years marked. Axis labelled; a visible footnote 'Illustrative pedagogical figures — not verified field data.'
- **Negative prompt:** photoreal face of a real identifiable person, celebrity likeness, logos, brand marks, text, watermark, distorted hands, extra fingers, low-res, oversaturated, stereotyped 'poverty' tropes, pity framing
- **Output spec:** SVG, legible at 680px; colour-blind-safe.

**QA:**
- [ ] No fabricated precise statistics rendered as if real — numbers shown must be the pedagogical/illustrative values from the production master, labelled as such where visible.
- [ ] Legible at the size it renders in the dossier (test in-page).
- [ ] Placed at the exact path; filename unchanged.


---

# MISSION 2 — “The Burning Season” (SDG 13, North / Chiang Mai)

_Status: wired, NOTHING on disk. Needs 4 MP3 + 4 .vtt + 4 portraits. The .vtt cue text is generated by this build at the exact path (see scripts) so you only produce audio that matches it._

## Part A — Video dispatches (English subtitles BURNED IN)

### A1. Stakeholder 01 — Upland maize smallholder

- **Thai role label:** เกษตรกรปลูกข้าวโพดบนพื้นที่สูง
- **Tool:** Video production (filmed actor OR AI talking-avatar) with the EXACT English subtitle text BURNED INTO the picture — no sidecar track
- **WIRE TO (exact path — drop file here, auto-wires):** /assets/scenarios/sdg13-chiangmai/video/01-maize-grower.mp4
- **Subtitle burn-in source (.vtt):** /assets/scenarios/sdg13-chiangmai/audio/01-maize-grower.vtt
- **Portrait pairs with:** /assets/scenarios/sdg13-chiangmai/images/stakeholder-01.png
- **Target duration:** 33 s  (script ≈ 100 words → ~182 wpm)
- **Voice profile:** Northern Thai (kham mueang–inflected) man, English with a northern-Thai highland accent. Hardworking, plain-spoken, carrying quiet frustration that does not tip into anger.
- **Performance direction:** Steady and direct. A hard, deliberate landing on the last two sentences: 'I will just do it at night. … A fine is not a choice.'
- **Video & subtitle spec:** 1080p (≥720p) MP4 H.264 + AAC, 16:9, ≤ ~12 MB. Speaker visible, neutral background. Burn the English subtitle text (below) into the lower third — high-contrast, 2 lines max, timed to speech. Do NOT ship a sidecar .vtt; the subtitles are part of the picture.

**SCRIPT (verbatim — speak exactly this):**

> I know the smoke is bad. My own children cough too — we breathe it first, up here, before it reaches the city. But the buyer sets the date. The field must be clear in days or I lose the contract, and that contract is the only money my family sees all year. The machine to bury the stalks costs more than I earn in two seasons. If you fine me, I will still clear the field. I will just do it at night. Give me a real choice and I will take it. A fine is not a choice.

**QA checklist:**
- [ ] Spoken words AND the burned-in subtitles EXACTLY match the script — no paraphrase, no added 'um', no dropped clause.
- [ ] Length within ±3 s of 33 s.
- [ ] Accent reads as authentic Thai-English for the role, never cartoonish or mocking.
- [ ] Loudness normalised to ~ -16 LUFS; no clipping; clean tail.
- [ ] Exported as MP4 (H.264/AAC) and placed exactly at /assets/scenarios/sdg13-chiangmai/video/01-maize-grower.mp4 — filename is load-bearing, do not rename.

### A2. Stakeholder 02 — Respiratory clinician, public hospital

- **Thai role label:** แพทย์ระบบทางเดินหายใจ โรงพยาบาลรัฐ
- **Tool:** Video production (filmed actor OR AI talking-avatar) with the EXACT English subtitle text BURNED INTO the picture — no sidecar track
- **WIRE TO (exact path — drop file here, auto-wires):** /assets/scenarios/sdg13-chiangmai/video/02-clinician.mp4
- **Subtitle burn-in source (.vtt):** /assets/scenarios/sdg13-chiangmai/audio/02-clinician.vtt
- **Portrait pairs with:** /assets/scenarios/sdg13-chiangmai/images/stakeholder-02.png
- **Target duration:** 32 s  (script ≈ 76 words → ~142 wpm)
- **Voice profile:** Precise, caring Thai woman doctor, clear central-Thai English, clinical exactness softened by real concern.
- **Performance direction:** Controlled urgency; the data stated flatly, then a direct appeal on 'count the children in my ward as stakeholders too.'
- **Video & subtitle spec:** 1080p (≥720p) MP4 H.264 + AAC, 16:9, ≤ ~12 MB. Speaker visible, neutral background. Burn the English subtitle text (below) into the lower third — high-contrast, 2 lines max, timed to speech. Do NOT ship a sidecar .vtt; the subtitles are part of the picture.

**SCRIPT (verbatim — speak exactly this):**

> Every burning season I see the same ward fill up. Children on nebulisers, elderly patients whose oxygen falls for weeks, asthma that should be stable and is not. PM2.5 at the levels we record is not a discomfort — it is a measurable rise in admissions and, in the most fragile, in deaths. I am not asking you to ignore the farmers. I am asking you to count the children in my ward as stakeholders too.

**QA checklist:**
- [ ] Spoken words AND the burned-in subtitles EXACTLY match the script — no paraphrase, no added 'um', no dropped clause.
- [ ] Length within ±3 s of 32 s.
- [ ] Accent reads as authentic Thai-English for the role, never cartoonish or mocking.
- [ ] Loudness normalised to ~ -16 LUFS; no clipping; clean tail.
- [ ] Exported as MP4 (H.264/AAC) and placed exactly at /assets/scenarios/sdg13-chiangmai/video/02-clinician.mp4 — filename is load-bearing, do not rename.

### A3. Stakeholder 03 — Agribusiness maize-procurement manager

- **Thai role label:** ผู้จัดการฝ่ายจัดซื้อข้าวโพด บริษัทเกษตรอุตสาหกรรม
- **Tool:** Video production (filmed actor OR AI talking-avatar) with the EXACT English subtitle text BURNED INTO the picture — no sidecar track
- **WIRE TO (exact path — drop file here, auto-wires):** /assets/scenarios/sdg13-chiangmai/video/03-procurement.mp4
- **Subtitle burn-in source (.vtt):** /assets/scenarios/sdg13-chiangmai/audio/03-procurement.vtt
- **Portrait pairs with:** /assets/scenarios/sdg13-chiangmai/images/stakeholder-03.png
- **Target duration:** 30 s  (script ≈ 78 words → ~156 wpm)
- **Voice profile:** Smooth corporate Thai man, polished central-Thai English, the even delivery of someone used to deflecting responsibility politely.
- **Performance direction:** Measured, non-defensive on the surface; faint firmness on 'We move when the incentives move.'
- **Video & subtitle spec:** 1080p (≥720p) MP4 H.264 + AAC, 16:9, ≤ ~12 MB. Speaker visible, neutral background. Burn the English subtitle text (below) into the lower third — high-contrast, 2 lines max, timed to speech. Do NOT ship a sidecar .vtt; the subtitles are part of the picture.

**SCRIPT (verbatim — speak exactly this):**

> Our contracts specify volume and delivery windows because the feed mills downstream run on a schedule we do not control. We do not tell any grower to burn — that is their field decision. We are open to a certified no-burn supply line; we have piloted one. But it needs a price premium the market has not agreed, and it needs the province to fund the machinery gap, not the buyer alone. We move when the incentives move.

**QA checklist:**
- [ ] Spoken words AND the burned-in subtitles EXACTLY match the script — no paraphrase, no added 'um', no dropped clause.
- [ ] Length within ±3 s of 30 s.
- [ ] Accent reads as authentic Thai-English for the role, never cartoonish or mocking.
- [ ] Loudness normalised to ~ -16 LUFS; no clipping; clean tail.
- [ ] Exported as MP4 (H.264/AAC) and placed exactly at /assets/scenarios/sdg13-chiangmai/video/03-procurement.mp4 — filename is load-bearing, do not rename.

### A4. Stakeholder 04 — District enforcement officer (haze task force)

- **Thai role label:** เจ้าหน้าที่บังคับใช้กฎหมายระดับอำเภอ ชุดเฉพาะกิจหมอกควัน
- **Tool:** Video production (filmed actor OR AI talking-avatar) with the EXACT English subtitle text BURNED INTO the picture — no sidecar track
- **WIRE TO (exact path — drop file here, auto-wires):** /assets/scenarios/sdg13-chiangmai/video/04-officer.mp4
- **Subtitle burn-in source (.vtt):** /assets/scenarios/sdg13-chiangmai/audio/04-officer.vtt
- **Portrait pairs with:** /assets/scenarios/sdg13-chiangmai/images/stakeholder-04.png
- **Target duration:** 34 s  (script ≈ 73 words → ~129 wpm)
- **Voice profile:** Frank, slightly weary Thai woman official, northern-inflected central-Thai English, the candour of someone telling an uncomfortable truth to a committee.
- **Performance direction:** Honest and plain, a little tired; emphasis on 'the last step after a real alternative — not the first step instead of one.'
- **Video & subtitle spec:** 1080p (≥720p) MP4 H.264 + AAC, 16:9, ≤ ~12 MB. Speaker visible, neutral background. Burn the English subtitle text (below) into the lower third — high-contrast, 2 lines max, timed to speech. Do NOT ship a sidecar .vtt; the subtitles are part of the picture.

**SCRIPT (verbatim — speak exactly this):**

> I am the one who knocks on the door after the satellite flags a hotspot. Honestly: a blanket ban with fines and nothing else makes my job harder. People stop talking to us. Fires move to the night. Last season we wrote penalties we could not collect, and we lost cooperation we spent years building. Enforcement works as the last step after a real alternative — not the first step instead of one.

**QA checklist:**
- [ ] Spoken words AND the burned-in subtitles EXACTLY match the script — no paraphrase, no added 'um', no dropped clause.
- [ ] Length within ±3 s of 34 s.
- [ ] Accent reads as authentic Thai-English for the role, never cartoonish or mocking.
- [ ] Loudness normalised to ~ -16 LUFS; no clipping; clean tail.
- [ ] Exported as MP4 (H.264/AAC) and placed exactly at /assets/scenarios/sdg13-chiangmai/video/04-officer.mp4 — filename is load-bearing, do not rename.

_No secondary audio for v1 of this mission. If a crisis dispatch is added later, follow the Khon Kaen A5 pattern._

## Part B — Stakeholder portraits

### B1. Portrait 01 — Upland maize smallholder

- **Tool:** ChatGPT Image / Midjourney / SDXL — stylised editorial portrait
- **WIRE TO (exact path):** /assets/scenarios/sdg13-chiangmai/images/stakeholder-01.png
- **Note on format:** Code references a .svg path. Either (a) export the render as SVG-wrapped raster at this exact filename, or (b) save as .png/.webp and change only the file extension in src/scenarios/<mission>-content.js portrait field. Filename stem must stay the same.
- **Prompt:** Stylised, dignified editorial portrait illustration of a upland maize smallholder — a COMPOSITE role, not a real person. Three-quarter view, calm direct gaze, neutral studio background, warm ochre / earth palette consistent with a serious editorial console UI. Mature, respectful, agency and competence in the face — never pitiable. Subtle Thai contextual cues appropriate to the role, understated. Flat-ish editorial vector-illustration feel, soft grain, no photo-realism.
- **Negative prompt:** photoreal face of a real identifiable person, celebrity likeness, logos, brand marks, text, watermark, distorted hands, extra fingers, low-res, oversaturated, stereotyped 'poverty' tropes, pity framing
- **Output spec:** Square 1:1, ≥ 800×800, transparent or neutral-paper background; consistent lighting/style across all four portraits in the mission so the stakeholder grid feels one set.

**QA:**
- [ ] Reads as a composite role, not an identifiable individual.
- [ ] Dignity check: competent and human, no poverty-porn.
- [ ] Style consistent with the other 3 portraits in the same mission.
- [ ] Placed at the exact path (or extension-only change made in the content module).

### B2. Portrait 02 — Respiratory clinician

- **Tool:** ChatGPT Image / Midjourney / SDXL — stylised editorial portrait
- **WIRE TO (exact path):** /assets/scenarios/sdg13-chiangmai/images/stakeholder-02.png
- **Note on format:** Code references a .svg path. Either (a) export the render as SVG-wrapped raster at this exact filename, or (b) save as .png/.webp and change only the file extension in src/scenarios/<mission>-content.js portrait field. Filename stem must stay the same.
- **Prompt:** Stylised, dignified editorial portrait illustration of a respiratory clinician — a COMPOSITE role, not a real person. Three-quarter view, calm direct gaze, neutral studio background, clean steel-blue / white palette consistent with a serious editorial console UI. Mature, respectful, agency and competence in the face — never pitiable. Subtle Thai contextual cues appropriate to the role, understated. Flat-ish editorial vector-illustration feel, soft grain, no photo-realism.
- **Negative prompt:** photoreal face of a real identifiable person, celebrity likeness, logos, brand marks, text, watermark, distorted hands, extra fingers, low-res, oversaturated, stereotyped 'poverty' tropes, pity framing
- **Output spec:** Square 1:1, ≥ 800×800, transparent or neutral-paper background; consistent lighting/style across all four portraits in the mission so the stakeholder grid feels one set.

**QA:**
- [ ] Reads as a composite role, not an identifiable individual.
- [ ] Dignity check: competent and human, no poverty-porn.
- [ ] Style consistent with the other 3 portraits in the same mission.
- [ ] Placed at the exact path (or extension-only change made in the content module).

### B3. Portrait 03 — Agribusiness procurement manager

- **Tool:** ChatGPT Image / Midjourney / SDXL — stylised editorial portrait
- **WIRE TO (exact path):** /assets/scenarios/sdg13-chiangmai/images/stakeholder-03.png
- **Note on format:** Code references a .svg path. Either (a) export the render as SVG-wrapped raster at this exact filename, or (b) save as .png/.webp and change only the file extension in src/scenarios/<mission>-content.js portrait field. Filename stem must stay the same.
- **Prompt:** Stylised, dignified editorial portrait illustration of a agribusiness procurement manager — a COMPOSITE role, not a real person. Three-quarter view, calm direct gaze, neutral studio background, warm bronze / corporate slate palette consistent with a serious editorial console UI. Mature, respectful, agency and competence in the face — never pitiable. Subtle Thai contextual cues appropriate to the role, understated. Flat-ish editorial vector-illustration feel, soft grain, no photo-realism.
- **Negative prompt:** photoreal face of a real identifiable person, celebrity likeness, logos, brand marks, text, watermark, distorted hands, extra fingers, low-res, oversaturated, stereotyped 'poverty' tropes, pity framing
- **Output spec:** Square 1:1, ≥ 800×800, transparent or neutral-paper background; consistent lighting/style across all four portraits in the mission so the stakeholder grid feels one set.

**QA:**
- [ ] Reads as a composite role, not an identifiable individual.
- [ ] Dignity check: competent and human, no poverty-porn.
- [ ] Style consistent with the other 3 portraits in the same mission.
- [ ] Placed at the exact path (or extension-only change made in the content module).

### B4. Portrait 04 — District enforcement officer

- **Tool:** ChatGPT Image / Midjourney / SDXL — stylised editorial portrait
- **WIRE TO (exact path):** /assets/scenarios/sdg13-chiangmai/images/stakeholder-04.png
- **Note on format:** Code references a .svg path. Either (a) export the render as SVG-wrapped raster at this exact filename, or (b) save as .png/.webp and change only the file extension in src/scenarios/<mission>-content.js portrait field. Filename stem must stay the same.
- **Prompt:** Stylised, dignified editorial portrait illustration of a district enforcement officer — a COMPOSITE role, not a real person. Three-quarter view, calm direct gaze, neutral studio background, muted sage / field khaki palette consistent with a serious editorial console UI. Mature, respectful, agency and competence in the face — never pitiable. Subtle Thai contextual cues appropriate to the role, understated. Flat-ish editorial vector-illustration feel, soft grain, no photo-realism.
- **Negative prompt:** photoreal face of a real identifiable person, celebrity likeness, logos, brand marks, text, watermark, distorted hands, extra fingers, low-res, oversaturated, stereotyped 'poverty' tropes, pity framing
- **Output spec:** Square 1:1, ≥ 800×800, transparent or neutral-paper background; consistent lighting/style across all four portraits in the mission so the stakeholder grid feels one set.

**QA:**
- [ ] Reads as a composite role, not an identifiable individual.
- [ ] Dignity check: competent and human, no poverty-porn.
- [ ] Style consistent with the other 3 portraits in the same mission.
- [ ] Placed at the exact path (or extension-only change made in the content module).

## Part C — Scene & data images

### C1. Hero image (journey card / briefing)

- **Tool:** ChatGPT Image / Midjourney
- **WIRE TO (exact path):** /assets/scenarios/sdg13-chiangmai/images/hero.png
- **Prompt:** Editorial wide image: the Ping valley under grey burning-season haze, Doi Suthep a faint silhouette, an upland field edge with thin smoke at the treeline; console-editorial palette, no people foreground, no text, restrained and cinematic.
- **Negative prompt:** photoreal face of a real identifiable person, celebrity likeness, logos, brand marks, text, watermark, distorted hands, extra fingers, low-res, oversaturated, stereotyped 'poverty' tropes, pity framing
- **Output spec:** 16:9, ≥ 1600px, .webp; muted for legible gold UI text.

**QA:**
- [ ] No fabricated precise statistics rendered as if real — numbers shown must be the pedagogical/illustrative values from the production master, labelled as such where visible.
- [ ] Legible at the size it renders in the dossier (test in-page).
- [ ] Placed at the exact path; filename unchanged.

### C2. Temperature-inversion diagram (dossier)

- **Tool:** Illustrator / SVG
- **WIRE TO (exact path):** /assets/scenarios/sdg13-chiangmai/images/inversion-diagram.png
- **Prompt:** Labelled cross-section of the Ping basin: cool polluted air pooled in the valley, a warm 'lid' layer above trapping it, smoke sources (field + transboundary arrow at the border). Editorial, bilingual-ready labels, illustrative only.
- **Negative prompt:** photoreal face of a real identifiable person, celebrity likeness, logos, brand marks, text, watermark, distorted hands, extra fingers, low-res, oversaturated, stereotyped 'poverty' tropes, pity framing
- **Output spec:** SVG, viewBox ~ 1000×640, legible at 720px.

**QA:**
- [ ] No fabricated precise statistics rendered as if real — numbers shown must be the pedagogical/illustrative values from the production master, labelled as such where visible.
- [ ] Legible at the size it renders in the dossier (test in-page).
- [ ] Placed at the exact path; filename unchanged.

### C3. PM2.5 season chart (data-interpretation)

- **Tool:** Vega/Observable → export SVG
- **WIRE TO (exact path):** /assets/scenarios/sdg13-chiangmai/images/pm25-chart.png
- **Prompt:** Line chart: PM2.5 across a year, sharp Feb–Apr spike into hazardous band; a marked WHO-guideline reference line; footnote 'Illustrative pedagogical figures — shape is realistic, exact values are not field data.'
- **Negative prompt:** photoreal face of a real identifiable person, celebrity likeness, logos, brand marks, text, watermark, distorted hands, extra fingers, low-res, oversaturated, stereotyped 'poverty' tropes, pity framing
- **Output spec:** SVG, legible at 680px; colour-blind-safe.

**QA:**
- [ ] No fabricated precise statistics rendered as if real — numbers shown must be the pedagogical/illustrative values from the production master, labelled as such where visible.
- [ ] Legible at the size it renders in the dossier (test in-page).
- [ ] Placed at the exact path; filename unchanged.


---

## Appendix — Chiang Mai caption (.vtt) cue text

These are written to disk by `scripts/gen-production-prompts.py` at the exact `.vtt` paths so the produced audio only has to match this text:

**/assets/scenarios/sdg13-chiangmai/audio/01-maize-grower.vtt**

> I know the smoke is bad. My own children cough too — we breathe it first, up here, before it reaches the city. But the buyer sets the date. The field must be clear in days or I lose the contract, and that contract is the only money my family sees all year. The machine to bury the stalks costs more than I earn in two seasons. If you fine me, I will still clear the field. I will just do it at night. Give me a real choice and I will take it. A fine is not a choice.

**/assets/scenarios/sdg13-chiangmai/audio/02-clinician.vtt**

> Every burning season I see the same ward fill up. Children on nebulisers, elderly patients whose oxygen falls for weeks, asthma that should be stable and is not. PM2.5 at the levels we record is not a discomfort — it is a measurable rise in admissions and, in the most fragile, in deaths. I am not asking you to ignore the farmers. I am asking you to count the children in my ward as stakeholders too.

**/assets/scenarios/sdg13-chiangmai/audio/03-procurement.vtt**

> Our contracts specify volume and delivery windows because the feed mills downstream run on a schedule we do not control. We do not tell any grower to burn — that is their field decision. We are open to a certified no-burn supply line; we have piloted one. But it needs a price premium the market has not agreed, and it needs the province to fund the machinery gap, not the buyer alone. We move when the incentives move.

**/assets/scenarios/sdg13-chiangmai/audio/04-officer.vtt**

> I am the one who knocks on the door after the satellite flags a hotspot. Honestly: a blanket ban with fines and nothing else makes my job harder. People stop talking to us. Fires move to the night. Last season we wrote penalties we could not collect, and we lost cooperation we spent years building. Enforcement works as the last step after a real alternative — not the first step instead of one.

---

# MISSION 3 — "The Klong and the City" (SDG 11, Central / Bangkok)

_Status: runtime code wired; 4 caption `.vtt` files shipped; **1 of 4 stakeholder videos live, 3 missing**; **0 of 7 images live** (hero + flood-corridor diagram + trade-off chart + 4 portraits). Produce A2–A4 first (highest learner-visible impact), then C1 (hero — needed for the journey card), then B1–B4 and C2/C3._

## Part A — Video dispatches (English subtitles BURNED IN)

### A1. Stakeholder 01 — Klong-side resident *(community treasurer / informal savings group)*

- **Thai role label:** ผู้อยู่อาศัยริมคลอง / เหรัญญิกกลุ่มออมทรัพย์ชุมชน
- **Tool:** Video production (filmed actor OR AI talking-avatar) with the EXACT English subtitle text BURNED INTO the picture — no sidecar track
- **WIRE TO (exact path — drop file here, auto-wires):** /assets/scenarios/sdg11-bangkok/video/01-resident.mp4
- **Subtitle burn-in source (.vtt):** /assets/scenarios/sdg11-bangkok/audio/01-resident.vtt
- **Portrait pairs with:** /assets/scenarios/sdg11-bangkok/images/stakeholder-01.svg
- **Target duration:** 33 s  (script ≈ 78 words → ~142 wpm)
- **Voice profile:** Thai female, mid-50s, ESL — warm but firm, **not defeated, not folksy**. A resident who has spoken at community meetings. The register of someone who organises, not someone who pleads.
- **Performance direction:** Quiet authority. The final two clauses — *"Build the corridor. But agree where we go, and make it secure, before the first wall is poured"* — land level and resolute. No pleading. Slight pause before *"Build the corridor."*
- **Video & subtitle spec:** 1080p (≥720p) MP4 H.264 + AAC, 16:9, ≤ ~12 MB. Speaker visible, neutral background. Burn the English subtitle text (below) into the lower third — high-contrast, 2 lines max, timed to speech. Do NOT ship a sidecar `.vtt`; the subtitles are part of the picture.

**SCRIPT (verbatim — speak exactly this):**

> I am not against the wall. When the klong floods, we lose everything first — the water is through my floor before it reaches any office. So do not tell me I do not understand flooding. I am against being moved like furniture. My grandmother built over this water. No title, but a community, work near here, the children's school down the lane. Standard compensation once moved my cousin's family to nowhere they could live. Build the corridor. But agree where we go, and make it secure, before the first wall is poured.

**QA checklist:**
- [ ] Spoken words AND the burned-in subtitles EXACTLY match the script — no paraphrase, no added "um", no dropped clause.
- [ ] Length within ±3 s of 33 s.
- [ ] Accent reads as authentic Thai-English for the role, never cartoonish or mocking.
- [ ] Loudness normalised to ~ -16 LUFS; no clipping; clean tail.
- [ ] Exported as MP4 (H.264/AAC) and placed exactly at /assets/scenarios/sdg11-bangkok/video/01-resident.mp4 — filename is load-bearing, do not rename.

### A2. Stakeholder 02 — BMA flood-engineering official

- **Thai role label:** เจ้าหน้าที่วิศวกรรมป้องกันน้ำท่วม กรุงเทพมหานคร
- **Tool:** Video production with subtitle burn-in (as A1)
- **WIRE TO:** /assets/scenarios/sdg11-bangkok/video/02-engineer.mp4
- **Subtitle burn-in source (.vtt):** /assets/scenarios/sdg11-bangkok/audio/02-engineer.vtt
- **Portrait pairs with:** /assets/scenarios/sdg11-bangkok/images/stakeholder-02.svg
- **Target duration:** 32 s  (script ≈ 75 words → ~140 wpm)
- **Voice profile:** Thai female, late-30s to 40s, professional Thai-municipal-briefing register. Crisp, measured, **lightly defensive** (publicly questioned) — *not cold, not villainous*. The cadence of someone whose authority depends on being technically right.
- **Performance direction:** Brisk and factual. Lightly stress *"the catchment"* and *"another monsoon."* The final line — *"I cannot sign off on leaving the catchment exposed for another monsoon"* — is the institutional voice landing the engineer's red line, said clearly without anger.
- **Video & subtitle spec:** as A1.

**SCRIPT (verbatim — speak exactly this):**

> My responsibility is the catchment. The model is not ambiguous — on this klong section a major storm overtops, and the business district and around eighty thousand commuters go under. I did not pick this alignment to be hard on anyone; it minimises hydraulic risk and build time. I hear the housing argument; I do not dismiss it. But every season we wait is a season I cannot defend if the flood comes. I can support relocation done properly. I cannot sign off on leaving the catchment exposed for another monsoon.

**QA checklist:** (as A1, swap path / duration target)

### A3. Stakeholder 03 — CBD commercial-property association

- **Thai role label:** ผู้แทนสมาคมอสังหาริมทรัพย์ย่านศูนย์กลางธุรกิจ
- **Tool:** Video production with subtitle burn-in
- **WIRE TO:** /assets/scenarios/sdg11-bangkok/video/03-business.mp4
- **Subtitle burn-in source (.vtt):** /assets/scenarios/sdg11-bangkok/audio/03-business.vtt
- **Portrait pairs with:** /assets/scenarios/sdg11-bangkok/images/stakeholder-03.svg
- **Target duration:** 30 s  (script ≈ 70 words → ~140 wpm)
- **Voice profile:** Thai male, 45–55, polished commercial English, investor-relations register. Confident, unhurried, **never villainous** — the man at the board meeting who wants the work to start on time.
- **Performance direction:** Lightly stress *"predictability"* and *"we will not pretend… owed nothing."* No filler, no rehearsal-tells. The cadence of a prepared statement, but a sincere one.
- **Video & subtitle spec:** as A1.

**SCRIPT (verbatim — speak exactly this):**

> Let me be direct. We represent offices, tenants, and the tens of thousands who commute in. The last serious flood cost businesses and workers a sum the city felt for years — that is not abstract. We support the corridor on a credible timeline. We are not deciding how relocation is handled, and we will not pretend those households are owed nothing. But a corridor announced, contested, and frozen for years protects no one. We are asking for predictability.

**QA checklist:** (as A1, swap path / duration target)

### A4. Stakeholder 04 — Community-network organiser *(bridging voice)*

- **Thai role label:** ผู้ประสานเครือข่ายชุมชน
- **Tool:** Video production with subtitle burn-in
- **WIRE TO:** /assets/scenarios/sdg11-bangkok/video/04-organiser.mp4
- **Subtitle burn-in source (.vtt):** /assets/scenarios/sdg11-bangkok/audio/04-organiser.vtt
- **Portrait pairs with:** /assets/scenarios/sdg11-bangkok/images/stakeholder-04.svg
- **Target duration:** 31 s  (script ≈ 76 words → ~147 wpm)
- **Voice profile:** Thai female, 40s–50s, warm but **rigorous** — the cadence of an experienced Thai community-network organiser. Collective, procedural, precise. *Not* a slogan voice.
- **Performance direction:** Stress *"sequencing"* and the load-bearing line *"Consent is not what slows the corridor. Doing consent last is."* Said matter-of-factly, like stating a fact that has stopped being controversial in her own mind.
- **Video & subtitle spec:** as A1.

**SCRIPT (verbatim — speak exactly this):**

> Let me be precise, because this gets dismissed as idealism. A funded, consented relocation with secure tenure is not a wish — it is Baan Mankong, and it has worked for canal communities in this city. The part the engineers miss is sequencing. Negotiate the settlement after the alignment is fixed and the community has zero power and gets worse terms — and the project is delayed anyway by the resistance. Consent is not what slows the corridor. Doing consent last is.

**QA checklist:** (as A1, swap path / duration target)

## Part B — Stakeholder portraits

> Style guide (applies to B1–B4): documentary-illustration register (NYT-Opinion / Atlantic editorial), **no identifiable face** (three-quarter / shadowed / implied), hand-feel, slight paper grain. Muted palette. Each portrait gets a single accent colour from the mission's accent ring (ochre / steel / bronze / sage). Same negative-prompt set across all four.

### B1. Portrait 01 — Klong-side resident *(accent: ochre)*

- **WIRE TO:** /assets/scenarios/sdg11-bangkok/images/stakeholder-01.svg
- **Specs:** 768×768, ≤ 180 KB. Documentary illustration; no identifiable face.
- **Prompt:** A mid-50s Thai woman on a wooden klong-side walkway at dawn, three-quarter back-of-shoulder pose, **no identifiable face**, dignified upright posture; a worn community-notebook in one hand suggesting her role as the savings-group treasurer; the dark canal water below catches a faint warm reflection from the city skyline behind. Muted earthy palette, warm ochre key-light. Slight paper grain. **Steadiness, not hardship.**
- **Negative prompt:** photograph, 3D render, anime, cartoon, vector flat, neon, glossy, oversaturated, distorted hands, watermark, identifiable face, poverty imagery, fantasy.
- **QA checklist:**
  - [ ] No identifiable face (mandatory).
  - [ ] Reads as competent / community-anchored, not pitying.
  - [ ] Ochre accent visible; palette muted.
  - [ ] Exported to the exact path above; filename is load-bearing.

### B2. Portrait 02 — BMA flood engineer *(accent: steel)*

- **WIRE TO:** /assets/scenarios/sdg11-bangkok/images/stakeholder-02.svg
- **Specs:** as B1.
- **Prompt:** A late-30s to 40s Thai woman in a civil-service office register, three-quarter pose at a desk with a flood-defence plan or topographic overlay suggested abstractly, **no identifiable face**, an ID lanyard glimpsed at the collar; behind her a faint diagrammatic hint of the catchment. Muted palette with a clean steel-grey accent on the plan; professional, **never bureaucratic-cold caricature**. Hand-feel, slight grain.
- **Negative prompt:** (as B1).
- **QA checklist:** (as B1, accent = steel).

### B3. Portrait 03 — CBD business representative *(accent: bronze)*

- **WIRE TO:** /assets/scenarios/sdg11-bangkok/images/stakeholder-03.svg
- **Specs:** as B1.
- **Prompt:** A polished 45–55 Thai man in business attire, three-quarter pose at the glass edge of a CBD high-rise, **no identifiable face**, the city below softened by reflection; a tablet or briefing folder in one hand. Muted palette with a warm bronze accent; **assured, not sinister**. Reads as the prepared statement, not the villain.
- **Negative prompt:** (as B1).
- **QA checklist:** (as B1, accent = bronze).

### B4. Portrait 04 — Community-network organiser *(accent: sage)*

- **WIRE TO:** /assets/scenarios/sdg11-bangkok/images/stakeholder-04.svg
- **Specs:** as B1.
- **Prompt:** A 40s–50s Thai woman at a community-meeting table with a planning sketch in front of her, three-quarter pose, **no identifiable face**, two-tone civic-organiser register; a soft sage accent on the documents. Hands moving mid-gesture as if explaining a sequence. Hand-feel, slight grain. **Warm and rigorous, not soft.**
- **Negative prompt:** (as B1).
- **QA checklist:** (as B1, accent = sage).

## Part C — Scene & data images

### C1. Hero image (journey card / briefing)

- **WIRE TO:** /assets/scenarios/sdg11-bangkok/images/hero.webp  *(matches `SCENARIO_META.hero` in the runtime — keep the `.webp` extension; export as real WebP **or** PNG renamed to `.webp` only if the bytes are valid WebP — never PNG bytes saved as `.webp`)*
- **Specs:** 16:9, ≥ 1600 px wide, ≤ ~600 KB.
- **Prompt:** A Bangkok klong at dawn — timber stilt homes leaning over dark water on one bank, a glass CBD skyline rising behind on the other, a narrow long-tail wake on the canal between them; the two worlds framed across the same water. Cinematic editorial photograph, natural light, restrained colour, warm amber SDG-11 ambient tone. **No people in the foreground, no text, no logos.** Slightly desaturated so gold UI text stays legible if overlaid. Mood: serious, dignified, hopeful — *not disaster-porn*.
- **Negative prompt:** photograph of a real named klong, identifiable buildings/logos, neon/oversaturated, postcard-tropical, poverty imagery, fantasy.
- **QA checklist:**
  - [ ] 16:9, ≥ 1600 px wide, ≤ ~600 KB.
  - [ ] No identifiable buildings or logos.
  - [ ] Two-worlds framing reads at a glance.
  - [ ] Bytes match extension (WebP only; **not** PNG-as-`.webp`).
  - [ ] Exported to the exact path above.

### C2. Flood-corridor diagram (dossier explainer)

- **WIRE TO:** /assets/scenarios/sdg11-bangkok/images/diagram-flood-corridor.svg
- **Specs:** SVG preferred (hover-able Thai labels) else 2048×1152 PNG ≤220 KB.
- **Prompt:** Hand-drawn scientific-illustration register (mid-century textbook / NYT explainer). Two-layer plan/section: the existing klong with stilt homes along one bank, the proposed widening + flood-wall line + pumping-station glyphs, the protected catchment behind (CBD silhouettes + commuter-route arrows, labelled "≈80,000 commuters — illustrative"), and a band of canal-side structures inside the alignment. **Clearly diagrammatic, not a map of a real canal.** Labels in English with the §2.6 vocab terms; JetBrains-Mono technical labels. Restrained palette: bone background, navy linework, ochre fills for the residential band, warm-bronze accent on the CBD glyphs.
- **Negative prompt:** photoreal, satellite-image-style, infographic-corporate, fake precise statistics, alarming-red.
- **QA checklist:**
  - [ ] Diagrammatic feel; no real-canal likeness.
  - [ ] 80k label is **explicitly illustrative** in caption.
  - [ ] Vocab terms surfaced at correct features.

### C3. Trade-off chart (PROBE data interpretation)

- **WIRE TO:** /assets/scenarios/sdg11-bangkok/images/chart-tradeoff.svg
- **Specs:** SVG or 2048×1152 PNG ≤220 KB.
- **Prompt:** Hand-finished editorial chart (FT / Reuters Graphics feel), **not** a default spreadsheet chart. Three paired bars contrasting **catchment flood-loss reduction** vs **displaced informal-tenure households** under three options: *proceed now*, *sequence-first*, *corridor with precondition*. Every value rendered as a **labelled illustrative range** with the footnote *"illustrative — not a measured statistic"*, never a point figure. SDG-11 amber accent on data series; gold gridlines.
- **Negative prompt:** invented precise statistics, default-Excel look, infographic-corporate.
- **QA checklist:**
  - [ ] Three options legible at a glance.
  - [ ] Every quantitative claim is a labelled range with the illustrative footnote.
  - [ ] No fabricated point figures.

## Appendix — Bangkok caption (.vtt) cue text

> Captions live at `/assets/scenarios/sdg11-bangkok/audio/0N-slug.vtt`. The cue text mirrors the burned-in subtitle line breaks; the cue *timings* are produced from the final video. Cue text is identical to the script word-for-word — paraphrasing breaks the in-mission transcript panel.

**/assets/scenarios/sdg11-bangkok/audio/01-resident.vtt** — script of A1 above.
**/assets/scenarios/sdg11-bangkok/audio/02-engineer.vtt** — script of A2 above.
**/assets/scenarios/sdg11-bangkok/audio/03-business.vtt** — script of A3 above.
**/assets/scenarios/sdg11-bangkok/audio/04-organiser.vtt** — script of A4 above.

---

# MISSION 4 — "The Reef and the Tide" (SDG 14, South / Andaman coast)

_Status: design master fully spec'd; **runtime code not yet built**; all assets pending. Produce hero (C1) first so the journey card has an image; then A1–A4 and B1–B4 in parallel with the runtime build._

## Part A — Video dispatches (English subtitles BURNED IN)

### A1. Stakeholder 01 — Small dive-operator / boat-crew family

- **Thai role label:** ผู้ประกอบการดำน้ำรายเล็ก / ครอบครัวลูกเรือ
- **Tool:** Video production with subtitle burn-in
- **WIRE TO:** /assets/scenarios/sdg14-andaman/video/01-operator.mp4
- **Subtitle burn-in source (.vtt):** /assets/scenarios/sdg14-andaman/audio/01-operator.vtt
- **Portrait pairs with:** /assets/scenarios/sdg14-andaman/images/stakeholder-01.png
- **Target duration:** 33 s  (script ≈ 70 words → ~127 wpm)
- **Voice profile:** Thai male or female, 35–50, working Andaman operator. Practical, **numerate about the boat and the loan**, proud of the reef — *not* a victim, *not* a denier. Plain Thai-accented English of someone who has briefed tourists for years.
- **Performance direction:** Pressed but steady. The final line — *"do not make the smallest of us pay all of it, first, alone"* — drops in volume. A private worry, not a slogan.
- **Video & subtitle spec:** as A1 of Mission 3.

**SCRIPT (verbatim — speak exactly this):**

> I know the reef is sick. I see the white coral myself. But my boat is still on a loan, and I pay it from the high season. Close the sites with no fund to carry us, and the big companies wait it out — my family does not. Protect the reef. Just do not make the smallest of us pay all of it, first, alone.

**QA checklist:** (as Mission-3 A1; swap path / duration target).

### A2. Stakeholder 02 — DMCR reef scientist

- **Thai role label:** นักวิทยาศาสตร์แนวปะการัง กรมทรัพยากรทางทะเลและชายฝั่ง
- **Tool:** Video production with subtitle burn-in
- **WIRE TO:** /assets/scenarios/sdg14-andaman/video/02-scientist.mp4
- **Subtitle burn-in source (.vtt):** /assets/scenarios/sdg14-andaman/audio/02-scientist.vtt
- **Portrait pairs with:** /assets/scenarios/sdg14-andaman/images/stakeholder-02.png
- **Target duration:** 32 s  (script ≈ 71 words → ~133 wpm)
- **Voice profile:** Thai female, 35–50, Thai-accented technical English. Careful, hedged, **evidence-bound — measured, not absolutist**. The duty register of someone delivering a finding she cannot soften without lying.
- **Performance direction:** Lightly stress *"additive"* and *"the window is closing."* No warmth performance — *this is duty register*.
- **Video & subtitle spec:** as A1.

**SCRIPT (verbatim — speak exactly this):**

> The surveys are consistent: heat stress and contact damage, and they add up. The busiest sites recover slowest. If local pressure is not cut during the window, structural recovery on these sites may not happen — and a window missed in a warm year may not come back. What happens to the operators is not my data to give. My duty is to tell you the window is closing.

**QA checklist:** (as Mission-3 A1).

### A3. Stakeholder 03 — Larger tour-company / resort operations director

- **Thai role label:** ผู้อำนวยการฝ่ายปฏิบัติการ บริษัททัวร์/รีสอร์ตรายใหญ่
- **Tool:** Video production with subtitle burn-in
- **WIRE TO:** /assets/scenarios/sdg14-andaman/video/03-tour-director.mp4
- **Subtitle burn-in source (.vtt):** /assets/scenarios/sdg14-andaman/audio/03-tour-director.vtt
- **Portrait pairs with:** /assets/scenarios/sdg14-andaman/images/stakeholder-03.png
- **Target duration:** 30 s  (script ≈ 70 words → ~140 wpm)
- **Voice profile:** Thai male or female, 40–55, polished commercial English (investor-deck register). Confident, never hurried, **articulate — not villainous**.
- **Performance direction:** Lightly stress *"predictable and applied evenly"* and *"is not neutral."* Zero filler — rehearsed voice, sincere.
- **Video & subtitle spec:** as A1.

**SCRIPT (verbatim — speak exactly this):**

> We support recovery — a dead reef is no business. We can absorb a capped season; we have boats, other sites, reserves. We ask for rules that are predictable and applied evenly. And candidly: a closure that removes the small single-boat operators while we continue elsewhere is not neutral. We will contribute to a transition fund if the framework is credible.

**QA checklist:** (as Mission-3 A1).

### A4. Stakeholder 04 — Community-cooperative leader *(bridging voice)*

- **Thai role label:** ผู้นำกลุ่มสหกรณ์ชุมชนชายฝั่ง
- **Tool:** Video production with subtitle burn-in
- **WIRE TO:** /assets/scenarios/sdg14-andaman/video/04-coop-leader.mp4
- **Subtitle burn-in source (.vtt):** /assets/scenarios/sdg14-andaman/audio/04-coop-leader.vtt
- **Portrait pairs with:** /assets/scenarios/sdg14-andaman/images/stakeholder-04.png
- **Target duration:** 34 s  (script ≈ 88 words → ~155 wpm)
- **Voice profile:** Thai male or female, 45–60, warm but **structural** — translates between science and harbour. Plain, grounded, mechanism-oriented. The sea-people reference is delivered with quiet respect, never exoticised.
- **Performance direction:** Stress *"It is sequence."* Keep 1–2 natural micro-pauses. The line about *"night trips and lost trust"* lands as a quiet warning, not a threat.
- **Video & subtitle spec:** as A1.

**SCRIPT (verbatim — speak exactly this):**

> Let me be useful, not loud. Our members are not against the reef — many learned these waters from their parents, some from sea-people families who read this coast longer than any survey. They want it to live; their grandchildren's work depends on it. The fight is not reef versus people. It is sequence. Tie the closure to a funded transition — low-season work, buoy and monitoring jobs for the crews who lose income — and we help enforce it. Order it bare, and you get night trips and lost trust.

**QA checklist:** (as Mission-3 A1).

## Part B — Stakeholder portraits

### B1. Portrait 01 — Small dive-operator *(accent: ochre)*

- **WIRE TO:** /assets/scenarios/sdg14-andaman/images/stakeholder-01.png
- **Specs:** 768×768, ≤ 180 KB.
- **Prompt:** Documentary-illustration portrait of a 35–50 Thai dive-operator at a small wooden boat, weathered hands on a line or a tank valve, work shirt, harbour behind softened by morning haze. Three-quarter / shadowed, **no identifiable face**. Dignified, alert, **tired-not-broken**. Muted palette, warm ochre key light. Slight paper grain.
- **Negative prompt:** (as Mission-3 B1).
- **QA checklist:** (as Mission-3 B1, accent = ochre).

### B2. Portrait 02 — DMCR reef scientist *(accent: steel)*

- **WIRE TO:** /assets/scenarios/sdg14-andaman/images/stakeholder-02.png
- **Specs:** as B1.
- **Prompt:** DMCR reef scientist, female-coded, **no identifiable face**, three-quarter pose on a survey boat or at a sample tray with a clipboard / underwater slate; reef-survey gear (mask, transect reel) present but understated. Composed, **evidence-bound register**. Muted palette — navy + bone, steel-grey accent.
- **Negative prompt:** (as Mission-3 B1).
- **QA checklist:** (as Mission-3 B1, accent = steel).

### B3. Portrait 03 — Tour-company director *(accent: bronze)*

- **WIRE TO:** /assets/scenarios/sdg14-andaman/images/stakeholder-03.png
- **Specs:** as B1.
- **Prompt:** Larger tour-company / resort operations director, **no identifiable face**. Polished but coastal — at a jetty office or beside a fleet of moored boats, tablet or schedule in hand. Confident, articulate, **not villainous** (warm-neutral, not sinister lighting). Muted palette, bronze accent.
- **Negative prompt:** (as Mission-3 B1).
- **QA checklist:** (as Mission-3 B1, accent = bronze).

### B4. Portrait 04 — Community-cooperative leader *(accent: sage)*

- **WIRE TO:** /assets/scenarios/sdg14-andaman/images/stakeholder-04.png
- **Specs:** as B1.
- **Prompt:** Community-cooperative leader, **no identifiable face**. Plain, grounded — at a harbour-side cooperative table or among small boats, mid-gesture as if explaining. **Bridging, mechanism-minded warmth.** If any sea-people reference appears, render only as a respectful, non-exoticised community presence (no costume, no caricature). Muted palette, sage accent.
- **Negative prompt:** (as Mission-3 B1).
- **QA checklist:** (as Mission-3 B1, accent = sage).

## Part C — Scene & data images

### C1. Hero image (journey card / briefing)

- **WIRE TO:** /assets/scenarios/sdg14-andaman/images/hero.png
- **Specs:** 16:9, ≥ 1600 px wide, ≤ ~600 KB.
- **Prompt:** An Andaman cove from just above the waterline at low light — a fringing reef shadowed under clear shallow water, a single moored long-tail boat, a limestone karst beyond; **part of the reef visibly bleached pale next to living colour**. Cinematic, restrained, oceanic SDG-14 blue ambient tone. **No people, no text.** Slightly desaturated. Mood: contemplative, dignified — *not* postcard-tropical, *not* disaster.
- **Negative prompt:** photo of a real named site, identifiable resort/boat logos, neon/oversaturated, postcard-tropical, fantasy.
- **QA checklist:** (as Mission-3 C1; bytes match extension; no identifiable site).

### C2. Reef stress & recovery diagram (BRIEF reading)

- **WIRE TO:** /assets/scenarios/sdg14-andaman/images/diagram-reef-stress-recovery.png
- **Specs:** 2048×1152 PNG ≤220 KB (PNG preferred to avoid mojibake).
- **Prompt:** Hand-drawn scientific-illustration register. Two-panel cross-section of one reef:
  - **Panel A "Stress"** — warm-water layer over the reef (heat arrows), corals paling (bleaching), plus contact-pressure icons (anchor, fins/trampling, sediment/sunscreen plume from a boat above) shown as **additive** to the heat, not separate.
  - **Panel B "Recovery, conditional"** — same reef with heat eased: a short *"months → colour returns"* arrow and a long *"years–decades → structure returns"* arrow, the long arrow **gated by a labelled valve "only if local pressure is reduced."**
  Labels in English; reserve space for Thai hover labels. Palette: bone background, navy linework, restrained ochre fills, warm-bronze accent for the stress flags. **Calm, explanatory — not alarming-red, not infographic-corporate.**
- **Negative prompt:** alarming-red, infographic-corporate, photoreal, fake precise figures.
- **QA checklist:** (as Mission-3 C2).

### C3. Pressure-recovery chart (PROBE data interpretation)

- **WIRE TO:** /assets/scenarios/sdg14-andaman/images/chart-pressure-recovery.png
- **Specs:** 2048×1152 PNG ≤220 KB.
- **Prompt:** Clean editorial chart, hand-finished (FT / Reuters Graphics feel), **not** a default spreadsheet chart. Theme: *recovery is slower where visitor pressure is higher.* X-axis: low → high visitor-density band (**qualitative bands**, not invented absolute numbers — label *"lower / moderate / higher visitor pressure"*). Y-axis: relative structural-recovery index over a fixed post-bleaching interval, 0 (none) → high. A clearly downward relationship across 3–4 site markers, each labelled generically (*"Site 1"… "Site 4"*). Caption must read as illustrative: *"illustrative — based on DMCR-supported repeat surveys; absolute values held by DMCR."* Muted palette, one bronze accent on the highest-pressure / lowest-recovery point. **No fabricated precise figures.**
- **Negative prompt:** invented precise statistics, default-Excel look.
- **QA checklist:** (as Mission-3 C3).

## Appendix — Andaman caption (.vtt) cue text

> Captions live at `/assets/scenarios/sdg14-andaman/audio/0N-slug.vtt`. Cue text is the script word-for-word. Authoring these `.vtt` files is a documented production step — they do not yet exist in the repo.

**/assets/scenarios/sdg14-andaman/audio/01-operator.vtt** — script of A1 above.
**/assets/scenarios/sdg14-andaman/audio/02-scientist.vtt** — script of A2 above.
**/assets/scenarios/sdg14-andaman/audio/03-tour-director.vtt** — script of A3 above.
**/assets/scenarios/sdg14-andaman/audio/04-coop-leader.vtt** — script of A4 above.

---

# MISSION 5 — "The Children at the Border" (SDG 4, West / Tak — Mae Sot)

_Status: design master fully spec'd; **runtime code not yet built**; all assets pending. Same production order as Andaman — hero first, then A1–A4 + B1–B4 in parallel with the runtime build._

> **Dignity-first guardrail (overrides every prompt below if it conflicts).** This mission deals with migrant and stateless children at a real-world border. **No identifiable faces in any visual** (including hero); **no poverty imagery**; **no pity register** in any portrait, transcript, or caption. Render every stakeholder — especially the most vulnerable — with **agency**, not pity. If a prompt produces an image that looks like an NGO fundraising photo, redo it.

## Part A — Video dispatches (English subtitles BURNED IN)

### A1. Stakeholder 01 — Migrant Learning Centre teacher

- **Thai role label:** ครูศูนย์การเรียนรู้สำหรับเด็กข้ามชาติ
- **Tool:** Video production with subtitle burn-in
- **WIRE TO:** /assets/scenarios/sdg04-takmaesot/video/01-mlc-teacher.mp4
- **Subtitle burn-in source (.vtt):** /assets/scenarios/sdg04-takmaesot/audio/01-mlc-teacher.vtt
- **Portrait pairs with:** /assets/scenarios/sdg04-takmaesot/images/stakeholder-01.png
- **Target duration:** 32 s  (script ≈ 66 words → ~124 wpm)
- **Voice profile:** Thai/Karen-accented English, female, 40s–50s; warm, grounded, **proud educator — not a volunteer to be pitied**. Low-to-moderate energy, one natural micro-pause before *"Build the bridge first."*
- **Performance direction:** Speaking to younger briefers she respects; the final line is **quiet conviction, not a plea — let it sit, do not over-soften**.
- **Video & subtitle spec:** as Mission-3 A1.

**SCRIPT (verbatim — speak exactly this):**

> Nine years I have taught here. Our children are learning today, in a language they understand — that is not nothing. I am not against Thai schools; I prepare children for them. I am against taking the money before the bridge is built. Build the bridge first. Then move us across. We will help carry the children over.

**QA checklist:** (as Mission-3 A1; **plus a dignity-pass on the burned-in subtitle styling — no "tear-jerk" hard-cuts on the camera, no sentimental scoring**).

### A2. Stakeholder 02 — District Education officer

- **Thai role label:** เจ้าหน้าที่สำนักงานเขตพื้นที่การศึกษา
- **Tool:** Video production with subtitle burn-in
- **WIRE TO:** /assets/scenarios/sdg04-takmaesot/video/02-district-officer.mp4
- **Subtitle burn-in source (.vtt):** /assets/scenarios/sdg04-takmaesot/audio/02-district-officer.vtt
- **Portrait pairs with:** /assets/scenarios/sdg04-takmaesot/images/stakeholder-02.png
- **Target duration:** 30 s  (script ≈ 64 words → ~128 wpm)
- **Voice profile:** Thai-administrative English, gender-neutral casting acceptable, measured public-servant register; **responsible and constrained, never villainous**. Minimal filler, light stress on *"not optional"* and *"fixed this cycle."*
- **Performance direction:** A fair-minded official under real budget pressure stating a constraint, **not defending a position cynically**.
- **Video & subtitle spec:** as A1.

**SCRIPT (verbatim — speak exactly this):**

> Education for All is not optional, and that is exactly why a permanent non-formal track that never issues a recognised credential troubles me. But my posts and budget are fixed this cycle — I cannot fund both at once. I am not closing anything for its own sake. Tell me how to sequence this within what I actually have.

**QA checklist:** (as Mission-3 A1; dignity-pass).

### A3. Stakeholder 03 — Thai government-school principal

- **Thai role label:** ผู้อำนวยการโรงเรียนรัฐบาลไทย
- **Tool:** Video production with subtitle burn-in
- **WIRE TO:** /assets/scenarios/sdg04-takmaesot/video/03-school-principal.mp4
- **Subtitle burn-in source (.vtt):** /assets/scenarios/sdg04-takmaesot/audio/03-school-principal.vtt
- **Portrait pairs with:** /assets/scenarios/sdg04-takmaesot/images/stakeholder-03.png
- **Target duration:** 31 s  (script ≈ 67 words → ~130 wpm)
- **Voice profile:** Thai-accented English, male, 45–55; plain, institutionally honest, conscientious — **not callous**. Light stress on *"I will not turn a child away"* and *"fail them politely."*
- **Performance direction:** The dry final line is **rueful honesty, not sarcasm**.
- **Video & subtitle spec:** as A1.

**SCRIPT (verbatim — speak exactly this):**

> I will not turn a child away. But I have to be honest: we are already over capacity. A large cohort in one term with no bridging staff and no new posts does not mean inclusion — it means I overwhelm every classroom. Give me the teachers and posts and I open my doors wider tomorrow. Give me only a deadline and I will fail them politely.

**QA checklist:** (as Mission-3 A1; dignity-pass).

### A4. Stakeholder 04 — NGO education coordinator *(bridging voice)*

- **Thai role label:** ผู้ประสานงานด้านการศึกษา องค์กรพัฒนาเอกชน
- **Tool:** Video production with subtitle burn-in
- **WIRE TO:** /assets/scenarios/sdg04-takmaesot/video/04-ngo-coordinator.mp4
- **Subtitle burn-in source (.vtt):** /assets/scenarios/sdg04-takmaesot/audio/04-ngo-coordinator.vtt
- **Portrait pairs with:** /assets/scenarios/sdg04-takmaesot/images/stakeholder-04.png
- **Target duration:** 32 s  (script ≈ 70 words → ~131 wpm)
- **Voice profile:** Calm, evidence-anchored bridging English, female, 30s–40s; **no grandstanding, no saviour tone**.
- **Performance direction:** *A clear-eyed analyst naming a sequencing risk, not rallying a room.* Light stress on *"enrolment is not inclusion."*
- **Video & subtitle spec:** as A1.

**SCRIPT (verbatim — speak exactly this):**

> We all want the same end state — every child in a recognised system. The fight is only about order, and order is where the harm hides. Enrolment is not inclusion. So: fund the bridging and posts first, prove absorption with a real cohort, then phase the centres down against demonstrated capacity — not against a calendar.

**QA checklist:** (as Mission-3 A1; dignity-pass).

## Part B — Stakeholder portraits

> Style note: **no identifiable face is mandatory in every portrait** — soft, three-quarter, or implied. The dignity guard is the hardest constraint in this mission.

### B1. Portrait 01 — MLC teacher *(accent: ochre)*

- **WIRE TO:** /assets/scenarios/sdg04-takmaesot/images/stakeholder-01.png
- **Specs:** 768×768, ≤ 180 KB.
- **Prompt:** Documentary-illustration portrait of a 40s–50s Thai/Karen woman in a simple open-sided learning-centre at morning, mid-gesture as if mid-sentence, classroom materials and a small chalkboard suggested behind. **No identifiable face.** Conveys **expertise and steadiness — an educator, not a victim**. Muted palette, hand-feel, slight grain. Warm ochre key-light.
- **Negative prompt:** photograph, 3D, anime, cartoon, vector flat, identifiable face, NGO-poster style, pity register, fundraising-photo composition.
- **QA checklist:** (as Mission-3 B1; **plus dignity-pass — does this look like an NGO fundraising portrait? if yes, redo**).

### B2. Portrait 02 — District Education officer *(accent: steel)*

- **WIRE TO:** /assets/scenarios/sdg04-takmaesot/images/stakeholder-02.png
- **Specs:** as B1.
- **Prompt:** District Education officer at a desk with allocation papers, **measured and fair-minded posture — institutional but human, not bureaucratic-cold caricature**. **No identifiable face.** Muted palette, steel accent on the documents.
- **Negative prompt:** (as B1).
- **QA checklist:** (as B1).

### B3. Portrait 03 — Thai government-school principal *(accent: bronze)*

- **WIRE TO:** /assets/scenarios/sdg04-takmaesot/images/stakeholder-03.png
- **Specs:** as B1.
- **Prompt:** Government-school principal in a corridor or doorway of an evidently full school (a press of empty desks or a crowded coat-rack hint at over-capacity, **never the children themselves**). **Conscientious and plain — concerned, not callous.** No identifiable face. Muted palette, bronze accent.
- **Negative prompt:** (as B1).
- **QA checklist:** (as B1).

### B4. Portrait 04 — NGO education coordinator *(accent: sage)*

- **WIRE TO:** /assets/scenarios/sdg04-takmaesot/images/stakeholder-04.png
- **Specs:** as B1.
- **Prompt:** NGO education coordinator with field notes / a simple sequencing sketch on a clipboard, **calm and analytical — bridging, not saviour**. No identifiable face. Muted palette, sage accent.
- **Negative prompt:** (as B1) + *saviour pose, hands-on-shoulders-of-child composition*.
- **QA checklist:** (as B1).

## Part C — Scene & data images

### C1. Hero image (journey card / briefing)

- **WIRE TO:** /assets/scenarios/sdg04-takmaesot/images/hero.png
- **Specs:** 16:9, ≥ 1600 px wide, ≤ ~600 KB.
- **Prompt:** A border-district learning space at morning — a simple open-sided classroom shelter at the edge of a field, the Moei river and hills of the frontier in the far haze, worn benches and a small chalkboard; **dignified, warm, hopeful — never pitiable**. Soft red-toned SDG-4 ambient light. **No identifiable faces, no children, no text, no logos.**
- **Negative prompt:** identifiable faces, child portraiture, poverty imagery, NGO-poster style, neon/oversaturated.
- **QA checklist:** (as Mission-3 C1; **dignity-pass**: no children, no pity).

### C2. Two-systems diagram (BRIEF explainer)

- **WIRE TO:** /assets/scenarios/sdg04-takmaesot/images/diagram-two-systems.png
- **Specs:** 2048×1152 PNG ≤220 KB.
- **Prompt:** Hand-drawn explanatory graphic (NYT-explainer feel) showing the **two parallel pathways** and the sequencing crux:
  - **Branch A** — "Migrant Learning Centre" — learning now, own language, donor-funded, **credential recognition uncertain**.
  - **Branch B** — "Thai government school" — recognised credential, **needs Thai bridging + posts + capacity**.
  - **Central element** — a labelled valve / span *"BRIDGE: language + teachers + credential recognition"*, with an explicit arrow showing the **gap risk if funding moves before the bridge is built**.
  Restrained linework, **no faces**, neutral tone — analytical, not emotive.
- **Negative prompt:** photoreal, children, faces, alarming-red, infographic-corporate.
- **QA checklist:** (as Mission-3 C2; gap-risk arrow must be **explicitly labelled**).

### C3. Allocation chart (PROBE data interpretation)

- **WIRE TO:** /assets/scenarios/sdg04-takmaesot/images/chart-allocation.png
- **Specs:** 2048×1152 PNG ≤220 KB.
- **Prompt:** A clean, honest chart visualising **illustrative ranges only** (explicitly labelled *"illustrative — not measured figures"*): a stacked band showing the cohort split across *"government school / community learning centre / neither,"* drawn as **fuzzy ranges with a visible "uncounted" band** — deliberately *not* false precision. Caption states the data are illustrative per the design master §1.5. Documentary-illustration palette; legend in EN with Thai gloss.
- **Negative prompt:** invented precise statistics, default-Excel look, infographic-corporate.
- **QA checklist:** (as Mission-3 C3; the *"uncounted"* band must be visible and labelled).

## Appendix — Mae Sot caption (.vtt) cue text

**/assets/scenarios/sdg04-takmaesot/audio/01-mlc-teacher.vtt** — script of A1 above.
**/assets/scenarios/sdg04-takmaesot/audio/02-district-officer.vtt** — script of A2 above.
**/assets/scenarios/sdg04-takmaesot/audio/03-school-principal.vtt** — script of A3 above.
**/assets/scenarios/sdg04-takmaesot/audio/04-ngo-coordinator.vtt** — script of A4 above.

---

# MISSION 6 — "The Village the Boom Left Behind" (SDG 3, East / EEC fringe)

_Status: design master fully spec'd; **runtime code not yet built**; all assets pending. Same production order — hero first, then A1–A4 + B1–B4 in parallel with the runtime build._

## Part A — Video dispatches (English subtitles BURNED IN)

### A1. Stakeholder 01 — Grandmother raising grandchildren *(household head)*

- **Thai role label:** ยายผู้เลี้ยงดูหลาน / หัวหน้าครัวเรือน
- **Tool:** Video production with subtitle burn-in
- **WIRE TO:** /assets/scenarios/sdg03-eecfringe/video/01-grandmother.mp4
- **Subtitle burn-in source (.vtt):** /assets/scenarios/sdg03-eecfringe/audio/01-grandmother.vtt
- **Portrait pairs with:** /assets/scenarios/sdg03-eecfringe/images/stakeholder-01.png
- **Target duration:** 33 s  (script ≈ 75 words → ~136 wpm)
- **Voice profile:** Thai female, 60s–70s, second-language English, gentle and **steady, not frail**. The performance must read as *competent and proud*, never pitiable — **dignity is the whole point of this voice**.
- **Performance direction:** One natural pause before *"I do not need sorrow."* Final line firm, quiet, **resolved — an ask, not a plea**.
- **Video & subtitle spec:** as Mission-3 A1.

**SCRIPT (verbatim — speak exactly this):**

> I am not asking for pity — I run this house. My son and his wife are in the factory town; they send money, they come when they can. I raise the two children. My blood-pressure medicine, I need every month. The hospital is more than an hour each way, and on those days no one watches the children. The volunteer is good but she has too many houses. I do not need sorrow. I need the care to come closer.

**QA checklist:** (as Mission-3 A1; **dignity-pass — frame her as the household's anchor, not its victim**).

### A2. Stakeholder 02 — Provincial health officer

- **Thai role label:** เจ้าหน้าที่สาธารณสุขจังหวัด
- **Tool:** Video production with subtitle burn-in
- **WIRE TO:** /assets/scenarios/sdg03-eecfringe/video/02-provincial-officer.mp4
- **Subtitle burn-in source (.vtt):** /assets/scenarios/sdg03-eecfringe/audio/02-provincial-officer.vtt
- **Portrait pairs with:** /assets/scenarios/sdg03-eecfringe/images/stakeholder-02.png
- **Target duration:** 32 s  (script ≈ 72 words → ~135 wpm)
- **Voice profile:** Thai female, 40s–50s, measured public-service English of the Thai-ministry-briefing register. **Responsible and constrained, not callous.**
- **Performance direction:** Lightly stress *"the budget I am actually given"* and *"a position I can sustain."* Briefing cadence, minimal filler.
- **Video & subtitle spec:** as A1.

**SCRIPT (verbatim — speak exactly this):**

> My mandate is the whole province, with the staff and budget I am actually given. The EEC-town facilities carry the largest load; if they fail, more people are harmed. I do not dispute the fringe villages are under-served — I see those numbers. But I cannot fund a distributed model on a reform that is not approved, then watch it collapse in two years. Give me a position I can sustain, not the most generous one on paper.

**QA checklist:** (as A1).

### A3. Stakeholder 03 — EEC-town hospital administrator *(efficiency case)*

- **Thai role label:** ผู้บริหารโรงพยาบาลในเมือง EEC / นักเศรษฐศาสตร์สุขภาพ
- **Tool:** Video production with subtitle burn-in
- **WIRE TO:** /assets/scenarios/sdg03-eecfringe/video/03-eec-administrator.mp4
- **Subtitle burn-in source (.vtt):** /assets/scenarios/sdg03-eecfringe/audio/03-eec-administrator.vtt
- **Portrait pairs with:** /assets/scenarios/sdg03-eecfringe/images/stakeholder-03.png
- **Target duration:** 31 s  (script ≈ 70 words → ~135 wpm)
- **Voice profile:** Thai male, 45–55, clear analytical English. Confident but **not a caricature bean-counter** — he is making *"the uncomfortable case"* sincerely.
- **Performance direction:** Lightly stress *"efficiency is not a dirty word"* and *"with your eyes open."* **Assured, slightly challenging, never sneering.**
- **Video & subtitle spec:** as A1.

**SCRIPT (verbatim — speak exactly this):**

> Let me make the uncomfortable case, because it is real. My hospital absorbs the workers who power this economy and the overflow when the villages cannot cope. We run at capacity. Every post moved to a clinic seeing a handful a day is a post off my wards, where it would serve far more. I am not against the villages. But efficiency is not a dirty word when staff are this scarce — choose the distributed model with your eyes open about who waits longer here.

**QA checklist:** (as A1).

### A4. Stakeholder 04 — อสม. village health volunteer *(bridging voice)*

- **Thai role label:** อาสาสมัครสาธารณสุขประจำหมู่บ้าน (อสม.)
- **Tool:** Video production with subtitle burn-in
- **WIRE TO:** /assets/scenarios/sdg03-eecfringe/video/04-osm-volunteer.mp4
- **Subtitle burn-in source (.vtt):** /assets/scenarios/sdg03-eecfringe/audio/04-osm-volunteer.vtt
- **Portrait pairs with:** /assets/scenarios/sdg03-eecfringe/images/stakeholder-04.png
- **Target duration:** 34 s  (script ≈ 82 words → ~145 wpm)
- **Voice profile:** Thai female, 50–60, warm community-care register, English clear but unrehearsed (**1–2 natural micro-hesitations — keep them**). Concrete, house-by-house, observational.
- **Performance direction:** The line *"Most days, here, I am the system"* is the **quiet centre — state it plainly, no melodrama**.
- **Video & subtitle spec:** as A1.

**SCRIPT (verbatim — speak exactly this):**

> I am not a nurse. I am from this village; I do this without a salary because someone must. I have a notebook. I know which grandmother's pressure is high with her children away, which elder stopped eating after his wife died, which one has no one to reach the hospital this month. Most days, here, I am the system. I do not want to replace the hospital. A little more support for people like me — and a clinic that comes here — catches most of this before it becomes an ambulance.

**QA checklist:** (as A1).

## Part B — Stakeholder portraits

### B1. Portrait 01 — Grandmother *(accent: ochre)*

- **WIRE TO:** /assets/scenarios/sdg03-eecfringe/images/stakeholder-01.png
- **Specs:** 768×768, ≤ 180 KB.
- **Prompt:** Stylised documentary portrait of a 60s–70s Thai woman in a fringe-village home, **dignified upright posture**, three-quarter pose, **no identifiable face**; a household notebook or a kitchen pot suggested in soft focus behind her, the door open to a quiet road. Warm gold key-light. **Strictly no pity / frailty visual cues — she is the household's anchor.** Consistent portrait frame with the other three.
- **Negative prompt:** (as Mission-3 B1) + *frail-elder cliché, hunched pose, hospital-bed framing*.
- **QA checklist:** (as Mission-3 B1; **dignity-pass** mandatory).

### B2. Portrait 02 — Provincial health officer *(accent: steel)*

- **WIRE TO:** /assets/scenarios/sdg03-eecfringe/images/stakeholder-02.png
- **Specs:** as B1.
- **Prompt:** Stylised portrait, **composed institutional bearing**, neutral steel accent. Reads as *responsible and constrained, not cold*. No identifiable face.
- **Negative prompt:** (as B1).
- **QA checklist:** (as B1).

### B3. Portrait 03 — EEC-town hospital administrator *(accent: bronze)*

- **WIRE TO:** /assets/scenarios/sdg03-eecfringe/images/stakeholder-03.png
- **Specs:** as B1.
- **Prompt:** Stylised portrait, **confident analytical bearing**, bronze accent. Reads as a **sincere advocate of the efficiency case, not a villain**. No identifiable face.
- **Negative prompt:** (as B1) + *bean-counter caricature*.
- **QA checklist:** (as B1).

### B4. Portrait 04 — อสม. village health volunteer *(accent: sage)*

- **WIRE TO:** /assets/scenarios/sdg03-eecfringe/images/stakeholder-04.png
- **Specs:** as B1.
- **Prompt:** Stylised portrait, **warm and grounded**, sage accent, a notebook motif suggested abstractly. Reads as the **trusted frontline bridge**. No identifiable face.
- **Negative prompt:** (as B1).
- **QA checklist:** (as B1).

## Part C — Scene & data images

### C1. Hero image (journey card / briefing)

- **WIRE TO:** /assets/scenarios/sdg03-eecfringe/images/hero.png
- **Specs:** 16:9, ≥ 1600 px wide, ≤ ~600 KB.
- **Prompt:** An eastern-Thailand fringe village at dusk — quiet wooden houses, an **empty community-clinic porch with a single light on**, the **glow of EEC industry on the far horizon**; the contrast of a hollowed village against distant growth. Cinematic, tender, green SDG-3 ambient tone. **No people in the foreground, no text, no logos.**
- **Negative prompt:** identifiable buildings, neon/oversaturated, pity imagery, fantasy.
- **QA checklist:** (as Mission-3 C1; **the EEC glow on the horizon and the clinic-porch light must both be visible**).

### C2. Demographic-hollowing diagram (BRIEF explainer)

- **WIRE TO:** /assets/scenarios/sdg03-eecfringe/images/diagram-demographic-hollowing.png
- **Specs:** 2048×1152 PNG ≤220 KB.
- **Prompt:** A clean explanatory schematic: **three population bands** (*older adults · absent working-age middle · grandchildren*) drawn for *"intact village"* vs *"hollowed fringe village,"* with an arrow showing the middle band relocating toward an EEC-town glyph. Labelled with the §2.6 vocab terms (*migration*, *hollowed*, *demographic*). **Uses bands and arrows, not invented numbers** — illustrative, axis-honest, no fake statistics. JetBrains-Mono technical labels.
- **Negative prompt:** photoreal, invented precise statistics, infographic-corporate, alarming-red.
- **QA checklist:** (as Mission-3 C2; bands and arrows only, **no fake percentages**).

### C3. Access-gap chart (PROBE data interpretation)

- **WIRE TO:** /assets/scenarios/sdg03-eecfringe/images/chart-access-gap.png
- **Specs:** 2048×1152 PNG ≤220 KB.
- **Prompt:** A deliberately **schematic two-axis chart**: horizontal = patient *volume*, vertical = *unmet need*, with **two labelled zones** — *"EEC-town facilities (high volume, lower unmet need)"* and *"fringe villages (low volume, high unmet need)"* — visualising why volume-based allocation misses the high-need group (Source B argument). **Explicitly marked *"illustrative — not measured data"*** in caption; **no numeric axis ticks**, only direction. Honors the never-invent-statistics discipline.
- **Negative prompt:** invented precise statistics, default-Excel look, infographic-corporate.
- **QA checklist:** (as Mission-3 C3; **no numeric axis ticks** — direction only).

## Appendix — EEC fringe caption (.vtt) cue text

**/assets/scenarios/sdg03-eecfringe/audio/01-grandmother.vtt** — script of A1 above.
**/assets/scenarios/sdg03-eecfringe/audio/02-provincial-officer.vtt** — script of A2 above.
**/assets/scenarios/sdg03-eecfringe/audio/03-eec-administrator.vtt** — script of A3 above.
**/assets/scenarios/sdg03-eecfringe/audio/04-osm-volunteer.vtt** — script of A4 above.

---

*End of Asset Production Prompt Master (all six missions).*
*Authored 2026-05-22 — Missions 1–2 from `scripts/gen-production-prompts.py`; Missions 3–6 from the per-mission `PRODUCTION-MASTER.md` design docs.*

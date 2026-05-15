# Production Workflow · SDG 6 Khon Kaen Scenario

This document is the **practical step-by-step** for converting the prompts
already drafted in `/scenarios/sdg06-khonkaen-aquifer-v1/PRODUCTION-PROMPTS.md`
into shipped MP3 audio and a polished hero image. It captures the
**ElevenLabs-specific settings** and **ChatGPT Image-specific tweaks**
learned from generating the landing page background.

## What's already shipped (no production needed)

All seven of these are already live on the site:

| Asset | File | Format |
|---|---|---|
| 4 stakeholder portraits | `images/stakeholder-01..04.svg` | SVG editorial silhouettes |
| Aquifer cross-section | `images/aquifer-crosssection.svg` | SVG explanatory diagram |
| Drawdown chart | `images/drawdown-chart.svg` | SVG data viz |
| Watershed map | `images/watershed-map.svg` | SVG hand-drawn cartography |
| 6 caption files | `audio/*.vtt` | WebVTT timecode + text |

## What still needs production (your hands)

| Asset | Tool | Cost estimate | Time estimate |
|---|---|---|---|
| 4 stakeholder MP3s + crisis + tribunal (6 total) | ElevenLabs | ~$5–15 in credits | 60–90 min |
| 1 hero photograph | ChatGPT Image 2.0 or Midjourney v6+ | ~$0.50 in credits | 15–30 min |

---

## PART A — ElevenLabs Audio Production

### Workflow overview

```
1. Open ElevenLabs Studio (https://elevenlabs.io/app/speech-synthesis)
2. For each of the 6 scripts:
   a. Paste the script (from PRODUCTION-PROMPTS.md or below)
   b. Set voice + stability/similarity/style per the spec
   c. Generate
   d. Listen + regenerate if needed (Style 25–70 controls variance)
   e. Download MP3
   f. Rename per filename convention
   g. Drop into /assets/scenarios/sdg06-khonkaen/audio/
3. Refresh mission cockpit — audio integrates automatically
```

### Voice selection ladder (production tier — Q4 decision lock)

| Asset | Voice tier | Selection method |
|---|---|---|
| A1 Smallholder farmer | **Clone** | Source from real Thai male 60+ reading English at calm pace (60-sec sample → upload → name "Khon Kaen Farmer") |
| A4 Community Health Volunteer | **Clone** | Source from real Thai female 50s reading community-health bulletin material |
| A2 PWA Manager | Library | Search "professional Thai-accented English female" — try **Sarah** or **Charlotte** with low Style |
| A3 Plant Director | Library | Search "executive English male" — **Daniel** or **George** with low Style |
| A5 Crisis Dispatch | Library | News-anchor voices — **Charlie** (urgent) or **Brian** (composed) |
| A6 Tribunal Opening | Library | Older mature voice — **George** or use Voice Designer "panel chair" preset |

### ElevenLabs Settings — copy/paste exact values

For each generation, use these EXACT settings under "Advanced":

| Asset | Stability | Similarity | Style | Speaker Boost |
|---|---|---|---|---|
| A1 Farmer (cloned) | **55** | **70** | **25** | ON |
| A2 PWA Manager | **65** | **75** | **20** | ON |
| A3 Plant Director | **65** | **75** | **20** | ON |
| A4 Health Volunteer (cloned) | **55** | **70** | **25** | ON |
| A5 Crisis Dispatch | **70** | **70** | **15** | (off OK) |
| A6 Tribunal Opening | **70** | **75** | **15** | (off OK) |

### Model recommendation

- **Eleven Multilingual v2** — for the 4 stakeholders (handles the
  Thai-accented English naturally; better at the hesitations and pauses)
- **Eleven English v2** — for Crisis Dispatch + Tribunal Opening
  (cleaner news-anchor / panel-chair delivery)

### Scripts — paste verbatim

**A1 · Smallholder Rice Farmer · 32 sec target**
```
My family has farmed this land for three generations.
The shallow well in our yard — it used to run all year.

Now? By March, it gives nothing.

I hear the province will dig deeper wells in town.
I do not blame them. People need to drink.
But the water under our feet is the same water.
If they pull more, mine runs dry sooner.
That is just how the ground works.
```
**Direction note (paste in description field if available):** *Read as if you are speaking to a young reporter who has come to your house. You are not angry — you are worried. Pause after the second sentence. Final sentence drops in volume — this is a private thought, not a slogan.*

**A2 · PWA Operations Manager · 32 sec**
```
Our statutory mandate is clear: continuous potable water to around two hundred thousand residents in this service area.

In each of the last three drought years, we came within days of supply interruption.

The twelve-well expansion is sized to provide a residual margin during a one-in-fifty-year dry season.

We have heard the concerns from rural districts and from the university working paper. We are prepared to commission additional monitoring. But taps must run.
```
**Direction:** *Briefing register · light stress on "statutory mandate" and "residual margin" · no warmth · responsible authority.*

**A3 · Food-Processing Director · 30 sec**
```
Our facility holds a groundwater extraction permit issued under the framework that has governed industrial water use in this region for nearly five decades.

We extract from the deep confined layer, well below any household well. Our extraction volume is monitored and reported quarterly.

We support sustainable allocation. We do not support retroactive cancellation of permits granted in good faith. A predictable regulatory environment is essential.
```
**Direction:** *Investor-deck register · lightly stress "good faith" and "predictable regulatory environment" · smooth confidence.*

**A4 · Community Health Volunteer (อสม.) · 34 sec**
```
I have walked the houses in my sub-district for eleven years.

When the shallow wells fail in March, families turn to ponds or river water. Within two weeks, mothers bring children with diarrhoea to our health post.

Older residents stop drinking enough because they do not trust the taste. Dehydration in the elderly is a quieter problem, but it is real.

Please remember the children when you decide.
```
**Direction:** *Warm community register · two natural hesitations preserved · final line firm but not weepy · let it sit.*

**A5 · Crisis Dispatch · 42 sec**
```
This is an urgent advisory from the PWA Khon Kaen branch.

At approximately fourteen-thirty this afternoon, a group of around forty smallholder farmers from Nong Rua District blocked the access road to Municipal Wellfield Number Four. The farmers are demanding a public consultation on the proposed twelve-well expansion before any drilling proceeds.

PWA crew on site have withdrawn to a safe distance. No injuries have been reported.

The provincial governor's office has requested a public statement from the briefing team within twelve minutes. Local press are en route.

Submit your eighty- to one-hundred-twenty-word statement when ready.
```
**Direction:** *Dispatch-room register · urgent but not panicked · "twelve minutes" must be clearly enunciated (triggers the M3 timer).*

**A6 · Tribunal Opening · 32 sec**
```
This tribunal is now in session.

The matter before us is the proposed expansion of the Khon Kaen municipal wellfield by twelve deep wells.

Your team has been asked to defend its recommended position.

You will face four rounds of questioning.

We are not here to trap you. We are here to test whether your reasoning holds when others push back.

Begin.
```
**Direction:** *Panel-chair gravitas · long pauses preserved · final word "Begin." is the cue (M5 timer starts on this word).*

### Post-generation QA

For each MP3 before saving:

- [ ] Duration within ±3s of target
- [ ] No "AI giveaway" (over-perfect cadence at exactly N words/minute)
- [ ] Pauses audible where indicated in script
- [ ] No mispronunciations of key terms ("aquifer," "drawdown," "Nong Rua")
- [ ] No background music or radio effects (must be dry / no FX)
- [ ] Export as MP3 mono 128 kbps · target file size ≤ 500 KB
- [ ] Filename matches exactly:
  - `01-rice-farmer.mp3`
  - `02-pwa-manager.mp3`
  - `03-plant-director.mp3`
  - `04-health-volunteer.mp3`
  - `crisis-dispatch.mp3`
  - `tribunal-open.mp3`

### Voice cloning tutorial (for A1 + A4)

If you go the cloned route for the farmer + อสม. (recommended for
authenticity per Q4 decision):

1. ElevenLabs → "Voices" → "Add a new voice" → **Instant Voice Cloning**
2. Upload **a single 1–3 minute sample** of the target speaker reading
   English at calm pace
3. Name the voice: "Khon Kaen Farmer (Thai male 60+)" or
   "Khon Kaen อสม. (Thai female 50s)"
4. Use the new voice in Step 2 of the workflow above

**Where to get source audio:**
- YouTube interviews with Thai farmers or community workers reading English
- Thai TV agricultural extension programs (must be public-domain or your-own-recording)
- Your own recording of a colleague reading English aloud
- **Required:** explicit consent from the source speaker (record it in writing)

---

## PART B — Hero Image Production

### Workflow overview

```
1. Open ChatGPT Image 2.0 (or Midjourney/Gemini Imagen 3)
2. Paste the prompt below (Direction A1)
3. Generate 4 variants
4. Pick the best (use QA checklist below)
5. Upscale to 4K if needed (Magnific.ai or Topaz Gigapixel)
6. Save as hero.png
7. Drop into /assets/scenarios/sdg06-khonkaen/images/hero.png
8. (Optional) Convert to WebP for production
```

### Primary prompt — paste verbatim

```
A cinematic, high-fashion editorial photograph for an educational
platform about Thailand's water-allocation dilemmas. 16:9 widescreen.
Ultra-high resolution. Photographed, not illustrated.

SUBJECT: A young Thai person, gender-neutral, mid-twenties, photographed
in soft three-quarter profile. The figure is positioned in the left
third of the frame, eyes closed or gazing peacefully toward a distant
horizon of golden light. Expression conveys quiet determination and
contemplation — neither smiling nor sombre. Skin rendered with natural
warmth. The figure wears a contemporary minimal garment in off-white
or warm linen, no logos, no patterns. Hair dark, softly lit at edges
by rim light.

COMPOSITION: Wide cinematic frame. Figure occupies the left third
(rule of thirds, left vertical). The right two-thirds is a soft,
slightly out-of-focus expanse — atmospheric and visually quiet —
leaving clean negative space for a large title overlay. The centre
contains drifting dust motes catching directional light.

ENVIRONMENT: A pre-dawn rice paddy in rural Northeast Thailand
extends into the distance behind the figure. Soft mist rolls between
the paddies. The far horizon glows warm gold. An old wooden hand-pump
well is visible in the foreground at left edge. A single industrial
water pipe runs along the upper horizon line, connecting two worlds.

LIGHTING: Editorial high-fashion lighting reminiscent of Annie
Leibovitz or Paolo Roversi. Warm golden-hour rim light from the
right side catching the figure's silhouette. Soft fill shadow on
the left of the face. Chiaroscuro contrast with deep navy shadows.
Shallow depth of field — subject critically sharp, background diffuses.

MOOD: Reverent, hopeful, contemplative. A still from a slow, beautiful
film about human flourishing. Restraint over spectacle. The photograph
should feel like it could hang in a museum, not on a billboard.

PALETTE: Dominated by deep navy and warm bronze, with bone-white skin
tones. Avoid saturated candy colours. Monochrome-warm with one accent
of warm bronze in the morning light catching the well's pump handle.

TEXTURE: Subtle film grain. Atmospheric haze in mid-ground.
Photographed on Kodak Portra or Fujifilm GFX, not digitally rendered.

AVOID: UN logo, literal SDG color wheel, infographics, icons, graphic
design elements, flag imagery, text, words, numerals, watermarks,
corporate stock photo aesthetic, smiling-at-camera handshake imagery,
multiple-people-forming-a-circle unity cliché, oversaturated neon
colours, cartoon, anime, illustration, 3D render, AI artifacts on
hands, clutter in the centre of the frame.
```

### Alternative directions if Direction A doesn't work first try

**Direction B · Hands holding cupped water (more minimal)**
```
A close-up editorial photograph of two cupped hands of a Thai person
holding a small pool of water. 16:9 widescreen. The water surface
catches a sliver of golden dawn light. Background: soft deep-navy
out-of-focus void with subtle dust motes. The hands are positioned
in the lower-left third of the frame. Shallow depth of field,
high-fashion editorial lighting in the style of Hermès or Loewe
campaign photography. No skin retouching — film realism preserved.
Reverent, minimal, gallery-grade. No text, no logos.
```

**Direction C · Landscape only (no human subject)**
```
A cinematic landscape photograph at golden-hour dawn over a Thai
rice terrace in the Khorat Plateau. 16:9 widescreen. Mist rolls
between the terraces catching warm directional light. In the upper
third of the frame, a delicate aurora arcs across the sky — soft
prismatic gradient of atmospheric light. Lower third darker,
anchoring the composition. Empty center for headline overlay.
Slow film still aesthetic, medium-format, deep depth of field,
slight grain. Style: Sebastião Salgado meets Murray Fredericks.
No people, no text, no infographic elements.
```

### Image QA checklist

Before saving the hero.png file:

- [ ] **Centre is quiet** — squint at the image: the area where headline overlay sits should feel like negative space
- [ ] **No literal SDG iconography** — no logo, wheel, flag, letters, or numerals visible
- [ ] **Hands and faces** (if present) — no AI distortion; extra fingers / melted features / doubled eyes = regenerate
- [ ] **Subject reads as Thai or pan-Asian** without leaning into stereotype (no overt traditional dress, no folkloric props)
- [ ] **Contrast** — drop a black "FUTUREPROOF" placeholder over the centre in Preview/Photoshop. Can you read it?
- [ ] **Mood** — slow film still, not corporate stock photo. If the latter, regenerate.

### Where to drop the file

After generation + selection + upscaling:

```
/Users/yungie/futureproof-project/assets/scenarios/sdg06-khonkaen/images/hero.png
```

Then run:

```bash
cd /Users/yungie/futureproof-project
git add assets/scenarios/sdg06-khonkaen/images/hero.png
git commit -m "Khon Kaen scenario · hero photograph added"
git push origin main
```

Netlify auto-deploys in ~14s.

---

## PART C — Production order recommendation

Best order to do this in:

1. **VTT captions** — ✅ already shipped (gave you a UDL-compliant baseline)
2. **All 4 stakeholder MP3s** — these are heard MOST often (every Mission 1 visit) → highest impact
3. **Hero image** — sets brand impression at scenario entry
4. **Crisis dispatch + tribunal opening** — heard once per session each → lower priority

If you only have time for ONE production pass before May 30, do the 4
stakeholder MP3s. The crisis dispatch can survive on the VTT-only fallback
(student reads the script instead of hearing it).

---

## PART D — How to know when production is complete

After dropping any new file into `/assets/scenarios/sdg06-khonkaen/`,
update the corresponding entry in `manifest.json`:

```json
{
  "shipped": false,    // ← change to true once the file is in place
}
```

Then bump `shippedStatus.audioReady` or `imagesReady` accordingly.

This makes the QA pass before submission trivial: cat the manifest.json,
look for `"shipped": false`, that's your remaining production work.

---

*Production workflow generated 2026-05-15 · supersedes earlier prompt-only
draft in PRODUCTION-PROMPTS.md by adding ElevenLabs-specific settings
and per-file QA gates.*

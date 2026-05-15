# PRODUCTION PROMPTS — "The Aquifer Below Khon Kaen"

Ready-to-use prompts for asset generation. Extracted from `PRODUCTION-MASTER.md` §3 (audio) and §4 (images).

**Tooling:**
- Audio (6 assets) → **ElevenLabs**
- Images (5 assets, 8 outputs counting 4 portraits) → **ChatGPT Image / Gemini / Midjourney / Stable Diffusion**

**Voice production tier** (per Q4 decision):
- **Clone** Stakeholder 1 (farmer) + Stakeholder 4 (อสม.) from real Thai speakers
- **Library voices** for Stakeholder 2 (PWA), Stakeholder 3 (food-processing director), Crisis Dispatch, Tribunal Opening

---

# PART A — AUDIO PROMPTS (ElevenLabs)

Each prompt has 4 parts: **voice profile**, **performance direction** (paste into voice settings), **script** (the actual text to synthesize), **QA checklist**.

---

## A1. Stakeholder 01 — Smallholder Rice Farmer

**Production tier:** Cloned voice (highest authenticity)

### Voice profile
```
Thai male, 55-65 years old. English as a second language, gentle
Isaan-accented English. Vowels slightly elongated, final consonants
sometimes softened — but NOT exaggerated. This is a working farmer
who has spoken English at agricultural extension meetings for
decades, not a caricature.

Pitch: lower-mid register.
Pace: 110-125 wpm.
Energy: low-to-moderate. Tired but not defeated.
Filler: 1-2 small natural pauses ("...you know"). Do NOT polish.

Library category to test first: "Mature / Storyteller / Documentary"
(male). If cloning, source from a male Thai speaker (60+) reading
English news at calm pace.
```

### Performance direction (ElevenLabs settings)
```
Stability: 55
Similarity: 70
Style exaggeration: 25
Speaker boost: ON

Director note: "Read as if you are speaking to a young reporter
who has come to your house. You are not angry — you are worried.
Pause after the second sentence. Final sentence drops in volume —
this is a private thought, not a slogan."
```

### Script (62 words, ~32 s at 115 wpm)
```
My family has farmed this land for three generations.
The shallow well in our yard — it used to run all year.

[pause 1s]

Now? By March, it gives nothing.

I hear the province will dig deeper wells in town.
I do not blame them. People need to drink.
But the water under our feet is the same water.
If they pull more, mine runs dry sooner.
That is just how the ground works.
```

### QA checklist
- [ ] Duration 25–35 s
- [ ] Audible pause after "...used to run all year"
- [ ] Final line drops volume / intimacy
- [ ] No AI-voice giveaway (over-perfect cadence)
- [ ] Silent background — no music, no foley
- [ ] Export: MP3 mono 128 kbps, ≤500 KB
- [ ] Filename: `01-rice-farmer.mp3`

---

## A2. Stakeholder 02 — PWA Operations Manager

**Production tier:** Library voice

### Voice profile
```
Thai female, mid-40s. Professional Thai-accented English of the
type heard in Thai ministry briefings or technical conferences.
Crisp consonants, controlled pace, occasional formal phrasing.

Pitch: mid register.
Pace: 130-145 wpm.
Energy: measured, alert, slightly defensive (she is being
questioned in public).
Filler: minimal — this is briefing register.

Library category: "Professional / Corporate / Briefing" (female).
If cloning, source from Thai female speaker, 40s, reading press
statement copy.
```

### Performance direction
```
Stability: 65
Similarity: 75
Style exaggeration: 20
Speaker boost: ON

Director note: "Read as if delivering a prepared statement at a
council hearing. You are not warm — you are responsible. Lightly
emphasize the words 'statutory mandate' and 'residual margin'
because these are the technical anchors of your position."
```

### Script (74 words, ~32 s at 138 wpm)
```
Our statutory mandate is clear: continuous potable water to
around two hundred thousand residents in this service area.

In each of the last three drought years, we came within days
of supply interruption.

The twelve-well expansion is sized to provide a residual margin
during a one-in-fifty-year dry season.

We have heard the concerns from rural districts and from the
university working paper. We are prepared to commission additional
monitoring. But taps must run.
```

### QA checklist
- [ ] Duration 25–35 s
- [ ] "Statutory mandate" + "residual margin" lightly stressed
- [ ] No warmth in delivery — this is a formal briefing
- [ ] Numbers crisp ("two hundred thousand," "twelve-well")
- [ ] Silent background
- [ ] Filename: `02-pwa-manager.mp3`

---

## A3. Stakeholder 03 — Food-Processing Facility Production Director

**Production tier:** Library voice

### Voice profile
```
Thai male, 45-55, polished commercial English. Investor-deck
register. Light Thai accent — this is someone who has done
international procurement calls. Confident, never hurried.

Pitch: mid-low.
Pace: 135-150 wpm.
Energy: assured, smooth.
Filler: zero — this voice is rehearsed.

Library category: "Executive / Corporate / Commercial" (male).
If cloning, source from Thai male speaker, 50s, reading earnings
call transcript.
```

### Performance direction
```
Stability: 65
Similarity: 75
Style exaggeration: 20
Speaker boost: ON

Director note: "Read as if you are addressing a regulatory review
committee that you do not want to alarm. Project predictability.
Lightly stress 'good faith' and 'predictable regulatory
environment' — these are the rhetorical pivots."
```

### Script (70 words, ~30 s at 140 wpm)
```
Our facility holds a groundwater extraction permit issued under
the framework that has governed industrial water use in this
region for nearly five decades.

We extract from the deep confined layer, well below any household
well. Our extraction volume is monitored and reported quarterly.

We support sustainable allocation. We do not support retroactive
cancellation of permits granted in good faith. A predictable
regulatory environment is essential.
```

### QA checklist
- [ ] Duration 25–35 s
- [ ] "Good faith" + "predictable regulatory environment" stressed
- [ ] No defensiveness audible
- [ ] Numbers ("five decades," "quarterly") crisp
- [ ] Filename: `03-plant-director.mp3`

---

## A4. Stakeholder 04 — Community Health Volunteer (อสม.)

**Production tier:** Cloned voice (highest authenticity)

### Voice profile
```
Thai female, 50-60, warm community-care register. English clear
but unrehearsed — this is someone who has been asked to speak in
English because the situation requires it. Slight hesitation in
two or three places. Honest, not performative.

Pitch: mid.
Pace: 115-130 wpm.
Energy: warm but serious. Concerned.
Filler: 1-2 natural micro-hesitations. Keep them.

Library category: "Mature / Warm / Documentary" (female). If
cloning, source from Thai female speaker, 50s, reading community
health bulletin.
```

### Performance direction
```
Stability: 55
Similarity: 70
Style exaggeration: 25
Speaker boost: ON

Director note: "Read as if you are speaking to a panel of younger
people who you respect but who have not walked the houses you
walk. The final line — 'Please remember the children' — is the
emotional centre. Do not over-soften it; let it sit."
```

### Script (75 words, ~34 s at 132 wpm)
```
I have walked the houses in my sub-district for eleven years.

When the shallow wells fail in March, families turn to ponds
or river water. Within two weeks, mothers bring children with
diarrhoea to our health post.

Older residents stop drinking enough because they do not trust
the taste. Dehydration in the elderly is a quieter problem,
but it is real.

[pause 1s]

Please remember the children when you decide.
```

### QA checklist
- [ ] Duration 30–38 s (slightly longer permitted)
- [ ] Audible pause before final line
- [ ] Final line warm but firm — not weepy, not flat
- [ ] "Diarrhoea" clearly pronounced
- [ ] Hesitations preserved, not edited out
- [ ] Filename: `04-health-volunteer.mp3`

---

## A5. Crisis Dispatch (Mission 3 timed event)

**Production tier:** Library voice

### Voice profile
```
Neutral news-anchor register, gender-flexible. Pace urgent but
not panicked. Could be ElevenLabs default "Newsreader" or
"Announcer" voice.

Pitch: mid.
Pace: 145-160 wpm.
Energy: alert, professional, dispatch-room.
Filler: zero.
```

### Performance direction
```
Stability: 70
Similarity: 70
Style exaggeration: 15

Director note: "This is a live operational dispatch, not a news
report. Slightly faster pace. Tight diction. End with a clear
operational instruction — the team must hear the deadline."
```

### Script (105 words, ~42 s at 150 wpm)
```
This is an urgent advisory from the PWA Khon Kaen branch.

At approximately fourteen-thirty this afternoon, a group of
around forty smallholder farmers from Nong Rua District blocked
the access road to Municipal Wellfield Number Four. The farmers
are demanding a public consultation on the proposed twelve-well
expansion before any drilling proceeds.

PWA crew on site have withdrawn to a safe distance. No injuries
have been reported.

The provincial governor's office has requested a public statement
from the briefing team within twelve minutes. Local press are
en route.

Submit your eighty- to one-hundred-twenty-word statement when ready.
```

### QA checklist
- [ ] Duration 40–60 s
- [ ] Pace consistent with operational urgency
- [ ] "Twelve minutes" clearly enunciated (this triggers the M3 timer)
- [ ] No background music or radio static effect (keep clean)
- [ ] Filename: `crisis-dispatch.mp3`

---

## A6. Tribunal Opening (Mission 5)

**Production tier:** Library voice

### Voice profile
```
Older Thai male OR female, panel-chair register. Formal, weighty,
unhurried. The voice of institutional gravitas.

Pitch: lower-mid.
Pace: 105-120 wpm.
Energy: still, considered, authoritative.
Filler: zero. Pauses between sentences slightly longer than
conversational.
```

### Performance direction
```
Stability: 70
Similarity: 75
Style exaggeration: 15

Director note: "Read as a panel chair opening a hearing. You are
not adversarial — you are setting expectations. The pauses are
the message. Do not rush."
```

### Script (62 words, ~32 s at 116 wpm)
```
This tribunal is now in session.

The matter before us is the proposed expansion of the Khon Kaen
municipal wellfield by twelve deep wells.

Your team has been asked to defend its recommended position.

You will face four rounds of questioning.

We are not here to trap you. We are here to test whether your
reasoning holds when others push back.

Begin.
```

### QA checklist
- [ ] Duration 28–35 s
- [ ] Long pauses preserved
- [ ] Final word "Begin." delivered as a clean cue (M5 timer starts on this word)
- [ ] No reverb effect (keep dry — students will hear it on laptop speakers)
- [ ] Filename: `tribunal-open.mp3`

---

# PART B — IMAGE PROMPTS

All target a **documentary-illustration aesthetic** — hand-feel, restrained palette, slight grain.

**NOT:** photographic · 3D-rendered · cartoon · vector-flat · AI-glossy

**Process:** Run each prompt 3–4 times in your tool of choice. Select best output. Compress to spec.

---

## B1. Hero Image (Mission Select card / Scenario landing)

### Prompt
```
A wide-format editorial illustration for an academic learning
platform. Subject: a quiet pre-dawn scene in rural Khon Kaen,
Northeast Thailand. Foreground: the wooden frame of an old
hand-pump well at the edge of a rice paddy; the soil around
the well is dry and slightly cracked. Mid-ground: the silhouette
of a farmer in a wide-brimmed hat walking away from the well,
back to the viewer, carrying an empty plastic water container.
Background: in the distance, low concrete water-treatment
buildings of a provincial waterworks site, partially obscured
by morning mist. A single industrial water pipe runs along the
horizon line, connecting the two worlds.

Style: documentary illustration in the tradition of The Atlantic
or NYT Opinion editorial art. Hand-feel — visible brush or pencil
texture. NOT photorealistic. NOT 3D-rendered. NOT anime. NOT
vector flat. NOT AI glossy.

Palette: muted, earthy. Bone-white sky transitioning to soft
ochre at the horizon. Deep navy shadows. One restrained accent
of warm bronze in the morning light catching the pump handle.
Avoid saturated colours. Avoid neon.

Composition: 16:9. Rule of thirds — well in left third, farmer
in centre, waterworks in right third. Generous negative space
above for headline overlay.

Lighting: low-angle pre-dawn. Long soft shadows. Slight ground mist.

Texture: subtle paper-grain overlay.

Mood: contemplative, dignified, not pitying. The farmer is
walking with purpose, not despair. This is a working person,
not a victim.
```

### Negative prompt
```
photograph, photorealistic, 3D render, anime, manga, cartoon,
vector flat, neon, oversaturated, glossy, AI artifacts, distorted
hands, watermark, signage, identifiable face, Western village,
stereotype, poverty imagery, dramatic lighting, fantasy.
```

### Output spec
- 1792 × 1024 (16:9), crop to 1200 × 675
- PNG, ≤180 KB after compression
- Filename: `sdg06-khonkaen-hero.png`
- Alt text: *"Pre-dawn rice paddy in rural Khon Kaen. A farmer carries an empty water container away from an old hand-pump well, with provincial waterworks buildings visible on the horizon, connected by a single industrial pipe."*

### QA
- [ ] No identifiable face on farmer
- [ ] Hands not distorted
- [ ] Pipe reads as connector between two worlds
- [ ] Palette stays muted — no oversaturated red
- [ ] Mood contemplative, not pitying
- [ ] Reads as illustration, not photo

---

## B2. Aquifer Cross-Section Diagram (Mission 1 dossier)

### Prompt
```
An educational cross-section diagram of the Khorat Plateau aquifer
beneath Khon Kaen, Northeast Thailand. Style: hand-drawn scientific
illustration in the tradition of mid-century geological textbooks
or contemporary New York Times explanatory graphics. Visible pencil
or ink linework. Restrained colour fill.

Cross-section shows, from top to bottom:
1. Ground surface with a small rice paddy on the left and a small
   urban water tower on the right.
2. Upper aquifer layer (shallow, ~30-60 m depth) — labelled. A
   household hand-pump well draws from this layer on the left side.
3. Confining strata between upper and lower aquifer — shown with
   a subtle pattern indicating partial, not absolute, separation.
   Small arrows show vertical leakage where strata are fractured.
4. Lower confined aquifer (~200+ m depth) — labelled. A municipal
   deep well and an industrial deep well draw from this layer.
5. At depth: zones of natural rock salt formation, shown in a
   slightly different shade. Arrows indicate potential upward
   saline intrusion when drawdown is sustained.

Label all layers and features in clear English text. Reserve space
for Thai hover labels (rendered in production layer).

Palette: warm beige / bone background, navy linework, restrained
ochre fills, one accent of warm bronze for the salt zones to
flag risk.

Composition: 16:9. Landscape orientation. Labels in margins,
arrows clear.

Mood: explanatory, calm, authoritative. NOT alarming. NOT
infographic-corporate.
```

### Output spec
- SVG preferred (allows Thai hover labels in production layer). If raster: 2048 × 1152 PNG, ≤220 KB
- Filename: `sdg06-khonkaen-aquifer-crosssection.svg`
- Alt text: *"Cross-section diagram of the Khorat Plateau aquifer beneath Khon Kaen showing upper aquifer with household wells, confining strata with vertical leakage, lower confined aquifer with municipal and industrial wells, and deeper rock salt zones with potential upward saline intrusion arrows."*

### QA
- [ ] All five layers visible and labelled
- [ ] Leakage arrows present between layers (this is the key contested fact)
- [ ] Salt zones visually distinct without being alarming-red
- [ ] Labels legible at 1200 px wide

---

## B3. Drawdown Chart (Mission 2 data interpretation)

### Prompt
```
A clean editorial chart showing static water-level decline in
three Khon Kaen districts (Nong Rua, Ban Phai, Ubolratana) between
2020 and 2025. Style: hand-finished editorial chart in the tradition
of FT or Reuters Graphics. Slightly imperfect linework, NOT a
default spreadsheet chart.

X-axis: years 2020 through 2025, annual.
Y-axis: static water level in metres below ground surface,
inverted (so decline appears as a downward trend). Range:
0 m at top, 25 m at bottom.

Three lines, one per district, each in a different muted colour:
- Nong Rua: steepest decline, ending around 21 m by 2025.
- Ban Phai: moderate decline, ending around 17 m.
- Ubolratana district: shallowest decline, ending around 13 m.

All lines start in 2020 at around 8-10 m. Each line has small
data-point markers. Each line is clearly labelled at its
right-hand endpoint.

Annotations:
- Horizontal dashed line at 18 m labelled "Historical seasonal
  fluctuation range — upper bound."
- Small annotation arrow near 2022 in the Nong Rua line labelled
  "Severe dry season."

Palette: bone-white background, navy axis and gridlines, three
muted line colours (soft ochre, soft steel-blue, soft sage),
warm bronze accent for the threshold dashed line.

Composition: 16:9. Title at top: "Static water level decline,
2020-2025." Source line at bottom in small caps: "Source: Faculty
of Engineering Working Paper, KKU (illustrative)."

Mood: clinical, readable, calm. NOT alarming. NOT infographic.
```

### Output spec
- SVG preferred. If raster: 1600 × 900 PNG, ≤160 KB
- Filename: `sdg06-khonkaen-drawdown-chart.svg`
- Alt text: *"Chart showing static water level decline in three Khon Kaen districts from 2020 to 2025. Nong Rua district shows the steepest decline (from 9 m to 21 m below ground surface). Ban Phai and Ubolratana districts show moderate and shallower declines. All three lines cross the historical fluctuation threshold around 2023."*

### Note for production
Numbers in the chart are *illustrative narrative figures* per the scenario manifest's `narrativeFigures` disclosure — flagged as such in the chart's own source line.

---

## B4. Watershed Map (Mission 4 stakeholder mapping)

### Prompt
```
A simplified hand-drawn map of Khon Kaen Province with the Nam
Phong river basin highlighted. Style: hand-drawn cartography in
the tradition of old expedition maps or contemporary editorial
travel illustration. Visible pen or fine-brush linework.

Map shows:
- Khon Kaen Province outline (simplified — not topographically
  exact).
- The Nam Phong river running through the province, curving from
  upper-left to lower-right, joining the Chi River near Mueang
  District.
- The Ubolratana Reservoir as a clearly marked body of water.
- Six small icons placed at sub-district locations:
  1. A rice-paddy icon (smallholder farmer) — Nong Rua District.
  2. A water-tower icon (PWA Khon Kaen) — Mueang Khon Kaen city.
  3. A factory icon (food-processing facility) — basin-area.
  4. A small house cluster icon (Community Health Volunteer's
     sub-district) — rural area near Ban Phai.
  5. A university icon (Khon Kaen University) — city centre.
  6. A government building icon (Provincial Hall) — city centre.

Each icon labelled in clear English.

Palette: bone background, soft ochre land fill, soft steel-blue
water, navy linework, warm bronze accent for the icons.

Composition: 1:1 or 4:3, with margin for compass rose, scale
bar, and legend.

Mood: educational, slightly nostalgic (hand-cartography feel),
calm, clear.

Avoid: satellite imagery, photographic textures, modern GIS
look, exaggerated province boundaries, political markings beyond
sub-district names.
```

### Output spec
- SVG preferred. If raster: 1024 × 1024 PNG, ≤160 KB
- Filename: `sdg06-khonkaen-watershed-map.svg`
- Alt text: *"Hand-drawn map of Khon Kaen Province showing the Nam Phong river basin, the Ubolratana Reservoir, and six labelled sub-district locations representing the smallholder farmer, PWA, food-processing facility, community health volunteer's sub-district, Khon Kaen University, and Provincial Hall."*

---

## B5. Stakeholder Portraits (×4)

Single prompt template — run **four times** with the bracketed variables substituted. Keep style consistent across all four by running them in **one session** in the same tool.

### Prompt template
```
A 1:1 portrait silhouette / stylized icon for a stakeholder in an
academic learning scenario. Style: documentary illustration,
hand-drawn feel, NOT photorealistic, NOT cartoon. Single-figure
composition, three-quarters torso, head turned slightly. Face is
suggested but not photographically identifiable — features are
softened into the illustration style.

Subject: [STAKEHOLDER DESCRIPTION].

Palette: bone background, navy linework, one accent colour
[ACCENT COLOUR] in the clothing or context.

Mood: dignified, professional, no caricature, no emotion-
performance. This is a person doing their job.

Avoid: photograph, identifiable face, exaggerated ethnicity,
stereotype dress, comedic features, branded clothing or logos,
text, signage.

Composition: 1:1, subject filling 70% of the frame, soft vignette.
```

### Instantiations

**Portrait 01 — Smallholder farmer**
- `[STAKEHOLDER DESCRIPTION]:` *Thai man in his late 50s, wearing a faded button-up work shirt and a wide-brimmed straw hat held in one hand; weather-lined face suggested in soft profile; standing as if at his doorway.*
- `[ACCENT COLOUR]:` *Soft ochre*
- Filename: `sdg06-khonkaen-stakeholder-01.png`

**Portrait 02 — PWA Operations Manager**
- `[STAKEHOLDER DESCRIPTION]:` *Thai woman in her mid-40s, wearing a neutral collared shirt with a small unbranded ID badge; hair pulled back; holding a folder; standing as if at a podium.*
- `[ACCENT COLOUR]:` *Soft steel-blue*
- Filename: `sdg06-khonkaen-stakeholder-02.png`

**Portrait 03 — Food-Processing Facility Production Director**
- `[STAKEHOLDER DESCRIPTION]:` *Thai man in his early 50s, wearing a polished business shirt without a tie; hand resting on a clipboard; standing as if mid-presentation.*
- `[ACCENT COLOUR]:` *Warm bronze*
- Filename: `sdg06-khonkaen-stakeholder-03.png`

**Portrait 04 — Community Health Volunteer (อสม.)**
- `[STAKEHOLDER DESCRIPTION]:` *Thai woman in her late 50s, wearing the recognizable อสม. light vest or sash over a plain blouse; holding a small spiral notebook; standing as if mid-conversation at a household doorway.*
- `[ACCENT COLOUR]:` *Soft sage*
- Filename: `sdg06-khonkaen-stakeholder-04.png`

### Output spec per portrait
- 512 × 512 PNG, ≤80 KB
- Alt text: *"Stylized portrait illustration of [stakeholder role]."*

### QA across all 4 portraits
- [ ] No identifiable face on any portrait
- [ ] Hands not distorted (common AI failure — re-run if so)
- [ ] No text / logos on clothing
- [ ] No caricature — all four read as dignified working people
- [ ] อสม. vest visible on Portrait 04 (sash not exaggerated)
- [ ] Style consistent across all four (run them in one session)

---

# PART C — DELIVERY FILE STRUCTURE

Once generated, place files at these paths so the live build picks them up automatically (the scenario module already references these locations):

```
/assets/scenarios/sdg06-khonkaen/
├── audio/
│   ├── 01-rice-farmer.mp3
│   ├── 02-pwa-manager.mp3
│   ├── 03-plant-director.mp3
│   ├── 04-health-volunteer.mp3
│   ├── crisis-dispatch.mp3
│   └── tribunal-open.mp3
└── images/
    ├── sdg06-khonkaen-hero.png
    ├── sdg06-khonkaen-aquifer-crosssection.svg
    ├── sdg06-khonkaen-drawdown-chart.svg
    ├── sdg06-khonkaen-watershed-map.svg
    ├── sdg06-khonkaen-stakeholder-01.png
    ├── sdg06-khonkaen-stakeholder-02.png
    ├── sdg06-khonkaen-stakeholder-03.png
    └── sdg06-khonkaen-stakeholder-04.png
```

Once dropped in, commit + push → Netlify rebuilds → assets go live. The UI swaps automatically from placeholder material-icon to the real portrait, and audio "Production pending" badges disappear as soon as the MP3s load.

# PART D — TOTAL PRODUCTION TIME ESTIMATE

| Track | Quantity | Time per asset | Subtotal |
|---|---|---|---|
| Audio — cloned voices (S1, S4) | 2 | ~30 min each (clone setup + script + QA + revisions) | ~1 hr |
| Audio — library voices (S2, S3, crisis, tribunal) | 4 | ~15 min each | ~1 hr |
| Caption files (.vtt) — auto-generate + hand-correct | 6 | ~5 min each | ~30 min |
| Hero image | 1 | ~30 min (3-4 runs + selection) | ~30 min |
| Aquifer cross-section | 1 | ~45 min (technical accuracy) | ~45 min |
| Drawdown chart | 1 | ~30 min | ~30 min |
| Watershed map | 1 | ~45 min (cartographic detail) | ~45 min |
| 4 portraits (one session) | 4 | ~30 min total | ~30 min |
| **Total** | **15 assets** | — | **~5.5 hours** |

---

*Document maintained at `/scenarios/sdg06-khonkaen-aquifer-v1/PRODUCTION-PROMPTS.md`. Generated from `PRODUCTION-MASTER.md` §3 + §4. Last updated: 2026-05-13.*

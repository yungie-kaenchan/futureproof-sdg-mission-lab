# Reference Image Prompts · for ChatGPT Image 2.0 → Google Flow Omni Flash

> **Purpose** Five reference images to anchor the visual world of the
> 60-second intro film. Generate each one in ChatGPT, save it, then
> import as the start frame for the matching Flow clip.
>
> **Why this matters** Flow Omni Flash's scene-to-scene character and
> object consistency depends almost entirely on the reference image,
> not on the text prompt. A strong reference fixes palette, lighting,
> composition, and (where relevant) the protagonist's appearance.
> Prompts to Flow then describe *motion* over a world already set.

---

## 0 · Production workflow

```
ChatGPT Image 2.0  →  Save PNG  →  Google Flow Omni Flash
   (reference)         (1792×1024)     (motion prompt + reference)
```

For each clip:

1. Paste the matching **Image prompt** below into ChatGPT (ensure "GPT-4o" or "Image 1" model selected — i.e., the new ChatGPT Image generation, not the legacy DALL·E 2).
2. Specify aspect ratio: **landscape** (1792 × 1024) so the result fills a 16:9 video frame.
3. ChatGPT renders the image. If the first generation is off, regenerate or refine.
4. Download the image as PNG.
5. In Google Flow Omni Flash, attach the image as a **reference frame** for the corresponding video clip.
6. Paste the matching motion prompt (from `INTRO-VIDEO-AND-SCREENCAST-SCRIPT.md` Part A).
7. Generate. Flow holds the world from your image and just animates the motion.

**Naming convention** (suggested) — saves all 5 images to one folder:
```
/Users/yungie/futureproof-project/assets/intro/
  ref-clip1-thailand-dawn.png
  ref-clip2-student-dossier.png
  ref-clip3-watercolor-map.png
  ref-clip4-six-vignettes.png
  ref-clip5-paper-to-pixel.png      (optional — skip unless transition fails)
  ref-clip6-laptop-handoff.png
```

---

## 1 · Image for Clip 1 · "Thailand at Dawn"

**Mode:** Photographic realism · landscape 1792 × 1024 · NO people in frame

Paste this into ChatGPT:

> A wide-angle aerial drone photograph of Northeast Thailand at sunrise. Landscape orientation (16:9). In the foreground, terraced rice paddies dotted with morning mist, the green and gold patches glowing in the first light. In the middle distance, a curving river (the Nam Phong) reflects the warm sky. In the far background, a slender Thai temple chedi silhouette rises against soft golden clouds. Lighting: golden hour, low sun from camera-left. Color palette: warm cream and amber gold in the sky, deep emerald and pale green in the paddies, a slight teal tint to the river. Mood: contemplative, hopeful, quietly urgent — like the opening shot of a National Geographic documentary. Style: documentary realism, photo essay aesthetic, shot on a full-frame mirrorless with a 24mm lens. Sharp focus throughout the foreground, slight atmospheric haze in the distance. Color grading: vintage botanical-atlas warmth, cream-and-amber tonality. NO text on the image, NO people in frame, NO modern buildings, NO power lines, NO modern infrastructure. The frame should feel timeless, not contemporary urban Thailand.

---

## 2 · Image for Clip 2 · "The Question" (recurring character)

**Mode:** Photographic realism · landscape 1792 × 1024 · documentary close-up

This is the **only image where a person appears**, so it's the most important to get right — it sets the "learner" character if you ever need to reuse them.

Paste this into ChatGPT:

> A close-up photorealistic portrait, landscape orientation (16:9), shot just slightly above eye-level looking down. A Thai university student's hands rest on a warm-toned wooden desk in a sunlit classroom. The hands are turning the corner of a single page of an open paper dossier on the desk — paper is cream-coloured, the typed text on the page is intentionally soft-focus and unreadable. A black ballpoint pen lies beside the dossier. We see the corner of a thoughtful young face in the upper-left third of the frame, half-shadowed, eyes looking down at the page, not at the camera. The student looks like a Thai undergraduate aged 20–22, with warm honey skin tone, dark hair, wearing a simple plain shirt (no visible logos or text). Soft natural window light enters from camera-left, warm color temperature (~ 4500K). Color palette: cream paper, dark navy ink, warm honey-toned skin, soft brown wood grain, gentle window light. Mood: contemplation, weight of a decision being weighed. Style: documentary photography, shallow depth of field with the hands and dossier in sharp focus and the background gently soft, 50mm equivalent prime lens, natural skin tones (no plastic-looking retouching). NO computer in frame, NO phone, NO logos visible anywhere, NO readable text. The composition should leave generous negative space on the right side of the frame for future motion. Photograph, NOT illustration. NOT 3D-rendered. NOT stock-photo glossy.

---

## 3 · Image for Clip 3 · "The Watercolor Map" (anchor for Clips 3, 4, 5)

**Mode:** Hand-illustrated watercolor · landscape 1792 × 1024 · matches existing brand asset

**Option A (recommended for video):** Generate a fresh landscape version in ChatGPT — uses the prompt below.

**Option B (faster):** Use your existing `assets/journey/thailand-map.png` directly. It's portrait orientation (1024 × 1536) — Flow will crop/letterbox it. If that's acceptable, skip this prompt and feed Flow the existing file.

Paste this into ChatGPT for Option A:

> A hand-illustrated watercolor-and-ink map of Thailand on cream-coloured paper, viewed straight down from above. Landscape orientation (16:9), so there is generous margin around the country shape — sea on both sides, sky-coloured cream paper above and below. The country's coastline is drawn with confident watercolor brushstrokes in deep teal and slate-blue (the Andaman Sea to the west, the Gulf of Thailand to the east). The land mass is divided into six tinted regions in soft watercolor washes — warm sandstone for the North, pale olive for the Northeast (Isan), soft rose for the Central plain, warm peach for the West, pale moss for the East, and aqua mist for the southern Andaman peninsula. Six small amber-glow circular pin markers, each numbered 1 through 6 in elegant serif numerals, sit on the map: pin 1 in the far North (Chiang Mai region), pin 2 in the Northeast (Khon Kaen region), pin 3 in the Central plain (Bangkok), pin 4 on the western border (Tak / Mae Sot), pin 5 on the Eastern coast (Rayong / EEC), pin 6 in the southern Andaman peninsula (Krabi / Phuket area). Each pin glows softly like a candle flame, amber-gold. Subtle hand-drawn ink contour lines mark the major rivers — the Chao Phraya curving down through the Central plain, the Mekong along the eastern edge. A small antique compass-rose in the upper-right corner of the map. Style: hand-illustrated watercolor and ink on textured cream paper, like a plate from a 1990s National Geographic Atlas, the kind of map you would frame. NO photographic textures, NO 3D rendering, NO digital gradients. NO readable region-name labels (region names are either too small to read or intentionally absent — let the colours do the work). The paper has slight visible fiber texture. Lighting: even, soft overhead, as if photographing a real watercolour on a wooden table. Color palette: cream paper #FDFBF6, ink black #0A0A0B, gold #C9A961 for the pins, watercolor teal for the sea, soft pastel tints for the six regions.

---

## 4 · Image for Clip 4 · "Six Regional Vignettes" (composite)

**Mode:** Hand-illustrated watercolor · landscape 1792 × 1024 · single composite of 6 small scenes

Paste this into ChatGPT:

> A single composite illustration on cream-coloured watercolour paper, landscape orientation (16:9), showing six small hand-illustrated vignettes arranged in a 3 × 2 grid, separated by thin ink hairlines. Each vignette is a small watercolour scene representing one of Thailand's regions:
>
> Top-left vignette · A Northern Thai temple chedi silhouette at dawn, with soft mountains in the background and morning mist, warm gold light.
> Top-centre vignette · A Northeastern Thai concrete water tower standing in a dry rice field, late afternoon, deep blue sky with one cumulus cloud.
> Top-right vignette · The Bangkok Rama VIII bridge over the Chao Phraya river at dusk, city lights just starting to glow, soft purple-pink sky.
> Bottom-left vignette · A Karen / Mae Sot border school built of bamboo and corrugated metal sheets, surrounded by trees at the edge of a clearing, soft afternoon light.
> Bottom-centre vignette · An Eastern industrial petrochemical refinery skyline at twilight, with a small village in the foreground hill, contrasting human scale.
> Bottom-right vignette · A Southern longtail boat moored in turquoise water beside a coral reef visible just under the surface, sunlit, postcard-quiet.
>
> Style: hand-illustrated watercolour-and-ink wash, matching a vintage botanical-atlas plate or a high-quality children's atlas illustration. Each vignette uses soft pastel washes and confident ink line-work. Colour palette across the composite: warm cream paper background; soft pastels per region (warm sandstone, pale olive, soft rose, peach, moss, aqua mist); watercolour blue water elements; subtle gold accents. Mood: contemplative, hopeful, geographically specific to Thailand. NO text labels on any vignette, NO photographic textures, NO 3D rendering. The whole composite should read like a single illustrated page from a National Geographic guidebook — six small worlds, all clearly Thai, each rendered with care.

---

## 5 · Image for Clip 5 · "Paper to Pixel" (optional)

**Note:** This image is OPTIONAL. The transition from paper to browser is something Flow Omni Flash can usually generate organically using **Image 3 as start frame + Image 6 as end frame** with a motion prompt about "watercolor map dissolving into a browser window". Generate this still only if Flow's first attempt at the transition looks abrupt.

Paste this into ChatGPT only if needed:

> A photorealistic close-up still showing the moment of a transition: the upper third of the frame is hand-illustrated watercolour cream paper with the Thailand map and amber pins visible (matching the prior watercolour-map aesthetic). The lower two-thirds gradually transitions into the surface of a modern laptop screen showing the same map inside a webpage — a dark navy navigation bar visible at the very top of the page, thin gold horizontal hairline below it, the watercolor map of Thailand prominently visible inside the browser viewport. The transition between paper and screen is gradual — paper fibres dissolve into screen pixels around the centre of the frame. Color palette: warm cream paper throughout, dark navy header strip, soft amber gold accents, watercolor teal map. Lighting: soft, even, like a flat-lay product photo. Style: editorial product-photo realism for the screen portion; hand-illustrated watercolor for the paper portion; the transition is the visual subject. NO readable text anywhere, NO logos. Landscape orientation (16:9).

---

## 6 · Image for Clip 6 · "Laptop Handoff"

**Mode:** Photographic realism · landscape 1792 × 1024 · 3/4 angle product photo

Paste this into ChatGPT:

> A photorealistic 3/4-angle shot of a modern silver laptop (15-inch class, no brand logos visible) sitting on a warm-toned wooden desk in soft natural light. Landscape orientation (16:9). The laptop is open about 110° and we see most of the screen at a slight angle. The laptop screen shows a webpage with a warm cream background, a dark navy navigation bar at the top featuring small gold-coloured text and decorative gold horizontal lines, and a large hand-illustrated watercolour map of Thailand prominently displayed on the right half of the screen (the same watercolor Thailand map style from earlier reference images). Above the map there is a large serif display headline (the text is intentionally slightly out of focus — soft, not crisp). A human right hand enters from the right edge of the frame and is just about to touch the touchpad — relaxed, professional. The hand looks like a Thai academic professional in their mid-30s to mid-40s, warm honey skin tone, simple unbranded sleeve. Soft window light from camera-left, warm color temperature ~ 5000K. Background gently out of focus, with hints of a leather notebook and a ceramic coffee mug visible in soft bokeh. Color palette: warm cream paper tones on the screen, dark navy header, gold accents, soft brown wood grain on the desk, warm skin on the hand, soft white window light. Mood: invitation, the beginning of a tour. Style: documentary editorial product-photo aesthetic, 50mm equivalent prime lens, natural realism — NOT shiny stock-photo overly-retouched glass. Sharp focus on the laptop screen and the hand, soft bokeh on the desk background. NO readable text on the screen (text is out of focus but the layout is visible). NO visible brand logos anywhere. Photograph, NOT 3D-rendered.

---

## 6.5 · Image for Clip 0 · "Project Title Card" (opening)

**Mode:** Editorial title page · landscape 1792 × 1024 · centred composition

**Placement:** Insert this as **Clip 0** — the very first 5-to-8-second clip of the intro film, before Clip 1 (Thailand at Dawn). The film opens on the title, then enters the world. This follows the classic documentary structure (Apple keynote intro · Penguin Books title page · National Geographic feature opening).

**Text fixes applied** (silent corrections of typos in the brief):
- "Buiild" → **Build**
- "Where English Meets the Thailand's Urgent Challenges" → **Where English Meets Thailand's Urgent Challenges** (article "the" removed for grammatical accuracy)

If you want the text exactly as originally typed, paste over those two strings in the prompt.

---

### Approach A · Render text in the image (one-shot · risk: typos)

Paste this into ChatGPT. Best for users who don't want to add text in a vector editor afterwards. Expect 2–4 regenerations to land on a version with all three lines spelled correctly.

> A photorealistic editorial title page, landscape orientation (16:9), shot as if photographing a real printed page lit by soft natural window light from camera-left. The page is warm cream-coloured paper (#FDFBF6) with very subtle visible fibre texture, slightly weathered like the front page of a serious cultural quarterly or a hardcover book.
>
> In the dead-centre of the page, three lines of text are letterpress-printed, perfectly aligned and centred horizontally. The composition is calm and intentionally spacious — generous negative space surrounds the type block.
>
> Line 1 (largest, display serif, ink-black) reads exactly: **FUTUREPROOF — SDGs Mission Journey**
> The word "FUTUREPROOF" is set in all capitals, a humanist transitional serif (style of Cormorant Garamond or Fraunces Light), wide letter-spacing (~ 0.05em), about 90 pt visual size in the frame, ink-black colour. After an em-dash, "SDGs Mission Journey" is set in inscribed Roman capitals (style of Cinzel), smaller (~ 28 pt), gold-coloured (#C9A961).
>
> A short gold horizontal hairline (~ 80 pt wide, 1 pt thick, #C9A961) sits below Line 1 as a divider.
>
> Line 2 (medium, italic serif, dark navy ink) reads exactly: **Where English Meets Thailand's Urgent Challenges**
> Set in italic serif (Cormorant Garamond italic feel), ~ 22 pt, dark navy ink (#1F1F23), letter-spacing slightly open.
>
> Line 3 (small, all caps, gold) reads exactly: **BUILD A BRIGHT FUTURE FOR ALL**
> Set in inscribed Roman small-caps (Cinzel Regular), ~ 14 pt, gold (#C9A961), wide letter-spacing (~ 0.18em), centred below the tagline.
>
> A thin gold horizontal hairline runs across the very top of the page (just inside the upper margin). A matching gold hairline runs across the very bottom. Subtle gold corner-bracket marks sit in the four corners of the page (~ 18 mm in from each corner, ~ 12 mm long each leg). Below Line 3, in very small monospace caps (~ 9 pt, ink-grey), an editorial byline: "DR. PAYUNGSAK KAENCHAN · FACULTY OF LIBERAL ARTS · MAHIDOL UNIVERSITY".
>
> Lighting: soft, even, warm — like an overhead studio softbox from slightly camera-left, no harsh shadows, gentle paper-grain texture across the cream surface. Mood: editorial gravitas, the inside cover of a serious book, calm confidence. Style: documentary product-photo realism, photographed not rendered, NOT digital flat-design, NOT 3D-rendered. The photograph captures real ink on real paper.
>
> CRITICAL TYPOGRAPHIC RULES:
> - All text must be spelled EXACTLY as shown. No misspellings. No invented words.
> - No additional decorative text, no Lorem Ipsum, no placeholder words.
> - No corporate logos anywhere.
> - The em-dash in "FUTUREPROOF — SDGs Mission Journey" must be a proper em-dash, not a hyphen.
> - Three lines only — do not add a fourth tagline.
>
> NO 3D-rendered look. NO neon. NO cyberpunk. NO photo-stock glossy reflection. NO watercolor on this image (this is the typographic title card, not the watercolour map clip).

---

### Approach B · Clean background only (recommended · text added in post)

If you want guaranteed pixel-perfect typography, generate **only the background** in ChatGPT and add the three text lines later in Affinity Publisher, Figma, Keynote, or Canva (5–10 minutes of work). This is the safer route and what most professional designers do.

Paste this into ChatGPT:

> A photorealistic editorial title-page background, landscape orientation (16:9), shot as if photographing a real printed page lit by soft natural window light from camera-left. The page is warm cream-coloured paper (#FDFBF6) with very subtle visible fibre texture, slightly weathered like the front page of a serious cultural quarterly. A thin gold horizontal hairline (1 pt, #C9A961) runs across the very top of the page just inside the upper margin. A matching gold hairline runs across the very bottom. Subtle gold corner-bracket marks sit in the four corners of the page (~ 18 mm in from each corner, ~ 12 mm long each leg). The centre of the page is COMPLETELY EMPTY — generous, intentional negative space where typography will be placed later. Faint, barely-perceptible paper-grain texture suggests the surface is real paper, not a digital render. Lighting: soft, even, warm. Mood: editorial gravitas, calm confidence, the inside cover of a serious book. Style: documentary product-photo realism, photographed not rendered. NO text anywhere on the page — completely empty centre. NO logos. NO decorative typography. NO 3D-render look. NO cyberpunk, NO neon, NO glossy reflections. The only visual elements are the gold hairlines top and bottom, the four corner brackets, the cream paper texture, and the soft light.

After ChatGPT delivers this, open it in your vector editor of choice and add the three lines as live text:

```
Line 1 · FUTUREPROOF — SDGs Mission Journey
         (Cormorant Garamond Light, 90pt, ink #0A0A0B for "FUTUREPROOF"
          all caps; Cinzel Regular 28pt gold #C9A961 for the subtitle)

— gold hairline 80pt wide, 1pt, #C9A961, centred —

Line 2 · Where English Meets Thailand's Urgent Challenges
         (Cormorant Garamond Italic, 22pt, dark navy #1F1F23, centred)

Line 3 · BUILD A BRIGHT FUTURE FOR ALL
         (Cinzel Regular, 14pt, gold #C9A961, letter-spacing 0.18em, caps)

Byline · DR. PAYUNGSAK KAENCHAN · FACULTY OF LIBERAL ARTS · MAHIDOL UNIVERSITY
         (JetBrains Mono, 9pt, ink-grey #6E5320, caps, letter-spacing 0.16em)
```

All five fonts (Cormorant Garamond, Cinzel, JetBrains Mono, DM Sans, IBM Plex Sans Thai) are free on Google Fonts and already used elsewhere in the brand.

---

### Flow motion prompt for Clip 0 (use after attaching the title-card image)

```
A static cream-paper editorial title page sits centred in the frame.
The camera begins on a very slight wider shot and slowly pushes in
toward the centre of the page over the full clip duration (~ 6
seconds), as if the viewer is leaning closer to read. Subtle paper-
grain texture is visible. Soft warm window light from camera-left
creates the gentlest possible directional shadow on the page surface.
Each of the three lines of text gently fades in one after the other
over the first 4 seconds: Line 1 ("FUTUREPROOF — SDGs Mission Journey")
appears first at 0.5s, Line 2 (the italic tagline) at 2.0s, Line 3
(the small-caps slogan) at 3.5s. The byline at the bottom fades in
last at 4.5s. The camera continues its slow push-in for the final
1.5 seconds, ending tight enough that the title fills two-thirds of
the frame. The clip ends with a held frame ready to cross-fade into
Clip 1. NO music sting on screen. NO camera shake. NO snap-cuts. The
mood is calm, ceremonial, intentional. Lighting and colour remain
identical to the reference image throughout.
```

---

### Recommended placement in the updated 7-clip film

| Clip | Time | Length | What viewer sees |
|---|---|---|---|
| **0 · NEW · Title Card** | **0:00 – 0:06** | **6 s** | Editorial cream-paper title page with three lines fading in |
| 1 · Thailand at Dawn | 0:06 – 0:16 | 10 s | Aerial drone across rice paddies → river → temple |
| 2 · The Question | 0:16 – 0:26 | 10 s | Student's hands turning a dossier page |
| 3 · The Map Appears | 0:26 – 0:36 | 10 s | Watercolor Thailand drawn in ink in real time |
| 4 · Six Frontlines | 0:36 – 0:46 | 10 s | Camera moves across the map · pins bloom into vignettes |
| 5 · From Page to Screen | 0:46 – 0:56 | 10 s | Paper-to-pixel transition |
| 6 · The Tour Begins | 0:56 – 1:06 | 10 s | Hand reaches for laptop touchpad · handoff |
| Total intro | **1:06** | — | 66 seconds |

This pushes total intro to 1:06 (6 s over your 60 s target). Three ways to stay under the SPU 5-minute cap:

- **Option A** · Trim Clip 0 to 5 seconds (text fade-in sequence becomes tighter): total 1:05.
- **Option B** · Accept 1:06 intro and tighten the screencast to 3:40: total 4:46.
- **Option C** · Move the title card to the END (Clip 7, after Clip 6) and have it serve as the closing card on top of the screencast handoff — works but feels less standard.

I recommend Option B — 1:06 intro + 3:40 screencast = 4:46, fourteen seconds under the SPU cap, with the title-card sitting properly at the opening where it belongs.

---

### Quick tips for Approach A regeneration

If ChatGPT renders the text with typos (which happens about 1 in 3 times for long multi-line copy):

- **The most common error**: it inserts an extra letter or transposes two letters in "FUTUREPROOF". If you see "FUTUREPROOOF" or "FUTUREPRROF", regenerate.
- **Second most common**: the em-dash becomes a regular hyphen or two hyphens. If you see "FUTUREPROOF - SDGs" instead of "FUTUREPROOF — SDGs", regenerate with the explicit clause appended: *"The dash must be a proper em-dash character (U+2014), not a hyphen-minus."*
- **Third most common**: extra decorative words appear that you didn't ask for ("THE ART OF" before FUTUREPROOF, etc.). Regenerate with: *"Use ONLY the three text lines specified above. No additional text, no decorative phrases."*

After ~ 3 attempts if Approach A still doesn't land cleanly, switch to Approach B — adding text in a vector editor takes 5 minutes and is bulletproof.

---

## 7 · Character / object consistency tips for Flow Omni Flash

Omni Flash holds visual consistency from references in three ways. Use them strategically:

| Reference type | What it locks | Example in your film |
|---|---|---|
| **Subject reference image** | A specific person / object · used to keep the same character across clips | Image 2 (student) — feed it to Flow if you want to bring the student back in another clip |
| **Style reference image** | The overall look · palette, lighting, lens feel · NOT the specific subjects | Image 3 (watercolor map) — feed it as style anchor to Clips 4 and 5 so they share the watercolor aesthetic |
| **Start-frame reference** | The first frame of the generated clip · sets composition and lighting exactly | All six images — use each as the **start frame** of its corresponding clip |

**Practical: which image goes where in Flow**

| Clip | Start-frame reference | Style reference (additional) |
|---|---|---|
| 1 · Thailand Dawn | Image 1 | — |
| 2 · The Question | Image 2 | — |
| 3 · Watercolor Map | Image 3 | — |
| 4 · Six Frontlines | Image 3 | Image 4 (so the six vignettes match the map's watercolor style) |
| 5 · Page to Pixel | Image 3 (start) + Image 6 (end target) | — |
| 6 · Laptop Handoff | Image 6 | — |

---

## 8 · After all 6 clips are generated · stitching

In your editor (Descript / Premiere / DaVinci):
1. Drop clips 1–6 in sequence on the timeline.
2. Crossfade duration **between consecutive clips: 0.3 s** (light enough that motion continues, gentle enough not to jar).
3. Apply a single warm-cream LUT across all six clips to lock the colour grade.
4. Audio: instrumental score throughout · ducks to −22 dB if you add the optional Thai voice-over at Clip 6.
5. Export 1080p MP4 H.264 · audio AAC 192 kbps · save as `intro-60s.mp4`.

Then concatenate `intro-60s.mp4` + `screencast-3m45s.mp4` for the final 4:45 selection-round film.

---

## 9 · Quality checklist before importing each image into Flow

For each generated image, verify before paying for the Flow render:

- [ ] **Aspect ratio is 16:9 landscape** (1792 × 1024 or similar). Portrait images will get awkwardly cropped by Flow.
- [ ] **No on-screen text** that you didn't plan for. Even if the text is small and decorative, Flow's motion will warp it — leaving visible blurry letters mid-clip.
- [ ] **No corporate logos** visible anywhere (Apple logo on the laptop, Adobe icons, etc.)
- [ ] **No people facing the camera** in any clip except where intended (the student in Clip 2 should look down, not at lens).
- [ ] **Colour palette matches** the brand (cream, gold, ink, watercolor blues — no neon, no synthwave, no chrome).
- [ ] **Composition has generous negative space** for the camera to move into during the 10-second Flow clip.

If any check fails, regenerate. ChatGPT charges nothing for re-rolls; Flow charges per generation. Get the still right *before* Flow.

---

*End of brief. Five well-crafted reference images + the motion prompts from `INTRO-VIDEO-AND-SCREENCAST-SCRIPT.md` Part A = a 60-second intro that looks like a film, not an AI-generated stitch.*

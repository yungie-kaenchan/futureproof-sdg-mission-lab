# Screencast Toolkit · FUTUREPROOF · SPU Submission Video

> A pragmatic guide to producing a competition-level screencast video of
> the Judge Tour, given the May 30, 2026 submission deadline.
>
> **Author** Dr. Payungsak Kaenchan · Faculty of Liberal Arts · Mahidol
> University.
>
> **Target output** 5-minute YouTube video (selection round), upgradable
> to 10-minute extended cut for the final round on June 14.
>
> **Source script** `pages/judge-tour.html` — the 8-step walkthrough is
> already structured as a screencast scaffold. You don't need to write
> a script; you scroll through the tour and narrate.

---

## 0 · The minimal stunning stack (recommended)

Three tools — total cost ≈ **$110**, total learning curve ≈ **2 hours**.

| # | Tool | What it does | Cost | Mac/Win |
|---|---|---|---|---|
| 1 | **Screen Studio** | Records the screencast with auto-zoom on clicks, smooth cursor easing, branded background. Output looks like an Apple keynote out of the box. | $89 one-time | **Mac only** |
| 2 | **Descript** | Edits the video by editing the transcript. Removes filler words ("um", "uh") automatically. Adds bilingual captions. Generates AI voiceover if needed. Built-in royalty-free music. | Free trial, then $24/mo | Both |
| 3 | **ElevenLabs** | Already in your stack (you used it for the stakeholder dispatch audios). Generate the final narration in a voice that matches the existing brand audio. | $5–22/mo for the relevant tier | Both |

Workflow with this stack: **record in Screen Studio → import to Descript → narrate over the footage (or generate ElevenLabs narration if you prefer not to use your own voice) → Descript adds bilingual captions and removes filler words → export 1080p MP4 → upload to YouTube**.

**Why this stack wins:** Screen Studio's cinematic recording removes the need for 80% of post-production polish; Descript replaces a video editor + a transcription service + a captioning tool with one app; ElevenLabs maintains audio brand consistency with the platform.

---

## 1 · Tool-by-tool deep-dive

### 1.1 · Screen Studio · the recording tool

**Why this matters most.** Screen Studio captures your screen but applies cinematic post-processing automatically:

- **Auto-zoom on clicks** — when you click a button, the camera smoothly zooms in
- **Smooth cursor motion** — eases your jagged mouse movements into elegant arcs
- **Background blur/branded backgrounds** — your desktop chrome disappears; you get a clean gradient or your brand colours behind the recording window
- **Webcam picture-in-picture** with smooth shape transitions
- **Built-in trim, speed control, basic editing**

What this means for your video: a Screen Studio recording at 1080p with the existing FUTUREPROOF dark-navy + gold-glow palette as the background already looks like a $5,000 production.

**Setup tips:**
- Use a 16:9 aspect ratio (1920×1080 or 2560×1440 source)
- Hide all dock icons, menu-bar status items (use Bartender or just manually hide)
- Close all other browser tabs
- Use a clean Chrome profile (no extensions, no bookmarks bar)
- Set your browser to dark mode if it interferes with the FUTUREPROOF cream palette — actually keep Chrome light so it harmonizes with the cream paper of judge-tour.html

**Alternative (free):** OBS Studio. Free, professional, more flexible — but you'll spend the time savings on post-production polish. Choose Screen Studio if budget allows.

---

### 1.2 · Descript · the editor

Descript's killer feature: **edit the video by editing the transcript.** Delete a word in the transcript and that audio + the matching video frame are deleted. This is faster than any timeline-based editor for a talking-head/screencast format.

**What Descript gives you in this project:**
- **Auto-transcribe** your narration (English) with high accuracy
- **Translate captions to Thai** (built-in, decent quality — you'll want to proofread)
- **Filler-word removal** — strip "um, uh, like, you know" in one click
- **Studio Sound** — AI audio enhancement that makes laptop-mic audio sound studio-quality
- **AI Voiceover (Overdub)** — clone your own voice or use a built-in voice
- **Royalty-free music library** — many tracks suitable for academic videos
- **Lower-third title cards, animated text overlays** — for theorist names and framework citations
- **Direct upload to YouTube** with chapter markers

**Free trial** is enough for one project. If you ship in 5 days, you don't even pay.

**Alternative (free):** DaVinci Resolve free tier. Professional editor, steeper learning curve.

**Alternative (lighter):** CapCut. Free, decent AI captions, good for quick edits — but less polished output for academic work.

---

### 1.3 · ElevenLabs · the voiceover

You're already using ElevenLabs for the stakeholder dispatch audio files in the missions. Using the same voice profile for the screencast narration creates **audio brand consistency** — the voice judges hear in the video matches the voice they'll hear when they actually play a mission.

**Two narration paths:**

| Path A · You narrate live | Path B · ElevenLabs narrates |
|---|---|
| More authentic, more personal — judges hear *you* | More polished, no retakes, no breath noises |
| Time cost: 1-2 hr (script + retakes) | Time cost: 30 min (paste script + render) |
| Free | $5-22/mo subscription (already paying) |
| Use Descript's Studio Sound to clean audio | Already studio-quality |
| Risk: pronunciation slips on technical terms | Risk: feels less "human" to some judges |

**Recommendation:** Path A (you narrate) for the **selection-round 5-minute version** — the personal voice of the creator carries weight. Path B (ElevenLabs) for **B-roll narration overlays** (e.g., reading a dossier excerpt with a "stakeholder voice" feel) if you want them.

If you go Path B entirely, **declare AI use in the video description**. Match the AI Collaboration Ethics dimension you ask of your own learners (Rubric A Dimension 5).

---

## 2 · Alternative stacks

### 2.1 · Budget-zero stack ($0)

Trade money for time. Roughly +5 hours of work vs the recommended stack.

| # | Tool | Replaces |
|---|---|---|
| 1 | **OBS Studio** | Screen Studio (recording) |
| 2 | **DaVinci Resolve** free tier | Descript (editing) |
| 3 | **Your own voice + Audacity** | ElevenLabs (narration) |
| 4 | **YouTube auto-captions + manual edit** | Descript captions |
| 5 | **Pixabay / Free Music Archive** | Descript music library |

Total cost: $0. Total time: ~15 hours.

### 2.2 · Maximalist stack (~$200, 25 hours)

If you want the production value of a TED talk and have the time.

| # | Tool | What it adds |
|---|---|---|
| 1 | Screen Studio | Recording |
| 2 | Adobe Premiere Pro | Pro editing (better motion graphics) |
| 3 | ElevenLabs | Narration |
| 4 | Submagic or Captions.ai | Animated word-by-word captions |
| 5 | Epidemic Sound | Music library subscription |
| 6 | LottieFiles | Animated micro-illustrations (e.g., the 5-stage arc as an animation) |
| 7 | After Effects | One opening title sequence with the FUTUREPROOF wordmark animated |

Probably overkill for this submission. Better to ship a tight 5-minute video on the recommended stack than an ambitious 10-minute one that's not done in time.

---

## 3 · The screencast workflow (concrete steps)

Assuming the **recommended stack** (Screen Studio + Descript + ElevenLabs).

### Step 1 · Pre-flight (15 min)
- [ ] Update Chrome to latest. Open the live Judge Tour at `https://futureproof-sdgs-lab.netlify.app/pages/judge-tour.html`.
- [ ] Clear browser cache and reload (fresh state for the demo).
- [ ] Close all other apps. Notifications off. Calendar reminders off.
- [ ] Plug in headphones (so your laptop mic doesn't pick up speaker echo if you narrate live).
- [ ] Open Screen Studio, set 1920×1080 source, choose a brand-warm gradient background.

### Step 2 · Rehearsal (30 min)
- [ ] Do one full scroll-through of the Judge Tour while reading the section text aloud. Time yourself. Adjust pacing.
- [ ] Mark in the Tour where you want to pause (Step 4 sample mission, Step 8 admin).
- [ ] Mark where you'll click "Skip to Voice for Change" (best at ~ 60% mark of the video).

### Step 3 · First take (15 min)
- [ ] Record the full walkthrough in one take. Don't restart on small slips — Descript will let you cut them out.
- [ ] Cover: hero → 8 steps → live demo of Voice for Change studio → return to closing → end on resources grid.
- [ ] Save the .mov from Screen Studio.

### Step 4 · Edit in Descript (90 min)
- [ ] Import the .mov. Descript auto-transcribes.
- [ ] Listen to the transcript audio. Delete obvious mistakes by deleting the words in the transcript.
- [ ] Run filler-word removal.
- [ ] Run Studio Sound on the audio track.
- [ ] Add a 5-second opening title card: "FUTUREPROOF · SDGs Mission Journey" + creator credit.
- [ ] Add a 5-second closing card: URL + Dr. Payungsak Kaenchan email + "Submitted to SPU 2569".
- [ ] Enable English auto-captions.
- [ ] Use Descript's translate-to-Thai for a parallel caption track (Descript supports multi-language tracks). **Proofread the Thai captions** — auto-translation will miss nuance, especially on terms like AI-TPACK, PICRAT, etc.
- [ ] Add a quiet instrumental background music track at -22 dB so it sits under the voice.

### Step 5 · Export & publish (30 min)
- [ ] Export 1080p MP4 H.264, audio AAC 192 kbps.
- [ ] Upload to YouTube as **unlisted** initially.
- [ ] Title: `FUTUREPROOF — SDGs Mission Journey · Judge Tour (SPU 2569)`
- [ ] Description: project overview + URL + creator email + key resource links.
- [ ] Add YouTube chapter markers at each of the 8 step transitions.
- [ ] Add a thumbnail (export a frame from the Judge Tour hero or the Thailand map).
- [ ] Once happy, switch to **public** (unlisted is fine for the SPU submission per their rules).
- [ ] Copy the URL. Generate the QR code for the poster (use the Python `qrcode` snippet in `docs/poster/POSTER-PROMPT-v2.md` §3).

---

## 4 · Competition-level polish checklist

These are the small things that separate a "good" video from a "winning" video.

- [ ] **First 7 seconds attention-grab.** Open on the Thailand map or the project wordmark — not on the desktop. Judges are watching many videos; the first 7 seconds decide whether they keep watching.
- [ ] **Bilingual captions.** Default to English captions; switchable to Thai. SPU judges are Thai academics — Thai captions are a courtesy, not redundant.
- [ ] **Pacing variation.** Slow down on the AI-TPACK explanation, on the 5-stage arc, and on the Voice for Change submission. Speed up through navigation transitions.
- [ ] **Lower thirds at key moments.** When you mention "PICRAT (Kimmons et al. 2020)" — show "Kimmons et al. 2020" as a lower third on screen. Makes the theoretical claim legible at a glance.
- [ ] **Show the demo flag transition.** When you click "Skip to Voice for Change", let the camera linger on the banner that appears: "⚠ Demo / Judge mode active". Judges should *see* the AI-TPACK boundary being enforced in the UI.
- [ ] **End on the URL + QR code visual.** The last frame is what judges remember. Have the URL `futureproof-sdgs-lab.netlify.app` on screen with a clean QR code overlay.
- [ ] **Music attribution in the description.** If you use Descript's library or Epidemic Sound, credit it. If you use AI-generated music, declare it.
- [ ] **Background:** if you use AI-generated B-roll or images, declare in the video description.
- [ ] **Keep it under 5 minutes** for the selection round per SPU rule §2.1. Hard ceiling. A 4:30 video that respects the rule beats a 6:00 video that doesn't.

---

## 5 · Time budget (realistic, for a working academic)

Assuming the recommended stack and that you have ~ 8–10 hours total to spend on the video:

| Phase | Time | What |
|---|---|---|
| Tool setup + buy Screen Studio + Descript trial | 1 hr | Install, log in |
| Pre-flight + rehearsal | 1 hr | Clean Chrome, do one read-through |
| Recording (with 1-2 retakes) | 1.5 hr | The actual screencast |
| Editing in Descript | 3 hr | Cuts, captions, music, title cards |
| Thai caption proofread | 1 hr | Don't trust auto-translation on technical terms |
| Export + YouTube upload + thumbnail | 1 hr | The publishing step |
| QR code generation + drop into poster | 0.5 hr | Python + Affinity Publisher |
| **TOTAL** | **~ 9 hr** | One focused day, or two relaxed half-days |

Reserve **day -2** before submission deadline for this. Don't do it on day -1 (you'll want buffer for unexpected issues).

---

## 6 · One non-obvious recommendation

**Record TWO videos**, not one:

1. **The 5-minute selection-round video** (required by SPU rules). Tight, brisk, every second earning its place.

2. **A 10-minute "extended demo" video** uploaded separately and linked in the Teacher's Manual / Judge Tour page. This is the version that wins the *final round on June 14* — judges who get curious after the 5-minute video have somewhere deeper to go.

The 5-minute version is your *required artefact*. The 10-minute version is your *competitive moat* — most submissions stop at the required 5 minutes.

If time is tight, ship the 5-minute version by May 30 and produce the extended version June 1–10 for the final round.

---

## 7 · Tools I considered and rejected (and why)

- **Loom** — too informal feel; doesn't match the editorial gravitas of FUTUREPROOF
- **Vimeo Record** — limited editing; meant for quick captures, not polished output
- **Synthesia** — AI avatars for narration; feels uncanny on academic content
- **Runway Gen-3 / Kling AI for B-roll** — if you use AI-generated B-roll, must declare; for a 5-minute screencast, real footage of the platform is more authentic
- **HitPaw VikPea** — solid alternative to Topaz for upscaling but you don't need upscaling at 1080p source
- **Camtasia / ScreenFlow** — both solid mid-tier; you can use either if you prefer them, but Screen Studio is noticeably more cinematic out-of-the-box

---

## 8 · Quick links

| Tool | URL | Cost |
|---|---|---|
| Screen Studio | https://www.screen.studio | $89 one-time |
| Descript | https://www.descript.com | Free trial → $24/mo |
| ElevenLabs | https://elevenlabs.io | $5–22/mo (already in your stack) |
| OBS Studio (fallback) | https://obsproject.com | Free |
| DaVinci Resolve (fallback) | https://www.blackmagicdesign.com/products/davinciresolve | Free |
| Epidemic Sound (music) | https://www.epidemicsound.com | $15/mo |
| Submagic (animated captions) | https://www.submagic.co | $20/mo (optional polish) |

---

*If you stick to the minimal stunning stack (§0) and follow the workflow
in §3, you ship a competition-level video in one focused day.*

# Mission Task Stages — Multimodal Blueprint

Every stage of every mission exposes learners to **all four language channels**: Read, Listen, Speak, Write. The platform mixes them deliberately so a learner spends ~5 minutes per stage cycling through input → comprehension → production.

The four channels:

| Channel | Input or output | Component | Module |
|---|---|---|---|
| **READ** 📖 | Input — short text, named source | `readBlock({ title, body, sourceLabel })` | [`src/multimodal.js`](../src/multimodal.js) |
| **LISTEN** 🎧 | Input — short audio with transcript reveal | `listenBlock({ title, transcript, speakerLabel, voice })` — Claude TTS proxy with browser SpeechSynthesis fallback | same |
| **SPEAK** 🎤 | Output — 30-60 s voice capture | `speakBlock({ prompt, maxSeconds, onCapture })` — uses MediaRecorder | same |
| **WRITE** ✍️ | Output — structured text with word-count target | `writeBlock({ prompt, minWords, maxWords, onChange })` | same |

Each stage below shows the **CHANNEL MIX** the learner cycles through. Edit the prompts; the channels and component calls stay the same.

---

## Mission 01 — RECON · Bloom's: Remember

### Stage 1 — Briefing intel
- 📖 **READ** the SDG scenario brief (auto-rendered from the locked scenario)
- 🎧 **LISTEN** to the editor-in-chief's voice memo summarizing the assignment ("Welcome to the desk. Here's what we know so far…")
- ✍️ **WRITE** three things you already know about this issue (warm-up — 30-50 words)

### Stage 2 — Vocabulary recognition
- 📖 **READ** five terms with glosses (`salinity`, `stakeholder`, `leverage point`, `intergenerational`, `remediation`)
- 🎧 **LISTEN** to a single sentence using each term in context, voiced by an expert NPC
- 🎤 **SPEAK** each term aloud, one by one (10 s clip per term, builds pronunciation confidence)

### Stage 3 — Stakeholder map
- 📖 **READ** the scenario stakeholder list with role + interest
- 🎧 **LISTEN** to a 20-second voicemail from each stakeholder ("Hi, I'm the Royal Irrigation Department lead — here's how I see it…")
- ✍️ **WRITE** which two stakeholders you'd most want to interview, in 40 words

### Stage 4 — Source selection (PICK 2 OF 4)
- 📖 **READ** four source descriptions: Ministry data portal · Peer-reviewed paper · Investigative news article · NGO field report
- 🎧 **LISTEN** to a 15-second sample reading from each source so the team hears the register
- 🎤 **SPEAK** the names of the two sources you'd choose, with one-sentence reasons each (used as later evidence)

### Stage 5 — Rationale & lock-in
- ✍️ **WRITE** 60-80 words: why these two sources, not the others?
- 🎤 **SPEAK** the opening line of your rationale aloud (locks the choice; AI Judge pairs with text)

---

## Mission 02 — DECODE · Bloom's: Understand

### Stage 1 — Audience reveal
- 📖 **READ** which audience you've been assigned (minister · citizen · investor · NGO partner) + register note
- 🎧 **LISTEN** to a 20-second voice memo from your editor explaining the audience's expectations

### Stage 2 — Source-conflict listening
- 🎧 **LISTEN** to two short clips with conflicting interpretations of the same data
- 📖 **READ** the data table both clips reference
- ✍️ **WRITE** a one-sentence summary of where the two voices agree and disagree (40-60 words)

### Stage 3 — Audience-shifted explanation
- ✍️ **WRITE** 90-120 words: explain the crisis to your assigned audience in the right register
- 🎤 **SPEAK** the first two sentences aloud — register check

### Stage 4 — Stakeholder NPC interview
- 🎧 **LISTEN** to the stakeholder's opening statement (Claude-voiced)
- 🎤 **SPEAK** your follow-up question (recorded; Claude responds in voice)
- (loop 2-3 turns)

### Stage 5 — Rationale & lock-in
- ✍️ **WRITE** the 50-word justification of your interpretive choices
- 🎤 **SPEAK** that justification aloud — phonological control under register pressure

---

## Mission 03 — DEPLOY · Bloom's: Apply

### Stage 1 — Crisis event (timed)
- 🎧 **LISTEN** to a reporter's voicemail demanding a quote ("I'm filing tonight on…")
- 📖 **READ** a one-paragraph wire summary of what just leaked
- 🎤 **SPEAK** your team's working position in 30 seconds (recall under pressure)

### Stage 2 — Strategy briefing
- 📖 **READ** three strategies (Transparent disclosure · Consultative pause · Decisive intervention) with risks
- 🎧 **LISTEN** to a senior advisor narrating each option in 15 seconds — captures tone and hidden cost

### Stage 3 — Strategy commit (PICK 1 OF 3)
- ✍️ **WRITE** a 40-word internal memo that locks in your choice for the team
- 🎤 **SPEAK** the choice aloud as if announcing to the team — ownership matters

### Stage 4 — Public statement
- ✍️ **WRITE** the 80-120 word public statement
- 🎤 **SPEAK** it aloud as a recorded press quote (Mission 4 will replay this back to you)

### Stage 5 — Rationale & lock-in
- ✍️ **WRITE** 30-50 word reflection on what you'd lose if you'd chosen differently
- 🎧 **LISTEN** back to your own press quote (your Stage 4 audio) — auditory feedback loop

---

## Mission 04 — DISSECT · Bloom's: Analyze

### Stage 1 — Consequences reveal
- 🎧 **LISTEN** to multiple stakeholder reactions to your Mission 3 decision (Claude renders each in voice — 30 s each)
- 📖 **READ** the press coverage summary

### Stage 2 — Compare what worked vs failed
- 📖 **READ** a side-by-side comparison table from your team's choices
- ✍️ **WRITE** 60-80 words: top 2 things that worked, top 2 that failed

### Stage 3 — Leverage point identification
- 📖 **READ** the system-map view of how decisions cascaded
- ✍️ **WRITE** 80-120 words naming the single most critical leverage point and why
- 🎤 **SPEAK** it as a 60-second pitch to a skeptical room

### Stage 4 — Counterargument from AI
- 🎧 **LISTEN** to the AI Judge's voiced counter-position (treats your written claim seriously, picks at the weakest premise)
- ✍️ **WRITE** your refined response (40-60 words)
- 🎤 **SPEAK** the refinement live (the speak captures your "I take it back" or "I hold my ground" moment)

### Stage 5 — Rationale & lock-in
- ✍️ **WRITE** the integrated 100-word position
- 🎤 **SPEAK** the closing line aloud

---

## Mission 05 — TRIBUNAL · Bloom's: Evaluate

### Stage 1 — Dilemma presentation
- 📖 **READ** the ethical dilemma generated from your specific journey
- 🎧 **LISTEN** to the tribunal chair voicing the dilemma — solemnity matters
- ✍️ **WRITE** a 30-word gut-reaction (this is the baseline; you'll watch yourself revise)

### Stage 2 — Position drafting
- 📖 **READ** ethical-framework reminders (consequentialist · deontological · virtue · care)
- ✍️ **WRITE** your 100-150 word position statement

### Stage 3 — Cross-examination
- 🎧 **LISTEN** to the tribunal's opening probe ("Whose perspective does your position currently exclude?")
- 🎤 **SPEAK** your response live (30-90 s clip per turn)
- (multi-turn — the tribunal counters in voice; you respond in voice; ~3-5 exchanges)

### Stage 4 — Final judgment
- 🎧 **LISTEN** back to your Stage 1 gut-reaction recording vs your latest answer
- ✍️ **WRITE** the final 100-150 word judgment
- 🎤 **SPEAK** it aloud as if to the tribunal

### Stage 5 — Lock-in & feed-forward
- ✍️ **WRITE** one sentence on how this judgment will frame your Pitch Capsule
- 🎤 **SPEAK** that sentence as Panel 03 (Insight) draft narration

---

## Mission 06 — FORGE (Pitch Capsule Studio)

The Studio's 5 panels each get the multimodal treatment when you draft them. Per panel:

### Per-panel cycle
- 📖 **READ** the panel prompt + your team's locked decisions relevant to this panel
- 🎧 **LISTEN** (optional) to a model exemplar — a successful prior team's narration of the same panel type, with their consent
- ✍️ **WRITE** the panel content (rich-text, 60-100 words target)
- 🎤 **SPEAK** the panel as a draft narration (Panel 5 keeps this as final; Panels 1-4 use the audio for editorial review)

The final Pitch Capsule export bundles: text panels (PDF) + the Voice panel narration (audio) + a self-narrated 90-second summary track that loops through all 5 panels.

---

## Implementation note

Each stage's UI is a single `multimodalStage(container, [...])` call composing the four channel blocks in any order. See [`src/mission-phases.js`](../src/mission-phases.js) for two concrete examples already converted (`decodeAudienceAssign`, `deployCrisisEvent`). The remaining stages get the same treatment surgically as you finalize the prompts above.

The TTS/STT side requires:
- **TTS** (LISTEN blocks) — a `tts-proxy` Netlify Function that calls a TTS provider (Anthropic doesn't ship native TTS yet — recommend ElevenLabs, Google Cloud TTS, or Azure Speech). Browser `SpeechSynthesis` is the offline fallback (already wired).
- **STT** (auto-evaluating SPEAK clips) — optional. The current SPEAK blocks store the audio blob; transcription + evaluation can land Day 9+ via a Whisper proxy or by attaching audio to Claude requests.

When you've reviewed the prompts above and want any rewritten, mark up the file and tell me which sections to patch.

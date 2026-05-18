# DEMO SCRIPT + Q&A RED-TEAM — FUTUREPROOF

**For:** SPU Round 2 — การนำเสนอ (30) + การตอบคำถาม (30) = **60 of 100 R2 points.**
**Live build:** https://futureproof-sdgs-lab.netlify.app
**Rule of the room:** show, don't tell. Every claim is clickable. The
honest small claim always beats the impressive vague one.

---

## PART A · The 5–7 minute demo (rehearse to 6:00)

> Open tabs in advance (see §C pre-flight). Narrate while you click —
> never read slides. Total spoken ≈ 850 words at a calm pace.

### 0:00–0:45 — The hook (no screen yet, or the poster)
> "Thai students learn English in one corner and the SDGs in another, and
> neither feels real. FUTUREPROOF refuses to separate them. It is one
> journey across **six of Thailand's actual frontlines** — water, haze,
> floods, reefs, the border, the ageing east — where you cannot improve
> your English without reasoning about a real Thai problem, and you cannot
> finish without facing a real decision. Let me show you, live."

### 0:45–1:30 — Intro + the PDPA fix (`/pages/intro.html`)
- Scroll the orientation page. One line: *"Before a student does
  anything, they're told how it works and exactly how they're judged —
  that transparency is deliberate."*
- Click through to sign-in/up → land on **consent**. Say:
> "Notice the order. **Consent comes before the diagnostic.** This isn't
> a checkbox we moved — the assessment page is a hard gate: it refuses to
> run and writes nothing to the cloud until consent exists. PDPA by
> construction, not by promise."

### 1:30–2:45 — Diagnostic → the visible tier (`/pages/assessment.html`)
- Run 3–4 items quickly (pre-seed if rehearsing). Reach the **Score
  Report**. Point at the tier banner:
> "Here is the heart of the adaptivity. The diagnostic maps to a CEFR
> band and **one reading tier**. And we *show the learner* — including
> *why their text adapts but the audio never will*. That asymmetry is
> the part judges should remember; I'll come back to it."

### 2:45–4:15 — The journey + a tiered mission (`/pages/mission-select.html`)
- The Thailand map animates in; hover two pins.
> "Six regions, any order. Pass one, earn one **Keystone**. Six Keystones
> unlock the capstone. Tokens can ease the climb but can never *buy* a
> Keystone — that's what protects the struggle."
- Open **The Burning Season** (`mission-run.html?scenario=sdg13-chiangmai`).
  Show the **tier chip** on the dossier:
> "Same mission for every student — same facts, same stakeholders, same
> decision. Only the *language register* changes by tier. The four
> stakeholder voices, though, are authentic audio for everyone — because
> time-bound listening *should* stretch you when a caption scaffolds it.
> That's Krashen and dual-coding, not a shortcut."
- Hit one DECIDE item; show confidence-rated feedback + a scaffold.
> "Every decision is a real trade-off. The Field Mentor asks, it never
> answers — the AI scaffolds, it does not tutor."

### 4:15–5:15 — The capstone + authentic audience (`/pages/final-task.html`)
- Append `?demo=keystones` with demo mode on (see §C) so it's unlocked.
> "Six Keystones in — the **Voice for Change** unlocks. Three ways to
> respond: record live, upload, or design in Canva — Canva opens in a
> new tab, we never embed it. The student addresses a *real Thai
> community*, not me."
- Show the consent block, then the AI-TPACK line on screen:
> "And here is the boundary, stated to the student: AI scaffolded every
> step here — but **the teacher grades this, holistically, with Rubric
> A.** The summative judgement of a human voice stays human."
- Click through to **Hall of Voices**:
> "Strong work, *only with a second explicit, withdrawable consent*,
> reaches a public hall and an optional youth SDG forum. Authentic
> audience is the biggest single multiplier in the research."

### 5:15–6:00 — The honest close
> "Two missions are fully built and you just played one. The other four
> are documented to production depth — that's a discipline choice so the
> pilot, the poster and the evidence are done properly, not six missions
> done shallowly. Everything you saw is live right now. Thank you —
> questions?"

**Cuttable if over time:** the diagnostic items (pre-seed and jump to the
Score Report); the DECIDE feedback detail. **Never cut:** the consent
order, the visible tier + asymmetry, the AI-TPACK boundary, the honest
scope close.

---

## PART B · Q&A RED-TEAM (rehearse answers aloud, ≤ 40 s each)

### Pedagogy & rigour
**Q: Isn't this just gamified content delivery — Passive-Replaces edtech?**
A: No, and we audit against exactly that. PICRAT is load-bearing here:
every mission must reach Interactive-Amplifies or it's redesigned. The
learner doesn't receive content — they read conflicting sources, weigh
four stakeholders, and make a defended decision under a trade-off with no
clean answer. The capstone targets Creative-Transforms. If a feature
lands in Passive-Replaces, our own §4.3 test cuts it.

**Q: Where's the proof students actually learn, not just click?**
A: We don't over-claim. There's a run-ready formative pilot, N=6–10, with
a 15-item *transfer* post-test (new sentences, not recall of the screen),
plus the assigned-tier-vs-self-rating table as the headline adaptivity
check. We report medians and ranges on small N — never a p-value we
haven't earned. The instrument is in the repo; the honesty is the point.

**Q: Six Bloom levels in one mission — isn't that shallow?**
A: It's deliberately a *mastery spiral*, not one-level-per-mission. Every
mission re-runs BRIEF→DEBRIEF so the higher-order moves become habit
through repetition across six contexts. Full Create is concentrated where
it's strongest — the capstone. That's Bruner, not dilution.

### The AI boundary (expect the hardest questions here)
**Q: If AI gives feedback, isn't it doing the teaching — displacing the teacher?**
A: That's the exact line AI-TPACK governs and we drew it explicitly. AI
does consistency, scale, and *formative* feedback. Humans keep cultural
authenticity, intervention judgement, and **all summative grading** — the
capstone is teacher-graded with Rubric A. We don't just respect that
boundary; we *show it to the student* on the final-task screen.

**Q: What stops the Field Mentor from just giving answers?**
A: Hard guardrails (CLAUDE.md §9): it may ask Socratic questions and give
language support only; it is prompt-constrained to redirect content
requests back to the team, capped per mission, and every interaction is
logged on the teacher dashboard. It's a colleague who asks, not a tutor
who tells.

**Q: AI hallucination — what if it invents a Thai fact?**
A: Mission content is *authored and vetted*, not AI-generated at runtime
— the production masters use labelled illustrative ranges and name only
real institutions for context, never fabricated statistics. The Claude
proxy handles formative *language* feedback, not factual ground truth.

### Adaptivity (the Q&A-gold question)
**Q: Why tier the text but not the audio? Isn't that inconsistent?**
A: It's the opposite of inconsistent — it's the SLA-correct asymmetry.
Reading is self-paced: if it's above i+1, comprehension collapses, so we
meet the learner's tier. Listening is time-bound and *benefits* from
controlled stretch **because** the .vtt caption scaffolds access — that's
Krashen plus Mayer's dual coding. Tiering audio would *remove* desirable
difficulty. We even tell the learner this on their Score Report.

**Q: Static tier-on-entry — why not adapt continuously?**
A: Deliberate for v1. A single entry tier is transparent, fair (no
mid-mission "you dropped a level" punishment), and explainable to the
student and teacher. Dynamic re-levelling is on the roadmap; the
architecture already supports it (`adaptive.js` reads a profile field).
We chose defensible over flashy.

**Q: Three tiers is just three difficulty settings.**
A: No — identical facts, stakeholders, numbers and the *same decision* at
every tier. Only lexical density and syntax change. A difficulty setting
changes the task; we change only the linguistic load while holding the
cognitive and ethical demand constant. That's i+1, precisely.

### PDPA & ethics
**Q: You collect a language diagnostic — that's personal data. Lawful?**
A: Yes, and the ordering is the proof. Consent precedes any collection:
`assessment.html` is a hard gate that performs no cloud write until a
consent record exists. Voice/video is optional, lane-selectable and
separately consented. Public exposure needs a second, withdrawable
opt-in. Full DPIA in the repo; residual risk is LOW by construction.

**Q: Student voice recordings — biometric data?**
A: They're media artifacts, never enrolled for recognition — no
voiceprint, no matching. Recording is optional (two non-audio lanes
exist), held in-browser until an explicit Submit, separately consented,
and deletable. We treat it with special-category care anyway.

### Scope & honesty
**Q: Only two of six missions work. Isn't the rest vapourware?**
A: We say plainly: built ≠ documented. Two are fully playable — you just
played one. Four are documented to production-master depth: 3-tier
dossiers, four stakeholders, asset manifests — buildable without us. That
was an Option-A discipline call so the pilot, poster and report are done
properly. Over-promising six shallow missions would be the weaker choice.

**Q: This is one teacher's project — does it scale?**
A: The architecture is the scaling argument. Missions are data modules
against one shared engine; adding a region is authoring content, not
rebuilding. Firebase/Netlify infra is live and standard. The four
production masters are the proof the pattern replicates.

### Technical / demo-integrity
**Q: What if it breaks during judging?**
A: It's designed for that. Every external call (Firebase, AI, GSAP,
geometry) degrades gracefully — the journey never hard-blocks. The
Thailand map has a static fallback; the engine host has explicit error
states; we deliberately chose 2.5D over 3D for demo reliability. See the
failure runbook (§C).

---

## PART C · Pre-flight & failure runbook

### Before you walk in
- [ ] Tabs pre-opened in order: `POSTER.html` · `intro.html` ·
      `assessment.html` · `mission-select.html` ·
      `mission-run.html?scenario=sdg13-chiangmai` ·
      `final-task.html?demo=keystones` · `hall-of-excellence.html`
- [ ] Demo bypass armed for the capstone tab only: in console on the
      site origin run `localStorage.setItem('fp_demo_mode','on')`, then
      use `?demo=keystones`. (Double-gate means nothing leaks to real
      students.)
- [ ] One full dry run start→finish on the venue network the morning of.
- [ ] Phone hotspot as network fallback; laptop charged + charger.
- [ ] Poster PDF exported from `POSTER.html` (browser print → A1, “Save
      as PDF”, background graphics ON) as an offline backup of the visual.
- [ ] Screen-record a clean 6-min run as an absolute fallback video.

### If X breaks on stage
| Failure | Recovery line + action |
|---|---|
| Map doesn't render | "It falls back by design —" the page shows the region cards; demo from the cards. |
| Mission fails to load | Open the other built mission (`?scenario=sdg06-khonkaen`); same points land. |
| Network down | Switch to hotspot; if still down, narrate over the screen-recording fallback — *the story is the same*. |
| Final task still locked | Re-apply `localStorage fp_demo_mode=on` + `?demo=keystones`; if stuck, talk through the gate logic on `keystones.js` honestly — "it's a real gate; that's the point." |
| Asked something you don't know | "I don't have that number to hand — I won't invent it. The honest answer is …" Never fabricate; the project's whole credibility is non-fabrication. |

### The three sentences to land no matter what
1. "Consent comes before data — enforced, not promised."
2. "Text adapts, audio doesn't — and that's SLA-correct, not a shortcut."
3. "AI scaffolds; the teacher grades. We show the student that boundary."

---

*Companion docs: `SUBMISSION-REPORT-v2.md` (the narrative),
`dpia.md` (data protection), `MICRO-PILOT-KIT.md` (evidence),
`RECONSTRUCTION-MASTER.md` (every design decision's rationale).*

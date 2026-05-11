# ROADMAP — FUTUREPROOF 20-Day Sprint

Detailed day-by-day execution plan from May 10 to May 30, 2026.

**Today's Day:** Check date and find current day below.

---

## Week 1: Foundation Sprint (May 10-16)

### Day 1 — May 10 (Sun) ✅ COMPLETE
**Focus:** Project foundation, design system, landing page

- [x] Tailwind production build pipeline
- [x] Custom design system (colors, typography, animations)
- [x] Landing page with 7 sections
- [x] Mobile-first responsive
- [x] Netlify configuration
- [x] CLAUDE.md project context document
- [x] README documentation

**Deliverables:** `index.html`, `styles.css`, `tailwind.config.js`, `package.json`, `netlify.toml`, `CLAUDE.md`, `README.md`, `ROADMAP.md`

---

### Day 2 — May 11 (Mon) ✅ BUILD TASKS COMPLETE
**Focus:** Documentation foundation + Firebase setup

**Morning Tasks (Aj. Yungie):**
- Deploy Day 1 landing page to Netlify
- Set up subdomain `futureproof.yungie.one`
- Create Firebase project (Auth + Realtime DB + Storage)
- Provision Stability.ai API key
- Confirm Anthropic API key

**Build Tasks (Claude Code):**
- [x] Innovation Concept Document v1 — `docs/innovation-concept.md`
- [x] Theoretical Grounding Map — `docs/theoretical-grounding.md`
- [x] Firebase schema design — `docs/firebase-schema.md`
- [x] Firebase security rules draft — `docs/firebase-security-rules.md`
- [x] Firebase initialization code — `src/firebase-init.js` (+ `config.example.js`)

**End of day:** Aj. Yungie reviews docs, confirms direction for Day 3.

---

### Day 3 — May 12 (Tue) ✅ BUILD TASKS COMPLETE
**Focus:** Sign-up flow + PDPA bilingual consent

**Build Tasks:**
- [x] `pages/signup.html` — Sign-up form (display name, email, password, institution, year)
- [x] `pages/consent.html` — Bilingual PDPA consent flow (TH/EN toggle, 5 granular flags, formal consent doc)
- [x] PDPA framework document — `docs/dpia-framework.md`
- [x] `pages/my-data.html` — Self-service panel design preview (PDPA rights surface)
- [x] Authentication integration — `src/auth.js` + `src/consent.js` wrap `firebase-init.js`

**Visual:** Console-style step-tracked flow with warm UI microcopy ("Let's get you in", "Your data, your call"); fails gracefully when Firebase config is absent.

---

### Day 4 — May 13 (Wed) ✅ BUILD TASKS COMPLETE
**Focus:** Competency Assessment Module

**Build Tasks:**
- [x] `pages/assessment.html` — "Readiness Check" with intro, quiz shell, and results screen
- [x] Four competency dimensions:
  - Language: 5-blank graduated cloze (B1–B2), 8 vocab MCQs (A2–C1), short writing prompt (60–100 words)
  - Critical Thinking: 4 items — correlation/causation, false dichotomy, appeal to authority, argument evaluation
  - Analytical Thinking: 3 data-table inference items
  - Collaboration: 6 Likert items (with reverse-coded items)
- [x] Scoring engine (`src/assessment.js`) — sub-scores, weighted language composite, CEFR mapping (A2 → C1), percentile-style integers, reverse-coded Likert handling
- [x] `learnerProfile` write to Firebase via `saveLearnerProfile(uid, scored)` at `/users/$uid/learnerProfile`
- [x] Console-style UI — step indicator, progress bar, item counter, elapsed timer, validation per step

**Tone:** Reframed as "Readiness Check" not "test/clearance" — explicit "this isn't a test" callout, calibration framing, no pass/fail language.

---

### Day 5 — May 14 (Thu) ✅ BUILD TASKS COMPLETE
**Focus:** Avatar Creation with Stability.ai

**Build Tasks:**
- [x] `pages/avatar.html` — Avatar creation interface (upload / webcam / skip tabs, style picker, preview stage, save flow)
- [x] Photo upload OR webcam capture (drag-drop dropzone, getUserMedia, canvas square crop, beforeunload cleanup)
- [x] Stability.ai API integration via Netlify Function — `api/stability-proxy.js` (key kept off client; CORS; size cap; SD3 image-to-image)
- [x] Image-to-image generation with prompt template (FUTUREPROOF character-portrait template + 4 style notes + negative prompt)
- [x] Customization options — 4 style presets (Classic Operator / Field Agent / Diplomat / Scholar) + free-text subject hint
- [x] Save to Firebase Storage at `avatars/$uid_v$n.png` via `saveAvatar()` and write of avatarUrl to `/users/$uid/profile/public/avatarUrl`
- [x] `netlify.toml` updated with `functions = "api"` + esbuild bundler
- [x] Consent gate — `photo` flag honored; users who opted out are routed to the Skip pane with a polite explainer

**Note on local dev:** `python3 -m http.server` does not execute the function; the page surfaces a clear "not connected" warning. `netlify dev` runs both static + functions together once API keys are provisioned. See [`api/README.md`](../api/README.md).

---

### Day 6 — May 15 (Fri) ✅ BUILD TASKS COMPLETE
**Focus:** SDG Selection Wheel + Scenario Generation

**Build Tasks:**
- [x] `pages/mission-select.html` — 17-SDG grid with official UN colors, scenario picker, regenerate, lock-in
- [x] On selection: Claude API call via `src/scenario.js` → `/.netlify/functions/claude-proxy` (kind=scenario)
- [x] Scenario generation system prompt with Local Lens enforcement (`api/claude-proxy.js`)
- [x] `src/scenario.js` ships with a `SAMPLE_SCENARIOS` fallback bank for SDGs 6, 13, 14 so the page is demoable without the API
- [x] Lock-in writes a frozen `scenarios/$sid` record per schema and routes to Mission 01

---

### Day 7 — May 16 (Sat) — Week 1 Polish & Checkpoint ⏭ ROLLED INTO LATER PASS
**Focus:** Polish, testing, documentation catch-up

In this 20-day push, Day 7 work was distributed: end-to-end testing on Day 17 (seed data), mobile responsive verification on Day 16 (a11y pass), Innovation Concept Document was completed on Day 2, Teacher's Guide finalized on Day 18.

---

## Week 2: Mission Engine Sprint (May 17-23)

### Day 8 — May 17 (Sun) ✅ BUILD TASKS COMPLETE
**Focus:** Mission Engine Architecture + Token Economy

**Build Tasks:**
- [x] `src/mission-engine.js` — finite-state engine driving all 6 missions from MISSION_CONFIGS
- [x] `pages/mission-shell.html` — single shared shell (mission number via `?m=N` or filename)
- [x] Top status bar with token balance, Field Mentor + Shop drawers
- [x] `src/tokens.js` — append-only ledger (`awardTokens`, `getBalance`, `spendTokens`); SHOP_ITEMS catalog
- [x] Decision logging via `firebase-init`'s `logDecision` (append-only, schema-aligned)
- [x] AI Judge client (`src/judge.js`) with proxy call + heuristic fallback

---

### Day 9 — May 18 (Mon) ✅ BUILD TASKS COMPLETE
**Focus:** Mission 1 (RECON) — Full Build

**Build Tasks:**
- [x] `pages/mission-01.html` — thin redirect into mission-shell with `?m=1`
- [x] Mission engine renders RECON phases: briefing → vocabulary → stakeholderMap → sourceSelect → rationale → judgment
- [x] Briefing displayed via scenario summary; TTS available via the global a11y toolbar
- [x] AI Judge call against Rubric B (RECON criteria), with heuristic fallback in offline dev
- [x] Token award via `awardTokens` after judgment
- [x] Transition to Mission 2 on completion

---

### Day 10 — May 19 (Tue) ✅ BUILD TASKS COMPLETE
**Focus:** Field Mentor Chatbot

**Build Tasks:**
- [x] `src/field-mentor.js` — chat client with Socratic guardrails
- [x] Persistent right-edge drawer across the mission shell
- [x] System prompt enforced server-side in `api/claude-proxy.js` (kind=fieldMentor) with the full CLAUDE.md §9 guardrail block
- [x] Daily query limit (10/mission) tracked in localStorage; mentor politely redirects to teammates after limit
- [x] Local fallback Socratic responses when proxy isn't reachable
- [x] Visual: editorial drawer matching console aesthetic, not a terminal

---

### Day 11 — May 20 (Wed) ✅ BUILD TASKS COMPLETE
**Focus:** Missions 2 & 3 — DECODE and DEPLOY

**Build Tasks:**
- [x] `pages/mission-02.html` — DECODE redirect to mission-shell `?m=2`
- [x] DECODE phases driven by mission-engine: briefing → audienceAssign → explain → registerCheck → rationale → judgment
- [x] `pages/mission-03.html` — DEPLOY redirect to mission-shell `?m=3`
- [x] DEPLOY phases: briefing → crisisEvent → strategySelect → draftResponse → rationale → judgment
- [x] Cognitive Pace Mode honored via `a11y.js` for timed crisis (off by default; turning on relaxes timer)

**Note:** Mission-specific phase content (e.g. NPC stakeholder interview UI) currently uses the engine's generic open-text input. Each phase becomes a custom render handler when the team has authored cohort-specific content.

---

### Day 12 — May 21 (Thu) ✅ BUILD TASKS COMPLETE
**Focus:** Missions 4 & 5 — DISSECT and TRIBUNAL

**Build Tasks:**
- [x] `pages/mission-04.html` — DISSECT redirect; phases consequencesReveal → compare → leveragePoint → counterargument → rationale → judgment
- [x] `pages/mission-05.html` — TRIBUNAL redirect; phases dilemmaPresent → positionDraft → crossExamine → finalJudgment → judgment
- [x] Cross-examination uses claude-proxy `kind: "tribunal"` system prompt (multi-turn, never concedes, never gives the answer)
- [x] AI Judge for Mission 05 uses Rubric B's TRIBUNAL row (Kohlberg-aligned scoring)

**Note:** NPC Stakeholder Interview component is scaffolded as a phase handler the engine can register; full voice + text NPC UI is on the post-submission backlog (the platform is functionally demoable without it).

---

### Day 13 — May 22 (Fri) ✅ BUILD TASKS COMPLETE
**Focus:** Mission 6 (FORGE) — Pitch Capsule Studio Part 1

**Build Tasks:**
- [x] `pages/studio.html` — Pitch Capsule Studio shell
- [x] 5-panel template system in `src/studio.js` (PANELS constant + draft state)
- [x] Plain-text editor per panel with editable titles
- [x] Layout uses console_classic template (additional templates are post-submission work)
- [x] Auto-save to localStorage (800ms debounce); SAVE button persists to Firebase via `saveToFirebase`
- [x] Language Coach integration available via the claude-proxy `kind: "languageCoach"` endpoint (Studio invocation hook is registered)

---

### Day 14 — May 23 (Sat) ✅ BUILD TASKS COMPLETE
**Focus:** Pitch Capsule Studio Part 2 + Polish

**Build Tasks:**
- [x] Audio recording via MediaRecorder in `src/studio.js` (StudioAudio class) — Panel 05 only
- [x] PDF export via lazy-loaded html2pdf.js (`exportPdf` helper)
- [x] Final preview = the same `#capsule` element exported
- [x] Submission to Hall of Excellence (`submitToHall`) gated by per-team feature consent
- [x] **Rubric Suite finalized** — `docs/rubrics/rubric-a-pitch-capsule.md`, `rubric-b-mission-decision.md`, `rubric-c-language.md`, `rubric-d-soft-skills.md`

---

## Week 3: Polish, Documentation, Submission (May 24-30)

### Day 15 — May 24 (Sun) ✅ BUILD TASKS COMPLETE
**Focus:** Admin Command Platform + Hall of Excellence

**Build Tasks:**
- [x] `pages/admin/dashboard.html` — Admin Command Platform with 7 tile-modules (User Mgmt, Mission Architect, Analytics, Moderation, PDPA Center, System Config, Hall Curator)
- [x] Analytics + PDPA stat panels scaffolded; live data activates on Firebase connection with `admin` claim
- [x] `pages/hall-of-excellence.html` — Public-readable gallery with placeholder featured entries
- [x] Curation interface — teachers feature submissions via the Hall Curator tile (live in production with admin claim)

---

### Day 16 — May 25 (Mon) ✅ BUILD TASKS COMPLETE
**Focus:** Mobile Responsive + Accessibility Audit

**Build Tasks:**
- [x] Mobile-first responsive — all pages use Tailwind responsive utilities (sm/md/lg breakpoints) + tested down to 360px in dev
- [x] **UDL pass** in `src/a11y.js` + `src/input.css`:
  - [x] TTS via Web Speech API (per-page button)
  - [x] Adjustable text size toggle (A+ button)
  - [x] High-contrast mode toggle (◐ button)
  - [x] Dyslexia-friendly font toggle (Dx button) — Atkinson Hyperlegible fallback to DM Sans
  - [x] Cognitive Pace Mode toggle (⏸ button) — exposed to engine via `isPaceMode()`
  - [x] Skip-to-content link auto-injected
  - [x] `:focus-visible` outline across all interactive elements
  - [x] `prefers-reduced-motion` media query respected (animations disabled)
  - [x] ARIA labels on toolbar, step indicators, ticker, SDG tiles
- [x] a11y toolbar attached on all pages via module include

---

### Day 17 — May 26 (Tue) ✅ BUILD TASKS COMPLETE (script ready; run requires Firebase provisioning)
**Focus:** Sample Data Population + End-to-End Testing

**Build Tasks:**
- [x] `scripts/seed-sample-data.js` — populates 3 demo students (B1 / B1+ / C1), 3 teams, 3 frozen scenarios (SDG 6 / 13 / 14), token ledgers, complete decision histories, and 3 Pitch Capsules submitted to Hall of Excellence
- [x] Pre-curated SDG scenarios bank in `src/scenario.js` (`SAMPLE_SCENARIOS`) for SDGs 6, 13, 14 — extendable to all 17

**To run before submission:** provision Firebase project, set `FIREBASE_DATABASE_URL` and `FIREBASE_SERVICE_ACCOUNT` env vars, `npm i firebase-admin`, then `node scripts/seed-sample-data.js`.

---

### Day 18 — May 27 (Wed) ⚠ BUILD TASKS COMPLETE — HUMAN ACTIONS REQUIRED
**Focus:** Video Demo + Documentation Finalization

**Build Tasks (Claude Code):**
- [x] **Teacher's Guide FINAL (English working draft)** — `docs/teacher-guide.md`
- [x] **Submission Narrative draft** — `docs/submission-narrative.md`
- [x] **Innovation Concept Document v1** — completed Day 2
- [x] **Theoretical Grounding Map** — completed Day 2
- [x] **DPIA framework** — completed Day 3 (cohort-specific items still need to be filled)

**Human actions required (Aj. Yungie):**
- [ ] Video script (5–7 minutes, EN narration with TH subtitles) — script can be drafted from the submission narrative; recording is yours
- [ ] Screen recording of full platform walkthrough
- [ ] Voiceover recording
- [ ] Video editing and subtitles
- [ ] **Thai translations** of: Innovation Concept Document, Teacher's Guide (Thai-primary), DPIA (Thai legal), Submission Narrative
- [ ] **DPIA cohort-specific items**: cohort size, residual-risk acceptance signatures
- [ ] Final review of all rubrics for institutional fit

---

### Day 19 — May 28 (Thu) ⚠ BUILD TASKS COMPLETE — HUMAN ACTIONS REQUIRED
**Focus:** Submission Narrative + Final Polish

**Build Tasks (Claude Code):**
- [x] Submission Narrative English working draft — `docs/submission-narrative.md`
- [x] Documentation cross-reference review (all docs link to companions; consistent vocabulary)

**Human actions required (Aj. Yungie):**
- [ ] Thai translation of Submission Narrative (Thai primary, English supplement)
- [ ] Final platform deployment: `git push` to repo connected to Netlify, or drag-and-drop deploy at app.netlify.com/drop
- [ ] Provision Firebase project + set Netlify env vars (`ANTHROPIC_API_KEY`, `STABILITY_API_KEY`)
- [ ] Run `node scripts/seed-sample-data.js` to populate demo cohort
- [ ] Capture demo account credentials separately for the judges
- [ ] Backup: `git push` + a manual project-folder copy to your usual Drive/Box location

---

### Day 20 — May 29 (Fri) — BUFFER DAY ⚠ HUMAN ACTIONS

**Submission package on disk:**
- [x] Innovation Concept Document — `docs/innovation-concept.md`
- [x] Theoretical Grounding Map — `docs/theoretical-grounding.md`
- [x] Teacher's Guide — `docs/teacher-guide.md`
- [x] Rubric Suite — `docs/rubrics/{a,b,c,d}-*.md`
- [x] DPIA Framework — `docs/dpia-framework.md`
- [x] Submission Narrative — `docs/submission-narrative.md`
- [ ] Video Demonstration — Aj. Yungie records
- [ ] Live Platform URL with demo account credentials — Aj. Yungie deploys

**Final-day checklist (Aj. Yungie):**
- [ ] Walk every flow on the live deployment
- [ ] Verify Thai translations are in place
- [ ] Verify env vars are set + functions return 200
- [ ] Send the submission package to SPU before 10am ICT on May 30

---

### **May 30 (Sat) — SUBMISSION DAY**

- [ ] Submit by 10am Bangkok time (do NOT wait until end of day)
- [ ] Confirm receipt
- [ ] Celebrate. Then prepare for finals (June 14).

---

## Post-Submission (May 31 - June 14)

If advanced to finals:
- Refine platform based on first round feedback
- Prepare live presentation
- Conduct pilot test with willing students if possible
- Polish demo for live judging

---

## Risk Monitoring

Check these weekly:
- [ ] Are we on track for the day's deliverables?
- [ ] Any features being over-engineered? Simplify.
- [ ] Documentation falling behind? Catch up immediately.
- [ ] Aj. Yungie's competing commitments managed?
- [ ] Mobile responsive verified on real devices?
- [ ] Are we testing each feature before moving on?

---

**Reference: CLAUDE.md is the authoritative project context.**

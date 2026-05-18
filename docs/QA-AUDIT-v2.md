# QA / Accessibility / Mobile Audit — v2 (pre-submission)

**Date:** 2026-05 · **Build:** https://futureproof-sdgs-lab.netlify.app
**Scope:** the demo-critical journey + all v2 pages/modules.
**Verdict:** PASS — no defects on the demo path; logged for Q&A
("we audited, here is the evidence").

## 1 · Link & module integrity (live)
- All 16 journey/onboarding pages return **200** (index → home → intro →
  signup/signin → consent → assessment → avatar → mission-select →
  mission-run ×2 → final-task → hall → portfolio/reflections/my-data).
- Full JS module graph **200** (engine, keystones, adaptive, auth,
  firebase-init, tokens, both scenario adapters + content/quiz/m1,
  disclaimer). No 404s, no orphaned imports.
- The 4 new Chiang Mai `.vtt` caption files resolve **200** — captions
  render even before audio is produced.
- Every internal `./*.html` link in the five v2 pages resolves on disk.

## 2 · Accessibility (static, the v2 pages)
- `<html lang="en">` on every v2 page (Thai metalanguage via `lang="th"`
  spans, per CLAUDE.md §14).
- `prefers-reduced-motion` honoured on every v2 page (animations/
  transitions disabled under the query).
- No `<img>` without `alt` (UI is SVG / icon-font / CSS — decorative
  icons are `aria-hidden`; control buttons carry `aria-label`).
- No icon-only `<button>` lacking an accessible name.
- Keyboard: rail items and profile are real `<a>`/`<button>`; the vocab
  pronunciation control is a focusable `<button>` with `aria-label`;
  pins/tabs are buttons with `aria-selected`.

## 3 · Functional — save / resume round-trip (the highest-risk new logic)
Simulated end-to-end with a `localStorage` shim:
- `saveState()` serialises engine state, converting `Set`
  (`dossierProgress.read`) → array via a JSON replacer.
- `loadSavedState()` restores `stageIndex`, `quizIndex`, `quizTokens`,
  decisions — verified exact (stage 3, quiz item 2, 9 ◆ all round-trip).
- The scenario's `ensureReadSet()` rehydrates the array → `Set` on use
  (confirmed present in both Khon Kaen and Chiang Mai modules).
- `hasSavedState` / `savedAt` / `clearSavedState` behave; `finishMission`
  clears the save so no stale resume point survives a completed mission.
- Keyed `fp_mission_save_<uid>_<missionId>` — two missions never collide.

## 4 · Mobile / responsive (CSS audit)
- `mission-run.html`: rail → off-canvas with hamburger + scrim < 880px;
  right pane auto-hides < 1180px (`--right-w:0`), center goes full-width;
  edge toggle hidden on narrow. No fixed-width overflow traps.
- All v2 pages use fluid `clamp()` type and `minmax`/single-column grid
  fallbacks at the documented breakpoints.

## 5 · Known, accepted (non-blocking)
- Header **“Save & exit”** is wired only after a scenario loads
  successfully (nothing to save on a load-failure path) — acceptable;
  the failure path shows its own recovery CTA.
- `portfolio.html` / `reflections.html` / `my-data.html` are reachable
  from the rail and return 200 but remain **v1-era**; they are *not* on
  the judged demo path. Flagged for the post-submission roadmap, not a
  v2 blocker.
- Khon Kaen stakeholder MP3s still pending production (graceful
  “production pending” chip shows); captions already shipped. Tracked in
  `scenarios/PRODUCTION-PROMPTS-MASTER-v2.*`.

*No code changes were required by this audit — the finding is the
clean result itself.*

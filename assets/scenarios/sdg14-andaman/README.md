# Mission 4 — The Reef and the Tide  
## SDG 14 · Life Below Water · South Thailand (Andaman coast)

**Runtime status:** ✅ wired (`src/scenarios/sdg14-andaman*.js`)  
**Asset status:** ❌ none yet — folders are ready for drops.

> **Wiring contract.** Filenames in this folder are load-bearing. The runtime
> reads exact string paths from `src/scenarios/sdg14-andaman-content.js`. Drop
> a file at the stated path and it appears in the mission with NO code change.
> **Do not rename.** If a filename is missing, the player shows a graceful
> "production pending" chip — the demo never breaks, but the dispatch is lost.

**Master prompt reference:** [`scenarios/PRODUCTION-PROMPTS-MASTER-v2.md`](../../../scenarios/PRODUCTION-PROMPTS-MASTER-v2.md) → _MISSION 4 — "The Reef and the Tide"_

---

## Folder map · expected files

### `video/` — Stakeholder dispatches (English subtitles BURNED IN)
- [ ] `01-operator.mp4`      — Small dive-operator / boat-crew family (~30–32 s, ≤ 12 MB)
- [ ] `02-scientist.mp4`     — DMCR reef scientist (~30–32 s)
- [ ] `03-tour-director.mp4` — Larger tour-company / resort operations director (~30–32 s)
- [ ] `04-coop-leader.mp4`   — Community-cooperative leader · bridging voice (~30–32 s)

Spec per file: 1080p MP4 (H.264 + AAC), 16:9, subtitle text BURNED INTO picture
(verbatim from the script in the master), audio normalised to ~ −16 LUFS.

### `audio/` — WebVTT caption cue files (verbatim transcripts)
- [ ] `01-operator.vtt`
- [ ] `02-scientist.vtt`
- [ ] `03-tour-director.vtt`
- [ ] `04-coop-leader.vtt`

Each `.vtt` carries the EXACT same English script that is burned into the
matching `.mp4`. The runtime attaches it as a `<track kind="captions">` for
WCAG / accessibility — and the comprehension quiz quotes these strings, so
paraphrasing breaks the assessment.

### `images/` — Hero, portraits, and authored figures
- [ ] `hero.png`                            — 16:9 hero (briefing / journey card)
- [ ] `stakeholder-01.png`                  — Dive-operator portrait, accent OCHRE
- [ ] `stakeholder-02.png`                  — DMCR scientist portrait, accent STEEL
- [ ] `stakeholder-03.png`                  — Tour-company director portrait, accent BRONZE
- [ ] `stakeholder-04.png`                  — Cooperative leader portrait, accent SAGE
- [ ] `diagram-reef-stress-recovery.png`    — BRIEF reading explainer
- [ ] `chart-pressure-recovery.png`         — PROBE data-interpretation chart

**File-format alert.** Image generators routinely save PNG bytes with an
`.svg` or `.webp` extension. ALWAYS run `file -b <filename>` to confirm
the magic header matches the extension before committing. PNG-as-svg
silently 404s on Netlify (`X-Content-Type-Options: nosniff`).

---

## QA checklist (per asset)
- [ ] **Filename matches this README exactly** (case-sensitive, no
      "_v2", no "(final)", no spaces).
- [ ] **Magic bytes match the extension** (`file -b` → matches).
- [ ] **HTTP returns 200** when curled against the local server.
- [ ] **For videos & VTTs:** the spoken English and the burned-in
      subtitles are VERBATIM the master-prompt script — no paraphrase,
      no dropped clause, no added "um".
- [ ] **For portraits:** dignified composite role, never a real person;
      Thai-context authentic, never caricature.

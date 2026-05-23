# Mission 6 — The Village the Boom Left Behind  
## SDG 3 · Good Health and Well-being · East Thailand (EEC fringe — Rayong / Chonburi)

**Runtime status:** ⚠ not yet wired (`src/scenarios/sdg03-eecfringe*.js` to be authored)  
**Asset status:** ❌ none yet — folders are ready for drops.

> **Wiring contract.** Filenames in this folder are load-bearing. The
> runtime reads exact string paths from the (to-be-authored) content
> module. Drop a file at the stated path and it appears in the mission
> with NO code change. **Do not rename.**

**Master prompt reference:** [`scenarios/PRODUCTION-PROMPTS-MASTER-v2.md`](../../../scenarios/PRODUCTION-PROMPTS-MASTER-v2.md) → _MISSION 6 — "The Village the Boom Left Behind"_

The scenario explores the **demographic-hollowing** of EEC-adjacent
villages: working-age labour is drawn into the Eastern Economic
Corridor, leaving households of elders and grandchildren as the
village's primary health-services thin out. The tension is regional
development efficiency vs. equitable health access for left-behind
populations.

---

## Folder map · expected files

### `video/` — Stakeholder dispatches (English subtitles BURNED IN)
- [ ] `01-grandmother.mp4`         — Grandmother raising grandchildren · household head (~30–32 s)
- [ ] `02-provincial-officer.mp4`  — Provincial health officer (~30–32 s)
- [ ] `03-eec-administrator.mp4`   — EEC-town hospital administrator · efficiency case (~30–32 s)
- [ ] `04-osm-volunteer.mp4`       — อสม. village health volunteer · bridging voice (~30–32 s)

Spec: 1080p MP4 (H.264 + AAC), 16:9, subtitle text BURNED INTO picture
(verbatim from the script in the master), audio normalised to ~ −16 LUFS.

### `audio/` — WebVTT caption cue files (verbatim transcripts)
- [ ] `01-grandmother.vtt`
- [ ] `02-provincial-officer.vtt`
- [ ] `03-eec-administrator.vtt`
- [ ] `04-osm-volunteer.vtt`

### `images/` — Hero, portraits, and authored figures
- [ ] `hero.png`                            — 16:9 hero (briefing / journey card)
- [ ] `stakeholder-01.png`                  — Grandmother portrait, accent OCHRE
- [ ] `stakeholder-02.png`                  — Provincial health officer portrait, accent STEEL
- [ ] `stakeholder-03.png`                  — EEC-town hospital administrator portrait, accent BRONZE
- [ ] `stakeholder-04.png`                  — อสม. village health volunteer portrait, accent SAGE
- [ ] `diagram-demographic-hollowing.png`   — BRIEF explainer (working-age outflow → elder-and-child residual)
- [ ] `chart-access-gap.png`                — PROBE data-interpretation chart (health-access gap)

**File-format alert.** Run `file -b <filename>` on every image before commit.
PNG bytes named `*.svg` or `*.webp` silently fail to render on Netlify.

---

## QA checklist (per asset)
- [ ] **Filename matches this README exactly** (case-sensitive).
- [ ] **Magic bytes match the extension** (`file -b` → matches).
- [ ] **HTTP returns 200** locally.
- [ ] **For videos & VTTs:** verbatim match to master-prompt script.
- [ ] **For portraits:** composite role figure, dignified, never identifiable.
- [ ] **For Thai-context elements (อสม. volunteer):** authentic Thai
      uniform / setting cues, never caricature.

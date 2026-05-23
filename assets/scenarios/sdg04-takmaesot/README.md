# Mission 5 — The Children at the Border  
## SDG 4 · Quality Education · West Thailand (Tak / Mae Sot)

**Runtime status:** ⚠ not yet wired (`src/scenarios/sdg04-takmaesot*.js` to be authored)  
**Asset status:** ❌ none yet — folders are ready for drops.

> ### ⚠ DIGNITY-FIRST GUARDRAIL — non-negotiable
> This scenario centres on **migrant and stateless children at the
> Thai–Myanmar border**. Asset producers MUST refuse any prompt or
> framing that:
> - Names a real child, school, or NGO worker
> - Renders identifiable faces of minors
> - Suggests illegality, criminality, or "burden" framing
> - Romanticises hardship or invites pity
>
> Portraits are **composite role figures**, drawn at a respectful
> distance (3/4 view, soft lighting). The story is about institutional
> arrangement and educational right — not individual suffering.

> **Wiring contract.** Filenames in this folder are load-bearing.
> Drop a file at the stated path and it appears in the mission with NO
> code change. **Do not rename.**

**Master prompt reference:** [`scenarios/PRODUCTION-PROMPTS-MASTER-v2.md`](../../../scenarios/PRODUCTION-PROMPTS-MASTER-v2.md) → _MISSION 5 — "The Children at the Border"_

---

## Folder map · expected files

### `video/` — Stakeholder dispatches (English subtitles BURNED IN)
- [ ] `01-mlc-teacher.mp4`      — Migrant Learning Centre teacher (~30–32 s)
- [ ] `02-district-officer.mp4` — District Education officer (~30–32 s)
- [ ] `03-school-principal.mp4` — Thai government-school principal (~30–32 s)
- [ ] `04-ngo-coordinator.mp4`  — NGO education coordinator · bridging voice (~30–32 s)

Spec: 1080p MP4 (H.264 + AAC), 16:9, subtitle text BURNED INTO picture
(verbatim from the script in the master), audio normalised to ~ −16 LUFS.

### `audio/` — WebVTT caption cue files (verbatim transcripts)
- [ ] `01-mlc-teacher.vtt`
- [ ] `02-district-officer.vtt`
- [ ] `03-school-principal.vtt`
- [ ] `04-ngo-coordinator.vtt`

### `images/` — Hero, portraits, and authored figures
- [ ] `hero.png`                  — 16:9 hero (briefing / journey card)
- [ ] `stakeholder-01.png`        — MLC teacher portrait, accent OCHRE
- [ ] `stakeholder-02.png`        — District Education officer portrait, accent STEEL
- [ ] `stakeholder-03.png`        — Thai government-school principal portrait, accent BRONZE
- [ ] `stakeholder-04.png`        — NGO education coordinator portrait, accent SAGE
- [ ] `diagram-two-systems.png`   — BRIEF explainer of the two education-system arrangement
- [ ] `chart-allocation.png`      — PROBE data-interpretation chart (allocation gap)

**File-format alert.** Run `file -b <filename>` on every image before commit.
PNG bytes named `*.svg` or `*.webp` silently fail to render on Netlify.

---

## QA checklist (per asset)
- [ ] **Filename matches this README exactly** (case-sensitive).
- [ ] **Magic bytes match the extension** (`file -b` → matches).
- [ ] **HTTP returns 200** locally.
- [ ] **Dignity-first guardrail** holds (see top of file).
- [ ] **For videos & VTTs:** verbatim match to master-prompt script.
- [ ] **For portraits:** composite role, dignified, never identifiable.

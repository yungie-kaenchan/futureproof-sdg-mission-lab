# FUTUREPROOF — Scenario asset index

This folder holds the production assets for each mission's BRIEF · PROBE
stages — hero image, stakeholder portraits, stakeholder MP4 dispatches
(with burned-in English subtitles), WebVTT caption cue files, and the
dossier diagram + chart.

**Wiring is automatic.** Each scenario's content module
(`src/scenarios/sdg<NN>-<region>-content.js`) imports asset paths as
string keys. Drop a file at the stated path → it appears in the mission
with no code change. Rename a file → the runtime shows a graceful
"production pending" chip and the dispatch is lost.

See [`scenarios/PRODUCTION-PROMPTS-MASTER-v2.md`](../../scenarios/PRODUCTION-PROMPTS-MASTER-v2.md) for the canonical production prompts (scripts, voice direction, image briefs).

## Status (2026-05-23)

| # | Folder | Mission | Region | Runtime | Hero | Portraits | Videos | Captions | Diagram + Chart |
|--:|---|---|---|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | `sdg06-khonkaen`  | The Aquifer Below            | Northeast | ✅ | ✅ | ✅ 4/4 | ❌ 0/4 | ✅ 4/4 | ✅ 2/2 |
| 2 | `sdg13-chiangmai` | The Burning Season           | North     | ✅ | ✅ | ✅ 4/4 | ✅ 4/4 | ✅ 4/4 | ✅ 2/2 |
| 3 | `sdg11-bangkok`   | The Klong and the City       | Central   | ✅ | ✅ | ✅ 4/4 | ✅ 4/4 | ✅ 4/4 | ✅ 2/2 |
| 4 | `sdg14-andaman`   | The Reef and the Tide        | South     | ✅ | ✅ | ✅ 4/4 | ✅ 4/4 | ✅ 4/4 | ✅ 2/2 |
| 5 | `sdg04-takmaesot` | The Children at the Border   | West      | ✅ | ✅ | ✅ 4/4 | ✅ 4/4 | ✅ 4/4 | ✅ 2/2 |
| 6 | `sdg03-eecfringe` | The Village the Boom Left Behind | East  | ❌ | ❌ | ❌ 0/4 | ❌ 0/4 | ❌ 0/4 | ❌ 0/2 |

Per-folder READMEs document the exact filename inventory and QA checklist
for each mission.

## Mojibake-by-extension rule

Asset deliveries have repeatedly contained PNG bytes saved with `.svg` or
`.webp` extensions. Netlify enforces `X-Content-Type-Options: nosniff`,
so a PNG-as-svg silently fails to render. **Always** run:

```bash
file -b assets/scenarios/<mission>/images/<filename>
```

…on every received image before commit. If the magic bytes say PNG but
the extension says SVG, rename to `.png` and sweep the path reference in
the matching `src/scenarios/<mission>-content.js`.

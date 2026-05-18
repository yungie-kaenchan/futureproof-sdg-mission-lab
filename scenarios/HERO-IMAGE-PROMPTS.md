# Mission Hero Images — Prompts (16:9)

Per the QC red-text on **Mission_Brief.pdf**: one 16:9 hero image sits
below the title of **each of the six missions**. Until a file is dropped
at the stated path, the brief shows a styled console-gradient placeholder
with the mission title (no broken image — graceful by design).

**Shared style (apply to all six):** cinematic editorial photograph,
natural light, restrained colour, *no people in the foreground, no text,
no logos*. 16:9, ≥ 1600 px wide, exported as the stated filename.
Slightly desaturated so gold UI text stays legible if overlaid. Mood:
serious, dignified, hopeful — not disaster-porn. Each image leans on its
mission's SDG accent colour as a subtle ambient tone.

> Wiring is automatic: produce → drop at the **exact path** → it appears.
> Built missions use the path already wired in SCENARIO_META.hero.

---

## 1 · SDG 6 · Khon Kaen — "The Aquifer Below Khon Kaen"
**Path:** `/assets/scenarios/sdg06-khonkaen/images/hero.png` *(produced ✓ — replace to upgrade)*
**Prompt:** A wide dry-season Khorat Plateau landscape at golden hour — a
cracked paddy edge in the foreground mid-ground, a deep municipal
wellhead and slim water tower in the distance under a vast hot sky;
parched ochre earth meeting a thin band of green along a far canal.
Cinematic, editorial, calm, restrained; cyan SDG-6 ambient tone in the
sky. No people, no text.

## 2 · SDG 13 · Chiang Mai — "The Burning Season"
**Path:** `/assets/scenarios/sdg13-chiangmai/images/hero.webp`
**Prompt:** The Ping valley under grey burning-season haze at first
light — Doi Suthep a faint silhouette, an upland field edge with thin
smoke rising at the treeline, terraced maize stubble in the
mid-distance; muted, smoky, cinematic, a deep-green SDG-13 ambient
undertone breaking through the haze. No people, no text.

## 3 · SDG 11 · Bangkok — "The Klong and the City"
**Path:** `/assets/scenarios/sdg11-bangkok/images/hero.webp`
**Prompt:** A Bangkok klong at dawn — timber stilt homes leaning over
dark water on one bank, a glass CBD skyline rising behind on the other,
a narrow long-tail wake on the canal; the two worlds framed across the
same water. Cinematic, editorial, warm amber SDG-11 ambient tone. No
people foreground, no text.

## 4 · SDG 14 · Andaman — "The Reef and the Tide" *(documented)*
**Path:** `/assets/scenarios/sdg14-andaman/images/hero.webp`
**Prompt:** An Andaman cove from just above the waterline at low light —
a fringing reef shadowed under clear shallow water, a single moored
long-tail boat, a limestone karst beyond; part of the reef visibly
bleached pale next to living colour. Cinematic, restrained, oceanic
SDG-14 blue ambient tone. No people, no text.

## 5 · SDG 4 · Tak / Mae Sot — "The Children at the Border"
**Path:** `/assets/scenarios/sdg04-takmaesot/images/hero.webp`
**Prompt:** A border-district learning space at morning — a simple
open-sided classroom shelter at the edge of a field, the Moei river and
hills of the frontier in the far haze, worn benches and a small
chalkboard; dignified, warm, hopeful — never pitiable. Soft red-toned
SDG-4 ambient light. No identifiable faces, no text.

## 6 · SDG 3 · EEC fringe — "The Village the Boom Left Behind"
**Path:** `/assets/scenarios/sdg03-eecfringe/images/hero.webp`
**Prompt:** An eastern-Thailand fringe village at dusk — quiet wooden
houses, an empty community-clinic porch with a single light on, the
glow of EEC industry on the far horizon; the contrast of a hollowed
village against distant growth. Cinematic, tender, green SDG-3 ambient
tone. No people foreground, no text.

---

### Output spec (all)
16:9 · ≥ 1600 px wide · ≤ ~600 KB · `.webp` preferred (PNG acceptable —
if PNG, keep the same filename stem and change only the extension in
`SCENARIO_META.hero`). Alt text is intentionally empty (decorative; the
mission title is the accessible heading right above it).

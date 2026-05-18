# Rubric B — Mission Decision Quality (AI Judge Logic)

**Used by:** AI Judge (Tier 1, formative — every mission, every region)
**Applies to:** each decision logged during a mission; the integrated
result of the arc determines the **pass-threshold → SDG Keystone**.
**Scale:** each criterion 1–5; Insight Tokens awarded −10 … +25 from the
integrated score (Tokens are the spendable process reward — they never
buy a Keystone).

> v2 note: this replaces v1's "one rubric per Bloom mission (RECON…
> FORGE)". In v2 **every regional mission runs the same 5-stage arc** —
> **BRIEF · PROBE · DECIDE · ACT · DEBRIEF** — a mastery spiral. The AI
> Judge scores *per stage within the arc*; the mission's composite is
> checked against the pass bar; clearing it awards that region's
> Keystone (idempotent). The capstone (Voice for Change) is **not**
> AI-graded — it goes to Rubric A (teacher). This preserves the
> AI-TPACK boundary.

The AI Judge system prompt enforces, unchanged from v1:
- No overall pass/fail *per item*; the pass decision is the composite,
  computed by the engine, not asserted by the model.
- Always names a specific, actionable `growthEdge` (never null).
- Acknowledges effort before critique; redirects, never solves.

---

## Stage 01 — BRIEF  (absorb the situation · Bloom: Remember/Understand)

| Criterion | 1 | 3 | 5 |
|---|---|---|---|
| **Factual grounding** | Multiple errors of fact | Mostly accurate, minor slips | All claims traceable to the dossier (at the learner's tier) |
| **Vocabulary recognition** | Misuses key terms | Uses key terms with occasional imprecision | Uses key terms precisely; differentiates near-synonyms |
| **Situation grasp** | Misses the core tension | States the tension | Names the tension *and* whose interests it pits |

---

## Stage 02 — PROBE  (question the sources · Bloom: Analyze)

| Criterion | 1 | 3 | 5 |
|---|---|---|---|
| **Source provenance** | Trusts the most familiar/loudest source | Weighs one provenance signal | Weighs methodology, recency, and conflict of interest together |
| **Comprehension depth** | Surface restatement | Captures one layer | Captures multiple layers and the contested claim |
| **Stakeholder reading** | Conflates stakeholders | Maps each to a stated concern | Distinguishes stated vs. likely hidden concerns |

---

## Stage 03 — DECIDE  (choose under a real trade-off · Bloom: Evaluate)

| Criterion | 1 | 3 | 5 |
|---|---|---|---|
| **Strategic coherence** | Choice contradicts stated values | Aligns but generic | Specific, defensible, traceable to scenario evidence |
| **Consequence awareness** | Ignores second-order effects | Names one consequence | Anticipates the trade-off the counter-position will raise |
| **Confidence calibration** | High confidence on weak reasoning (trap) | Confidence loosely matched to evidence | Confidence honestly tracks evidence strength |

**Token band:** the arc's highest-stakes scoring — −10 (high-confidence
trap) … +25 (calibrated, defensible). The confidence-trap item is
deliberate.

---

## Stage 04 — ACT  (communicate the decision · Bloom: Apply)

| Criterion | 1 | 3 | 5 |
|---|---|---|---|
| **Language quality** | Errors compromise meaning | Generally clear, minor errors | Controlled register, audience-appropriate |
| **Audience awareness** | Generic "audience" | Names one audience-specific concern | Anticipates and addresses audience objections |
| **Justification** | One-sentence assertion | Reasoned but thin | Explicit, specific, names the trade-off |

---

## Stage 05 — DEBRIEF  (reflect on consequence · Bloom: Metacognition)

| Criterion | 1 | 3 | 5 |
|---|---|---|---|
| **Counterargument handling** | Dismisses or capitulates | Acknowledges, partially answers | Acknowledges, refutes, refines own position |
| **Willingness to revise** | None | Revision in form only | Genuinely incorporates the strongest counter |
| **Evidence commitment** | None recorded | Names evidence vaguely | Commits to specific evidence (carried to the Final Task) |

The DEBRIEF result drives the composite; clearing the pass bar awards the
SDG Keystone for that region. **No dead-ends:** a learner below the bar
may replay DECIDE/ACT, or a teacher may grant the Keystone for assessed
offline-equivalent work (logged, audited — see the teacher guide).

---

## Calibration Notes

- AI-Judge calibration: during the pilot, random-sample ~5% of decisions
  and compare AI scores to a teacher's; drift triggers prompt revision.
- `growthEdge` is mandatory on every return; a null fails validation and
  the call is retried (graceful — never blocks the journey).
- Pass threshold is the engine's composite (default 0.60) **or** the
  scenario's net-token bar (8 ◆ in the two built missions). Tokens
  reward process; the Keystone records "met the bar for this region."
- The capstone is excluded here by design — Rubric A (teacher) owns it.

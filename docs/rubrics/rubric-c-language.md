# Rubric C — CEFR-Aligned Language Development (Pre/Post)

**Used by:** Course-level evaluators
**Applies to:** a single learner's writing and speaking samples at three
timepoints — **diagnostic** (the readiness check, which also sets the
reading tier), **mid-journey** (after the learner's first passed region
mission), and **post-capstone** (after the Voice for Change).
**Scale:** CEFR bands A2 → C2 with intra-band markers (A2/B1-/B1/B1+/B2-/B2/B2+/C1)

> v2 note: "Mission 03 / Pitch Capsule" timepoints are replaced by
> "first passed regional mission / Voice for Change". The diagnostic now
> additionally maps the learner to a **reading tier** {1,2,3}; see the
> tier-fairness rule below — it changes how growth is read, not the
> descriptors.

---

## Methodology

The same five dimensions are scored at each timepoint. Growth =
post-band − pre-band, in half-band increments.

| Dimension | Diagnostic source | Mid-journey source | Post source |
|---|---|---|---|
| **Lexical range** | Vocabulary section + writing prompt | DECIDE/ACT written reasoning in the first passed mission | Voice for Change + transcript |
| **Grammatical control** | Cloze + writing prompt | ACT written communication + DEBRIEF rationale | Voice for Change + transcript |
| **Discourse organization** | Writing prompt | PROBE source-weighing + DEBRIEF reflection | Voice for Change synthesis |
| **Register flexibility** | Writing prompt (single register) | ACT audience-specific communication | Voice for Change (address to a real audience) |
| **Phonological control (speaking)** | Optional pre-recording | (optional) spoken stage response | Voice for Change audio narration (live or uploaded lane) |

### Tier-fairness rule (v2, load-bearing)

Reading text is served at the learner's tier; **audio/video is not
tiered** (authentic input, caption-scaffolded — the SLA asymmetry).
Therefore:

- **Measure growth, not tier.** A Tier-1 learner who moves A2 → B1 has
  demonstrated the same half-band gain as a Tier-3 learner who moves
  B2 → B2+. Report the **delta**, never the absolute band as a verdict
  on the learner.
- **Receptive vs. productive.** The diagnostic and capstone are
  *productive* samples (writing/speaking) and are tier-neutral to
  produce — grade them directly. Do not infer a ceiling from the
  learner's reading tier.
- **Listening is assessed against authentic input** with the caption
  scaffold available; do not down-rate a lower-tier learner for needing
  the caption — using the provided scaffold is the designed behaviour.

---

## CEFR Band Descriptors (FUTUREPROOF working set)

### Lexical range

- **A2:** Limited stock of frequent words; topic-specific vocabulary is rare.
- **B1:** Sufficient vocabulary to discuss familiar topics; some imprecision.
- **B1+:** Reaches for precise vocabulary in familiar domains; occasionally produces lower-frequency word forms.
- **B2:** Range covers most general topics; circumlocutes around lexical gaps.
- **C1:** Reliable command of low-frequency vocabulary, idiomatic and colloquial usage; chosen with intent.

### Grammatical control

- **A2:** Simple structures; frequent errors in coordination and tense.
- **B1:** Reasonable accuracy in familiar contexts; complex structures attempted but uneven.
- **B2:** Good control of complex grammar; errors do not impede communication.
- **C1:** Consistent grammatical control; errors rare and self-correctable.

### Discourse organization

- **A2:** Linear listing; few connectors.
- **B1:** Linear with simple connectors (and, but, because).
- **B2:** Multiple connectors; clear paragraphing; topic sentences emerging.
- **C1:** Complex argument structures; subordination signals reliable; metadiscourse present.

### Register flexibility

- **A2:** Single register only.
- **B1:** Two recognizable registers (formal / informal) with crossover.
- **B2:** Distinguishes academic / persuasive / colloquial; minor leakage.
- **C1:** Selects register strategically; can blend registers for rhetorical effect.

### Phonological control

- **A2:** Pronunciation transparent enough to be understood with effort.
- **B1:** Generally intelligible; word stress sometimes off.
- **B2:** Generally clear; occasional pronunciation issues with low-frequency words.
- **C1:** Pronunciation contributes to meaning; intonation and stress are tools, not obstacles.

---

## Recording Growth

For each learner, the post-Pitch-Capsule rubric outputs:

```json
{
  "lexical": { "pre": "B1", "post": "B1+", "growthHalfBands": 1 },
  "grammar": { "pre": "B1", "post": "B2",  "growthHalfBands": 2 },
  "discourse": { "pre": "B1+", "post": "B2", "growthHalfBands": 1 },
  "register": { "pre": "B1", "post": "B2",  "growthHalfBands": 2 },
  "phonology": { "pre": "B1", "post": "B1+", "growthHalfBands": 1 },
  "compositeGrowthHalfBands": 7
}
```

Composite growth ≥ 4 over a single course is the design target.

---

## Notes

- Inter-rater reliability target: Cohen's κ ≥ 0.7 between two human evaluators on a 10% audit sample.
- The AI evaluator is calibrated against the human-scored samples; drift greater than 0.5 half-band on any dimension triggers prompt revision.
- This rubric explicitly excludes content evaluation — that lives in Rubric A.

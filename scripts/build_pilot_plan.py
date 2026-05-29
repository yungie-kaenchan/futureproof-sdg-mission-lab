#!/usr/bin/env python3
"""Build 'Pilot & Measurement Plan' in the FP Word template."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import fp_docgen as fp

OUT_DIR = "docs/judge-pack"; COVERS = "docs/document-design/covers"
doc = fp.new_doc()

fp.cover(doc,
         kicker_text="Research Design · For Judges",
         title_text="Pilot & Measurement Plan",
         subtitle="The research design behind FUTUREPROOF",
         thai_line="แผนการนำร่องและการวัดผลกระทบ · ภาคการศึกษา ๑ / ๒๕๖๙",
         slug="pilot-measurement-plan", image_dir=COVERS)

fp.kicker(doc, "FUTUREPROOF · SDG Mission Journey   ·   Pilot & Measurement · v1.0 · May 2026")
fp.title(doc, "Pilot & Measurement Plan")
fp.thai_sub(doc, "แผนการนำร่องและการวัดผลกระทบ · ภาคการศึกษา ๑ / ๒๕๖๙")
fp.lede(doc, "This submission is a launch-ready innovation in its zero-cohort phase. Other "
             "submissions show what happened — we show what we are prepared to measure. The data "
             "study is the next phase, not the current one.")

fp.h2(doc, "The pilot · semester 1 / academic year 2569")
fp.kv_table(doc, [
    ("First cohort", "LALA109 · Sem 1 / AY 2569 · August 2026 · Mahidol University, Faculty of Liberal Arts"),
    ("Cohort size", "Up to 50 learners per section × up to 6 sections = up to 300 learners"),
    ("Duration", "15 weeks · 3 in-class hours + 6 async hours per week (135 hours total)"),
    ("Course fit", "Replaces the existing Design-Thinking SDG project (weeks 7–14, currently 40% of grade)"),
    ("Teacher preparation", "10 hours pre-term · workshop + Teacher's Manual self-study"),
])

fp.h2(doc, "What we measure · five instruments")
fp.data_table(doc,
    ["Instrument", "Captures", "Method"],
    [
      ["Rubric A · capstone", "Voice for Change argument + craft", "Teacher · summative · 5 dimensions × 1.0/0.5 · max 45 pts"],
      ["Rubric B · in-mission", "Decision quality across 5 stages", "AI · formative · stage-anchored · token-graded"],
      ["Rubric C · CEFR delta", "Language gain (pre / mid / post)", "5 dimensions × half-band increments · target +4 half-bands"],
      ["Rubric D · soft skills", "Critical · analytical · collaboration · ethics · decision", "Teacher + peer · 5 dimensions × max 6 pts each"],
      ["Attitude shift", "Pre / post attitudes toward SDGs · AI", "Likert-scale survey · n = full cohort"],
    ],
    widths_mm=[34, 52, 80])

fp.h2(doc, "Reliability & ethics safeguards")
fp.bullets(doc, [
    "**Inter-rater reliability** · Cohen's κ ≥ 0.7 target between two human evaluators on a 10% audit sample.",
    "**AI evaluator calibration** · random 5% audit against teacher score; drift > 0.5 score-points triggers prompt revision.",
    "**PDPA compliance** · bilingual consent before any personal-data write; 90-day auto-deletion post-course; granular consent per data category.",
    "**DPIA on file** · Data Protection Impact Assessment per พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562.",
    "**Withdrawal rule** · learners may withdraw from research participation while continuing the course; their data is purged within 7 days.",
])

fp.h2(doc, "Dissemination path · once data lands")
fp.h3(doc, "Conferences (target)")
fp.bullets(doc, ["TESOL International Convention", "AsiaTEFL Annual Conference", "EuroCALL", "AILA World Congress"])
fp.h3(doc, "Journals (target)")
fp.bullets(doc, ["Computer Assisted Language Learning", "ReCALL", "Language Learning & Technology",
                 "Journal of Digital Learning in Teacher Education"])

fp.h2(doc, "Why this matters · the strategic frame")
fp.body(doc, "Past Thai education-innovation competitions have rewarded “evidence of impact” via "
             "retrospective classroom data. FUTUREPROOF inverts this: we provide **auditable "
             "architecture + a rigorous design ready to produce data**, not retrospective stories "
             "from a single uncontrolled term. This is a methodological choice, not a gap.")
fp.body(doc, "When the first cohort completes the pilot in December 2026, every instrument above is "
             "already built, calibrated, and waiting — so the evidence, when it lands, will be clean, "
             "comparable, and publishable.")

fp.footer(doc, "Dr. Payungsak Kaenchan · Faculty of Liberal Arts",
          "FUTUREPROOF · SPU Tech Creative Learning Awards 2569")

docx_path = os.path.join(OUT_DIR, "PILOT-MEASUREMENT-PLAN.docx")
doc.save(docx_path); print("saved", docx_path)
print("pdf", fp.to_pdf(docx_path))

#!/usr/bin/env python3
"""Build 'Read This First' (executive summary for judges) in the FP Word template."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import fp_docgen as fp

OUT_DIR = "docs/judge-pack"
COVERS  = "docs/document-design/covers"
os.makedirs(OUT_DIR, exist_ok=True)

doc = fp.new_doc()

fp.cover(doc,
         kicker_text="Start Here · 1 Page · For Judges",
         title_text="Read This First",
         subtitle="Executive summary of the FUTUREPROOF submission",
         thai_line="เอกสารแนะนำผลงานในหนึ่งหน้า · สำหรับคณะกรรมการ",
         slug="read-this-first", image_dir=COVERS)

fp.kicker(doc, "FUTUREPROOF · SDG Mission Journey   ·   Read This First · v1.0 · May 2026")
fp.title(doc, "Read this first")
fp.thai_sub(doc, "เอกสารแนะนำผลงานในหนึ่งหน้า · สำหรับคณะกรรมการ")
fp.lede(doc, "If you read only one document in this submission package, read this one. "
             "Three claims, one verification URL, a two-minute commitment.")

fp.h2(doc, "What this is")
fp.body(doc, "An AI-scaffolded English-language learning platform for **LALA109 · English for "
             "Digital Communication Skills** at the Faculty of Liberal Arts, Mahidol University. "
             "Six adaptive missions across Thailand, each anchored to a UN Sustainable Development "
             "Goal, culminating in a teacher-graded **Voice for Change** capstone — a two-to-five-minute "
             "spoken proposal addressed to a real Thai institution.")

fp.h2(doc, "Three load-bearing claims · all auditable")
fp.callout(doc, "Claim 1 · AI-TPACK enforced at the system-prompt level",
           "The boundary between what AI handles (scale, formative feedback) and what humans handle "
           "(summative grading, cultural authenticity) is **hard-coded into the Claude API system prompts** "
           "of Mr Compass and the AI Judges — not merely declared in the application. Open the Judge Tour, "
           "Step 8, to see this in the admin console.", kind="red")
fp.callout(doc, "Claim 2 · Three learning theories made operational",
           "Behaviorism (the Insight-Token economy · operant conditioning), Cognitivism (the 5-stage arc · "
           "CTML multimedia), and Social Constructivism (the 3-role asymmetric team · Mr Compass as the More "
           "Knowledgeable Other) — **each cited theorist maps to a feature you can click on.** See the "
           "Teacher's Manual, Chapter 4, for the full triptych mapping.", kind="gold")
fp.callout(doc, "Claim 3 · Compliance and accessibility built into the foundation",
           "PDPA · พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 · with bilingual consent and 90-day auto-deletion. "
           "CAST UDL 3.0 across all three principles. **WCAG 2.1 AA** verified by Google Lighthouse "
           "(Accessibility 100 / 100 on Home and the Judge Tour). Mobile-first from 360 px upward.", kind="gold")

fp.h2(doc, "Where to verify, in one click each")
fp.kv_table(doc, [
    ("Live platform", "https://futureproof-sdgs-lab.netlify.app"),
    ("Judge Tour (start here)", "https://futureproof-sdgs-lab.netlify.app/pages/judge-tour.html"),
    ("Sample mission (pre-completed)", "Judge Tour · Step 04 · SDG 6 · Khon Kaen · The Aquifer Below"),
    ("Voice for Change demo", "“Skip to Voice for Change” button at Judge Tour · Step 04"),
    ("Hall of Voices", "Four composite-anonymous exemplars · Judge Tour · Step 07"),
    ("Admin Console", "Seven modules · Judge Tour · Step 08 · sign-in required"),
])

fp.h2(doc, "Where to read more · the submission package")
fp.bullets(doc, [
    "**Application** · the 15-page report with a 36-source bibliography",
    "**Rubric A** · Voice for Change Holistic · teacher-graded · 5 pp",
    "**Rubrics B · C · D** · AI logic / CEFR delta / soft skills · 4–5 pp each",
    "**Teacher's & Judge's Manual** · 28 pp bilingual · written for teachers and judges alike",
    "**Pilot & Measurement Plan** · companion research-design document",
    "**Scrutiny Report** · a self-audit with Lighthouse numbers and competitive analysis",
])

fp.footer(doc, "Dr. Payungsak Kaenchan · Faculty of Liberal Arts",
          "FUTUREPROOF · SPU Tech Creative Learning Awards 2569")

docx_path = os.path.join(OUT_DIR, "READ-THIS-FIRST.docx")
doc.save(docx_path)
print("saved", docx_path)
pdf_path = fp.to_pdf(docx_path)
print("pdf", pdf_path)

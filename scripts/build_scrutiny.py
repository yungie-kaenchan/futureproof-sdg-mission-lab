#!/usr/bin/env python3
"""Build the Scrutiny Report (Document scrutiny + APA-7) as .docx → PDF."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import fp_docgen as fp
import md2fp, html2fp

OUT = "docs/document-scrutiny"; COVERS = "docs/document-design/covers"
SRC = os.path.join(OUT, "SCRUTINY-REPORT.md")

doc = fp.new_doc()
fp.cover(doc,
         kicker_text="Audit · Document Scrutiny",
         title_text="Document Scrutiny",
         subtitle="A self-audit of the FUTUREPROOF application, with an APA-7 bibliography",
         thai_line="การตรวจสอบเอกสาร · บรรณานุกรมแบบ APA 7",
         slug="scrutiny-report", image_dir=COVERS)
fp.kicker(doc, "FUTUREPROOF · SDG Mission Journey   ·   Document Scrutiny · v1.0")
fp.title(doc, "Document Scrutiny")
fp.thai_sub(doc, "การตรวจสอบเอกสารผลงาน · บรรณานุกรมแบบ APA 7")

blocks = md2fp.collect_blocks(SRC)
# drop the leading H1 (the cover already carries the title)
out, dropped = [], False
for b in blocks:
    if b[0] == "title" and not dropped:
        dropped = True; continue
    out.append(b)
html2fp.render_blocks(doc, out, fp)

fp.footer(doc, "Dr. Payungsak Kaenchan · Faculty of Liberal Arts",
          "FUTUREPROOF · SPU Tech Creative Learning Awards 2569")

docx = os.path.join(OUT, "SCRUTINY-REPORT.docx")
doc.save(docx); print("saved", docx)
print("pdf", fp.to_pdf(docx))

#!/usr/bin/env python3
"""Build the Teacher's & Judge's Manual (28 pp, bilingual) as .docx → PDF."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import fp_docgen as fp
import html2fp

OUT = "docs/teacher-manual"; COVERS = "docs/document-design/covers"
SRC = os.path.join(OUT, "FUTUREPROOF-Teacher-Manual.html")

doc = fp.new_doc()
fp.cover(doc,
         kicker_text="Manual · For Teachers & Judges",
         title_text="The Teacher's & Judge's Manual",
         subtitle="How to run, grade, and read FUTUREPROOF",
         thai_line="คู่มือสำหรับอาจารย์และคณะกรรมการ",
         slug="teacher-manual", image_dir=COVERS)

blocks = html2fp.collect_blocks(SRC)
html2fp.render_blocks(doc, blocks, fp)

fp.footer(doc, "Dr. Payungsak Kaenchan · Faculty of Liberal Arts",
          "FUTUREPROOF · Teacher's & Judge's Manual")

docx = os.path.join(OUT, "FUTUREPROOF-Teacher-Manual.docx")
doc.save(docx); print("saved", docx)
print("pdf", fp.to_pdf(docx))

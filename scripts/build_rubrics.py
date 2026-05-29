#!/usr/bin/env python3
"""Build Rubrics A–D as .docx → PDF in the FP Word template (content from existing HTML)."""
import os, sys, re, html as H
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import fp_docgen as fp
import html2fp

OUT = "docs/rubrics"; COVERS = "docs/document-design/covers"

RUBRICS = [
    ("rubric-a-voice-for-change", "Rubric · A · Assessment Instrument",
     "รูบริก A · การประเมิน Voice for Change แบบองค์รวม"),
    ("rubric-b-mission-decision", "Rubric · B · AI Judge Logic",
     "รูบริก B · คุณภาพการตัดสินใจระหว่างภารกิจ"),
    ("rubric-c-cefr-language", "Rubric · C · Language Development",
     "รูบริก C · พัฒนาการภาษาตามกรอบ CEFR"),
    ("rubric-d-soft-skills", "Rubric · D · Soft-Skills Demonstration",
     "รูบริก D · การแสดงทักษะเชิงสังคมและการคิด"),
]

def grab(html, cls):
    m = re.search(r'class="%s"[^>]*>(.*?)</div>' % cls, html, re.S)
    if not m: return ""
    return re.sub(r"\s+", " ", H.unescape(re.sub(r"<[^>]+>", "", m.group(1)))).strip()

def build(slug, kicker, thai, only=None):
    src = os.path.join(OUT, slug + ".html")
    html = open(src, encoding="utf-8").read()
    title = grab(html, "cover-title") or slug
    subtitle = grab(html, "cover-subtitle")
    doc = fp.new_doc()
    fp.cover(doc, kicker_text=kicker, title_text=title,
             subtitle="Assessment rubric · FUTUREPROOF",
             thai_line=thai, slug=slug, image_dir=COVERS)
    fp.kicker(doc, "FUTUREPROOF · SDG Mission Journey   ·   " + kicker)
    fp.title(doc, title)
    if subtitle:
        fp.thai_sub(doc, subtitle)
    blocks = html2fp.collect_blocks(src)
    html2fp.render_blocks(doc, blocks, fp)
    fp.footer(doc, "Dr. Payungsak Kaenchan · Faculty of Liberal Arts",
              "FUTUREPROOF · SPU Tech Creative Learning Awards 2569")
    # lowercase filenames — match the Judge Tour links and the original convention
    docx = os.path.join(OUT, slug + ".docx")
    doc.save(docx); print("saved", docx)
    print("pdf", fp.to_pdf(docx))

if __name__ == "__main__":
    only = sys.argv[1] if len(sys.argv) > 1 else None
    for slug, kicker, thai in RUBRICS:
        if only and only not in slug:
            continue
        build(slug, kicker, thai)

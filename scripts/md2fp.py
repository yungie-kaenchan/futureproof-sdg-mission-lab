#!/usr/bin/env python3
"""md2fp.py — convert a Markdown document into fp_docgen template blocks."""
import re

def collect_blocks(md_path):
    lines = open(md_path, encoding="utf-8").read().splitlines()
    blocks = []
    i, n = 0, len(lines)
    para, bul, quote, tbl = [], [], [], []

    def flush_para():
        nonlocal para
        if para:
            blocks.append(("body", " ".join(para).strip())); para = []
    def flush_bul():
        nonlocal bul
        if bul:
            blocks.append(("bullets", bul[:])); bul.clear()
    def flush_quote():
        nonlocal quote
        if quote:
            blocks.append(("callout", "Audit note", " ".join(quote).strip(), "gold")); quote = []
    def flush_tbl():
        nonlocal tbl
        if tbl:
            rows = []
            for r in tbl:
                cells = [c.strip() for c in r.strip().strip("|").split("|")]
                rows.append(cells)
            # drop separator rows ( |---|--- )
            rows = [r for r in rows if not all(re.fullmatch(r":?-{2,}:?", c or "-") for c in r)]
            if rows:
                headers, body = rows[0], rows[1:]
                blocks.append(("table", headers, body))
            tbl = []

    while i < n:
        ln = lines[i].rstrip()
        if ln.startswith("|"):
            flush_para(); flush_bul(); flush_quote(); tbl.append(ln); i += 1; continue
        else:
            flush_tbl()
        if ln.startswith("> "):
            flush_para(); flush_bul(); quote.append(_md_inline(ln[2:])); i += 1; continue
        else:
            flush_quote()
        if re.match(r"^#\s", ln):
            flush_para(); flush_bul()
            blocks.append(("title", _md_inline(ln[2:].strip())))
        elif re.match(r"^##\s", ln):
            flush_para(); flush_bul(); blocks.append(("h2", _md_inline(ln[3:].strip())))
        elif re.match(r"^###\s", ln):
            flush_para(); flush_bul(); blocks.append(("h3", _md_inline(ln[4:].strip())))
        elif re.match(r"^[-*]\s", ln):
            flush_para(); bul.append(_md_inline(ln[2:].strip()))
        elif ln.strip() in ("---", "***", "___"):
            flush_para(); flush_bul(); blocks.append(("divider",))
        elif ln.strip() == "":
            flush_para(); flush_bul()
        else:
            flush_bul(); para.append(_md_inline(ln.strip()))
        i += 1
    flush_para(); flush_bul(); flush_quote(); flush_tbl()
    return blocks

def _md_inline(s):
    s = re.sub(r"`([^`]+)`", r"\1", s)          # drop code ticks
    s = s.replace("**", "\x00")                 # protect bold
    s = re.sub(r"\*([^*]+)\*", r"\1", s)        # italic → plain
    s = s.replace("\x00", "**")                 # restore bold
    return s

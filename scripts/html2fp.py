#!/usr/bin/env python3
"""
html2fp.py — convert a FUTUREPROOF rubric/manual HTML into a block list, then
render it through the fp_docgen Word template. Class-aware (tuned to the project's
own document HTML), with a generic fallback for h1-h3 / p / ul / ol / table.
"""
import re, html as _html
from html.parser import HTMLParser

# ── block model ──────────────────────────────────────────────────
# Each block is a tuple the renderer understands:
#   ('h2', text) ('h3', text) ('kicker', text) ('body', text) ('blurb', text)
#   ('bullets', [text,...]) ('table', headers, rows) ('callout', label, text, kind)

SKIP_CLASSES = {
    "cover-corner", "cover-header", "cover-letter-block", "cover-title",
    "cover-subtitle", "cover-footer", "page-strip", "cover-tag", "cover-version",
    "cover-letter", "cover-rubric-meta", "toc", "chapter-num", "chapter-opener-meta",
    "toc-item", "toc-num", "toc-title", "toc-title-th", "toc-page-num",
    "manual-cover", "cover-meta", "page-num", "running-head",
    "cover-stats", "cover-stat", "cover-stat-num", "cover-stat-label",
}
INLINE_BOLD = {"strong", "b"}
INLINE_EM = {"em", "i"}

class Collector(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.blocks = []
        self.stack = []           # list of (tag, classes)
        self.skip = 0             # >0 → inside a skipped subtree
        self.mode = None          # current capturing block
        self.buf = []             # text buffer
        self.bullets = []         # current list items
        self.li_buf = []
        self.in_li = False
        # table state
        self.t_headers = None
        self.t_rows = None
        self.t_row = None
        self.cell_buf = None
        self.in_thead = False

    # helpers
    def _classes(self, attrs):
        d = dict(attrs)
        return set((d.get("class", "")).split())

    def _flush_text(self):
        txt = _html.unescape("".join(self.buf)).strip()
        txt = re.sub(r"\s+", " ", txt)
        self.buf = []
        return txt

    def handle_starttag(self, tag, attrs):
        cls = self._classes(attrs)
        # skip subtree?
        if self.skip:
            self.stack.append((tag, cls)); self.skip += 1; return
        if cls & SKIP_CLASSES:
            self.stack.append((tag, cls)); self.skip = 1; return
        self.stack.append((tag, cls))

        if tag in INLINE_BOLD:
            self.buf.append("**")
        elif tag in ("br",):
            self.buf.append(" ")
        elif tag == "table":
            self.t_headers, self.t_rows = [], []
        elif tag == "thead":
            self.in_thead = True
        elif tag == "tr":
            self.t_row = []
        elif tag in ("th", "td"):
            self.cell_buf = []
        elif tag in ("ul", "ol"):
            self.bullets = []
        elif tag == "li":
            self.in_li = True; self.li_buf = []
        elif tag in ("h1", "h2", "h3", "p"):
            self.buf = []

    def handle_data(self, data):
        if self.skip:
            return
        if self.cell_buf is not None:
            self.cell_buf.append(data)
        elif self.in_li:
            self.li_buf.append(data)
        else:
            self.buf.append(data)

    def handle_endtag(self, tag):
        if self.skip:
            # pop and decrement
            if self.stack: self.stack.pop()
            self.skip -= 1
            return
        cls = self.stack[-1][1] if self.stack else set()
        if tag in INLINE_BOLD:
            self.buf.append("**")
            if self.stack: self.stack.pop()
            return
        if tag in INLINE_EM:
            if self.stack: self.stack.pop()
            return

        if tag in ("th", "td"):
            cell = re.sub(r"\s+", " ", _html.unescape("".join(self.cell_buf or [])).strip())
            self.cell_buf = None
            if self.in_thead:
                self.t_headers.append(cell)
            else:
                self.t_row.append(cell)
        elif tag == "tr":
            if not self.in_thead and self.t_row:
                self.t_rows.append(self.t_row)
            self.t_row = None
        elif tag == "thead":
            self.in_thead = False
        elif tag == "table":
            if self.t_headers or self.t_rows:
                self.blocks.append(("table", self.t_headers, self.t_rows))
            self.t_headers = self.t_rows = None
        elif tag == "li":
            item = re.sub(r"\s+", " ", _html.unescape("".join(self.li_buf)).strip())
            if item:
                self.bullets.append(item)
            self.in_li = False; self.li_buf = []
        elif tag in ("ul", "ol"):
            if self.bullets:
                self.blocks.append(("bullets", list(self.bullets)))
            self.bullets = []
        elif tag in ("h1", "h2"):
            t = self._flush_text()
            if t: self.blocks.append(("h2", t))
        elif tag == "h3":
            t = self._flush_text()
            if t: self.blocks.append(("h3", t))
        elif tag == "p":
            t = self._flush_text()
            if t: self.blocks.append(("body", t))
        elif tag == "div":
            # class-driven divs that carry text
            t = self._flush_text()
            if t:
                if cls & {"section-h"}:
                    self.blocks.append(("h2", t))
                elif cls & {"criterion-h", "chapter-title", "sec-h"}:
                    self.blocks.append(("h3", t))
                elif cls & {"criterion-blurb"}:
                    self.blocks.append(("blurb", t))
                elif cls & {"criterion-meta", "cover-block-label", "note-box-h"}:
                    self.blocks.append(("kicker", t))
                elif cls & {"cover-block-body", "note-box-body", "callout"}:
                    self.blocks.append(("body", t))
                else:
                    self.blocks.append(("body", t))
        if self.stack:
            self.stack.pop()


def collect_blocks(html_path):
    html = open(html_path, encoding="utf-8").read()
    body = html.split("</head>", 1)[-1]
    c = Collector(); c.feed(body)
    return c.blocks


def render_blocks(doc, blocks, fp):
    """Render a block list into a doc via fp_docgen helpers."""
    for b in blocks:
        kind = b[0]
        if kind == "h2":
            fp.h2(doc, b[1])
        elif kind == "h3":
            fp.h3(doc, b[1])
        elif kind == "kicker":
            fp.kicker(doc, b[1])
        elif kind == "blurb":
            p = doc.add_paragraph(); p.paragraph_format.space_after = fp.Pt(6)
            p.paragraph_format.line_spacing = 1.3
            fp._add_run(p, b[1], font=fp.SERIF, size=12.5, color=fp.GRAY, italic=True)
        elif kind == "body":
            fp.body(doc, b[1])
        elif kind == "bullets":
            fp.bullets(doc, b[1])
        elif kind == "callout":
            fp.callout(doc, b[1], b[2], b[3] if len(b) > 3 else "gold")
        elif kind == "divider":
            fp.divider(doc)
        elif kind == "title":
            fp.h2(doc, b[1])
        elif kind == "table":
            headers, rows = b[1], b[2]
            if not headers and rows:
                headers = rows[0]; rows = rows[1:]
            ncol = max([len(headers)] + [len(r) for r in rows]) if rows else len(headers)
            headers = (headers + [""] * ncol)[:ncol]
            rows = [(r + [""] * ncol)[:ncol] for r in rows]
            fp.data_table(doc, headers, rows)

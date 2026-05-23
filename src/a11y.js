/**
 * FUTUREPROOF — Accessibility · UDL panel (v2)
 *
 * Replaces the legacy 5-icon floating bar with a single, clearly-labelled
 * "Accessibility · เข้าถึงง่าย" launcher → opens a structured panel grouped
 * under the three CAST UDL 3.0 principles:
 *
 *   ▸ Representation       — how the page presents information
 *   ▸ Action & Expression  — how the learner responds
 *   ▸ Engagement           — how the learner stays focused
 *
 * Every option is labelled bilingually (EN + TH), shows its current state
 * explicitly, and persists across pages via localStorage.
 *
 * New in v2 (vs. the legacy 5-icon bar):
 *   • Single discoverable launcher (no glyph-only ambiguity)
 *   • Bilingual labels for every control + the panel itself
 *   • Read SELECTED text (not just the whole page)
 *   • Reduce motion toggle (respects prefers-reduced-motion too)
 *   • Focus mode (dims navigation chrome)
 *   • Current-state summary footer ("Text: Large · Pace: On")
 *   • Reset-all button
 *   • ESC / backdrop-click dismiss
 *   • Hooks for v2.1: voice typing · keyboard shortcuts overlay
 *
 * Build discipline: all DOM is constructed via createElement +
 * textContent + appendChild — never innerHTML — to keep the surface
 * XSS-safe even though every label is an authored constant.
 */

const KEY = "fp_a11y_prefs_v1";

const DEFAULTS = {
  textScale: 0,        // 0 Normal · 1 Large · 2 X-large
  highContrast: false,
  dyslexia: false,
  pace: false,
  reduceMotion: false,
  focusMode: false,
};

const SCALE_LABELS = ["Normal", "Large", "X-large"];

/* ── Persistence ──────────────────────────────────────────────────── */

function readPrefs() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY)) || {};
    if (raw.textScale === undefined && raw.textLarge !== undefined) {
      raw.textScale = raw.textLarge ? 1 : 0;
      delete raw.textLarge;
    }
    return { ...DEFAULTS, ...raw };
  } catch { return { ...DEFAULTS }; }
}
function writePrefs(p) { localStorage.setItem(KEY, JSON.stringify(p)); }

function applyPrefs(p) {
  const s = Math.max(0, Math.min(2, p.textScale | 0));
  const b = document.body;
  b.classList.toggle("text-large",          s === 1);
  b.classList.toggle("text-xl",             s === 2);
  b.classList.toggle("theme-high-contrast", !!p.highContrast);
  b.classList.toggle("font-dyslexia",       !!p.dyslexia);
  b.classList.toggle("reduce-motion",       !!p.reduceMotion);
  b.classList.toggle("focus-mode",          !!p.focusMode);
  b.dataset.pace = p.pace ? "true" : "false";
}

/* ── Public exports (kept for back-compat with mission-engine etc.) ─ */

export function isPaceMode() {
  return readPrefs().pace === true;
}

export function speak(text, lang = "en") {
  if (!("speechSynthesis" in window)) return false;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === "th" ? "th-TH" : "en-US";
  u.rate = 0.95;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
  return true;
}

/* ── Selection TTS helper — reads whatever the user has highlighted ─ */

function readSelectionOrPage() {
  const sel = (window.getSelection && window.getSelection().toString().trim()) || "";
  if (sel) {
    speak(sel.slice(0, 4000));
    return "selection";
  }
  const main = document.getElementById("main") || document.querySelector("main") || document.body;
  speak((main.innerText || "").slice(0, 4000));
  return "page";
}

/* ── DOM helper — safe element factory (no innerHTML anywhere) ───── */

function el(tag, props, ...children) {
  const e = document.createElement(tag);
  if (props) {
    for (const [k, v] of Object.entries(props)) {
      if (v == null) continue;
      if (k === "class") e.className = v;
      else if (k === "text") e.textContent = v;
      else if (k === "html") { /* explicitly forbidden — use text or children */ }
      else if (k.startsWith("on") && typeof v === "function") {
        e.addEventListener(k.slice(2).toLowerCase(), v);
      }
      else if (k.startsWith("aria") || k.startsWith("data-") || k === "role" || k === "type" || k === "for") {
        e.setAttribute(k, v);
      }
      else e[k] = v;
    }
  }
  for (const c of children) {
    if (c == null || c === false) continue;
    if (typeof c === "string") e.appendChild(document.createTextNode(c));
    else if (Array.isArray(c)) c.forEach((x) => x && e.appendChild(typeof x === "string" ? document.createTextNode(x) : x));
    else e.appendChild(c);
  }
  return e;
}

/* ── Inject panel styles (textContent on <style> — safe) ───────────── */

function injectStyles() {
  if (document.getElementById("a11y-panel-style")) return;
  const s = document.createElement("style");
  s.id = "a11y-panel-style";
  s.textContent = `
    /* Launcher · single labelled button bottom-right */
    .a11y-launcher{
      position:fixed; right:18px; bottom:18px; z-index:9500;
      display:inline-flex; align-items:center; gap:8px;
      padding:10px 16px; border-radius:999px; border:1px solid rgba(232,199,122,.35);
      background:rgba(7,23,52,.94); color:#F4F1EA;
      font-family:var(--font-mono,"JetBrains Mono",monospace);
      font-size:11px; letter-spacing:.10em; text-transform:uppercase;
      cursor:pointer; box-shadow:0 8px 28px rgba(0,0,0,.32);
      backdrop-filter:blur(8px);
      transition: transform .2s ease-out, box-shadow .2s ease-out;
    }
    .a11y-launcher:hover{ transform:translateY(-2px); box-shadow:0 12px 36px rgba(0,0,0,.42); }
    .a11y-launcher:focus-visible{ outline:3px solid #E8C77A; outline-offset:3px; }
    .a11y-launcher .glyph{ font-size:16px; line-height:1; }
    .a11y-launcher .th{ opacity:.75; font-size:10px; margin-left:4px; }

    .a11y-backdrop{ position:fixed; inset:0; z-index:9499; background:rgba(7,23,52,.55); backdrop-filter:blur(4px); display:none; }
    .a11y-backdrop.open{ display:block; }

    .a11y-panel{
      position:fixed; right:18px; bottom:74px; z-index:9501;
      width:min(420px, calc(100vw - 36px));
      max-height:min(80vh, 640px); overflow-y:auto;
      background:#FFFFFF; color:#1A1F2E;
      border-radius:18px; box-shadow:0 24px 64px rgba(0,0,0,.32);
      border:1px solid rgba(7,23,52,.08);
      display:none;
      font-family:var(--font-sans,"DM Sans",sans-serif);
    }
    .a11y-panel.open{ display:block; }
    .a11y-panel header{
      position:sticky; top:0; background:#F4F1EA; padding:16px 20px;
      border-bottom:1px solid rgba(7,23,52,.10);
      display:flex; align-items:center; justify-content:space-between; gap:12px;
    }
    .a11y-panel h2{ margin:0; font-size:15px; font-weight:700; letter-spacing:.04em; text-transform:uppercase; color:#1A1F2E; }
    .a11y-panel header .th{ font-size:13px; color:#5D3A9B; font-family:'IBM Plex Sans Thai',sans-serif; }
    .a11y-panel .close{
      width:34px; height:34px; border-radius:999px; border:none; cursor:pointer;
      background:rgba(7,23,52,.06); color:#1A1F2E;
      display:flex; align-items:center; justify-content:center; font-size:18px;
      transition:background .15s ease-out;
    }
    .a11y-panel .close:hover{ background:rgba(7,23,52,.12); }

    .a11y-panel section{ padding:14px 20px 12px; border-bottom:1px solid rgba(7,23,52,.06); }
    .a11y-panel section:last-of-type{ border-bottom:none; }
    .a11y-panel h3{ margin:0 0 8px; font-size:10px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:#8A6D3F; }
    .a11y-panel h3 .th{ font-family:'IBM Plex Sans Thai',sans-serif; opacity:.85; letter-spacing:.04em; }

    .a11y-row{ display:grid; grid-template-columns: 1fr auto; align-items:center; gap:10px; padding:8px 0; }
    .a11y-row .label{ font-size:13.5px; line-height:1.35; }
    .a11y-row .label .th{ display:block; font-size:11.5px; color:#5D3A9B; font-family:'IBM Plex Sans Thai',sans-serif; margin-top:1px; }
    .a11y-row .controls{ display:flex; gap:6px; flex-wrap:wrap; }
    .a11y-row button{
      font-family:var(--font-mono,monospace); font-size:11px; font-weight:600;
      padding:6px 10px; border-radius:8px; border:1px solid rgba(7,23,52,.18);
      background:#FFFFFF; color:#1A1F2E; cursor:pointer; letter-spacing:.04em;
      transition:background .12s ease-out, border-color .12s ease-out, color .12s ease-out;
    }
    .a11y-row button:hover{ border-color:#5D3A9B; }
    .a11y-row button[aria-pressed="true"]{ background:#5D3A9B; color:#F4F1EA; border-color:#5D3A9B; }
    .a11y-row button.tts{ background:#B58A3F; color:#F4F1EA; border-color:#B58A3F; }
    .a11y-row button.tts:hover{ background:#8A6D3F; border-color:#8A6D3F; }

    .a11y-panel .summary{
      padding:14px 20px; background:#F4F1EA;
      font-family:var(--font-mono,monospace); font-size:11px;
      letter-spacing:.04em; color:#1A1F2E;
      display:flex; align-items:center; justify-content:space-between; gap:10px;
    }
    .a11y-panel .summary .state{ flex:1; line-height:1.6; }
    .a11y-panel .summary .reset{
      font-size:10.5px; letter-spacing:.10em; text-transform:uppercase;
      padding:6px 10px; border-radius:6px; border:1px solid rgba(7,23,52,.20);
      background:transparent; color:#1A1F2E; cursor:pointer;
    }
    .a11y-panel .summary .reset:hover{ background:rgba(7,23,52,.06); }

    .a11y-pace-banner{
      display:none; padding:8px 16px; text-align:center;
      background:rgba(184,138,63,.10); color:#8A6D3F;
      font-family:var(--font-mono,monospace); font-size:11px;
      letter-spacing:.10em; text-transform:uppercase;
      border-bottom:1px solid rgba(184,138,63,.18);
    }
    body[data-pace="true"] .a11y-pace-banner{ display:block; }

    body.focus-mode header, body.focus-mode .shell-header,
    body.focus-mode .left-rail, body.focus-mode .right-pane,
    body.focus-mode footer { opacity:0.35; transition:opacity .25s ease-out; }
    body.focus-mode header:hover, body.focus-mode .shell-header:hover,
    body.focus-mode .left-rail:hover, body.focus-mode .right-pane:hover,
    body.focus-mode footer:hover { opacity:1; }

    body.reduce-motion *,
    body.reduce-motion *::before,
    body.reduce-motion *::after{
      animation-duration:0.001ms !important;
      animation-iteration-count:1 !important;
      transition-duration:0.001ms !important;
      scroll-behavior:auto !important;
    }

    @media (max-width: 600px){
      .a11y-launcher{ right:12px; bottom:12px; }
      .a11y-panel{ right:8px; left:8px; bottom:64px; width:auto; max-height:78vh; border-radius:14px; }
    }
  `;
  document.head.appendChild(s);
}

/* ── Row builder helpers ───────────────────────────────────────────── */

function labelCell(en, th) {
  return el("div", { class: "label" },
    document.createTextNode(en),
    el("span", { class: "th", text: th })
  );
}

function toggleBtn(prefKey, labelEn) {
  return el("button", { type: "button", "data-toggle": prefKey, "aria-pressed": "false", text: labelEn });
}

function scaleBtn(val, label) {
  return el("button", { type: "button", "data-val": String(val), text: label });
}

function ttsBtn(scope, label) {
  return el("button", { type: "button", class: "tts", "data-tts": scope, text: label });
}

function disabledBtn(label, hint) {
  return el("button", { type: "button", disabled: "true", title: hint || "", style: "opacity:.55; cursor:default", text: label });
}

function row(labelEl, ...controls) {
  return el("div", { class: "a11y-row" },
    labelEl,
    el("div", { class: "controls" }, ...controls),
  );
}

function rowGrouped(labelEl, groupName, ...buttons) {
  return el("div", { class: "a11y-row" },
    labelEl,
    el("div", { class: "controls", "data-group": groupName }, ...buttons),
  );
}

function sectionH3(en, th) {
  return el("h3", null,
    document.createTextNode(en + " · "),
    el("span", { class: "th", text: th })
  );
}

/* ── Build the panel DOM (no innerHTML anywhere) ──────────────────── */

function buildPanel() {
  const header = el("header", null,
    el("div", null,
      el("h2", { id: "a11y-panel-title", text: "♿ Accessibility" }),
      el("span", { class: "th", text: "เข้าถึงง่าย — ตั้งค่าตามที่คุณสะดวก" }),
    ),
    el("button", { type: "button", class: "close", "aria-label": "Close accessibility panel", text: "✕" }),
  );

  const sectionRepresentation = el("section", null,
    sectionH3("Representation", "รูปแบบการนำเสนอ"),
    rowGrouped(labelCell("Text size", "ขนาดตัวอักษร"), "textScale",
      scaleBtn(0, "Normal"), scaleBtn(1, "Large"), scaleBtn(2, "X-large"),
    ),
    row(labelCell("Display contrast", "โหมดคอนทราสต์สูง"), toggleBtn("highContrast", "High contrast")),
    row(labelCell("Reading font", "ฟอนต์อ่านง่าย (Dyslexia)"), toggleBtn("dyslexia", "Dyslexia-friendly")),
    row(labelCell("Read aloud", "อ่านออกเสียงให้ฟัง"),
      ttsBtn("selection", "🔊 Selected text"),
      ttsBtn("page", "🔊 This page"),
    ),
    row(labelCell("Reduce motion", "ลดความเคลื่อนไหว"), toggleBtn("reduceMotion", "Reduce motion")),
  );

  const sectionAction = el("section", null,
    sectionH3("Action & Expression", "การมีปฏิสัมพันธ์"),
    row(labelCell("Pace mode", "โหมดไม่กดดันด้านเวลา"), toggleBtn("pace", "No time pressure")),
    row(labelCell("Captions on stakeholder videos", "คำบรรยายในวิดีโอผู้มีส่วนได้ส่วนเสีย"),
      disabledBtn("Always on ✓", "WebVTT captions are wired on every stakeholder MP4 and cannot be disabled")),
  );

  const sectionEngagement = el("section", null,
    sectionH3("Engagement", "การมีส่วนร่วม"),
    row(labelCell("Focus mode", "โหมดสมาธิ (จางเมนูรอบข้าง)"), toggleBtn("focusMode", "Dim chrome")),
    row(labelCell("Language", "ภาษา"),
      disabledBtn("EN · ภาษาไทย labels", "Site is EN primary with Thai labels everywhere; full Thai locale toggle is roadmapped"),
    ),
  );

  const summary = el("div", { class: "summary" },
    el("div", { class: "state", id: "a11y-state-line" }),
    el("button", { type: "button", class: "reset", id: "a11y-reset", text: "Reset" }),
  );

  const panel = el("aside", {
    id: "a11y-panel",
    class: "a11y-panel",
    role: "dialog",
    "aria-modal": "false",  /* non-modal: learner can refer to page content while toggling */
    "aria-labelledby": "a11y-panel-title",
  },
    header, sectionRepresentation, sectionAction, sectionEngagement, summary,
  );

  return panel;
}

/* ── Attach ────────────────────────────────────────────────────────── */

export function attach() {
  /* The visible Accessibility launcher + panel + backdrop are now disabled
   * per user request. We still:
   *   1. Keep the WCAG "Skip to content" link (invisible until focused)
   *   2. Apply any prefs the user previously toggled (high-contrast,
   *      dyslexia font, pace-mode timer-removal, reduce-motion, focus-mode)
   *   3. Show the pace-mode banner when pace mode is on
   * — so the underlying a11y BEHAVIOUR survives even though the launcher
   * UI is gone. If you ever want the launcher back, simply restore the
   * builder calls below. */

  if (document.getElementById("a11y-pace-banner-marker")) return;
  injectStyles();

  // Skip link (proven a11y primitive — kept)
  if (!document.querySelector(".skip-link")) {
    const skip = el("a", { href: "#main", class: "skip-link", text: "Skip to content" });
    document.body.prepend(skip);
  }

  // Pace-mode banner — only shows when pace pref is true (CSS-controlled)
  const banner = el("div", {
    class: "a11y-pace-banner",
    id: "a11y-pace-banner-marker",
    role: "status",
    text: "⏸ Pace mode is on · โหมดไม่กดดันด้านเวลา · ไม่มีตัวจับเวลา",
  });
  document.body.appendChild(banner);

  // Apply any stored prefs (text size, contrast, dyslexia font, pace,
  // reduce motion, focus mode) — invisible affordances still work.
  const prefs = readPrefs();
  applyPrefs(prefs);

  /* === Visible launcher / panel UI INTENTIONALLY OMITTED === */
  return;

  // ── (legacy launcher + panel code below is unreachable; kept as a
  //     reference in case the UI needs to be restored) ──
  /* eslint-disable */
  const launcher = el("button", { id: "a11y-launcher", type: "button", class: "a11y-launcher", "aria-label": "Open accessibility settings", "aria-haspopup": "dialog", "aria-expanded": "false" },
    el("span", { class: "glyph", "aria-hidden": "true", text: "♿" }),
    document.createTextNode(" Accessibility "),
    el("span", { class: "th", "aria-hidden": "true", text: "· เข้าถึงง่าย" }),
  );
  document.body.appendChild(launcher);
  const backdrop = el("div", { class: "a11y-backdrop" });
  document.body.appendChild(backdrop);
  const panel = buildPanel();
  document.body.appendChild(panel);
  reflectAll();

  function openPanel() {
    panel.classList.add("open");
    backdrop.classList.add("open");
    launcher.setAttribute("aria-expanded", "true");
    panel.querySelector(".close")?.focus();
  }
  function closePanel() {
    panel.classList.remove("open");
    backdrop.classList.remove("open");
    launcher.setAttribute("aria-expanded", "false");
    launcher.focus();
  }

  launcher.addEventListener("click", () => panel.classList.contains("open") ? closePanel() : openPanel());
  backdrop.addEventListener("click", closePanel);
  panel.addEventListener("click", (e) => {
    const t = e.target.closest("button");
    if (!t) return;

    if (t.classList.contains("close")) { closePanel(); return; }

    if (t.id === "a11y-reset") {
      Object.assign(prefs, DEFAULTS);
      writePrefs(prefs); applyPrefs(prefs); reflectAll();
      return;
    }

    if (t.dataset.tts === "selection") { readSelectionOrPage(); return; }
    if (t.dataset.tts === "page") {
      const main = document.getElementById("main") || document.querySelector("main") || document.body;
      speak((main.innerText || "").slice(0, 4000));
      return;
    }

    const group = t.parentElement?.dataset?.group;
    if (group === "textScale") {
      prefs.textScale = Math.max(0, Math.min(2, parseInt(t.dataset.val || "0", 10)));
      writePrefs(prefs); applyPrefs(prefs); reflectAll();
      return;
    }

    if (t.dataset.toggle) {
      prefs[t.dataset.toggle] = !prefs[t.dataset.toggle];
      writePrefs(prefs); applyPrefs(prefs); reflectAll();
      return;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel.classList.contains("open")) closePanel();
  });

  /* Mirror the active-state of every control + render the summary line. */
  function reflectAll() {
    panel.querySelectorAll('[data-group="textScale"] button').forEach((b) => {
      const v = parseInt(b.dataset.val, 10);
      b.setAttribute("aria-pressed", v === (prefs.textScale | 0) ? "true" : "false");
    });
    panel.querySelectorAll("button[data-toggle]").forEach((b) => {
      b.setAttribute("aria-pressed", prefs[b.dataset.toggle] ? "true" : "false");
    });
    const parts = [
      "Text: " + SCALE_LABELS[prefs.textScale | 0],
      prefs.highContrast ? "Contrast: High" : null,
      prefs.dyslexia     ? "Font: Dyslexia"  : null,
      prefs.reduceMotion ? "Motion: Reduced" : null,
      prefs.pace         ? "Pace: On"        : null,
      prefs.focusMode    ? "Focus: On"       : null,
    ].filter(Boolean);
    const line = document.getElementById("a11y-state-line");
    if (line) line.textContent = parts.join(" · ") || "All settings at default";
  }
}

/* ── Auto-attach ──────────────────────────────────────────────────── */

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attach);
  } else {
    attach();
  }
}

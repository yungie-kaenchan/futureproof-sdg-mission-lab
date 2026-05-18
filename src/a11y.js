/**
 * FUTUREPROOF — Accessibility helpers
 *
 * Shared a11y toolkit attached on every page. Provides:
 *   • a small floating toolbar (text size, high-contrast, dyslexia font, pace mode)
 *   • a "Skip to content" link
 *   • TTS for selected text via Web Speech API
 *
 * Preferences persist in localStorage so they follow the user across pages.
 */

const KEY = "fp_a11y_prefs_v1";

// textScale: 0 = Normal, 1 = Large, 2 = Extra-large (the "A+" 3-level control)
const DEFAULTS = {
  textScale: 0,
  highContrast: false,
  dyslexia: false,
  pace: false, // Cognitive Pace Mode — lengthens timers / removes timed pressure
};

const SCALE_LABELS = ["A", "A+", "A++"];
const SCALE_TITLES = [
  "Text size: Normal — click to enlarge",
  "Text size: Large — click to enlarge further",
  "Text size: Extra-large — click to reset to Normal",
];

function readPrefs() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY)) || {};
    // Migrate the old binary `textLarge` pref to the new 3-level scale.
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
  document.body.classList.toggle("text-large", s === 1);
  document.body.classList.toggle("text-xl",    s === 2);
  document.body.classList.toggle("theme-high-contrast", !!p.highContrast);
  document.body.classList.toggle("font-dyslexia",   !!p.dyslexia);
  document.body.dataset.pace = p.pace ? "true" : "false";
}

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

export function attach() {
  if (document.getElementById("a11y-toolbar")) return;

  // Skip link
  const skip = document.createElement("a");
  skip.href = "#main";
  skip.className = "skip-link";
  skip.textContent = "Skip to content";
  document.body.prepend(skip);

  // Floating toolbar
  const bar = document.createElement("div");
  bar.id = "a11y-toolbar";
  bar.setAttribute("role", "region");
  bar.setAttribute("aria-label", "Accessibility settings");
  bar.innerHTML = `
    <button type="button" data-scale title="Text size: Normal — click to enlarge" aria-label="Text size — cycles Normal, Large, Extra-large">A+</button>
    <button type="button" data-pref="highContrast"  title="Toggle high contrast"    aria-label="Toggle high contrast">◐</button>
    <button type="button" data-pref="dyslexia"      title="Dyslexia-friendly font"  aria-label="Dyslexia-friendly font">Dx</button>
    <button type="button" data-pref="pace"          title="Cognitive Pace Mode (no timers)" aria-label="Cognitive Pace Mode">⏸</button>
    <button type="button" data-tts="page"           title="Read this page aloud"    aria-label="Read this page aloud">🔊</button>
  `;
  document.body.appendChild(bar);

  const prefs = readPrefs();
  applyPrefs(prefs);
  reflectActive();

  bar.addEventListener("click", (e) => {
    const t = e.target.closest("button");
    if (!t) return;
    if (t.hasAttribute("data-scale")) {
      prefs.textScale = ((prefs.textScale | 0) + 1) % 3; // 0 → 1 → 2 → 0
      writePrefs(prefs);
      applyPrefs(prefs);
      reflectActive();
    } else if (t.dataset.pref) {
      prefs[t.dataset.pref] = !prefs[t.dataset.pref];
      writePrefs(prefs);
      applyPrefs(prefs);
      reflectActive();
    } else if (t.dataset.tts === "page") {
      const main = document.getElementById("main") || document.querySelector("main") || document.body;
      const text = main.innerText.slice(0, 4000);
      speak(text);
    }
  });

  function reflectActive() {
    bar.querySelectorAll("button[data-pref]").forEach((b) => {
      b.classList.toggle("active", !!prefs[b.dataset.pref]);
    });
    const scaleBtn = bar.querySelector("button[data-scale]");
    if (scaleBtn) {
      const s = Math.max(0, Math.min(2, prefs.textScale | 0));
      scaleBtn.textContent = SCALE_LABELS[s];
      scaleBtn.title = SCALE_TITLES[s];
      scaleBtn.classList.toggle("active", s > 0);
    }
  }
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attach);
  } else {
    attach();
  }
}

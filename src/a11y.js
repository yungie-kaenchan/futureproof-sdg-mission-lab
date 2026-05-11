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

const DEFAULTS = {
  textLarge: false,
  highContrast: false,
  dyslexia: false,
  pace: false, // Cognitive Pace Mode — lengthens timers / removes timed pressure
};

function readPrefs() {
  try { return { ...DEFAULTS, ...(JSON.parse(localStorage.getItem(KEY)) || {}) }; }
  catch { return { ...DEFAULTS }; }
}
function writePrefs(p) { localStorage.setItem(KEY, JSON.stringify(p)); }

function applyPrefs(p) {
  document.body.classList.toggle("text-large",      !!p.textLarge);
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
    <button type="button" data-pref="textLarge"     title="Toggle larger text"      aria-label="Toggle larger text">A+</button>
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
    if (t.dataset.pref) {
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
  }
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attach);
  } else {
    attach();
  }
}

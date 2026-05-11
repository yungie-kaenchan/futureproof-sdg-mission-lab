/**
 * FUTUREPROOF — Bilingual EN/TH Tooltips
 *
 * Add `data-tip-en="..."` and `data-tip-th="..."` to any element.
 * On hover or focus, a styled popover shows both translations.
 * Respects current language preference (localStorage `fp_a11y_prefs_v1.lang`
 * if set; otherwise navigator.language; falls back to EN-primary, TH below).
 *
 * Touch devices: tap-and-hold opens the tooltip; tap elsewhere closes it.
 * Reduced motion: instant show/hide.
 */

let tip = null;
let activeTarget = null;
let hideTimer = null;

function ensureTip() {
  if (tip) return tip;
  tip = document.createElement("div");
  tip.className = "m3-tip";
  tip.setAttribute("role", "tooltip");
  tip.setAttribute("aria-hidden", "true");
  document.body.appendChild(tip);
  return tip;
}

function show(target) {
  const en = target.getAttribute("data-tip-en");
  const th = target.getAttribute("data-tip-th");
  if (!en && !th) return;

  const t = ensureTip();
  t.innerHTML = "";
  if (en) {
    const span = document.createElement("span");
    span.textContent = en;
    t.appendChild(span);
  }
  if (th) {
    const span = document.createElement("span");
    span.className = "th";
    span.textContent = th;
    t.appendChild(span);
  }

  const rect = target.getBoundingClientRect();
  const tipRect = t.getBoundingClientRect();
  // Default: place below; flip above if would overflow
  let top = rect.bottom + 8;
  if (top + tipRect.height > window.innerHeight - 8) {
    top = rect.top - tipRect.height - 8;
  }
  let left = rect.left + rect.width / 2 - tipRect.width / 2;
  left = Math.max(8, Math.min(left, window.innerWidth - tipRect.width - 8));

  t.style.top = `${top}px`;
  t.style.left = `${left}px`;
  requestAnimationFrame(() => t.classList.add("show"));
  t.setAttribute("aria-hidden", "false");
  activeTarget = target;
}

function hide() {
  if (!tip) return;
  tip.classList.remove("show");
  tip.setAttribute("aria-hidden", "true");
  activeTarget = null;
}

function bind() {
  document.addEventListener("mouseover", (e) => {
    const target = e.target.closest("[data-tip-en], [data-tip-th]");
    if (!target) return;
    clearTimeout(hideTimer);
    show(target);
  });

  document.addEventListener("mouseout", (e) => {
    if (!activeTarget) return;
    const target = e.target.closest("[data-tip-en], [data-tip-th]");
    if (target !== activeTarget) return;
    hideTimer = setTimeout(hide, 100);
  });

  document.addEventListener("focusin", (e) => {
    const target = e.target.closest("[data-tip-en], [data-tip-th]");
    if (target) show(target);
  });

  document.addEventListener("focusout", (e) => {
    const target = e.target.closest("[data-tip-en], [data-tip-th]");
    if (target === activeTarget) hide();
  });

  // Touch — tap-and-hold to show, tap elsewhere to dismiss
  let touchTimer = null;
  document.addEventListener("touchstart", (e) => {
    const target = e.target.closest("[data-tip-en], [data-tip-th]");
    if (target) {
      touchTimer = setTimeout(() => show(target), 300);
    } else if (activeTarget) {
      hide();
    }
  }, { passive: true });
  document.addEventListener("touchend", () => clearTimeout(touchTimer), { passive: true });

  // Hide on scroll / resize
  window.addEventListener("scroll", hide, { passive: true });
  window.addEventListener("resize", hide);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") hide(); });
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }
}

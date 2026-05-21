/**
 * FUTUREPROOF · Universal Back-link injector
 *
 * Loaded on every user-facing page. Auto-injects a small floating
 * "← Back" / "← Home" pill at the top-left so no page is ever a
 * dead end — even if the page author forgot to add one.
 *
 * Behaviour:
 *   • If the same-origin referrer exists ("they came from somewhere
 *     inside the portal"), the pill says "← Back" and calls
 *     history.back() so they return to that page.
 *   • Otherwise it says "← Home" and goes to /home.html.
 *   • SKIPS injection on:
 *       - the landing (/) and home (/home.html) pages, where Back
 *         has no meaningful target;
 *       - any page whose top 600px already contains a link/button
 *         labelled Back / Home / Journey, OR a link whose href
 *         points at home.html / index.html / mission-select.html
 *         (so we don't duplicate existing nav-away affordances).
 *
 * Idempotent: re-loads are safe (looks for [data-fp-back] marker).
 */

(function () {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  // Run after the DOM is parsed so we can read the existing top nav.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject, { once: true });
  } else {
    inject();
  }

  function inject() {
    try {
      if (document.querySelector("[data-fp-back]")) return;       // idempotent

      // Skip on landing / home pages — Back has no target there.
      const path = (location.pathname || "").toLowerCase();
      if (path === "/" || /\/(index|home)\.html$/.test(path)) return;

      // Skip if any existing top-area element already provides Back/Home/Journey
      // (avoids duplicating bespoke nav on pages that already handle it well).
      if (alreadyHasBackAffordance()) return;

      const sameOriginRef = isSameOriginReferrer();
      const a = document.createElement("a");
      a.setAttribute("data-fp-back", "");
      a.href = sameOriginRef ? "javascript:void(0)" : homeHref();
      a.textContent = sameOriginRef ? "← Back" : "← Home";
      a.setAttribute("aria-label",
        sameOriginRef ? "Go back to the previous page" : "Go to the home page");
      a.style.cssText = [
        "position:fixed",
        "left:14px",
        "top:14px",
        "z-index:200",
        "display:inline-flex",
        "align-items:center",
        "gap:7px",
        "padding:8px 16px",
        "border-radius:999px",
        "background:rgba(10,10,11,.86)",
        "color:#F4F1EA",
        "font-family:'DM Sans',system-ui,sans-serif",
        "font-size:13px",
        "font-weight:700",
        "letter-spacing:.02em",
        "text-decoration:none",
        "box-shadow:0 6px 18px rgba(0,0,0,.20)",
        "backdrop-filter:blur(8px)",
        "transition:transform .18s,background .18s",
        "cursor:pointer",
      ].join(";");
      a.addEventListener("mouseenter", () => {
        a.style.background = "rgba(10,10,11,.95)";
        a.style.transform = "translateY(-1px)";
      });
      a.addEventListener("mouseleave", () => {
        a.style.background = "rgba(10,10,11,.86)";
        a.style.transform = "";
      });
      if (sameOriginRef) {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          // Prefer history.back() so we land exactly where they were.
          // If for some reason history is empty (rare), fall back to home.
          if (history.length > 1) history.back();
          else location.href = homeHref();
        });
      }
      document.body.appendChild(a);
    } catch (_) {
      /* Never let a UX-helper script throw — fail silently. */
    }
  }

  function isSameOriginReferrer() {
    try {
      if (!document.referrer) return false;
      const u = new URL(document.referrer);
      return u.origin === location.origin && u.href !== location.href;
    } catch (_) { return false; }
  }

  function homeHref() {
    // Most user pages live in /pages/, so ../home.html. From other depths
    // the absolute /home.html resolves too.
    return "/home.html";
  }

  function alreadyHasBackAffordance() {
    const all = document.body
      ? Array.from(document.body.querySelectorAll("a, button"))
      : [];
    // Only consider elements visually near the top of the viewport — most
    // bespoke nav lives in a header within the first 200px.
    for (const el of all) {
      const r = el.getBoundingClientRect ? el.getBoundingClientRect() : null;
      const inTopArea = !r || (r.top >= -10 && r.top <= 200);
      if (!inTopArea) continue;
      const txt = (el.textContent || "").trim().toLowerCase();
      if (/^(?:←\s*)?back\b/.test(txt)) return true;
      if (/^(?:←\s*)?home\b/.test(txt)) return true;
      if (/journey map|journey$/.test(txt)) return true;
      const href = (el.getAttribute && el.getAttribute("href")) || "";
      if (/home\.html|index\.html|mission-select\.html/.test(href.toLowerCase())) return true;
    }
    return false;
  }
})();

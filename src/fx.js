/**
 * FUTUREPROOF — micro-interaction engine (vanilla, zero dependencies).
 *
 * Opt-in per element via data-attributes; the engine wires everything on load.
 * Every effect honours prefers-reduced-motion (then it either no-ops or snaps
 * instantly to the final state, never animating).
 *
 *   data-fx-reveal              fade/rise in on scroll
 *   data-fx-count="17"          count up to N on scroll (data-fx-suffix optional)
 *   data-fx-words               reveal text word-by-word on scroll
 *   data-fx-draw                "draw" an inline <svg> stroke on scroll
 *   data-fx-tilt="8"            3D pointer-tilt (degrees) on hover
 *   data-fx-parallax="0.2"      translateY by scrollY * factor
 *   data-fx-motes="26"          ambient drifting gold particles inside the element
 *   (page-transition fade is automatic for internal links)
 *
 *   window.fxCelebrate(el)      gold burst at an element (e.g. a Keystone earned)
 *
 * No innerHTML anywhere — all DOM via createElement (project security rule).
 */
(function () {
  "use strict";
  const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  injectCSS();

  /* ── scroll-triggered: reveal / count / words / draw ── */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const t = e.target;
          t.classList.add("fx-in");
          if (t.hasAttribute("data-fx-count")) runCount(t);
          if (t.hasAttribute("data-fx-draw")) t.classList.add("fx-draw-go");
          if (t.hasAttribute("data-fx-words")) revealWords(t);
          io.unobserve(t);
        });
      }, { threshold: 0.25, rootMargin: "0px 0px -8% 0px" })
    : null;

  const scrollEls = document.querySelectorAll(
    "[data-fx-reveal],[data-fx-count],[data-fx-words],[data-fx-draw]"
  );
  // pre-split words so layout is stable before reveal
  document.querySelectorAll("[data-fx-words]").forEach((el) => { if (!REDUCE) splitWords(el); });

  scrollEls.forEach((el) => {
    if (REDUCE || !io) {
      el.classList.add("fx-in", "fx-draw-go", "fx-words-go");
      if (el.hasAttribute("data-fx-count"))
        el.textContent = el.getAttribute("data-fx-count") + (el.getAttribute("data-fx-suffix") || "");
      return;
    }
    io.observe(el);
  });

  function runCount(el) {
    const to = parseFloat(el.getAttribute("data-fx-count")) || 0;
    const suffix = el.getAttribute("data-fx-suffix") || "";
    const dur = 1000, t0 = performance.now();
    (function tick(now) {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  function splitWords(el) {
    if (el.dataset.fxSplit) return;
    const text = el.textContent;
    el.textContent = "";
    el.dataset.fxSplit = "1";
    text.split(/(\s+)/).forEach((tok) => {
      if (tok.trim() === "") { el.appendChild(document.createTextNode(tok)); return; }
      const s = document.createElement("span");
      s.className = "fx-word";
      s.textContent = tok;
      el.appendChild(s);
    });
  }
  function revealWords(el) {
    splitWords(el);
    el.querySelectorAll(".fx-word").forEach((w, i) => { w.style.transitionDelay = i * 55 + "ms"; });
    requestAnimationFrame(() => el.classList.add("fx-words-go"));
  }

  /* ── pointer-tilt ── */
  if (!REDUCE) document.querySelectorAll("[data-fx-tilt]").forEach((el) => {
    const max = parseFloat(el.getAttribute("data-fx-tilt")) || 8;
    el.style.transition = "transform .18s ease-out";
    el.addEventListener("pointermove", (ev) => {
      if (ev.pointerType === "touch") return;
      const r = el.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width - 0.5;
      const py = (ev.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(820px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateZ(0)`;
    });
    el.addEventListener("pointerleave", () => { el.style.transform = ""; });
  });

  /* ── parallax ── */
  if (!REDUCE) {
    const layers = [...document.querySelectorAll("[data-fx-parallax]")];
    if (layers.length) {
      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const y = window.scrollY;
          layers.forEach((l) => {
            const s = parseFloat(l.getAttribute("data-fx-parallax")) || 0.2;
            l.style.transform = `translate3d(0, ${y * s}px, 0)`;
          });
          ticking = false;
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  }

  /* ── flip-in entrance (e.g. a certificate) — clears transform when done
        so it never interferes with html2canvas/PDF export ── */
  if (!REDUCE) document.querySelectorAll("[data-fx-flip]").forEach((el) => {
    el.addEventListener("animationend", function clear() {
      el.style.transform = ""; el.classList.remove("fx-flip-go");
      el.removeEventListener("animationend", clear);
    });
    requestAnimationFrame(() => el.classList.add("fx-flip-go"));
  });

  /* ── ambient gold motes ── */
  if (!REDUCE) document.querySelectorAll("[data-fx-motes]").forEach((host) => {
    startMotes(host, parseInt(host.getAttribute("data-fx-motes"), 10) || 26);
  });
  function startMotes(host, n) {
    const cv = document.createElement("canvas");
    cv.className = "fx-motes";
    cv.setAttribute("aria-hidden", "true");
    host.appendChild(cv);
    const ctx = cv.getContext("2d");
    let w, h, dots = [];
    const seedT = performance.now();
    function rnd(i, k) { return (Math.sin((i + 1) * 12.9898 + k * 78.233 + seedT * 0.0001) * 43758.5453) % 1; }
    function size() {
      const r = host.getBoundingClientRect();
      w = cv.width = Math.max(1, r.width); h = cv.height = Math.max(1, r.height);
      dots = Array.from({ length: n }, (_, i) => ({
        x: Math.abs(rnd(i, 1)) * w, y: Math.abs(rnd(i, 2)) * h,
        r: 0.6 + Math.abs(rnd(i, 3)) * 1.8,
        v: 0.06 + Math.abs(rnd(i, 4)) * 0.18,
        a: 0.15 + Math.abs(rnd(i, 5)) * 0.45,
        ph: Math.abs(rnd(i, 6)) * 6.28,
      }));
    }
    size();
    if (window.ResizeObserver) { new ResizeObserver(size).observe(host); }
    let raf;
    function loop(t) {
      ctx.clearRect(0, 0, w, h);
      dots.forEach((d) => {
        d.y -= d.v; if (d.y < -4) { d.y = h + 4; d.x = Math.random() * w; }
        const tw = 0.6 + 0.4 * Math.sin(t * 0.001 + d.ph);
        ctx.beginPath();
        ctx.fillStyle = `rgba(232,199,122,${d.a * tw})`;
        ctx.arc(d.x, d.y, d.r, 0, 6.2832);
        ctx.fill();
      });
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    // pause when the tab is hidden, resume when visible
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(loop);
    });
  }

  /* ── page-transition fade (exit only, safe) ── */
  if (!REDUCE) setupPageFade();
  function setupPageFade() {
    const veil = document.createElement("div");
    veil.className = "fx-veil";
    veil.setAttribute("aria-hidden", "true");
    document.addEventListener("DOMContentLoaded", () => document.body.appendChild(veil));
    if (document.body) document.body.appendChild(veil);
    document.addEventListener("click", (e) => {
      const a = e.target.closest && e.target.closest("a[href]");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || a.target === "_blank" || a.hasAttribute("download")) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      let url; try { url = new URL(href, location.href); } catch { return; }
      if (url.origin !== location.origin) return;          // external → let it go
      if (url.pathname === location.pathname && url.hash) return; // same-page anchor
      e.preventDefault();
      veil.classList.add("on");
      setTimeout(() => { location.href = url.href; }, 280);
    });
    // safety: if navigation is cancelled (bfcache restore), clear the veil
    window.addEventListener("pageshow", () => veil.classList.remove("on"));
  }

  /* ── Keystone-earn celebration (global) ── */
  window.fxCelebrate = function (target) {
    const r = (target && target.getBoundingClientRect)
      ? target.getBoundingClientRect()
      : { left: innerWidth / 2, top: innerHeight / 2, width: 0, height: 0 };
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    if (REDUCE) { if (target) { target.classList.add("fx-pulse"); setTimeout(() => target.classList.remove("fx-pulse"), 600); } return; }

    const ring = document.createElement("div");
    ring.className = "fx-ring";
    ring.style.left = cx + "px"; ring.style.top = cy + "px";
    document.body.appendChild(ring);
    setTimeout(() => ring.remove(), 900);

    const N = 26, colors = ["#E8C77A", "#C9A961", "#B58A3F", "#FFFFFF"];
    for (let i = 0; i < N; i++) {
      const s = document.createElement("div");
      s.className = "fx-spark";
      const ang = (i / N) * 6.2832 + Math.random() * 0.4;
      const dist = 60 + Math.random() * 120;
      s.style.left = cx + "px"; s.style.top = cy + "px";
      s.style.background = colors[i % colors.length];
      s.style.setProperty("--dx", Math.cos(ang) * dist + "px");
      s.style.setProperty("--dy", Math.sin(ang) * dist + "px");
      s.style.setProperty("--d", (0.6 + Math.random() * 0.5) + "s");
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1200);
    }
    if (target) { target.classList.add("fx-pulse"); setTimeout(() => target.classList.remove("fx-pulse"), 700); }
  };

  /* ── styles ── */
  function injectCSS() {
    if (document.getElementById("fx-styles")) return;
    const css = `
    [data-fx-reveal]{opacity:0; transform:translateY(20px); transition:opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1)}
    [data-fx-reveal].fx-in{opacity:1; transform:none}
    .fx-word{display:inline-block; opacity:0; transform:translateY(0.5em); transition:opacity .5s ease, transform .5s cubic-bezier(.22,1,.36,1)}
    [data-fx-words].fx-words-go .fx-word{opacity:1; transform:none}
    [data-fx-draw] path,[data-fx-draw] line,[data-fx-draw] polyline{stroke-dasharray:1; stroke-dashoffset:1; pathLength:1; transition:stroke-dashoffset 1.4s ease}
    [data-fx-draw].fx-draw-go path,[data-fx-draw].fx-draw-go line,[data-fx-draw].fx-draw-go polyline{stroke-dashoffset:0}
    .fx-motes{position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:0}
    .fx-veil{position:fixed; inset:0; z-index:9999; pointer-events:none; opacity:0;
      background:radial-gradient(120% 100% at 50% 0%, #0A1326, #05101F);
      transition:opacity .28s ease}
    .fx-veil.on{opacity:1}
    .fx-ring{position:fixed; z-index:9998; width:18px; height:18px; margin:-9px 0 0 -9px; border-radius:999px;
      border:2px solid #E8C77A; pointer-events:none; animation:fxRing .85s cubic-bezier(.2,.8,.2,1) forwards}
    @keyframes fxRing{to{width:200px; height:200px; margin:-100px 0 0 -100px; opacity:0; border-width:1px}}
    .fx-spark{position:fixed; z-index:9998; width:7px; height:7px; border-radius:999px; pointer-events:none;
      box-shadow:0 0 8px rgba(232,199,122,.8); animation:fxSpark var(--d,.8s) cubic-bezier(.2,.7,.2,1) forwards}
    @keyframes fxSpark{0%{transform:translate(0,0) scale(1); opacity:1}
      100%{transform:translate(var(--dx),var(--dy)) scale(.2); opacity:0}}
    .fx-pulse{animation:fxPulse .7s ease}
    @keyframes fxPulse{0%,100%{transform:scale(1)}30%{transform:scale(1.35)}60%{transform:scale(.95)}}
    [data-fx-flip]{backface-visibility:hidden}
    [data-fx-flip].fx-flip-go{animation:fxFlipIn 1.05s cubic-bezier(.3,.9,.3,1) both}
    @keyframes fxFlipIn{from{transform:perspective(1400px) rotateY(-88deg); opacity:0}60%{opacity:1}to{transform:perspective(1400px) rotateY(0); opacity:1}}
    @media (prefers-reduced-motion: reduce){
      [data-fx-reveal],.fx-word{opacity:1 !important; transform:none !important}
      .fx-veil{display:none}
    }
    `;
    const style = document.createElement("style");
    style.id = "fx-styles";
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }
})();

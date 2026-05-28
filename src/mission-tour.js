/**
 * FUTUREPROOF — Mission task Guide Tour (coachmarks)
 *
 * A first-run, spotlight-style walkthrough of the mission workspace. It points
 * the learner at the real UI: the stage rail, the workspace, the tokens /
 * progress dashboard, Mr. Compass, the dossier, and Save-for-later.
 *
 * Why this exists
 *   The #prelude-modal already explains WHAT the mission is (the five stages,
 *   scoring, the mentor). This tour explains WHERE things are and what to click
 *   — the orientation a first-time visitor needs on any new app.
 *
 * Behaviour
 *   • Shows once per learner (localStorage `fp_mission_tour_seen_v1`).
 *   • Waits for the prelude dialog to close before starting.
 *   • Re-playable via the "Guide" button injected into the mission tools strip,
 *     or by visiting with `?guide=1`.
 *   • Each step targets a selector. If the target is hidden (e.g. the dossier
 *     button before Probe) or off-canvas (the rail on mobile), the step
 *     degrades gracefully to a centered card so the guidance is never lost.
 *   • Accessible: role=dialog + aria-modal, focus moves to the card, ESC skips,
 *     Tab is trapped, prefers-reduced-motion disables transitions.
 *   • Bilingual: English lead with a Thai metalanguage gloss.
 *
 * All DOM is built with createElement (no innerHTML) — content is static/trusted.
 */

const KEY = "fp_mission_tour_seen_v1";

const STEPS = [
  {
    sel: null,
    title: "Welcome to your mission",
    body: "Here's a 30-second tour of the controls before you begin. You can skip any time.",
    th: "ทัวร์สั้น ๆ แนะนำปุ่มต่าง ๆ ก่อนเริ่มภารกิจ — ข้ามได้ทุกเมื่อ",
    place: "center",
  },
  {
    sel: "#rail",
    title: "Your five stages",
    body: "Brief → Probe → Decide → Act → Debrief. The journey flows top to bottom on this rail — you move through the stages in order.",
    th: "ห้าขั้นของภารกิจเรียงจากบนลงล่างบนแถบนี้ คุณจะเดินทีละขั้นตามลำดับ",
    place: "right",
  },
  {
    sel: "#mission-root",
    title: "This is your workspace",
    body: "Read the briefing, listen to stakeholder voices, and answer — everything for the current stage appears here in the centre.",
    th: "พื้นที่ทำงานหลัก อ่านโจทย์ ฟังเสียงผู้เกี่ยวข้อง และตอบคำถามได้ที่นี่",
    place: "top",
  },
  {
    sel: ".stat-grid",
    title: "Track your standing",
    body: "Insight Tokens, Progress, and your current Stage update live. The Power bar below fills as you work — reach 60% to earn this region's Keystone.",
    th: "ติดตาม Insight Tokens ความก้าวหน้า และขั้นปัจจุบัน — ทำให้ถึง 60% เพื่อรับ Keystone",
    place: "left",
  },
  {
    sel: "#compass-launcher",
    title: "Meet Mr. Compass",
    body: "Stuck? Mr. Compass asks questions that unblock your thinking and helps with English — in English. He never gives answers or grades your decisions.",
    th: "ติดขัด? กดเรียก Mr. Compass ผู้ช่วยแบบโสกราตีส ช่วยเรื่องภาษา แต่จะไม่บอกคำตอบ",
    place: "top",
  },
  {
    sel: "#open-dossier",
    title: "Re-read the dossier",
    body: "From the Probe stage onward, this button re-opens the dossier so you can re-read any passage at any time.",
    th: "ตั้งแต่ขั้น Probe เป็นต้นไป ปุ่มนี้เปิดแฟ้มข้อมูลให้กลับไปอ่านซ้ำได้ทุกเมื่อ",
    place: "top",
  },
  {
    sel: "#save-later",
    title: "Stop and resume anytime",
    body: "Save for later whenever you need to. Your progress syncs to your account — pick up on any device.",
    th: "บันทึกไว้ทำต่อภายหลังได้ ความก้าวหน้าซิงก์เข้าบัญชี ทำต่อจากเครื่องใดก็ได้",
    place: "bottom",
  },
  {
    sel: null,
    title: "You're ready, Agent",
    body: "Start with Brief on the left rail. Take your time, weigh the evidence, and make the call. Good luck.",
    th: "เริ่มที่ขั้น Brief บนแถบซ้าย ค่อย ๆ ชั่งน้ำหนักหลักฐานแล้วตัดสินใจ — ขอให้โชคดี",
    place: "center",
  },
];

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Small DOM builder — el(tag, props, children[]) */
function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else if (k === "lang") node.setAttribute("lang", v);
    else if (k.startsWith("aria") || k === "role" || k === "type" || k === "id" || k === "tabIndex")
      node.setAttribute(k === "tabIndex" ? "tabindex" : k, v);
    else node.setAttribute(k, v);
  }
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    if (c == null) return;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  });
  return node;
}

/** Is the element present, rendered, and at least partly inside the viewport? */
function isUsable(elm) {
  if (!elm || elm.hidden || elm.getAttribute("aria-hidden") === "true") return false;
  if (elm.offsetParent === null && getComputedStyle(elm).position !== "fixed") return false;
  const r = elm.getBoundingClientRect();
  if (r.width < 4 || r.height < 4) return false;
  const vw = window.innerWidth, vh = window.innerHeight;
  if (r.right <= 0 || r.bottom <= 0 || r.left >= vw || r.top >= vh) return false;
  return true;
}

function injectStyles() {
  if (document.getElementById("mtour-styles")) return;
  const css = `
  .mtour-spot{position:fixed;z-index:10000;border-radius:14px;pointer-events:none;
    box-shadow:0 0 0 9999px rgba(5,13,31,.66);${reduceMotion ? "" : "transition:all .32s cubic-bezier(.4,0,.2,1);"}
    outline:2px solid rgba(232,199,122,.9);outline-offset:3px}
  .mtour-pop{position:fixed;z-index:10001;max-width:min(360px,calc(100vw - 32px));
    background:#0B1B38;color:#F4F1EA;border:1px solid rgba(232,199,122,.28);
    border-radius:16px;padding:20px 20px 16px;box-shadow:0 24px 60px rgba(5,13,31,.5);
    font-family:'DM Sans',system-ui,sans-serif;${reduceMotion ? "" : "transition:all .26s cubic-bezier(.4,0,.2,1);"}}
  .mtour-pop[data-center="1"]{left:50%;top:50%;transform:translate(-50%,-50%)}
  .mtour-step{font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:.18em;
    text-transform:uppercase;color:#E8C77A;margin-bottom:8px}
  .mtour-title{font-family:'Fraunces','Cormorant Garamond',serif;font-weight:600;
    font-size:22px;line-height:1.15;margin:0 0 8px;color:#FFFFFF}
  .mtour-body{font-size:14.5px;line-height:1.6;color:rgba(244,241,234,.9);margin:0 0 6px}
  .mtour-th{font-family:'IBM Plex Sans Thai',sans-serif;font-size:13px;line-height:1.7;
    color:rgba(232,199,122,.82);margin:0 0 16px}
  .mtour-row{display:flex;align-items:center;justify-content:space-between;gap:12px}
  .mtour-dots{display:flex;gap:6px;margin-top:12px}
  .mtour-dot{width:7px;height:7px;border-radius:999px;background:rgba(244,241,234,.25)}
  .mtour-dot.on{background:#E8C77A}
  .mtour-btns{display:flex;gap:8px}
  .mtour-skip{background:none;border:0;color:rgba(244,241,234,.6);font-family:'JetBrains Mono',monospace;
    font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;padding:6px 2px}
  .mtour-skip:hover{color:#E8C77A}
  .mtour-btn{font-family:'DM Sans',sans-serif;font-weight:600;font-size:13px;border-radius:999px;
    padding:8px 16px;cursor:pointer;border:1px solid transparent;transition:.18s}
  .mtour-back{background:transparent;border-color:rgba(244,241,234,.22);color:#F4F1EA}
  .mtour-back:hover{border-color:#E8C77A}
  .mtour-next{background:linear-gradient(135deg,#b57c34,#E8C77A);color:#0B1B38;border:0}
  .mtour-next:hover{filter:brightness(1.06)}
  .mtour-pop:focus{outline:2px solid #E8C77A;outline-offset:2px}
  .mtour-replay{display:inline-flex;align-items:center;gap:7px;background:transparent;
    border:1px solid rgba(7,23,52,.18);color:var(--ink,#071734);border-radius:999px;
    padding:9px 15px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:.18s}
  .mtour-replay:hover{border-color:#b57c34;color:#b57c34}
  .mtour-replay .material-symbols-rounded{font-size:17px}
  @media (max-width:600px){.mtour-pop{max-width:calc(100vw - 24px)}}
  `;
  document.head.appendChild(el("style", { id: "mtour-styles", text: css }));
}

let active = false;

function runTour() {
  if (active) return;
  active = true;
  injectStyles();

  const spot = el("div", { class: "mtour-spot" });
  spot.style.display = "none";

  const stepEl = el("div", { class: "mtour-step", id: "mtour-step" });
  const titleEl = el("h2", { class: "mtour-title", id: "mtour-title" });
  const bodyEl = el("p", { class: "mtour-body", id: "mtour-body" });
  const thEl = el("p", { class: "mtour-th", id: "mtour-th", lang: "th" });
  const skipBtn = el("button", { class: "mtour-skip", type: "button", text: "Skip · ข้าม" });
  const backBtn = el("button", { class: "mtour-btn mtour-back", type: "button", text: "Back" });
  const nextBtn = el("button", { class: "mtour-btn mtour-next", type: "button", text: "Next →" });
  const dots = el("div", { class: "mtour-dots", "aria-hidden": "true" });
  STEPS.forEach(() => dots.appendChild(el("span", { class: "mtour-dot" })));

  const pop = el("div", {
    class: "mtour-pop", role: "dialog", "aria-modal": "true",
    "aria-labelledby": "mtour-title", tabIndex: "-1",
  }, [
    stepEl, titleEl, bodyEl, thEl,
    el("div", { class: "mtour-row" }, [
      skipBtn,
      el("div", { class: "mtour-btns" }, [backBtn, nextBtn]),
    ]),
    dots,
  ]);

  document.body.appendChild(spot);
  document.body.appendChild(pop);

  let i = 0;
  const lastFocus = document.activeElement;

  function place(step) {
    const target = step.sel ? document.querySelector(step.sel) : null;
    if (!isUsable(target) || step.place === "center") {
      spot.style.display = "none";
      pop.dataset.center = "1";
      pop.style.left = pop.style.top = pop.style.transform = "";
      return;
    }
    const r0 = target.getBoundingClientRect();
    if (r0.top < 8 || r0.bottom > window.innerHeight - 8) {
      target.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
    }
    requestAnimationFrame(() => {
      const r = target.getBoundingClientRect();
      const pad = 6;
      spot.style.display = "block";
      spot.style.left = `${Math.max(4, r.left - pad)}px`;
      spot.style.top = `${Math.max(4, r.top - pad)}px`;
      spot.style.width = `${r.width + pad * 2}px`;
      spot.style.height = `${r.height + pad * 2}px`;

      pop.dataset.center = "0";
      const pw = pop.offsetWidth, ph = pop.offsetHeight, gap = 16;
      let left, top;
      const pl = step.place || "bottom";
      if (pl === "right") { left = r.right + gap; top = r.top; }
      else if (pl === "left") { left = r.left - pw - gap; top = r.top; }
      else if (pl === "top") { left = r.left + r.width / 2 - pw / 2; top = r.top - ph - gap; }
      else { left = r.left + r.width / 2 - pw / 2; top = r.bottom + gap; }
      left = Math.min(Math.max(12, left), window.innerWidth - pw - 12);
      top = Math.min(Math.max(12, top), window.innerHeight - ph - 12);
      pop.style.transform = "none";
      pop.style.left = `${left}px`;
      pop.style.top = `${top}px`;
    });
  }

  function render() {
    const step = STEPS[i];
    stepEl.textContent = `STEP ${i + 1} / ${STEPS.length}`;
    titleEl.textContent = step.title;
    bodyEl.textContent = step.body;
    thEl.textContent = step.th;
    backBtn.style.visibility = i === 0 ? "hidden" : "visible";
    nextBtn.textContent = i === STEPS.length - 1 ? "Done ✓" : "Next →";
    dots.querySelectorAll(".mtour-dot").forEach((d, n) => d.classList.toggle("on", n === i));
    place(step);
    pop.focus();
  }

  function finish(remember) {
    if (remember) { try { localStorage.setItem(KEY, String(Date.now())); } catch (_) {} }
    spot.remove(); pop.remove();
    window.removeEventListener("resize", onResize);
    document.removeEventListener("keydown", onKey, true);
    active = false;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function next() { if (i === STEPS.length - 1) finish(true); else { i++; render(); } }
  function onResize() { place(STEPS[i]); }
  function onKey(e) {
    if (!active) return;
    if (e.key === "Escape") { e.preventDefault(); finish(true); }
    else if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); if (i > 0) { i--; render(); } }
    else if (e.key === "Tab") {
      const f = [skipBtn, backBtn, nextBtn].filter((b) => b.offsetParent !== null);
      const idx = f.indexOf(document.activeElement);
      e.preventDefault();
      const n = e.shiftKey ? (idx <= 0 ? f.length - 1 : idx - 1) : (idx === f.length - 1 ? 0 : idx + 1);
      f[n].focus();
    }
  }

  nextBtn.addEventListener("click", next);
  backBtn.addEventListener("click", () => { if (i > 0) { i--; render(); } });
  skipBtn.addEventListener("click", () => finish(true));
  window.addEventListener("resize", onResize);
  document.addEventListener("keydown", onKey, true);

  render();
}

function injectReplayButton() {
  const strip = document.getElementById("center-footer");
  if (!strip || document.getElementById("mtour-replay")) return;
  injectStyles();
  const btn = el("button", {
    id: "mtour-replay", type: "button", class: "mtour-replay",
    "aria-label": "Replay the mission guide tour",
  }, [
    el("span", { class: "material-symbols-rounded", text: "help" }),
    el("span", { text: "Guide · คู่มือ" }),
  ]);
  btn.addEventListener("click", () => runTour());
  strip.appendChild(btn);
}

export function startMissionTour() { runTour(); }

function maybeAutoStart() {
  const forced = location.search.includes("guide=1");
  if (!forced) {
    try { if (localStorage.getItem(KEY)) return; } catch (_) { /* storage blocked → show once */ }
  }
  const prelude = document.getElementById("prelude-modal");
  const begin = () => setTimeout(runTour, 420);
  if (prelude && prelude.open) {
    prelude.addEventListener("close", begin, { once: true });
  } else if (prelude) {
    setTimeout(() => {
      if (prelude.open) prelude.addEventListener("close", begin, { once: true });
      else begin();
    }, 650);
  } else {
    begin();
  }
}

if (typeof window !== "undefined") {
  const boot = () => { injectReplayButton(); maybeAutoStart(); };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
  window.startMissionTour = startMissionTour;
}

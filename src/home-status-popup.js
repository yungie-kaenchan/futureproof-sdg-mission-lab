/**
 * FUTUREPROOF — first-visit "Project status & rationale" pop-up (home page).
 *
 * Shows once per visitor (localStorage `fp_home_status_seen_v1`): a concise,
 * bilingual notice that FUTUREPROOF is a new, pilot-ready innovation that
 * augments — not replaces — the Design-Thinking project. Close → browse as
 * usual; never shown again on return visits.
 *
 * Self-contained: scoped <style> + createElement (no innerHTML), so it does
 * not depend on the compiled Tailwind classes. Accessible: role=dialog,
 * aria-modal, focus management, ESC / click-scrim to close, reduced-motion aware.
 * Suppress with ?nostatus for testing.
 */
const KEY = "fp_home_status_seen_v1";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function el(tag, props = {}, children = []) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === "class") n.className = v;
    else if (k === "lang") n.setAttribute("lang", v);
    else if (k === "text") n.textContent = v;
    else n.setAttribute(k, v);
  }
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    if (c == null) return;
    n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  });
  return n;
}

/** Build a paragraph with **bold** segments → <strong>, *italic* → <em>. */
function para(cls, text, opts = {}) {
  const p = el("p", { class: cls });
  if (opts.lang) p.setAttribute("lang", opts.lang);
  text.split("**").forEach((seg, i) => {
    if (seg === "") return;
    if (i % 2 === 1) { p.appendChild(el("strong", { text: seg })); return; }
    seg.split("*").forEach((s2, j) => {
      if (s2 === "") return;
      p.appendChild(j % 2 === 1 ? el("em", { text: s2 }) : document.createTextNode(s2));
    });
  });
  return p;
}

function injectStyles() {
  if (document.getElementById("fps-styles")) return;
  const css = `
  .fps-scrim{position:fixed;inset:0;z-index:11000;display:flex;align-items:center;justify-content:center;
    padding:20px;background:rgba(7,23,52,.62);${reduceMotion ? "" : "animation:fpsFade .25s ease"}}
  @keyframes fpsFade{from{opacity:0}to{opacity:1}}
  .fps-card{position:relative;max-width:640px;width:100%;max-height:90vh;overflow:auto;
    background:#0B1B38;color:#F4F1EA;border:1px solid rgba(232,199,122,.3);border-radius:20px;
    padding:34px 36px 28px;box-shadow:0 30px 80px rgba(5,13,31,.55);
    ${reduceMotion ? "" : "animation:fpsRise .3s cubic-bezier(.34,1.4,.5,1)"}}
  @keyframes fpsRise{from{transform:translateY(14px);opacity:0}to{transform:none;opacity:1}}
  .fps-eyebrow{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.16em;
    text-transform:uppercase;color:#E8C77A;margin:0 0 14px}
  .fps-en{font-family:'DM Sans',system-ui,sans-serif;font-size:15.5px;line-height:1.62;
    color:rgba(244,241,234,.92);margin:0 0 16px}
  .fps-en strong{color:#fff;font-weight:700}
  .fps-en em{color:#E8C77A;font-style:italic}
  .fps-rule{height:1px;background:rgba(232,199,122,.22);margin:0 0 16px}
  .fps-th{font-family:'IBM Plex Sans Thai','DM Sans',sans-serif;font-size:18px;line-height:1.85;
    color:rgba(244,241,234,.9);margin:0 0 22px;font-weight:300}
  .fps-th strong{color:#E8C77A;font-weight:600}
  .fps-th em{color:#fff;font-style:normal;font-weight:500}
  .fps-row{display:flex;justify-content:flex-end;align-items:center;gap:14px}
  .fps-close{background:linear-gradient(135deg,#b57c34,#E8C77A);color:#0B1B38;border:0;
    border-radius:999px;padding:11px 26px;font-family:'DM Sans',sans-serif;font-weight:700;
    font-size:14px;cursor:pointer;transition:.18s}
  .fps-close:hover{filter:brightness(1.07)}
  .fps-x{position:absolute;top:14px;right:16px;width:32px;height:32px;display:inline-flex;
    align-items:center;justify-content:center;border-radius:999px;background:rgba(244,241,234,.08);
    border:1px solid rgba(244,241,234,.18);color:#F4F1EA;font-size:16px;cursor:pointer;padding:0;transition:.18s}
  .fps-x:hover{border-color:#E8C77A;color:#E8C77A}
  @media (max-width:520px){.fps-card{padding:26px 22px 22px}.fps-th{font-size:17px}}
  `;
  document.head.appendChild(el("style", { id: "fps-styles", text: css }));
}

const EN = "**A new, pilot-ready innovation — not yet run with a live cohort, by design.** " +
  "FUTUREPROOF *augments* the course's Design-Thinking final project (it does not replace it), " +
  "giving advanced-English learners sustained, Thailand-grounded SDG experience that turns their " +
  "English into critical thinking, ethics, and leadership. The first Mahidol University pilot is " +
  "imminent — what you see here is an auditable, classroom-grounded design, ready to generate " +
  "evidence the moment it begins.";

const TH = "**FUTUREPROOF เป็นนวัตกรรมใหม่ที่พร้อมนำร่อง แต่ยังไม่ได้ใช้กับผู้เรียนกลุ่มจริง — ซึ่งเป็นไปโดยเจตนา** " +
  "แพลตฟอร์มนี้ออกแบบมาเพื่อ *เสริม* โครงงาน Design Thinking ปลายภาคของรายวิชา มิใช่มาแทนที่ " +
  "โดยเปิดโอกาสให้ผู้เรียนที่มีพื้นฐานภาษาอังกฤษระดับสูงได้เรียนรู้ประเด็น SDGs ในบริบทไทยอย่างต่อเนื่อง " +
  "และนำทักษะภาษาอังกฤษไปต่อยอดสู่การคิดวิเคราะห์ จริยธรรม และภาวะผู้นำ " +
  "การนำร่องกับนักศึกษามหาวิทยาลัยมหิดลกำลังจะเริ่มขึ้นในเร็ววัน " +
  "สิ่งที่ท่านเห็นคือการออกแบบที่ตรวจสอบได้และมีรากฐานจากห้องเรียนจริง พร้อมสร้างผลเชิงประจักษ์ทันทีที่เริ่มนำร่อง";

function show() {
  injectStyles();
  const lastFocus = document.activeElement;
  const closeBtn = el("button", { class: "fps-close", type: "button", text: "Continue · เริ่มสำรวจเว็บไซต์" });
  const xBtn = el("button", { class: "fps-x", type: "button", "aria-label": "Close · ปิด", title: "Close · ปิด", text: "✕" });
  const card = el("div", {
    class: "fps-card", role: "dialog", "aria-modal": "true",
    "aria-label": "Project status and rationale", tabindex: "-1",
  }, [
    xBtn,
    el("div", { class: "fps-eyebrow", text: "Project status & rationale · สถานะและเหตุผลของโครงการ" }),
    para("fps-en", EN),
    el("div", { class: "fps-rule" }),
    para("fps-th", TH, { lang: "th" }),
    el("div", { class: "fps-row" }, [closeBtn]),
  ]);
  const scrim = el("div", { class: "fps-scrim" }, [card]);

  function close() {
    try { localStorage.setItem(KEY, String(Date.now())); } catch (_) {}
    scrim.remove();
    document.removeEventListener("keydown", onKey, true);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function onKey(e) { if (e.key === "Escape") { e.preventDefault(); close(); } }

  closeBtn.addEventListener("click", close);
  xBtn.addEventListener("click", close);
  scrim.addEventListener("click", (e) => { if (e.target === scrim) close(); });
  document.addEventListener("keydown", onKey, true);

  document.body.appendChild(scrim);
  setTimeout(() => card.focus(), 40);
}

function maybeShow() {
  if (location.search.includes("nostatus")) return;
  try { if (localStorage.getItem(KEY)) return; } catch (_) { /* storage blocked → show once */ }
  show();
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", maybeShow);
  else maybeShow();
  window.showFutureproofStatus = show; // manual re-open hook
}

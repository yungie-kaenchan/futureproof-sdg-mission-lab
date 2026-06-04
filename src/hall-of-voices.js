/**
 * Hall of Voices — three-view gallery engine.
 *   1) The Great Hall — a CSS-3D cover-flow gallery of gilt-framed proposals.
 *   2) The Procession — drifting 2D marquee of frames.
 *   3) The Roll — an honor-roll list of voices.
 *
 * Data is seeded composite exemplars (no real student data — PDPA-safe).
 * To switch to real, consented submissions later, replace HALL_ENTRIES /
 * ROLL_VOICES with a Firebase read of a curated public node (see loadEntries()).
 *
 * All DOM is built with createElement (no innerHTML) — content is static/trusted.
 */

/* ── SDG palette ─────────────────────────────────────────────── */
const KEYSTONES = ["#26BDE2", "#3F7E44", "#FD9D24", "#0A97D9", "#C5192D", "#4C9F38"];

/* ── Seeded composite exemplars — one per region ─────────────── */
const HALL_ENTRIES = [
  {
    id: "sdg06", sdg: "SDG 6", region: "Northeast · Khon Kaen", color: "#26BDE2",
    title: "Meter the aquifer before the next dry season",
    by: "Pseudonym · Northeast Champion 2026",
    address: "Provincial Waterworks Authority · การประปาส่วนภูมิภาค ขอนแก่น",
    excerpt: "I propose that the authority commit ฿700,000 to community-managed metering of the shared aquifer wells across the four most-drawn sub-districts, and ฿300,000 for a rotating allocation agreement brokered with the rice cooperatives. I accept that metering will, in the first season, reduce some farmers' free draw — that is the cost. As the hydrologist warned in the mission, an aquifer you cannot measure is one you cannot share fairly.",
  },
  {
    id: "sdg13", sdg: "SDG 13", region: "North · Chiang Mai", color: "#3F7E44",
    title: "Pay for the alternative before banning the burn",
    by: "Pseudonym · North Champion 2026",
    address: "Chiang Mai Provincial Administrative Organisation · อบจ.เชียงใหม่",
    excerpt: "I propose ฿650,000 to subsidise baler-and-collection contracts for maize residue across the three highest-PM2.5 sub-districts, so farmers have a paid alternative to burning, and ฿350,000 for a transparent burn-window forecast service. I accept that this does not end burning in one season. Enforcement without an alternative is just a fine in disguise — the alternative has to be paid for first.",
  },
  {
    id: "sdg11", sdg: "SDG 11", region: "Central · Bangkok", color: "#FD9D24",
    title: "A Baan Mankong precondition for the corridor",
    by: "Pseudonym · Central Champion 2026",
    address: "BMA Department of Drainage and Sewerage · สำนักการระบายน้ำ กรุงเทพมหานคร",
    excerpt: "I propose that the Bangkok Metropolitan Administration commit ฿1,000,000 toward the first phase of a Baan Mankong-style relocation settlement for the klong-side community on the corridor alignment — a co-designed land plot inside the same district, with secure tenure, before the first wall is poured. I accept this lengthens the timeline by one season. The community-network organiser was clear: doing consent last is what slows the corridor, not consent itself.",
  },
  {
    id: "sdg14", sdg: "SDG 14", region: "South · Andaman", color: "#0A97D9",
    title: "A tied transition fund for the smallest operators",
    by: "Pseudonym · South Champion 2026",
    address: "Department of Marine and Coastal Resources · กรมทรัพยากรทางทะเลและชายฝั่ง (ทช.)",
    excerpt: "I propose that DMCR ringfence ฿1,000,000 of the next reef-recovery cycle as a transition fund tied to the closure window — ฿700,000 in low-season buoy-and-monitoring contracts for the 30 smallest single-boat operators along the affected reefs, ฿300,000 for community-cooperative training. I accept that the larger tour-companies receive no compensation. That is deliberate. They can absorb the closure; the smallest operators cannot, and the cooperative leader was right that order is where the harm hides.",
  },
  {
    id: "sdg04", sdg: "SDG 4", region: "West · Mae Sot", color: "#C5192D",
    title: "Fund the bridge first, then move us across",
    by: "Pseudonym · West Champion 2026",
    address: "Tak Primary Educational Service Area Office 2 · สพป.ตาก เขต 2",
    excerpt: "I propose that the district commit ฿840,000 to fund two bridging teachers in each of the eight receiving Thai schools for one academic year, and ฿160,000 for shared Karen-Thai learning materials. I accept that this plan does not reach the over-15 cohort this cycle — that is a real cost. I propose addressing them in Year 2, once the bridging staff are proven for the 6–14 group. As I committed in the Mae Sot mission, enrolment is not inclusion; the bridge must exist before the calendar.",
  },
  {
    id: "sdg03", sdg: "SDG 3", region: "East · EEC fringe", color: "#4C9F38",
    title: "Supported อสม. rounds before a satellite clinic",
    by: "Pseudonym · East Champion 2026",
    address: "Provincial Public Health Office, Rayong · สสจ.ระยอง",
    excerpt: "I propose that the Provincial Public Health Office fund a 12-month pilot in the three fringe villages with the highest unmet-need indicators: ฿600,000 for stipends and training for the existing อสม. volunteers (so the village system is no longer unpaid), and ฿400,000 for a twice-weekly satellite clinic. I accept this does not reach every fringe village in Year 1 — that is the trade-off — but it lets the cost-per-prevented-admission be tested honestly before scaling.",
  },
];

/* ── The Roll — illustrative pseudonymous voices ─────────────── */
const ROLL_VOICES = [
  ["North Champion · 2026", "Chiang Mai · SDG 13", "#3F7E44"],
  ["Northeast Champion · 2026", "Khon Kaen · SDG 6", "#26BDE2"],
  ["Central Champion · 2026", "Bangkok · SDG 11", "#FD9D24"],
  ["South Champion · 2026", "Andaman · SDG 14", "#0A97D9"],
  ["West Champion · 2026", "Mae Sot · SDG 4", "#C5192D"],
  ["East Champion · 2026", "EEC fringe · SDG 3", "#4C9F38"],
  ["เสียงจากที่ราบสูง", "Khon Kaen · SDG 6", "#26BDE2"],
  ["The Reef Advocate", "Andaman · SDG 14", "#0A97D9"],
  ["ผู้เสนอเสียงภาคเหนือ", "Chiang Mai · SDG 13", "#3F7E44"],
  ["The Klong Listener", "Bangkok · SDG 11", "#FD9D24"],
  ["เสียงเพื่อชายแดน", "Mae Sot · SDG 4", "#C5192D"],
  ["The Village Health Voice", "EEC fringe · SDG 3", "#4C9F38"],
  ["Highland Steward", "Chiang Mai · SDG 13", "#3F7E44"],
  ["ผู้พิทักษ์อ่าวอันดามัน", "Andaman · SDG 14", "#0A97D9"],
  ["The Aquifer Keeper", "Khon Kaen · SDG 6", "#26BDE2"],
  ["เสียงของเมือง", "Bangkok · SDG 11", "#FD9D24"],
  ["The Bridge Builder", "Mae Sot · SDG 4", "#C5192D"],
  ["ผู้เสนอเสียงภาคตะวันออก", "EEC fringe · SDG 3", "#4C9F38"],
];

/* ── tiny DOM helper (no innerHTML) ──────────────────────────── */
function el(tag, props = {}, kids = []) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === "class") n.className = v;
    else if (k === "text") n.textContent = v;
    else if (k === "style") n.setAttribute("style", v);
    else n.setAttribute(k, v);
  }
  (Array.isArray(kids) ? kids : [kids]).forEach((c) => {
    if (c == null) return;
    n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  });
  return n;
}
function keystoneRow(cls) {
  const row = el("div", { class: cls, role: "img", "aria-label": "Six SDG Keystones earned" });
  KEYSTONES.forEach((c) => row.appendChild(el("span", { class: "ks", style: `background:${c}` })));
  return row;
}
function sdgPill(entry, cls) {
  return el("span", { class: cls, text: `${entry.sdg} · ${entry.region}` });
}

/* ── future hook: swap seeded data for consented Firebase reads ─ */
// async function loadEntries() {
//   const cfg = window.FUTUREPROOF_CONFIG;
//   // read /hallOfVoices (a curated, consent-gated public node) and map to the
//   // same shape as HALL_ENTRIES; fall back to seeded data on any error.
//   return HALL_ENTRIES;
// }

/* ════════════════════════════════════════════════════════════
   VIEW 1 — THE GREAT HALL (CSS-3D cover-flow)
   ════════════════════════════════════════════════════════════ */
const hall = {
  active: 0, frames: [],
  stage: document.getElementById("hall-stage"),
  count: document.getElementById("hall-count"),
  dots: document.getElementById("hall-dots"),
  el: document.getElementById("hall"),
};

/* corridor geometry */
const SEG = 600;   // depth between frames (px)
const OFFX = 300;  // how far each frame sits off the centre aisle (px)
const FACE = 30;   // how much each frame angles to face the walker (deg)

function buildHall() {
  // floor + ceiling (part of the moving world)
  hall.stage.appendChild(el("div", { class: "hall__floor" }));
  hall.stage.appendChild(el("div", { class: "hall__ceiling" }));

  HALL_ENTRIES.forEach((entry, i) => {
    const canvas = el("div", { class: "frame__canvas", style: `--c:${entry.color}` }, [
      sdgPill(entry, "frame__sdg"),
      el("h3", { class: "frame__title", text: entry.title }),
      el("div", { class: "frame__by", text: entry.by }),
      el("p", { class: "frame__excerpt", text: entry.excerpt }),
      el("div", { class: "frame__hint", text: "Click to read in full" }),
    ]);
    const mat = el("div", { class: "frame__mat", style: `--c:${entry.color}` }, [
      el("div", { class: "frame__gilt" }),
      canvas,
    ]);
    const frame = el("div", {
      class: "frame", style: `--c:${entry.color}`, role: "button", tabindex: "-1",
      "aria-label": `${entry.title} — ${entry.by}`,
    }, [mat, el("div", { class: "frame__plate", text: entry.region })]);

    // two poses: hung on the wall (resting) + stepped out to face the walker (active)
    const side = i % 2 === 0 ? -1 : 1;
    const ry = side === -1 ? FACE : -FACE; // angle toward the centre aisle
    const z = -i * SEG;
    frame.dataset.wall =
      `translate(-50%,-50%) translate3d(${side * OFFX}px, 0, ${z}px) rotateY(${ry}deg)`;
    frame.dataset.front =
      `translate(-50%,-50%) translate3d(${side * OFFX * 0.42}px, 0, ${z + 110}px) rotateY(${ry * 0.4}deg) scale(1.05)`;
    frame.style.transform = frame.dataset.wall;

    frame.addEventListener("click", () => {
      if (i === hall.active) openLightbox(entry);
      else { stopTour(); walkTo(i); }
    });
    hall.stage.appendChild(frame);
    hall.frames.push(frame);

    const dot = el("span", { class: "hall-dot" + (i === 0 ? " on" : "") });
    dot.addEventListener("click", () => { stopTour(); walkTo(i); });
    hall.dots.appendChild(dot);
  });
  walkTo(0);
}

/* Walk the camera to a frame: move the whole world forward by index*SEG,
   then fade frames that are behind the walker or too far ahead. */
function walkTo(index) {
  const n = HALL_ENTRIES.length;
  hall.active = Math.max(0, Math.min(n - 1, index));
  hall.stage.style.setProperty("--walk", `${hall.active * SEG}px`);

  hall.frames.forEach((f, i) => {
    const rel = i - hall.active;          // 0 = right in front, +ahead, −behind
    let op;
    if (rel < -0.5) op = 0;               // behind you
    else if (rel > 4) op = 0;             // too deep down the hall
    else op = rel <= 0 ? 1 : Math.max(0.16, 1 - rel * 0.22);
    f.style.opacity = String(op);
    f.style.pointerEvents = op > 0.25 ? "auto" : "none";
    f.style.transform = rel === 0 ? f.dataset.front : f.dataset.wall;
    f.classList.toggle("is-active", rel === 0);
  });

  hall.count.textContent =
    `${String(hall.active + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
  hall.dots.querySelectorAll(".hall-dot").forEach((d, i) => d.classList.toggle("on", i === hall.active));
}

/* ── Auto-walk "Tour" mode (hands-free showcase + screen-record backup) ── */
const tourBtn = document.getElementById("hall-tour");
const tourLabel = document.getElementById("hall-tour-label");
const tourIcon = tourBtn.querySelector(".material-symbols-rounded");
hall.tour = null;
function tourStep() {
  walkTo(hall.active >= HALL_ENTRIES.length - 1 ? 0 : hall.active + 1);
}
function startTour() {
  stopTour();
  hall.tour = setInterval(tourStep, 3600);
  tourBtn.classList.add("on");
  tourIcon.textContent = "pause"; tourLabel.textContent = "Pause";
  tourStep(); // advance immediately so it feels responsive
}
function stopTour() {
  if (hall.tour) { clearInterval(hall.tour); hall.tour = null; }
  tourBtn.classList.remove("on");
  tourIcon.textContent = "play_arrow"; tourLabel.textContent = "Tour";
}
tourBtn.addEventListener("click", () => (hall.tour ? stopTour() : startTour()));

/* nav: arrows (walk forward/back), keyboard, drag/swipe — all pause the tour */
function manualWalk(i) { stopTour(); walkTo(i); }
document.getElementById("hall-prev").addEventListener("click", () => manualWalk(hall.active - 1));
document.getElementById("hall-next").addEventListener("click", () => manualWalk(hall.active + 1));
hall.el.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") { e.preventDefault(); manualWalk(hall.active - 1); }
  else if (e.key === "ArrowRight") { e.preventDefault(); manualWalk(hall.active + 1); }
  else if (e.key === "Enter") { stopTour(); openLightbox(HALL_ENTRIES[hall.active]); }
});
(function dragNav() {
  let x0 = null;
  const down = (x) => { x0 = x; };
  const up = (x) => {
    if (x0 == null) return;
    const dx = x - x0; x0 = null;
    if (Math.abs(dx) > 50) manualWalk(hall.active + (dx < 0 ? 1 : -1));
  };
  hall.el.addEventListener("pointerdown", (e) => down(e.clientX));
  hall.el.addEventListener("pointerup", (e) => up(e.clientX));
  hall.el.addEventListener("touchstart", (e) => down(e.touches[0].clientX), { passive: true });
  hall.el.addEventListener("touchend", (e) => up(e.changedTouches[0].clientX));
})();
/* keep the view aligned after a layout switch */
function layoutHall() { walkTo(hall.active); }
window.addEventListener("resize", layoutHall);

/* ════════════════════════════════════════════════════════════
   VIEW 2 — THE PROCESSION (2D drifting marquee)
   ════════════════════════════════════════════════════════════ */
function buildProcession() {
  const host = document.getElementById("procession");
  const makeFrame = (entry) => {
    const f = el("div", {
      class: "proc-frame", style: `--c:${entry.color}`, role: "button", tabindex: "0",
      "aria-label": `${entry.title} — ${entry.by}`,
    }, [
      el("div", { class: "proc-canvas", style: `--c:${entry.color}` }, [
        sdgPill(entry, "frame__sdg"),
        el("h3", { class: "frame__title", text: entry.title }),
        el("p", { class: "frame__excerpt", text: entry.excerpt }),
      ]),
    ]);
    f.addEventListener("click", () => openLightbox(entry));
    f.addEventListener("keydown", (e) => { if (e.key === "Enter") openLightbox(entry); });
    return f;
  };
  // two rows, opposite directions; each row duplicated for a seamless -50% loop
  [0, 1].forEach((r) => {
    const row = el("div", { class: "proc-row" });
    const order = r === 0 ? HALL_ENTRIES : [...HALL_ENTRIES].reverse();
    [...order, ...order].forEach((e) => row.appendChild(makeFrame(e)));
    host.appendChild(row);
  });
}

/* ════════════════════════════════════════════════════════════
   VIEW 3 — THE ROLL
   ════════════════════════════════════════════════════════════ */
function buildRoll() {
  const host = document.getElementById("roll-list");
  ROLL_VOICES.forEach((v, i) => {
    const [name, meta, color] = v;
    const item = el("div", { class: "roll-item", style: `animation-delay:${i * 45}ms` }, [
      el("span", { class: "num", text: String(i + 1).padStart(2, "0") }),
      el("span", { class: "dot", style: `background:${color}` }),
      el("div", { class: "who" }, [
        el("div", { class: "name", text: name }),
        el("div", { class: "meta", text: meta }),
      ]),
      el("span", { class: "mark" }, [
        el("span", { class: "material-symbols-rounded", text: "verified" }),
        "Submitted",
      ]),
    ]);
    host.appendChild(item);
  });
}

/* ════════════════════════════════════════════════════════════
   LIGHTBOX
   ════════════════════════════════════════════════════════════ */
const lightbox = document.getElementById("lightbox");
const lbInner = document.getElementById("lb-inner");
const lbCard = document.getElementById("lb-card");
let lbLastFocus = null;

function openLightbox(entry) {
  if (typeof stopTour === "function") stopTour();
  lbLastFocus = document.activeElement;
  lbCard.style.setProperty("--c", entry.color);
  lbInner.replaceChildren(
    sdgPill(entry, "lb-sdg"),
    el("h2", { class: "lb-title", text: entry.title }),
    el("div", { class: "lb-by" }, [document.createTextNode("By "), el("strong", { text: entry.by })]),
    el("div", { class: "lb-address" }, [el("span", { class: "label", text: "Addressed to ·" }), document.createTextNode(" " + entry.address)]),
    el("blockquote", { class: "lb-excerpt", text: entry.excerpt }),
    el("div", { class: "lb-meta" }, [keystoneRow("lb-keystones"), el("span", { class: "lb-badge", text: "Curated exemplar" })]),
  );
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
  document.getElementById("lb-close").focus();
}
function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
  if (lbLastFocus && lbLastFocus.focus) lbLastFocus.focus();
}
document.getElementById("lb-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox(); });

/* ════════════════════════════════════════════════════════════
   VIEW SWITCHER
   ════════════════════════════════════════════════════════════ */
document.querySelectorAll(".view-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".view-tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
    tab.classList.add("active");
    const view = tab.dataset.view;
    document.getElementById("view-" + view).classList.add("active");
    if (view === "hall") requestAnimationFrame(layoutHall);
    else stopTour(); // don't keep auto-walking an unseen hall
  });
});

/* ── boot ────────────────────────────────────────────────────── */
buildHall();
buildProcession();
buildRoll();

/* deep-link to a view: ?view=procession | roll | hall (handy for the live demo) */
(function deepLink() {
  const v = new URLSearchParams(location.search).get("view");
  if (v && ["hall", "procession", "roll"].includes(v)) {
    const tab = document.querySelector(`.view-tab[data-view="${v}"]`);
    if (tab) tab.click();
  }
})();

/**
 * FUTUREPROOF — Landing-page tour overlay
 *
 * A short, dismissible 4-step intro for first-time visitors.
 * Triggered when localStorage has no `fp_tour_seen` key.
 *
 * Designed to give judges a 30-second sense of the platform without forcing
 * them to scroll. The user can dismiss any time; we won't show it again.
 */

const KEY = "fp_tour_seen_v1";

const ALL_stepsList = [
  {
    title: "What FUTUREPROOF is",
    body: "A platform where undergraduate teams investigate UN Sustainable Development Goals — in English. They make decisions, defend them, and produce a Voice for Change that synthesizes the journey.",
  },
  {
    title: "Six missions, one ascent",
    body: "Recon → Decode → Deploy → Dissect → Tribunal → Forge. Each maps to a Bloom's cognitive level. Skipping isn't allowed.",
  },
  {
    title: "AI evaluates, teachers grade",
    body: "AI Judges give formative feedback on every decision. The Field Mentor asks questions but never gives answers. Teachers retain final summative authority.",
  },
  {
    title: "Tap the bottom bar to navigate",
    body: "On mobile, the four-tab bar at the bottom is your home base — Missions, Studio, Reflect, Profile. The full nav rail returns on tablet and desktop.",
    mobileOnly: true,
  },
  {
    title: "Take a look",
    body: "Scroll the landing page, or sign up to walk the full onboarding. Either way: welcome.",
  },
];

function getSteps() {
  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  return ALL_stepsList.filter((s) => !s.mobileOnly || isMobile);
}

export function maybeShowTour() {
  if (localStorage.getItem(KEY)) return;
  if (location.search.includes("notour")) return;
  showTour();
}

export function showTour() {
  if (document.getElementById("tour-overlay")) return;
  const stepsList = getSteps();
  const overlay = document.createElement("div");
  overlay.id = "tour-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-labelledby", "tour-title");
  overlay.innerHTML = `
    <div class="tour-card">
      <div class="tour-progress" id="tour-progress" aria-hidden="true"></div>
      <div class="console-label-gold mb-3" id="tour-step-label">STEP 1 / ${stepsList.length}</div>
      <h2 id="tour-title" class="display-heading text-3xl text-bone-white mb-3"></h2>
      <p id="tour-body" class="text-base text-bone-white/85 leading-relaxed mb-6"></p>
      <div class="flex flex-wrap items-center justify-between gap-3">
        <button id="tour-skip" type="button" class="console-label hover:text-gold-primary transition">SKIP TOUR</button>
        <div class="flex gap-2">
          <button id="tour-back" type="button" class="btn-secondary"><span>← Back</span></button>
          <button id="tour-next" type="button" class="btn-primary"><span id="tour-next-label">Next</span><span>→</span></button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  let idx = 0;
  const titleEl = overlay.querySelector("#tour-title");
  const bodyEl = overlay.querySelector("#tour-body");
  const stepLabel = overlay.querySelector("#tour-step-label");
  const progress = overlay.querySelector("#tour-progress");
  const backBtn = overlay.querySelector("#tour-back");
  const nextBtn = overlay.querySelector("#tour-next");
  const nextLabel = overlay.querySelector("#tour-next-label");

  stepsList.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "tour-dot";
    progress.appendChild(dot);
  });

  function render() {
    titleEl.textContent = stepsList[idx].title;
    bodyEl.textContent = stepsList[idx].body;
    stepLabel.textContent = `STEP ${idx + 1} / ${stepsList.length}`;
    progress.querySelectorAll(".tour-dot").forEach((d, i) => d.classList.toggle("active", i === idx));
    backBtn.style.visibility = idx === 0 ? "hidden" : "visible";
    nextLabel.textContent = idx === stepsList.length - 1 ? "Finish" : "Next";
  }
  render();

  backBtn.addEventListener("click", () => { idx = Math.max(0, idx - 1); render(); });
  nextBtn.addEventListener("click", () => {
    if (idx === stepsList.length - 1) dismiss(true);
    else { idx += 1; render(); }
  });
  overlay.querySelector("#tour-skip").addEventListener("click", () => dismiss(true));
  overlay.addEventListener("keydown", (e) => { if (e.key === "Escape") dismiss(true); });
  // Trap focus on the overlay's first focusable
  setTimeout(() => nextBtn.focus(), 50);

  function dismiss(remember) {
    if (remember) localStorage.setItem(KEY, String(Date.now()));
    overlay.remove();
  }
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", maybeShowTour);
  } else {
    maybeShowTour();
  }
}

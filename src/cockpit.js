/**
 * FUTUREPROOF — Cockpit utilities
 *
 *   • Resizable right pane via drag handle.
 *   • FAB menu open/close with click-outside dismiss.
 *   • Sliders auto-update their --val custom property as the user drags
 *     (so the M3 slider track gradient renders correctly).
 */

function bindDragHandles() {
  const handles = document.querySelectorAll(".cockpit-drag");
  handles.forEach((handle) => {
    const grid = handle.closest(".cockpit-window");
    if (!grid) return;
    const minRight = 280;
    const maxRight = 540;

    let dragging = false;
    let startX = 0;
    let startWidth = 0;

    const startDrag = (clientX) => {
      dragging = true;
      startX = clientX;
      const cs = getComputedStyle(grid).gridTemplateColumns.split(" ");
      startWidth = parseFloat(cs[cs.length - 1]) || 360;
      document.body.style.userSelect = "none";
    };
    const moveDrag = (clientX) => {
      if (!dragging) return;
      const delta = startX - clientX;
      const next = Math.max(minRight, Math.min(maxRight, startWidth + delta));
      grid.style.gridTemplateColumns = `1fr ${next}px`;
    };
    const endDrag = () => {
      dragging = false;
      document.body.style.userSelect = "";
    };

    handle.addEventListener("mousedown", (e) => { e.preventDefault(); startDrag(e.clientX); });
    handle.addEventListener("touchstart", (e) => { startDrag(e.touches[0].clientX); }, { passive: true });
    document.addEventListener("mousemove", (e) => moveDrag(e.clientX));
    document.addEventListener("touchmove", (e) => moveDrag(e.touches[0].clientX), { passive: true });
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("touchend", endDrag);
  });
}

function bindFabMenus() {
  document.querySelectorAll(".m3-fab-menu").forEach((menu) => {
    const trigger = menu.querySelector(".trigger");
    if (!trigger) return;
    trigger.addEventListener("click", () => {
      menu.classList.toggle("open");
    });
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target)) menu.classList.remove("open");
    });
  });
}

function bindSliders() {
  document.querySelectorAll(".m3-slider").forEach((slider) => {
    const update = () => {
      const min = parseFloat(slider.min || 0);
      const max = parseFloat(slider.max || 100);
      const val = parseFloat(slider.value);
      const pct = ((val - min) / (max - min)) * 100;
      slider.style.setProperty("--val", `${pct}%`);
    };
    update();
    slider.addEventListener("input", update);
  });
}

function bindSegmented() {
  document.querySelectorAll(".m3-segmented").forEach((seg) => {
    seg.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      seg.querySelectorAll("button").forEach((b) => b.setAttribute("aria-selected", "false"));
      btn.setAttribute("aria-selected", "true");
    });
  });
}

function bindTabs() {
  document.querySelectorAll(".m3-tabs").forEach((tabs) => {
    tabs.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      tabs.querySelectorAll("button").forEach((b) => b.setAttribute("aria-selected", "false"));
      btn.setAttribute("aria-selected", "true");
      const targetId = btn.dataset.tabTarget;
      if (targetId) {
        document.querySelectorAll(`[data-tab-pane]`).forEach((p) => { p.hidden = p.dataset.tabPane !== targetId; });
      }
    });
  });
}

function init() {
  bindDragHandles();
  bindFabMenus();
  bindSliders();
  bindSegmented();
  bindTabs();
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}

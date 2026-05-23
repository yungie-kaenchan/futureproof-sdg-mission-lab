/**
 * FUTUREPROOF — Certificate & Badge generator
 *
 * Runs on pages/final-task-submitted.html. Reads the submitted payload
 * from sessionStorage (or Firebase if the page is opened cold), fills
 * in the student's name + date + Keystone icons + badge vertices, and
 * exposes PNG / PDF download buttons.
 *
 * Base artwork — IF the user has dropped:
 *   /assets/certificates/voice-for-change-certificate-base.png
 *   /assets/certificates/voice-for-change-badge-base.png
 * — those are used as the background image. If missing, a CSS-only
 * fallback (gold-on-obsidian) renders instead so the page is always
 * functional even before the art lands.
 *
 * Exports:
 *   • Certificate as PNG (rendered via html2canvas at 2x scale)
 *   • Certificate as PDF (A4 portrait, jsPDF)
 *   • Badge       as PNG (1:1)
 */

const CERT_BASE = "/assets/certificates/voice-for-change-certificate-base.png";
const BADGE_BASE = "/assets/certificates/voice-for-change-badge-base.png";

const SDG_COLORS = {
  6:  "#26BDE2",
  13: "#3F7E44",
  11: "#FD9D24",
  14: "#0A97D9",
  4:  "#C5192D",
  3:  "#4C9F38",
};
const ORDER = [6, 13, 11, 14, 4, 3];

/* ── Boot ───────────────────────────────────────────────────────── */

async function boot() {
  const payload = readPayload();
  const name = (payload && payload.studentName) || "Voice for Change Champion";
  const submittedAt = (payload && payload.submittedAt) || Date.now();

  // Detect whether the user has shipped the base artwork
  const [certBaseOK, badgeBaseOK] = await Promise.all([
    headOk(CERT_BASE),
    headOk(BADGE_BASE),
  ]);

  // Certificate
  const certBaseImg = document.getElementById("cert-base");
  const certFrame = document.getElementById("cert-fallback-frame");
  if (certBaseOK) {
    certBaseImg.src = CERT_BASE;
    certBaseImg.style.display = "block";
    if (certFrame) certFrame.style.display = "none";
  } else {
    certBaseImg.style.display = "none";
  }
  document.getElementById("cert-name").textContent = name;
  document.getElementById("cert-date").textContent =
    new Date(submittedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  document.getElementById("cert-id").textContent = "VFC · " + shortId(payload?.uid || name + submittedAt);
  renderCertKeystones();

  // Badge
  const badgeBaseImg = document.getElementById("badge-base");
  const ring = document.getElementById("badge-fallback-ring");
  const hex = document.getElementById("badge-fallback-hex");
  if (badgeBaseOK) {
    badgeBaseImg.src = BADGE_BASE;
    badgeBaseImg.style.display = "block";
    if (ring) ring.style.display = "none";
    if (hex) hex.style.display = "none";
  } else {
    badgeBaseImg.style.display = "none";
  }
  document.getElementById("badge-name").textContent = name;
  renderBadgeVertices();

  setupDownloads(name);
}

/* ── Payload retrieval ──────────────────────────────────────────── */

function readPayload() {
  try {
    const raw = sessionStorage.getItem("fp_vfc_submitted");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

/* ── Detect whether a remote asset exists (HEAD request) ────────── */

async function headOk(path) {
  try {
    const r = await fetch(".." + path, { method: "HEAD", cache: "no-store" });
    return r.ok && (r.headers.get("content-type") || "").startsWith("image/");
  } catch { return false; }
}

/* ── Cert Keystones row ─────────────────────────────────────────── */

function renderCertKeystones() {
  const row = document.getElementById("cert-keystones");
  while (row.firstChild) row.removeChild(row.firstChild);
  for (const sdg of ORDER) {
    const k = document.createElement("span");
    k.style.background = "linear-gradient(135deg, " + SDG_COLORS[sdg] + " 0%, #E8C77A 100%)";
    k.style.boxShadow = "0 0 12px " + SDG_COLORS[sdg];
    row.appendChild(k);
  }
}

/* ── Badge vertex dots positioned at hex corners ────────────────── */

function renderBadgeVertices() {
  const root = document.getElementById("badge-vertices");
  while (root.firstChild) root.removeChild(root.firstChild);
  // Six hex vertices in percentage coordinates (top, UR, LR, bottom, LL, UL)
  // Tuned to sit on the hex ring inside the badge container.
  const positions = [
    { x: 50, y: 11, sdg: 6  }, // top
    { x: 89, y: 30, sdg: 11 }, // upper right
    { x: 89, y: 70, sdg: 14 }, // lower right
    { x: 50, y: 89, sdg: 3  }, // bottom
    { x: 11, y: 70, sdg: 4  }, // lower left
    { x: 11, y: 30, sdg: 13 }, // upper left
  ];
  for (const p of positions) {
    const dot = document.createElement("div");
    dot.className = "fallback-vertex";
    dot.style.left = p.x + "%";
    dot.style.top = p.y + "%";
    dot.style.background = SDG_COLORS[p.sdg];
    dot.style.boxShadow = "0 0 0 2px #0A0A0B, 0 0 8px " + SDG_COLORS[p.sdg];
    dot.style.position = "absolute";
    root.appendChild(dot);
  }
}

/* ── Downloads ──────────────────────────────────────────────────── */

function setupDownloads(name) {
  document.getElementById("dl-cert-png").addEventListener("click", async () => {
    const node = document.getElementById("cert");
    const blob = await captureAsBlob(node, 2);
    downloadBlob(blob, slugify(name) + "-voice-for-change-certificate.png");
  });
  document.getElementById("dl-cert-pdf").addEventListener("click", async () => {
    const node = document.getElementById("cert");
    await captureToPdf(node, slugify(name) + "-voice-for-change-certificate.pdf");
  });
  document.getElementById("dl-badge-png").addEventListener("click", async () => {
    const node = document.getElementById("badge");
    const blob = await captureAsBlob(node, 2);
    downloadBlob(blob, slugify(name) + "-voice-for-change-badge.png");
  });
}

async function captureAsBlob(node, scale) {
  if (!window.html2canvas) throw new Error("html2canvas not loaded");
  const canvas = await window.html2canvas(node, {
    backgroundColor: null,
    scale: scale || 2,
    useCORS: true,
    logging: false,
  });
  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}

async function captureToPdf(node, filename) {
  if (!window.html2canvas || !window.jspdf) throw new Error("html2canvas or jsPDF not loaded");
  const canvas = await window.html2canvas(node, {
    backgroundColor: null, scale: 2, useCORS: true, logging: false,
  });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new window.jspdf.jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  // Fit the canvas into A4 with 10mm margins
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 8;
  const maxW = pageW - margin * 2;
  const maxH = pageH - margin * 2;
  const canvasRatio = canvas.width / canvas.height;
  let w = maxW, h = maxW / canvasRatio;
  if (h > maxH) { h = maxH; w = maxH * canvasRatio; }
  const x = (pageW - w) / 2;
  const y = (pageH - h) / 2;
  pdf.addImage(imgData, "PNG", x, y, w, h);
  pdf.save(filename);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 600);
}

function slugify(s) {
  return String(s || "voice-for-change")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64) || "voice-for-change";
}

function shortId(seed) {
  const s = String(seed);
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36).toUpperCase().slice(0, 8);
}

/* ── Boot ───────────────────────────────────────────────────────── */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

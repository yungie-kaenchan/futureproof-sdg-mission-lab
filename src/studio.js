/**
 * FUTUREPROOF — Pitch Capsule Studio helpers
 *
 * Provides:
 *   • panel state management (5 panels, autosave)
 *   • audio recording via MediaRecorder
 *   • PDF export via html2pdf.js (lazy-loaded from CDN)
 *   • Hall of Excellence submission gate
 */

import { isFirebaseAvailable, getFlowState } from "./auth.js";

export const PANELS = [
  { id: "01", title: "The Crisis",   leadRole: "researchAnalyst",        prompt: "Problem statement with data and evidence." },
  { id: "02", title: "The Journey",  leadRole: "collaborative",          prompt: "Decisions made and lessons learned." },
  { id: "03", title: "The Insight",  leadRole: "ethicsOfficer",          prompt: "Core finding or argument." },
  { id: "04", title: "The Solution", leadRole: "communicationsDirector", prompt: "Proposed action with stakeholder alignment." },
  { id: "05", title: "The Voice",    leadRole: "collaborative",          prompt: "Recorded narration overlay." },
];

const AUTOSAVE_KEY = "fp_studio_state_v1";

export function loadDraft() {
  try { return JSON.parse(localStorage.getItem(AUTOSAVE_KEY)) || emptyDraft(); }
  catch { return emptyDraft(); }
}

export function saveDraft(state) {
  state.lastSavedAt = Date.now();
  localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(state));
}

function emptyDraft() {
  const panels = {};
  for (const p of PANELS) panels[p.id] = { title: p.title, content: "", lastEditedAt: null };
  return { panels, templateId: "console_classic", audio: null, lastSavedAt: null };
}

/* ────────── Audio recording ────────── */

export class StudioAudio {
  constructor({ onLevel, onStop }) {
    this.recorder = null;
    this.stream = null;
    this.chunks = [];
    this.onLevel = onLevel || (() => {});
    this.onStop = onStop || (() => {});
  }

  async start() {
    if (!navigator.mediaDevices?.getUserMedia) throw new Error("Your browser doesn't support audio recording.");
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.recorder = new MediaRecorder(this.stream);
    this.chunks = [];
    this.recorder.addEventListener("dataavailable", (e) => { if (e.data.size) this.chunks.push(e.data); });
    this.recorder.addEventListener("stop", () => {
      const blob = new Blob(this.chunks, { type: this.recorder.mimeType });
      this.onStop(blob);
      for (const t of this.stream.getTracks()) t.stop();
      this.stream = null;
    });
    this.recorder.start();
  }

  stop() {
    if (this.recorder && this.recorder.state !== "inactive") this.recorder.stop();
  }
}

/* ────────── PDF export ────────── */

export async function exportPdf(elementId, filename = "pitch-capsule.pdf") {
  await ensureHtml2Pdf();
  const el = document.getElementById(elementId);
  if (!el) throw new Error("Export target not found.");
  return window.html2pdf().set({
    margin:       12,
    filename,
    image:        { type: "jpeg", quality: 0.96 },
    html2canvas:  { scale: 2, useCORS: true, backgroundColor: "#FFFFFF" },
    jsPDF:        { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak:    { mode: ["avoid-all", "css", "legacy"] },
  }).from(el).save();
}

async function ensureHtml2Pdf() {
  if (window.html2pdf) return;
  await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js");
}
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src; s.async = true;
    s.onload = resolve; s.onerror = () => reject(new Error("Failed to load " + src));
    document.head.appendChild(s);
  });
}

/* ────────── Save / submit ────────── */

export async function saveToFirebase({ tid, draft, audioBlob }) {
  if (!isFirebaseAvailable()) return { saved: false, reason: "noFirebase" };
  const fb = await import("./firebase-init.js");
  let audioUrl = null;
  if (audioBlob) {
    audioUrl = await fb.uploadFile(`voices/${tid}_v${Date.now()}.webm`, audioBlob);
  }
  const path = fb.paths.artifact(tid);
  const record = {
    panels: { ...draft.panels },
    templateId: draft.templateId,
    lastSavedAt: Date.now(),
    audioUrl,
    submittedToHallAt: null,
    consentToFeature: false,
  };
  if (audioUrl) {
    record.panels["05"] = { ...record.panels["05"], audioUrl };
  }
  await fb.writePath(path, record);
  return { saved: true, audioUrl };
}

export async function submitToHall({ tid, consentToFeature }) {
  if (!isFirebaseAvailable()) return { submitted: false, reason: "noFirebase" };
  const fb = await import("./firebase-init.js");
  const path = fb.paths.artifact(tid);
  const existing = await fb.readPath(path);
  if (!existing) throw new Error("Save your Pitch Capsule before submitting.");
  await fb.writePath(`${path}/submittedToHallAt`, Date.now());
  await fb.writePath(`${path}/consentToFeature`, !!consentToFeature);
  return { submitted: true };
}

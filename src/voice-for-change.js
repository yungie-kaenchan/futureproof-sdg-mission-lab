/**
 * FUTUREPROOF — Voice for Change · Final Task runtime
 *
 * Drives pages/final-task.html. Responsibilities:
 *
 *   1.  Gate check       — six SDG Keystones required (else show locked screen).
 *   2.  Evidence hydrate — pull each mission's Q6 commitment from Firebase
 *                          (falls back to localStorage / sessionStorage if
 *                          uid is missing or offline).
 *   3.  Audience picker  — curated list of real Thai institutions, one per
 *                          mission + cross-cutting national audiences.
 *   4.  Lane switch      — record-in-browser vs. upload-a-file.
 *   5.  Recorder         — MediaRecorder (audio · video opt-in), 2-5 min cap,
 *                          live audio-level meter, unlimited re-records.
 *   6.  Transcription    — Web Speech API SpeechRecognition stream into the
 *                          transcript textarea; learner can edit before submit.
 *   7.  Compass coach    — reuses startMentorChat() from src/field-mentor.js
 *                          with a Final Task scenario config (same guardrails).
 *   8.  Save / Submit    — writes to users/{uid}/voiceForChange/{vfcId}
 *                          (Firebase) with audio blob upload to Storage; on
 *                          success, navigates to final-task-submitted.html.
 *
 * DOM is built via createElement + textContent + appendChild — no innerHTML
 * is used for any value that could carry learner input.
 */

import { getKeystoneCount, isFinalTaskUnlocked, JOURNEY_MISSIONS } from "./keystones.js";
import { getFlowState } from "./auth.js";

const STORAGE_DRAFT_KEY = "fp_vfc_draft_v1";

/* ── Mission metadata: SDG colour, region label, Thai title ──────── */

const MISSION_META = {
  "sdg06-khonkaen":  { sdg: 6,  color: "#26BDE2", region: "Northeast",     title: "The Aquifer Below Khon Kaen",  th: "ขอนแก่น" },
  "sdg13-chiangmai": { sdg: 13, color: "#3F7E44", region: "North",         title: "The Burning Season",            th: "เชียงใหม่" },
  "sdg11-bangkok":   { sdg: 11, color: "#FD9D24", region: "Central",       title: "The Klong and the City",        th: "กรุงเทพฯ" },
  "sdg14-andaman":   { sdg: 14, color: "#0A97D9", region: "South",         title: "The Reef and the Tide",         th: "อันดามัน" },
  "sdg04-takmaesot": { sdg: 4,  color: "#C5192D", region: "West",          title: "The Children at the Border",    th: "แม่สอด" },
  "sdg03-eecfringe": { sdg: 3,  color: "#4C9F38", region: "East",          title: "The Village the Boom Left Behind", th: "อีอีซี" },
};

/* ── Curated Thai audiences ──────────────────────────────────────── */

const AUDIENCES = [
  // SDG-mapped
  { id: "dgr",     sdg: "SDG 6",  en: "Department of Groundwater Resources",                  th: "กรมทรัพยากรน้ำบาดาล" },
  { id: "pcd",     sdg: "SDG 13", en: "Pollution Control Department",                         th: "กรมควบคุมมลพิษ" },
  { id: "bma",     sdg: "SDG 11", en: "BMA Department of Drainage and Sewerage",              th: "สำนักการระบายน้ำ กรุงเทพมหานคร" },
  { id: "dmcr",    sdg: "SDG 14", en: "Department of Marine and Coastal Resources",           th: "กรมทรัพยากรทางทะเลและชายฝั่ง" },
  { id: "tak2",    sdg: "SDG 4",  en: "Tak Primary Educational Service Area Office 2",        th: "สำนักงานเขตพื้นที่การศึกษาประถมศึกษาตาก เขต 2" },
  { id: "ppho",    sdg: "SDG 3",  en: "Provincial Public Health Office (Rayong / Chonburi)",  th: "สำนักงานสาธารณสุขจังหวัดระยอง / ชลบุรี" },
  // Cross-cutting
  { id: "ysdg",    sdg: "Cross",  en: "Thai Youth SDG Forum",                                 th: "เวทีเยาวชน SDG ประเทศไทย" },
  { id: "undp",    sdg: "Cross",  en: "UNDP Thailand",                                        th: "โครงการพัฒนาแห่งสหประชาชาติ ประเทศไทย" },
  { id: "council", sdg: "Cross",  en: "Your local Provincial Council",                        th: "สภาจังหวัดของคุณ" },
];

/* ── Tiny safe-DOM helper (no innerHTML) ─────────────────────────── */

function el(tag, props, ...children) {
  const e = document.createElement(tag);
  if (props) {
    for (const [k, v] of Object.entries(props)) {
      if (v == null) continue;
      if (k === "class") e.className = v;
      else if (k === "text") e.textContent = v;
      else if (k === "style" && typeof v === "object") Object.assign(e.style, v);
      else if (k.startsWith("on") && typeof v === "function") e.addEventListener(k.slice(2).toLowerCase(), v);
      else if (k.startsWith("aria") || k.startsWith("data-") || k === "role" || k === "type" || k === "for" || k === "name" || k === "value" || k === "checked" || k === "id") e.setAttribute(k, v);
      else e[k] = v;
    }
  }
  for (const c of children) {
    if (c == null || c === false) continue;
    if (typeof c === "string") e.appendChild(document.createTextNode(c));
    else if (Array.isArray(c)) c.forEach((x) => x && e.appendChild(typeof x === "string" ? document.createTextNode(x) : x));
    else e.appendChild(c);
  }
  return e;
}

/* ── State (kept on the module for save/submit) ─────────────────── */

const state = {
  uid: null,
  studentName: "",
  audienceId: null,
  audienceLabel: "",
  lane: "record",
  videoOn: false,
  audioBlob: null,
  audioUrl: null,
  uploadedFile: null,
  transcript: "",
  // Hall of Voices consent removed per request — submissions go straight
  // to the teacher's queue. Public curation policy is handled offline.
  evidenceCommitments: {},
};

/* ── Gate check + entry ─────────────────────────────────────────── */

async function entry() {
  const flow = getFlowState() || {};
  state.uid = flow.uid || null;
  state.studentName = (flow.learnerProfile && (flow.learnerProfile.displayName || flow.learnerProfile.firstName)) || flow.uid || "Cadet";

  const count = state.uid ? await getKeystoneCount(state.uid) : 0;
  const unlocked = state.uid ? await isFinalTaskUnlocked(state.uid) : false;

  if (!unlocked) {
    renderLocked(count);
    return;
  }
  renderUnlocked();
}

function renderLocked(count) {
  const locked = document.getElementById("locked");
  const track = document.getElementById("ks-progress");
  for (let i = 0; i < 6; i++) {
    const d = el("span", { class: "kp" + (i < count ? " earned" : ""), "aria-hidden": "true" });
    track.appendChild(d);
  }
  locked.hidden = false;
}

/* ── Unlocked: hydrate evidence + render all the interactive bits ── */

async function renderUnlocked() {
  document.getElementById("ft-content").hidden = false;

  state.evidenceCommitments = await hydrateEvidence(state.uid);
  renderEvidenceTrail(state.evidenceCommitments);

  renderAudiences();
  setupLaneSwitch();
  setupRecorder();
  setupUpload();
  setupTranscriptHandlers();
  setupCompass();
  setupConsentAndSubmit();
  loadDraftIfPresent();

  // First-time guidance from Mr Compass (single bot message — no API call)
  appendCompassBot(
    "Hi — I'm here for English register only. Try me with 'Is this too formal for the BMA?' or 'Help me hedge this without losing the ask.' I won't tell you what to argue."
  );
}

/* ── Evidence hydration ─────────────────────────────────────────── */

async function hydrateEvidence(uid) {
  const evidence = {};
  // Try Firebase first
  if (uid) {
    try {
      const fb = await import("./firebase-init.js").catch(() => null);
      if (fb && fb.readPath && fb.paths && fb.paths.missionDecisions) {
        for (const m of JOURNEY_MISSIONS) {
          try {
            const path = fb.paths.missionDecisions(uid, m.id);
            const data = await fb.readPath(path);
            const q6 = data?.quizAnswers?.q6?.answer;
            if (q6 && typeof q6 === "string") evidence[m.id] = q6.trim();
          } catch (_) { /* per-mission failure is fine */ }
        }
      }
    } catch (_) { /* fall through to local */ }
  }
  // Also check sessionStorage for any locally-stashed commitments
  try {
    const raw = sessionStorage.getItem("fp_quiz_q6_local");
    if (raw) {
      const parsed = JSON.parse(raw);
      for (const [mid, q6] of Object.entries(parsed)) {
        if (!evidence[mid] && q6) evidence[mid] = q6;
      }
    }
  } catch (_) { /* ignore */ }
  return evidence;
}

function renderEvidenceTrail(evidence) {
  const root = document.getElementById("evidence-trail");
  // Use JOURNEY_MISSIONS canonical order so the trail reads narratively
  const order = ["sdg06-khonkaen", "sdg13-chiangmai", "sdg11-bangkok", "sdg14-andaman", "sdg04-takmaesot", "sdg03-eecfringe"];
  order.forEach((mid, i) => {
    const meta = MISSION_META[mid] || { sdg: "?", color: "#B58A3F", region: "?", title: mid, th: "" };
    const commitment = evidence[mid];

    const node = el("div", { class: "ev", style: { "--sdg-color": meta.color } },
      el("div", { class: "ev-head" },
        el("span", { class: "sdg", text: "SDG " + meta.sdg }),
        el("span", { class: "region", text: meta.region + " · " + meta.th }),
        el("span", { class: "title", text: meta.title }),
      ),
      commitment
        ? el("blockquote", { class: "commitment", text: '"' + commitment + '"' })
        : el("blockquote", { class: "commitment missing", text: "(no commitment recorded for this mission — use the freeform evidence space in your transcript instead)" }),
    );
    root.appendChild(node);
    // Staggered reveal
    setTimeout(() => node.classList.add("in"), 120 * i + 60);
  });
}

/* ── Audience picker ────────────────────────────────────────────── */

function renderAudiences() {
  const root = document.getElementById("audiences");
  for (const a of AUDIENCES) {
    const id = "aud-" + a.id;
    const label = el("label", { class: "aud" },
      el("input", { type: "radio", name: "audience", id, value: a.id }),
      el("span", { class: "aud-en", text: a.en }),
      el("span", { class: "aud-th", text: a.th }),
      el("span", { class: "aud-sdg", text: a.sdg.toUpperCase() }),
    );
    label.addEventListener("click", () => {
      state.audienceId = a.id;
      state.audienceLabel = a.en + " · " + a.th;
      saveDraftSilent();
      refreshSubmitGate();
    });
    root.appendChild(label);
  }
}

/* ── Lane switching ─────────────────────────────────────────────── */

function setupLaneSwitch() {
  const lanes = document.querySelectorAll('input[name="lane"]');
  const recordPane = document.getElementById("record-pane");
  const uploadPane = document.getElementById("upload-pane");
  lanes.forEach((r) => r.addEventListener("change", () => {
    state.lane = r.value;
    recordPane.hidden = (r.value !== "record");
    uploadPane.hidden = (r.value !== "upload");
    saveDraftSilent();
  }));
}

/* ── Recorder ───────────────────────────────────────────────────── */

const MAX_SECONDS = 300;        // 5:00 hard cap
const SUGGESTED_SECONDS = 180;  // 3:00 suggested

let mediaRecorder = null;
let micStream = null;
let audioCtx = null;
let analyser = null;
let levelRaf = null;
let timerInterval = null;
let chunks = [];
let recStartedAt = 0;
let speechRec = null;
let speechRecActive = false;
let videoOnSession = false;

function setupRecorder() {
  const startBtn = document.getElementById("rec-start");
  const stopBtn = document.getElementById("rec-stop");
  const resetBtn = document.getElementById("rec-reset");
  const playBtn = document.getElementById("rec-play");
  const videoOn = document.getElementById("video-on");

  videoOn.addEventListener("change", (e) => {
    state.videoOn = !!e.target.checked;
  });

  startBtn.addEventListener("click", async () => {
    try {
      const wantVideo = !!videoOn.checked;
      videoOnSession = wantVideo;
      const constraints = wantVideo
        ? { audio: true, video: { width: { ideal: 640 }, height: { ideal: 480 } } }
        : { audio: true };

      micStream = await navigator.mediaDevices.getUserMedia(constraints);
      chunks = [];

      if (wantVideo) {
        const cam = document.getElementById("rec-cam");
        cam.srcObject = micStream;
        cam.classList.add("live");
        try { await cam.play(); } catch (_) {}
      }

      const mime = pickSupportedMimeType(wantVideo);
      try {
        mediaRecorder = new MediaRecorder(micStream, mime ? { mimeType: mime } : undefined);
      } catch (e) {
        // Fall back to default mime
        mediaRecorder = new MediaRecorder(micStream);
      }

      mediaRecorder.ondataavailable = (e) => { if (e.data && e.data.size > 0) chunks.push(e.data); };
      mediaRecorder.onstop = () => finalizeRecording();

      mediaRecorder.start(250);
      recStartedAt = Date.now();
      startLevelMeter(micStream);
      startTimer();
      startSpeechRecognition();
      setStatus("recording", "Recording in progress…");
      startBtn.disabled = true;
      stopBtn.disabled = false;
      resetBtn.disabled = true;
      playBtn.disabled = true;
    } catch (e) {
      console.error("[VoiceForChange] Could not start mic/camera:", e);
      setStatus("idle", "Could not access microphone or camera — check browser permissions.");
    }
  });

  stopBtn.addEventListener("click", () => {
    if (mediaRecorder && mediaRecorder.state === "recording") mediaRecorder.stop();
    stopAll();
    stopBtn.disabled = true;
  });

  resetBtn.addEventListener("click", () => {
    state.audioBlob = null;
    if (state.audioUrl) { URL.revokeObjectURL(state.audioUrl); state.audioUrl = null; }
    document.getElementById("rec-audio").src = "";
    document.getElementById("rec-playback-block").classList.remove("has-recording");
    setStatus("idle", "Ready when you are");
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
    playBtn.disabled = true;
    refreshSubmitGate();
  });

  playBtn.addEventListener("click", () => {
    const audio = document.getElementById("rec-audio");
    audio.play().catch(() => {});
  });
}

function pickSupportedMimeType(wantVideo) {
  const candidates = wantVideo
    ? ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm", "video/mp4"]
    : ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"];
  for (const t of candidates) {
    if (window.MediaRecorder && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(t)) return t;
  }
  return null;
}

function finalizeRecording() {
  const ext = videoOnSession ? "webm" : "webm";
  const mime = chunks[0]?.type || (videoOnSession ? "video/webm" : "audio/webm");
  const blob = new Blob(chunks, { type: mime });
  state.audioBlob = blob;
  if (state.audioUrl) URL.revokeObjectURL(state.audioUrl);
  state.audioUrl = URL.createObjectURL(blob);

  const audio = document.getElementById("rec-audio");
  audio.src = state.audioUrl;
  document.getElementById("rec-playback-block").classList.add("has-recording");

  document.getElementById("rec-start").disabled = false;
  document.getElementById("rec-stop").disabled = true;
  document.getElementById("rec-reset").disabled = false;
  document.getElementById("rec-play").disabled = false;
  setStatus("idle", "Recording captured — review the transcript below");
  refreshSubmitGate();
}

function stopAll() {
  try { if (micStream) micStream.getTracks().forEach((t) => t.stop()); } catch (_) {}
  micStream = null;
  if (levelRaf) cancelAnimationFrame(levelRaf);
  if (timerInterval) clearInterval(timerInterval);
  stopSpeechRecognition();
  const cam = document.getElementById("rec-cam");
  cam.srcObject = null;
  cam.classList.remove("live");
  document.getElementById("level-fill").style.width = "0%";
}

function startLevelMeter(stream) {
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const src = audioCtx.createMediaStreamSource(stream);
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 512;
    src.connect(analyser);
    const buf = new Uint8Array(analyser.fftSize);
    const fill = document.getElementById("level-fill");
    const loop = () => {
      analyser.getByteTimeDomainData(buf);
      let max = 0;
      for (let i = 0; i < buf.length; i++) { const d = Math.abs(buf[i] - 128); if (d > max) max = d; }
      const pct = Math.min(100, Math.round((max / 128) * 100));
      fill.style.width = pct + "%";
      levelRaf = requestAnimationFrame(loop);
    };
    loop();
  } catch (_) { /* meter is non-critical */ }
}

function startTimer() {
  const timerEl = document.getElementById("timer");
  timerInterval = setInterval(() => {
    const sec = Math.floor((Date.now() - recStartedAt) / 1000);
    timerEl.firstChild.textContent = fmt(sec) + " ";
    if (sec >= MAX_SECONDS) {
      document.getElementById("rec-stop").click();
    }
  }, 250);
}
function fmt(sec) { const m = Math.floor(sec / 60); const s = sec % 60; return m + ":" + String(s).padStart(2, "0"); }

function setStatus(kind, text) {
  const chip = document.getElementById("status-chip");
  chip.className = "status-chip " + kind;
  while (chip.firstChild) chip.removeChild(chip.firstChild);
  if (kind === "recording") chip.appendChild(el("span", { class: "dot", "aria-hidden": "true" }));
  chip.appendChild(el("span", { text }));
}

/* ── Web Speech transcription ───────────────────────────────────── */

function startSpeechRecognition() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return; // graceful: no live transcript; learner types it
  try {
    speechRec = new SR();
    speechRec.continuous = true;
    speechRec.interimResults = true;
    speechRec.lang = "en-US";
    let baseline = document.getElementById("transcript-area").value.trim();
    if (baseline) baseline += "\n";

    speechRec.onresult = (e) => {
      let interim = "";
      let finalRun = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalRun += r[0].transcript + " ";
        else interim += r[0].transcript;
      }
      const ta = document.getElementById("transcript-area");
      const combined = (baseline + finalRun + interim).trim();
      ta.value = combined;
      updateWordCount();
      // promote final runs into baseline so they don't get overwritten by next interim
      baseline = (baseline + finalRun).replace(/\s+/g, " ");
    };
    speechRec.onerror = (e) => { console.warn("[VoiceForChange] SpeechRecognition error:", e.error); };
    speechRec.onend = () => { speechRecActive = false; };
    speechRec.start();
    speechRecActive = true;
    document.getElementById("transcript-status").textContent = "Live transcription on";
  } catch (e) {
    console.warn("[VoiceForChange] SpeechRecognition not available:", e);
  }
}
function stopSpeechRecognition() {
  if (speechRec && speechRecActive) {
    try { speechRec.stop(); } catch (_) {}
  }
  speechRecActive = false;
  const s = document.getElementById("transcript-status");
  if (s) s.textContent = "";
}

/* ── Upload lane ────────────────────────────────────────────────── */

function setupUpload() {
  const pick = document.getElementById("upload-pick");
  const input = document.getElementById("upload-input");
  const filename = document.getElementById("upload-filename");
  pick.addEventListener("click", () => input.click());
  input.addEventListener("change", () => {
    const f = input.files && input.files[0];
    if (!f) return;
    if (f.size > 25 * 1024 * 1024) {
      filename.textContent = "✕ File too large (max 25 MB) — please choose a smaller file.";
      input.value = "";
      state.uploadedFile = null;
      return;
    }
    state.uploadedFile = f;
    filename.textContent = "✓ " + f.name + "  (" + Math.round(f.size / 1024) + " KB)";
    refreshSubmitGate();
  });
}

/* ── Transcript handlers ────────────────────────────────────────── */

function setupTranscriptHandlers() {
  const ta = document.getElementById("transcript-area");
  ta.addEventListener("input", () => {
    state.transcript = ta.value;
    updateWordCount();
    saveDraftSilent();
    refreshSubmitGate();
  });
}
function updateWordCount() {
  const ta = document.getElementById("transcript-area");
  const words = (ta.value.trim().split(/\s+/).filter(Boolean)).length;
  document.getElementById("word-count").textContent = String(words);
}

/* ── Compass coach ──────────────────────────────────────────────── */

function appendCompassBot(text) {
  const log = document.getElementById("compass-log");
  log.appendChild(el("div", { class: "mentor-msg bot", text }));
  log.scrollTop = log.scrollHeight;
}
function appendCompassUser(text) {
  const log = document.getElementById("compass-log");
  log.appendChild(el("div", { class: "mentor-msg user", text }));
  log.scrollTop = log.scrollHeight;
}

async function setupCompass() {
  const sendBtn = document.getElementById("compass-send");
  const input = document.getElementById("compass-input");
  const logEl = document.getElementById("compass-log");
  let mentor = null;

  // Lazy-load the existing Field Mentor module (same guardrails).
  // The module exports startMentorChat({ logEl, profile, missionConfig, scenario }).
  try {
    const mod = await import("./field-mentor.js");
    const profile = (getFlowState() && getFlowState().learnerProfile) || {};
    const missionConfig = { code: "FINAL-TASK // VOICE FOR CHANGE", label: "Voice for Change" };
    const scenario = {
      id: "final-task",
      title: "Voice for Change",
      coreTension: "Capstone — language coach mode, no content evaluation",
      coachOnly: true,  // hint to the server prompt if it ever reads this
    };
    mentor = mod.startMentorChat({ logEl, profile, missionConfig, scenario });
  } catch (e) {
    console.warn("[VoiceForChange] Field Mentor unavailable — falling back to local prompts:", e);
  }

  function send() {
    const q = (input.value || "").trim();
    if (!q) return;
    input.value = "";
    if (mentor && typeof mentor.send === "function") {
      mentor.send(q);
    } else {
      // Graceful fallback when the cloud function is unreachable
      appendCompassUser(q);
      appendCompassBot("I can only help with English register and audience fit, not content. Try rephrasing your draft sentence and ask 'Is this too formal for the [audience]?' or 'How do I hedge this claim?'");
    }
  }
  sendBtn.addEventListener("click", send);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); send(); }
  });
}

/* ── Consent + Submit ───────────────────────────────────────────── */

function setupConsentAndSubmit() {
  // Hall of Voices consent section was removed — no consent toggles to wire.
  document.getElementById("save-draft").addEventListener("click", () => {
    saveDraft(true);
  });

  document.getElementById("submit-btn").addEventListener("click", async () => {
    if (!submitReady()) return;
    await submitProposal();
  });

  refreshSubmitGate();
}

function submitReady() {
  const hasMedia = (state.lane === "record" && state.audioBlob) || (state.lane === "upload" && state.uploadedFile);
  const wordCount = (state.transcript.trim().split(/\s+/).filter(Boolean)).length;
  const hasTranscript = wordCount >= 50;
  const hasAudience = !!state.audienceId;
  return hasMedia && hasTranscript && hasAudience;
}

function refreshSubmitGate() {
  const ready = submitReady();
  const btn = document.getElementById("submit-btn");
  btn.disabled = !ready;
  const status = document.getElementById("submit-status");
  if (ready) {
    status.textContent = "All set. Submit when you're ready.";
  } else {
    const missing = [];
    if (!state.audienceId) missing.push("an audience");
    if (!(state.lane === "record" ? state.audioBlob : state.uploadedFile)) missing.push("a recording or upload");
    const wc = (state.transcript.trim().split(/\s+/).filter(Boolean)).length;
    if (wc < 50) missing.push("a transcript of at least 50 words (currently " + wc + ")");
    status.textContent = "Still needed: " + missing.join(" · ");
  }
}

/* ── Save / Submit (Firebase + sessionStorage fallback) ─────────── */

function saveDraftSilent() {
  try {
    localStorage.setItem(STORAGE_DRAFT_KEY, JSON.stringify({
      audienceId: state.audienceId,
      audienceLabel: state.audienceLabel,
      lane: state.lane,
      videoOn: state.videoOn,
      transcript: state.transcript,
      savedAt: Date.now(),
    }));
  } catch (_) {}
}
function loadDraftIfPresent() {
  try {
    const raw = localStorage.getItem(STORAGE_DRAFT_KEY);
    if (!raw) return;
    const d = JSON.parse(raw);
    if (d.transcript) {
      document.getElementById("transcript-area").value = d.transcript;
      state.transcript = d.transcript;
      updateWordCount();
    }
    if (d.audienceId) {
      const radio = document.querySelector('input[name="audience"][value="' + d.audienceId + '"]');
      if (radio) { radio.checked = true; state.audienceId = d.audienceId; state.audienceLabel = d.audienceLabel || ""; }
    }
    if (d.lane === "upload") {
      const r = document.querySelector('input[name="lane"][value="upload"]');
      if (r) { r.checked = true; r.dispatchEvent(new Event("change")); }
    }
    refreshSubmitGate();
  } catch (_) {}
}
function saveDraft(showFeedback) {
  saveDraftSilent();
  if (showFeedback) {
    document.getElementById("submit-status").textContent = "Draft saved locally · " + new Date().toLocaleTimeString();
  }
}

async function submitProposal() {
  document.getElementById("submit-btn").disabled = true;
  document.getElementById("submit-status").textContent = "Submitting…";

  const payload = {
    studentName: state.studentName,
    uid: state.uid,
    audienceId: state.audienceId,
    audienceLabel: state.audienceLabel,
    lane: state.lane,
    transcript: state.transcript,
    evidenceCommitments: state.evidenceCommitments,
    submittedAt: Date.now(),
    status: "submitted-awaiting-teacher",
  };

  // Stash in sessionStorage so the confirmation page can render the certificate
  try {
    sessionStorage.setItem("fp_vfc_submitted", JSON.stringify(payload));
  } catch (_) {}

  // Firebase upload (best-effort — never block the confirmation page)
  try {
    if (state.uid) {
      const fb = await import("./firebase-init.js").catch(() => null);
      if (fb && fb.uploadFile && fb.writePath && fb.paths) {
        let mediaUrl = null;
        try {
          const blob = state.lane === "record" ? state.audioBlob : state.uploadedFile;
          const ext = state.lane === "record" ? (state.videoOn ? "webm" : "webm") : (state.uploadedFile?.name?.split(".").pop() || "bin");
          if (blob) {
            mediaUrl = await fb.uploadFile(
              "voiceForChange/" + state.uid + "/" + Date.now() + "." + ext,
              blob
            );
          }
        } catch (e) { console.warn("[VoiceForChange] media upload failed:", e); }

        if (fb.paths.voiceForChange) {
          await fb.writePath(fb.paths.voiceForChange(state.uid), { ...payload, mediaUrl });
        }
      }
    }
  } catch (e) {
    console.error("[VoiceForChange] submit failed:", e);
  }

  // Clear the local draft (the submission is now durable)
  try { localStorage.removeItem(STORAGE_DRAFT_KEY); } catch (_) {}

  location.href = "./final-task-submitted.html";
}

/* ── Boot ───────────────────────────────────────────────────────── */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", entry);
} else {
  entry();
}

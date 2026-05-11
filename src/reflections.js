/**
 * FUTUREPROOF — Voice of the Learner / Time Capsule
 *
 * Captures pre-mission, mid-course, post-Pitch-Capsule, and 30-day-followup
 * voice recordings. Stores the audio in Firebase Storage and a metadata
 * record under /reflections/$uid/$kind/$id.
 *
 * Three checkpoints (per CLAUDE.md §17):
 *   • preMission       — captured per mission, before the briefing
 *   • postMission      — captured per mission, after AI judgment
 *   • thirtyDay        — emailed to students ~30 days after course end
 *
 * Plus the Time Capsule (CLAUDE.md §17): a single 30-second recording the
 * student records before any mission, and listens to themselves at the end.
 */

import { isFirebaseAvailable, getFlowState } from "./auth.js";

export const REFLECTION_PROMPTS = {
  timeCapsule: {
    label: "Time Capsule",
    duration: 30,
    prompt: "In 30 seconds: what's one thing you hope to be different about the way you think — about English, about the world's problems, or about your own voice — by the time you finish this course?",
    thai: "ใน 30 วินาที: คุณหวังว่าจะมีอะไรที่เปลี่ยนไปในวิธีคิดของคุณ — เกี่ยวกับภาษาอังกฤษ ปัญหาของโลก หรือเสียงของคุณเอง — เมื่อคุณจบหลักสูตรนี้?",
  },
  preMission: {
    label: "Pre-mission reflection",
    duration: 30,
    prompt: "What do you already know about this scenario — and what assumption are you carrying in that you might want to test?",
    thai: "คุณรู้อะไรเกี่ยวกับสถานการณ์นี้อยู่แล้ว และมีสมมติฐานอะไรที่คุณติดตัวมาที่อาจจะต้องตรวจสอบ?",
  },
  postMission: {
    label: "Post-mission reflection",
    duration: 60,
    prompt: "What surprised you in this mission, and what would you do differently next time?",
    thai: "อะไรที่ทำให้คุณประหลาดใจในภารกิจนี้ และครั้งหน้าคุณจะทำแตกต่างออกไปอย่างไร?",
  },
  thirtyDay: {
    label: "30-day follow-up",
    duration: 90,
    prompt: "It's been a month. What from this course is still showing up in how you think, write, or argue?",
    thai: "ผ่านมาหนึ่งเดือนแล้ว สิ่งใดจากหลักสูตรนี้ที่ยังปรากฏอยู่ในวิธีคิด การเขียน หรือการโต้แย้งของคุณ?",
  },
};

/* ──────────────────────────────────────────────────────────────────
 * Recorder
 * ──────────────────────────────────────────────────────────────── */

export class ReflectionRecorder {
  constructor({ onLevel, onStop, maxSeconds = 90 }) {
    this.recorder = null;
    this.stream = null;
    this.chunks = [];
    this.onLevel = onLevel || (() => {});
    this.onStop = onStop || (() => {});
    this.maxSeconds = maxSeconds;
    this.startedAt = 0;
    this._interval = null;
  }

  async start() {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error("Your browser doesn't support audio recording.");
    }
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.recorder = new MediaRecorder(this.stream);
    this.chunks = [];
    this.startedAt = Date.now();
    this.recorder.addEventListener("dataavailable", (e) => { if (e.data.size) this.chunks.push(e.data); });
    this.recorder.addEventListener("stop", () => {
      const blob = new Blob(this.chunks, { type: this.recorder.mimeType });
      const duration = Math.round((Date.now() - this.startedAt) / 1000);
      this.onStop(blob, duration);
      for (const t of this.stream.getTracks()) t.stop();
      this.stream = null;
      if (this._interval) { clearInterval(this._interval); this._interval = null; }
    });
    this.recorder.start();
    this._interval = setInterval(() => {
      const elapsed = Math.round((Date.now() - this.startedAt) / 1000);
      this.onLevel(elapsed, Math.max(0, this.maxSeconds - elapsed));
      if (elapsed >= this.maxSeconds) this.stop();
    }, 250);
  }

  stop() {
    if (this.recorder && this.recorder.state !== "inactive") this.recorder.stop();
  }
}

/* ──────────────────────────────────────────────────────────────────
 * Persist
 * ──────────────────────────────────────────────────────────────── */

export async function saveReflection({ uid, kind, missionId, blob, durationSec, transcript = null }) {
  if (!isFirebaseAvailable()) {
    return { saved: false, reason: "noFirebase" };
  }
  const fb = await import("./firebase-init.js");
  const id = `${kind}_${missionId || "global"}_${Date.now().toString(36)}`;
  const audioPath = `reflections/${uid}/${kind}/${id}.webm`;
  const audioUrl = await fb.uploadFile(audioPath, blob);

  const record = {
    audioUrl,
    durationSec,
    transcript,
    ts: Date.now(),
    kind,
    missionId: missionId || null,
  };
  const path = missionId
    ? `${fb.paths.reflections(uid)}/${kind}/${missionId}`
    : `${fb.paths.reflections(uid)}/${kind}/${id}`;
  await fb.writePath(path, record);
  return { saved: true, audioUrl, id };
}

export async function fetchReflections(uid) {
  if (!isFirebaseAvailable()) return null;
  const fb = await import("./firebase-init.js");
  return fb.readPath(fb.paths.reflections(uid));
}

/* ──────────────────────────────────────────────────────────────────
 * Optional transcription (browser-side, where supported)
 * ──────────────────────────────────────────────────────────────── */

export function transcribeBlob(blob) {
  // Browser SpeechRecognition does not transcribe arbitrary blobs reliably;
  // we keep this hook so that a later Claude/Whisper proxy can populate it
  // server-side. For now, return null and let the teacher transcribe later.
  return null;
}

/* ──────────────────────────────────────────────────────────────────
 * Convenience: get current uid + missionId from flow state
 * ──────────────────────────────────────────────────────────────── */

export function reflectionContext() {
  const flow = getFlowState();
  return {
    uid: flow?.uid || null,
    missionId: flow?.uid && flow?.currentMission ? `${flow.uid}_${flow.currentMission}` : null,
  };
}

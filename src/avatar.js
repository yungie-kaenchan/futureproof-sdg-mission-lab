/**
 * FUTUREPROOF — Avatar Capture & Generation
 *
 * Client-side helpers for the avatar creation page. Handles:
 *   • photo input from file or webcam
 *   • client-side resize/crop to 1024×1024 PNG
 *   • call to the Stability.ai Netlify Function
 *   • upload of the generated avatar to Firebase Storage
 *   • write of the avatar URL to /users/$uid/profile/public/avatarUrl
 *
 * The server proxy lives at /.netlify/functions/stability-proxy. In local
 * static-server dev, the proxy isn't running — the page handles that
 * gracefully by surfacing a "not connected" message rather than crashing.
 */

const STABILITY_PROXY = "/.netlify/functions/stability-proxy";
const TARGET_SIZE = 1024;

export const STYLE_PRESETS = [
  { id: "classic",  label: "Classic Operator", hint: "Composed, professional, neutral." },
  { id: "field",    label: "Field Agent",      hint: "Alert and a little weatherworn." },
  { id: "diplomat", label: "Diplomat",         hint: "Confident, open, tailored silhouette." },
  { id: "scholar",  label: "Scholar",          hint: "Thoughtful, soft natural light." },
];

/* ──────────────────────────────────────────────────────────────────
 * Webcam
 * ──────────────────────────────────────────────────────────────── */

export async function startWebcam(videoEl) {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error("Your browser doesn't support webcam capture.");
  }
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 1280 } },
    audio: false,
  });
  videoEl.srcObject = stream;
  await videoEl.play();
  return stream;
}

export function stopWebcam(stream) {
  if (!stream) return;
  for (const track of stream.getTracks()) track.stop();
}

export function captureFromVideo(videoEl) {
  const w = videoEl.videoWidth;
  const h = videoEl.videoHeight;
  const side = Math.min(w, h);
  const sx = (w - side) / 2;
  const sy = (h - side) / 2;
  const canvas = document.createElement("canvas");
  canvas.width = TARGET_SIZE;
  canvas.height = TARGET_SIZE;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(videoEl, sx, sy, side, side, 0, 0, TARGET_SIZE, TARGET_SIZE);
  return canvas.toDataURL("image/png");
}

/* ──────────────────────────────────────────────────────────────────
 * File input
 * ──────────────────────────────────────────────────────────────── */

export function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      return reject(new Error("That doesn't look like an image. Try a PNG or JPG."));
    }
    if (file.size > 8 * 1024 * 1024) {
      return reject(new Error("That photo is too big. Try one under 8 MB."));
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Couldn't read that file."));
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

export async function resizeDataUrlToSquare(dataUrl) {
  const img = await loadImage(dataUrl);
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const side = Math.min(w, h);
  const sx = (w - side) / 2;
  const sy = (h - side) / 2;
  const canvas = document.createElement("canvas");
  canvas.width = TARGET_SIZE;
  canvas.height = TARGET_SIZE;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, sx, sy, side, side, 0, 0, TARGET_SIZE, TARGET_SIZE);
  return canvas.toDataURL("image/png");
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Couldn't decode image."));
    img.src = src;
  });
}

/* ──────────────────────────────────────────────────────────────────
 * Stability.ai proxy call
 * ──────────────────────────────────────────────────────────────── */

export async function generateAvatar({ imageBase64, style, subjectHint }) {
  let response;
  try {
    response = await fetch(STABILITY_PROXY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64, style, subjectHint }),
    });
  } catch (err) {
    throw new Error(
      "The avatar service isn't reachable from this build. " +
      "On the local static server the Netlify Function isn't running — " +
      "deploy to Netlify (or run `netlify dev`) to try generation end-to-end."
    );
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `Avatar service returned ${response.status}`);
  }
  return data;
}

/* ──────────────────────────────────────────────────────────────────
 * Save to Realtime Database (no Firebase Storage required)
 *
 * We compress the avatar to ~512px JPEG and store the data URL directly
 * in /users/$uid/profile/public/avatarUrl. This avoids Firebase Storage
 * rules entirely and works as long as the user can write their own
 * profile (which the security rules already permit).
 *
 * Why this is OK for a pilot platform:
 *  - The compressed image is ~40–80 KB (well within Realtime DB limits).
 *  - <img src="data:image/jpeg;base64,…"> renders natively, no extra fetch.
 *  - No Storage CORS / rules / lifecycle to debug.
 *  - For production CDN serving, we can migrate to Storage later via a
 *    Cloud Function trigger that reads the data URL and uploads it.
 * ──────────────────────────────────────────────────────────────── */

const STORAGE_MAX_DIM = 512;       // resize before encoding to keep DB writes small
const STORAGE_JPEG_QUALITY = 0.82; // ~50–80 KB per avatar

export async function saveAvatar(uid, dataUrl /* , version = 1 */) {
  if (!uid) throw new Error("Missing user id — please sign in again.");
  if (!dataUrl) throw new Error("No avatar image to save.");

  const compressed = await compressDataUrl(dataUrl, STORAGE_MAX_DIM, STORAGE_JPEG_QUALITY);

  const fb = await import("./firebase-init.js");
  await fb.writePath(`${fb.paths.userPublic(uid)}/avatarUrl`, compressed);
  await fb.writePath(`${fb.paths.userPublic(uid)}/avatarUpdatedAt`, Date.now());
  return compressed;
}

/**
 * Resize + recompress a data URL down to a max dimension and a JPEG quality.
 * Stays canvas-only; no network. Returns a fresh `data:image/jpeg;base64,…` URL.
 */
async function compressDataUrl(dataUrl, maxDim, quality) {
  const img = await loadImage(dataUrl);
  const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
  const w = Math.round(img.width * scale);
  const h = Math.round(img.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#FAF7F0";   // bone, so transparent PNGs don't show black
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);
  return canvas.toDataURL("image/jpeg", quality);
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error("Couldn't decode the avatar image."));
    img.src = src;
  });
}

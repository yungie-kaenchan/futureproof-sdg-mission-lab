/**
 * FUTUREPROOF — OpenAI Speech-to-Text Proxy (Netlify Function)
 *
 * Turns a Voice for Change clip (audio or video) into a verbatim text
 * transcript using OpenAI's transcription API. The Claude API cannot
 * ingest audio/video, so this is the "ears" of the pipeline:
 *
 *   clip → THIS FUNCTION (OpenAI transcription) → transcript
 *        → claude-proxy kind:"aiJudges" (Claude critiques the transcript)
 *
 * The OpenAI key is read from OPENAI_API_KEY env var only — it never
 * reaches the browser.
 *
 * Input  (JSON): { audioBase64, mime, filename }
 *   audioBase64 — the clip bytes, base64-encoded (no data: prefix)
 *   mime        — e.g. "audio/webm" / "video/mp4" (optional)
 *   filename    — original name; only the extension matters (optional)
 * Output (JSON): { transcript, model }
 *
 * Limits: Netlify sync functions cap request bodies at ~6 MB, so the
 * client sends clips up to 4 MB raw (≈5.4 MB base64). In-browser
 * recordings (webm/opus audio) sit far below that; large uploaded
 * videos fall back to the typed-transcript flow — by design, the
 * portal must keep working even if this function never answers.
 *
 * PDPA note: the clip is forwarded to OpenAI once, for transcription
 * only, and is not stored by this function. OpenAI's API does not use
 * API data for training. The privacy microcopy on final-task.html
 * states this to the learner.
 */

const OPENAI_STT_ENDPOINT = "https://api.openai.com/v1/audio/transcriptions";

// Try in order — first is the current best transcription model; whisper-1
// is the long-stable fallback in case the account lacks gpt-4o access.
const STT_MODELS = ["gpt-4o-mini-transcribe", "whisper-1"];

const MAX_RAW_BYTES = 4.5 * 1024 * 1024;

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(statusCode, body) {
  return { statusCode, headers: { "Content-Type": "application/json", ...cors }, body: JSON.stringify(body) };
}

// OpenAI sniffs the container format from the filename extension, so give
// the Blob a name that matches its mime type.
function extFor(mime, filename) {
  const fromName = (filename || "").split(".").pop()?.toLowerCase();
  if (fromName && ["webm", "mp4", "mp3", "m4a", "wav", "ogg", "oga", "mpeg", "mpga", "flac"].includes(fromName)) return fromName;
  const m = (mime || "").toLowerCase();
  if (m.includes("webm")) return "webm";
  if (m.includes("mp4")) return "mp4";
  if (m.includes("mpeg") || m.includes("mp3")) return "mp3";
  if (m.includes("ogg")) return "ogg";
  if (m.includes("wav")) return "wav";
  if (m.includes("m4a")) return "m4a";
  if (m.includes("flac")) return "flac";
  return "webm";
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: cors, body: "" };
  if (event.httpMethod !== "POST") return jsonResponse(405, { error: "Method not allowed" });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return jsonResponse(500, { error: "Server is missing OPENAI_API_KEY." });

  let payload;
  try { payload = JSON.parse(event.body || "{}"); }
  catch { return jsonResponse(400, { error: "Invalid JSON" }); }

  const { audioBase64, mime, filename } = payload;
  if (typeof audioBase64 !== "string" || !audioBase64.trim()) {
    return jsonResponse(400, { error: "audioBase64 is required" });
  }

  let bytes;
  try { bytes = Buffer.from(audioBase64, "base64"); }
  catch { return jsonResponse(400, { error: "audioBase64 is not valid base64" }); }

  if (bytes.length < 1000) return jsonResponse(400, { error: "Clip is too short or empty." });
  if (bytes.length > MAX_RAW_BYTES) {
    return jsonResponse(413, { error: "Clip exceeds the auto-transcribe size limit (4 MB). Please type the transcript instead." });
  }

  const name = "clip." + extFor(mime, filename);
  const blob = new Blob([bytes], { type: mime || "audio/webm" });

  let lastDetail = null;
  for (const model of STT_MODELS) {
    const form = new FormData();
    form.append("file", blob, name);
    form.append("model", model);

    let res;
    try {
      res = await fetch(OPENAI_STT_ENDPOINT, {
        method: "POST",
        headers: { Authorization: "Bearer " + apiKey },
        body: form,
      });
    } catch (err) {
      return jsonResponse(502, { error: "Could not reach OpenAI: " + err.message });
    }

    const data = await res.json().catch(() => ({}));

    if (res.ok && typeof data.text === "string") {
      return jsonResponse(200, { transcript: data.text.trim(), model });
    }

    lastDetail = (data && data.error && data.error.message) || ("HTTP " + res.status);

    // Model not available on this account → try the fallback model.
    // Any other error (bad file, auth, quota) won't improve by retrying.
    const code = data && data.error && (data.error.code || data.error.type);
    if (res.status === 404 || code === "model_not_found") continue;

    return jsonResponse(res.status >= 400 && res.status < 600 ? res.status : 502,
      { error: "OpenAI transcription failed: " + lastDetail });
  }

  return jsonResponse(502, { error: "No transcription model available: " + lastDetail });
}

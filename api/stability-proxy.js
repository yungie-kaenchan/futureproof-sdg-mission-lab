/**
 * FUTUREPROOF — Stability.ai Proxy (Netlify Function)
 *
 * Receives a base64-encoded photo + style preset from the avatar page,
 * forwards an image-to-image request to Stability.ai with the FUTUREPROOF
 * character-portrait prompt, and returns the generated image as base64.
 *
 * The Stability.ai API key is read from the STABILITY_API_KEY environment
 * variable — never sent to the browser.
 *
 * Configure in Netlify: Site Settings → Environment variables → Add
 *   STABILITY_API_KEY = sk-...
 */

const STABILITY_ENDPOINT = "https://api.stability.ai/v2beta/stable-image/generate/sd3";

// Cartoon (default per QC) — Pixar/DreamWorks-style 3D animation render.
// The realistic preset is kept for back-compat with any caller still
// passing the legacy style ids; the platform UI now only sends "cartoon".
const CARTOON_PROMPT = (subject) =>
  `Super-realistic 3D animation-style portrait of a cute, friendly cartoon character. ` +
  `Pixar / DreamWorks feature-film render quality. Soft volumetric studio lighting, ` +
  `vibrant colourful palette, large expressive eyes, gentle warm smile, ` +
  `head-and-shoulders crop facing the viewer, smooth subsurface-scattered skin, ` +
  `detailed hair shading, clean soft-gradient background. Wholesome, modern, ` +
  `professional-quality animated film aesthetic. ${subject}`.trim();

const CARTOON_NEGATIVE =
  "photorealistic human, dull desaturated palette, monochrome, sketch, line art, " +
  "low quality, deformed, distorted face, extra limbs, watermark, text, signature, " +
  "blurry, multiple subjects, scary, uncanny, gritty, dark, horror";

const REALISTIC_PROMPT = (subject) =>
  `Stylized professional character portrait, semi-realistic, cinematic lighting, ` +
  `dark professional aesthetic, mission-console operative, ` +
  `looking directly at viewer, head-and-shoulders crop, neutral background, ` +
  `editorial photography, sharp focus, high detail. ${subject}`.trim();

const REALISTIC_NEGATIVE =
  "low quality, deformed, distorted face, extra limbs, watermark, text, signature, " +
  "cartoon, anime, oversaturated, blurry, multiple subjects";

const STYLE_NOTES = {
  cartoon:    "cheerful, expressive, approachable, light-hearted",
  classic:    "professional posture, calm composed expression",
  field:      "alert focused expression, subtle field-jacket suggestion",
  diplomat:   "confident open expression, clean tailored silhouette",
  scholar:    "thoughtful contemplative expression, soft natural lighting",
};

const MAX_INPUT_BYTES = 4 * 1024 * 1024;

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json", ...cors },
    body: JSON.stringify(body),
  };
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: cors, body: "" };
  if (event.httpMethod !== "POST") return jsonResponse(405, { error: "Method not allowed" });

  const apiKey = process.env.STABILITY_API_KEY;
  if (!apiKey) {
    return jsonResponse(500, {
      error: "Server is missing STABILITY_API_KEY. Ask Aj. Yungie to set it in Netlify env vars.",
    });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(400, { error: "Invalid JSON" });
  }

  const { imageBase64, style = "classic", subjectHint = "" } = payload;
  if (!imageBase64 || typeof imageBase64 !== "string") {
    return jsonResponse(400, { error: "imageBase64 is required" });
  }
  if (imageBase64.length > MAX_INPUT_BYTES * 1.4) {
    return jsonResponse(413, { error: "Source image is too large. Try a smaller photo." });
  }

  const isCartoon = String(style).toLowerCase() === "cartoon";
  const styleNote = STYLE_NOTES[style] || STYLE_NOTES.cartoon;
  const promptFn = isCartoon ? CARTOON_PROMPT : REALISTIC_PROMPT;
  const negPrompt = isCartoon ? CARTOON_NEGATIVE : REALISTIC_NEGATIVE;
  const prompt = promptFn([styleNote, subjectHint].filter(Boolean).join(", "));

  // Decode base64 → Buffer for multipart/form-data submission to Stability.
  const imgBuffer = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ""), "base64");
  const formData = new FormData();
  formData.append("image", new Blob([imgBuffer], { type: "image/png" }), "input.png");
  formData.append("prompt", prompt);
  formData.append("negative_prompt", negPrompt);
  formData.append("strength", "0.65");
  formData.append("mode", "image-to-image");
  formData.append("output_format", "png");

  let response;
  try {
    response = await fetch(STABILITY_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "image/*",
      },
      body: formData,
    });
  } catch (err) {
    return jsonResponse(502, { error: `Could not reach Stability.ai: ${err.message}` });
  }

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    return jsonResponse(response.status, {
      error: `Stability.ai responded ${response.status}`,
      detail: text.slice(0, 600),
    });
  }

  const arrayBuffer = await response.arrayBuffer();
  const out = Buffer.from(arrayBuffer).toString("base64");

  return jsonResponse(200, {
    imageBase64: `data:image/png;base64,${out}`,
    prompt,
    style,
  });
}

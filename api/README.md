# Netlify Functions — `api/`

Serverless functions deployed alongside the static site. Configured in
[`../netlify.toml`](../netlify.toml) with `functions = "api"`.

## Functions

| File | Endpoint | Purpose |
|---|---|---|
| `stability-proxy.js` | `/.netlify/functions/stability-proxy` | Image-to-image avatar generation via Stability.ai (Day 5) |

Future additions (per CLAUDE.md):

- `claude-proxy.js` — Claude API proxy for scenario generation, AI Judge evaluation, Field Mentor (Day 6+)

## Required environment variables

Set these in **Netlify → Site settings → Environment variables**. Never commit them.

| Variable | Used by | Notes |
|---|---|---|
| `STABILITY_API_KEY` | `stability-proxy.js` | Stability.ai key from platform.stability.ai |
| `ANTHROPIC_API_KEY` | (Day 6) `claude-proxy.js` | Claude API key from console.anthropic.com |

## Local development

The static `python3 -m http.server` running in dev does **not** execute these
functions. To exercise them locally:

```bash
npm i -g netlify-cli
netlify dev
```

`netlify dev` runs the functions and the static site together on a single
local origin. Set the env vars in `.env` (which is gitignored).

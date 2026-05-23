# Voice for Change — Certificate & Badge artwork

This folder holds the **base PNG artwork** for the Final Task's
certificate and badge. The runtime overlays the student's name,
date, six SDG keystone icons, and avatar dynamically — the artwork
files here are **text-free** ceremonial bases.

## Expected files

| File | Aspect | Notes |
|---|---|---|
| `voice-for-change-certificate-base.png` | 2480 × 3508 (A4 portrait, 300 DPI) | Editorial certificate with reserved negative-space zones for runtime text overlay. |
| `voice-for-change-badge-base.png` | 1024 × 1024 PNG (transparent centre) | Hexagonal medallion with six SDG-color vertex nodes and a transparent centre for avatar overlay. |

## Production prompts

Both image-generation prompts live in
`scenarios/PRODUCTION-PROMPTS-MASTER-v2.md` (under "Voice for Change
artwork" — to be appended in the next master update) and were also
delivered inline in the Final Task build conversation.

## Graceful fallback

The Final Task page detects whether each file is present at its
expected path. If missing, the runtime renders a clean CSS-only
fallback (gold + obsidian, geometric), so the page is always
functional even before the art lands.

## QA checklist before commit

- [ ] Filename matches exactly (case-sensitive, hyphens not underscores)
- [ ] Magic bytes match the extension (`file -b filename` returns "PNG image data, …")
- [ ] Resolution matches the spec above
- [ ] Negative-space zones are truly empty — no baked-in text
- [ ] File size ≤ 2 MB after pngquant
- [ ] HTTP returns 200 against the local server

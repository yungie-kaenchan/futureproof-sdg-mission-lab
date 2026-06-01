# FUTUREPROOF — Moving to a New (Windows) Laptop

This guide gets the project running on a fresh Windows machine with Claude Code.
Everything you need is in this folder (you unzipped `futureproof-project-FULL.zip`),
**except** `node_modules/` and the git history — both are restored in the steps below.

---

## 1. Install the prerequisites (one time)

| Tool | Where | Notes |
|------|-------|-------|
| **Node.js LTS** | https://nodejs.org | gives you `node` + `npm`. Pick the LTS installer. |
| **Git for Windows** | https://git-scm.com/download/win | for version control + pushing to GitHub. |
| **Claude Code** | per Anthropic's install docs | the CLI you used on the Mac. |
| **VS Code** (optional) | https://code.visualstudio.com | comfortable editor. |
| **7-Zip** (recommended) | https://www.7-zip.org | unzips Thai-named files correctly (Windows' built-in unzip sometimes mangles UTF-8 filenames like `เกณฑ์การตัดสิน`). |

> **Unzip with 7-Zip**, not the built-in Windows extractor, so the Thai folder/file
> names (`เกณฑ์การตัดสิน`, the `หนังสือเข้าร่วม…` PDFs) survive intact.

---

## 2. Get the project onto the laptop — choose ONE path

### Path A — Git clone (recommended; needs internet)
This pulls the full code + commit history + the GitHub remote already wired, so you
can keep pushing immediately.

```powershell
git clone https://github.com/yungie-kaenchan/futureproof-sdg-mission-lab.git futureproof-project
```

Then copy these **untracked** folders/files **from this unzipped bundle** INTO the
cloned `futureproof-project` folder (git does NOT have them):

- `เกณฑ์การตัดสิน/`  ← your competition submission PDFs, poster, Thai application docs
- `assets/intro/`
- `docs/document-design/covers/`
- `config.local.js`  (placeholder stub — see step 4)

### Path B — Use this bundle as-is (offline / simplest)
The unzipped folder already contains every working file. Just reconnect git when ready:

```powershell
cd futureproof-project
git init
git remote add origin https://github.com/yungie-kaenchan/futureproof-sdg-mission-lab.git
git fetch origin
git reset --soft origin/main      # re-attaches history without overwriting your files
```

---

## 3. Install dependencies + build

```powershell
cd futureproof-project
npm install            # restores node_modules (~14 MB)
npm run build          # compiles src/input.css -> styles.css (Tailwind)
```

For active work, `npm run dev` watches and recompiles CSS on every change.

---

## 4. The config file (`config.local.js`)

This file holds **only placeholders** (`MISSING_API_KEY`, etc.) — it is NOT secret.
The real Firebase keys live in **Netlify environment variables**, never on disk, and
`scripts/inject-config.js` regenerates this file at deploy time from those vars.

- For **local preview** the placeholders are fine; Firebase-backed features (login,
  saving) simply won't connect locally — the UI degrades gracefully.
- To test Firebase locally, paste your real Firebase web-config values into
  `config.local.js` (it's gitignored, so it never gets committed).

---

## 5. Preview the site locally

Any static server works. Two easy options:

```powershell
npx serve .            # then open the printed http://localhost:3000
# or
python -m http.server 8000      # if you installed Python; open http://localhost:8000
```

Open `index.html` (the splash) or `home.html`.

---

## 6. Deploy (unchanged — it's all on Netlify + GitHub)

Deployment is automatic: **push to `main` → Netlify rebuilds** (`netlify.toml` runs
`inject-config.js` + `npm run build`). Nothing about the host changed by moving laptops.

```powershell
git add -A
git commit -m "..."
git push
```

---

## 7. ⚠️ One thing that is macOS-only: the document → PDF pipeline

The `.docx` generators in `scripts/` (e.g. `build_rubrics.py`, `build_manual.py`) work
cross-platform for the **Word file** (they use `python-docx`). But the **automatic
.docx → PDF export** in `scripts/fp_docgen.py` (`to_pdf()`) drives **macOS Microsoft
Word via AppleScript (`osascript`)** — that will **not run on Windows**.

On Windows you have three options to get PDFs:
1. **Open the generated `.docx` in Word → File ▸ Save As ▸ PDF** (simplest, and gives
   you the "hand-finished" feel anyway).
2. Install the `docx2pdf` Python package (`pip install docx2pdf`) which drives Word via
   COM on Windows, then swap the `to_pdf()` body to call it. (Ask Claude Code to do this.)
3. Use LibreOffice headless: `soffice --headless --convert-to pdf file.docx`.

The already-built PDFs in `docs/` are included in this bundle, so you don't need to
regenerate anything unless you edit the source content.

> Python deps for the doc scripts: `pip install python-docx`. (Pillow only if you
> regenerate favicons.)

---

## 8. First thing to do in Claude Code on the new laptop

Open the project folder and let Claude Code read **`CLAUDE.md`** — it's the full project
context (architecture, design system, conventions, roadmap). Everything Claude needs to
continue is in there.

---

### Quick sanity checklist
- [ ] `npm install` ran clean
- [ ] `npm run build` produced/updated `styles.css`
- [ ] `npx serve .` shows the landing page with the background video
- [ ] `git remote -v` points at the GitHub repo
- [ ] `เกณฑ์การตัดสิน/` folder is present with the submission PDFs (Thai names intact)
- [ ] Claude Code can read `CLAUDE.md`

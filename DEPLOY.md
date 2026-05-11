# Deployment Runbook — FUTUREPROOF

Step-by-step guide for taking the platform from this repo to a live URL with working AI, scenario generation, avatar generation, and seeded demo data. Target audience: Aj. Yungie. Time budget: ~90 minutes for a clean deploy if all accounts are already provisioned, ~3 hours if starting from scratch.

The architecture splits between two clouds:

- **Netlify** — static site (HTML/Tailwind/JS) + Netlify Functions (Claude proxy, Stability proxy)
- **Firebase** — Auth, Realtime Database, Storage, Cloud Functions (token ledger recompute, deletion, Hall submission validation)

You'll touch them in that order.

---

## 0. One-time accounts

Skip any you already have.

| Account | URL | What for | Free-tier? |
|---|---|---|---|
| Netlify | netlify.com | Hosting + Functions | Yes (300 build min/mo, 125k function invocations/mo) |
| Firebase / Google Cloud | console.firebase.google.com | Auth, DB, Storage, Cloud Functions | Yes for everything except Cloud Functions (Blaze plan with $0 floor) |
| Anthropic | console.anthropic.com | Claude API | Pay-as-you-go ($0 floor) |
| Stability.ai | platform.stability.ai | Avatar generation | Pay-as-you-go ($0 floor) |
| GitHub | github.com | Source control + Netlify auto-deploy | Free |

Keep all keys in a password manager. None of them belong in this repo.

---

## 1. Push to GitHub (5 min)

```bash
cd /Users/yungie/futureproof-project
git init
git add .
git commit -m "FUTUREPROOF: 20-day sprint complete"
gh repo create futureproof-sdg-mission-lab --public --source=. --push
```

If you don't use `gh`, create the repo at github.com/new manually, then `git remote add origin …` and `git push -u origin main`.

`config.local.js`, `.env`, `node_modules/` are already in `.gitignore`.

---

## 2. Provision Firebase (15 min)

1. Visit <https://console.firebase.google.com> → **Add project** → name it `futureproof-prod`.
2. **Enable services**:
   - **Authentication** → Sign-in method → enable **Email/Password**.
   - **Realtime Database** → Create database → location **asia-southeast1** (Singapore) → start in **locked mode** (we'll deploy our rules in step 5).
   - **Storage** → Get started → keep default location → keep locked mode.
3. **Project Settings → General**: copy the web-app config snippet (`apiKey`, `authDomain`, `databaseURL`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`).
4. **Project Settings → Service accounts** → Generate new private key. Save the JSON; you'll need it for the seed script in step 8.
5. **Upgrade to Blaze plan** (required for Cloud Functions). Cloud Functions usage stays on the free tier for typical pilot loads — Blaze just unlocks the deploy. Set a budget alert at $5/month for safety.

---

## 3. Local config (5 min)

Create `config.local.js` from the template, with the values from step 2.3:

```bash
cp config.example.js config.local.js
$EDITOR config.local.js
```

Test locally:

```bash
npm install                  # one-time
npm run dev                  # in one terminal — Tailwind watcher
npx http-server . -p 8000    # in another terminal — static server
```

Visit <http://localhost:8000> and walk the flow. Sign-up should now create real accounts. Consent and assessment should write to your Firebase project. Avatar generation will not work locally because Netlify Functions don't run on `http-server` — see step 4.

---

## 4. Deploy to Netlify (15 min)

### 4a. Connect repo

1. Visit <https://app.netlify.com> → **Add new site → Import from GitHub** → select `futureproof-sdg-mission-lab`.
2. Build command: `npm run build` (already in `netlify.toml`). Publish dir: `.`. Functions dir: `api`.
3. Click **Deploy site**.

The first deploy takes ~2 minutes. Build will succeed but the Claude/Stability functions will return 500 until you set env vars.

### 4b. Set environment variables

**Site settings → Environment variables → Add a variable** (set scope to "All deploys"):

| Key | Value |
|---|---|
| `ANTHROPIC_API_KEY` | sk-ant-… (from console.anthropic.com) |
| `STABILITY_API_KEY` | sk-… (from platform.stability.ai) |

Trigger a new deploy: **Deploys → Trigger deploy → Clear cache and deploy site**.

### 4c. Inject Firebase config at build time

The `config.local.js` is gitignored so it doesn't leak to GitHub. To get the same config into the Netlify build, set additional env vars and add a tiny build step.

**Site settings → Environment variables → add**:

| Key | Value |
|---|---|
| `FIREBASE_API_KEY` | your apiKey |
| `FIREBASE_AUTH_DOMAIN` | your authDomain |
| `FIREBASE_DATABASE_URL` | your databaseURL |
| `FIREBASE_PROJECT_ID` | your projectId |
| `FIREBASE_STORAGE_BUCKET` | your storageBucket |
| `FIREBASE_MESSAGING_SENDER_ID` | your messagingSenderId |
| `FIREBASE_APP_ID` | your appId |

Then update `netlify.toml`:

```toml
[build]
  command = "node scripts/inject-config.js && npm run build"
  publish = "."
  functions = "api"
```

Commit `scripts/inject-config.js` (provided in this repo — it reads the env vars and writes `config.local.js` at build time). Push. The next deploy will have a working `config.local.js` on the live site.

### 4d. Custom subdomain

In Netlify: **Domain settings → Add custom domain** → `futureproof.yungie.one`. Follow the DNS instructions (CNAME from `futureproof` to `your-site.netlify.app`). DNS propagates in 5–60 minutes.

---

## 5. Deploy Firebase security rules + Cloud Functions (20 min)

```bash
npm install -g firebase-tools
firebase login
cd /Users/yungie/futureproof-project
firebase init        # choose: Realtime Database, Storage, Functions
                     # use existing project: futureproof-prod
                     # functions language: JavaScript
                     # functions location: functions/  (already set up)
                     # use the existing files when prompted
```

Deploy in order:

```bash
firebase deploy --only database     # security rules from database.rules.json
firebase deploy --only storage      # storage.rules
firebase deploy --only functions    # cloud functions
```

If the rules deploy fails with parse errors, paste the rules from [`docs/firebase-security-rules.md`](docs/firebase-security-rules.md) section 2 directly into the Firebase console (Realtime Database → Rules) for a quick test, then iterate the JSON.

---

## 6. Promote yourself to admin (2 min)

After signing up through `pages/signup.html`, your account exists in Firebase Auth but has no admin claim yet. Run this once from your terminal:

```bash
node -e "
const admin = require('firebase-admin');
admin.initializeApp({ credential: admin.credential.cert(require('./service-account.json')) });
admin.auth().getUserByEmail('payungsak.kaenchan@gmail.com').then(u =>
  admin.auth().setCustomUserClaims(u.uid, { role: 'admin' })
).then(() => { console.log('done'); process.exit(0); });
"
```

Sign out and back in for the claim to take effect.

---

## 7. Verify the live site (10 min)

Walk this checklist on `https://futureproof.yungie.one`:

- [ ] Landing page renders, ticker animates, CC link works
- [ ] Sign-up creates a Firebase Auth user
- [ ] Consent submission writes to `/consents/$uid/2026-05-12`
- [ ] Readiness check writes `/users/$uid/learnerProfile`
- [ ] Avatar upload returns a generated portrait (Stability proxy ↔ env vars)
- [ ] Mission select renders 17 SDG tiles; locking in writes `/scenarios/$sid`
- [ ] Mission shell loads with token bar, Field Mentor drawer, Shop drawer
- [ ] Field Mentor returns a Claude reply (Claude proxy ↔ env vars)
- [ ] Studio loads; PDF export works; audio recording works in Chrome
- [ ] Hall of Excellence loads
- [ ] Admin dashboard loads with TEACHER MODE label

If any check fails, see **Troubleshooting** at the bottom.

---

## 8. Seed demo data (5 min)

```bash
export FIREBASE_DATABASE_URL='https://your-project-default-rtdb.asia-southeast1.firebasedatabase.app'
export FIREBASE_SERVICE_ACCOUNT="$(cat service-account.json)"
npm install firebase-admin
node scripts/seed-sample-data.js
```

After this you'll have 3 demo students (B1 / B1+ / C1), 3 teams, 3 scenarios, 3 Pitch Capsules in the Hall.

Hand the demo URLs + credentials to the judges in a separate document — never paste them into the submission narrative.

---

## 9. Final pre-submission checklist (Day 20)

- [ ] All flows verified on live URL (step 7)
- [ ] Demo data seeded (step 8)
- [ ] Video demo recorded
- [ ] Thai translations of submission docs in place
- [ ] DPIA cohort fields populated (cohort size, residual-risk acceptance)
- [ ] Submission narrative final
- [ ] Demo credentials in a separate document
- [ ] Live URL works on a phone, on a tablet, and in incognito
- [ ] Submission package zipped
- [ ] Submitted by 10:00 ICT on May 30

---

## Troubleshooting

| Symptom | First check |
|---|---|
| Sign-up returns "API key not valid" | `FIREBASE_API_KEY` env var not set in Netlify, or build didn't re-run after setting it |
| Avatar returns 500 | `STABILITY_API_KEY` missing in Netlify env; or Stability account out of credits |
| Field Mentor returns "could not reach Claude" | `ANTHROPIC_API_KEY` missing; or rate limit (wait 60 sec) |
| Security rules deny everything | Forgot to set the `role: 'student'` custom claim. Check `onUserCreate` Cloud Function logs |
| Token balance always 0 | `recomputeBalance` Cloud Function not deployed or failing — check Functions logs |
| `firebase deploy` hangs | Run with `--debug`; usually billing-account / IAM not yet propagated (try again in 5 min) |
| PDF export blank | html2pdf needs `useCORS: true` (already set); on iOS Safari, try Chrome instead |

---

## Day-2 operations (when the platform is in pilot)

- **Daily**: scan Admin → Moderation for any AI outputs students flagged.
- **Weekly**: 5% sample of AI Judge scores audited against teacher scoring (calibration check).
- **Quarterly**: security rules formal review with Mahidol DPO.
- **Per-cohort**: regenerate scenario bank if Local Lens needs refreshing.

---

**Questions during deployment:** keep a log of any step that surprised you, and we'll refine this runbook for the next deploy.

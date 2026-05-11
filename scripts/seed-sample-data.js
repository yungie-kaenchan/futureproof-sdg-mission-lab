#!/usr/bin/env node
/**
 * FUTUREPROOF — Sample Data Seeder
 *
 * Populates a Firebase Realtime Database with three demo students at three
 * proficiency levels, three teams, three frozen scenarios, complete decision
 * histories, and three sample Pitch Capsules ready for Hall of Excellence
 * curation.
 *
 * Use: provide a Firebase service-account JSON via FIREBASE_SERVICE_ACCOUNT,
 * then run `node scripts/seed-sample-data.js`. The script is idempotent —
 * re-running overwrites the demo paths but leaves real student data alone
 * (it only writes paths prefixed with `demo_`).
 *
 * Required env:
 *   FIREBASE_DATABASE_URL=https://<project>-default-rtdb.<region>.firebasedatabase.app
 *   FIREBASE_SERVICE_ACCOUNT=<JSON of service-account key>
 */

import { initializeApp, cert } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";

const dbUrl = process.env.FIREBASE_DATABASE_URL;
const svcRaw = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!dbUrl || !svcRaw) {
  console.error("Missing FIREBASE_DATABASE_URL or FIREBASE_SERVICE_ACCOUNT.");
  process.exit(1);
}

initializeApp({ credential: cert(JSON.parse(svcRaw)), databaseURL: dbUrl });
const db = getDatabase();

const NOW = Date.now();

const DEMO_USERS = [
  { uid: "demo_a2",  name: "Aria",   institution: "MUIC", year: 2, cefr: "B1",  vocab: 60, ct: 55, ana: 58, coll: 0.72 },
  { uid: "demo_b1",  name: "Khem",   institution: "MU",   year: 3, cefr: "B1+", vocab: 72, ct: 68, ana: 71, coll: 0.85 },
  { uid: "demo_c1",  name: "Niran",  institution: "TU",   year: 4, cefr: "C1",  vocab: 92, ct: 88, ana: 90, coll: 0.91 },
];

const DEMO_TEAMS = [
  { tid: "demo_atlas",    members: ["demo_a2", "demo_b1", "demo_c1"], sdg: 6,  scenarioTitle: "The Chao Phraya Salt Wedge",   currentMission: "mission06", tokens: 78, integrity: 0.84 },
  { tid: "demo_north",    members: ["demo_b1"],                      sdg: 13, scenarioTitle: "The Burning Season Decision",  currentMission: "mission06", tokens: 65, integrity: 0.79 },
  { tid: "demo_songkhla", members: ["demo_a2", "demo_c1"],            sdg: 14, scenarioTitle: "Songkhla Lake's Last Rinse",   currentMission: "mission06", tokens: 92, integrity: 0.88 },
];

async function seedUsers() {
  for (const u of DEMO_USERS) {
    await db.ref(`users/${u.uid}/profile/public`).set({
      displayName: u.name,
      rank: "ambassador",
      joinedAt: NOW - 30 * 86400_000,
      institution: u.institution,
      avatarUrl: null,
    });
    await db.ref(`users/${u.uid}/profile/private`).set({
      email: `encrypted:demo:${u.uid}@example.invalid`,
      yearOfStudy: u.year,
      consentVersion: "2026-05-12",
      lastActiveAt: NOW,
    });
    await db.ref(`users/${u.uid}/learnerProfile`).set({
      cefrEstimate: u.cefr,
      vocabularyScore: u.vocab,
      criticalThinkingPercentile: u.ct,
      analyticalPercentile: u.ana,
      collaborationOrientation: u.coll,
      assessedAt: NOW - 28 * 86400_000,
      version: 1,
    });
    await db.ref(`consents/${u.uid}/2026-05-12`).set({
      ts: NOW - 29 * 86400_000,
      version: "2026-05-12",
      lang: "en",
      flags: { basicProfile: true, photo: true, voice: true, decisionLog: true },
    });
  }
}

async function seedTeams() {
  for (const t of DEMO_TEAMS) {
    const memberMap = {};
    t.members.forEach((m, i) => {
      memberMap[m] = ["researchAnalyst", "communicationsDirector", "ethicsOfficer"][i] || "researchAnalyst";
    });
    await db.ref(`teams/${t.tid}`).set({
      name: t.tid,
      classId: "demo_class",
      members: memberMap,
      createdAt: NOW - 25 * 86400_000,
      currentMission: t.currentMission,
      missionStatus: "complete",
      selectedSDG: t.sdg,
      scenarioId: `scn_${t.tid}`,
      tokens: t.tokens,
      integrityScore: t.integrity,
    });
    await db.ref(`scenarios/scn_${t.tid}`).set({
      sdg: t.sdg,
      title: t.scenarioTitle,
      context: "(Seeded scenario — see scenarios doc for full content.)",
      thaiContext: "(Local Lens here.)",
      stakeholders: [],
      decisionPoint: "(Seeded.)",
      ethicalAxes: [],
      generatedBy: "claude-sonnet-4-7",
      promptVersion: "scn_v3",
      generatedAt: NOW - 25 * 86400_000,
      frozen: true,
    });
    // Token ledger
    await db.ref(`tokens/${t.tid}/balance`).set(t.tokens);
    const ledgerRef = db.ref(`tokens/${t.tid}/ledger`);
    for (let i = 0; i < 6; i++) {
      await ledgerRef.push({
        ts: NOW - (20 - i * 3) * 86400_000,
        delta: 12 + (i % 3) * 4,
        reason: `mission${String(i+1).padStart(2,"0")}_judgment`,
        missionId: `${t.tid}_mission${String(i+1).padStart(2,"0")}`,
      });
    }
    // A handful of decisions per mission
    for (let m = 1; m <= 6; m++) {
      const missionId = `${t.tid}_mission${String(m).padStart(2,"0")}`;
      await db.ref(`missions/${missionId}`).set({
        tid: t.tid,
        missionNumber: m,
        missionCode: ["RECON","DECODE","DEPLOY","DISSECT","TRIBUNAL","FORGE"][m-1],
        status: "complete",
        startedAt: NOW - (20 - m * 3) * 86400_000,
        completedAt: NOW - (18 - m * 3) * 86400_000,
      });
      const decRef = db.ref(`decisions/${missionId}`);
      await decRef.push({
        ts: NOW - (19 - m * 3) * 86400_000,
        byUid: t.members[0],
        decisionType: "rationale",
        chosen: "primary",
        rationale: "(Seeded rationale — would normally contain student writing.)",
        aiEvaluation: { tokensAwarded: 14 + m, feedback: "(Seeded feedback.)" },
      });
    }
    // Pitch Capsule artifact
    await db.ref(`artifacts/${t.tid}`).set({
      panels: {
        "01": { title: "The Crisis",   content: "Seeded crisis content." },
        "02": { title: "The Journey",  content: "Seeded journey content." },
        "03": { title: "The Insight",  content: "Seeded insight content." },
        "04": { title: "The Solution", content: "Seeded solution content." },
        "05": { title: "The Voice",    content: "Seeded voice transcript." },
      },
      templateId: "console_classic",
      lastSavedAt: NOW - 86400_000,
      submittedToHallAt: NOW - 12 * 3600_000,
      consentToFeature: true,
    });
    await db.ref(`hallOfExcellence/${t.tid}`).set({
      tid: t.tid,
      submittedAt: NOW - 12 * 3600_000,
      approvedAt: NOW - 4 * 3600_000,
      approvedBy: "demo_admin",
      featured: true,
      publishedSlug: t.tid,
    });
  }
}

async function main() {
  console.log("Seeding demo data…");
  await seedUsers();
  await seedTeams();
  console.log("Done.");
  process.exit(0);
}

main().catch((err) => { console.error(err); process.exit(1); });

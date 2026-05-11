/**
 * FUTUREPROOF — Insight Tokens
 *
 * Append-only ledger writes. The recompute of `balance` is the responsibility
 * of a server-side Cloud Function (per security rules), so client writes only
 * land in /tokens/$tid/ledger. We optimistically reflect the local balance
 * for snappy UI; the canonical balance comes from server reads.
 */

import { isFirebaseAvailable } from "./auth.js";

export const SHOP_ITEMS = [
  { id: "expertConsultant", label: "Expert Consultant",      cost: 15, hint: "One strategic AI question per mission." },
  { id: "languageCoach",    label: "Language Coach Session", cost: 10, hint: "Detailed AI feedback on a draft." },
  { id: "premiumTemplate",  label: "Premium Design Template",cost: 20, hint: "Upgraded Pitch Capsule layout." },
  { id: "hintReveal",       label: "Hint Reveal",            cost:  5, hint: "Unlock one hidden data point." },
  { id: "decisionReplay",   label: "Decision Replay",        cost: 25, hint: "Redo one decision point." },
  { id: "pronunciationDrill", label: "Pronunciation Drill",  cost: 10, hint: "AI-guided pronunciation practice." },
];

export async function awardTokens({ tid, delta, reason, missionId, decisionId }) {
  if (!tid || !isFirebaseAvailable()) return null;
  const fb = await import("./firebase-init.js");
  return fb.appendChild(`${fb.paths.tokens(tid)}/ledger`, {
    delta, reason, missionId, decisionId: decisionId || null,
  });
}

export async function getBalance(tid) {
  if (!tid || !isFirebaseAvailable()) return null;
  const fb = await import("./firebase-init.js");
  const ledger = await fb.readPath(`${fb.paths.tokens(tid)}/ledger`);
  if (!ledger) return 0;
  let balance = 0;
  for (const k of Object.keys(ledger)) {
    const entry = ledger[k];
    if (entry && typeof entry.delta === "number") balance += entry.delta;
  }
  return balance;
}

export async function spendTokens({ tid, item }) {
  const balance = (await getBalance(tid)) ?? 0;
  if (balance < item.cost) {
    throw new Error(`Not enough tokens. ${item.cost - balance} short.`);
  }
  return awardTokens({ tid, delta: -item.cost, reason: `shop:${item.id}` });
}

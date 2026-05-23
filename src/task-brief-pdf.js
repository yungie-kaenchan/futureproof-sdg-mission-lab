/**
 * FUTUREPROOF — Voice for Change · Task Brief PDF generator
 *
 * Wires the "Download task brief (PDF)" button on pages/final-task.html.
 * Generates a structured, searchable, accessible A4 PDF containing:
 *
 *   1. The full grant brief / scenario letter
 *   2. The 5-step "How this task works" instructions
 *   3. The five-part proposal requirements (with examples)
 *   4. The full Rubric A (5 dimensions × 4 score levels)
 *   5. The audience list (real Thai institutions, EN + TH)
 *
 * Uses jsPDF text() (not html2canvas) so the PDF is *real text* —
 * searchable, copy-paste-able, accessible to screen-readers, and
 * file-size light (~30-60 KB).
 */

const FILENAME = "FUTUREPROOF-Voice-for-Change-Task-Brief.pdf";

/* ── Authored content (matches what's on the page) ───────────────── */

const SCENARIO = {
  title: "The Thailand SDG Catalyst Grant · 2026",
  titleTh: "ทุน SDG ประเทศไทย ประจำปี 2026 (สถานการณ์จำลอง)",
  amount: "B 1,000,000 (pretend grant — classroom simulation)",
  funders: [
    "Ministry of Higher Education, Science, Research and Innovation (MHESI)",
    "UNDP Thailand",
  ],
  paragraphs: [
    "Imagine that the Thai government and the United Nations have started a new grant programme. Each year, they choose ONE student team to receive one million baht for a community project that helps Thailand meet the Sustainable Development Goals.",
    "Now imagine this: YOU have been chosen as a finalist.",
    "Over the past weeks, you visited six Thai communities through this platform: Khon Kaen (the dry-season aquifer), Chiang Mai (the burning season), Bangkok (the klong and the flood corridor), the Andaman coast (the reef and the tourism quota), Mae Sot (the migrant children's schools), and the EEC fringe villages (the elder-and-child households). You read their stories. You heard the people speak. You made hard choices.",
    "The grant committee will meet next Friday. They will not give the money to a slogan or a wish. They will give it to ONE proposal that follows the five rules below.",
    "You will not present in person. You will record a proposal between 2 and 5 minutes long — audio or video — and submit it with a written transcript.",
    "This is a CLASSROOM SIMULATION. No real money is awarded. What you ARE learning is real: how to argue for something that matters, in English that a Thai institution can act on. Take it seriously — that is the skill you will carry into your career.",
  ],
  signoff: "— Dr. Payungsak Kaenchan · Programme Director · FUTUREPROOF",
};

const STEPS = [
  { num:1, h:"Read the situation",            p:"You will be given a pretend scenario: you have been shortlisted for a one-million-baht Thai SDG grant. The grant is NOT real — it is a classroom simulation. Your job is to speak as if it were real, because that is how you learn to argue under pressure." },
  { num:2, h:"Pick one Thai audience",         p:"You will choose ONE real Thai institution to address — for example, the BMA Drainage Department or UNDP Thailand. You are speaking to THEM, not to your teacher. The platform records your choice; it does not send anything to the institution." },
  { num:3, h:"Use your evidence trail",        p:"The platform shows your six commitments from the six missions you completed — in your own words. Use any of them. Use all of them. They prove your argument was earned, not invented." },
  { num:4, h:"Record a 2-5 minute proposal",    p:"You can record live (audio or video) or upload a file. The system writes a transcript for you while you speak. You can edit it before you submit. Aim for 200-500 words in your transcript." },
  { num:5, h:"Submit when you're ready",        p:"Your work goes to your teacher for grading with Rubric A — the rubric is below, so you can see exactly how you'll be marked. Three AI judges will also give you advisory feedback right after you submit, but they never replace your teacher's grade." },
];

const FIVE_PARTS = [
  { num:1, label:"The crisis",              hint:"What is the problem, and where? Say which community you are talking about. In one or two sentences, describe what is going wrong for them right now.", ex:"In the Mae Sot district of Tak province, more than 2,000 migrant children attend community learning centres that the Thai system does not yet recognise..." },
  { num:2, label:"Your one action",          hint:"What will you do, exactly? Propose ONE clear action — not three. Tell us who will do it, where, by when, and how much money (inside the B1,000,000 envelope).", ex:"Within 12 months, fund two bridging teachers in each of the 8 receiving Thai schools — B840,000 — and use the remaining B160,000 for shared learning materials." },
  { num:3, label:"Who it helps",             hint:"Be specific about the people. Not 'students' in general — which students, in which schools, in which province? Say how their lives will be different in concrete ways.", ex:"This helps roughly 600 migrant children currently enrolled in MLCs across Mae Sot district, ages 6-14." },
  { num:4, label:"The evidence",             hint:"Use what you learned in the missions. Quote at least THREE of your six commitments from the journey. The committee can tell when a proposal is built on real evidence and when it is built on a wish.", ex:"As I committed in the Burning Season mission, enforcement without alternative income is just a fine in disguise — that is why bridging staff, not deadlines, matter here." },
  { num:5, label:"The trade-off you accept", hint:"What will your action NOT do? Every choice has a cost. Name it. Pretending there is no cost is the fastest way to lose the committee's respect.", ex:"I accept that this plan does not reach the over-15 cohort this cycle. That is a real cost. I propose addressing them in Year 2, once the bridging staff are proven to work for the 6-14 group." },
];

const RUBRIC = [
  {
    num:1, dim:"Your English", weight:"× 1.0",
    what:"How well your English fits the audience — words, grammar, tone.",
    levels:[
      ["10","Excellent. Your English is clear and polite. You use words like 'would' and 'could' when you ask. Few small errors. Easy to understand."],
      [ "7","Good. Your English mostly fits the audience. A few word choices are too strong or too casual, but the meaning is clear."],
      [ "4","Some problems. Your tone is sometimes too academic or too casual for the audience. Mistakes sometimes get in the way."],
      [ "1","Many problems. Errors make the proposal hard to follow."],
    ],
  },
  {
    num:2, dim:"The Strength of Your Argument", weight:"× 1.0",
    what:"How well you defend your one proposed action — and whether you say what your action will NOT do.",
    levels:[
      ["10","Strong. You propose one concrete action. You use real evidence from the missions. You name the trade-off honestly."],
      [ "7","Mostly strong. You have an action and evidence, but you don't fully own the trade-off."],
      [ "4","Weak. You have an action but not real evidence. You avoid the trade-off."],
      [ "1","It is a wish or a slogan, not a real argument."],
    ],
  },
  {
    num:3, dim:"Speaking to a Real Audience", weight:"× 1.0",
    what:"Did you choose one real Thai institution and speak to THEM, not to your teacher?",
    levels:[
      ["10","Yes. You named a real Thai institution. Your tone and request fit who they are and what they can do."],
      [ "7","Mostly yes. You named the audience, but your tone slips in places."],
      [ "4","Vague. You said 'the public' or named the audience without changing your tone."],
      [ "1","You spoke to your teacher, not to a real audience."],
    ],
  },
  {
    num:4, dim:"Using Your Journey", weight:"× 1.0",
    what:"Did you use the six commitments you wrote at the end of each mission?",
    levels:[
      ["10","You used at least three of your six commitments. Your proposal is built on what you actually learned."],
      [ "7","You used two commitments well."],
      [ "4","You used one commitment, or you spoke about the missions in general."],
      [ "1","You did not refer back to the missions at all."],
    ],
  },
  {
    num:5, dim:"Following the Rules", weight:"× 0.5",
    what:"Length (2-5 minutes) and a transcript that matches what you said.",
    levels:[
      ["10","Length is in range. Transcript matches your speech."],
      [ "7","Length is fine. Transcript is mostly correct."],
      [ "4","Length is too short or too long. Transcript has gaps."],
      [ "1","Length or transcript breaks the rules of the submission."],
    ],
  },
];

const AUDIENCES = [
  ["SDG 6",  "Department of Groundwater Resources",                  "Krom Sapphayakorn Nam Badan"],
  ["SDG 13", "Pollution Control Department",                         "Krom Khwap Khum Mon Phit"],
  ["SDG 11", "BMA Department of Drainage and Sewerage",              "Samnak Kan Rabai Nam, Krungthep"],
  ["SDG 14", "Department of Marine and Coastal Resources (DMCR)",    "Krom Sapphayakorn Thanglet lae Chaifang"],
  ["SDG 4",  "Tak Primary Educational Service Area Office 2",        "Sopho. Tak Khet 2"],
  ["SDG 3",  "Provincial Public Health Office (Rayong / Chonburi)",  "Sosocho. Rayong / Chonburi"],
  ["Cross",  "Thai Youth SDG Forum",                                  "Wethi Yaowachon SDG"],
  ["Cross",  "UNDP Thailand",                                          "UNDP Prathet Thai"],
  ["Cross",  "Your local Provincial Council",                          "Sapha Changwat Khong Khun"],
];

/* ── PDF rendering helpers ────────────────────────────────────────── */

const M_LEFT = 18;       // mm
const M_RIGHT = 18;
const M_TOP = 18;
const M_BOTTOM = 20;
const PAGE_W = 210;
const PAGE_H = 297;
const CONTENT_W = PAGE_W - M_LEFT - M_RIGHT;

function makeRenderer(doc) {
  let y = M_TOP;

  function maybeBreak(needed) {
    if (y + needed > PAGE_H - M_BOTTOM) {
      doc.addPage();
      y = M_TOP;
      drawHeader(doc);
    }
  }

  function setFont(family, style, size) {
    try { doc.setFont(family, style); } catch (_) {}
    doc.setFontSize(size);
  }

  function setColor(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    doc.setTextColor(r, g, b);
  }

  function setDraw(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    doc.setDrawColor(r, g, b);
  }

  function text(s, x, opts) {
    const o = opts || {};
    if (o.font)  setFont(o.font[0], o.font[1], o.font[2]);
    if (o.color) setColor(o.color);
    const lines = doc.splitTextToSize(String(s || ""), o.width || CONTENT_W);
    doc.text(lines, x, y);
    y += (lines.length * (o.lineHeight || 5.6));
    if (o.gap) y += o.gap;
    return lines.length;
  }

  function rule(extra) {
    setDraw("#B58A3F");
    doc.setLineWidth(0.4);
    doc.line(M_LEFT, y, PAGE_W - M_RIGHT, y);
    y += (extra == null ? 6 : extra);
  }

  function badge(label, x, w) {
    setDraw("#B58A3F");
    doc.setFillColor(245, 235, 215);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, y - 4.2, w, 6.2, 1.5, 1.5, "FD");
    setFont("helvetica", "bold", 8);
    setColor("#8A6D3F");
    doc.text(label, x + 2.5, y);
    y += 3;
  }

  function section(title) {
    maybeBreak(20);
    y += 4;
    setFont("helvetica", "bold", 16);
    setColor("#0F1729");
    doc.text(title, M_LEFT, y);
    y += 4;
    rule(8);
  }

  return { y: () => y, maybeBreak, text, rule, badge, section, setFont, setColor };
}

function drawHeader(doc) {
  // Top brand bar — dark gold strip
  doc.setFillColor(15, 23, 41);
  doc.rect(0, 0, PAGE_W, 11, "F");
  doc.setFontSize(8);
  doc.setTextColor(232, 199, 122);
  try { doc.setFont("helvetica", "bold"); } catch (_) {}
  doc.text("FUTUREPROOF  —  SDGs MISSION JOURNEY", M_LEFT, 7);
  try { doc.setFont("helvetica", "normal"); } catch (_) {}
  doc.setTextColor(232, 199, 122);
  doc.text("Voice for Change · Final Task Brief", PAGE_W - M_RIGHT, 7, { align: "right" });
  doc.setTextColor(0, 0, 0);
}

function drawFooter(doc, pageNum, totalPages) {
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  try { doc.setFont("helvetica", "normal"); } catch (_) {}
  doc.text(
    "FUTUREPROOF — SDGs Mission Journey  ·  Classroom simulation — no real money is awarded  ·  Generated " + new Date().toLocaleDateString("en-GB"),
    M_LEFT, PAGE_H - 8
  );
  doc.text("Page " + pageNum + " of " + totalPages, PAGE_W - M_RIGHT, PAGE_H - 8, { align: "right" });
  doc.setTextColor(0, 0, 0);
}

/* ── Build the PDF ────────────────────────────────────────────────── */

function buildPdf() {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    alert("PDF library is still loading — please try again in a second.");
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  drawHeader(doc);
  const r = makeRenderer(doc);

  /* Title block */
  r.text("Voice for Change · Final Task Brief", M_LEFT, { font:["helvetica","bold",22], color:"#0F1729", lineHeight:8, gap:2 });
  r.text("FUTUREPROOF — SDGs Mission Journey · Classroom simulation", M_LEFT, { font:["helvetica","italic",11], color:"#8A6D3F", gap:6 });
  r.rule(8);

  /* 1 · The scenario letter */
  r.section("1 · The Grant Notification (Classroom Simulation)");
  r.text(SCENARIO.title, M_LEFT, { font:["helvetica","bold",14], color:"#0F1729", gap:2 });
  r.text(SCENARIO.titleTh + "  ·  " + SCENARIO.amount, M_LEFT, { font:["helvetica","italic",10], color:"#5D3A9B", gap:4 });
  r.text("Funders: " + SCENARIO.funders.join("  ·  "), M_LEFT, { font:["helvetica","normal",9.5], color:"#42526E", gap:6 });

  SCENARIO.paragraphs.forEach((p) => {
    r.maybeBreak(20);
    r.text(p, M_LEFT, { font:["helvetica","normal",11], color:"#0F1729", lineHeight:5.6, gap:3.5 });
  });
  r.text(SCENARIO.signoff, M_LEFT, { font:["helvetica","italic",11], color:"#42526E", gap:4 });

  /* 2 · How this task works — 5 steps */
  r.section("2 · How this task works (5 steps)");
  STEPS.forEach((s) => {
    r.maybeBreak(28);
    r.text("Step " + s.num + " — " + s.h, M_LEFT, { font:["helvetica","bold",12], color:"#B58A3F", gap:1.5 });
    r.text(s.p, M_LEFT, { font:["helvetica","normal",11], color:"#0F1729", lineHeight:5.4, gap:4 });
  });

  /* 3 · The five proposal parts */
  r.section("3 · What your proposal must contain (5 parts)");
  FIVE_PARTS.forEach((p) => {
    r.maybeBreak(36);
    r.text("Part " + p.num + " — " + p.label, M_LEFT, { font:["helvetica","bold",12], color:"#B58A3F", gap:1.5 });
    r.text(p.hint, M_LEFT, { font:["helvetica","normal",11], color:"#0F1729", lineHeight:5.4, gap:2 });
    r.text("Example: " + p.ex, M_LEFT + 3, { font:["helvetica","italic",10], color:"#42526E", lineHeight:5.0, width:CONTENT_W - 3, gap:5 });
  });

  /* 4 · Rubric A — 5 dimensions × 4 levels */
  r.section("4 · How you'll be graded (Rubric A — your teacher uses this)");
  r.text("Five dimensions. Your teacher gives a score at each level: 10 (excellent) / 7 (good) / 4 (some problems) / 1 (many problems). Weights as shown.", M_LEFT, { font:["helvetica","italic",10], color:"#42526E", lineHeight:5.0, gap:4 });
  RUBRIC.forEach((d) => {
    r.maybeBreak(48);
    r.text(d.num + ". " + d.dim + "  (" + d.weight + ")", M_LEFT, { font:["helvetica","bold",12], color:"#0F1729", gap:1.5 });
    r.text(d.what, M_LEFT, { font:["helvetica","italic",10], color:"#5D3A9B", lineHeight:5.0, gap:2 });
    d.levels.forEach((row) => {
      r.maybeBreak(10);
      r.text(row[0] + "  —  " + row[1], M_LEFT + 4, { font:["helvetica","normal",10.5], color:"#0F1729", lineHeight:5.2, width:CONTENT_W - 4, gap:1 });
    });
    // small spacer
    r.text(" ", M_LEFT, { font:["helvetica","normal",6], lineHeight:1, gap:1 });
  });

  /* 5 · Audiences */
  r.section("5 · Real Thai audiences you may address");
  r.text("Choose ONE. The platform records your choice but does not send anything to the institution.", M_LEFT, { font:["helvetica","italic",10], color:"#42526E", lineHeight:5.0, gap:4 });
  AUDIENCES.forEach((a) => {
    r.maybeBreak(12);
    r.text(a[0] + "  —  " + a[1], M_LEFT, { font:["helvetica","bold",11], color:"#0F1729", gap:0.5 });
    r.text(a[2], M_LEFT + 4, { font:["helvetica","italic",10], color:"#42526E", gap:3 });
  });

  /* Closing reminder */
  r.maybeBreak(30);
  r.rule(8);
  r.text("Remember", M_LEFT, { font:["helvetica","bold",12], color:"#A82424", gap:2 });
  r.text("This is a classroom simulation — no real money is awarded. The Thailand SDG Catalyst Grant is fictional. What is real is the skill you are learning: how to argue for a community proposal in English a Thai institution can act on. Your teacher grades the final result with Rubric A. AI judges only give advisory feedback.", M_LEFT, { font:["helvetica","italic",10.5], color:"#42526E", lineHeight:5.2, gap:0 });

  /* Footers */
  const total = doc.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    drawFooter(doc, i, total);
  }

  doc.save(FILENAME);
}

/* ── Wire up ──────────────────────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("brief-pdf-btn");
  if (!btn) return;
  btn.addEventListener("click", buildPdf);
});

/**
 * FUTUREPROOF — Pre-Scenario Disclaimer Modal
 *
 * Bilingual (EN / ไทย) modal shown to a user the first time they enter
 * any scenario. Per /docs/scenarios-disclaimer.md.
 *
 * Behaviour:
 *   - Scroll-to-bottom gate on the active language pane
 *   - "Acknowledge & continue" button enabled only after the gate fires
 *   - Acknowledgement persisted to localStorage AND best-effort to RTDB
 *     at users/{uid}/consent/scenarioDisclaimer-v1
 *   - Re-acknowledgement triggered if DISCLAIMER_VERSION increments
 *
 * Usage:
 *   import { ensureDisclaimerAcknowledged } from "./scenario-disclaimer.js";
 *   await ensureDisclaimerAcknowledged();  // resolves only after ack
 */

import { getFlowState, isFirebaseAvailable } from "../auth.js";

export const DISCLAIMER_VERSION = "v1";
const LS_KEY = `fp_scenario_disclaimer_${DISCLAIMER_VERSION}`;

/* ──────────────────────────────────────────────────────────────────
 * Public API
 * ──────────────────────────────────────────────────────────────── */

export function hasAcknowledged() {
  try {
    const v = localStorage.getItem(LS_KEY);
    return v && JSON.parse(v).acknowledged === true;
  } catch (_) { return false; }
}

/**
 * Show the disclaimer if not yet acknowledged. Resolves once acknowledged.
 * If already acknowledged, resolves immediately.
 */
export async function ensureDisclaimerAcknowledged() {
  if (hasAcknowledged()) return true;
  return await renderModalAndAwait();
}

/**
 * Show the disclaimer regardless of acknowledgement state (re-read).
 */
export async function showDisclaimer({ readOnly = false } = {}) {
  return await renderModalAndAwait({ readOnly });
}

/* ──────────────────────────────────────────────────────────────────
 * Modal renderer
 * ──────────────────────────────────────────────────────────────── */

function renderModalAndAwait({ readOnly = false } = {}) {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "scenario-disclaimer-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "disclaimer-title");
    overlay.innerHTML = renderModalHTML({ readOnly });
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    const cleanup = () => {
      document.body.style.overflow = "";
      overlay.remove();
    };

    const root = overlay.querySelector(".scenario-disclaimer-modal");
    const panes = overlay.querySelectorAll(".disclaimer-pane");
    const ackBtn = overlay.querySelector("#disclaimer-ack");
    const closeBtn = overlay.querySelector("#disclaimer-close");
    const langPills = overlay.querySelectorAll(".lang-pill-opt");
    const scrollGate = overlay.querySelector("#disclaimer-scroll-hint");

    let currentLang = "en";
    let scrolledToEnd = readOnly; // skip gate in read-only mode

    function refreshAckState() {
      if (readOnly) return;
      const ready = scrolledToEnd;
      ackBtn.disabled = !ready;
      ackBtn.classList.toggle("is-disabled", !ready);
      if (scrollGate) scrollGate.hidden = ready;
    }

    function switchLang(lang) {
      currentLang = lang;
      panes.forEach((p) => {
        const isActive = p.dataset.lang === lang;
        p.hidden = !isActive;
        if (isActive) {
          // Reset scroll position when switching, re-check gate
          p.scrollTop = 0;
          checkScrollEnd(p);
        }
      });
      langPills.forEach((pill) => pill.classList.toggle("is-active", pill.dataset.lang === lang));
    }

    function checkScrollEnd(paneEl) {
      const tolerance = 40;
      const atEnd = paneEl.scrollHeight - paneEl.scrollTop - paneEl.clientHeight < tolerance;
      if (atEnd && !scrolledToEnd) {
        scrolledToEnd = true;
        refreshAckState();
      }
    }

    panes.forEach((pane) => {
      pane.addEventListener("scroll", () => checkScrollEnd(pane));
      // If pane fits in viewport without scrolling, enable immediately
      requestAnimationFrame(() => {
        if (!pane.hidden && pane.scrollHeight <= pane.clientHeight + 40) {
          scrolledToEnd = true;
          refreshAckState();
        }
      });
    });

    langPills.forEach((pill) => {
      pill.addEventListener("click", () => switchLang(pill.dataset.lang));
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        cleanup();
        resolve(false);
      });
    }

    if (!readOnly) {
      ackBtn.addEventListener("click", async () => {
        if (ackBtn.disabled) return;
        const ts = Date.now();
        // Local first (always succeeds)
        try {
          localStorage.setItem(LS_KEY, JSON.stringify({
            acknowledged: true, version: DISCLAIMER_VERSION, ts,
          }));
        } catch (_) {/* ignore */}

        // Best-effort RTDB write
        try {
          const flow = getFlowState();
          if (flow?.uid && isFirebaseAvailable()) {
            const fb = await import("../firebase-init.js");
            await fb.writePath(
              `users/${flow.uid}/consent/scenarioDisclaimer-${DISCLAIMER_VERSION}`,
              { acknowledged: true, version: DISCLAIMER_VERSION, ts }
            );
          }
        } catch (_) {/* graceful */}

        cleanup();
        resolve(true);
      });
    }

    refreshAckState();
  });
}

/* ──────────────────────────────────────────────────────────────────
 * HTML template
 * ──────────────────────────────────────────────────────────────── */

function renderModalHTML({ readOnly }) {
  const closeMarkup = readOnly
    ? `<button id="disclaimer-close" type="button" class="disclaimer-close" aria-label="Close">
         <span class="material-symbols-rounded size-20">close</span>
       </button>`
    : "";

  const footerMarkup = readOnly
    ? `<div class="disclaimer-footer-readonly">
         <button id="disclaimer-close" type="button" class="btn-secondary">Close</button>
       </div>`
    : `<div class="disclaimer-footer">
         <p id="disclaimer-scroll-hint" class="body-s text-on-surface-variant">
           <span class="material-symbols-rounded size-20" style="vertical-align:middle">arrow_downward</span>
           Please scroll to the end of the disclaimer to continue.
         </p>
         <button id="disclaimer-ack" type="button" class="btn-primary is-disabled" disabled>
           <span>Acknowledge &amp; continue</span>
           <span class="material-symbols-rounded size-20">arrow_forward</span>
         </button>
       </div>`;

  return `
    <div class="scenario-disclaimer-modal">
      <header class="disclaimer-header">
        <div>
          <div class="console-label-gold">SCENARIO USE NOTICE</div>
          <h2 id="disclaimer-title" class="display-heading text-2xl mt-1">Before you begin</h2>
        </div>
        <div class="flex items-center gap-3">
          <div class="lang-pill" role="tablist" aria-label="Language">
            <button class="lang-pill-opt is-active" data-lang="en" role="tab" type="button">EN</button>
            <button class="lang-pill-opt" data-lang="th" role="tab" type="button">ไทย</button>
          </div>
          ${closeMarkup}
        </div>
      </header>

      <div class="disclaimer-body">
        ${renderPaneEN()}
        ${renderPaneTH()}
      </div>

      ${footerMarkup}
    </div>
  `;
}

function renderPaneEN() {
  return `
    <div class="disclaimer-pane" data-lang="en">
      <p class="body-m">
        This document is presented to every student at first scenario entry. By acknowledging it,
        you confirm you understand the educational nature, limits, and intent of scenario content
        on this platform. The full version is available at any time from the page footer.
      </p>

      <h3 class="title-m mt-5 mb-2">1. Purpose</h3>
      <p class="body-m">
        Every scenario on FUTUREPROOF: SDG Mission Lab is created exclusively for
        <strong>educational purposes</strong> within an undergraduate teaching context at the
        Faculty of Liberal Arts, Mahidol University, in collaboration with Thammasat University.
        The platform develops your English proficiency, critical and analytical thinking, ethical
        reasoning, and collaborative problem-solving through situated, scenario-based learning
        aligned with the UN Sustainable Development Goals.
      </p>

      <h3 class="title-m mt-5 mb-2">2. Nature of scenario content</h3>
      <p class="body-m">
        Scenarios are <strong>pedagogical compositions</strong>, not journalistic reports,
        regulatory assessments, or factual case studies. They combine publicly documented general
        facts with composed narrative elements designed to create productive educational dilemmas.
        You are told throughout that scenarios are <em>plausible decision cases</em>, not
        documented events.
      </p>

      <h3 class="title-m mt-5 mb-2">3. References to institutions</h3>
      <p class="body-m">
        Scenarios may reference real Thai institutions — including PWA, RID, DGR, MNRE, MOPH,
        Khon Kaen University, Mahidol University, Thammasat University, Chulalongkorn University,
        Chiang Mai University, TDRI, and others — with respect, to ground you in the actual
        institutional landscape of Thai policy and research. <strong>References do not constitute
        claims about any specific action, decision, or position taken by these institutions in
        any specific real-world case.</strong>
      </p>

      <h3 class="title-m mt-5 mb-2">4. Stakeholder roles</h3>
      <p class="body-m">
        All stakeholder figures — public officials, ministry staff, industry representatives,
        community workers, farmers, health volunteers, and others — are
        <strong>composite roles, not real persons</strong>. They speak from positions defensible
        within their role; they do not impersonate any identifiable individual. No living person
        is named, depicted, voiced, or implied in any stakeholder voice.
      </p>

      <h3 class="title-m mt-5 mb-2">5. Numbers and figures</h3>
      <p class="body-m">
        Numerical claims come from publicly available references and are typically used as ranges
        or qualified estimates. Where a specific concrete number serves narrative tractability —
        for example "twelve new wells" — this is a <strong>pedagogical narrative choice</strong>,
        not a verified figure, and is disclosed in the scenario's manifest.
      </p>

      <h3 class="title-m mt-5 mb-2">6. Use of AI-generated assets</h3>
      <p class="body-m">
        Audio, illustrations, and adaptive feedback may include content produced with ElevenLabs
        (voice), an advanced AI language model (text and rubric application), and image-generation tools.
        <strong>All AI content is reviewed by the platform's pedagogical team before deployment.</strong>
        AI tools never independently author a rubric or determine your final grade. Summative
        grading on the Voice for Change is performed by a qualified human teacher.
      </p>

      <h3 class="title-m mt-5 mb-2">7. No intent of harm</h3>
      <p class="body-m">
        Nothing here is intended to defame, target, harm, or misrepresent any individual,
        organisation, community, or institution. Scenarios are deliberately constructed so that
        <strong>every stakeholder position is defensible from inside that perspective</strong>;
        no group is positioned as the "wrong answer."
      </p>

      <h3 class="title-m mt-5 mb-2">8. Student data and PDPA</h3>
      <p class="body-m">
        Your responses are collected and stored under the Personal Data Protection Act B.E. 2562
        (2019). You may review, correct, or delete your data through the My Data panel. Voice
        recordings are retained for 90 days post-course unless you give explicit additional
        consent. Encryption applies in transit and at rest.
      </p>

      <h3 class="title-m mt-5 mb-2">9. Feedback channel</h3>
      <p class="body-m">
        Any institution, organisation, or individual who believes scenario content materially
        misrepresents their position may contact the platform's editorial team at
        <code>payungsak.kaenchan@gmail.com</code>. Substantive feedback is reviewed and, where
        warranted, scenarios are revised in subsequent versions.
      </p>

      <h3 class="title-m mt-5 mb-2">10. Your acknowledgement</h3>
      <p class="body-m">
        By proceeding, you acknowledge that scenario content is pedagogical, that decisions
        within the platform are educational exercises, and that content does not constitute
        policy advice, legal counsel, or factual reporting on any specific real-world event.
      </p>

      <p class="body-s text-on-surface-variant mt-6">
        Issued by Faculty of Liberal Arts, Mahidol University · Editorial contact:
        Dr. Payungsak Kaenchan · <code>payungsak.kaenchan@gmail.com</code> ·
        Document version ${DISCLAIMER_VERSION} · Full text at
        <code>/docs/scenarios-disclaimer.md</code>.
      </p>
    </div>
  `;
}

function renderPaneTH() {
  return `
    <div class="disclaimer-pane th-pane" data-lang="th" hidden>
      <p class="body-m">
        เอกสารฉบับนี้นำเสนอแก่นักศึกษาทุกคนเมื่อเข้าสู่สถานการณ์เป็นครั้งแรก เมื่อท่านรับทราบ
        ถือว่าท่านเข้าใจถึงลักษณะ ขอบเขต และเจตนาของเนื้อหาสถานการณ์บนแพลตฟอร์มนี้
        ฉบับเต็มสามารถเปิดอ่านได้ตลอดเวลาจากท้ายหน้า
      </p>

      <h3 class="title-m mt-5 mb-2">๑. วัตถุประสงค์</h3>
      <p class="body-m">
        สถานการณ์ทุกเรื่องบน FUTUREPROOF: SDG Mission Lab จัดทำขึ้นเพื่อ
        <strong>วัตถุประสงค์ทางการศึกษา</strong> เท่านั้น
        ภายในบริบทการเรียนการสอนระดับปริญญาตรี คณะศิลปศาสตร์ มหาวิทยาลัยมหิดล
        ร่วมกับมหาวิทยาลัยธรรมศาสตร์
        เพื่อพัฒนาทักษะภาษาอังกฤษ การคิดเชิงวิพากษ์และวิเคราะห์ การใช้เหตุผลเชิงจริยธรรม
        และทักษะการแก้ปัญหาแบบร่วมมือ ผ่านการเรียนรู้บนสถานการณ์ที่สอดคล้องกับ
        เป้าหมายการพัฒนาที่ยั่งยืนขององค์การสหประชาชาติ
      </p>

      <h3 class="title-m mt-5 mb-2">๒. ลักษณะของเนื้อหาในสถานการณ์</h3>
      <p class="body-m">
        สถานการณ์เป็น <strong>งานเรียบเรียงเพื่อการเรียนรู้</strong>
        มิใช่รายงานข่าว การประเมินเชิงกำกับดูแล หรือกรณีศึกษาเชิงข้อเท็จจริงใดๆ
        เป็นการผสมผสานข้อเท็จจริงทั่วไปจากแหล่งสาธารณะกับองค์ประกอบเชิงเรื่องเล่าที่ประพันธ์ขึ้น
        เพื่อสร้างประเด็นปัญหาที่ก่อให้เกิดการเรียนรู้
        นักศึกษาจะได้รับการแจ้งตลอดการใช้งานว่าสถานการณ์เหล่านี้คือ
        <em>กรณีตัดสินใจที่มีความเป็นไปได้</em> มิใช่เหตุการณ์ที่ได้รับการบันทึก
      </p>

      <h3 class="title-m mt-5 mb-2">๓. การอ้างอิงถึงสถาบัน</h3>
      <p class="body-m">
        สถานการณ์อาจอ้างอิงถึงสถาบันของไทยจริง ได้แก่ กปภ. กรมชลประทาน กรมทรัพยากรน้ำบาดาล
        กระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม กระทรวงสาธารณสุข มหาวิทยาลัยขอนแก่น
        มหาวิทยาลัยมหิดล มหาวิทยาลัยธรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย มหาวิทยาลัยเชียงใหม่
        สถาบันวิจัยเพื่อการพัฒนาประเทศไทย และอื่น ๆ ด้วยความเคารพ
        เพื่อให้นักศึกษาเข้าใจภูมิทัศน์เชิงสถาบันของนโยบายและงานวิจัยของประเทศไทย
        <strong>การอ้างอิงดังกล่าวมิได้เป็นการกล่าวอ้างเฉพาะใด ๆ
        เกี่ยวกับการกระทำหรือจุดยืนของสถาบันเหล่านั้นในกรณีจริงเฉพาะใด ๆ</strong>
      </p>

      <h3 class="title-m mt-5 mb-2">๔. บทบาทผู้มีส่วนได้ส่วนเสีย</h3>
      <p class="body-m">
        ตัวละครผู้มีส่วนได้ส่วนเสียทั้งหมด ทั้งเจ้าหน้าที่รัฐ ผู้แทนภาคอุตสาหกรรม
        ผู้นำชุมชน เกษตรกร อสม. ฯลฯ เป็น
        <strong>บทบาทเชิงสังเคราะห์ มิใช่บุคคลจริง</strong>
        ตัวละครเหล่านี้นำเสนอจุดยืนที่ปกป้องได้จากภายในบทบาทของตน
        มิใช่การเลียนแบบบุคคลที่ระบุตัวตนได้ ไม่มีบุคคลที่ยังมีชีวิตอยู่ผู้ใดถูกระบุชื่อ
        แสดงภาพ หรือสื่อโดยเสียงในตัวละครใด ๆ
      </p>

      <h3 class="title-m mt-5 mb-2">๕. ตัวเลขและข้อมูลสถิติ</h3>
      <p class="body-m">
        ข้อมูลตัวเลขมาจากแหล่งสาธารณะและใช้เป็นช่วงประมาณการณ์หรือคำขยายความ
        ในกรณีที่มีการใช้ตัวเลขเฉพาะเพื่อให้เรื่องเล่ามีความเป็นรูปธรรม เช่น "บ่อน้ำใหม่สิบสองบ่อ"
        ถือเป็น <strong>ทางเลือกเชิงเรื่องเล่าเพื่อการเรียนรู้</strong>
        มิใช่ข้อเท็จจริงที่ได้รับการตรวจสอบ และมีการระบุไว้ในเอกสารกำกับสถานการณ์
      </p>

      <h3 class="title-m mt-5 mb-2">๖. การใช้เนื้อหาที่สร้างด้วยปัญญาประดิษฐ์</h3>
      <p class="body-m">
        เสียง ภาพประกอบ และข้อเสนอแนะอาจมีเนื้อหาที่ผลิตด้วย ElevenLabs (เสียง)
        โมเดลภาษาเอไอขั้นสูง (ข้อความและการให้คะแนนตามเกณฑ์) และเครื่องมือสร้างภาพ
        <strong>เนื้อหา AI ทั้งหมดผ่านการตรวจสอบโดยทีมงานการสอนก่อนเผยแพร่</strong>
        AI มิได้เขียนเกณฑ์การประเมินหรือกำหนดเกรดสุดท้ายของท่าน
        การประเมินสรุปท้ายของชิ้นงาน Voice for Change ดำเนินการโดยอาจารย์ผู้สอนที่มีคุณวุฒิ
      </p>

      <h3 class="title-m mt-5 mb-2">๗. ไม่มีเจตนาก่อให้เกิดความเสียหาย</h3>
      <p class="body-m">
        ไม่มีเนื้อหาใดที่มีเจตนาทำให้เสื่อมเสียชื่อเสียง โจมตี ทำร้าย หรือบิดเบือนภาพลักษณ์
        ของบุคคล องค์กร ชุมชน หรือสถาบันใด ๆ สถานการณ์ได้รับการออกแบบโดยจงใจให้
        <strong>จุดยืนของทุกฝ่ายสามารถปกป้องได้จากภายในมุมมองของฝ่ายนั้น ๆ</strong>
        ไม่มีกลุ่มใดถูกวางให้เป็น "คำตอบที่ผิด"
      </p>

      <h3 class="title-m mt-5 mb-2">๘. ข้อมูลของนักศึกษาและ PDPA</h3>
      <p class="body-m">
        คำตอบของท่านได้รับการจัดเก็บภายใต้พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. ๒๕๖๒
        ท่านสามารถเรียกดู แก้ไข หรือลบข้อมูลได้ผ่านหน้า "ข้อมูลของฉัน"
        การบันทึกเสียงจะถูกจัดเก็บไว้ ๙๐ วันหลังสิ้นสุดรายวิชา
        เว้นแต่ท่านจะให้ความยินยอมเพิ่มเติม ข้อมูลได้รับการเข้ารหัสทั้งในระหว่างรับส่งและจัดเก็บ
      </p>

      <h3 class="title-m mt-5 mb-2">๙. ช่องทางให้ข้อเสนอแนะ</h3>
      <p class="body-m">
        สถาบัน องค์กร หรือบุคคลใดที่เห็นว่าเนื้อหาบิดเบือนจุดยืนของตนอย่างมีนัยสำคัญ
        สามารถติดต่อทีมบรรณาธิการได้ที่
        <code>payungsak.kaenchan@gmail.com</code>
        ข้อเสนอแนะที่มีสาระสำคัญจะได้รับการพิจารณาและปรับปรุงในเวอร์ชันถัดไป
      </p>

      <h3 class="title-m mt-5 mb-2">๑๐. การรับทราบของท่าน</h3>
      <p class="body-m">
        การดำเนินการต่อ ถือเป็นการรับทราบว่าเนื้อหาเป็นการศึกษา
        การตัดสินใจภายในแพลตฟอร์มเป็นการฝึกฝนเพื่อการเรียนรู้
        และเนื้อหามิได้เป็นคำแนะนำเชิงนโยบาย คำปรึกษาทางกฎหมาย
        หรือการรายงานข่าวข้อเท็จจริงใด ๆ
      </p>

      <p class="body-s text-on-surface-variant mt-6">
        ออกโดย คณะศิลปศาสตร์ มหาวิทยาลัยมหิดล · ช่องทางบรรณาธิการ:
        อ.ดร. ผยุงศักดิ์ แก่นจันทร์ · <code>payungsak.kaenchan@gmail.com</code> ·
        เวอร์ชัน ${DISCLAIMER_VERSION} · ฉบับเต็มที่
        <code>/docs/scenarios-disclaimer.md</code>
      </p>
    </div>
  `;
}

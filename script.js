const ageRange = document.getElementById("ageRange");
const ageValue = document.getElementById("ageValue");
const ageMinus = document.getElementById("ageMinus");
const agePlus = document.getElementById("agePlus");

const paymentInput = document.getElementById("payment");
const paymentValue = document.getElementById("paymentValue");

const yearsContainer = document.getElementById("years");
const resultDiv = document.getElementById("result");

const langSelect = document.getElementById("langSelect");

// i18n elements
const appTitle = document.getElementById("appTitle");
const langLabel = document.getElementById("langLabel");
const ageLabel = document.getElementById("ageLabel");
const ageUnit = document.getElementById("ageUnit");
const paymentLabel = document.getElementById("paymentLabel");
const termLabel = document.getElementById("termLabel");
const tariffsTitle = document.getElementById("tariffsTitle");
const disclaimerTitle = document.getElementById("disclaimerTitle");
const disclaimerText = document.getElementById("disclaimerText");

// sources banner
const sourcesNote = document.getElementById("sourcesNote");
const sourcesLink = document.getElementById("sourcesLink");

// PDF overlay elements
const pdfOverlay = document.getElementById("pdfOverlay");
const pdfFrame = document.getElementById("pdfFrame");
const pdfTitle = document.getElementById("pdfTitle");
const pdfClose = document.getElementById("pdfClose");

let selectedYear = null;

// 5 тарифов (названия в UI — большими буквами)
const TARIFFS = [
  { id: "START", data: DATA_START },
  { id: "RISK LIFE", data: DATA_RISKLIFE },
  { id: "PROFIT", data: DATA_PROFIT },
  { id: "ORIZONT", data: DATA_ORIZONT },
  { id: "OMNIA VITAL", data: DATA_OMNIA_VITAL }
];

// PDF-источники по каждому тарифу
// Важно: имена файлов чувствительны к регистру на большинстве хостингов.
const TARIFF_PDFS = {
  "START": "PDFs/START.pdf",
  "RISK LIFE": "PDFs/RISK.pdf",
  "PROFIT": "PDFs/PROFIT.pdf",
  "ORIZONT": "PDFs/Horizon.pdf",
  "OMNIA VITAL": "PDFs/OmniaVital.pdf"
};

/* ===== i18n ===== */
const I18N = {
  ro: {
    appTitle: "Asigurare de viață",
    lang: "Limbă",
    age: "Vârstă",
    yearsUnit: "ani",
    payment: "Primă anuală",
    term: "Durata asigurării (ani)",
    tariffs: "Tarife",
    sourcesNote: "Calculul se face pe baza tarifelor. Vezi sursele (PDF).",
    sourcesAria: "Surse (PDF)",
    noData: "Nu există date",
    chooseTerm: "Alege durata asigurării",
    noMatches: "Nu există tarife potrivite pentru parametrii aleși",
    pdfMissing: "PDF indisponibil",
    disclaimerTitle: "Declarație de responsabilitate",
    disclaimerHtml: `<p>Această aplicație web are exclusiv caracter informativ și orientativ.</p><p>Toate calculele sunt estimative și sunt realizate pe baza tabelelor tarifare și condițiilor de asigurare disponibile public.</p><p>Aplicația nu este agent de asigurare, broker de asigurare și nu reprezintă nicio companie de asigurări, nu desfășoară activități de intermediere și nu oferă servicii de asigurare.</p><p>Rezultatele afișate nu constituie ofertă publică, ofertă individuală de asigurare sau garanție de preț.</p><p>Condițiile finale de asigurare și valoarea primei de asigurare sunt stabilite exclusiv de către compania de asigurări, în urma evaluării individuale a clientului.</p>`

  },
  ru: {
    appTitle: "Страхование жизни",
    lang: "Язык",
    age: "Возраст",
    yearsUnit: "лет",
    payment: "Ежегодный взнос",
    term: "Срок страхования (лет)",
    tariffs: "Тарифы",
    sourcesNote: "Расчёты выполнены на основании тарифов. Открыть источники (PDF).",
    sourcesAria: "Источники расчёта (PDF)",
    noData: "Нет данных",
    chooseTerm: "Выберите срок страхования",
    noMatches: "Нет подходящих тарифов для выбранных параметров",
    pdfMissing: "PDF отсутствует",
    disclaimerTitle: "Заявление об ответственности",
    disclaimerHtml: `<p>Это веб‑приложение носит исключительно информационный и ориентировочный характер.</p><p>Все расчёты являются оценочными и выполняются на основании публично доступных тарифных таблиц и условий страхования.</p><p>Приложение не является страховым агентом или брокером, не представляет ни одну страховую компанию, не осуществляет посредническую деятельность и не оказывает страховых услуг.</p><p>Показанные результаты не являются публичной офертой, индивидуальным предложением страхования или гарантией цены.</p><p>Окончательные условия страхования и размер страховой премии устанавливаются исключительно страховой компанией по итогам индивидуальной оценки клиента.</p>`

  },
  en: {
    appTitle: "Life insurance",
    lang: "Language",
    age: "Age",
    yearsUnit: "yrs",
    payment: "Annual premium",
    term: "Policy term (years)",
    tariffs: "Tariffs",
    sourcesNote: "Calculations are based on tariffs. View sources (PDF).",
    sourcesAria: "Calculation sources (PDF)",
    noData: "No data",
    chooseTerm: "Select a policy term",
    noMatches: "No matching tariffs for the selected parameters",
    pdfMissing: "PDF unavailable",
    disclaimerTitle: "Disclaimer",
    disclaimerHtml: `<p>This web application is for informational and indicative purposes only.</p><p>All calculations are estimates and are based on publicly available tariff tables and insurance terms.</p><p>The application is not an insurance agent or broker, does not represent any insurance company, does not perform intermediation activities, and does not provide insurance services.</p><p>The displayed results do not constitute a public offer, an individual insurance offer, or a price guarantee.</p><p>The final insurance terms and the insurance premium are determined solely by the insurance company following an individual assessment of the client.</p>`

  }
};

function getLang() {
  return localStorage.getItem("lang") || "ro";
}

function setLang(lang) {
  localStorage.setItem("lang", lang);
  langSelect.value = lang;

  const t = I18N[lang] || I18N.ro;
  document.documentElement.lang = lang;

  appTitle.textContent = t.appTitle;
  langLabel.textContent = t.lang;
  ageLabel.textContent = t.age;
  ageUnit.textContent = t.yearsUnit;
  paymentLabel.textContent = t.payment;
  termLabel.textContent = t.term;
  tariffsTitle.textContent = t.tariffs;

  if (sourcesNote) sourcesNote.textContent = t.sourcesNote;
  if (sourcesLink) sourcesLink.setAttribute("aria-label", t.sourcesAria);

  renderTariffs();
  if (disclaimerTitle) disclaimerTitle.textContent = t.disclaimerTitle;
  if (disclaimerText) disclaimerText.innerHTML = t.disclaimerHtml;

}

/* ===== helpers ===== */
function parseMoneyKey(k) {
  return Number(String(k).replace(/\s+/g, ""));
}

function sortMoneyKeys(keys) {
  return keys.slice().sort((a, b) => parseMoneyKey(a) - parseMoneyKey(b));
}

function getPaymentsUnion(ageKey) {
  const set = new Set();
  for (const t of TARIFFS) {
    const byAge = t.data[ageKey];
    if (!byAge) continue;
    Object.keys(byAge).forEach(p => set.add(p));
  }
  return sortMoneyKeys([...set]);
}

function getYearsAvailableSet(ageKey, paymentKey) {
  const set = new Set();
  for (const t of TARIFFS) {
    const byAge = t.data[ageKey];
    if (!byAge) continue;
    const byPay = byAge[paymentKey];
    if (!byPay) continue;
    Object.keys(byPay).forEach(y => set.add(String(y)));
  }
  return set;
}

function getAllYearsUnion() {
  const set = new Set();
  for (const t of TARIFFS) {
    for (const byAge of Object.values(t.data)) {
      for (const byPay of Object.values(byAge)) {
        Object.keys(byPay).forEach(y => set.add(String(y)));
      }
    }
  }
  return [...set].sort((a, b) => Number(a) - Number(b));
}

const YEARS_GRID = getAllYearsUnion();

/* ===== navigation to quote page ===== */
function openQuoteForTariff(payload) {
  // payload: { tariffName, sum, age, premiumKey, term, lang }
  try {
    sessionStorage.setItem("quote_payload", JSON.stringify(payload));
  } catch (_) {
    // ignore
  }
  // Keep URL short; quote page will read from sessionStorage.
  window.location.href = "quote.html";
}

function closePdf() {
  pdfOverlay.classList.remove("open");
  pdfOverlay.setAttribute("aria-hidden", "true");
  pdfFrame.src = "";
}

pdfClose.onclick = closePdf;
pdfOverlay.addEventListener("click", (e) => {
  if (e.target === pdfOverlay) closePdf();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && pdfOverlay.classList.contains("open")) {
    closePdf();
  }
});

/* ===== UI ===== */
function updateUI() {
  yearsContainer.innerHTML = "";
  const ageKey = ageRange.value.toString();
  const lang = getLang();
  const t = I18N[lang] || I18N.ro;

  // платежи (объединение по 5 тарифам)
  const payments = getPaymentsUnion(ageKey);

  if (!payments.length) {
    paymentValue.textContent = t.noData;
    paymentInput.max = 0;
    selectedYear = null;

    // Рисуем годы, но все disabled
    YEARS_GRID.forEach(year => {
      const div = document.createElement("div");
      div.className = "year disabled";
      div.textContent = year;
      yearsContainer.appendChild(div);
    });

    renderTariffs();
    return;
  }

  paymentInput.min = 0;
  paymentInput.max = payments.length - 1;
  if (Number(paymentInput.value) > payments.length - 1) paymentInput.value = 0;

  const paymentKey = payments[paymentInput.value];
  paymentValue.textContent = paymentKey;

  // доступные сроки для выбранного age+payment (из всех тарифов)
  const availableYears = getYearsAvailableSet(ageKey, paymentKey);

  YEARS_GRID.forEach(year => {
    const div = document.createElement("div");
    div.className = "year";
    div.textContent = year;

    const isAvailable = availableYears.has(year);
    if (!isAvailable) div.classList.add("disabled");

    // если выбранный срок стал недоступен — сбросим
    if (selectedYear === year && !isAvailable) selectedYear = null;
    if (selectedYear === year) div.classList.add("active");

    div.onclick = () => {
      if (!isAvailable) return;
      document.querySelectorAll(".year").forEach(y => y.classList.remove("active"));
      div.classList.add("active");
      selectedYear = year;

      // Авто-показ тарифов сразу после выбора срока
      renderTariffs();
    };

    yearsContainer.appendChild(div);
  });

  renderTariffs();
}

function renderTariffs() {
  const ageKey = ageRange.value.toString();
  const lang = getLang();
  const t = I18N[lang] || I18N.ro;

  resultDiv.innerHTML = "";

  if (!selectedYear) {
    resultDiv.innerHTML = `<div class="empty">${t.chooseTerm}</div>`;
    return;
  }

  const payments = getPaymentsUnion(ageKey);
  if (!payments.length) {
    resultDiv.innerHTML = `<div class="empty">${t.noData}</div>`;
    return;
  }

  const paymentKey = payments[paymentInput.value];

  const matches = [];
  for (const tariff of TARIFFS) {
    const sum = tariff.data?.[ageKey]?.[paymentKey]?.[selectedYear];
    if (sum !== undefined) matches.push({ name: tariff.id, sum });
  }

  if (!matches.length) {
    resultDiv.innerHTML = `<div class="empty">${t.noMatches}</div>`;
    return;
  }

  matches.forEach(m => {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "tariff-row";
    row.innerHTML = `
      <div class="tariff-title">${m.name}</div>
      <div class="tariff-sum">${m.sum}</div>
    `;

    row.onclick = () => {
      openQuoteForTariff({
        tariffName: m.name,
        sum: m.sum,
        age: Number(ageKey),
        premiumKey: paymentKey,
        term: Number(selectedYear),
        lang
      });
    };
    row.title = "Open";

    resultDiv.appendChild(row);
  });
}

/* ===== Events ===== */
ageRange.oninput = () => {
  ageValue.textContent = ageRange.value;
  paymentInput.value = 0;
  selectedYear = null;
  updateUI();
};

ageMinus.onclick = () => {
  if (ageRange.value > 0) {
    ageRange.value--;
    ageValue.textContent = ageRange.value;
    paymentInput.value = 0;
    selectedYear = null;
    updateUI();
  }
};

agePlus.onclick = () => {
  if (ageRange.value < 65) {
    ageRange.value++;
    ageValue.textContent = ageRange.value;
    paymentInput.value = 0;
    selectedYear = null;
    updateUI();
  }
};

paymentInput.oninput = () => {
  selectedYear = null;
  updateUI();
};

langSelect.onchange = () => setLang(langSelect.value);

/* ===== Start ===== */
ageValue.textContent = ageRange.value;
paymentInput.min = 0;
paymentInput.value = 0;

langSelect.value = getLang();
setLang(getLang());
updateUI();

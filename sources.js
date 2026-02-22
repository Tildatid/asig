const langSelect = document.getElementById("langSelect");
const langLabel = document.getElementById("langLabel");
const backLink = document.getElementById("backLink");
const sourcesTitle = document.getElementById("sourcesTitle");
const sourcesLead = document.getElementById("sourcesLead");
const sourcesList = document.getElementById("sourcesList");

const aboutSection = document.getElementById("aboutSection");
const aboutTitle = document.getElementById("aboutTitle");
const aboutLegalTitle = document.getElementById("aboutLegalTitle");
const aboutLegalText = document.getElementById("aboutLegalText");
const aboutSourcesTitle = document.getElementById("aboutSourcesTitle");
const aboutSourcesText = document.getElementById("aboutSourcesText");
const aboutLiabilityTitle = document.getElementById("aboutLiabilityTitle");
const aboutLiabilityText = document.getElementById("aboutLiabilityText");

const SOURCES = [
  {
    name: "START",
    info: "PDFs/START.pdf",
    table: "tabele/t_start.pdf"
  },
  {
    name: "RISK LIFE",
    info: "PDFs/RISK.pdf",
    table: "tabele/t_risk.pdf"
  },
  {
    name: "PROFIT",
    info: "PDFs/PROFIT.pdf",
    table: "tabele/t_profit.pdf"
  },
  {
    name: "ORIZONT",
    info: "PDFs/Horizon.pdf",
    table: "tabele/t_orizont.pdf"
  },
  {
    name: "OMNIA VITAL",
    info: "PDFs/OmniaVital.pdf",
    table: "tabele/t_omnia.pdf"
  }
];

const I18N = {
  ro: {
    title: "Surse (PDF)",
    lang: "Limbă",
    backAria: "Înapoi la calculator",
    lead: "Pentru fiecare tarif găsești două fișiere: „Informații” și „Tabele”.",
    btnInfo: "Informații",
    btnTable: "Tabele",
    btnAriaInfo: (t) => `Deschide PDF (Informații) pentru ${t}`,
    btnAriaTable: (t) => `Deschide PDF (Tabele) pentru ${t}`
  ,
    aboutTitle: "Despre proiect",
    aboutLegalTitle: "Statutul juridic al aplicației",
    aboutLegalHtml: `<p>Această aplicație web a fost dezvoltată ca un instrument informațional independent pentru analiza și compararea parametrilor de asigurare.</p><p>Dezvoltatorul aplicației nu este agent de asigurare, broker de asigurare, asigurător sau persoană afiliată acestora, nu este autorizat să încheie contracte de asigurare și nu încasează prime de asigurare.</p>`,
    aboutSourcesTitle: "Surse de date",
    aboutSourcesHtml: `<p>Toate calculele sunt efectuate pe baza unor surse deschise și public disponibile, inclusiv tabele tarifare publice, condiții/reguli de asigurare și materiale oficiale ale companiilor de asigurări.</p><p>Datele utilizate nu conțin informații personale sau confidențiale și nu încalcă regimul secretului comercial.</p>`,
    aboutLiabilityTitle: "Limitarea răspunderii",
    aboutLiabilityHtml: `<p>Dezvoltatorul nu își asumă răspunderea pentru orice diferențe dintre calculele prezentate în aplicație și ofertele individuale ale companiilor de asigurări.</p><p>Utilizatorul înțelege că termenii finali ai asigurării sunt stabiliți de compania de asigurări, în urma evaluării individuale (underwriting), a stării de sănătate, profesiei și a altor factori.</p><p>Utilizarea aplicației nu creează obligații între utilizator și compania de asigurări.</p>`
},
  ru: {
    title: "Источники (PDF)",
    lang: "Язык",
    backAria: "Назад к калькулятору",
    lead: "Для каждого тарифа доступны два файла: «Информация» и «Таблицы».",
    btnInfo: "Информация",
    btnTable: "Таблицы",
    btnAriaInfo: (t) => `Открыть PDF (Информация) для ${t}`,
    btnAriaTable: (t) => `Открыть PDF (Таблицы) для ${t}`
  ,
    aboutTitle: "О проекте",
    aboutLegalTitle: "Правовой статус приложения",
    aboutLegalHtml: `<p>Настоящее веб‑приложение разработано как независимый информационный инструмент для анализа и сравнения страховых параметров.</p><p>Разработчик приложения не является страховым агентом, страховым брокером, страховщиком либо их аффилированным лицом, не уполномочен заключать договоры страхования и не принимает страховые премии.</p>`,
    aboutSourcesTitle: "Источники данных",
    aboutSourcesHtml: `<p>Все расчёты выполняются на основании открытых и общедоступных источников, включая публичные тарифные таблицы, правила страхования и официальные материалы страховых компаний.</p><p>Используемые данные не содержат персональной или конфиденциальной информации и не нарушают режим коммерческой тайны.</p>`,
    aboutLiabilityTitle: "Ограничение ответственности",
    aboutLiabilityHtml: `<p>Разработчик не несёт ответственности за любые расхождения между расчётами, представленными в приложении, и индивидуальными предложениями страховых компаний.</p><p>Пользователь осознаёт, что окончательные условия страхования определяются страховой компанией с учётом андеррайтинга, состояния здоровья, профессии и иных факторов.</p><p>Использование приложения не создаёт обязательств между пользователем и страховой компанией.</p>`
},
  en: {
    title: "Sources (PDF)",
    lang: "Language",
    backAria: "Back to calculator",
    lead: "For each tariff there are two files: “Info” and “Tables”.",
    btnInfo: "Info",
    btnTable: "Tables",
    btnAriaInfo: (t) => `Open PDF (Info) for ${t}`,
    btnAriaTable: (t) => `Open PDF (Tables) for ${t}`
  ,
    aboutTitle: "About the project",
    aboutLegalTitle: "Legal status of the application",
    aboutLegalHtml: `<p>This web application was developed as an independent informational tool for analyzing and comparing insurance parameters.</p><p>The developer is not an insurance agent, insurance broker, insurer, or any affiliated party, is not authorized to conclude insurance contracts, and does not collect insurance premiums.</p>`,
    aboutSourcesTitle: "Data sources",
    aboutSourcesHtml: `<p>All calculations are performed using open and publicly available sources, including public tariff tables, insurance terms/rules, and official materials of insurance companies.</p><p>The data used does not contain personal or confidential information and does not violate trade secret protections.</p>`,
    aboutLiabilityTitle: "Limitation of liability",
    aboutLiabilityHtml: `<p>The developer is not liable for any discrepancies between the calculations shown in the application and individual offers provided by insurance companies.</p><p>The user understands that final insurance terms are determined by the insurance company based on individual underwriting, health status, occupation, and other factors.</p><p>Using the application does not create any obligations between the user and an insurance company.</p>`
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

  langLabel.textContent = t.lang;
  sourcesTitle.textContent = t.title;
  sourcesLead.textContent = t.lead;
  backLink.setAttribute("aria-label", t.backAria);

  if (aboutTitle) aboutTitle.textContent = t.aboutTitle;
  if (aboutLegalTitle) aboutLegalTitle.textContent = t.aboutLegalTitle;
  if (aboutLegalText) aboutLegalText.innerHTML = t.aboutLegalHtml;
  if (aboutSourcesTitle) aboutSourcesTitle.textContent = t.aboutSourcesTitle;
  if (aboutSourcesText) aboutSourcesText.innerHTML = t.aboutSourcesHtml;
  if (aboutLiabilityTitle) aboutLiabilityTitle.textContent = t.aboutLiabilityTitle;
  if (aboutLiabilityText) aboutLiabilityText.innerHTML = t.aboutLiabilityHtml;

  renderList(lang);
}

function iconDoc() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Zm0 2.5L19.5 11H14V5.5ZM8 13h8v2H8v-2Zm0 4h8v2H8v-2Z" />
    </svg>
  `;
}

function renderList(lang) {
  const t = I18N[lang] || I18N.ro;
  sourcesList.innerHTML = "";

  for (const item of SOURCES) {
    const card = document.createElement("div");
    card.className = "source-card";

    const title = document.createElement("div");
    title.className = "source-title";
    title.textContent = item.name;

    const actions = document.createElement("div");
    actions.className = "source-actions";

    const aInfo = document.createElement("a");
    aInfo.className = "source-btn";
    aInfo.href = item.info;
    aInfo.target = "_blank";
    aInfo.rel = "noopener";
    aInfo.innerHTML = `${iconDoc()}<span>${t.btnInfo}</span>`;
    aInfo.setAttribute("aria-label", t.btnAriaInfo(item.name));

    const aTable = document.createElement("a");
    aTable.className = "source-btn";
    aTable.href = item.table;
    aTable.target = "_blank";
    aTable.rel = "noopener";
    aTable.innerHTML = `${iconDoc()}<span>${t.btnTable}</span>`;
    aTable.setAttribute("aria-label", t.btnAriaTable(item.name));

    actions.appendChild(aInfo);
    actions.appendChild(aTable);

    card.appendChild(title);
    card.appendChild(actions);
    sourcesList.appendChild(card);
  }
}

langSelect.onchange = () => setLang(langSelect.value);

langSelect.value = getLang();
setLang(getLang());

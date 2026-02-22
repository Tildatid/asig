(function () {
  const langSelect = document.getElementById("langSelect");
  const langLabel = document.getElementById("langLabel");

  const backBtn = document.getElementById("backBtn");
  const quoteTitle = document.getElementById("quoteTitle");
  const calcLabel = document.getElementById("calcLabel");
  const summary = document.getElementById("summary");

  const brokerTitle = document.getElementById("brokerTitle");
  const brokerNameLabel = document.getElementById("brokerNameLabel");
  const brokerLastLabel = document.getElementById("brokerLastLabel");
  const brokerPhoneLabel = document.getElementById("brokerPhoneLabel");
  const brokerEmailLabel = document.getElementById("brokerEmailLabel");

  const clientTitle = document.getElementById("clientTitle");
  const clientEmailLabel = document.getElementById("clientEmailLabel");
  const clientFirstLabel = document.getElementById("clientFirstLabel");
  const clientLastLabel = document.getElementById("clientLastLabel");
  const clientDobLabel = document.getElementById("clientDobLabel");

  const sendBtn = document.getElementById("sendBtn");

  const noteTitle = document.getElementById("noteTitle");
  const noteText = document.getElementById("noteText");

  const brokerFirst = document.getElementById("brokerFirst");
  const brokerLast = document.getElementById("brokerLast");
  const brokerPhone = document.getElementById("brokerPhone");
  const brokerEmail = document.getElementById("brokerEmail");

  const clientEmail = document.getElementById("clientEmail");
  const clientFirst = document.getElementById("clientFirst");
  const clientLast = document.getElementById("clientLast");
  const clientDob = document.getElementById("clientDob");

  const I18N = {
    ro: {
      quoteTitle: "Ofertă",
      calc: "Date calculate",
      broker: "Date broker",
      brokerName: "Nume",
      brokerLast: "Prenume",
      brokerPhone: "Telefon",
      brokerEmail: "Email",
      client: "Date client",
      clientEmail: "Email client",
      clientName: "Nume",
      clientLast: "Prenume",
      clientDob: "Data nașterii",
      send: "Trimite pe email",
      noteTitle: "Notă",
      noteHtml: "Email-ul se deschide prin aplicația ta de mail (mailto). Pentru trimitere automată fără mailto, ai nevoie de un serviciu (de exemplu EmailJS / endpoint propriu).",
      lang: "Limbă",
      backAria: "Înapoi",
      missing: "Nu există date de ofertă. Revino la calculator și alege un tarif."
    },
    ru: {
      quoteTitle: "Предложение",
      calc: "Рассчитанные данные",
      broker: "Данные брокера",
      brokerName: "Имя",
      brokerLast: "Фамилия",
      brokerPhone: "Телефон",
      brokerEmail: "Email",
      client: "Данные клиента",
      clientEmail: "Email клиента",
      clientName: "Имя",
      clientLast: "Фамилия",
      clientDob: "Дата рождения",
      send: "Отправить на email",
      noteTitle: "Примечание",
      noteHtml: "Письмо открывается в вашей почтовой программе (mailto). Для автоматической отправки без mailto нужен сервис (например EmailJS / собственный endpoint).",
      lang: "Язык",
      backAria: "Назад",
      missing: "Нет данных предложения. Вернись в калькулятор и выбери тариф."
    },
    en: {
      quoteTitle: "Quote",
      calc: "Calculated details",
      broker: "Broker details",
      brokerName: "First name",
      brokerLast: "Last name",
      brokerPhone: "Phone",
      brokerEmail: "Email",
      client: "Client details",
      clientEmail: "Client email",
      clientName: "First name",
      clientLast: "Last name",
      clientDob: "Date of birth",
      send: "Send by email",
      noteTitle: "Note",
      noteHtml: "Email opens via your mail app (mailto). For fully automatic sending without mailto, you need a service (e.g., EmailJS / your own endpoint).",
      lang: "Language",
      backAria: "Back",
      missing: "No quote data. Go back to the calculator and select a tariff."
    }
  };

  function getLang() {
    return localStorage.getItem("lang") || "ro";
  }

  function setLang(lang) {
    localStorage.setItem("lang", lang);
    langSelect.value = lang;
    document.documentElement.lang = lang;

    const t = I18N[lang] || I18N.ro;
    quoteTitle.textContent = t.quoteTitle;
    calcLabel.textContent = t.calc;

    brokerTitle.textContent = t.broker;
    brokerNameLabel.textContent = t.brokerName;
    brokerLastLabel.textContent = t.brokerLast;
    brokerPhoneLabel.textContent = t.brokerPhone;
    brokerEmailLabel.textContent = t.brokerEmail;

    clientTitle.textContent = t.client;
    clientEmailLabel.textContent = t.clientEmail;
    clientFirstLabel.textContent = t.clientName;
    clientLastLabel.textContent = t.clientLast;
    clientDobLabel.textContent = t.clientDob;

    sendBtn.textContent = t.send;

    langLabel.textContent = t.lang;
    backBtn.setAttribute("aria-label", t.backAria);

    noteTitle.textContent = t.noteTitle;
    noteText.innerHTML = t.noteHtml;
  }

  function readPayload() {
    // preferred: sessionStorage
    try {
      const raw = sessionStorage.getItem("quote_payload");
      if (raw) return JSON.parse(raw);
    } catch (_) {}

    // fallback: URL params (if you later choose to pass them)
    const p = new URLSearchParams(window.location.search);
    if (!p.has("tariff")) return null;

    return {
      tariffName: p.get("tariff"),
      sum: p.get("sum"),
      age: Number(p.get("age")),
      premiumKey: p.get("premium"),
      term: Number(p.get("term")),
      lang: p.get("lang") || getLang()
    };
  }

  function renderSummary(payload) {
    const lines = [
      `<strong>${escapeHtml(payload.tariffName)}</strong>`,
      `Sumă asigurată: <strong>${escapeHtml(String(payload.sum))}</strong>`,
      `Vârstă: <strong>${escapeHtml(String(payload.age))}</strong>`,
      `Primă anuală: <strong>${escapeHtml(String(payload.premiumKey))}</strong>`,
      `Durata: <strong>${escapeHtml(String(payload.term))}</strong>`
    ];
    summary.innerHTML = lines.map(l => `<div>${l}</div>`).join("");
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function buildEmail(payload) {
    const to = (clientEmail.value || "").trim();
    const subject = `Quote: ${payload.tariffName} / ${payload.sum}`;

    const bodyLines = [
      `Tariff: ${payload.tariffName}`,
      `Sum insured: ${payload.sum}`,
      `Age: ${payload.age}`,
      `Annual premium: ${payload.premiumKey}`,
      `Term (years): ${payload.term}`,
      "",
      "Broker:",
      `- First name: ${(brokerFirst.value || "").trim()}`,
      `- Last name: ${(brokerLast.value || "").trim()}`,
      `- Phone: ${(brokerPhone.value || "").trim()}`,
      `- Email: ${(brokerEmail.value || "").trim()}`,
      "",
      "Client:",
      `- First name: ${(clientFirst.value || "").trim()}`,
      `- Last name: ${(clientLast.value || "").trim()}`,
      `- Date of birth: ${(clientDob.value || "").trim()}`
    ];

    return {
      to,
      subject,
      body: bodyLines.join("\n")
    };
  }

  // events
  backBtn.onclick = () => {
    window.location.href = "index.html";
  };

  langSelect.onchange = () => setLang(langSelect.value);

  const payload = readPayload();
  const lang = payload?.lang || getLang();
  setLang(lang);

  if (!payload) {
    const t = I18N[getLang()] || I18N.ro;
    summary.textContent = t.missing;
    sendBtn.disabled = true;
    sendBtn.style.opacity = "0.6";
    return;
  }

  renderSummary(payload);

  // broker preset (local)
  try {
    const raw = localStorage.getItem("broker_preset");
    if (raw) {
      const p = JSON.parse(raw);
      if (p && typeof p === "object") {
        if (p.first && !brokerFirst.value) brokerFirst.value = p.first;
        if (p.last && !brokerLast.value) brokerLast.value = p.last;
        if (p.phone && !brokerPhone.value) brokerPhone.value = p.phone;
        if (p.email && !brokerEmail.value) brokerEmail.value = p.email;
      }
    }
  } catch (_) {}

  sendBtn.onclick = () => {
    const email = buildEmail(payload);

    if (!email.to) {
      clientEmail.focus();
      return;
    }

sendBtn.onclick = async () => {
  const email = buildEmail(payload);

  if (!email.to) {
    clientEmail.focus();
    return;
  }

  sendBtn.disabled = true;

  try {
    const resp = await fetch("https://api.web-app.no", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email.to,
        subject: email.subject,
        body: email.body,
        replyTo: (brokerEmail.value || "").trim()
      })
    });

    if (!resp.ok) {
      alert("Eroare la trimitere.");
      return;
    }

    alert("Email trimis cu succes.");
  } catch (e) {
    alert("Eroare de conexiune.");
  } finally {
    sendBtn.disabled = false;
  }
};
  };
})();

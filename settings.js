(function () {
  const langSelect = document.getElementById("langSelect");
  const langLabel = document.getElementById("langLabel");

  const backBtn = document.getElementById("backBtn");
  const settingsTitle = document.getElementById("settingsTitle");

  const presetLabel = document.getElementById("presetLabel");
  const presetHint = document.getElementById("presetHint");

  const brokerFirstLabel = document.getElementById("brokerFirstLabel");
  const brokerLastLabel = document.getElementById("brokerLastLabel");
  const brokerPhoneLabel = document.getElementById("brokerPhoneLabel");
  const brokerEmailLabel = document.getElementById("brokerEmailLabel");

  const brokerFirst = document.getElementById("brokerFirst");
  const brokerLast = document.getElementById("brokerLast");
  const brokerPhone = document.getElementById("brokerPhone");
  const brokerEmail = document.getElementById("brokerEmail");

  const saveBtn = document.getElementById("saveBtn");
  const clearBtn = document.getElementById("clearBtn");

  const noteTitle = document.getElementById("noteTitle");
  const noteText = document.getElementById("noteText");

  const STORAGE_KEY = "broker_preset";

  const I18N = {
    ro: {
      title: "Setări",
      presetLabel: "Preset broker (se salvează local pe acest device)",
      presetHint: "Aceste date se completează automat pe pagina de ofertă.",
      brokerFirst: "Nume",
      brokerLast: "Prenume",
      brokerPhone: "Telefon",
      brokerEmail: "Email (broker)",
      save: "Salvează",
      clear: "Șterge",
      noteTitle: "Notă",
      noteHtml: "Datele sunt salvate în browser (localStorage). Dacă schimbi device-ul sau ștergi datele browserului, presetul se pierde.",
      lang: "Limbă",
      backAria: "Înapoi",
      saved: "Salvat.",
      cleared: "Șters.",
      invalidEmail: "Email invalid.",
    },
    ru: {
      title: "Настройки",
      presetLabel: "Пресет брокера (сохраняется локально на этом устройстве)",
      presetHint: "Эти данные автоматически подставляются на странице предложения.",
      brokerFirst: "Имя",
      brokerLast: "Фамилия",
      brokerPhone: "Телефон",
      brokerEmail: "Email (брокер)",
      save: "Сохранить",
      clear: "Удалить",
      noteTitle: "Примечание",
      noteHtml: "Данные сохраняются в браузере (localStorage). Если вы смените устройство или очистите данные браузера, пресет пропадёт.",
      lang: "Язык",
      backAria: "Назад",
      saved: "Сохранено.",
      cleared: "Удалено.",
      invalidEmail: "Некорректный email.",
    },
    en: {
      title: "Settings",
      presetLabel: "Broker preset (saved locally on this device)",
      presetHint: "These details are auto-filled on the quote page.",
      brokerFirst: "First name",
      brokerLast: "Last name",
      brokerPhone: "Phone",
      brokerEmail: "Email (broker)",
      save: "Save",
      clear: "Clear",
      noteTitle: "Note",
      noteHtml: "Data is stored in your browser (localStorage). If you switch devices or clear browser data, the preset will be lost.",
      lang: "Language",
      backAria: "Back",
      saved: "Saved.",
      cleared: "Cleared.",
      invalidEmail: "Invalid email.",
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
    settingsTitle.textContent = t.title;
    presetLabel.textContent = t.presetLabel;
    presetHint.textContent = t.presetHint;

    brokerFirstLabel.textContent = t.brokerFirst;
    brokerLastLabel.textContent = t.brokerLast;
    brokerPhoneLabel.textContent = t.brokerPhone;
    brokerEmailLabel.textContent = t.brokerEmail;

    saveBtn.textContent = t.save;
    clearBtn.textContent = t.clear;

    noteTitle.textContent = t.noteTitle;
    noteText.innerHTML = t.noteHtml;

    langLabel.textContent = t.lang;
    backBtn.setAttribute("aria-label", t.backAria);
  }

  function readPreset() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  function writePreset(preset) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preset));
  }

  function clearPreset() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function hydrateForm(preset) {
    brokerFirst.value = preset?.first || "";
    brokerLast.value = preset?.last || "";
    brokerPhone.value = preset?.phone || "";
    brokerEmail.value = preset?.email || "";
  }

  function isValidEmail(email) {
    const v = String(email || "").trim();
    if (!v) return true; // allow empty
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function flashNote(msg) {
    // simple, non-intrusive feedback
    presetHint.textContent = msg;
    window.setTimeout(() => {
      const t = I18N[getLang()] || I18N.ro;
      presetHint.textContent = t.presetHint;
    }, 1400);
  }

  // events
  backBtn.onclick = () => {
    window.location.href = "index.html";
  };

  langSelect.onchange = () => setLang(langSelect.value);

  saveBtn.onclick = () => {
    const email = (brokerEmail.value || "").trim();
    const t = I18N[getLang()] || I18N.ro;

    if (!isValidEmail(email)) {
      brokerEmail.focus();
      flashNote(t.invalidEmail);
      return;
    }

    writePreset({
      first: (brokerFirst.value || "").trim(),
      last: (brokerLast.value || "").trim(),
      phone: (brokerPhone.value || "").trim(),
      email
    });
    flashNote(t.saved);
  };

  clearBtn.onclick = () => {
    clearPreset();
    hydrateForm(null);
    const t = I18N[getLang()] || I18N.ro;
    flashNote(t.cleared);
  };

  // init
  const lang = getLang();
  setLang(lang);
  hydrateForm(readPreset());
})();

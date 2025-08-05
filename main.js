const sectionsToLoad = [
  ['cookie-popup', './html/cookie-popup.html'],
  ['header', './html/header.html'],
  ['hero', './html/hero.html'],
  ['advantages', './html/advantages.html'],
  ['blog', './html/blog.html'],
  ['contact-form', './html/contact-form.html'],
  ['location', './html/location.html'],
  ['faq', './html/faq.html'],
  ['footer', './html/footer.html'],
];

$(function () {
  sectionsToLoad.forEach(([id, path]) => {
    let element = $('#' + id);

    if (!element.length) {
      console.warn(`⚠️ Element #${id} not found. Creating placeholder.`);
      element = $(`<div id="${id}"></div>`).appendTo('main');
    }

    element.load(path, function (response, status, xhr) {
      if (status === "error") {
        console.error(`❌ Failed to load '${path}':`, xhr.status, xhr.statusText);
      } else {
        console.log(`✅ Loaded '${path}' into #${id}`);

        // Після завантаження contact-form — ініціалізуємо прапорець по введенню номера
        if (id === 'contact-form') {
          const phoneInput = document.querySelector("#phone");
          const flagDisplay = document.getElementById("flag-display");

          // Телефонні коди + прапорці (маленькі картинки з flagcdn.com)
          const phoneCodeFlags = [
            { code: '+380', flag: 'https://flagcdn.com/w20/ua.png', alt: 'Ukraine' },
            { code: '+420', flag: 'https://flagcdn.com/w20/cz.png', alt: 'Czech Republic' },
            { code: '+44', flag: 'https://flagcdn.com/w20/gb.png', alt: 'United Kingdom' },
            { code: '+49', flag: 'https://flagcdn.com/w20/de.png', alt: 'Germany' },
            { code: '+33', flag: 'https://flagcdn.com/w20/fr.png', alt: 'France' },
            { code: '+7', flag: 'https://flagcdn.com/w20/ru.png', alt: 'Russia' },
            { code: '+1', flag: 'https://flagcdn.com/w20/us.png', alt: 'USA' },
            // Можна додати ще багато інших
          ];

          // Функція для пошуку прапорця за кодом телефону
          function getFlagByPhone(phone) {
            if (!phone.startsWith('+')) return null;
            phoneCodeFlags.sort((a,b) => b.code.length - a.code.length);
            for (const entry of phoneCodeFlags) {
              if (phone.startsWith(entry.code)) return entry;
            }
            return null;
          }

          function setFlagImage(url, alt) {
            flagDisplay.innerHTML = `<img src="${url}" alt="${alt}" width="20" height="15" style="display:block;" />`;
          }

          function clearFlag() {
            flagDisplay.innerHTML = ''; // очистити прапорець
          }

          // При завантаженні — початковий прапорець (можна USA або пустий)
          // setFlagImage('https://flagcdn.com/w20/us.png', 'USA');
          clearFlag();

          phoneInput.addEventListener('input', () => {
            const val = phoneInput.value.replace(/\s/g, '');
            const flagEntry = getFlagByPhone(val);
            if (flagEntry) {
              setFlagImage(flagEntry.flag, flagEntry.alt);
            } else {
              clearFlag();
            }
          });
        }
      }
    });
  });
});

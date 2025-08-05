const sectionsToLoad = [
  // ['cookie-popup', './html/cookie-popup.html'],
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

        // Після завантаження header ініціалізуємо мобільне меню
        if (id === 'header') {
          // Додані логи для налагодження:
          const burgerBtn = document.querySelector('.burger-menu');
          const mobileMenu = document.querySelector('.mobile-menu');
          const closeBtn = document.querySelector('.mobile-menu-close');

          console.log('burgerBtn:', burgerBtn);
          console.log('mobileMenu:', mobileMenu);
          console.log('closeBtn:', closeBtn);

          initMobileMenu();
        }

        if (id === 'contact-form') {
          initPhoneFlag();
        }
      }
    });
  });
});

let mobileMenuInitialized = false;

// Функція ініціалізації мобільного меню
function initMobileMenu() {
  if (mobileMenuInitialized) return; // Запобігаємо повторній ініціалізації
  mobileMenuInitialized = true;

  const burgerBtn = document.querySelector('.burger-menu');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu-close');

  if (!burgerBtn || !mobileMenu || !closeBtn) {
    console.warn('Mobile menu elements not found');
    return;
  }

  console.log('Mobile menu initialized');

  burgerBtn.addEventListener('click', () => {
    console.log('Burger clicked');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
  });

  closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });

  document.addEventListener('click', (e) => {
    if (!mobileMenu.classList.contains('open')) return;

    if (
      !mobileMenu.contains(e.target) &&
      !burgerBtn.contains(e.target)
    ) {
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
  });
}

// Функція ініціалізації прапорця для телефону
function initPhoneFlag() {
  const phoneInput = document.querySelector("#phone");
  const flagDisplay = document.getElementById("flag-display");

  if (!phoneInput || !flagDisplay) return;

  const phoneCodeFlags = [
    { code: '+380', flag: 'https://flagcdn.com/w20/ua.png', alt: 'Ukraine' },
    { code: '+420', flag: 'https://flagcdn.com/w20/cz.png', alt: 'Czech Republic' },
    { code: '+44', flag: 'https://flagcdn.com/w20/gb.png', alt: 'United Kingdom' },
    { code: '+49', flag: 'https://flagcdn.com/w20/de.png', alt: 'Germany' },
    { code: '+33', flag: 'https://flagcdn.com/w20/fr.png', alt: 'France' },
    { code: '+7', flag: 'https://flagcdn.com/w20/ru.png', alt: 'Russia' },
    { code: '+1', flag: 'https://flagcdn.com/w20/us.png', alt: 'USA' },
  ];

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
    flagDisplay.innerHTML = '';
  }

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

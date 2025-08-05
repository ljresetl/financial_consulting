document.addEventListener("DOMContentLoaded", function () {
  initMobileMenu();
  initPhoneFlag();
});

// === Мобільне меню ===
function initMobileMenu() {
  const burgerBtn = document.querySelector('.burger-menu');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu-close');
  const menuLinks = mobileMenu?.querySelectorAll('a'); // Додаємо вибір посилань

  if (!burgerBtn || !mobileMenu || !closeBtn) {
    console.warn('⚠️ Mobile menu elements not found');
    return;
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.setAttribute('hidden', '');
  }

  burgerBtn.addEventListener('click', () => {
    mobileMenu.removeAttribute('hidden');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
  });

  closeBtn.addEventListener('click', closeMenu);

  document.addEventListener('click', (e) => {
    if (!mobileMenu.classList.contains('open')) return;
    if (!mobileMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  // === Закривати меню при кліку по пункту
  if (menuLinks?.length) {
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });
  }
}

// === Вибір прапора за телефонним кодом ===
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
    phoneCodeFlags.sort((a, b) => b.code.length - a.code.length);
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

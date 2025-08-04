 // ✅ Список секцій для підвантаження
  const sectionsToLoad = [
    ['cookie-popup', './cookie-popup.html'],
    ['header', './header.html'],
    ['hero', './hero.html'],
    ['advantages', './advantages.html'],
    ['blog', './blog.html'],
    ['contact-form', './contact-form.html'],
    ['location', './location.html'],
    ['faq', './faq.html'],
    ['footer', './footer.html'],
  ];

  $(document).ready(function () {
    sectionsToLoad.forEach(([id, path]) => {
      const element = $('#' + id);
      if (element.length) {
        element.load(path, function (response, status, xhr) {
          if (status === "error") {
            console.error(`Failed to load ${path}:`, xhr.status, xhr.statusText);
          }
        });
      } else {
        console.warn(`Element with ID '${id}' not found on the page.`);
      }
    });
  });
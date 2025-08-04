 // ✅ Список секцій для підвантаження
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
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

    // Якщо елементу немає — створюємо його в main
    if (!element.length) {
      console.warn(`⚠️ Element #${id} not found. Creating placeholder.`);
      element = $(`<div id="${id}"></div>`).appendTo('main');
    }

    element.load(path, function (response, status, xhr) {
      if (status === "error") {
        console.error(`❌ Failed to load '${path}':`, xhr.status, xhr.statusText);
      } else {
        console.log(`✅ Loaded '${path}' into #${id}`);
      }
    });
  });
});

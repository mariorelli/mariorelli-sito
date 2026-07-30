// Mario Relli — sito autore
// Menu mobile
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  // Form newsletter: al momento e' solo un placeholder grafico.
  // Per renderlo funzionante collega un servizio di email marketing
  // (es. MailerLite, Brevo) e sostituisci l'attributo "action" del form
  // con l'endpoint fornito dal servizio scelto.
  var newsletterForms = document.querySelectorAll(".newsletter-form");
  newsletterForms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      if (!form.dataset.connected) {
        e.preventDefault();
        var note = form.parentElement.querySelector(".newsletter-note");
        alert("Modulo non ancora collegato a un servizio di newsletter. Vedi le istruzioni nel file js/main.js per attivarlo.");
      }
    });
  });
});

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

  // Form newsletter: collegato a MailerLite (gruppo "Iscritti sito mariorelli.it").
  // L'invio avviene in background (senza far uscire l'utente dal sito) tramite
  // l'endpoint pubblico di sottoscrizione del modulo creato in MailerLite.
  var ML_ACCOUNT_ID = "2531318";
  var ML_FORM_ID = "194434697727575292";
  var ML_ENDPOINT = "https://assets.mailerlite.com/jsonp/" + ML_ACCOUNT_ID + "/forms/" + ML_FORM_ID + "/subscribe";

  var newsletterForms = document.querySelectorAll(".newsletter-form");
  newsletterForms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var emailInput = form.querySelector('input[type="email"]');
      var note = form.parentElement.querySelector(".newsletter-note");
      var button = form.querySelector('button[type="submit"]');
      var email = emailInput ? emailInput.value.trim() : "";
      if (!email) return;

      var originalNote = note ? note.textContent : "";
      var originalBtnText = button ? button.textContent : "";
      if (button) { button.disabled = true; button.textContent = "Invio..."; }

      var body = new URLSearchParams();
      body.set("fields[email]", email);
      body.set("ml-submit", "1");

      fetch(ML_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString()
      }).then(function () {
        if (note) note.textContent = "Grazie! Controlla la tua casella email per confermare l'iscrizione.";
        if (button) button.textContent = originalBtnText;
        if (button) button.disabled = false;
        form.reset();
      }).catch(function () {
        if (note) note.textContent = "Qualcosa non ha funzionato. Riprova tra poco o scrivi a info@mariorelli.it.";
        if (button) { button.disabled = false; button.textContent = originalBtnText; }
      });
    });
  });
});

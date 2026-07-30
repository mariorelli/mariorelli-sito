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

  // Popup di conferma iscrizione: creato una sola volta e riusato da tutti i moduli.
  var mlModalOverlay = document.createElement("div");
  mlModalOverlay.className = "ml-modal-overlay";
  mlModalOverlay.innerHTML =
    '<div class="ml-modal" role="dialog" aria-modal="true">' +
      '<button type="button" class="ml-modal-x" aria-label="Chiudi">&times;</button>' +
      '<div class="ml-modal-icon"></div>' +
      '<h3 class="ml-modal-title"></h3>' +
      '<p class="ml-modal-text"></p>' +
      '<button type="button" class="btn btn-primary ml-modal-close">Va bene</button>' +
    '</div>';
  document.body.appendChild(mlModalOverlay);

  function closeMlModal() { mlModalOverlay.classList.remove("is-open"); }
  mlModalOverlay.querySelector(".ml-modal-x").addEventListener("click", closeMlModal);
  mlModalOverlay.querySelector(".ml-modal-close").addEventListener("click", closeMlModal);
  mlModalOverlay.addEventListener("click", function (e) {
    if (e.target === mlModalOverlay) closeMlModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMlModal();
  });

  function openMlModal(success) {
    mlModalOverlay.classList.toggle("is-error", !success);
    mlModalOverlay.querySelector(".ml-modal-icon").textContent = success ? "✓" : "!";
    mlModalOverlay.querySelector(".ml-modal-title").textContent = success ? "Iscrizione ricevuta" : "Qualcosa non ha funzionato";
    mlModalOverlay.querySelector(".ml-modal-text").textContent = success
      ? "Grazie! Se richiesto, controlla la tua casella email per confermare l'iscrizione."
      : "Riprova tra poco, oppure scrivi a info@mariorelli.it e ti aggiungo io.";
    mlModalOverlay.classList.add("is-open");
  }

  var newsletterForms = document.querySelectorAll(".newsletter-form");
  newsletterForms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var emailInput = form.querySelector('input[type="email"]');
      var note = form.parentElement.querySelector(".newsletter-note");
      var button = form.querySelector('button[type="submit"]');
      var email = emailInput ? emailInput.value.trim() : "";
      if (!email) return;

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
        if (button) { button.textContent = originalBtnText; button.disabled = false; }
        if (note) note.textContent = "Grazie per l'iscrizione!";
        form.reset();
        openMlModal(true);
      }).catch(function () {
        if (button) { button.disabled = false; button.textContent = originalBtnText; }
        openMlModal(false);
      });
    });
  });
});

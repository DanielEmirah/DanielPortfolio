(function () {
  "use strict";

  console.log("=== CHARGEMENT DU SCRIPT ===");

  // Attend que le DOM soit complètement chargé
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    console.log("✅ DOM chargé - Initialisation...");

    // Initialise toutes les fonctionnalités
    initHamburgerMenu();
    initAlerts();
    initBackToTop();
    initContactForm();
    initSmoothScroll();

    console.log("✅ Toutes les fonctionnalités initialisées");
  }

  // ============================================
  // MENU HAMBURGER MOBILE
  // ============================================
  function initHamburgerMenu() {
    var hamburger = document.querySelector(".hamburger");
    var navMenu = document.querySelector(".nav-menu");

    if (!hamburger || !navMenu) {
      console.log("⚠️ Menu hamburger non trouvé");
      return;
    }

    console.log("✅ Menu hamburger initialisé");

    // Toggle menu au clic
    hamburger.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      var isActive = navMenu.classList.contains("active");

      if (isActive) {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
        console.log("Menu fermé");
      } else {
        navMenu.classList.add("active");
        hamburger.classList.add("active");
        console.log("Menu ouvert");
      }
    });

    // Ferme le menu quand on clique sur un lien
    var navLinks = navMenu.querySelectorAll("a");
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener("click", function () {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
        console.log("Menu fermé via lien");
      });
    }

    // Ferme le menu si on clique en dehors
    document.addEventListener("click", function (e) {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
      }
    });
  }

  // ============================================
  // GESTION DES ALERTES
  // ============================================
  function initAlerts() {
    var closeButtons = document.querySelectorAll(".close-btn");
    var alerts = document.querySelectorAll(".alert");

    console.log("Alertes trouvées:", alerts.length);

    // Boutons de fermeture
    for (var i = 0; i < closeButtons.length; i++) {
      closeButtons[i].addEventListener("click", function (e) {
        e.preventDefault();
        var alert = this.parentElement;
        closeAlert(alert);
      });
    }

    // Fermeture automatique après 5 secondes
    for (var j = 0; j < alerts.length; j++) {
      (function (alert) {
        setTimeout(function () {
          closeAlert(alert);
        }, 5000);
      })(alerts[j]);
    }

    function closeAlert(alert) {
      alert.style.transition = "all 0.3s ease";
      alert.style.opacity = "0";
      alert.style.transform = "translateY(-20px)";
      setTimeout(function () {
        if (alert.parentNode) {
          alert.parentNode.removeChild(alert);
          console.log("Alerte fermée");
        }
      }, 300);
    }
  }

  // ============================================
  // BOUTON RETOUR EN HAUT
  // ============================================
  function initBackToTop() {
    var button = document.createElement("button");
    button.innerHTML = "↑";
    button.className = "back-to-top";
    button.setAttribute("aria-label", "Retour en haut");
    button.style.cssText =
      "position: fixed;" +
      "bottom: 20px;" +
      "right: 20px;" +
      "width: 50px;" +
      "height: 50px;" +
      "border-radius: 50%;" +
      "background-color: #6366f1;" +
      "color: white;" +
      "border: none;" +
      "font-size: 24px;" +
      "cursor: pointer;" +
      "opacity: 0;" +
      "transition: all 0.3s ease;" +
      "z-index: 1000;" +
      "display: none;" +
      "box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);";

    document.body.appendChild(button);
    console.log("✅ Bouton retour en haut créé");

    // Affiche/cache le bouton au scroll
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        button.style.display = "block";
        setTimeout(function () {
          button.style.opacity = "1";
        }, 10);
      } else {
        button.style.opacity = "0";
        setTimeout(function () {
          if (window.pageYOffset <= 300) {
            button.style.display = "none";
          }
        }, 300);
      }
    });

    // Scroll vers le haut au clic
    button.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      console.log("Retour en haut");
    });

    // Effet hover
    button.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1)";
    });
    button.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  }

  // ============================================
  // VALIDATION FORMULAIRE CONTACT
  // ============================================
  function initContactForm() {
    var form = document.querySelector("#contact-form");

    if (!form) {
      console.log("⚠️ Formulaire de contact non trouvé");
      return;
    }

    console.log("✅ Formulaire de contact initialisé");

    form.addEventListener("submit", function (e) {
      var requiredFields = form.querySelectorAll("[required]");
      var isValid = true;

      for (var i = 0; i < requiredFields.length; i++) {
        var field = requiredFields[i];
        var value = field.value.trim();

        // Supprime les anciens messages d'erreur
        removeErrorMessage(field);

        if (!value) {
          isValid = false;
          field.classList.add("error");
          showErrorMessage(field, "Ce champ est requis");
        } else {
          field.classList.remove("error");
        }
      }

      if (!isValid) {
        e.preventDefault();
        alert("Veuillez remplir tous les champs requis");
        console.log("❌ Validation échouée");
      } else {
        console.log("✅ Formulaire valide");
      }
    });

    // Retire les erreurs quand on tape
    var inputs = form.querySelectorAll("input, textarea");
    for (var j = 0; j < inputs.length; j++) {
      inputs[j].addEventListener("input", function () {
        this.classList.remove("error");
        removeErrorMessage(this);
      });
    }

    function showErrorMessage(field, message) {
      var error = document.createElement("span");
      error.className = "error-message";
      error.textContent = message;
      error.style.cssText =
        "color: red;" +
        "font-size: 0.875rem;" +
        "margin-top: 4px;" +
        "display: block;";
      field.parentNode.insertBefore(error, field.nextSibling);
    }

    function removeErrorMessage(field) {
      var nextEl = field.nextElementSibling;
      if (nextEl && nextEl.classList.contains("error-message")) {
        nextEl.parentNode.removeChild(nextEl);
      }
    }
  }

  // ============================================
  // SMOOTH SCROLL POUR LES ANCRES
  // ============================================
  function initSmoothScroll() {
    var anchorLinks = document.querySelectorAll('a[href^="#"]');

    for (var i = 0; i < anchorLinks.length; i++) {
      anchorLinks[i].addEventListener("click", function (e) {
        var href = this.getAttribute("href");
        if (href === "#") return;

        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          console.log("Scroll vers:", href);
        }
      });
    }

    console.log("✅ Smooth scroll initialisé");
  }
})();

console.log("📄 Script main.js chargé!");

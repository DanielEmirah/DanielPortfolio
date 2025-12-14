// Attend que le DOM soit complètement chargé avant d'exécuter le code
document.addEventListener("DOMContentLoaded", function () {
  // Log pour confirmer que le script est chargé
  console.log("✅ Portfolio JavaScript chargé avec succès!");

  // ============================================
  // MENU MOBILE HAMBURGER
  // ============================================

  // Sélectionne le bouton hamburger
  const hamburger = document.querySelector(".hamburger");
  // Sélectionne le menu de navigation
  const navMenu = document.querySelector(".nav-menu");

  // Log pour vérifier si les éléments sont trouvés
  console.log("Hamburger trouvé:", hamburger !== null);
  console.log("Menu trouvé:", navMenu !== null);

  // Vérifie si les éléments existent avant d'ajouter l'événement
  if (hamburger && navMenu) {
    // Ajoute un événement au clic sur le hamburger
    hamburger.addEventListener("click", function (e) {
      // Empêche la propagation de l'événement
      e.preventDefault();
      e.stopPropagation();

      // Toggle (bascule) la classe 'active' sur le menu
      navMenu.classList.toggle("active");
      // Toggle la classe 'active' sur le hamburger pour l'animation
      hamburger.classList.toggle("active");

      // Log pour confirmer le clic
      console.log(
        "Menu hamburger cliqué - État:",
        navMenu.classList.contains("active") ? "OUVERT" : "FERMÉ"
      );
    });

    // Ferme le menu mobile quand on clique sur un lien
    const navLinks = document.querySelectorAll(".nav-menu a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        // Retire la classe 'active' pour fermer le menu
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
        console.log("Lien cliqué - Menu fermé");
      });
    });

    // Ferme le menu si on clique en dehors
    document.addEventListener("click", function (e) {
      // Vérifie si le clic est en dehors du menu et du hamburger
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
      }
    });
  } else {
    console.warn("⚠️ Éléments hamburger ou menu non trouvés dans le DOM");
  }

  // ============================================
  // FERMETURE DES MESSAGES D'ALERTE
  // ============================================

  // Sélectionne tous les boutons de fermeture des alertes
  const closeButtons = document.querySelectorAll(".close-btn");
  console.log("Boutons de fermeture trouvés:", closeButtons.length);

  // Ajoute un événement de clic sur chaque bouton
  closeButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      // Trouve l'élément parent (l'alerte) et le supprime avec animation
      const alert = this.parentElement;
      alert.style.opacity = "0";
      alert.style.transform = "translateY(-20px)";
      setTimeout(function () {
        alert.remove();
        console.log("Alerte fermée manuellement");
      }, 300);
    });
  });

  // Ferme automatiquement les alertes après 5 secondes
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => {
    // SetTimeout exécute le code après un délai (5000ms = 5s)
    setTimeout(function () {
      // Ajoute une animation de disparition
      alert.style.transition = "all 0.3s ease";
      alert.style.opacity = "0";
      alert.style.transform = "translateY(-20px)";
      // Supprime complètement l'élément après l'animation
      setTimeout(function () {
        if (alert.parentNode) {
          alert.remove();
          console.log("Alerte fermée automatiquement");
        }
      }, 300); // Délai de 300ms pour l'animation
    }, 5000); // Attend 5 secondes avant de commencer
  });

  // ============================================
  // ANIMATION AU SCROLL (FADE IN)
  // ============================================

  // Fonction pour vérifier si un élément est visible dans le viewport
  function isElementInViewport(el) {
    // Récupère les dimensions et la position de l'élément
    const rect = el.getBoundingClientRect();
    // Retourne true si l'élément est visible
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Fonction pour animer les éléments au scroll
  function handleScrollAnimation() {
    // Sélectionne tous les éléments à animer
    const animateElements = document.querySelectorAll(
      ".project-card, .skill-card"
    );

    // Parcourt chaque élément
    animateElements.forEach((element) => {
      // Vérifie si l'élément est visible
      if (isElementInViewport(element)) {
        // Ajoute la classe 'fade-in' pour l'animation
        element.classList.add("fade-in");
      }
    });
  }

  // Exécute la fonction au chargement de la page
  handleScrollAnimation();

  // Exécute la fonction à chaque scroll
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    // Débounce pour optimiser les performances
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(handleScrollAnimation, 10);
  });

  // ============================================
  // SMOOTH SCROLL POUR LES LIENS D'ANCRAGE
  // ============================================

  // Sélectionne tous les liens qui commencent par #
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  console.log("Liens d'ancrage trouvés:", anchorLinks.length);

  // Ajoute un événement de clic sur chaque lien
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Empêche le comportement par défaut du lien
      e.preventDefault();

      // Récupère l'ID de la cible depuis l'attribut href
      const targetId = this.getAttribute("href");
      // Sélectionne l'élément cible
      const targetElement = document.querySelector(targetId);

      // Vérifie si l'élément cible existe
      if (targetElement) {
        // Scroll smooth vers l'élément
        targetElement.scrollIntoView({
          behavior: "smooth", // Animation fluide
          block: "start", // Aligne en haut
        });
        console.log("Scroll vers:", targetId);
      }
    });
  });

  // ============================================
  // VALIDATION DU FORMULAIRE DE CONTACT
  // ============================================

  // Sélectionne le formulaire de contact
  const contactForm = document.querySelector("#contact-form");
  console.log("Formulaire de contact trouvé:", contactForm !== null);

  // Vérifie si le formulaire existe
  if (contactForm) {
    // Ajoute un événement à la soumission du formulaire
    contactForm.addEventListener("submit", function (e) {
      // Récupère tous les champs requis
      const requiredFields = this.querySelectorAll("[required]");
      let isValid = true; // Variable pour tracker la validité

      // Vérifie chaque champ requis
      requiredFields.forEach((field) => {
        // Vérifie si le champ est vide
        if (!field.value.trim()) {
          isValid = false; // Marque le formulaire comme invalide
          // Ajoute une classe d'erreur au champ
          field.classList.add("error");
          // Crée un message d'erreur s'il n'existe pas déjà
          if (
            !field.nextElementSibling ||
            !field.nextElementSibling.classList.contains("error-message")
          ) {
            const errorMsg = document.createElement("span");
            errorMsg.className = "error-message";
            errorMsg.textContent = "Ce champ est requis";
            errorMsg.style.color = "red";
            errorMsg.style.fontSize = "0.875rem";
            errorMsg.style.marginTop = "4px";
            errorMsg.style.display = "block";
            // Insère le message après le champ
            field.parentNode.insertBefore(errorMsg, field.nextSibling);
          }
        } else {
          // Retire la classe d'erreur si le champ est rempli
          field.classList.remove("error");
          // Supprime le message d'erreur s'il existe
          if (
            field.nextElementSibling &&
            field.nextElementSibling.classList.contains("error-message")
          ) {
            field.nextElementSibling.remove();
          }
        }
      });

      // Si le formulaire n'est pas valide, empêche la soumission
      if (!isValid) {
        e.preventDefault();
        // Affiche une alerte
        alert("Veuillez remplir tous les champs requis");
        console.log("❌ Validation du formulaire échouée");
      } else {
        console.log("✅ Formulaire valide - Envoi en cours");
      }
    });

    // Retire les messages d'erreur quand l'utilisateur commence à taper
    const formInputs = contactForm.querySelectorAll("input, textarea");
    formInputs.forEach((input) => {
      input.addEventListener("input", function () {
        // Retire la classe d'erreur
        this.classList.remove("error");
        // Supprime le message d'erreur s'il existe
        if (
          this.nextElementSibling &&
          this.nextElementSibling.classList.contains("error-message")
        ) {
          this.nextElementSibling.remove();
        }
      });
    });
  }

  // ============================================
  // BOUTON RETOUR EN HAUT
  // ============================================

  // Crée un bouton "retour en haut"
  const backToTopButton = document.createElement("button");
  backToTopButton.innerHTML = "↑"; // Flèche vers le haut
  backToTopButton.className = "back-to-top";
  backToTopButton.setAttribute("aria-label", "Retour en haut");
  backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #6366f1;
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        z-index: 1000;
        display: none;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
    `;
  // Ajoute le bouton au body
  document.body.appendChild(backToTopButton);
  console.log("✅ Bouton retour en haut créé");

  // Effet hover sur le bouton
  backToTopButton.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)";
  });
  backToTopButton.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });

  // Affiche le bouton quand on scroll vers le bas
  window.addEventListener("scroll", function () {
    // Affiche le bouton si on a scrollé plus de 300px
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = "block";
      // Petit délai pour l'animation
      setTimeout(function () {
        backToTopButton.style.opacity = "1";
      }, 10);
    } else {
      backToTopButton.style.opacity = "0";
      // Cache le bouton après l'animation
      setTimeout(function () {
        if (window.pageYOffset <= 300) {
          backToTopButton.style.display = "none";
        }
      }, 300);
    }
  });

  // Scroll vers le haut au clic
  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0, // Scroll vers le haut de la page
      behavior: "smooth", // Animation fluide
    });
    console.log("Retour en haut de la page");
  });

  // ============================================
  // TEST FINAL DES FONCTIONNALITÉS
  // ============================================

  console.log("=== RAPPORT D'INITIALISATION ===");
  console.log("Menu hamburger:", hamburger ? "✅" : "❌");
  console.log("Navigation:", navMenu ? "✅" : "❌");
  console.log("Formulaire contact:", contactForm ? "✅" : "❌");
  console.log(
    "Alertes:",
    alerts.length > 0 ? `✅ (${alerts.length})` : "Aucune"
  );
  console.log("Bouton retour en haut:", "✅");
  console.log("================================");
});

// Log final pour confirmer que le script est chargé
console.log("📄 Script main.js chargé et prêt!");

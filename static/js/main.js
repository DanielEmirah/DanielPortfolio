// Attend que le DOM soit complètement chargé avant d'exécuter le code
document.addEventListener("DOMContentLoaded", function () {
  // ============================================
  // MENU MOBILE HAMBURGER
  // ============================================

  // Sélectionne le bouton hamburger
  const hamburger = document.querySelector(".hamburger");
  // Sélectionne le menu de navigation
  const navMenu = document.querySelector(".nav-menu");

  // Vérifie si les éléments existent avant d'ajouter l'événement
  if (hamburger && navMenu) {
    // Ajoute un événement au clic sur le hamburger
    hamburger.addEventListener("click", function () {
      // Toggle (bascule) la classe 'active' sur le menu
      navMenu.classList.toggle("active");
      // Toggle la classe 'active' sur le hamburger pour l'animation
      hamburger.classList.toggle("active");
    });

    // Ferme le menu mobile quand on clique sur un lien
    const navLinks = document.querySelectorAll(".nav-menu a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        // Retire la classe 'active' pour fermer le menu
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  }

  // ============================================
  // FERMETURE DES MESSAGES D'ALERTE
  // ============================================

  // Sélectionne tous les boutons de fermeture des alertes
  const closeButtons = document.querySelectorAll(".close-btn");

  // Ajoute un événement de clic sur chaque bouton
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Trouve l'élément parent (l'alerte) et le supprime
      this.parentElement.remove();
    });
  });

  // Ferme automatiquement les alertes après 5 secondes
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => {
    // SetTimeout exécute le code après un délai (5000ms = 5s)
    setTimeout(function () {
      // Ajoute une animation de disparition
      alert.style.opacity = "0";
      alert.style.transform = "translateY(-20px)";
      // Supprime complètement l'élément après l'animation
      setTimeout(function () {
        alert.remove();
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
  window.addEventListener("scroll", handleScrollAnimation);

  // ============================================
  // SMOOTH SCROLL POUR LES LIENS D'ANCRAGE
  // ============================================

  // Sélectionne tous les liens qui commencent par #
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

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
      }
    });
  });

  // ============================================
  // VALIDATION DU FORMULAIRE DE CONTACT
  // ============================================

  // Sélectionne le formulaire de contact
  const contactForm = document.querySelector("#contact-form");

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
  backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s;
        z-index: 1000;
        display: none;
    `;
  // Ajoute le bouton au body
  document.body.appendChild(backToTopButton);

  // Affiche le bouton quand on scroll vers le bas
  window.addEventListener("scroll", function () {
    // Affiche le bouton si on a scrollé plus de 300px
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = "block";
      backToTopButton.style.opacity = "1";
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
  });
});

// Log pour confirmer que le script est chargé
console.log("Portfolio JavaScript loaded successfully!");

/* ==========================================================
   PORTFOLIO BTS SIO – JAVASCRIPT
   ----------------------------------------------------------
   Sommaire :
   1. Menu mobile (burger)
   2. Thème clair / sombre
   3. Lien actif dans le menu selon la section visible
   4. Filtres des projets
   5. Barres de compétences animées
   6. Formulaire de contact
   7. Année du pied de page
   ========================================================== */


/* ----------------------------------------------------------
   1. MENU MOBILE (BURGER)
   Ouvre et ferme la liste de liens sur petit écran.
   ---------------------------------------------------------- */
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

burger.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);   // pour les lecteurs d’écran
});

// Referme le menu quand on clique sur un lien
menu.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  }
});


/* ----------------------------------------------------------
   2. THÈME CLAIR / SOMBRE
   Le thème initial suit les réglages de l’appareil.
   Le bouton ◐ permet ensuite de changer.
   ---------------------------------------------------------- */
const root = document.documentElement;
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

root.dataset.theme = prefersDark ? 'light' : 'dark';

document.getElementById('theme').addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
});


/* ----------------------------------------------------------
   3. LIEN ACTIF DANS LE MENU
   Surligne le lien de la section actuellement à l’écran.
   ---------------------------------------------------------- */
const navLinks = document.querySelectorAll('.links a');
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    navLinks.forEach((link) => {
      const isCurrent = link.getAttribute('href') === '#' + entry.target.id;
      link.classList.toggle('active', isCurrent);
    });
  });
}, { rootMargin: '-45% 0px -50% 0px' });   // zone de détection au milieu de l’écran

sections.forEach((section) => sectionObserver.observe(section));


/* ----------------------------------------------------------
   4. FILTRES DES PROJETS
   Chaque bouton a un data-filter (all, web, reseau).
   Chaque carte a un data-cat qui doit correspondre.
   ---------------------------------------------------------- */
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.card');

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    const filter = chip.dataset.filter;

    // Met en avant le bouton cliqué
    chips.forEach((c) => c.setAttribute('aria-pressed', c === chip));

    // Affiche ou masque chaque carte
    cards.forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.cat !== filter;
    });
  });
});


/* ----------------------------------------------------------
   5. BARRES DE COMPÉTENCES
   La largeur de chaque barre est lue dans data-w (en %).
   Elle se remplit quand la barre devient visible.
   ---------------------------------------------------------- */
const fills = document.querySelectorAll('.fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.style.width = entry.target.dataset.w + '%';
    barObserver.unobserve(entry.target);   // animation jouée une seule fois
  });
}, { threshold: 0.4 });

fills.forEach((fill) => barObserver.observe(fill));


/* ----------------------------------------------------------
   6. FORMULAIRE DE CONTACT
   Il n’y a pas de serveur : le bouton ouvre la messagerie
   de la personne avec le message déjà écrit.
   Pense à remplacer l’adresse ci-dessous par la tienne.
   ---------------------------------------------------------- */
const MY_EMAIL = 'najaina28@gmail.com';

document.getElementById('send').addEventListener('click', () => {
  const name = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-mail').value.trim();
  const message = document.getElementById('f-msg').value.trim();
  const note = document.getElementById('note');

  // Vérifie que les trois champs sont remplis
  if (!name || !email || !message) {
    note.classList.add('error');
    note.textContent = 'Merci de remplir les trois champs.';
    return;
  }

  // Construit le lien mailto: avec sujet et message
  const subject = encodeURIComponent('Contact depuis votre portfolio');
  const body = encodeURIComponent(message + '\n\n' + name + ' (' + email + ')');

  note.classList.remove('error');
  note.textContent = 'Votre messagerie va s’ouvrir.';
  window.location.href = 'mailto:' + MY_EMAIL + '?subject=' + subject + '&body=' + body;
});


/* ----------------------------------------------------------
   7. ANNÉE DU PIED DE PAGE
   ---------------------------------------------------------- */
document.getElementById('year').textContent = new Date().getFullYear();

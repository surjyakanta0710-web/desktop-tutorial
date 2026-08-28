const pageName = document.body.dataset.page;
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".site-nav a");

navLinks.forEach((link) => {
  const href = link.getAttribute("href") || "";
  if (href.includes(`${pageName}.html`) || (pageName === "home" && href === "index.html")) {
    link.classList.add("is-active");
  }
});

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
});

const meterBars = document.querySelectorAll(".sound-meter span");

if (meterBars.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setInterval(() => {
    meterBars.forEach((bar, index) => {
      const height = 24 + Math.round(Math.sin(Date.now() / 260 + index) * 18 + Math.random() * 34);
      bar.style.height = `${Math.max(18, height)}px`;
    });
  }, 420);
}

const filterButtons = document.querySelectorAll("[data-filter]");
const productCards = document.querySelectorAll("[data-category]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    productCards.forEach((card) => {
      const isVisible = filter === "all" || card.dataset.category === filter;
      card.hidden = !isVisible;
    });
  });
});

const matchForm = document.querySelector("[data-match-form]");
const matchTitle = document.querySelector("[data-match-title]");
const matchText = document.querySelector("[data-match-text]");
const matchScore = document.querySelector("[data-match-score]");

const recommendations = {
  studio: {
    balanced: ["Dixon Monitor 7", "Neutral mids, tight low end, and a calmer treble for editing long sessions.", 88],
    warm: ["Dixon Aura One", "A warmer everyday tuning with enough detail for mixing notes and personal listening.", 76],
    energetic: ["Dixon Stage X", "Fast attack and extra presence make live monitoring and percussion checks easier.", 81],
  },
  stage: {
    balanced: ["Dixon Stage X", "Secure shell geometry, high isolation, and a clean stage image for performers.", 92],
    warm: ["Dixon Aura One", "Comfortable for long sets with a friendlier low-mid body.", 78],
    energetic: ["Dixon Stage X", "The most forward Dixon option, built for drums, guitars, and vocals under pressure.", 95],
  },
  travel: {
    balanced: ["Dixon Pulse Wireless", "Low-latency wireless adapters and a compact charging case for daily carry.", 84],
    warm: ["Dixon Aura One", "Soft-edged tuning and pressure-relief vents keep flights and commutes easy.", 80],
    energetic: ["Dixon Neon Lite", "A bright, compact pair for playlists, gaming, and quick calls.", 74],
  },
};

function updateMatch() {
  if (!matchForm || !matchTitle || !matchText || !matchScore) {
    return;
  }

  const use = matchForm.elements.use.value;
  const sound = matchForm.elements.sound.value;
  const [title, text, score] = recommendations[use][sound];

  matchTitle.textContent = title;
  matchText.textContent = text;
  matchScore.style.width = `${score}%`;
}

if (matchForm) {
  matchForm.addEventListener("change", updateMatch);
  updateMatch();
}

const faqButtons = document.querySelectorAll(".faq-question");

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

const contactForm = document.querySelector(".contact-form");
const formNote = document.querySelector(".form-note");

if (contactForm && formNote) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formNote.classList.add("is-visible");
    contactForm.reset();
  });
}

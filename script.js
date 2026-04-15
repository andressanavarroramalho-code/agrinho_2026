const DEFAULT_FONT_SIZE = 16;
const MIN_FONT_SIZE = 14;
const MAX_FONT_SIZE = 20;
let currentFontSize = DEFAULT_FONT_SIZE;

const applyFontSize = () => {
  document.documentElement.style.fontSize = `${currentFontSize}px`;
};

const increaseFont = () => {
  currentFontSize = Math.min(MAX_FONT_SIZE, currentFontSize + 2);
  applyFontSize();
};

const decreaseFont = () => {
  currentFontSize = Math.max(MIN_FONT_SIZE, currentFontSize - 2);
  applyFontSize();
};

const toggleContrast = () => {
  document.body.classList.toggle('high-contrast');
};

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const accessibilityBtn = document.getElementById('accessibility-btn');
const accessibilityMenu = document.getElementById('accessibility-menu');
const revealElements = document.querySelectorAll('.reveal');
const dots = document.querySelectorAll('.dot');
const navMore = document.querySelector('.nav-more');
const navMoreBtn = document.getElementById('nav-more-btn');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('show');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

if (navMore && navMoreBtn) {
  navMoreBtn.addEventListener('click', () => {
    const isOpen = navMore.classList.toggle('open');
    navMoreBtn.setAttribute('aria-expanded', String(isOpen));
  });

  navMore.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMore.classList.remove('open');
      navMoreBtn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    if (!navMore.contains(event.target)) {
      navMore.classList.remove('open');
      navMoreBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

if (accessibilityBtn && accessibilityMenu) {
  accessibilityBtn.addEventListener('click', () => {
    const isHidden = accessibilityMenu.classList.toggle('hidden');
    accessibilityBtn.setAttribute('aria-expanded', String(!isHidden));
  });
}

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 60) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

const carouselItems = [
  {
    image: './img/sensor-umidade.png',
    title: 'Precisão no Solo',
    description: 'Sensores capacitivos monitoram a umidade sem sofrer corrosão, enviando dados via Wi-Fi.'
  },
  {
    image: './img/dashboard-plantas.png',
    title: 'Dashboard de Controle',
    description: 'Visualize a saúde do seu jardim através de gráficos simples no seu smartphone ou computador.'
  },
  {
    image: './img/automacao-rega.png',
    title: 'Irrigação Inteligente',
    description: 'Válvulas automáticas que liberam água baseadas na necessidade real da espécie monitorada.'
  }
];

let currentSlideIndex = 0;

function updateCarousel() {
  const imgElement = document.getElementById('carousel-image');
  const titleElement = document.getElementById('carousel-title');
  const descElement = document.getElementById('carousel-description');
  const dots = document.querySelectorAll('.dot');

  const item = carouselItems[currentSlideIndex];
  
  // Efeito de transição simples
  imgElement.style.opacity = 0;

setTimeout(() => {
  imgElement.src = item.image;
  titleElement.textContent = item.title;
  descElement.textContent = item.description;

  imgElement.style.opacity = 1;
}, 300);

  // Atualiza as bolinhas (dots)
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlideIndex);
  });
}

function changeSlide(direction) {
  currentSlideIndex += direction;
  if (currentSlideIndex >= carouselItems.length) currentSlideIndex = 0;
  if (currentSlideIndex < 0) currentSlideIndex = carouselItems.length - 1;
  updateCarousel();
}

function currentSlide(index) {
  currentSlideIndex = index;
  updateCarousel();
}

// Inicia o carrossel automático (opcional)
setInterval(() => {
  changeSlide(1);
}, 5000);

const facts = [
  'As plantas emitem sinais elétricos quando estão sob estresse, e sensores de IoT conseguem traduzir isso.',
  'Cerca de 60% das plantas domésticas morrem por excesso de água, não por falta dela.',
  'O termo "Internet das Coisas" refere-se a objetos comuns, como vasos de plantas, conectados à rede.',
  'Sensores de umidade de solo modernos usam tecnologia capacitiva para evitar a corrosão das peças.'
];

const factText = document.getElementById('fact-text');
const factBtn = document.getElementById('fact-btn');
let currentFactIndex = 0;

if (factBtn && factText) {
  factBtn.addEventListener('click', () => {
    let nextIndex;

    do {
      nextIndex = Math.floor(Math.random() * facts.length);
    } while (nextIndex === currentFactIndex && facts.length > 1);

    currentFactIndex = nextIndex;
    factText.textContent = facts[currentFactIndex];
  });
}

const quizForm = document.getElementById('quiz-form');
const quizResult = document.getElementById('quiz-result');

if (quizForm && quizResult) {
  quizForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const answers = ['q1', 'q2', 'q3', 'q4', 'q5'];
    let score = 0;
    let allAnswered = true;

    answers.forEach((question) => {
      const selected = document.querySelector(`input[name="${question}"]:checked`);

      if (!selected) {
        allAnswered = false;
        return;
      }

      if (selected.value === 'certo') {
        score += 1;
      }
    });

    if (!allAnswered) {
      quizResult.textContent = 'Responda todas as perguntas para ver o resultado.';
      quizResult.classList.add('show');
      return;
    }

    const feedbacks = {
      3: 'Parabéns! Você é um verdadeiro expert em tecnologia botânica.',
      2: 'Muito bom! Você entende como a tecnologia pode ajudar a natureza.',
      1: 'Você acertou 1. Que tal ler um pouco mais sobre os sensores na seção Jornada?',
      0: 'Parece que suas plantas precisam de um tradutor urgente! Tente o quiz novamente.'
    };

    quizResult.textContent = `Resultado: ${score}/5. ${feedbacks[score]}`;
    quizResult.classList.add('show');
  });
}

const cardToggles = document.querySelectorAll('.card-toggle');

cardToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const card = toggle.closest('.expandable-card');
    const isOpen = card.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.querySelector('.card-icon').textContent = isOpen ? '−' : '+';
  });
});

const carouselWrapper = document.querySelector('.carousel-wrapper');
if (carouselWrapper) {
  carouselWrapper.addEventListener('mouseenter', stopAutoSlide);
  carouselWrapper.addEventListener('mouseleave', startAutoSlide);
}

updateCarousel();
startAutoSlide();

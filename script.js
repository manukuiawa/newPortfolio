const canvas = document.getElementById("binary-bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = document.getElementById("home").offsetHeight;

const fontSize = 18;
const columns = Math.floor(canvas.width / fontSize);

const drops = [];
const mouse = { x: -9999, y: -9999 };

// inicializa colunas
for (let i = 0; i < columns; i++) {
  drops[i] = Math.random() * canvas.height;
}

document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function draw() {
  // fundo transparente leve para criar rastro
  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(242, 15, 98, 0.7)";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = Math.random() > 0.5 ? "0" : "1";
    const x = i * fontSize;
    const y = drops[i];

    // interação com mouse
    const dx = x - mouse.x;
    const dy = y - mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (Math.abs(x - mouse.x) < 120) {

  const force = (120 - Math.abs(x - mouse.x)) / 3;
  const randomY = (Math.random() - 0.5) * 30;

  ctx.fillText(text, x, y + randomY - force);

} else {
  ctx.fillText(text, x, y);
}

    drops[i] += fontSize;

    if (drops[i] > canvas.height) {
      drops[i] = 0;
    }
  }
}

setInterval(draw, 80);

//Dark Mode
const body = document.querySelector("body");
const buttons = document.querySelectorAll(".btn");
const icons = document.querySelectorAll(".btn__icon");

function store(value) {
  localStorage.setItem("darkmode", value);
}

function applyIconState(isDark) {
  icons.forEach((icon) => {
    icon.classList.remove("fa-sun", "fa-moon");
    icon.classList.add(isDark ? "fa-moon" : "fa-sun");
  });
}

function load() {
  const darkmode = localStorage.getItem("darkmode");

  if (!darkmode) {
    store(false);
    applyIconState(false);
  } else if (darkmode === "true") {
    body.classList.add("darkmode");
    applyIconState(true);
  } else {
    applyIconState(false);
  }
}

load();

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    body.classList.toggle("darkmode");

    icons.forEach((icon) => icon.classList.add("animated"));

    const isDark = body.classList.contains("darkmode");
    store(isDark);
    applyIconState(isDark);

    setTimeout(() => {
      icons.forEach((icon) => icon.classList.remove("animated"));
    }, 500);
  });
});

//Troca de idiomas
document.addEventListener("DOMContentLoaded", () => {
  const langMenus = document.querySelectorAll(".lang-menu");
  const elements = document.querySelectorAll("[data-pt]");
  const options = document.querySelectorAll(".lang-options li");

  function changeLanguage(lang, imgSrc, langLabel) {
    elements.forEach((el) => {
      // Se for input ou textarea, muda placeholder
      if (el.placeholder !== undefined) {
        el.placeholder = el.dataset[lang];
      } else {
        el.textContent = el.dataset[lang];
      }
    });

    langMenus.forEach((menu) => {
      const flag = menu.querySelector(".selected-lang img");
      const text = menu.querySelector(".selected-lang span");

      flag.src = imgSrc;
      text.textContent = langLabel;
      menu.classList.remove("active");
    });

    localStorage.setItem("language", lang);
    localStorage.setItem("languageFlag", imgSrc);
    localStorage.setItem("languageLabel", langLabel);
  }

  langMenus.forEach((menu) => {
    const selectedLang = menu.querySelector(".selected-lang");

    selectedLang.addEventListener("click", () => {
      menu.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target)) {
        menu.classList.remove("active");
      }
    });
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const lang = option.dataset.lang;
      const img = option.dataset.img;
      const label = option.textContent.trim();

      changeLanguage(lang, img, label);
    });
  });

  const savedLang = localStorage.getItem("language");
  const savedFlag = localStorage.getItem("languageFlag");
  const savedLabel = localStorage.getItem("languageLabel");

  if (savedLang && savedFlag && savedLabel) {
    changeLanguage(savedLang, savedFlag, savedLabel);
  }
});

//Mobile Responsivo
const mobileBtn = document.getElementById("mobile_btn");
const mobileMenu = document.getElementById("mobile_menu");
const menuIcon = mobileBtn.querySelector("i");

mobileBtn.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("show");

  document.body.classList.toggle("no-scroll", isOpen);

  menuIcon.classList.toggle("fa-bars", !isOpen);
  menuIcon.classList.toggle("fa-x", isOpen);
});

//Rolagem 
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;

  document.querySelector(".scroll-progress").style.width = scrollPercent + "%";
});

//Efeito Suave
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.5
});

reveals.forEach(reveal => {
  observer.observe(reveal);
});
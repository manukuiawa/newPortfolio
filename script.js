

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

const mobileLinks = document.querySelectorAll('#mobile_nav_list a');

mobileLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // evita jump instantâneo

    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }

    if (mobileMenu.classList.contains('show')) {
      mobileMenu.classList.remove('show');
      document.body.classList.remove('no-scroll');
      menuIcon.classList.toggle("fa-bars", true);
      menuIcon.classList.toggle("fa-x", false);
    }
  });
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
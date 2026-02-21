//botão dark-mode
const body = document.querySelector('body');
const btn = document.querySelector('.btn');
const icon = document.querySelector('.btn__icon');

function store(value) {
    localStorage.setItem('darkmode', value)
;}

function load() {
    const darkmode = localStorage.getItem('darkmode');

    if(!darkmode) {
        store(false);
        icon.classList.add('fa-sun');
    } else if( darkmode === 'true') {
        body.classList.add('darkmode');
        icon.classList.add('fa-moon');

    } else if(darkmode == 'false') {
        icon.classList.add('fa-sun');
    }
}

load();

btn.addEventListener('click', () => {

    body.classList.toggle('darkmode');
    icon.classList.add('animated');
    
    store(body.classList.contains('darkmode'));

    if(body.classList.contains('darkmode')) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    setTimeout(() => {
        icon.classList.remove('animated');
    }, 500);
});

//Menu de Idiomas
const langMenu = document.querySelector('.lang-menu');
const selectedLang = document.querySelector('.selected-lang');
const options = document.querySelectorAll('.lang-options li');
const flag = document.querySelector('.selected-lang img');
const text = document.querySelector('.selected-lang span');

selectedLang.addEventListener('click', () => {
    langMenu.classList.toggle('active');
});

options.forEach(option => {
    option.addEventListener('click', () => {
        const img = option.getAttribute('data-img');
        const langText = option.textContent.trim();

        flag.src = img;
        text.textContent = langText;

        langMenu.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!langMenu.contains(e.target)) {
        langMenu.classList.remove('active');
    }
});

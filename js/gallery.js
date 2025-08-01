const header = document.querySelector('header');
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('.nav-links li a');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-links');

// Toggle para el menú hamburguesa en móviles
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

// Cierra el menú si se hace clic fuera de él en dispositivos móviles
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 900) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
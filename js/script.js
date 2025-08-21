const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const header = document.querySelector('header');
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('.nav-links li a');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-links');


// =====================================================================
// Lógica para sección de noticias
// =====================================================================
const contenedor = document.querySelector('.contenedor-carrusel');
const slides = document.querySelectorAll('.slide');
const flechaIzquierda = document.querySelector('.flecha.izquierda');
const flechaDerecha = document.querySelector('.flecha.derecha');
const totalSlides = slides.length;
let slidesPorVista = 3;
let indice = 0;

// Función para reconfigurar el carrusel según el tamaño de la pantalla
function configurarCarrusel() {
    // Detecta si la pantalla es de escritorio (> 768px) o de móvil (<= 768px)
    if (window.innerWidth > 768) {
        slidesPorVista = 3;
    } else {
        slidesPorVista = 1;
    }

    // Asegurarse de que el índice no sea mayor que el número de pasos posibles
    // Esto previene errores visuales al cambiar el tamaño de la ventana
    const numPasos = totalSlides - (slidesPorVista - 1);
    if (indice >= numPasos) {
        indice = numPasos - 1;
    }
    if (indice < 0) {
        indice = 0;
    }

    // Vuelve a aplicar la transformación con los nuevos valores
    moverCarrusel();
}

// Función que aplica la transformación
function moverCarrusel() {
    const distancia = (100 / slidesPorVista) * indice;
    contenedor.style.transform = `translateX(-${distancia}%)`;
}

// Evento para mover el carrusel a la derecha con bucle infinito
flechaDerecha.addEventListener('click', () => {
    const numPasos = totalSlides - (slidesPorVista - 1);
    indice = (indice + 1) % numPasos;
    moverCarrusel();
});

// Evento para mover el carrusel a la izquierda con bucle infinito
flechaIzquierda.addEventListener('click', () => {
    const numPasos = totalSlides - (slidesPorVista - 1);
    indice = (indice - 1 + numPasos) % numPasos;
    moverCarrusel();
});

// Oyentes de eventos para la adaptabilidad
window.addEventListener('load', configurarCarrusel);
window.addEventListener('resize', configurarCarrusel);

// CULMINA SECCIÓN NOTICIAS


// =====================================================================
// Lógica para el boton de index que te mande arriba
// =====================================================================

    // Lógica para mostrar/ocultar el botón de "Volver arriba"
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }

        // Resaltar el enlace de navegación activo basado en la sección visible
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') && link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    });

    // Desplazamiento suave al hacer clic en el botón "Volver arriba"
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

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

    // Desplazamiento suave al hacer clic en los enlaces de navegación (y cerrar menú móvil)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Si el enlace es interno (empieza con '#'), aplica desplazamiento suave
            if (href && href.startsWith('#')) {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const offsetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    if (window.innerWidth <= 900) {
                        navMenu.classList.remove('active');
                        menuToggle.classList.remove('active');
                    }
                }
            }
        });
    });



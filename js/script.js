document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav-links li a');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-links');

    // Lógica para cargar más/menos noticias
    const loadMoreBtn = document.getElementById('load-more-btn');
    const loadLessBtn = document.getElementById('load-less-btn'); // Nuevo botón "Ver menos"
    const hiddenNewsItems = document.querySelectorAll('.news-item.hidden-news');
    let newsToShowPerClick = 2; // Número de noticias a mostrar por cada clic en "Ver más"
    let currentIndex = 0; // Índice de la próxima noticia oculta a mostrar (o cuantas ya se han mostrado de las ocultas)

    // Función para actualizar la visibilidad de los botones de noticias
    function updateNewsButtonsVisibility() {
        if (currentIndex > 0) { // Si ya se mostró al menos una noticia oculta
            loadLessBtn.style.display = 'inline-block'; // Mostrar el botón "Ver menos"
        } else {
            loadLessBtn.style.display = 'none'; // Ocultar si solo la primera noticia está visible
        }

        if (currentIndex >= hiddenNewsItems.length) { // Si ya se mostraron todas las noticias ocultas
            loadMoreBtn.style.display = 'none'; // Ocultar el botón "Ver más"
        } else {
            loadMoreBtn.style.display = 'inline-block'; // Mostrar el botón "Ver más" si aún quedan
        }
    }

    // Función para mostrar el siguiente lote de noticias
    function showNextNews() {
        let itemsShown = 0;
        for (let i = currentIndex; i < hiddenNewsItems.length && itemsShown < newsToShowPerClick; i++) {
            hiddenNewsItems[i].style.display = 'block';
            itemsShown++;
        }
        currentIndex += itemsShown; // Actualiza el índice por la cantidad de items realmente mostrados
        updateNewsButtonsVisibility();
    }

    // Función para ocultar el lote de noticias y volver al estado anterior
    function showPreviousNews() {
        let itemsToHide = Math.min(newsToShowPerClick, currentIndex); // Ocultar la misma cantidad que se mostró
        for (let i = currentIndex - 1; i >= currentIndex - itemsToHide; i--) {
            if (hiddenNewsItems[i]) { // Asegurarse de que el elemento existe
                hiddenNewsItems[i].style.display = 'none';
            }
        }
        currentIndex -= itemsToHide; // Retrocede el índice
        updateNewsButtonsVisibility();
    }

    // Inicializar la visibilidad de los botones al cargar la página
    updateNewsButtonsVisibility(); // Asegura que "Ver menos" esté oculto y "Ver más" según corresponda

    // Event listeners para los botones de noticias
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', showNextNews);
    }
    if (loadLessBtn) {
        loadLessBtn.addEventListener('click', showPreviousNews);
    }


    // Función para mostrar/ocultar el botón "Volver arriba" y resaltar el enlace activo
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }

        let currentSectionId = '';
        const headerHeight = header.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 1;

            if (scrollY >= sectionTop && scrollY < section.offsetTop + section.clientHeight - headerHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Asegura que solo los enlaces internos reciban la clase 'active'
            if (link.getAttribute('href').startsWith('#') && link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    });

    // Función para desplazamiento suave al hacer clic en el botón "Volver arriba"
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Lógica para el menú hamburguesa
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que el clic en el botón active el listener del document
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Cierre del menú móvil al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        // Solo aplica si el menú está activo y la pantalla es pequeña
        if (navMenu.classList.contains('active') && window.innerWidth <= 900) {
            // Si el clic no fue dentro del menú ni en el botón de hamburguesa
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
            if (href.startsWith('#')) {
                e.preventDefault(); // Previene el comportamiento por defecto del enlace

                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const offsetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    // Cierra el menú desplegable después de hacer clic en un enlace interno (solo en móvil)
                    if (window.innerWidth <= 900) {
                        navMenu.classList.remove('active');
                        menuToggle.classList.remove('active');
                    }
                }
            }
            // Si el enlace no empieza con '#', es un enlace externo y se le permite funcionar normalmente
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav-links li a');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-links');

    const loadMoreBtn = document.getElementById('load-more-btn');
    const loadLessBtn = document.getElementById('load-less-btn');
    const hiddenNewsItems = document.querySelectorAll('.news-item.hidden-news');
    const visitCounter = document.getElementById('visit-counter');

    let newsToShowPerClick = 2;
    let currentIndex = 0;

    function updateNewsButtonsVisibility() {
        loadLessBtn.style.display = currentIndex > 0 ? 'inline-block' : 'none';
        loadMoreBtn.style.display = currentIndex >= hiddenNewsItems.length ? 'none' : 'inline-block';
    }

    function showNextNews() {
        let itemsShown = 0;
        for (let i = currentIndex; i < hiddenNewsItems.length && itemsShown < newsToShowPerClick; i++) {
            hiddenNewsItems[i].style.display = 'block';
            itemsShown++;
        }
        currentIndex += itemsShown;
        updateNewsButtonsVisibility();
    }

    function showPreviousNews() {
        let itemsToHide = Math.min(newsToShowPerClick, currentIndex);
        for (let i = currentIndex - 1; i >= currentIndex - itemsToHide; i--) {
            if (hiddenNewsItems[i]) hiddenNewsItems[i].style.display = 'none';
        }
        currentIndex -= itemsToHide;
        updateNewsButtonsVisibility();
    }

    updateNewsButtonsVisibility();

    if (loadMoreBtn) loadMoreBtn.addEventListener('click', showNextNews);
    if (loadLessBtn) loadLessBtn.addEventListener('click', showPreviousNews);

    window.addEventListener('scroll', () => {
        scrollToTopBtn.style.display = window.scrollY > 400 ? 'block' : 'none';

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
            if (link.getAttribute('href').startsWith('#') && link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && window.innerWidth <= 900) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const offsetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                    if (window.innerWidth <= 900) {
                        navMenu.classList.remove('active');
                        menuToggle.classList.remove('active');
                    }
                }
            }
        });
    });

    // === Contador de visitas con CounterAPI.dev ===
    fetch('https://counterapi.dev/api/v1/team/ana/counter/matriculafiee261/increase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Authorization': 'Bearer TU_API_KEY' // Descomenta si el contador es privado
        }
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('visit-counter').textContent = data.value;
    })
    .catch(error => {
        console.error('Error al contar visitas:', error);
    });
});




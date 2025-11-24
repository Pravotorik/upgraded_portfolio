// Навыки с углами от 12:00 до 18:00 (от -90 до 90 градусов)
const skills = [
    { id: 1, icon: 'fa-code', label: 'Python/C++', angle: 0 },
    { id: 2, icon: 'fa-database', label: 'SQL', angle: 30 },
    { id: 3, icon: 'fa-chart-line', label: 'Анализ данных', angle: 60 },
    { id: 4, icon: 'fa-users', label: 'Scrum/Agile', angle: 90 },
    { id: 5, icon: 'fa-code-branch', label: 'GitHub', angle: 120 },
    { id: 6, icon: 'fa-shield-halved', label: 'Безопасность', angle: 150 },
    { id: 7, icon: 'fa-laptop-code', label: 'Программирование', angle: 180 },
];

// Создание иконок на дуге
function createArcIcons() {
    const arcIcons = document.getElementById('arcIcons');
    if (!arcIcons) return;

    const radius = 240;
    const centerX = 200;
    const centerY = 200;

    skills.forEach(skill => {
        const angleInRadians = (skill.angle * Math.PI) / 180;
        const x = centerX + radius * Math.sin(angleInRadians);
        const y = centerY - radius * Math.cos(angleInRadians);

        const iconElement = document.createElement('div');
        iconElement.className = 'arc-icon';
        iconElement.style.left = `${x}px`;
        iconElement.style.top = `${y}px`;

        iconElement.innerHTML = `
            <div class="arc-icon-circle">
                <i class="fas ${skill.icon}"></i>
            </div>
            <div class="arc-tooltip">${skill.label}</div>
        `;

        arcIcons.appendChild(iconElement);
    });
}

// Управление боковыми меню
function initMenu() {
    const leftSidebar = document.getElementById('leftSidebar');
    const leftToggle = document.getElementById('leftToggle');

    if (leftToggle && leftSidebar) {
        leftToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            leftSidebar.classList.toggle('open');
            leftToggle.classList.toggle('open');
        });

        // Закрытие меню при клике вне области
        document.addEventListener('click', (e) => {
            if (!leftSidebar.contains(e.target) && leftSidebar.classList.contains('open')) {
                leftSidebar.classList.remove('open');
                leftToggle.classList.remove('open');
            }
        });
    }
}

// Плавная прокрутка к секциям
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Закрываем меню на мобильных устройствах
                if (window.innerWidth <= 968) {
                    const leftSidebar = document.getElementById('leftSidebar');
                    const leftToggle = document.getElementById('leftToggle');
                    if (leftSidebar && leftToggle) {
                        leftSidebar.classList.remove('open');
                        leftToggle.classList.remove('open');
                    }
                }
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const scrollObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, scrollObserverOptions);

    // Add fade-in class to elements
    const fadeElements = document.querySelectorAll('.about-card, .project-card, .tech-card');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        scrollObserver.observe(el);
    });
}

// Animate stats counting
function initStatsAnimation() {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = entry.target.querySelectorAll('.stat-number');
                stats.forEach(stat => {
                    const originalText = stat.textContent;
                    const hasPlus = originalText.includes('+');
                    const hasPercent = originalText.includes('%');
                    const target = parseInt(originalText);
                    let current = 0;
                    const increment = target / 40;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = originalText;
                            clearInterval(timer);
                        } else {
                            if (hasPercent) {
                                stat.textContent = Math.floor(current) + '%';
                            } else if (hasPlus) {
                                stat.textContent = Math.floor(current) + '+';
                            } else {
                                stat.textContent = Math.floor(current);
                            }
                        }
                    }, 30);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// Активный пункт меню при скролле
function initActiveMenu() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.icon-nav-item');
    
    // Функция для определения активной секции
    function updateActiveMenu() {
        let current = '';
        const scrollY = window.pageYOffset;
        
        // Проверяем каждую секцию
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100; // Небольшой отступ
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        // Если не нашли активную секцию, проверяем домашнюю страницу
        if (!current && scrollY < 100) {
            current = 'home';
        }
        
        // Обновляем активный пункт меню
        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    // Слушаем события скролла
    window.addEventListener('scroll', updateActiveMenu);
    window.addEventListener('resize', updateActiveMenu);
    
    // Инициализируем при загрузке
    updateActiveMenu();
}

// Кастомный скроллбар прогресса
function initProgressScroll() {
    function updateProgressBar() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const progress = (scrollTop / documentHeight) * 100;
        const progressBar = document.querySelector('.progress-scroll');
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    }

    window.addEventListener('scroll', updateProgressBar);
    window.addEventListener('resize', updateProgressBar);
    updateProgressBar();
}

// Анимация прогресс-баров технологий
function initTechLevelAnimation() {
    const techObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const levelFills = entry.target.querySelectorAll('.level-fill');
                levelFills.forEach(fill => {
                    const width = fill.style.width;
                    fill.style.width = '0%';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 100);
                });
                techObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const techSection = document.querySelector('.technologies-section');
    if (techSection) {
        techObserver.observe(techSection);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    createArcIcons();
    initMenu();
    initSmoothScroll();
    initProgressScroll();
    initScrollAnimations();
    initStatsAnimation();
    initActiveMenu();
    initTechLevelAnimation();
});
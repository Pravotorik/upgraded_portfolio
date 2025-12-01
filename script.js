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

function initSkillsClick() {
    // Обработчик для иконок в арке (главная страница)
    document.addEventListener('click', function(e) {
        // Проверяем, кликнули ли на иконку навыка в арке
        if (e.target.closest('.arc-icon-circle')) {
            e.preventDefault();
            
            // Плавный скролл к секции technologies
            const technologiesSection = document.getElementById('technologies');
            if (technologiesSection) {
                technologiesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });

    // Обработчик для иконок в бургер-меню
    const burgerSkills = document.querySelectorAll('.burger-skill-item');
    burgerSkills.forEach(skill => {
        skill.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Закрываем бургер-меню если открыто
            const burgerMenu = document.getElementById('burgerMenu');
            const burgerToggle = document.getElementById('burgerToggle');
            const burgerOverlay = document.getElementById('burgerOverlay');
            
            if (burgerMenu && burgerMenu.classList.contains('active')) {
                burgerMenu.classList.remove('active');
                if (burgerToggle) burgerToggle.classList.remove('active');
                if (burgerOverlay) burgerOverlay.classList.remove('active');
                document.body.classList.remove('burger-open');
            }
            
            // Плавный скролл к секции technologies
            const technologiesSection = document.getElementById('technologies');
            if (technologiesSection) {
                technologiesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ========== ГИБКИЙ JS-РАСЧЁТ ДУГИ С ИКОНКАМИ ========== */
function createArcIcons() {
    const arcIcons = document.getElementById('arcIcons');
    if (!arcIcons) return;

    const container = document.querySelector('.photo-nav-container');
    const size = container.offsetWidth;
    const radius = window.innerWidth <= 480 ? size * 0.50 : size * 0.60;
    const centerX = size / 2;
    const centerY = size / 2;

    arcIcons.innerHTML = '';

    skills.forEach(skill => {
        const rad = (skill.angle * Math.PI) / 180;
        const x = centerX + radius * Math.sin(rad);
        const y = centerY - radius * Math.cos(rad);

        const iconDiv = document.createElement('div');
        iconDiv.className = 'arc-icon';
        iconDiv.style.left = `${x}px`;
        iconDiv.style.top = `${y}px`;
        iconDiv.innerHTML = `
            <div class="arc-icon-circle" data-skill-id="${skill.id}">
                <i class="fas ${skill.icon}"></i>
            </div>
            <div class="arc-tooltip">${skill.label}</div>
        `;
        
        // Добавляем курсор pointer для интерактивности
        iconDiv.style.cursor = 'pointer';
        
        arcIcons.appendChild(iconDiv);
    });
}

/* ========== УПРАВЛЕНИЕ БОКОВЫМ МЕНЮ + БУРГЕР ========== */
function initMenu() {
    const leftSidebar = document.getElementById('leftSidebar');
    const leftToggle = document.getElementById('leftToggle');
    const burgerMenu = document.getElementById('burgerMenu');
    const burgerToggle = document.getElementById('burgerToggle');
    const burgerOverlay = document.getElementById('burgerOverlay');

    // Боковое меню (десктоп)
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

        // Закрытие меню при клике на пункт меню на мобильных устройствах
        const navItems = document.querySelectorAll('.icon-nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 767) {
                    leftSidebar.classList.remove('open');
                    leftToggle.classList.remove('open');
                }
            });
        });
    }

    // Бургер-меню (мобильный)
    if (burgerToggle && burgerMenu) {
        burgerToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            burgerMenu.classList.toggle('active');
            burgerToggle.classList.toggle('active');
            document.body.classList.toggle('burger-open');
        });

        // Закрытие по оверлею
        if (burgerOverlay) {
            burgerOverlay.addEventListener('click', closeBurgerMenu);
        }

        // Закрытие по пунктам меню
        const burgerNavItems = burgerMenu.querySelectorAll('.burger-nav-item');
        burgerNavItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                closeBurgerMenu();
            });
            // Анимация появления
            item.style.transitionDelay = `${index * 0.05}s`;
        });

        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && burgerMenu.classList.contains('active')) {
                closeBurgerMenu();
            }
        });

        // Swipe жест для закрытия
        let touchStartX = 0;
        let touchEndX = 0;

        burgerMenu.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        burgerMenu.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                closeBurgerMenu();
            }
        }

        function closeBurgerMenu() {
            burgerMenu.classList.remove('active');
            burgerToggle.classList.remove('active');
            document.body.classList.remove('burger-open');
        }
    }
}

/* ========== АКТИВНЫЙ ПУНКТ МЕНЮ ПРИ СКРОЛЛЕ ========== */
function initActiveMenu() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.icon-nav-item, .burger-nav-item');

    function updateActiveMenu() {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        if (!current && scrollY < 100) {
            current = 'home';
        }

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveMenu);
    window.addEventListener('resize', updateActiveMenu);
    updateActiveMenu();
}

/* ========== ПЛАВНАЯ ПРОКРУТКА К СЕКЦИЯМ ========== */
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
            }
        });
    });
}

/* ========== SCROLL ANIMATIONS ========== */
function initScrollAnimations() {
    const scrollObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, scrollObserverOptions);

    const fadeElements = document.querySelectorAll(
        '.profile-card, .project-item, .tech-card, .contact-form-wrapper, .testimonial-item, .info-block'
    );
    
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        scrollObserver.observe(el);
    });
}

/* ========== АНИМАЦИЯ СТАТИСТИКИ ========== */
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

    const profileHeader = document.querySelector('.profile-header');
    if (profileHeader) {
        statsObserver.observe(profileHeader);
    }
}

/* ========== ПРОГРЕСС-БАР СКРОЛЛА ========== */
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

/* ========== АНИМАЦИЯ ПРОГРЕСС-БАРОВ ТЕХНОЛОГИЙ ========== */
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

/* ========== УЛУЧШЕННАЯ ФОРМА С ВАЛИДАЦИЕЙ ========== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('formSuccess');
    const inputs = form ? form.querySelectorAll('input, select, textarea') : [];
    
    // Добавляем живую валидацию
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.required && !input.value) {
                input.classList.add('error');
                shakeElement(input);
            } else {
                input.classList.remove('error');
            }
        });
        
        input.addEventListener('input', () => {
            input.classList.remove('error');
        });
    });

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Проверка всех полей
            let isValid = true;
            inputs.forEach(input => {
                if (input.required && !input.value) {
                    input.classList.add('error');
                    shakeElement(input);
                    isValid = false;
                }
            });
            
            if (!isValid) return;

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            console.log('Отправка формы:', formData);
            
            // Создаем particle explosion в центре формы
            const rect = form.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            createParticleExplosion(centerX, centerY);

            // Показываем сообщение об успехе
            form.style.display = 'none';
            successMessage.style.display = 'flex';

            // Сброс формы через 3 секунды
            setTimeout(() => {
                form.reset();
                form.style.display = 'flex';
                successMessage.style.display = 'none';
                inputs.forEach(input => input.classList.remove('error'));
            }, 3000);
        });
    }
}

/* ========== АНИМАЦИЯ FOOTER ========== */
function initFooterAnimation() {
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const columns = entry.target.querySelectorAll('.footer-column');
                columns.forEach((column, index) => {
                    setTimeout(() => {
                        column.style.opacity = '1';
                        column.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                footerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const footerTop = document.querySelector('.footer-top');
    if (footerTop) {
        const columns = footerTop.querySelectorAll('.footer-column');
        columns.forEach(column => {
            column.style.opacity = '0';
            column.style.transform = 'translateY(20px)';
            column.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        footerObserver.observe(footerTop);
    }
}

/* ========== ПАРАЛЛАКС ЭФФЕКТ ========== */
function initParallax() {
    const profileSection = document.querySelector('.profile-section');
    
    if (profileSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const sectionTop = profileSection.offsetTop;
            const sectionHeight = profileSection.offsetHeight;
            
            if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
                const parallaxValue = (scrolled - sectionTop) * 0.3;
                profileSection.style.backgroundPositionY = parallaxValue + 'px';
            }
        });
    }
}

/* ========== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ========== */
document.addEventListener('DOMContentLoaded', () => {
    // Основные функции
    createArcIcons();
    initMenu();
    initSmoothScroll();
    initProgressScroll();
    initActiveMenu();
    initSkillsClick();
    
    // Анимации
    initScrollAnimations();
    initStatsAnimation();
    initTechLevelAnimation();
    initFooterAnimation();
    initParallax();
    
    // Форма контактов
    initContactForm();

    // Добавляем класс loaded для начальных анимаций
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

/* ========== ОБРАБОТКА ИЗМЕНЕНИЯ РАЗМЕРА ОКНА ========== */
window.addEventListener('resize', createArcIcons);
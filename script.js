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

// Конфигурация
const CONFIG = {
    FORM_ENDPOINT: 'https://getform.io/f/bwnvgroa',
    POLL_INTERVAL: 30000,
    MAX_MESSAGES: 50
};

// Карта тем сообщений
const TOPIC_MAP = {
    'project': { text: 'Проект', color: '#a26769' },
    'collaboration': { text: 'Сотрудничество', color: '#7a4157' },
    'job': { text: 'Работа', color: '#444b6e' },
    'feedback': { text: 'Отзыв', color: '#3d315b' },
    'question': { text: 'Вопрос', color: '#684a52' },
    'complaint': { text: 'Жалоба', color: '#426b69' },
    'other': { text: 'Другое', color: '#795548' }
};

const DEFAULT_ICONS = ['fa-user-tie', 'fa-user-graduate', 'fa-user-md', 'fa-chart-line', 'fa-user-cog', 'fa-user-friends'];

// Готовые отзывы для демонстрации
const DEMO_MESSAGES = [
    {
        id: '1',
        name: 'Талько Дарья',
        email: 'dariya@company.com',
        subject: 'feedback',
        message: 'Анастасия продемонстрировала высокий профессионализм в разработке системы управления учебными планами. Отличный специалист!',
        submitted_at: '2024-12-01T10:30:00.000Z'
    },
    {
        id: '2',
        name: 'Клещёнок Алина',
        email: 'alina@startup.com',
        subject: 'collaboration',
        message: 'Работали вместе над системой оценки компетенций. Коммуникация была на высшем уровне!',
        submitted_at: '2024-11-15T14:20:00.000Z'
    },
    {
        id: '3',
        name: 'Баранова Валерия',
        email: 'valeriya@edu.com',
        subject: 'project',
        message: 'Очень качественно проработана аналитика данных по успеваемости студентов. Рекомендую!',
        submitted_at: '2024-11-10T09:15:00.000Z'
    },
    {
        id: '4',
        name: 'Финдрик Анна',
        email: 'anna@tech.com',
        subject: 'job',
        message: 'Рассматривали кандидатуру на позицию data scientist. Впечатлили навыки работы с Python и SQL.',
        submitted_at: '2024-10-28T16:45:00.000Z'
    },
    {
        id: '5',
        name: 'Стрельчёнок Мария',
        email: 'mariya@university.com',
        subject: 'question',
        message: 'Спасибо за консультацию по вопросам интеграции LMS систем. Очень полезно!',
        submitted_at: '2024-10-15T11:20:00.000Z'
    }
];

/* ========== ОСНОВНЫЕ ФУНКЦИИ ========== */

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function closeBurgerMenu() {
    const burgerMenu = document.getElementById('burgerMenu');
    const burgerToggle = document.getElementById('burgerToggle');
    const burgerOverlay = document.getElementById('burgerOverlay');
    
    if (burgerMenu) burgerMenu.classList.remove('active');
    if (burgerToggle) burgerToggle.classList.remove('active');
    if (burgerOverlay) burgerOverlay.classList.remove('active');
    document.body.classList.remove('burger-open');
}

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
        iconDiv.style.cursor = 'pointer';
        arcIcons.appendChild(iconDiv);
    });
}

function initSkillsClick() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.arc-icon-circle')) {
            e.preventDefault();
            scrollToSection('technologies');
        }
    });

    const burgerSkills = document.querySelectorAll('.burger-skill-item');
    burgerSkills.forEach(skill => {
        skill.addEventListener('click', function(e) {
            e.preventDefault();
            closeBurgerMenu();
            scrollToSection('technologies');
        });
    });
}

/* ========== МЕНЮ И НАВИГАЦИЯ ========== */

function initMenu() {
    const leftSidebar = document.getElementById('leftSidebar');
    const leftToggle = document.getElementById('leftToggle');
    const burgerMenu = document.getElementById('burgerMenu');
    const burgerToggle = document.getElementById('burgerToggle');
    const burgerOverlay = document.getElementById('burgerOverlay');

    if (leftToggle && leftSidebar) {
        leftToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            leftSidebar.classList.toggle('open');
            leftToggle.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!leftSidebar.contains(e.target) && leftSidebar.classList.contains('open')) {
                leftSidebar.classList.remove('open');
                leftToggle.classList.remove('open');
            }
        });

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

    if (burgerToggle && burgerMenu) {
        burgerToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            burgerMenu.classList.toggle('active');
            burgerToggle.classList.toggle('active');
            burgerOverlay.classList.toggle('active');
            document.body.classList.toggle('burger-open');
        });

        if (burgerOverlay) burgerOverlay.addEventListener('click', closeBurgerMenu);

        const burgerNavItems = burgerMenu.querySelectorAll('.burger-nav-item');
        burgerNavItems.forEach((item, index) => {
            item.addEventListener('click', closeBurgerMenu);
            item.style.transitionDelay = `${index * 0.05}s`;
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && burgerMenu.classList.contains('active')) {
                closeBurgerMenu();
            }
        });

        let touchStartX = 0;
        burgerMenu.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        burgerMenu.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) closeBurgerMenu();
        });
    }
}

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

        if (!current && scrollY < 100) current = 'home';

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href === `#${current}`) item.classList.add('active');
        });
    }

    window.addEventListener('scroll', updateActiveMenu);
    updateActiveMenu();
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function initScrollAnimations() {
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), index * 100);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.profile-card, .project-item, .tech-card, .contact-form-wrapper, .testimonial-item, .info-block').forEach(el => {
        el.classList.add('fade-in');
        scrollObserver.observe(el);
    });
}

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
    if (profileHeader) statsObserver.observe(profileHeader);
}

function initProgressScroll() {
    function updateProgressBar() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const progress = (scrollTop / documentHeight) * 100;
        const progressBar = document.querySelector('.progress-scroll');
        if (progressBar) progressBar.style.width = progress + '%';
    }
    window.addEventListener('scroll', updateProgressBar);
    updateProgressBar();
}

function initTechLevelAnimation() {
    const techObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const levelFills = entry.target.querySelectorAll('.level-fill');
                levelFills.forEach(fill => {
                    const width = fill.style.width;
                    fill.style.width = '0%';
                    setTimeout(() => fill.style.width = width, 100);
                });
                techObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const techSection = document.querySelector('.technologies-section');
    if (techSection) techObserver.observe(techSection);
}

/* ========== ФОРМА ОБРАТНОЙ СВЯЗИ (ТОЛЬКО ОТПРАВКА) ========== */

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.action = CONFIG.FORM_ENDPOINT;
    
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearError(input));
    });
    
    function validateField(field) {
        clearError(field);
        
        if (field.required && !field.value.trim()) {
            showError(field, 'Это поле обязательно для заполнения');
            return false;
        }
        
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                showError(field, 'Введите корректный email адрес');
                return false;
            }
        }
        
        return true;
    }
    
    function showError(field, message) {
        field.classList.add('error');
        const errorDiv = field.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
    }
    
    function clearError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.error-message');
        if (errorDiv) errorDiv.style.display = 'none';
    }
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => { if (!validateField(input)) isValid = false; });
        
        if (!isValid) {
            const firstError = form.querySelector('.error');
            if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        
        const submitBtn = document.getElementById('submitBtn');
        const successMessage = document.getElementById('formSuccess');
        const errorMessage = document.getElementById('formError');
        
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Отправка...';
        
        try {
            const formData = new FormData(form);
            const response = await fetch(CONFIG.FORM_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                successMessage.style.display = 'flex';
                form.style.display = 'none';
                
                // Через 2 секунды скрываем сообщение об успехе
                setTimeout(() => {
                    successMessage.style.display = 'none';
                    form.style.display = 'flex';
                    form.reset();
                    resetSubmitButton();
                }, 2000);
            } else {
                throw new Error('Ошибка сервера');
            }
            
        } catch (error) {
            console.error('Ошибка отправки формы:', error);
            errorMessage.style.display = 'flex';
            
            setTimeout(() => {
                errorMessage.style.display = 'none';
                resetSubmitButton();
            }, 3000);
        }
        
        function resetSubmitButton() {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Отправить сообщение';
        }
    });
}

/* ========== ОТОБРАЖЕНИЕ И ПРОЛИСТЫВАНИЕ ОТЗЫВОВ ========== */

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Сегодня';
    if (diffDays === 1) return 'Вчера';
    if (diffDays < 7) return `${diffDays} дня назад`;
    
    const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function formatTime(dateString) {
    return new Date(dateString).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

function createMessageHTML(message, index) {
    const topic = TOPIC_MAP[message.subject] || TOPIC_MAP['other'];
    const iconIndex = index % DEFAULT_ICONS.length;
    const isToday = new Date(message.submitted_at).toDateString() === new Date().toDateString();
    
    return `
        <div class="testimonial-slide" data-id="${message.id}">
            <div class="testimonial-item ${isToday ? 'new-message' : ''}">
                <div class="testimonial-header">
                    <div class="testimonial-avatar" style="background: ${topic.color}">
                        <i class="fas ${DEFAULT_ICONS[iconIndex]}"></i>
                    </div>
                    <div class="testimonial-info">
                        <h4>${message.name || 'Аноним'}</h4>
                        <p>${message.email || message.phone || 'Клиент'}</p>
                    </div>
                </div>
                <div class="testimonial-topic">
                    <span class="topic-badge" style="background: ${topic.color}">${topic.text}</span>
                    ${isToday ? '<span class="new-badge">НОВОЕ</span>' : ''}
                </div>
                <p class="testimonial-text">
                    "${message.message}"
                </p>
                <div class="testimonial-meta">
                    <div class="testimonial-date">${formatDate(message.submitted_at)}</div>
                    <div class="testimonial-time">${formatTime(message.submitted_at)}</div>
                </div>
            </div>
        </div>
    `;
}

function loadAndDisplayMessages() {
    const track = document.getElementById('testimonialsTrack');
    if (!track) return;
    
    const messages = DEMO_MESSAGES;
    
    if (messages.length === 0) {
        track.innerHTML = '<div class="loading-message">Сообщений пока нет</div>';
        return;
    }
    
    // Очищаем и добавляем все сообщения
    track.innerHTML = '';
    messages.forEach((message, index) => {
        const slideHTML = createMessageHTML(message, index);
        track.innerHTML += slideHTML;
    });
    
    // Делаем первый слайд активным
    const slides = track.querySelectorAll('.testimonial-slide');
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }
    
    // Обновляем индикаторы
    updateIndicators(messages.length);
    
    // Обновляем статистику
    updateStats(messages);
    
    // Инициализируем карусель
    initCarouselControls(messages.length);
}

function updateIndicators(count) {
    const indicatorsContainer = document.querySelector('.testimonials-indicators');
    if (!indicatorsContainer) return;
    
    indicatorsContainer.innerHTML = '';
    const maxIndicators = Math.min(count, 10);
    
    for (let i = 0; i < maxIndicators; i++) {
        const indicator = document.createElement('span');
        indicator.className = `indicator ${i === 0 ? 'active' : ''}`;
        indicator.dataset.index = i;
        indicatorsContainer.appendChild(indicator);
    }
}

function updateStats(messages) {
    const today = new Date().toDateString();
    const todayMessages = messages.filter(msg => 
        new Date(msg.submitted_at).toDateString() === today
    ).length;
    
    const totalEl = document.getElementById('totalMessages');
    const todayEl = document.getElementById('todayMessages');
    
    if (totalEl) totalEl.textContent = messages.length;
    if (todayEl) todayEl.textContent = todayMessages;
}

function initCarouselControls(totalSlides) {
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (!track || totalSlides === 0) return;
    
    let currentIndex = 0;
    const slides = track.querySelectorAll('.testimonial-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    function updateCarousel() {
        // Убираем transform так как используем opacity для показа/скрытия
        track.style.transform = 'translateX(0)';
        
        // Обновляем слайды
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });
        
        // Обновляем индикаторы
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Обновляем кнопки
        if (prevBtn) {
            const isFirst = currentIndex === 0;
            prevBtn.disabled = isFirst;
            prevBtn.style.opacity = isFirst ? '0.5' : '1';
            prevBtn.style.cursor = isFirst ? 'not-allowed' : 'pointer';
        }
        
        if (nextBtn) {
            const isLast = currentIndex >= totalSlides - 1;
            nextBtn.disabled = isLast;
            nextBtn.style.opacity = isLast ? '0.5' : '1';
            nextBtn.style.cursor = isLast ? 'not-allowed' : 'pointer';
        }
    }
    
    // Обработчики событий
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalSlides - 1) {
                currentIndex++;
                updateCarousel();
            }
        });
    }
    
    // Обработчики для индикаторов
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Свайпы на мобильных
    let touchStartX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const difference = touchStartX - touchEndX;
        
        if (Math.abs(difference) > 50) {
            if (difference > 0 && currentIndex < totalSlides - 1) {
                currentIndex++;
                updateCarousel();
            } else if (difference < 0 && currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }
    });
    
    // Клавиатурная навигация
    document.addEventListener('keydown', (e) => {
        const carouselRect = track.getBoundingClientRect();
        if (carouselRect.top < window.innerHeight && carouselRect.bottom > 0) {
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                e.preventDefault();
                currentIndex--;
                updateCarousel();
            } else if (e.key === 'ArrowRight' && currentIndex < totalSlides - 1) {
                e.preventDefault();
                currentIndex++;
                updateCarousel();
            }
        }
    });
    
    updateCarousel();
}

/* ========== КНОПКА "НАВЕРХ" ========== */

function initScrollToTopButton() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    if (!scrollToTopBtn) return;
    
    // Показываем/скрываем кнопку при прокрутке
    function toggleScrollToTopButton() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
    
    // Прокрутка к верху страницы
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Фокус для доступности
        const firstFocusableElement = document.querySelector('header, .left-sidebar, .burger-toggle, #home');
        if (firstFocusableElement) {
            firstFocusableElement.setAttribute('tabindex', '-1');
            firstFocusableElement.focus();
        }
    }
    
    // Обработчики событий
    window.addEventListener('scroll', toggleScrollToTopButton);
    scrollToTopBtn.addEventListener('click', scrollToTop);
    
    // Клавиша Enter для доступности
    scrollToTopBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToTop();
        }
    });
    
    // Инициализация при загрузке
    toggleScrollToTopButton();
}

/* ========== ИНИЦИАЛИЗАЦИЯ ========== */

document.addEventListener('DOMContentLoaded', () => {
    createArcIcons();
    initMenu();
    initSmoothScroll();
    initProgressScroll();
    initActiveMenu();
    initSkillsClick();
    initScrollAnimations();
    initStatsAnimation();
    initTechLevelAnimation();
    initContactForm();
    loadAndDisplayMessages(); // Загружаем демо-отзывы
    initScrollToTopButton(); // Инициализируем кнопку "Наверх"
});

window.addEventListener('resize', createArcIcons);
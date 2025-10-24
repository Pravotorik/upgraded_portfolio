// Навыки с углами от 12:00 до 18:00 (от -90 до 90 градусов)
// https://fontawesome.com/icons/code-branch?s=solid 
const skills = [
    { id: 1, icon: 'fa-code', label: 'Python/C++', angle: 0 },
    { id: 2, icon: 'fa-database', label: 'SQL', angle: 30 },
    { id: 3, icon: 'fa-chart-line', label: 'Анализ данных', angle: 60 },
    { id: 4, icon: 'fa-users', label: 'Scrum/Agile', angle: 90 },
    { id: 5, icon: 'fa-code-branch', label: 'GitHub', angle: 120 },
    { id: 6, icon: 'fa-shield-halved', label: 'Безопасность', angle: 150 },
    { id: 7, icon: 'fa-laptop-code', label: 'Програмирование', angle: 180 },
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
        });

        // Закрытие меню при клике вне области
        document.addEventListener('click', (e) => {
            if (!leftSidebar.contains(e.target) && leftSidebar.classList.contains('open')) {
                leftSidebar.classList.remove('open');
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
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Закрываем меню после клика на мобильных устройствах
                if (window.innerWidth <= 968) {
                    const leftSidebar = document.getElementById('leftSidebar');
                    if (leftSidebar) {
                        leftSidebar.classList.remove('open');
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
    const fadeElements = document.querySelectorAll('.about-text, .skills-grid, .about-stats, .floating-card, .project-card');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        scrollObserver.observe(el);
    });
}

// Animate stats counting
function initStatsAnimation() {
    const animateStats = () => {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const originalText = stat.textContent;
            const target = parseInt(originalText);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = originalText;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }, 40);
        });
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// Анимация появления карточек достижений
function initCardsAnimation() {
    const cardsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        cardsObserver.observe(card);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createArcIcons();
    initMenu();
    initSmoothScroll();
    initScrollAnimations();
    initStatsAnimation();
    initCardsAnimation();
});
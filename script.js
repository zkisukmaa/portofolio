let currentSlide = 0;
let isTransitioning = false;

const slides = [
    { title: 'Biodata', id: 'slide-0' },
    { title: 'Cita-Cita', id: 'slide-1' },
    { title: 'Skills & Keahlian', id: 'slide-2' }
];

// Initialize DOM elements
let slideElements, indicators, currentTitle, slideCounter, prevBtn, nextBtn;

function initializeElements() {
    slideElements = document.querySelectorAll('.slide');
    indicators = document.querySelectorAll('.indicator');
    currentTitle = document.getElementById('currentTitle');
    slideCounter = document.getElementById('slideCounter');
    prevBtn = document.getElementById('prevBtn');
    nextBtn = document.getElementById('nextBtn');
}

function updateSlide(index) {
    if (isTransitioning) return;
    
    isTransitioning = true;
    
    // Remove active class from all slides and indicators
    slideElements.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    slideElements[index].classList.add('active');
    indicators[index].classList.add('active');
    
    // Update title and counter with typing effect
    slideCounter.textContent = `${index + 1} of ${slides.length}`;
    addTypingEffect(currentTitle, slides[index].title, 80);
    
    currentSlide = index;
    
    // Update progress bar if it exists
    updateProgressBar();
    
    setTimeout(() => {
        isTransitioning = false;
    }, 500);
}

function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    updateSlide(next);
}

function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide(prev);
}

// Add typing animation to titles
function addTypingEffect(element, text, speed = 100) {
    if (!element) return;
    element.textContent = '';
    let i = 0;
    
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, speed);
}

// Generate floating code elements dynamically
function createFloatingCodeElements() {
    const codeSnippets = [
        'function()', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while',
        'class', 'extends', 'import', 'export', 'async', 'await', 'try', 'catch',
        '{', '}', '(', ')', '<', '>', '/', '=', '+', '-', '=>', '&&', '||'
    ];
    
    const container = document.querySelector('.code-background');
    if (!container) return;
    
    // Create multiple sets of floating elements
    for (let i = 0; i < 25; i++) {
        const element = document.createElement('div');
        const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        
        element.textContent = snippet;
        element.style.position = 'absolute';
        element.style.color = 'rgba(34, 197, 94, 0.08)';
        element.style.fontFamily = '"Courier New", monospace';
        element.style.fontSize = Math.random() * 8 + 10 + 'px';
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        element.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
        element.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
        element.style.animationDelay = Math.random() * 5 + 's';
        element.style.pointerEvents = 'none';
        element.style.userSelect = 'none';
        
        container.appendChild(element);
    }
}

// Add interactive hover effects
function addInteractiveEffects() {
    const cards = document.querySelectorAll('.info-card, .goal-card, .skill-category');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Progress bar functionality
let progressBar;

function createProgressBar() {
    progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #22c55e, #3b82f6);
        transition: width 0.3s ease;
        z-index: 1000;
    `;
    document.body.appendChild(progressBar);
    
    return progressBar;
}

function updateProgressBar() {
    if (progressBar) {
        const progress = ((currentSlide + 1) / slides.length) * 100;
        progressBar.style.width = progress + '%';
    }
}

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchStartY = 0;

function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}

function handleTouchEnd(e) {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Only trigger if horizontal swipe is more significant than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
            prevSlide(); // Swipe right -> previous slide
        } else {
            nextSlide(); // Swipe left -> next slide
        }
    }
}

// Event listeners setup
function setupEventListeners() {
    // Navigation buttons
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Slide indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => updateSlide(index));
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key >= '1' && e.key <= '3') {
            updateSlide(parseInt(e.key) - 1);
        }
    });
    
    // Touch events
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
}

// Auto-slide functionality (optional)
let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        if (!isTransitioning) {
            nextSlide();
        }
    }, 8000); // Change slide every 8 seconds
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

// Initialize everything
function init() {
    initializeElements();
    setupEventListeners();
    createFloatingCodeElements();
    addInteractiveEffects();
    createProgressBar();
    updateSlide(0);
    
    // Optional: Start auto-slide (uncomment the line below)
    // startAutoSlide();
    
    console.log('🚀 Portfolio Slider Loaded!');
    console.log('💡 Tips:');
    console.log('  - Use arrow keys to navigate');
    console.log('  - Press 1, 2, or 3 to jump to specific slides');
    console.log('  - Swipe left/right on mobile devices');
}

// Pause auto-slide on user interaction
function pauseAutoSlideOnInteraction() {
    document.addEventListener('keydown', stopAutoSlide);
    document.addEventListener('click', stopAutoSlide);
    document.addEventListener('touchstart', stopAutoSlide);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    pauseAutoSlideOnInteraction();
});

// Export functions for potential external use
window.portfolioSlider = {
    nextSlide,
    prevSlide,
    goToSlide: (index) => {
        if (index >= 0 && index < slides.length) {
            updateSlide(index);
        }
    },
    getCurrentSlide: () => currentSlide,
    getTotalSlides: () => slides.length,
    startAutoSlide,
    stopAutoSlide
};
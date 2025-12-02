/* ============================================
   ADVANCED ANIMATIONS
   Additional animation effects and interactions
   ============================================ */

/* ==================== STAGGER ANIMATIONS ==================== */
function initStaggerAnimations() {
    const staggerElements = document.querySelectorAll('.stagger-item');
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on index
                entry.target.style.animationDelay = `${index * 0.1}s`;
                entry.target.classList.add('visible');
                staggerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    staggerElements.forEach(el => staggerObserver.observe(el));
}

/* ==================== HOVER GLOW EFFECT ==================== */
function initHoverGlow() {
    const glowElements = document.querySelectorAll('.hover-glow');
    
    glowElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(0, 122, 255, 0.5)';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

/* ==================== TYPING EFFECT (Optional) ==================== */
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Example usage (uncomment to use):
// const heroTitle = document.querySelector('.hero-title');
// if (heroTitle) {
//     typeWriter(heroTitle, 'Crafting experiences for Apple platforms.', 30);
// }

/* ==================== MAGNETIC BUTTONS ==================== */
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.magnetic-btn');
    
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

/* ==================== SCROLL REVEAL DIRECTION ==================== */
function initScrollReveal() {
    const revealElements = {
        left: document.querySelectorAll('.reveal-left'),
        right: document.querySelectorAll('.reveal-right'),
        up: document.querySelectorAll('.reveal-up'),
        down: document.querySelectorAll('.reveal-down')
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });
    
    // Observe all reveal elements
    Object.values(revealElements).forEach(group => {
        group.forEach(el => revealObserver.observe(el));
    });
}

/* ==================== NUMBER COUNT UP ANIMATION ==================== */
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

/* ==================== INITIALIZE ALL ANIMATIONS ==================== */
document.addEventListener('DOMContentLoaded', () => {
    initStaggerAnimations();
    initHoverGlow();
    initMagneticButtons();
    initScrollReveal();
});
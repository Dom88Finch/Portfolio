/* ============================================
   MAIN JAVASCRIPT
   Core functionality and initialization
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded successfully! 🚀');
    
    // Initialize all features
    initScrollProgress();
    initSmoothScroll();
    // init3DCardEffects();
    initScrollAnimations();
});

/* ==================== SCROLL PROGRESS BAR ==================== */
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        // Calculate scroll percentage
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        
        // Update progress bar width
        progressBar.style.width = scrolled + '%';
    });
}

/* ==================== SMOOTH SCROLL FOR ANCHOR LINKS ==================== */
function initSmoothScroll() {
    // Select all links that start with #
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Ignore empty anchors
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                // Smooth scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });
}
// Removed for the time being as it is breaking the code and interupting our userflow
// /* ==================== 3D CARD HOVER EFFECTS ==================== */
// function init3DCardEffects() {
//     const cards = document.querySelectorAll('.app-card-3d');
    
//     cards.forEach(card => {
//         // Add transform style
//         card.style.transformStyle = 'preserve-3d';
//         card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        
//         // Mouse move event for 3D tilt
//         card.addEventListener('mousemove', (e) => {
//             const rect = card.getBoundingClientRect();
//             const x = e.clientX - rect.left; // X position within the element
//             const y = e.clientY - rect.top;  // Y position within the element
            
//             const centerX = rect.width / 2;
//             const centerY = rect.height / 2;
            
//             // Calculate rotation angles (max 10 degrees)
//             const rotateX = (y - centerY) / 3;
//             const rotateY = (centerX - x) / 3;
            
//             // Apply 3D transform
//             card.style.transform = `
//                 perspective(1000px)
//                 rotateX(${rotateX}deg)
//                 rotateY(${rotateY}deg)
//                 scale3d(1.02, 1.02, 1.02)
//             `;
//         });
        
//         // Reset on mouse leave
//         card.addEventListener('mouseleave', () => {
//             card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
//         });
//     });
// }

/* ==================== SCROLL ANIMATIONS (Intersection Observer) ==================== */
function initScrollAnimations() {
    // Options for the observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    // Create the observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger animation
                entry.target.classList.add('visible');
                // Stop observing this element
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with fade-in-scroll class
    document.querySelectorAll('.fade-in-scroll').forEach(el => {
        observer.observe(el);
    });
}

/* ==================== PARALLAX EFFECT ==================== */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Apply parallax to background elements
    document.querySelectorAll('.parallax-bg').forEach(el => {
        el.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
});

/* ==================== LAZY LOADING IMAGES ==================== */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Replace data-src with src
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                }
                
                // Stop observing this image
                imageObserver.unobserve(img);
            }
        });
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ==================== MOBILE MENU TOGGLE (If needed) ==================== */
// Uncomment if you add a hamburger menu for mobile
/*
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}
*/

/* ==================== PERFORMANCE MONITORING ==================== */
// Log page load performance
window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
    }
});


/* ==================== Handle Gallery Popup Detailed View ========================= */
// App3 Gallery Lightbox (only for this specific gallery)
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('app3Gallery');
    if (!gallery) return; // Exit if gallery doesn't exist
    
    const lightbox = document.getElementById('app3Lightbox');
    const lightboxImage = document.getElementById('app3LightboxImage');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-arrow-left');
    const nextBtn = lightbox.querySelector('.lightbox-arrow-right');
    const counter = lightbox.querySelector('.lightbox-counter');
    const backdrop = lightbox.querySelector('.lightbox-backdrop');
    
    // Only get images from THIS gallery
    const macWindows = gallery.querySelectorAll('.mac-window');
    
    let currentIndex = 0;
    const screenshots = Array.from(macWindows).map(window => {
        const img = window.querySelector('img');
        return {
            src: img.src,
            alt: img.alt
        };
    });
    
    function openLightbox(index) {
        currentIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function updateLightboxImage() {
        lightboxImage.src = screenshots[currentIndex].src;
        lightboxImage.alt = screenshots[currentIndex].alt;
        counter.textContent = `${currentIndex + 1} / ${screenshots.length}`;
    }
    
    function showNext() {
        currentIndex = (currentIndex + 1) % screenshots.length;
        updateLightboxImage();
    }
    
    function showPrev() {
        currentIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
        updateLightboxImage();
    }
    
    // Event Listeners - only for this gallery
    macWindows.forEach((window, index) => {
        window.addEventListener('click', () => openLightbox(index));
    });
    
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);
    backdrop.addEventListener('click', closeLightbox);
    
    // Keyboard navigation (only when lightbox is open)
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
});

function openLightbox(index) {
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Force reflow to ensure proper positioning
    lightbox.offsetHeight;
    
    // Scroll lightbox to top if needed
    lightbox.scrollTop = 0;
}



// Function to improve the performance of our IOS design of phone in order to visualise the gallery of images properly 

let currentSlideIndex = 1;

// Show specific slide
function currentSlide(n) {
    showSlide(currentSlideIndex = n);
}

// Change slide by increment
function changeSlide(n) {
    showSlide(currentSlideIndex += n);
}

// Main slide function
function showSlide(n) {
    const slides = document.querySelectorAll('.phone-mockup');
    const dots = document.querySelectorAll('.dot');
    
    // Loop back to first/last slide
    if (n > slides.length) { currentSlideIndex = 1; }
    if (n < 1) { currentSlideIndex = slides.length; }
    
    // Hide all slides and deactivate all dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide and activate current dot
    slides[currentSlideIndex - 1].classList.add('active');
    dots[currentSlideIndex - 1].classList.add('active');
}

// Auto-play slideshow (optional - uncomment to enable)
// setInterval(() => changeSlide(1), 3000); // Change slide every 3 seconds

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

const slideshowContainer = document.querySelector('.slideshow-container');

slideshowContainer.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

slideshowContainer.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) changeSlide(1);  // Swipe left
    if (touchEndX > touchStartX + 50) changeSlide(-1); // Swipe right
}
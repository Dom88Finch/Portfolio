/* ============================================
   CUSTOM CURSOR
   Custom cursor with smooth following effect
   Only active on desktop devices
   ============================================ */

(function() {
    // Only run on desktop
    if (window.innerWidth < 1024) return;
    
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursorDot || !cursorOutline) return;
    
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    /* ==================== MOUSE MOVE TRACKING ==================== */
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Dot follows immediately
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    /* ==================== SMOOTH OUTLINE FOLLOWING ==================== */
    function animateOutline() {
        // Smooth following effect (lerp)
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        // Center the outline (subtract half width/height)
        cursorOutline.style.left = (outlineX - 20) + 'px';
        cursorOutline.style.top = (outlineY - 20) + 'px';
        
        requestAnimationFrame(animateOutline);
    }
    
    animateOutline();
    
    /* ==================== HOVER EFFECTS ==================== */
    const interactiveElements = document.querySelectorAll('a, button, .phone-mockup, .app-card-3d');
    
    interactiveElements.forEach(el => {
        // Expand cursor on hover
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'scale(2)';
            cursorDot.style.background = 'var(--apple-purple)';
            cursorOutline.style.transform = 'scale(1.5)';
            cursorOutline.style.borderColor = 'var(--apple-purple)';
        });
        
        // Reset on leave
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'scale(1)';
            cursorDot.style.background = 'var(--apple-blue)';
            cursorOutline.style.transform = 'scale(1)';
            cursorOutline.style.borderColor = 'var(--apple-blue)';
        });
    });
    
    /* ==================== CLICK EFFECT ==================== */
    document.addEventListener('mousedown', () => {
        cursorDot.style.transform = 'scale(0.5)';
        cursorOutline.style.transform = 'scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursorDot.style.transform = 'scale(1)';
        cursorOutline.style.transform = 'scale(1)';
    });
    
    /* ==================== HIDE WHEN LEAVING WINDOW ==================== */
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '0.6';
        cursorOutline.style.opacity = '0.6';
    });
    
    console.log('Custom cursor initialized 🖱️');
})();
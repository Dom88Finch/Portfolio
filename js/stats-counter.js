/* ============================================
   STATS COUNTER ANIMATION
   Animated number counting for statistics
   ============================================ */

(function() {
    const stats = document.querySelectorAll('.stat-number');
    const speed = 200; // Lower = faster
    let triggered = false; // Ensure animation runs only once
    
    /* ==================== ANIMATE COUNTER ==================== */
    function animateCounter(stat) {
        const target = +stat.getAttribute('data-target');
        const count = +stat.innerText;
        
        // Calculate increment
        const increment = target / speed;
        
        if (count < target) {
            // Update the count
            stat.innerText = Math.ceil(count + increment);
            
            // Call function again after delay
            setTimeout(() => animateCounter(stat), 15);
        } else {
            // Ensure we hit the exact target
            stat.innerText = target.toLocaleString();
        }
    }
    
    /* ==================== INTERSECTION OBSERVER ==================== */
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !triggered) {
                triggered = true;
                
                // Animate each stat
                stats.forEach(stat => {
                    // Reset to 0 before animating
                    stat.innerText = '0';
                    
                    // Start animation with slight delay
                    setTimeout(() => {
                        animateCounter(stat);
                    }, 200);
                });
                
                // Stop observing after first trigger
                statsObserver.disconnect();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% visible
    });
    
    /* ==================== OBSERVE STATS SECTION ==================== */
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    /* ==================== ALTERNATIVE: EASING FUNCTION ==================== */
    function animateCounterWithEasing(stat) {
        const target = +stat.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out cubic)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);
            
            stat.innerText = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                stat.innerText = target.toLocaleString();
            }
        }
        
        requestAnimationFrame(update);
    }
    
    // Uncomment to use easing version instead:
    // stats.forEach(stat => animateCounterWithEasing(stat));
    
})();
/* ============================================
   DARK MODE TOGGLE
   Handles theme switching with localStorage persistence
   ============================================ */

(function() {
    const themeToggle = document.getElementById('theme-btn');
    const htmlElement = document.documentElement;
    const iconElement = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on load
    htmlElement.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);
    updateAppIcons(); // ← NEW

    // Listen for theme toggle button click
    themeToggle.addEventListener('click', toggleTheme);
    
    /* ==================== TOGGLE THEME ==================== */
    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply new theme
        htmlElement.setAttribute('data-theme', newTheme);
        
        // Save preference
        localStorage.setItem('theme', newTheme);
        
        // Update button icon
        updateIcon(newTheme);
        
        updateAppIcons(); // ← NEW
        
        // Add transition class for smooth theme change
        document.body.classList.add('theme-transitioning');
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 300);
        
        // Log theme change
        console.log(`Theme switched to: ${newTheme}`);
    }
    
    /* ==================== UPDATE ICON ==================== */
    function updateIcon(theme) {
        // Change icon based on current theme
        if (theme === 'dark') {
            iconElement.className = 'fa-solid fa-sun';
        } else {
            iconElement.className = 'fa-solid fa-moon';
        }
    }

     // ← ADD THIS ENTIRE FUNCTION
    function updateAppIcons() {
        document.querySelectorAll('.app-icon img[data-dark]').forEach(img => {
            const isDark = htmlElement.getAttribute('data-theme') === 'dark';
            img.src = isDark ? img.dataset.dark : img.dataset.light;
        });
    }
    
    /* ==================== KEYBOARD SHORTCUT (Optional) ==================== */
    // Press 'D' key to toggle dark mode
    document.addEventListener('keydown', (e) => {
        if (e.key === 'd' || e.key === 'D') {
            // Only if not typing in an input
            if (!['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
                toggleTheme();
            }
        }
    });
    
    /* ==================== SYSTEM PREFERENCE DETECTION (Optional) ==================== */
    // Detect if user prefers dark mode at system level
    if (!localStorage.getItem('theme')) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            htmlElement.setAttribute('data-theme', 'dark');
            updateIcon('dark');
            updateAppIcons(); // ← NEW
            localStorage.setItem('theme', 'dark');
        }
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            updateIcon(newTheme);
            updateAppIcons(); // ← NEW
        }
    });
    
})();
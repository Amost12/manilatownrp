// Android-specific enhancements and mobile optimizations

(function() {
    'use strict';

    // 1. Check if device is Android
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // 2. Optimize for mobile performance
    function optimizePerformance() {
        // Reduce animations on low-end devices
        if (isMobile) {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
            if (prefersReducedMotion.matches) {
                document.documentElement.style.setProperty('--animation-duration', '0s');
            }
        }

        // Add loading states
        document.addEventListener('DOMContentLoaded', function() {
            document.body.classList.add('loaded');
        });
    }

    // 3. Improve touch interactions
    function enhanceTouchInteractions() {
        // Add touch feedback
        const touchElements = document.querySelectorAll('a, button, .info, .header-logo');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            }, {passive: true});
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }, {passive: true});
        });

        // Prevent zoom on double tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }

    // 4. Better mobile menu handling
    function improveMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        
        if (menuToggle && mainNav) {
            // Close menu on outside tap
            document.addEventListener('click', function(e) {
                if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
                    mainNav.classList.remove('open');
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    mainNav.classList.remove('open');
                }
            });

            // Swipe to close menu
            let touchStartX = 0;
            let touchEndX = 0;

            mainNav.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, {passive: true});

            mainNav.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, {passive: true});

            function handleSwipe() {
                if (touchEndX - touchStartX > 50) {
                    mainNav.classList.remove('open');
                }
            }
        }
    }

    // 5. Lazy loading for images
    function enableLazyLoading() {
        if ('IntersectionObserver' in window) {
            const images = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    // 6. Add to home screen prompt for Android
    function addToHomeScreenPrompt() {
        if (isAndroid && 'serviceWorker' in navigator) {
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                const prompt = e;
                
                // Show custom prompt after 5 seconds
                setTimeout(() => {
                    if (confirm('Add Manila Town Roleplay to your home screen for quick access?')) {
                        prompt.prompt();
                    }
                }, 5000);
            });
        }
    }

    // 7. Optimize scroll performance
    function optimizeScroll() {
        let ticking = false;
        
        function updateScroll() {
            // Add scroll-based optimizations here
            ticking = false;
        }
        
        function requestScrollUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestScrollUpdate, {passive: true});
    }

    // 8. Handle orientation changes
    function handleOrientationChange() {
        window.addEventListener('orientationchange', function() {
            // Re-calculate layout after orientation change
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 100);
        });
    }

    // 9. Improve form interactions on mobile
    function enhanceFormInteractions() {
        const inputs = document.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                // Ensure input is visible when keyboard opens
                setTimeout(() => {
                    this.scrollIntoView({behavior: 'smooth', block: 'center'});
                }, 300);
            });
        });
    }

    // 10. Network-aware optimizations
    function handleNetworkConditions() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            // Reduce image quality on slow connections
            if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
                document.body.classList.add('slow-connection');
            }
            
            // Listen for connection changes
            connection.addEventListener('change', function() {
                if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
                    document.body.classList.add('slow-connection');
                } else {
                    document.body.classList.remove('slow-connection');
                }
            });
        }
    }

    // Initialize all enhancements
    function init() {
        optimizePerformance();
        enhanceTouchInteractions();
        improveMobileMenu();
        enableLazyLoading();
        addToHomeScreenPrompt();
        optimizeScroll();
        handleOrientationChange();
        enhanceFormInteractions();
        handleNetworkConditions();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export for global access
    window.MTRPAndroid = {
        isAndroid: isAndroid,
        isMobile: isMobile
    };
})();

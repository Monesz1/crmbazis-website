/*
 * CRM Bázis - Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year in footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // 3. Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. GSAP Animations (Hero Section)
    // Check if GSAP is loaded and we are on the homepage (hero exists)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && typeof gsap !== 'undefined') {
        gsap.from('.badge', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' });
        gsap.from('.hero-title', { y: 30, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' });
        gsap.from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.8, delay: 0.4, ease: 'power3.out' });
        gsap.from('.hero-actions', { y: 30, opacity: 0, duration: 0.8, delay: 0.6, ease: 'power3.out' });
    }

    // 5. Registration API Call (Fetch)
    const registerBtns = document.querySelectorAll('.register-btn');
    
    registerBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            // Get endpoint from Jekyll config injected into window
            const endpoint = window.siteConfig?.apiEndpoint;
            
            if (!endpoint) {
                console.error('API endpoint is not configured.');
                alert('Hiba: Az API végpont nincs beállítva.');
                return;
            }

            // Visual feedback
            const originalText = btn.textContent;
            btn.textContent = 'Feldolgozás...';
            btn.style.opacity = '0.7';
            btn.style.pointerEvents = 'none';

            try {
                console.log(`Calling API: ${endpoint}`);
                
                // Simulated fetch call using the configured endpoint
                const response = await fetch(endpoint, {
                    method: 'GET', // Using GET for jsonplaceholder placeholder
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Sikeres regisztráció! (API hívás sikeres: ' + endpoint + ')');
                } else {
                    throw new Error('API hiba történt');
                }
            } catch (error) {
                console.error('Registration error:', error);
                alert('Sikeres regisztráció szimulálva! (A teszt API végpont válaszolt)');
            } finally {
                // Restore button state
                btn.textContent = originalText;
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'auto';
            }
        });
    });
});

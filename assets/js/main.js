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
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && typeof gsap !== 'undefined') {
        gsap.from('.badge', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' });
        gsap.from('.hero-title', { y: 30, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' });
        gsap.from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.8, delay: 0.4, ease: 'power3.out' });
        gsap.from('.hero-actions', { y: 30, opacity: 0, duration: 0.8, delay: 0.6, ease: 'power3.out' });
    }

    // 5. Animated Tiles (Shop Page)
    const tiles = document.querySelectorAll('.animated-tile');
    if (tiles.length > 0 && typeof gsap !== 'undefined') {
        gsap.to(tiles, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });
    }

    // 6. Registration Modal Logic
    const regModal = document.getElementById('regModal');
    const regModalClose = document.getElementById('regModalClose');
    const registerBtns = document.querySelectorAll('.register-btn');
    const regForm = document.getElementById('regForm');
    const regSuccessState = document.getElementById('regSuccessState');
    const successEmail = document.getElementById('successEmail');
    const regSuccessCloseBtn = document.getElementById('regSuccessCloseBtn');

    function resetRegModal() {
        if (regForm) {
            regForm.style.display = 'flex';
            regForm.classList.remove('was-validated');
            regForm.reset();
        }
        if (regSuccessState) {
            regSuccessState.style.display = 'none';
        }
    }

    function closeRegModal() {
        if (regModal) {
            regModal.classList.remove('active');
            document.body.style.overflow = '';
            // Wait for transition to finish before resetting
            setTimeout(resetRegModal, 300);
        }
    }

    registerBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            resetRegModal();
            if (regModal) {
                regModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (regModalClose) {
        regModalClose.addEventListener('click', closeRegModal);
    }
    
    if (regSuccessCloseBtn) {
        regSuccessCloseBtn.addEventListener('click', closeRegModal);
    }

    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Check HTML5 validation
            if (!regForm.checkValidity()) {
                e.stopPropagation();
                regForm.classList.add('was-validated');
                return;
            }
            
            const submitBtn = regForm.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnSpinner = submitBtn.querySelector('.btn-spinner');

            // Show loading state
            submitBtn.disabled = true;
            if (btnText) btnText.style.display = 'none';
            if (btnSpinner) btnSpinner.style.display = 'block';
            
            // Gather form data
            const formData = {
                company_name: document.getElementById('companyName').value,
                last_name: document.getElementById('lastName').value,
                first_name: document.getElementById('firstName').value,
                email: document.getElementById('email').value,
                mobile: document.getElementById('mobile').value
            };

            // Call backend API
            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Show success state
                    regForm.style.display = 'none';
                    if (successEmail) successEmail.textContent = formData.email;
                    if (regSuccessState) regSuccessState.style.display = 'block';
                } else {
                    alert(data.error || 'Hiba történt a regisztráció során.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hálózati hiba történt. Kérjük, próbálja újra.');
            })
            .finally(() => {
                // Reset button state
                submitBtn.disabled = false;
                if (btnText) btnText.style.display = 'block';
                if (btnSpinner) btnSpinner.style.display = 'none';
            });
        });
    }

    // 7. Video Modal Logic (Learn Page)
    const videoModal = document.getElementById('videoModal');
    const videoModalClose = document.getElementById('videoModalClose');
    const demoBtn = document.getElementById('demoBtn');

    if (demoBtn && videoModal) {
        demoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        videoModalClose.addEventListener('click', () => {
            videoModal.classList.remove('active');
            document.body.style.overflow = '';
            // Stop video playback on close
            const iframe = videoModal.querySelector('iframe');
            if (iframe) {
                const src = iframe.src;
                iframe.src = src;
            }
        });
    }

    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target === regModal) closeRegModal();
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            document.body.style.overflow = '';
            const iframe = videoModal.querySelector('iframe');
            if (iframe) iframe.src = iframe.src;
        }
    });

    // 8. Handle ?scrollTo=demoBtn query parameter for smooth page transitions
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('scrollTo') === 'demoBtn') {
        const demoBtn = document.getElementById('demoBtn');
        if (demoBtn) {
            // Wait for the initial page fade-in animation to complete
            setTimeout(() => {
                // Smoothly scroll down to the button
                demoBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Wait for the scroll animation to finish before pulsing
                setTimeout(() => {
                    demoBtn.classList.add('animate-attention');
                    
                    // Remove class after animation completes (3 pulses * 1.2s = 3600ms)
                    setTimeout(() => {
                        demoBtn.classList.remove('animate-attention');
                    }, 3600);
                }, 800); // Approximate scroll duration
                
                // Clean up the URL so refreshing doesn't trigger the scroll again
                window.history.replaceState({}, document.title, window.location.pathname);
            }, 400); // Wait 400ms at the top of the page before scrolling
        }
    }

    // 9. Page Transition Exit Animation
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;
        
        const href = link.getAttribute('href');
        
        // Ignore external links, new tabs, or links that don't have an href
        if (!href || link.target === '_blank' || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
        
        // Ignore pure hash links (e.g., href="#") which are used for modals or in-page anchors
        if (href.startsWith('#')) return;
        
        // Ignore links that point to the exact same page but just change the hash
        if (link.pathname === window.location.pathname && link.search === window.location.search && link.hash) return;
        
        // If it's an internal HTML link, intercept it
        if (link.host === window.location.host) {
            e.preventDefault();
            document.body.classList.add('page-exit');
            
            // Wait for the exit animation to finish (300ms) before navigating
            setTimeout(() => {
                window.location.href = link.href;
            }, 280); // Slightly less than 300ms to ensure a seamless handoff
        }
    });
});

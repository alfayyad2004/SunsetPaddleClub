document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.removeClass('scrolled');
        }
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Unobserve after animating once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements to animate
    const animateElements = document.querySelectorAll('.fade-up, .slide-left, .slide-right');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Booking Logic
    const slotBtns = document.querySelectorAll('.slot-btn');
    const whatsappBtn = document.getElementById('whatsapp-book-btn');
    const timeDisplay = document.querySelector('.selected-time-display');
    let selectedTime = null;

    if (slotBtns && whatsappBtn && timeDisplay) {
        slotBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active from all
                slotBtns.forEach(b => b.classList.remove('selected'));
                // Add active to clicked
                btn.classList.add('selected');
                
                selectedTime = btn.dataset.time;
                timeDisplay.textContent = `Selected: Today at ${selectedTime}`;
                timeDisplay.classList.add('active');
                
                whatsappBtn.disabled = false;
            });
        });

        whatsappBtn.addEventListener('click', () => {
            if (!selectedTime) return;
            
            const phoneNumber = '18686883360'; // Without plus sign
            const message = encodeURIComponent(`Hi Sunset Paddle Club! I would like to book a court for Today at ${selectedTime}.`);
            
            // Open WhatsApp link
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        });
    }
});

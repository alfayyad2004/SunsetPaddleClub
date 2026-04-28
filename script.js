document.addEventListener('DOMContentLoaded', () => {
    // Force video autoplay on mobile
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.muted = true; // Ensure muted is set for autoplay
        video.play().catch(e => console.log("Autoplay blocked:", e));
    });

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
    const optionBtns = document.querySelectorAll('.option-btn');
    const whatsappBtn = document.getElementById('whatsapp-book-btn');
    const timeDisplay = document.querySelector('.selected-time-display');
    let selectedTime = null;

    if (slotBtns && whatsappBtn && timeDisplay) {
        
        // Handle Options Buttons (Courts & Dates)
        optionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const parent = btn.closest('.options-grid');
                parent.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Handle Time Slots
        slotBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                slotBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                selectedTime = btn.dataset.time;
                timeDisplay.textContent = `Selected: ${selectedTime}`;
                timeDisplay.classList.add('active');
                
                whatsappBtn.disabled = false;
            });
        });

        whatsappBtn.addEventListener('click', () => {
            if (!selectedTime) return;
            
            // Get selected court and date for the WhatsApp message
            const grids = document.querySelectorAll('.options-grid');
            let courtStr = "Court 1";
            let dateStr = "Today";
            
            if(grids.length >= 2) {
                const courtBtn = grids[0].querySelector('.option-btn.active');
                const dateBtn = grids[1].querySelector('.option-btn.active');
                if(courtBtn) courtStr = courtBtn.textContent.trim();
                if(dateBtn) dateStr = dateBtn.querySelector('span') ? dateBtn.querySelector('span').textContent : dateBtn.textContent.trim();
            }

            const phoneNumber = '18686883360';
            const message = encodeURIComponent(`Hi Sunset Paddle Club! I would like to book ${courtStr} for ${dateStr} at ${selectedTime}.`);
            
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        });
    }
});

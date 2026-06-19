document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // 2. Sticky Navbar Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Typing Animation
    const typedTextSpan = document.querySelector(".typed-text");
    const textArray = [
        "Software Engineer", 
        "Full-Stack Developer", 
        "Tech Enthusiast", 
        "Problem Solver"
    ];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Start typing animation after 1s
    if (textArray.length) setTimeout(type, 1000);

    // 4. Scroll Reveal Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // 5. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.replace('ph-sun', 'ph-moon');
    }
    
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLightMode = document.body.classList.contains('light-mode');
        
        if (isLightMode) {
            themeIcon.classList.replace('ph-sun', 'ph-moon');
            localStorage.setItem('portfolio-theme', 'light');
        } else {
            themeIcon.classList.replace('ph-moon', 'ph-sun');
            localStorage.setItem('portfolio-theme', 'dark');
        }
    });
});

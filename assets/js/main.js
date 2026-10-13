document.addEventListener("DOMContentLoaded", () => {
    // 1. Set current year in footer
    document.getElementById("year").textContent = new Date().getFullYear();

    // 2. Sticky Navbar Effect
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) navbar.classList.add("scrolled");
        else navbar.classList.remove("scrolled");
    });

    // 3. Typing Animation
    const typedTextSpan = document.querySelector(".typed-text");
    const textArray = [
        "Software Engineer",
        "Full-Stack Developer",
        "Mobile App Developer",
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

    if (textArray.length) setTimeout(type, 1000);

    // 4. Scroll Reveal Animations
    const fadeElements = document.querySelectorAll(".fade-in, .fade-in-up");
    const appearOptions = { threshold: 0.12, rootMargin: "0px 0px -40px 0px" };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    fadeElements.forEach(el => appearOnScroll.observe(el));

    // 5. Smooth Scrolling for Anchor Links
    document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            if (targetId === "#") {
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector(".navbar").offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top: targetPosition, behavior: "smooth" });
            }
            // Close mobile menu
            document.body.classList.remove("mobile-nav-open");
            const icon = document.querySelector("#mobile-menu-btn i");
            if (icon) { icon.classList.remove("ph-x"); icon.classList.add("ph-list"); }
        });
    });

    // 6. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener("click", () => {
            document.body.classList.toggle("mobile-nav-open");
            const icon = mobileMenuBtn.querySelector("i");
            const isOpen = document.body.classList.contains("mobile-nav-open");
            if (isOpen) { icon.classList.replace("ph-list", "ph-x"); }
            else { icon.classList.replace("ph-x", "ph-list"); }
        });
    }

    // 7. Dynamic Favicon
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    document.head.appendChild(favicon);

    const canvas = document.createElement("canvas");
    canvas.width = 64; canvas.height = 64;
    const ctx = canvas.getContext("2d");
    const letters = ["T", "A", "S", "H", "F", "I", "N"];
    let letterIndex = 0;

    function updateFavicon() {
        ctx.clearRect(0, 0, 64, 64);
        ctx.beginPath();
        ctx.arc(32, 32, 32, 0, 2 * Math.PI);
        ctx.fillStyle = "#111111";
        ctx.fill();
        ctx.fillStyle = "#faf7f3";
        ctx.font = "bold 38px Archivo, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(letters[letterIndex], 32, 35);
        favicon.href = canvas.toDataURL("image/png");
        letterIndex = (letterIndex + 1) % letters.length;
    }

    setInterval(updateFavicon, 600);
    updateFavicon();
});

/**
 * Tashfin Portfolio — Bento-Grid Dark Luxe Interactive Scripts
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Dynamic Current Year in Footer
    const yearEl = document.getElementById("current-year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 2. Interactive Spotlight Cursor Effect on Bento Cards
    const bentoCards = document.querySelectorAll(".bento-card");
    if (bentoCards.length > 0) {
        bentoCards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            });
        });
    }

    // 2b. Interactive 3D Parallax Tilt & Scroll Animation on Portrait Photo
    const portraitCard = document.getElementById("hero-portrait-card");
    const photoWrapper = portraitCard ? portraitCard.querySelector(".portrait-photo-wrapper") : null;
    if (portraitCard && photoWrapper) {
        let isHovered = false;

        portraitCard.addEventListener("mouseenter", () => {
            isHovered = true;
            photoWrapper.style.animation = "none";
        });

        portraitCard.addEventListener("mousemove", (e) => {
            const rect = portraitCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -9;
            const rotateY = ((x - centerX) / centerX) * 9;

            photoWrapper.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`;
        });

        portraitCard.addEventListener("mouseleave", () => {
            isHovered = false;
            photoWrapper.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
            setTimeout(() => {
                if (!isHovered) {
                    photoWrapper.style.animation = "portraitFloat 6.5s ease-in-out infinite";
                    photoWrapper.style.transform = "";
                }
            }, 350);
        });

        // Scroll-Driven Parallax Motion
        let scrollTicking = false;
        window.addEventListener("scroll", () => {
            if (!scrollTicking) {
                window.requestAnimationFrame(() => {
                    if (!isHovered) {
                        const rect = portraitCard.getBoundingClientRect();
                        const windowHeight = window.innerHeight;
                        if (rect.top < windowHeight && rect.bottom > 0) {
                            const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
                            const parallaxY = (scrollProgress - 0.5) * 36;
                            photoWrapper.style.transform = `translate3d(0, ${parallaxY.toFixed(1)}px, 0)`;
                        }
                    }
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        }, { passive: true });
    }

    // 3. Live Dhaka Local Time Badge
    function updateDhakaClock() {
        const dhakaTimeBadge = document.getElementById("dhaka-time-badge");
        const contactClockBadge = document.getElementById("contact-clock-badge");

        try {
            const now = new Date();
            // Format time specifically for Asia/Dhaka (GMT+6)
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Asia/Dhaka',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
            const formattedTime = formatter.format(now);

            if (dhakaTimeBadge) {
                dhakaTimeBadge.textContent = `Dhaka: ${formattedTime}`;
            }
            if (contactClockBadge) {
                contactClockBadge.textContent = formattedTime;
            }
        } catch (e) {
            if (dhakaTimeBadge) dhakaTimeBadge.textContent = "Dhaka, BD (GMT+6)";
        }
    }

    updateDhakaClock();
    setInterval(updateDhakaClock, 1000);

    // 4. One-Click Copy Email to Clipboard
    const copyEmailCard = document.getElementById("copy-email-card");
    const copyBadge = document.getElementById("copy-status-badge");

    if (copyEmailCard && copyBadge) {
        copyEmailCard.addEventListener("click", async () => {
            const email = copyEmailCard.getAttribute("data-email") || "mwtsfn@gmail.com";
            try {
                await navigator.clipboard.writeText(email);
                copyBadge.textContent = "Copied! ✓";
                copyBadge.style.background = "#10b981";
                copyBadge.style.color = "#09090b";

                setTimeout(() => {
                    copyBadge.textContent = "Copy";
                    copyBadge.style.background = "";
                    copyBadge.style.color = "";
                }, 2200);
            } catch (err) {
                // Fallback for older browsers
                const tempInput = document.createElement("input");
                tempInput.value = email;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand("copy");
                document.body.removeChild(tempInput);

                copyBadge.textContent = "Copied! ✓";
                setTimeout(() => {
                    copyBadge.textContent = "Copy";
                }, 2200);
            }
        });
    }

    // 5. Floating Navbar Scroll Blur Transition
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 30) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }, { passive: true });
    }

    // 6. Mobile Navigation Menu Toggle
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const navLinks = document.getElementById("nav-links");
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            const icon = mobileBtn.querySelector("i");
            if (icon) {
                icon.className = navLinks.classList.contains("open") ? "ph ph-x" : "ph ph-list";
            }
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                const icon = mobileBtn.querySelector("i");
                if (icon) icon.className = "ph ph-list";
            });
        });
    }

    // 7. Projects Category Filtering
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-bento-card");

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const filter = btn.getAttribute("data-filter");

                filterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                projectCards.forEach(card => {
                    const category = card.getAttribute("data-category");
                    if (filter === "all" || category === filter) {
                        card.style.display = "flex";
                        setTimeout(() => {
                            card.style.opacity = "1";
                            card.style.transform = "translateY(0)";
                        }, 20);
                    } else {
                        card.style.opacity = "0";
                        card.style.transform = "translateY(16px)";
                        setTimeout(() => {
                            card.style.display = "none";
                        }, 260);
                    }
                });
            });
        });
    }

    // 8. Scroll Reveal Animations with IntersectionObserver
    const revealElements = document.querySelectorAll(".reveal");
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -40px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // 9. Smooth Anchor Scrolling with Header Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});

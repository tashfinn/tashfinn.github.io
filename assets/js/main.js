/**
 * Tashfin Portfolio — Dymas Alfin Editorial Dribbble Theme Interactions
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Current Year in Footer
    const yearEl = document.getElementById("current-year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 2. Floating Navbar Scroll State
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 40) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }, { passive: true });
    }

    // 3. Mobile Navigation Menu Toggle
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

        // Close mobile menu when clicking any nav link
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                const icon = mobileBtn.querySelector("i");
                if (icon) icon.className = "ph ph-list";
            });
        });
    }

    // 4. Scroll Reveal Animations
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

    // 5. Smooth Anchor Scrolling with Header Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 6. Selected Work Category Filtering
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

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
                        }, 280);
                    }
                });
            });
        });
    }

    // 7. Service Accordion Interaction (Frame 00:08 - 00:10)
    const accordionItems = document.querySelectorAll(".service-accordion-item");
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector(".service-item-header");
            if (!header) return;

            header.addEventListener("click", () => {
                const isActive = item.classList.contains("active");

                // Close all accordion items
                accordionItems.forEach(otherItem => {
                    otherItem.classList.remove("active");
                    const icon = otherItem.querySelector(".service-toggle-icon");
                    if (icon) {
                        icon.className = "ph ph-plus service-toggle-icon";
                    }
                });

                // Toggle current item
                if (!isActive) {
                    item.classList.add("active");
                    const icon = item.querySelector(".service-toggle-icon");
                    if (icon) {
                        icon.className = "ph ph-minus service-toggle-icon";
                    }
                }
            });
        });
    }

    // 8. Interactive Contact Drawer Toggle
    const contactBtn = document.getElementById("contact-toggle-btn");
    const contactDrawer = document.getElementById("contact-drawer");
    if (contactBtn && contactDrawer) {
        contactBtn.addEventListener("click", () => {
            const isOpen = contactDrawer.classList.toggle("open");
            contactBtn.textContent = isOpen ? "Close Panel ✕" : "Contact Me ↗";
            if (isOpen) {
                setTimeout(() => {
                    contactDrawer.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }, 150);
            }
        });
    }
});

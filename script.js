const words = [
    "University Student",
    "Creative Learner",
    "Future Developer",
    "Technology Lover"
];

const typingElement = document.querySelector(".typing");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (typingElement && prefersReducedMotion) {
    typingElement.textContent = words[0];
} else if (typingElement) {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (!deleting) {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentWord.length) {
                deleting = true;
                setTimeout(typeEffect, 1200);
                return;
            }
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        setTimeout(typeEffect, deleting ? 60 : 100);
    }

    typeEffect();
}

const profileImage = document.querySelector(".profile-slideshow");
const profilePhotos = [
    { src: "yasin.1.jpeg", alt: "Yasin Profile Photo" },
    { src: "yasin2.jpeg", alt: "Yasin Photo 2" },
    { src: "yasin3.jpeg", alt: "Yasin Photo 3" }
];
let profilePhotoIndex = 0;

if (profileImage && !prefersReducedMotion) {
    setInterval(() => {
        profileImage.classList.add("is-changing");

        setTimeout(() => {
            profilePhotoIndex = (profilePhotoIndex + 1) % profilePhotos.length;
            profileImage.src = profilePhotos[profilePhotoIndex].src;
            profileImage.alt = profilePhotos[profilePhotoIndex].alt;
            profileImage.classList.remove("is-changing");
        }, 350);
    }, 4000);
}

const menuButton = document.querySelector(".menu-icon");
const navLinks = document.querySelector(".nav-links");
const themeButton = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light" || savedTheme === "dark") {
    document.body.dataset.theme = savedTheme;
}

function updateThemeButton() {
    if (!themeButton) {
        return;
    }

    const isDark = document.body.dataset.theme !== "light";
    themeButton.textContent = isDark ? "☀" : "☾";
    themeButton.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeButton.setAttribute("aria-pressed", String(isDark));
}

if (themeButton) {
    updateThemeButton();
    themeButton.addEventListener("click", () => {
        const nextTheme = document.body.dataset.theme === "light" ? "dark" : "light";
        document.body.dataset.theme = nextTheme;
        localStorage.setItem("portfolio-theme", nextTheme);
        updateThemeButton();
    });
}

function closeMenu() {
    if (!menuButton || !navLinks) {
        return;
    }

    navLinks.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    menuButton.textContent = "☰";
}

if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("is-open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
        menuButton.textContent = isOpen ? "×" : "☰";
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && navLinks.classList.contains("is-open")) {
            closeMenu();
            menuButton.focus();
        }
    });
}

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        closeMenu();
    });
});

const revealItems = document.querySelectorAll("[data-reveal]");

if (revealItems.length && "IntersectionObserver" in window && !prefersReducedMotion) {
    document.documentElement.classList.add("motion-ready");

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });

    revealItems.forEach(item => revealObserver.observe(item));
}

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", event => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const message = String(formData.get("message") || "").trim();
        const subject = encodeURIComponent(`Portfolio message from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        const status = contactForm.querySelector(".form-note");

        window.location.href = `mailto:arafat51yasin1@gmail.com?subject=${subject}&body=${body}`;

        if (status) {
            status.textContent = "Your email app should open with the message ready. If it does not, email arafat51yasin1@gmail.com directly.";
        }
    });
}
const words = [
    "University Student",
    "Creative Learner",
    "Future Developer",
    "Technology Lover"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typingElement = document.querySelector(".typing");

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, deleting ? 60 : 100);
}

typeEffect();

const profileImage = document.querySelector(".profile-slideshow");
const profilePhotos = [
    { src: "yasin.1.jpeg", alt: "Yasin Profile Photo" },
    { src: "yasin2.jpeg", alt: "Yasin Photo 2" },
    { src: "yasin3.jpeg", alt: "Yasin Photo 3" }
];
let profilePhotoIndex = 0;

if (profileImage) {
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

// Close mobile menu after clicking a link

const menuToggle = document.getElementById("menu-toggle");

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        menuToggle.checked = false;
    });
});
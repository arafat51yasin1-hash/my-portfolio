const BIRTHDAY_PASSWORD = "love you aru";

const surpriseButton = document.querySelector("#surprise-button");
const birthdayMessage = document.querySelector("#birthday-message");
const birthdayPage = document.querySelector("#birthday-page");
const giftGate = document.querySelector("#gift-gate");
const passwordGate = document.querySelector("#password-gate");
const passwordForm = document.querySelector("#password-form");
const passwordInput = document.querySelector("#birthday-password");
const passwordError = document.querySelector("#password-error");
const birdFlight = document.querySelector("#bird-flight");
const heartBirdFlock = document.querySelector("#heart-bird-flock");
const giftGateContent = document.querySelector("#gift-gate-content");
const giftGateButton = document.querySelector("#gift-gate-button");
const giftBox = document.querySelector("#gift-box");
const giftLid = document.querySelector(".gift-lid");
const confettiLayer = document.querySelector("#confetti-layer");
const curtainReveal = document.querySelector("#curtain-reveal");
const curtainRight = document.querySelector(".curtain-panel-right");

const confettiColors = ["#ff4f91", "#ff85b3", "#ffc1d6", "#fff0f5", "#d83f80"];

curtainRight.addEventListener("animationend", () => {
    curtainReveal.hidden = true;
    curtainReveal.classList.remove("is-opening");
    birthdayPage.setAttribute("aria-hidden", "false");
    document.querySelector("#birthday-title").focus();
}, { once: true });

function openBirthdayPage() {
    giftGateButton.disabled = true;
    giftBox.classList.add("is-opening");

    giftLid.addEventListener("animationend", () => {
        giftGate.hidden = true;
        document.body.classList.add("gift-opened");
        curtainReveal.hidden = false;
        curtainReveal.classList.add("is-opening");
    }, { once: true });
}

function celebrate() {
    surpriseButton.setAttribute("aria-expanded", "true");
    surpriseButton.textContent = "Surprise unlocked! 🎉";
    birthdayMessage.hidden = false;

    for (let index = 0; index < 70; index += 1) {
        const piece = document.createElement("span");
        piece.className = "confetti";
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.backgroundColor = confettiColors[index % confettiColors.length];
        piece.style.animationDelay = `${Math.random() * 0.8}s`;
        piece.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
        confettiLayer.append(piece);
        piece.addEventListener("animationend", () => piece.remove(), { once: true });
    }
}

passwordForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (passwordInput.value !== BIRTHDAY_PASSWORD) {
        passwordError.textContent = "That password doesn't match. Please try again.";
        passwordInput.setAttribute("aria-invalid", "true");
        passwordInput.focus();
        return;
    }

    passwordError.textContent = "";
    passwordInput.removeAttribute("aria-invalid");
    passwordGate.hidden = true;
    giftGate.removeAttribute("aria-labelledby");
    giftGate.setAttribute("aria-label", "Your gift is on its way");
    birdFlight.hidden = false;
    birdFlight.classList.add("is-flying");

    heartBirdFlock.addEventListener("animationend", () => {
        birdFlight.hidden = true;
        birdFlight.classList.remove("is-flying");
        giftGateContent.hidden = false;
        giftGate.removeAttribute("aria-label");
        giftGate.setAttribute("aria-labelledby", "gift-gate-gift-title");
    }, { once: true });
});

passwordInput.addEventListener("input", () => {
    passwordError.textContent = "";
    passwordInput.removeAttribute("aria-invalid");
});

giftGateButton.addEventListener("click", openBirthdayPage, { once: true });
surpriseButton.addEventListener("click", celebrate, { once: true });

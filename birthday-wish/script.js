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
const proposalYes = document.querySelector("#proposal-yes");
const proposalNo = document.querySelector("#proposal-no");
const proposalResult = document.querySelector("#proposal-result");

const confettiColors = ["#ff4f91", "#ff85b3", "#ffc1d6", "#fff0f5", "#d83f80"];

function playBirthdayTone() {
    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;

    if (!AudioContextConstructor) {
        console.error("This browser does not support the Web Audio API; the birthday tone could not play.");
        return;
    }

    const audioContext = new AudioContextConstructor();
    const oscillator = audioContext.createOscillator();
    const volume = audioContext.createGain();
    const melody = [
        [392, 0.5], [392, 0.5], [440, 1], [392, 1], [523, 1], [494, 2],
        [392, 0.5], [392, 0.5], [440, 1], [392, 1], [587, 1], [523, 2],
        [392, 0.5], [392, 0.5], [784, 1], [659, 1], [523, 1], [494, 1], [440, 2],
        [698, 0.5], [698, 0.5], [659, 1], [523, 1], [587, 1], [523, 2]
    ];
    const beatLength = 0.34;
    const noteGap = 0.025;

    oscillator.type = "sine";
    oscillator.connect(volume);
    volume.connect(audioContext.destination);

    let startTime = audioContext.currentTime + 0.05;
    melody.forEach(([frequency, beats]) => {
        const duration = beatLength * beats;
        oscillator.frequency.setValueAtTime(frequency, startTime);
        volume.gain.setValueAtTime(0.0001, startTime);
        volume.gain.linearRampToValueAtTime(0.16, startTime + 0.02);
        volume.gain.setValueAtTime(0.16, startTime + duration - 0.03);
        volume.gain.linearRampToValueAtTime(0.0001, startTime + duration);
        startTime += duration + noteGap;
    });

    oscillator.start();
    oscillator.stop(startTime);
    audioContext.resume().catch((error) => {
        console.error("Unable to start the birthday tone.", error);
    });
}

curtainRight.addEventListener("animationend", () => {
    curtainReveal.hidden = true;
    curtainReveal.classList.remove("is-opening");
    birthdayPage.setAttribute("aria-hidden", "false");
    document.querySelector("#birthday-title").focus();
}, { once: true });

function openBirthdayPage() {
    giftGateButton.disabled = true;
    giftBox.classList.add("is-opening");
    playBirthdayTone();

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

function moveNoButton() {
    const proposals = document.querySelector("#proposal-actions");
    const maxX = Math.min(95, proposals.clientWidth - proposalNo.offsetWidth);
    const maxY = 18;

    proposalNo.style.transform = `translate(${Math.round(Math.random() * maxX - maxX / 2)}px, ${Math.round(Math.random() * maxY - maxY / 2)}px)`;
}

proposalYes.addEventListener("click", () => {
    proposalYes.disabled = true;
    proposalNo.disabled = true;
    proposalYes.textContent = "Always yours! 💍";
    proposalNo.hidden = true;
    proposalResult.textContent = "Yay! You made me the happiest person! A kiss for you: 💋😘";
    proposalResult.hidden = false;

    for (let index = 0; index < 45; index += 1) {
        const heart = document.createElement("span");
        heart.className = "confetti";
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.width = "10px";
        heart.style.height = "10px";
        heart.style.background = "transparent";
        heart.style.color = confettiColors[index % confettiColors.length];
        heart.textContent = index % 2 === 0 ? "♥" : "♡";
        heart.style.fontSize = "18px";
        heart.style.animationDelay = `${Math.random() * 0.5}s`;
        heart.style.setProperty("--drift", `${Math.random() * 160 - 80}px`);
        confettiLayer.append(heart);
        heart.addEventListener("animationend", () => heart.remove(), { once: true });
    }
});

proposalNo.addEventListener("mouseenter", moveNoButton);
proposalNo.addEventListener("touchstart", (event) => {
    event.preventDefault();
    moveNoButton();
}, { passive: false });
proposalNo.addEventListener("click", moveNoButton);

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

    function finishHeartBirdFlight(event) {
        if (event.target !== heartBirdFlock) {
            return;
        }

        heartBirdFlock.removeEventListener("animationend", finishHeartBirdFlight);
        birdFlight.hidden = true;
        birdFlight.classList.remove("is-flying");
        giftGateContent.hidden = false;
        giftGate.removeAttribute("aria-label");
        giftGate.setAttribute("aria-labelledby", "gift-gate-gift-title");
    }

    heartBirdFlock.addEventListener("animationend", finishHeartBirdFlight);
});

passwordInput.addEventListener("input", () => {
    passwordError.textContent = "";
    passwordInput.removeAttribute("aria-invalid");
});

giftGateButton.addEventListener("click", openBirthdayPage, { once: true });
surpriseButton.addEventListener("click", celebrate, { once: true });

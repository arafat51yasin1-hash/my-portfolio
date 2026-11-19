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
const teddySequence = document.querySelector("#teddy-sequence");

const confettiColors = ["#ff4f91", "#ff85b3", "#ffc1d6", "#fff0f5", "#d83f80"];

function playBirthdayTone() {
    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;

    if (!AudioContextConstructor) {
        console.error("This browser does not support the Web Audio API; the birthday tone could not play.");
        return;
    }

    const audioContext = new AudioContextConstructor();
    const oscillator = audioContext.createOscillator();
    const harmony = audioContext.createOscillator();
    const volume = audioContext.createGain();
    const harmonyVolume = audioContext.createGain();
    const melody = [
        [392, 0.5], [392, 0.5], [440, 1], [392, 1], [523, 1], [494, 2],
        [392, 0.5], [392, 0.5], [440, 1], [392, 1], [587, 1], [523, 2],
        [392, 0.5], [392, 0.5], [784, 1], [659, 1], [523, 1], [494, 1], [440, 2],
        [698, 0.5], [698, 0.5], [659, 1], [523, 1], [587, 1], [523, 2],
        [392, 1], [523, 1], [659, 1], [784, 2],
        [698, 1], [659, 1], [587, 1], [523, 2],
        [587, 1], [659, 1], [698, 1], [784, 2],
        [523, 1], [587, 1], [659, 1], [784, 1], [523, 3]
    ];
    const beatLength = 0.38;
    const noteGap = 0.035;

    oscillator.type = "triangle";
    harmony.type = "sine";
    oscillator.connect(volume);
    volume.connect(audioContext.destination);
    harmony.connect(harmonyVolume);
    harmonyVolume.connect(audioContext.destination);

    let startTime = audioContext.currentTime + 0.05;
    for (let repeat = 0; repeat < 3; repeat += 1) {
        melody.forEach(([frequency, beats]) => {
            const duration = beatLength * beats;
            oscillator.frequency.setValueAtTime(frequency, startTime);
            harmony.frequency.setValueAtTime(frequency / 2, startTime);
            volume.gain.setValueAtTime(0.0001, startTime);
            volume.gain.linearRampToValueAtTime(repeat === 2 ? 0.16 : 0.22, startTime + 0.025);
            volume.gain.setValueAtTime(repeat === 2 ? 0.16 : 0.22, startTime + duration - 0.04);
            volume.gain.linearRampToValueAtTime(0.0001, startTime + duration);
            harmonyVolume.gain.setValueAtTime(0.0001, startTime);
            harmonyVolume.gain.linearRampToValueAtTime(repeat === 2 ? 0.05 : 0.07, startTime + 0.04);
            harmonyVolume.gain.setValueAtTime(repeat === 2 ? 0.05 : 0.07, startTime + duration - 0.04);
            harmonyVolume.gain.linearRampToValueAtTime(0.0001, startTime + duration);
            startTime += duration + noteGap;
        });
    }

    oscillator.start();
    harmony.start();
    oscillator.stop(startTime + 0.8);
    harmony.stop(startTime + 0.8);
    audioContext.resume().catch((error) => {
        console.error("Unable to start the birthday tone.", error);
    });
}

curtainRight.addEventListener("animationend", () => {
    curtainReveal.hidden = true;
    curtainReveal.classList.remove("is-opening");
    teddySequence.hidden = false;
    teddySequence.classList.add("is-active");
    document.querySelector("#teddy-title-1").focus();
}, { once: true });

document.querySelectorAll("[data-next-page]").forEach((button) => {
    button.addEventListener("click", () => {
        const currentPage = button.closest(".teddy-page");
        const nextNumber = button.dataset.nextPage;
        const nextPage = document.querySelector(`[data-teddy-page="${nextNumber}"]`);

        currentPage.classList.add("is-leaving");
        window.setTimeout(() => {
            currentPage.hidden = true;
            currentPage.classList.remove("is-leaving");
            nextPage.hidden = false;
            nextPage.classList.add("is-entering");
            document.querySelector(`#teddy-title-${nextNumber}`).focus();
        }, 320);
    });
});

document.querySelector("#open-birthday-page").addEventListener("click", () => {
    teddySequence.classList.add("is-leaving");
    window.setTimeout(() => {
        teddySequence.hidden = true;
        teddySequence.classList.remove("is-active", "is-leaving");
        birthdayPage.hidden = false;
        birthdayPage.setAttribute("aria-hidden", "false");
        document.querySelector("#birthday-title").focus();
    }, 450);
});

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

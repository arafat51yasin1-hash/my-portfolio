const surpriseButton = document.querySelector("#surprise-button");
const birthdayMessage = document.querySelector("#birthday-message");
const giftBox = document.querySelector("#gift-box");
const giftLid = document.querySelector(".gift-lid");
const confettiLayer = document.querySelector("#confetti-layer");

const confettiColors = ["#ff4f91", "#ff85b3", "#ffc1d6", "#fff0f5", "#d83f80"];

function celebrate() {
    surpriseButton.disabled = true;
    surpriseButton.textContent = "Opening your gift...";
    giftBox.classList.add("is-opening");

    giftLid.addEventListener("animationend", () => {
        birthdayMessage.hidden = false;
        surpriseButton.setAttribute("aria-expanded", "true");
        surpriseButton.textContent = "Surprise unlocked! 🎉";
        surpriseButton.disabled = false;

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
    }, { once: true });
}

surpriseButton.addEventListener("click", celebrate, { once: true });

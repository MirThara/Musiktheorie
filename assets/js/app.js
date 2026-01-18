import { cards } from "./cards.js";
import { shuffle } from "./utils/shuffle.js";
let shuffledCards = shuffle(cards);

console.log("app.js geladen");


const state = {
    view: "start",
    currentCard: 0,
    currentAnswer: null,
    progress: 0,
};

const startView = document.getElementById("start-view");
const cardView = document.getElementById("card-view");
const resultView = document.getElementById("result-view");

const startBtn = document.getElementById("start-btn");
const backBtn = document.getElementById("back-btn");
const checkBtn = document.getElementById("check-btn");

const contentEl = document.getElementById("card-content");
const promptEl = document.getElementById("card-prompt");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");

function showView(name) {
    startView.hidden = name !== "start";
    cardView.hidden = name !== "card";
    resultView.hidden = name !== "result";
    state.view = name;
}

function updateStart() {
    progressText.textContent = `${state.progress} von ${cards.length} Cards abgeschlossen`;
    progressFill.style.width = `${(state.progress / cards.length) * 100}%`;
}

function loadCard() {
    if (state.currentCard >= cards.length) {
        showView("start");
        updateStart();
        return;
    }

    const card = shuffledCards[state.currentCard];

    promptEl.textContent = card.prompt;
    contentEl.innerHTML = "";
    checkBtn.disabled = true;
    state.currentAnswer = null;

    card.setup({
        contentEl,
        setAnswer(answer) {
            state.currentAnswer = answer;
        },
        setValid(isValid) {
            checkBtn.disabled = !isValid;
        }
    });
}

startBtn.onclick = () => {
    state.currentCard = 0;
    state.progress = 0;
    shuffledCards = shuffle(cards);
    showView("card");
    loadCard();
}

checkBtn.onclick = () => {
    const card = shuffledCards[state.currentCard];

    if (card.check(state.currentAnswer)) {
        alert("Richtig");
        state.currentCard++;
        state.progress++;
        loadCard();
    } else {
        alert("Falsch")
    }
}

backBtn.onclick = () => {
    showView("start");
    updateStart();
}

showView("start");
updateStart();
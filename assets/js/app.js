import { cards } from "./cards.js";

console.log("app.js geladen");


const state = {
    view: "start",
    currentCard: 0,
    currentAnswer: null
};

const startView = document.getElementById("start-view");
const cardView = document.getElementById("card-view");
const resultView = document.getElementById("result-view");

const startBtn = document.getElementById("start-btn");
const backBtn = document.getElementById("back-btn");
const checkBtn = document.getElementById("check-btn");

const contentEl = document.getElementById("card-content");
const promptEl = document.getElementById("card-prompt");

function showView(name) {
    startView.hidden = name !== "start";
    cardView.hidden = name !== "card";
    resultView.hidden = name !== "result";
    state.view = name;
}

function loadCard() {
    const card = cards[state.currentCard];

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
    showView("card");
    loadCard();
}

checkBtn.onclick = () => {
    const card = cards[state.currentCard];

    if (card.check(state.currentAnswer)) {
        alert("Richtig");
        state.currentCard++;
        loadCard();
    } else {
        alert("Falsch")
    }
}

backBtn.onclick = () => {
    showView("start");
}

showView("start");
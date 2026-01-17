const state = {
    view: "start",
    currentCard: 0,
    selectedAnswer: null,
    progress: {
        completed: 0
    }
};

const cards = [
    {
        prompt: "Welche Taste ist ein C?",
        answers: ["C", "D", "E"],
        correct: "C",
    },
    {
        prompt: "Wie viele Halbtöne hat eine große Terz?",
        answers: ["3", "4", "5"],
        correct: "4",
    }
];

function showView(name) {
    ["start", "card", "result"].forEach(v => {
        document.getElementById(`${v}-view`).hidden = v !== name;
    });
}

function updateStart() {
    const total = cards.length;
    const done = state.progress.completed;

    document.getElementById('progress-text')
        .textContent = `${done} von ${total} Cards abgeschlossen`;

    document.getElementById('progress-fill')
        .style.width = `${(done / total) * 100}%`;
}


function loadCard() {
    const card = cards[state.currentCard];

    document.getElementById('card-counter')
        .textContent = `Card ${state.currentCard + 1} / ${cards.length}`;

    document.getElementById('card-prompt')
        .textContent = card.prompt;

    const container = document.getElementById('card-content');
    container.innerHTML = "";

    card.answers.forEach(answer => {
        const btn = document.createElement('button');
        btn.className = "answer";
        btn.textContent = answer;

        btn.onclick = () => {
            state.selectedAnswer = answer;
            document.querySelectorAll('.answer')
                .forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
            document.getElementById('check-btn').disabled = false;
        }

        container.appendChild(btn);
    });

    document.getElementById('check-btn').disabled = true;
}

document.getElementById('check-btn').onclick = () => {
    const card = cards[state.currentCard];

    if (state.selectedAnswer === card.correct) {
        state.progress.completed++;
        state.currentCard++;

        if (state.currentCard >= cards.length) {
            showView("result");
        } else {
            loadCard();
        }
    } else {
        alert("Falsch, versuch es erneut");
    }
}

document.getElementById('start-btn').onclick = () => {
    state.currentCard = 0;
    showView("card");
    loadCard();
}

document.getElementById('back-btn').onclick = () => {
    showView("start");
    updateStart();
}

updateStart();
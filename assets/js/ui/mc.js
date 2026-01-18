import { shuffle } from "../utils/shuffle.js";
export function createMC({ options, onChange }) {
    const list = document.createElement("div");
    list.className = "mc-list";

    let selected = null;

    const shuffledOptions = shuffle(options);

    shuffledOptions.forEach(option => {
        const btn = document.createElement("button");
        btn.className = "mc-option";
        btn.textContent = option;

        btn.onclick = () => {
            // visuelle Auswahl
            [...list.children].forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");

            selected = option;
            setAnswer(option);
            setValid(true);
        };

        list.appendChild(btn);
        if (onChange) onChange(null);
    });

    return list;
}
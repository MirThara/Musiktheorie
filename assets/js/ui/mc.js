import { shuffle } from "../utils/shuffle.js";
console.log("ui/mc.js loaded");

export function createMC({ options, onChange }) {
    const el = document.createElement("div");
    el.className = "answers";

    let selectedValue = null;
    let shuffled = shuffle(options);

    shuffled.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.className = "answer";

        btn.onclick = () => {
            [...el.children].forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");

            selectedValue = option;
            onChange(selectedValue);
        };

        el.appendChild(btn);
    });
    return el;
}
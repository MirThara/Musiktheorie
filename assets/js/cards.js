import { createPiano } from "./components/piano.js";

export const cards = [
    {
        id: "interval-piano-1",
        prompt: "Markiere eine große Terz",
        type: "piano-interval",

        setup({ contentEl, setAnswer, setValid }) {
            const piano = createPiano({
                onChange(selection) {
                    setAnswer(selection);
                    setValid(selection.length === 2);
                }
            });

            contentEl.appendChild(piano);
        },

        check(answer) {
            if (answer.length !== 2) return false;
            return Math.abs(answer[1] - answer[0] === 4);
        }
    }
];
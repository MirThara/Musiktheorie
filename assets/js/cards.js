import { createPiano } from "./components/piano.js";
import { createStaff } from "./components/staff.js";

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
            if (!Array.isArray(answer) || answer.length !== 2) return false;

            const interval = Math.abs(answer[1] - answer[0]);
            return interval === 4;
        }
    },
    {
        id: "note-entry-1",
        targetNote: "g''",
        get prompt() {
            return `Trage ${this.targetNote} in das Notensystem ein`;
        },
        setup({ contentEl, setAnswer, setValid }) {
            const staff = createStaff({
                key: "treble",
                targetNote: this.targetNote,
                // showLedgerLines: true,
                onChange(note) {
                    setAnswer(note);
                    setValid(note != null);
                }
            });
            contentEl.appendChild(staff);
        },
        check(answer) {
            return answer === this.targetNote;
        }
    },
    {
        id: "note-entry-2",
        targetNote: "A",
        get prompt() {
            return `Trage ${this.targetNote} in das Notensystem ein`;
        },
        setup({ contentEl, setAnswer, setValid }) {
            const staff = createStaff({
                key: "bass",
                targetNote: this.targetNote,
                onChange(note) {
                    setAnswer(note);
                    setValid(note != null);
                }
            });
            contentEl.appendChild(staff);
        },
        check(answer) {
            return answer === this.targetNote;
        }
    },
    {
        id: "interval-piano-2",
        prompt: "Markiere eine reine Quarte",
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
            if (!Array.isArray(answer) || answer.length !== 2) return false;

            const interval = Math.abs(answer[1] - answer[0]);
            return interval === 5;
        }
    }
];
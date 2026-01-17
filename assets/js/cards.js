import { createPiano } from "./components/piano.js";
import { createStaff } from "./components/staff.js";

export const cards = [
    // {
    //     id: "interval-piano-1",
    //     prompt: "Markiere eine große Terz",
    //     type: "piano-interval",

    //     setup({ contentEl, setAnswer, setValid }) {
    //         const piano = createPiano({
    //             onChange(selection) {
    //                 setAnswer(selection);
    //                 setValid(selection.length === 2);
    //             }
    //         });

    //         contentEl.appendChild(piano);
    //     },

    //     check(answer) {
    //         if (answer.length !== 2) return false;
    //         return Math.abs(answer[1] - answer[0] === 4);
    //     }
    // },
    {
        id: "note-entry-1",
        prompt: "Trage g' in das Notensystem ein",
        targetNote: "g''",
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
    }
];
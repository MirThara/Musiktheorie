import { createStaff } from "./ui/staff.js";
import { createPiano } from "./ui/piano.js";
import { createMC } from "./ui/mc.js";
import { intervalToName } from "./utils/intervalMap.js";
console.log("cards.js loaded");

export let cards = [];

/**
 * Lädt Cards dynamisch von Hygraph
 * @param {string} endpoint
 * @param {string} token
 */

export async function loadCards(endpoint, token = null) {
    const query = `
    query{
        cards(first: 100){
            id
            type
            prompt
            targetNote
            key
            interval
            answers
            correct
        }
    }
`;
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await (fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({ query })
    }));

    const result = await res.json();
    const data = result.data.cards;

    cards = data.map(item => {
        if (item.type === "piano") {
            const intervalName = intervalToName(item.interval);
            return {
                ...item,
                prompt: `Markiere eine ${intervalName}.`,
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
                    return Math.abs(answer[1] - answer[0]) === item.interval;
                }
            };
        } else if (item.type === "staff") {
            return {
                ...item,
                prompt: `Trage ${item.targetNote} in das Notensystem ein.`,
                setup({ contentEl, setAnswer, setValid }) {
                    const staff = createStaff({
                        key: item.key || "treble",
                        targetNote: item.targetNote,
                        showLedgerLines: false,
                        onChange(note) {
                            setAnswer(note);
                            setValid(note != null);
                        }
                    });
                    contentEl.appendChild(staff);
                },
                check(answer) {
                    return answer === (item.targetNote == "h'" ? "b'" : item.targetNote);
                }
            };
        } else if (item.type === "mc") {
            return {
                ...item,
                prompt: item.prompt,
                setup({ contentEl, setAnswer, setValid }) {
                    const mc = createMC({
                        options: item.answers,
                        onChange(selection) {
                            setAnswer(selection);
                            setValid(true);
                        }
                    })

                    contentEl.appendChild(mc);
                    setValid(false);
                },
                check(answer) {
                    return answer === item.correct;
                }
            };
        }
        return null;
    })
        .filter(Boolean);
}
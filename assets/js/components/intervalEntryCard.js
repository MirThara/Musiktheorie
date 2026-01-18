import { createPiano } from "../ui/piano.js";
import { intervalToName } from "../utils/intervalMap.js";

export function createIntervalEntryCard(config) {
    const intervalName = intervalToName(config.interval);
    return {
        id: config.id,
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
            if (!Array.isArray(answer) || answer.length !== 2) return false;
            const interval = Math.abs(answer[1] - answer[0]);
            return interval === config.interval;
        }
    }
}
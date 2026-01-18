import { createMC } from "../ui/mc.js";

export function createMultipleChoiceCard(config) {
    return {
        id: config.id,
        prompt: config.prompt,
        setup({ contentEl, setAnswer, setValid }) {
            const mc = createMC({
                options: config.answers,
                onChange(selection) {
                    setAnswer(selection);
                    setValid(true);
                }
            });

            contentEl.appendChild(mc);
            setValid(false);
        },
        check(answer) {
            return answer === config.correct;
        }
    }
}
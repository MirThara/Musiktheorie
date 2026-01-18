import { createStaff } from "../ui/staff.js";
export function createNoteEntryCard(config) {
    return {
        id: config.id,
        prompt: `Trage ${config.targetNote} in das Notensystem ein`,
        setup({ contentEl, setAnswer, setValid }) {
            const staff = createStaff({
                key: config.key,
                showLedgerLines: false,
                onChange(note) {
                    setAnswer(note);
                    setValid(note != null);
                },
            });
            contentEl.appendChild(staff);
        },
        check(answer) {
            return answer === config.targetNote;
        }
    }
}
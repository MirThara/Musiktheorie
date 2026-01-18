import { createNoteEntryCard } from "./components/noteEntryCard.js";
import { createIntervalEntryCard } from "./components/intervalEntryCard.js";
import { createMultipleChoiceCard } from "./components/mcCard.js";

export const cards = [
    createIntervalEntryCard({
        id: "interval-piano-1",
        interval: 5,
    }),
    createNoteEntryCard({
        id: "note-entry-1",
        key: "treble",
        targetNote: "g'",
    }),
    createNoteEntryCard({
        id: "note-entry-2",
        key: "bass",
        targetNote: "A",
    }),
    createIntervalEntryCard({
        id: "interval-piano-2",
        interval: 7,
    }),
    createMultipleChoiceCard({
        id: "mc-1",
        prompt: "Der Violinschlüssel heißt auch ...",
        answers: ["G-Schlüssel", "F-Schlüssel", "C-Schlüssel"],
        correct: "G-Schlüssel",
    }),
];
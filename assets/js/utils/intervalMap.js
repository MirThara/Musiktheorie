const INTERVAL_NAMES = {
    0: "Prime",
    1: "kleine Sekunde",
    2: "große Sekunde",
    3: "kleine Terz",
    4: "große Terz",
    5: "reine Quarte",
    6: "Tritonus",
    7: "reine Quinte",
    8: "kleine Sexte",
    9: "große Sexte",
    10: "kleine Septime",
    11: "große Septime",
    12: "Oktave",
}

export function intervalToName(semitones) {
    return INTERVAL_NAMES[semitones] ?? `${semitones} Halbtonschritte`;
}
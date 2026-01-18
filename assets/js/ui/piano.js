console.log("ui/piano.js loaded");
export function createPiano({ onChange }) {
    const piano = document.createElement("div");
    piano.className = "piano";

    const keys = [
        { midi: 60, type: "white" },
        { midi: 61, type: "black" },
        { midi: 62, type: "white" },
        { midi: 63, type: "black" },
        { midi: 64, type: "white" },
        { midi: 65, type: "white" },
        { midi: 66, type: "black" },
        { midi: 67, type: "white" },
        { midi: 68, type: "black" },
        { midi: 69, type: "white" },
        { midi: 70, type: "black" },
        { midi: 71, type: "white" },
    ];

    let selected = [];

    function toggle(midi) {
        const index = selected.indexOf(midi);

        if (index >= 0) {
            selected.splice(index, 1);
        } else {
            if (selected.length >= 2) return;
            selected.push(midi);
        }

        render();
        if (onChange) onChange([...selected]);
    }

    function render() {
        piano.innerHTML = "";

        keys.forEach(k => {
            const key = document.createElement('div');
            key.className = `key ${k.type}`;
            key.dataset.midi = k.midi;

            if (selected.includes(k.midi)) {
                const dot = document.createElement("div");
                dot.className = "dot";
                key.appendChild(dot);
            }

            key.onclick = () => toggle(k.midi);
            piano.appendChild(key);
        })
    }

    render();
    return piano;
}
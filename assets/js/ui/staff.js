console.log("ui/staff.js loaded");
export function createStaff({ key = "treble", targetNote, showLedgerLines = false, onChange }) {
    const staff = document.createElement('div');
    staff.className = "staff";

    // SVG as Staff
    const width = 400;
    const height = 180;
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);

    // Lines of staff
    const staffLinesY = [];
    for (let i = 0; i < 5; i++) {
        const y = 50 + i * 20;
        staffLinesY.push(y);
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", 0);
        line.setAttribute("y1", y);
        line.setAttribute("x2", width);
        line.setAttribute("y2", y);
        line.setAttribute("stroke", "#111");
        line.setAttribute("stroke-width", 2);
        svg.appendChild(line);
    }

    // cleffs
    if (key === "treble") {
        const gClef = document.createElementNS(svgNS, "text");
        gClef.setAttribute("x", 10);
        gClef.setAttribute("y", 140);
        gClef.setAttribute("font-size", 150);
        gClef.setAttribute("font-family", "serif");
        gClef.textContent = "𝄞"; // Unicode für Violinschlüssel
        svg.appendChild(gClef);
    } else if (key === "bass") {
        const fClef = document.createElementNS(svgNS, "text");
        fClef.setAttribute("x", 10);
        fClef.setAttribute("y", 127);
        fClef.setAttribute("font-size", 120);
        fClef.setAttribute("font-family", "serif");
        fClef.textContent = "𝄢"; // Unicode für Bassschlüssel
        svg.appendChild(fClef);
    }

    const noteMaps = {
        treble: {
            "c'": 150,
            "d'": 140,
            "e'": 130,
            "f'": 120,
            "g'": 110,
            "a'": 100,
            "b'": 90,
            "c''": 80,
            "d''": 70,
            "e''": 60,
            "f''": 50,
            "g''": 40
        },
        bass: {
            "c'": 30,
            "h": 40,
            "a": 50,
            "g": 60,
            "f": 70,
            "e": 80,
            "d": 90,
            "c": 100,
            "H'": 110,
            "A": 120,
            "G'": 130,
            "F'": 140
        }
    };
    const noteMap = noteMaps[key] || noteMaps['treble'];

    let currentNote = null;
    let currentNoteName = null;
    let currentLedgerLines = [];

    svg.addEventListener("click", (e) => {
        const rect = svg.getBoundingClientRect();
        const y = e.clientY - rect.top;

        let nearest = null;
        let minDist = Infinity;
        for (const n in noteMap) {
            const dist = Math.abs(noteMap[n] - y);
            if (dist < minDist) {
                minDist = dist;
                nearest = n;
            }
        }

        // remove old note
        if (currentNote) {
            svg.removeChild(currentNote);
            currentNote = null;
        }
        currentLedgerLines.forEach(line => svg.removeChild(line));
        currentLedgerLines = [];
        currentNoteName = null;

        // draw new note
        const noteY = noteMap[nearest];
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", width / 2);
        circle.setAttribute("cy", noteY);
        circle.setAttribute("r", 8);
        circle.setAttribute("fill", "#4f46e5");
        svg.appendChild(circle);
        currentNote = circle;
        currentNoteName = nearest;

        // show LedgerLiens if enabled
        if (showLedgerLines) {
            // upper lines
            staffLinesY.forEach(yLine => {
                if (noteY < staffLinesY[0] && (noteY < yLine)) {
                    const line = document.createElementNS(svgNS, "line");
                    line.setAttribute("x1", width / 2 - 15);
                    line.setAttribute("x2", width / 2 + 15);
                    line.setAttribute("y1", noteY);
                    line.setAttribute("y2", noteY);
                    line.setAttribute("stroke", "#111");
                    line.setAttribute("stroke-width", 2);
                    svg.appendChild(line);
                    currentLedgerLines.push(line);
                }
            });
            // bottom lines
            staffLinesY.forEach(yLine => {
                if (noteY < staffLinesY[staffLinesY.length - 1] && (noteY > yLine)) {
                    const line = document.createElementNS(svgNS, "line");
                    line.setAttribute("x1", width / 2 - 15);
                    line.setAttribute("x2", width / 2 + 15);
                    line.setAttribute("y1", noteY);
                    line.setAttribute("y2", noteY);
                    line.setAttribute("stroke", "#111");
                    line.setAttribute("stroke-width", 2);
                    svg.appendChild(line);
                    currentLedgerLines.push(line);
                }
            })
        }
        console.log(currentNoteName);
        if (onChange) onChange(currentNoteName);
    });

    staff.appendChild(svg);
    return staff;
}
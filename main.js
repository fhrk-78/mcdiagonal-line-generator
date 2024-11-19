function gen() {
    const dig = document.getElementById("dig").value;
    const maxgrid = document.getElementById("maxgrid").value;

    const result = generateStepPattern(Number(dig), Number(maxgrid));

    document.getElementById("output").textContent = result.join(", ");
    document.getElementById("grid").innerHTML = "";

    let pos = 0;
    let i = 0;
    let bef = `<div>${"<div class=\"f\"></div>".repeat(maxgrid)}</div>`
    for (const e of result) {
        i++;
        pos += e;
        const width = e;
        if (width !== 0) {
            bef = `<div>${"<div class=\"f\"></div>".repeat(pos - width)}${"<div class=\"t\"></div>".repeat(width)}${"<div class=\"f\"></div>".repeat(maxgrid - pos)}</div>`
        }
        document.getElementById("grid").insertAdjacentHTML("beforeend", bef);
    }
}

function generateStepPattern(angleDeg, maxgrid) {
    const angleRad = angleDeg * (Math.PI / 180);
    const slope = Math.tan(angleRad);
    const stepPattern = [];

    let cumulativeY = 0;
    let x = 0;

    while (x <= maxgrid) {
        cumulativeY += slope;
        stepPattern.push(Math.abs(Math.round(cumulativeY) - Math.round(cumulativeY - slope)));
        x++;
    }

    return stepPattern;
}

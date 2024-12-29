let fields = [null, null, null, null, null, null, null, null, null];

let currentPlayer = "circle"; // Start mit "circle"

// Funktion für das Klicken auf ein Feld
function handleClick(cell, index) {
  // Überprüfe, ob das Feld bereits besetzt ist
  if (fields[index] === null) {
    fields[index] = currentPlayer; // Setze das Feld auf den aktuellen Spieler
    // Überprüfe, ob ein Spieler gewonnen hat
    cell.innerHTML =
      currentPlayer === "circle" ? generateCircleSVG() : generateCrossSVG();
    cell.onclick = null; // Entferne den onclick listener
    // Wechsle den Spieler
    currentPlayer = currentPlayer === "circle" ? "cross" : "circle";
  }
}

function generateCircleSVG() {
  const color = "#00B0EF";
  const width = 70;
  const height = 70;
  return `<svg width="${width}" height="${height}">
              <circle cx="35" cy="35" r="30" stroke="${color}" stroke-width="5" fill="none">
                <animate attributeName="stroke-dasharray" from="0 188.5" to="188.5 0" dur="1s" fill="freeze" />
              </circle>
            </svg>`;
}

function generateCrossSVG() {
  const color = "#FFC000";
  const width = 70;
  const height = 70;
  const svgHtml = `
      <svg width="${width}" height="${height}">
        <line x1="0" y1="0" x2="${width}" y2="${height}"
          stroke="${color}" stroke-width="5">
          <animate attributeName="x2" values="0; ${width}" dur="1s" />
          <animate attributeName="y2" values="0; ${height}" dur="1s" />
        </line>
        <line x1="${width}" y1="0" x2="0" y2="${height}"
          stroke="${color}" stroke-width="5">
          <animate attributeName="x2" values="${width}; 0" dur="1s" />
          <animate attributeName="y2" values="0; ${height}" dur="1s" />
        </line>
      </svg>
    `;
  return svgHtml;
}

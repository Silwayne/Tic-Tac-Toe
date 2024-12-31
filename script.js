let fields = [null, null, null, null, null, null, null, null, null]; // Felder des Spielfelds

const winningCombinations = [
  // Gewinnkombinationen
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6], // diagonal
];

let currentPlayer = "circle"; // Startspieler
let winsCircle = parseInt(localStorage.getItem('winsCircle')) || 0;
let winsCross = parseInt(localStorage.getItem('winsCross')) || 0;

function handleClick(cell, index) {
  if (fields[index] === null) {
    fields[index] = currentPlayer;
    cell.innerHTML = currentPlayer === "circle" ? generateCircleSVG() : generateCrossSVG();
    cell.onclick = null;
    currentPlayer = currentPlayer === "circle" ? "cross" : "circle";

    if (isGameFinished()) {
      const winCombination = getWinningCombination();
      if (winCombination !== null) {
        drawWinningLine(winCombination);
        if (fields[winCombination[0]] === "circle") {
          winsCircle++;
        } else {
          winsCross++;
        }
        updateLeaderboard();
      }
    }
  }
}

function isGameFinished() {
  // Überprüfe, ob das Spiel beendet ist
  return (
    // Wenn alle Felder besetzt sind oder ein Spieler gewonnen hat
    fields.every((field) => field !== null) || getWinningCombination() !== null
  );
}
function getWinningCombination() {
  // Überprüfe, ob ein Spieler gewonnen hat
  for (let i = 0; i < winningCombinations.length; i++) {
    // Gehe alle Kombinationen durch
    const [a, b, c] = winningCombinations[i]; // Hole die drei Felder
    if (
      // Wenn die Felder gleich sind und nicht null
      fields[a] === fields[b] && // Wenn die Felder gleich sind
      fields[b] === fields[c] && // Wenn die Felder gleich sind
      fields[a] !== null // Wenn die Felder nicht null sind
    ) {
      // Dann ist die Kombination gewonnen
      return winningCombinations[i]; // Gebe die Kombination zurück
    }
  }
  return null; // Ansonsten gebe null zurück
}

function updateLeaderboard() {
  document.getElementById('wins-circle').textContent = winsCircle;
  document.getElementById('wins-cross').textContent = winsCross;
  localStorage.setItem('winsCircle', winsCircle); // Speichere die Punkte im localStorage
  localStorage.setItem('winsCross', winsCross); // Speichere die Punkte im localStorage
}

function resetLeaderboard() {
  winsCircle = 0; // Punkte für Kreis zurücksetzen
  winsCross = 0; // Punkte für Kreuz zurücksetzen
  localStorage.setItem('winsCircle', winsCircle); // localStorage zurücksetzen
  localStorage.setItem('winsCross', winsCross); // localStorage zurücksetzen
  updateLeaderboard(); // Leaderboard aktualisieren
}

function generateCircleSVG() {
  // Generiere ein Kreis SVG
  const color = "#00B0EF"; // Setze die Farbe auf blau
  const width = 70; // Setze die Breite auf 70
  const height = 70; // Setze die Höhe auf 70
  return `<svg width="${width}" height="${height}">  
              <circle cx="35" cy="35" r="30" stroke="${color}" stroke-width="5" fill="none">
                <animate attributeName="stroke-dasharray" from="0 188.5" to="188.5 0" dur="1s" fill="freeze" />
              </circle>
            </svg>`;
}

function generateCrossSVG() {
  // Generiere ein Kreuz SVG
  const color = "#FFC000"; // Setze die Farbe auf gelb
  const width = 70; // Setze die Breite auf 70
  const height = 70; // Setze die Höhe auf 70
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
  return svgHtml; // Gebe das SVG zurück
}

function drawWinningLine(combination) {
  // Zeichne die Linie
  const lineColor = "green"; // Linienfarbe
  const lineWidth = 5; // Linienbreite
  const startCell = document.querySelectorAll(`td`)[combination[0]]; // Startzelle
  const endCell = document.querySelectorAll(`td`)[combination[2]]; // Endzelle
  const startRect = startCell.getBoundingClientRect(); // Startrechteck
  const endRect = endCell.getBoundingClientRect(); // Endrechteck
  const contentRect = document // Contentrechteck
    .getElementById("content") // Hole das Element mit der ID "content"
    .getBoundingClientRect(); // Hole das Rechteck
  const lineLength = Math.sqrt(
    // Länge der Linie
    Math.pow(endRect.left - startRect.left, 2) + // Länge der Linie
      Math.pow(endRect.top - startRect.top, 2) // Länge der Linie
  ); // Länge der Linie
  const lineAngle = Math.atan2(
    // Winkel der Linie
    endRect.top - startRect.top, // Winkel der Linie
    endRect.left - startRect.left // Winkel der Linie
  ); // Winkel der Linie
  const line = document.createElement("div"); // Erstelle ein neues Div-Element
  line.style.position = "absolute"; // Positioniere das Element absolut
  line.style.width = `${lineLength}px`; // Breite der Linie
  line.style.height = `${lineWidth}px`; // Höhe der Linie
  line.style.backgroundColor = lineColor; // Hintergrundfarbe der Linie
  line.style.top = `${
    // Position der Linie
    startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top // Position der Linie
  }px`; // Position der Linie
  line.style.left = `${
    // Position der Linie
    startRect.left + startRect.width / 2 - contentRect.left // Position der Linie
  }px`; // Position der Linie
  line.style.transform = `rotate(${lineAngle}rad)`; // Rotation der Linie
  line.style.transformOrigin = `top left`; // Ursprung der Rotation
  document.getElementById("content").appendChild(line); // Füge die Linie zum Content-Element hinzu
}

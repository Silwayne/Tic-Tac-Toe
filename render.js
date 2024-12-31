function init() {
  render();
  updateLeaderboard(); // Leaderboard initialisieren
}

function render() {
  // rendere das Spielfeld
  const contentDiv = document.getElementById("content"); // hole das Element mit der ID "content"

  // Generate table HTML
  let tableHTML = "<table>"; // Tabelle anfangen
  for (let i = 0; i < 3; i++) {
    // Gehe alle Zeilen durch
    tableHTML += "<tr>"; // Zeile anfangen
    for (let j = 0; j < 3; j++) {
      // Gehe alle Spalten durch
      const index = i * 3 + j; // Berechne den Index
      let symbol = ""; // Symbol für die Zelle
      if (fields[index] === "circle") {
        // Wenn das Feld ein Kreis ist
        symbol = generateCircleSVG(); // Generiere ein Kreis SVG
      } else if (fields[index] === "cross") {
        // Wenn das Feld ein Kreuz ist
        symbol = generateCrossSVG(); // Generiere ein Kreuz SVG
      }

      // onclick function für jedes <td>
      tableHTML += `<td onclick="handleClick(this, ${index})">${symbol}</td>`; // Tabellelement anfügen
    } // Ende der Spalten
    tableHTML += "</tr>"; // Zeile beenden
  } // Ende der Zeilen
  tableHTML += "</table>"; // Tabelle beenden

  // Set table HTML to content div
  contentDiv.innerHTML = tableHTML; // Setze die Tabelle HTML in das Element mit der ID "content"
}

function restartGame() {
  fields = Array(9).fill(null); // Spielfeld zurücksetzen
  currentPlayer = "circle"; // Spieler auf Kreis zurücksetzen
  render(); // Spielfeld neu rendern
}

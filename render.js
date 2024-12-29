function init() {
    render();
  }
  
  function render() {
    const contentDiv = document.getElementById("content");
  
    // Generate table HTML
    let tableHTML = "<table>";
    for (let i = 0; i < 3; i++) {
      tableHTML += "<tr>";
      for (let j = 0; j < 3; j++) {
        const index = i * 3 + j;
        let symbol = "";
        if (fields[index] === "circle") {
          symbol = generateCircleSVG();
        } else if (fields[index] === "cross") {
          symbol = generateCrossSVG();
        }
  
        // onclick function für jedes <td>
        tableHTML += `<td onclick="handleClick(this, ${index})">${symbol}</td>`;
      }
      tableHTML += "</tr>";
    }
    tableHTML += "</table>";
  
    // Set table HTML to content div
    contentDiv.innerHTML = tableHTML;
  }
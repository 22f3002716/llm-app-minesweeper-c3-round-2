# Minesweeper 8x8

A classic Minesweeper game implemented as a simple, single-page web application. The objective is to clear an 8x8 grid containing 10 hidden mines without detonating any of them.

## Features

*   **8x8 Grid:** A standard Minesweeper grid size.
*   **10 Mines:** Ten randomly placed mines on the board for a challenging experience.
*   **Game Over State:** Clicking on a mine immediately ends the game, displays a "BOOM! Game Over." message, and reveals the location of all mines.
*   **Mine Count Indication:** Cells without mines reveal the number of adjacent mines.
*   **Empty Cell Flood Fill:** Clicking an empty cell (with 0 adjacent mines) automatically reveals all contiguous empty cells and their numbered borders.
*   **Reset Button:** A convenient button to start a new game at any time.

## How to Run

1.  **Save Files:** Save all the provided files (`index.html`, `style.css`, `script.js`, `README.md`, `LICENSE`) into a single directory on your computer.
2.  **Open in Browser:** Open the `index.html` file using your preferred web browser (e.g., Chrome, Firefox, Edge, Safari).
3.  **Play:** Click on cells to reveal them. Avoid the mines! Click the "Reset Game" button to start a new round.

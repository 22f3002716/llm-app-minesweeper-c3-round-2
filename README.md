# Minesweeper Game

This is a simple web-based Minesweeper game, implemented as a single-page application. The objective is to clear an 8x8 grid without detonating any of the 10 hidden mines.

## Features

*   **8x8 Grid:** A classic Minesweeper board size.
*   **10 Mines:** Ten randomly placed mines.
*   **Mine Count Indicators:** Cells reveal the number of adjacent mines (1-8).
*   **Recursive Empty Cell Reveal:** Clicking an empty cell automatically reveals all connected empty cells and their numbered borders.
*   **Game Over State:** If you click on a mine, the game ends immediately.
*   **Reveal All Mines on Game Over:** Upon hitting a mine, all other mines on the board are revealed.
*   **"BOOM! Game Over." Message:** A clear message indicates when the game has ended due to a mine detonation.

## How to Run

1.  **Save the files:** Ensure `index.html`, `script.js`, `style.css`, `README.md`, and `LICENSE` are all in the same directory.
2.  **Open `index.html`:** Simply open the `index.html` file in your preferred web browser. The game will load automatically.
3.  **Start Playing:** Click on any cell to begin. Try to uncover all non-mine cells!

## Technologies Used

*   HTML5
*   CSS3
*   JavaScript (ES6+)

## License

This project is open-sourced under the MIT License. See the `LICENSE` file for more details.

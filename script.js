const GRID_SIZE = 8;
const NUM_MINES = 10;
const gridElement = document.getElementById('minesweeper-grid');
const messageElement = document.querySelector('h1');
const resetButton = document.getElementById('reset-button');

let board = [];
let gameOver = false;

// Initialize the game
function initGame() {
    gameOver = false;
    messageElement.textContent = 'Minesweeper';
    gridElement.innerHTML = ''; // Clear existing grid

    // Create empty board
    board = Array(GRID_SIZE).fill(null).map(() =>
        Array(GRID_SIZE).fill(null).map(() => ({
            isMine: false,
            revealed: false,
            mineCount: 0,
            element: null // Store reference to the DOM element
        }))
    );

    placeMines();
    calculateAdjacentMines();
    renderGrid();
}

// Place mines randomly
function placeMines() {
    let minesPlaced = 0;
    while (minesPlaced < NUM_MINES) {
        const row = Math.floor(Math.random() * GRID_SIZE);
        const col = Math.floor(Math.random() * GRID_SIZE);

        if (!board[row][col].isMine) {
            board[row][col].isMine = true;
            minesPlaced++;
        }
    }
}

// Calculate adjacent mine counts for each cell
function calculateAdjacentMines() {
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            if (board[r][c].isMine) {
                continue;
            }

            let count = 0;
            // Check all 8 neighbors
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr === 0 && dc === 0) continue; // Skip self

                    const nr = r + dr;
                    const nc = c + dc;

                    // Check bounds
                    if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
                        if (board[nr][nc].isMine) {
                            count++;
                        }
                    }
                }
            }
            board[r][c].mineCount = count;
        }
    }
}

// Render the grid in the DOM
function renderGrid() {
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.dataset.row = r;
            cellElement.dataset.col = c;
            cellElement.addEventListener('click', () => handleClick(r, c));
            
            board[r][c].element = cellElement; // Store reference

            gridElement.appendChild(cellElement);
        }
    }
}

// Handle cell clicks
function handleClick(row, col) {
    if (gameOver || board[row][col].revealed) {
        return;
    }

    if (board[row][col].isMine) {
        board[row][col].element.classList.add('mine');
        gameOverState();
    } else {
        revealCell(row, col);
    }
}

// Reveal a single cell
function revealCell(row, col) {
    // Boundary check, already revealed, or a mine
    if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE || board[row][col].revealed || board[row][col].isMine) {
        return;
    }

    const cell = board[row][col];
    cell.revealed = true;
    cell.element.classList.add('revealed');

    if (cell.mineCount > 0) {
        cell.element.textContent = cell.mineCount;
        cell.element.classList.add(`count-${cell.mineCount}`);
    } else {
        // If it's an empty cell, recursively reveal neighbors
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue; // Skip self
                revealCell(row + dr, col + dc); // Recursive call
            }
        }
    }
}

// Game Over state
function gameOverState() {
    gameOver = true;
    messageElement.textContent = 'BOOM! Game Over.';
    revealAllMines();
}

// Reveal all mines on game over
function revealAllMines() {
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            const cell = board[r][c];
            if (cell.isMine) {
                cell.revealed = true; // Mark as revealed to prevent further clicks
                cell.element.classList.add('mine');
                cell.element.textContent = '💣'; // Bomb emoji
            }
        }
    }
}

// Event listener for reset button
resetButton.addEventListener('click', initGame);

// Initial game setup
initGame();

const GRID_SIZE = 8;
const NUM_MINES = 10;
const board = [];
let gameOver = false;
const minesweeperGrid = document.getElementById('minesweeper-grid');
const gameStatusDisplay = document.getElementById('game-status');

function createBoard() {
    // Initialize board with empty cells
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        board.push({
            isMine: false,
            isRevealed: false,
            mineCountAround: 0,
            element: null // Will store reference to the DOM cell element
        });
    }

    // Place mines
    placeMines();

    // Calculate mine counts for non-mine cells
    calculateMineCounts();

    // Render the board
    renderBoard();
}

function placeMines() {
    let minesPlaced = 0;
    while (minesPlaced < NUM_MINES) {
        const randomIndex = Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE));
        if (!board[randomIndex].isMine) {
            board[randomIndex].isMine = true;
            minesPlaced++;
        }
    }
}

function calculateMineCounts() {
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        if (!board[i].isMine) {
            let count = 0;
            const neighbors = getNeighbors(i);
            for (const neighborIndex of neighbors) {
                if (board[neighborIndex].isMine) {
                    count++;
                }
            }
            board[i].mineCountAround = count;
        }
    }
}

function getNeighbors(index) {
    const neighbors = [];
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue; // Skip the cell itself

            const newRow = row + i;
            const newCol = col + j;
            const newIndex = newRow * GRID_SIZE + newCol;

            if (
                newRow >= 0 && newRow < GRID_SIZE &&
                newCol >= 0 && newCol < GRID_SIZE
            ) {
                neighbors.push(newIndex);
            }
        }
    }
    return neighbors;
}

function renderBoard() {
    minesweeperGrid.innerHTML = ''; // Clear existing grid
    minesweeperGrid.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;

    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.dataset.index = index;
        cellElement.addEventListener('click', () => handleClick(index));
        
        // Store reference to DOM element in board array
        cell.element = cellElement;
        minesweeperGrid.appendChild(cellElement);
    });
}

function handleClick(index) {
    if (gameOver || board[index].isRevealed) {
        return;
    }

    const cell = board[index];

    if (cell.isMine) {
        gameOver = true;
        gameStatusDisplay.textContent = 'BOOM! Game Over.';
        gameStatusDisplay.classList.add('game-over-message'); // Add class for styling
        revealAllMines();
        // Disable further clicks
        minesweeperGrid.querySelectorAll('.cell').forEach(c => c.style.pointerEvents = 'none');
    } else {
        revealCell(index);
    }
}

function revealCell(index) {
    if (index < 0 || index >= GRID_SIZE * GRID_SIZE || board[index].isRevealed || board[index].isMine) {
        return;
    }

    const cell = board[index];
    cell.isRevealed = true;
    cell.element.classList.add('revealed');

    if (cell.mineCountAround > 0) {
        cell.element.textContent = cell.mineCountAround;
        cell.element.classList.add(`mines-around-${cell.mineCountAround}`); // For number coloring
    } else {
        // If no mines around, recursively reveal neighbors
        const neighbors = getNeighbors(index);
        for (const neighborIndex of neighbors) {
            revealCell(neighborIndex);
        }
    }
}

function revealAllMines() {
    board.forEach(cell => {
        if (cell.isMine) {
            cell.element.classList.add('mine');
            cell.element.textContent = '💣'; // Bomb emoji
            cell.element.classList.add('revealed'); // Make sure it shows up
        }
    });
}


// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createBoard();
});

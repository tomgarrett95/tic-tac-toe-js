// Store game status for easy access
const statusDisplay = document.querySelector(".game-status");

// Variables to track game state

// For pausing game if game ends
let gameActive = true;

// Current player
let currentPlayer = "X";

// Game state - tracking cells and validating game
let gameState = ["", "", "", "", "", "", "", "", "",];

// Messages for user
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// Initial state
statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex) {
    // Update internal game state to reflect the played move, and UI to reflect played move.

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

const winningConditions = [
    [0, 1 ,2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === "" || b === "" || c ==="") {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    // Check for draw - no unpopulated cells
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    // Getting here means game is not finished. Change current player.
    handlePlayerChange();
    }

function handleCellClick(clickedCellEvent) {
    // Clicked html element as a variable
    const clickedCell = clickedCellEvent.target;

    // Grab 'data-cell-index' attribute to identify which cell. Convert string to int.
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute("data-cell-index")
    );

    // Check if cell already played, or if game is paused. If either true, ignore click.
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    // If all ok, proceed with game flow
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "");
}

// Event listeners to game cells and restart button

document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", handleCellClick));
document.querySelector(".game-restart").addEventListener("click", handleRestartGame);
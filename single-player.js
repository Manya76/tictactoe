document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const messageContainer = document.getElementById('message-container');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(i));
        gameContainer.appendChild(cell);
    }

    function handleCellClick(index) {
        if (!gameActive || gameBoard[index] !== '') return;

        currentPlayer = 'X';
        makeMove(index, currentPlayer);

        if (checkWinner()) {
            displayWinner(`${currentPlayer === 'X' ? 'Human' : 'Computer'} wins!`);
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            displayWinner("It's a draw!");
            gameActive = false;
        } else {
            setTimeout(() => computerMove(), 500);
        }
    }

    function makeMove(index, player) {
        gameBoard[index] = player;
        const img = document.createElement('img');
        img.src = player === 'X' ? 'images/X.png' : 'images/O.png';
        img.style.width = '60%'; // Adjust the size as needed
        img.style.height = '60%';
        gameContainer.children[index].appendChild(img);
    }

    function computerMove() {
        currentPlayer = 'O';
        let winningMove = findWinningMove(currentPlayer);

        if (winningMove !== -1) {
            makeMove(winningMove, currentPlayer);
        } else {
            let blockingMove = findWinningMove('X');

            if (blockingMove !== -1) {
                makeMove(blockingMove, currentPlayer);
            } else {
                let emptyPositions = gameBoard.reduce((acc, val, index) => {
                    if (val === '') acc.push(index);
                    return acc;
                }, []);
                let randomIndex = Math.floor(Math.random() * emptyPositions.length);
                let randomMove = emptyPositions[randomIndex];
                makeMove(randomMove, currentPlayer);
            }
        }

        if (checkWinner()) {
            displayWinner(`${currentPlayer === 'X' ? 'Human' : 'Computer'} wins!`);
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            displayWinner("It's a draw!");
            gameActive = false;
        } else {
            currentPlayer = 'X';
        }
    }

    function findWinningMove(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (const pattern of winPatterns) {
            const count = pattern.reduce((acc, index) => (gameBoard[index] === player ? acc + 1 : acc), 0);

            if (count === 2) {
                const emptyIndex = pattern.find(index => gameBoard[index] === '');

                if (emptyIndex !== undefined) {
                    return emptyIndex;
                }
            }
        }

        return -1;
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        return winPatterns.some(pattern =>
            pattern.every(index => gameBoard[index] === currentPlayer)
        );
    }

    function displayWinner(message) {
        messageContainer.innerHTML = `<p>${message}</p><button id="newGameButton">New Game</button>`;
        document.getElementById('newGameButton').style.display = 'block';
        document.getElementById('newGameButton').addEventListener('click', newGame);
    }

    function newGame() {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        messageContainer.innerHTML = '';
        clearGameBoard();

        if (currentPlayer === 'O') {
            setTimeout(() => computerMove(), 500);
        }
    }

    function clearGameBoard() {
        gameContainer.querySelectorAll('img').forEach(img => img.remove());
    }
});

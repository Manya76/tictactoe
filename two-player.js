document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const messageContainer = document.getElementById('message-container');
    const newGameButton = document.getElementById('newGameButton');
  
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
  
      makeMove(index, currentPlayer);
  
      if (checkWinner()) {
        displayWinner(`${currentPlayer === 'X' ? 'Player 1' : 'Player 2'} wins!`);
        gameActive = false;
      } else if (gameBoard.every(cell => cell !== '')) {
        displayWinner("It's a draw!");
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  
    function makeMove(index, player) {
      gameBoard[index] = player;
      const cell = gameContainer.children[index];
      cell.textContent = player;
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
      newGameButton.style.display = 'block';
      newGameButton.addEventListener('click', newGame);
    }
  
    function newGame() {
      currentPlayer = 'X';
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
      messageContainer.innerHTML = '';
      newGameButton.style.display = 'none';
  
      for (let i = 0; i < 9; i++) {
        gameContainer.children[i].textContent = '';
      }
    }
  });
  
const Gameboard = (function () {
  // Object for a cell in the gameboard
  const Cell = function () {
    let value = "";
    const setValue = (piece) => {
      if (typeof piece === "string") {
        value = piece;
      }
    };
    const getValue = () => value;
    return {
      setValue,
      getValue,
    };
  };

  const rows = 3;
  const cols = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(Cell());
    }
  }

  // Board getter function, used by UI manager to read and display the game
  const getBoard = () => board;

  // Place a Player's piece on the board, Inputs will be determined by which cell is clicked and whose turn it is
  const placePiece = (piece, row, col) => {
    board[row][col].setValue(piece);
  };

  const getPiece = (row, col) => {
    return board[row][col].getValue();
  };

  const clearBoard = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        board[i][j].setValue("");
      }
    }
  };

  const printBoard = () => {
    const gameboardValues = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(gameboardValues);
  };

  return {
    printBoard,
    placePiece,
    getPiece,
    getBoard,
    clearBoard,
  };
})();

const GameManager = (function () {
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const players = [
    {
      name: "Player 1",
      piece: "X",
      turnHistory: [],
    },
    {
      name: "Player 2",
      piece: "O",
      turnHistory: [],
    },
  ];

  let activePlayer = players[0];
  const setPlayerName = (playerNum, newName) => {
    if (typeof newName === "string" && (playerNum === 1 || playerNum === 0)) players[playerNum].name = newName;
    else console.error("Error: Invalid input to setPlayerName");
  };

  const nextPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printRound = () => {
    Gameboard.printBoard();
    console.log(`${getActivePlayer().name}'s turn to place piece ${getActivePlayer().piece}`);
  };

  const resetGame = () => {
    Gameboard.clearBoard();
    if (activePlayer === players[1]) nextPlayerTurn();
    players[0].turnHistory = [];
    players[1].turnHistory = [];
    printRound();
  };

  const playRound = (row, col) => {
    let activePlayer = getActivePlayer();
    let err = false;

    if (row >= Gameboard.getBoard().length || row < 0) {
      console.error("Error: Row value out of bounds");
      err = true;
    }
    if (col >= Gameboard.getBoard()[0].length || col < 0) {
      console.error("Error: Column value out of bounds");
      err = true;
    }
    if (!err && Gameboard.getPiece(row, col) != "") {
      console.error("Error: Invalid piece placement, cell is not empty");
      err = true;
    }
    if (err) return printRound();
    console.log(`${activePlayer.name} places a ${activePlayer.piece} at row:${row} col:${col}!`);
    Gameboard.placePiece(activePlayer.piece, row, col);
    // Record each player's turn history
    activePlayer.turnHistory.push(row * Gameboard.getBoard()[0].length + col);
    // Must be at least 3 turns for winning decisions to be made
    // Logic compares all arrays of winning combinations to an array of historial piece placements
    if (activePlayer.turnHistory.length >= 3) {
      for (let i of winningPatterns) {
        if (i.every((j) => activePlayer.turnHistory.includes(j))) {
          console.log(`${activePlayer.name} is the Winner!!!`);
          Gameboard.printBoard();
          return;
        }
      }
    }
    nextPlayerTurn();
    printRound();
  };

  // Print initial game message
  printRound();

  return {
    setPlayerName,
    nextPlayerTurn,
    getActivePlayer,
    playRound,
    resetGame,
  };
})();

const Gameboard = (function () {
  // Object for a cell in the gameboard
  const createCell = function () {
    let value = "";
    const setValue = (piece) => {
      if (value === "") {
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
      board[i].push(createCell());
    }
  }

  // Board getter function, used by UI manager to read and display the game
  const getBoard = () => board;

  // Place a Player's piece on the board, Inputs will be determined by which cell is clicked and whose turn it is
  const placePiece = (piece, row, col) => {
    board[row][col].setValue(piece);
  };

  const printBoard = () => {
    const gameboardValues = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(gameboardValues);
  };

  return {
    printBoard,
    placePiece,
    getBoard,
  };
})();

const GameManager = (function () {
  const players = [
    {
      name: "Player 1",
      piece: "X",
    },
    {
      name: "Player 2",
      piece: "O",
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

  const playRound = (row, col) => {
    // Make better error handling based on sizeof Gameboard.getBoard() or something like that
    if (row >= rows || row < 0) {
      console.error("Error: Row value out of bounds");
      return;
    }
    if (col >= cols || col < 0) {
      console.error("Error: Column value out of bounds");
      return;
    }
    console.log(`${getActivePlayer().name} places a ${getActivePlayer().piece} at row:${row} col:${col}!`);
    Gameboard.placePiece(getActivePlayer().piece, row, col);
    // game winning logic
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
  };
})();

// const Pplayer = {
//   name: "John",
//   piece: "X", //or O
//   getName,
//   getPiece,
// };

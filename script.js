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

  // remove row col later and base it off of which cell is clicked
  const placePiece = (piece, row, col) => {
    board[row][col].setValue(piece);
    printBoard();
  };

  const printBoard = () => {
    const gameboardValues = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(gameboardValues);
  };

  return {
    printBoard,
    placePiece,
  };
})();

// const Pplayer = {
//   name: "John",
//   piece: "X", //or O
//   getName,
//   getPiece,
// };

const gameBoard = () => {
  let board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  const reset = () => {
    board = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];
  };

  const makeMove = (symbol, x, y) => {
    if (board[x][y] === " ") {
      board[x][y] = symbol;
    }
  };

  return { board, reset, makeMove };
};

const playerFactory = (name) => {
  const getName = () => name;
  return { getName };
};
let board = gameBoard();

board.makeMove("A", 0, 0);

console.log(board.board);

board = gameBoard();

console.log(board.board);

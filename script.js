/* eslint-disable no-plusplus */
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

  const checkIfWin = (player) => {
    // Check all rows for win
    for (let i = 0; i < board.length; i++) {
      if (
        board[i][0] === player &&
        board[i][1] === player &&
        board[i][2] === player
      )
        return true;
    }

    // check all columns for win
    for (let i = 0; i < board.length; i++) {
      if (
        board[0][i] === player &&
        board[1][i] === player &&
        board[2][i] === player
      )
        return true;
    }

    // check diagonal for win
    if (
      board[0][0] === player &&
      board[1][1] === player &&
      board[2][2] === player
    )
      return true;

    // check other diagonal for win
    if (
      board[0][2] === player &&
      board[1][1] === player &&
      board[2][0] === player
    )
      return true;

    return false;
  };

  return { board, reset, makeMove, checkIfWin };
};

const playerFactory = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;

  return { getName, getSymbol };
};

const numToString = (a, b) => `${a}${b}`;

const playerTurn = (x) => {
  const playerDiv = document.createElement("div");
  playerDiv.classList.toggle("playerTurn");
  playerDiv.innerHTML = `Player ${x}, go`;
  document.querySelector(".stuff").textContent = "";
  document.querySelector(".stuff").appendChild(playerDiv);
};

const ticTacToe = (() => {
  let start = false;
  const board = gameBoard();
  const playerOne = playerFactory("playerOne", "X");
  const playerTwo = playerFactory("playerTwo", "O");
  let currentTurn = playerOne;

  const swapTurn = () => {
    if (currentTurn === playerOne) {
      currentTurn = playerTwo;
    } else {
      currentTurn = playerOne;
    }
  };

  const gameOver = () => {
    if (board.checkIfWin(playerOne.getSymbol())) {
      start = false;
      const div = document.querySelector(".game-over");
      const msg = document.createElement("div");
      msg.innerText = "Player one, Wins!";
      div.appendChild(msg);
      div.setAttribute("id", "appear");
    }
    if (board.checkIfWin(playerTwo.getSymbol())) {
      start = false;
      const div = document.querySelector(".game-over");
      const msg = document.createElement("div");
      msg.innerText = "Player two, Wins!";
      div.appendChild(msg);
      div.setAttribute("id", "appear");
    }
  };

  document.querySelector(".start").addEventListener("click", () => {
    start = true;
    document.querySelector(".start").setAttribute("id", "goodbye");
    playerTurn("1");
  });

  for (let i = 0; i < board.board.length; i++) {
    for (let j = 0; j < board.board[i].length; j++) {
      const tic = document.querySelector(`[data-cord="${numToString(i, j)}"]`);

      // eslint-disable-next-line no-loop-func
      tic.addEventListener("click", () => {
        if (tic.innerHTML === "" && start) {
          tic.innerHTML = currentTurn.getSymbol();
          board.makeMove(
            currentTurn.getSymbol(),
            tic.dataset.cord.charAt(0),
            tic.dataset.cord.charAt(1)
          );
          console.log(board.board);
          gameOver();
          let playerNum;
          if (currentTurn.getSymbol() === "X") playerNum = "2";
          if (currentTurn.getSymbol() === "O") playerNum = "1";
          playerTurn(playerNum);
          swapTurn();
        }
      });
    }
  }
})();

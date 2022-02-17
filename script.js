console.log('hello peasant');

const DomElement = (() => {
  const startScreen = document.getElementById('start-screen');
  const startScreenForm = document.getElementById('start-screen-form');
  const labelPlayer2 = startScreenForm.getElementsByTagName('label')[1];
  const namePlayer1 = document.getElementById('player1-name');
  const namePlayer2 = document.getElementById('player2-name');
  const difficultyContainer = document.getElementById('difficulty-container');
  const difficulty = document.getElementById('difficulty');
  const playHuman = document.getElementById('human');
  const playComputer = document.getElementById('computer');
  const playButton = document.getElementById('play');
  const gameScreen = document.getElementById('game-screen');
  const nameScorePlayer1 = document.getElementById('player1-name-score');
  const nameScorePlayer2 = document.getElementById('player2-name-score');
  const boardGame = document.getElementById('game-board');
  const boardCells = document.querySelectorAll('.board-cell');
  const openStartScreen = document.getElementById('main-menu');
  const playAgain = document.getElementById('play-again');

  const toggleNone = (element) => {
    return element.classList.toggle('none');
  };

  const nonSelectable = (element) => {
    return element.classList.add('taken-cell');
  }

  return {
    startScreen,
    startScreenForm,
    labelPlayer2,
    namePlayer1,
    namePlayer2,
    difficultyContainer,
    difficulty,
    playHuman,
    playComputer,
    playButton,
    gameScreen,
    nameScorePlayer1,
    nameScorePlayer2,
    boardGame,
    boardCells,
    openStartScreen,
    playAgain,
    toggleNone,
    nonSelectable
  };
})();


const MainMenu = (() => {
  // play against computer and human toggle selection
  let toggled = false;
  const toggleSelection = () => {
    DomElement.toggleNone(DomElement.labelPlayer2);
    DomElement.toggleNone(DomElement.namePlayer2);
    DomElement.toggleNone(DomElement.playComputer);
    DomElement.toggleNone(DomElement.difficultyContainer);
    DomElement.toggleNone(DomElement.playHuman);
    if(DomElement.playComputer.classList.contains('none')) { 
      DomElement.namePlayer1.style.margin = '0 0 0 10px';
      toggled = true //true = bot
    } else {
      DomElement.namePlayer1.style.margin = '0 0 25px 10px';
      toggled = false
    }
  };

  DomElement.playComputer.addEventListener('click', toggleSelection);
  DomElement.playHuman.addEventListener('click', toggleSelection);

  //changes screen and activates board cells
  const showGameScreen = () => {
    DomElement.toggleNone(DomElement.startScreen);
    gameBoard.addBoardListeners();  
    displayController.updateNameBoard();
  };

  DomElement.playButton.addEventListener('click', showGameScreen);

  const botDifficulty = () => {
    return DomElement.difficulty.value;
  };

  const getPlayerType = () => {
    let playerType = 'human';
    if(toggled == true) {
      playerType = 'bot';
    }
    return playerType;
  };

  const getPlayer1Name = () => {
    return DomElement.namePlayer1.value;
  };

  const getPlayer2Name = () => {
    return DomElement.namePlayer2.value;
  };
  
  return {
    toggleSelection,
    botDifficulty,
    getPlayerType,
    getPlayer1Name,
    getPlayer2Name
  }
})();


const Player = (sign, name) => {
  const getSign = () => {
    return sign;
  };

  const getName = () => {
    return name;
  };

  let roundWin = 0;
  const getScore = () => {
    return roundWin;
  };

  const increaseScore = () => {
    return roundWin++;
  };

  return {
    getSign,
    getName,
    getScore,
    increaseScore
  };
}


const gameBoard = (() => {
  const board = new Array(9);
  const winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]          
  ];

  const activateCell = (e) => {
    deactivateCell(e.target.id);
    gameLogic.updateMark(e);
  };

  //deactivates cell after placing a marker
  const deactivateCell = (cellNum) => {
    DomElement.boardCells[cellNum].removeEventListener('click', activateCell);
    DomElement.nonSelectable(DomElement.boardCells[cellNum]);
  };

  const removeBoardListeners = () => {
    DomElement.boardCells.forEach((cell) => {
      cell.removeEventListener('click', activateCell);
      DomElement.nonSelectable(cell); 
    });
  };

  const addBoardListeners = () => {
    DomElement.boardCells.forEach((cell) => {
      cell.addEventListener('click', activateCell);
    });
  };

  return {
    board,
    winCondition,
    addBoardListeners,
    removeBoardListeners
  }
})();


const gameLogic = (() => {
  const player1 = Player('X', MainMenu.getPlayer1Name());
  const player2 = Player('O', MainMenu.getPlayer2Name());


  
  let x_array = [],
      o_array = [];
  const checkWinner = (playerMark) => {
    for(let i = 0; i < gameBoard.board.length; i++) {
      if(gameBoard.board[i] != undefined && gameBoard.board[i] === 'X') {
        x_array.push(gameBoard.board.indexOf('X'));
      } else if (gameBoard.board[i] != undefined && gameBoard.board[i] === 'O') {
        o_array.push(gameBoard.board.indexOf('O'));
      }
      //emptying index so it will be skipped in the next iteration
      gameBoard.board[i] = ''; 
    }

    let winningCombination;
    for(let i = 0; i < gameBoard.winCondition.length; i++) {
      let x_count = 0,
          o_count = 0;
      for(let j = 0; j < 3; j++) {
        //check if all three numbers in the condition array index exists inside x or o array
        if(x_array.includes(gameBoard.winCondition[i][j])) { 
          x_count++;
        } else if (o_array.includes(gameBoard.winCondition[i][j])) {
          o_count++;
        }
        if(x_count === 3) {
          playerMark = 'X';
          player1.increaseScore();
          displayController.updateNameBoard(player1.getScore(), player2.getScore());
          winningCombination = i;
          displayController.gameResult(winningCombination);
        } else if(o_count === 3) {
          playerMark = 'O';
          player2.increaseScore();
          displayController.updateNameBoard(player1.getScore(), player2.getScore());
          winningCombination = i;
          displayController.gameResult(winningCombination);
        }
      }
    }
    if(x_array.length === 5 && o_array.length === 4 && winningCombination === undefined) {
      displayController.deactivateBoard();
      displayController.highlightAllCells();
    }

    //check if someone wins r5
    if(player1.getScore() === 5) {
      //displaycontroller.p1.getname won the game
    } //else p2.getname won
    return {
      playerMark,
    }
  };

  let boardMark = 'O';
  const updateMark = (e) => {
    if(boardMark === 'O') {
      boardMark = 'X';
    } 
    else {
      boardMark = 'O';
    }
    e.target.innerHTML = boardMark;
    gameBoard.board[e.target.id] = boardMark;

    checkWinner(boardMark);
  };

  return {
    updateMark
  }
})();


//to dow 
//sort objects 
//current player highlight and alignment
//show reset and main menu button when round is over
//reset board and all the counts
//show who won the round message display
//round win race to 5 logic
//add ai and its events
const displayController = (() => {
  const gameResult = (winningCombination) => {
    deactivateBoard();
    highlightWinCombination(winningCombination);
    toggleResetButtons();
  };

  const deactivateBoard = () => {
    gameBoard.removeBoardListeners();
    removeHover();
  };

  const highlightAllCells = () => {
    DomElement.boardCells.forEach((cell) => {
      cell.style.backgroundColor = 'tomato';  //change this color
    });
  }

  const highlightWinCombination = (winningCombination) => {
    let winCombo = gameBoard.winCondition[winningCombination];
    DomElement.boardCells.forEach((cell) => {
      for(let i = 0; i < winCombo.length; i++) {
        if(cell.id == winCombo[i]) {
          cell.style.backgroundColor = '#32CD3270';
        }
      }
    });
  };

  //this removes hover properties when someone wins
  const removeHover = () => {
    DomElement.boardCells.forEach((cell) => {
      if(cell.classList.contains('taken-cell')) {
        cell.classList.remove('taken-cell');
      }
      cell.style.setProperty('opacity', 100); 
    });
  };

  const updateNameBoard = (player1, player2) => {
    if(player1 === undefined) player1 = 0;
    if(player2 === undefined) player2 = 0;

    if(DomElement.namePlayer1.value !== '') {
      DomElement.nameScorePlayer1.innerHTML = `${MainMenu.getPlayer1Name()}: ${player1}`;
    } else {
      DomElement.nameScorePlayer1.innerHTML = `Player One: ${player1}`;
    }
    if(DomElement.namePlayer2.value !== '') {
      DomElement.nameScorePlayer2.innerHTML = `${MainMenu.getPlayer2Name()}: ${player2}`;
    } else {
      DomElement.nameScorePlayer2.innerHTML = `Player Two: ${player2}`;
    }
  };

  const toggleResetButtons = () => {
    DomElement.toggleNone(DomElement.openStartScreen);
    DomElement.toggleNone(DomElement.playAgain);
  }

  return {
    gameResult,
    deactivateBoard,
    highlightAllCells,
    updateNameBoard,
    toggleResetButtons
  }
})();

//DOM grab module
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

//start screen content
const MainMenu = (() => {
  // play against computer and human toggle selection
  let toggled = false;
  const toggleSelection = () => {
    DomElement.toggleNone(DomElement.labelPlayer2);
    DomElement.toggleNone(DomElement.player2);
    DomElement.toggleNone(DomElement.playComputer);
    DomElement.toggleNone(DomElement.difficultyContainer);
    DomElement.toggleNone(DomElement.playHuman);
    if(DomElement.playComputer.classList.contains('none')) { 
      DomElement.player1.style.margin = '0 0 0 10px';
      toggled = true //true = bot
    } else {
      DomElement.player1.style.margin = '0 0 25px 10px';
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
    return DomElement.player1.value;
  };

  const getPlayer2Name = () => {
    return DomElement.player2.value;
  };
  
  return {
    toggleSelection,
    botDifficulty,
    getPlayerType,
    getPlayer1Name,
    getPlayer2Name
  }
})();

//player object
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

  const updateScore = (won) => {
    if(won) {
      return roundWin++;
    } 
  };

  return {
    getSign,
    getName,
    getScore,
    updateScore
  };
}

//gameboard logic
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

  let x_array = [],
      o_array = [];
  const checkWinner = (playerMark) => {
    for(let i = 0; i < board.length; i++) {
      if(board[i] != undefined && board[i] === 'X') {
        x_array.push(board.indexOf('X'));
      } else if (board[i] != undefined && board[i] === 'O') {
        o_array.push(board.indexOf('O'));
      }
      //emptying index so it will be skipped in the next iteration
      board[i] = ''; 
    }

    let winningCombination = 0;
    for(let i = 0; i < winCondition.length; i++) {
      let x_count = 0,
          o_count = 0;
      for(let j = 0; j < 3; j++) {
        //check if all three numbers in the condition array index exists inside x or o array
        if(x_array.includes(winCondition[i][j])) { 
          x_count++;
        } else if (o_array.includes(winCondition[i][j])) {
          o_count++;
        }
        if(x_count === 3) {
          playerMark = 'X';
          winningCombination = i;
          displayController.gameResult(winningCombination);
        } else if(o_count === 3) {
          playerWinner = 'O';
          winningCombination = i;
          displayController.gameResult(winningCombination);
        }
      }
    }

    if(x_array.length === 5 && o_array.length === 4) {
      displayController.deactivateBoard();
    }
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
    board[e.target.id] = boardMark;

    checkWinner(boardMark);
  };

  const activateCell = (e) => {
    deactivateCell(e.target.id);
    updateMark(e);
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
    winCondition,
    addBoardListeners,
    removeBoardListeners
  }
})();


//to dow 
//add draw
//player name display
//current player highlight
//show reset and main menu button when round is over
//round win race to 5 logic
//add ai and its events
const displayController = (() => {
  const gameResult = (winningCombination) => {
    deactivateBoard();
    highlightWinCombination(winningCombination);
  };

  const deactivateBoard = () => {
    gameBoard.removeBoardListeners();
    removeHover();
  };

  const highlightWinCombination = (winningCombination) => {
    let winCombo = gameBoard.winCondition[winningCombination];
    DomElement.boardCells.forEach((cell) => {
      for(let i = 0; i < winCombo.length; i++) {
        if(cell.id == winCombo[i]) {
          cell.style.backgroundColor = 'limegreen';
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

  const updateNameBoard = () => {
    let score = 5;
    if(DomElement.namePlayer1.value !== '') {
      DomElement.nameScorePlayer1.innerHTML = `${DomElement.namePlayer1.value}: ${score}`;
    }
    if(DomElement.namePlayer2.value !== '') {
      DomElement.nameScorePlayer2.innerHTML = `${DomElement.namePlayer2.value}: ${score}`;
    }
  };

  return {
    gameResult,
    deactivateBoard,
    updateNameBoard
  }
})();

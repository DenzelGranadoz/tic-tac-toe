//DOM grab module
const DomElement = (() => {
  const startScreen = document.getElementById('start-screen');
  const startScreenForm = document.getElementById('start-screen-form');
  const labelPlayer2 = startScreenForm.getElementsByTagName('label')[1];
  const player1 = document.getElementById('player1-name');
  const player2 = document.getElementById('player2-name');
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
    return element.classList.toggle('taken-cell');
  }

  return {
    startScreen,
    startScreenForm,
    labelPlayer2,
    player1,
    player2,
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
  }

  const getPlayer2Name = () => {
    return DomElement.player2.value;
  }
  
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


// if getsign == X innerhtml x else vice versa -chek
//udpate array
//render

//check win conditions


//update player turn
//change player name
//change bot name
//refactor code to avoid repeating
const gameBoard = (() => {
  const board = new Array(9);

  const winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [1,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]          
  ];

  const activateCell = (e) => {
    updateMark(e);
    deactivateCell(e.target.id);
  };

  //this function will be moved to display UI controller
  let boardMark = 'O';
  const updateMark = (e) => {
    if(boardMark === 'O') {
      e.target.innerHTML ='X';
      boardMark = 'X';
    } 
    else {
      e.target.innerHTML = 'O';
      boardMark = 'O';
    }
    board[e.target.id] = boardMark;
  };

  const deactivateCell = (cellNum) => {
    DomElement.boardCells[cellNum].removeEventListener('click', activateCell);
    DomElement.nonSelectable(DomElement.boardCells[cellNum]);
  };

  const addBoardListeners = () => {
    DomElement.boardCells.forEach((cell) => {
      cell.addEventListener('click', activateCell);
    });
  };

  return {
    addBoardListeners
  }
})();


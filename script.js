console.log('whale hello der');

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
  const nameDivPlayer1 = document.getElementById('player1-name-div');
  const nameDivPlayer2 = document.getElementById('player2-name-div');
  const nameScorePlayer1 = document.getElementById('player1-name-score');
  const nameScorePlayer2 = document.getElementById('player2-name-score');
  const winnerAnnouncement = document.querySelector('winner-announcement');
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
    nameDivPlayer1,
    nameDivPlayer2,
    nameScorePlayer1,
    nameScorePlayer2,
    winnerAnnouncement,
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
      DomElement.namePlayer2.value = '';
      toggled = false
    }
  };



  DomElement.playComputer.addEventListener('click', toggleSelection);
  DomElement.playHuman.addEventListener('click', toggleSelection);

  //changes screen and activates board cells
  const showGameScreen = () => {
    DomElement.toggleNone(DomElement.startScreen);
    DomElement.toggleNone(DomElement.gameScreen);
    gameBoard.addBoardListeners();
    gameLogic.assignName();
    displayController.toggleNameBackground(DomElement.nameDivPlayer2);
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


const Player = (sign) => {
  const getSign = () => {
    return sign;
  };

  const getName = () => {
    return name;
  };

  let turn = false;
  const getTurn = () => {
    return turn = !turn;
  }

  let roundWin = 0;
  const getScore = () => {
    return roundWin;
  };

  const increaseScore = () => {
    return roundWin++;
  };

  let roundWinner = false;
  const wonTheRound = () => {
    return roundWinner = !roundWinner;
  }

  let gameWin = false;
  const wonTheGame = () => {
    return gameWin = !gameWin;
  }

  return {
    getSign,
    getName,
    getTurn,
    getScore,
    increaseScore,
    wonTheRound,
    wonTheGame
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
    //bot function that checks whos turn it is
    //if bot turn 
    //go do bot related functions 
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


//todo
//bot logic
//r5 winner display msg


const gameLogic = (() => {
  const player1 = Player('X');
  const player2 = Player('O');
  //create a function that continously run?
  //if bot == true
  //check who's turn it is
  //weakAImove()

  const assignName = () => {
    player1.name = MainMenu.getPlayer1Name();
    if(MainMenu.getPlayerType() == 'human') {
      player2.name = MainMenu.getPlayer2Name();
    } else {
      player2.name = MainMenu.botDifficulty();
    }
    displayController.updateNameBoard(player1.getScore(), player2.getScore(), player1.name, player2.name); 
  };

  //complete assigning name values
  //figure out a way to updatenameboard with it from the very beginning
  //figure out a way to do it with a bot difficulty name as well
  //create function that checks winningcombination = undefined 
  //if undefined then continue with the game

  //if winningCombination undefined?
  const updateMark = (e) => {
    if(player1.getTurn() && e.type === 'click') {    
      gameBoard.board[e.target.id] = player1.getSign();
    } 
    else if(player1.getTurn() && e.type === 'click'){
      player1.getTurn() 
      gameBoard.board[e.target.id] = player2.getSign();
    } else {
      player1.getTurn() 
      gameBoard.board[e] = player2.getSign();
    }
    displayController.toggleNameBackground(DomElement.nameDivPlayer1);
    displayController.toggleNameBackground(DomElement.nameDivPlayer2);

    render();
    checkWinner();
  };

  function generateRandomNum() {
    return Math.floor(Math.random()*9);
  }

  function weakAIMove() { 
    let aiMove;
      do {
          aiMove = generateRandomNum();
      } while (gameBoard.board[aiMove] !== "")
      updateMark(aiMove);
  }

  const render = () => {
    DomElement.boardCells.forEach((cell) => {
      for(let i = 0; i < gameBoard.board.length; i++) {
        if(gameBoard.board[i] === player1.getSign() && i == cell.id) { 
          cell.innerHTML = player1.getSign();
        } else if (gameBoard.board[i] === player2.getSign() && i == cell.id) {
          cell.innerHTML = player2.getSign();
        }
      }
    });
  };

  let x_array = [],
      o_array = [];
  let tie = false;

  const checkWinner = () => {
    for(let i = 0; i < gameBoard.board.length; i++) {
      if(gameBoard.board[i] != undefined && gameBoard.board[i] === player1.getSign()) { 
        x_array.push(gameBoard.board.indexOf(player1.getSign()));
      } else if (gameBoard.board[i] != undefined && gameBoard.board[i] === player2.getSign()) {
        o_array.push(gameBoard.board.indexOf(player2.getSign()));
      }
      //emptying index so it will be skipped in the next iteration
      gameBoard.board[i] = ''; 
    }

    let winningCombination;
    for(let i = 0; i < gameBoard.winCondition.length; i++) {
      let x_count = 0,
          o_count = 0,
          winner = false;
      for(let j = 0; j < 3; j++) {
        //check if all three numbers in the condition array index exists inside x or o array
        if(x_array.includes(gameBoard.winCondition[i][j])) { 
          x_count++;
        } else if (o_array.includes(gameBoard.winCondition[i][j])) {
          o_count++;
        }
        if(x_count === 3) {
          player1.increaseScore();
          displayController.toggleNameBackground(DomElement.nameDivPlayer2);
          displayController.winningBackground(DomElement.nameDivPlayer1);
          player1.wonTheRound();
          winner = !winner;
        } else if(o_count === 3) {
          player2.increaseScore();
          displayController.toggleNameBackground(DomElement.nameDivPlayer1);
          displayController.winningBackground(DomElement.nameDivPlayer2);
          player2.wonTheRound();
          winner = !winner;
        }
      }
      if(winner) {
        displayController.updateNameBoard(player1.getScore(), player2.getScore(), player1.name, player2.name);
        winningCombination = i;
        displayController.gameResult(winningCombination);
        winner = !winner;
        break;
      }
    }

    //tie game
    if(x_array.length === 5 && o_array.length === 4 && winningCombination === undefined) {
      displayController.deactivateBoard();
      displayController.highlightAllCells();
      displayController.toggleResetButtons();
      tie = !tie;
    }

    //check if someone wins r5
    //display message
    if(player1.getScore() === 5) {
      console.log('p1 wins');
    } else if (player2.getScore() === 5) {
      console.log('p2 wins');
    }
  };

  //REFACTOR THIS
  const clearBoardArray = () => {
    for(let i = 0; i < 9; i++) {
      gameBoard.board[i] = '';
    }
    displayController.clearBoard();
    DomElement.boardCells.forEach((cell) => {
      if(cell.classList.contains('win-bg')) {
        displayController.winningBackground(cell);
      }
      if(tie) {
        displayController.highlightAllCells(cell);
      }
    });
    x_array = [];
    o_array = [];

    if(!player1.wonTheRound()) {
      player1.getTurn();
      displayController.toggleNameBackground(DomElement.nameDivPlayer1);
      displayController.winningBackground(DomElement.nameDivPlayer1);
    } else{
      player1.wonTheRound();
      displayController.toggleNameBackground(DomElement.nameDivPlayer1);
      displayController.winningBackground(DomElement.nameDivPlayer2);
    }
    if(tie) {
      player1.getTurn();
      displayController.toggleNameBackground(DomElement.nameDivPlayer2);
      displayController.winningBackground(DomElement.nameDivPlayer2);
      tie = !tie;
    }
    displayController.toggleResetButtons();
  };
  DomElement.playAgain.addEventListener('click', clearBoardArray);

  const reloadPage = () => {
    location.reload();
    return false; 
  };
  
  DomElement.openStartScreen.addEventListener('click', reloadPage);


  return {
    assignName,
    updateMark
  }
})();


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
      cell.classList.toggle('tie-bg');
    });
  }

  const highlightWinCombination = (winningCombination) => {
    let winCombo = gameBoard.winCondition[winningCombination];
    DomElement.boardCells.forEach((cell) => {
      for(let i = 0; i < winCombo.length; i++) {
        if(cell.id == winCombo[i]) {
          winningBackground(cell);
        }
      }
    });
  };

  const winningBackground = (element) => {
    return element.classList.toggle('win-bg');
  };

  const removeHover = () => {
    DomElement.boardCells.forEach((cell) => {
      if(cell.classList.contains('taken-cell')) {
        cell.classList.remove('taken-cell');
      }
      cell.classList.toggle('full-opacity');
    });
  };

  const updateNameBoard = (p1score, p2score, p1name, p2name) => {
    if(p1score === undefined) p1score = 0;
    if(p2score === undefined) p2score = 0;

    if(p1name !== '') {
      DomElement.nameScorePlayer1.innerHTML = `${p1name}: ${p1score}`;
    } else {
      DomElement.nameScorePlayer1.innerHTML = `Player One: ${p1score}`;
    }
    if(p2name !== '') {
      DomElement.nameScorePlayer2.innerHTML = `${p2name}: ${p2score}`;
    } else {
      DomElement.nameScorePlayer2.innerHTML = `Player Two: ${p2score}`;
    }
  };
  //else if bot difficulty: ${player2}`;

  const toggleResetButtons = () => {
    DomElement.toggleNone(DomElement.openStartScreen);
    DomElement.toggleNone(DomElement.playAgain);
  };

  const toggleNameBackground = (element) => {
    return element.classList.toggle('clear-bg');
  };

  const clearBoard = () => {
    DomElement.boardCells.forEach((cell) => {
      cell.innerHTML = '';
      cell.classList.toggle('full-opacity');
    });
    reactivateBoard();
  };

  const reactivateBoard = () => {
    gameBoard.addBoardListeners();
  };

  const displayMessage = () => {
    //toggle the divs
    //toggle the message
    //playerwin has won pwinscore to plosescore
    //toggle off next round btn
  };

  return {
    gameResult,
    deactivateBoard,
    highlightAllCells,
    winningBackground,
    updateNameBoard,
    toggleResetButtons,
    toggleNameBackground,
    clearBoard
  }
})();

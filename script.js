console.log("Hello der, inspector");

//to-do make computer/human selection toggle instead
//toggle on the display as well
//start listeners on grid

//DOM grab module
const DomElement = (() => {
  const startScreen = document.getElementById('start-screen');
  const startScreenForm = document.getElementById('start-screen-form');
  const player1 = document.getElementById('player1-name');
  const player2 = document.getElementById('player2-name');
  const labelPlayer2 = startScreenForm.getElementsByTagName('label')[1];
  const difficultyContainer = document.getElementById('difficulty-container');
  const difficulty = document.getElementById('difficulty');
  // const formPlayButtons = document.getElementById('form-play-buttons');
  const playHuman = document.getElementById('human');
  const playComputer = document.getElementById('computer');
  const playButton = document.getElementById('play');
  const gameScreen = document.getElementById('game-screen');
  const messageDisplay = document.getElementById('announcement-display');
  const boardGame = document.getElementById('game-board');
  const boardCells = document.querySelectorAll('.board-cell');
  const openStartScreen = document.getElementById('main-menu');
  const playAgain = document.getElementById('play-again');

  const toggleNone = (element) => {
    return element.classList.toggle('none');
  };

  return {
    startScreen,
    startScreenForm,
    player1,
    player2,
    labelPlayer2,
    difficultyContainer,
    difficulty,
    // formPlayButtons,
    playHuman,
    playComputer,
    playButton,
    gameScreen,
    messageDisplay,
    boardGame,
    boardCells,
    openStartScreen,
    playAgain,
    // addNone,
    // removeNone,
    toggleNone
  };
})();

const MainMenu = (() => {
  // play against computer and human toggle selection
  const toggleSelection = () => {
    DomElement.toggleNone(DomElement.labelPlayer2);
    DomElement.toggleNone(DomElement.player2);
    DomElement.toggleNone(DomElement.playComputer);
    DomElement.toggleNone(DomElement.difficultyContainer);
    DomElement.toggleNone(DomElement.playHuman);
    if(DomElement.playHuman.classList.contains('none')) {
      DomElement.player1.style.margin = '0 0 25px 10px';
    } else {
      DomElement.player1.style.margin = '0 0 0 10px';
    }
  };

  DomElement.playComputer.addEventListener('click', toggleSelection);
  DomElement.playHuman.addEventListener('click', toggleSelection);

  const showGameScreen = () => {
    DomElement.addNone(DomElement.startScreen);
  };

  DomElement.playButton.addEventListener('click', showGameScreen);
})();

// DomElement.removeNone(DomElement.openStartScreen);
// DomElement.removeNone(DomElement.playAgain);

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
  const formPlayButtons = document.getElementById('form-play-buttons');
  const playHuman = document.getElementById('human');
  const playComputer = document.getElementById('computer');
  const playButton = document.getElementById('play');
  const gameScreen = document.getElementById('game-screen');
  const messageDisplay = document.getElementById('announcement-display');
  const boardGame = document.getElementById('game-board');
  const boardCells = document.querySelectorAll('.board-cell');
  const gameplayButtons = document.querySelector('.gameplay-buttons');
  const openStartScreen = document.getElementById('main-menu');
  const playAgain = document.getElementById('play-again');

  const addNone = (element) => {
    return element.classList.add('none');
  };
  const removeNone = (element) => {
    return element.classList.remove('none');
  };

  return {
    startScreen,
    startScreenForm,
    player1,
    player2,
    labelPlayer2,
    difficultyContainer,
    difficulty,
    formPlayButtons,
    playHuman,
    playComputer,
    playButton,
    gameScreen,
    messageDisplay,
    boardGame,
    boardCells,
    gameplayButtons,
    openStartScreen,
    playAgain,
    addNone,
    removeNone
  };
})();

const MainMenu = (() => {
  // play against computer and human toggle selection
  const humanSelection = () => {
    DomElement.addNone(DomElement.labelPlayer2);
    DomElement.addNone(DomElement.player2);
    DomElement.addNone(DomElement.playComputer);
    DomElement.removeNone(DomElement.difficultyContainer);
    DomElement.removeNone(DomElement.playHuman);
    DomElement.player1.style.margin = '0 0 0 10px';

  };

  const computerSelection = () => {
    DomElement.removeNone(DomElement.labelPlayer2);
    DomElement.removeNone(DomElement.player2);
    DomElement.removeNone(DomElement.playComputer);
    DomElement.addNone(DomElement.difficultyContainer);
    DomElement.addNone(DomElement.playHuman);
    DomElement.player1.style.margin = '0 0 25px 10px';
  };

  DomElement.playComputer.addEventListener('click', humanSelection);
  DomElement.playHuman.addEventListener('click', computerSelection);
})();



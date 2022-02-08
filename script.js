console.log("Hello der, inspector");
const DomElement = (() => {
  const startScreen = document.querySelector('.start-menu');
  const player1 = document.querySelector('.player1-name');
  const player2 = document.querySelector('.player2-name');
  const formButtons = document.querySelector('.form-buttons');
  const playHuman = document.getElementById('human');
  const playComputer = document.getElementById('computer');
  const gameScreen = document.querySelector('.gameplay-menu');
  const messageDisplay = document.querySelector('.message-display');
  const boardContainer = document.querySelector('.board-container');
  const boardCells = document.querySelectorAll('.board-cell');
  const gameplayButtons = document.querySelector('.gameplay-buttons');
  const openStartScreen = document.getElementById('main-menu');
  const playAgain = document.getElementById('play-again');

  return {
    startScreen,
    player1,
    player2,
    formButtons,
    playHuman,
    playComputer,
    gameScreen,
    messageDisplay,
    boardContainer,
    boardCells,
    gameplayButtons,
    openStartScreen,
    playAgain
  };
})();





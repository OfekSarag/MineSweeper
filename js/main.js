"use strict";

const MINE = "💣";
const FLAG = "🚩";

var gWatchInterval;
var gStartTime;
var gBoard;
var gIsFirstClick;

var gLevel = gEasy;
 

var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
};

function init() {
  gBoard = buildBoard();
  renderBoard(gBoard);
  gIsFirstClick = true;
  gGame.isOn = true; 
  clearInterval(gWatchInterval);
  gWatchInterval = null;
  gGame.shownCount = 0;
  gGame.markedCount=0;

}

function buildBoard() {
  var board = [];
  for (var i = 0; i < gLevel.size; i++) {
    board[i] = [];
    for (var j = 0; j < gLevel.size; j++) {
      board[i][j] = createCell();
    }
  }

  placeMines(board);
  return board;
}

function placeMines(board) {
  for (var i = 0; i < gLevel.mines; i++) {
    var rowIdx = getRandomIntInclusive(0, board.length -1);
    var colIdx = getRandomIntInclusive(0, board.length -1 );
    board[rowIdx][colIdx].isMine = true;
  }
}

function createCell() {
  return {
    minesAroundCount: 0,
    isShown: false,
    isMine: false,
    isMarked: false,
  };
}

function cellClicked(elCell, i, j) {
  if (gGame.isOn) {
    if (gIsFirstClick) {
      startStopWatch();
      gIsFirstClick = false;
    }
    if (elCell.isMarked) return;
    if (elCell.isShown) return;
    elCell.isShown = true;
    
    var minesAmount = setMinesNegsCount(gBoard, i, j);
    if (gBoard[i][j].isMine) {
      elCell.innerHTML = `<span class ='content'>${MINE}</span>`;
      checkGameOver(false);
    } else {
      elCell.innerHTML = `<span class ='content'>${minesAmount}</span>`;
      elCell.style.backgroundColor= '#578899';
    }
  }
  gGame.shownCount++;
  checkWin();
  console.log(gGame.shownCount);
}

function cellMarked(elCell) {
  if (gGame.isOn) {
    if (gIsFirstClick) {
      startStopWatch();
      gIsFirstClick = false;
    }
    if (elCell.isShown) return;
    if (!elCell.isMarked) {
      elCell.innerHTML = `<span class='marked'>${FLAG}</span>`;
      elCell.isMarked = true;
      gGame.markedCount++;
    } else {
      elCell.innerHTML = `<span></span>`;
      elCell.isMarked = false;
      gGame.markedCount--;
    }
  }
  checkWin();
}

function renderBoard(board) {
  var strHTML = "<table><tbody>";
  for (var i = 0; i < board.length; i++) {
    strHTML += "<tr>";
    for (var j = 0; j < board.length; j++) {
      var className = "cell cell-" + i + "-" + j;
      strHTML += `<td oncontextmenu="cellMarked(this)" onclick="cellClicked(this, ${i}, ${j})" class="${className}"></td>`;
    }
    strHTML += "</tr>";
  }
  strHTML += "</tbody></table>";
  var elContainer = document.querySelector(".board-container");
  elContainer.innerHTML = strHTML;
}

function showAllMines() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      if (gBoard[i][j].isMine) {
        gBoard[i][j].isShown = true;
        var elCell = document.querySelector(`.cell-${i}-${j}`);
        elCell.innerText = MINE;
      }
    }
  }
}

function checkWin() {
  if (
    gGame.markedCount === gLevel.mines &&
    gGame.shownCount === (gLevel.size ** 2) - gLevel.mines
  ) {
    checkGameOver(true);
  }
}

function restartGame() {
  var elRestart = document.querySelector(".restart");
  elRestart.innerHTML = "";
  var elTimer = document.querySelector(".timer");
  elTimer.innerText = "0";
  init();
}

function checkGameOver(isWin) {
  gGame.isOn = false;
  endStopWatch();

  if (!isWin) {
    showAllMines();
    var elRestart = document.querySelector(".restart");
    elRestart.innerHTML = `<button onclick="restartGame()">Try Again</button>`;
  } else {
    var elRestart = document.querySelector(".restart");
    elRestart.innerHTML = `<h2>You Won!</h2><button onclick="restartGame()">Play Again</button>`;
  }
}

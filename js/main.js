"use strict";

const MINE = "💣";
const FLAG = "🚩";

var gWatchInterval;
var gStartTime;
var gBoard;
var gIsFirstClick;

var gLevel = {
  size: 4,
  mines: 2,
};

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
    var rowIdx = getRandomIntInclusive(0, board.length - 1);
    var colIdx = getRandomIntInclusive(0, board.length - 1);
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
    elCell.isShown = true;
    
    if(elCell.isShown && gBoard[i][j].isMine){

      checkGameOver();
    }
    var minesAmount = setMinesNegsCount(gBoard, i, j);
    if (gBoard[i][j].isMine) {
      elCell.innerHTML = `<span class ='content'>${MINE}</span>`;
    } else {
      elCell.innerHTML = `<span class ='content'>${minesAmount}</span>`;
    }
  }
}

function cellMarked(elCell) {
  if (gGame.isOn) {
    if (gIsFirstClick) {
      startStopWatch();
      gIsFirstClick = false;
    }
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
}

function renderBoard(board) {
  var strHTML = "<table><tbody>";
  for (var i = 0; i < board.length; i++) {
    strHTML += "<tr>";
    for (var j = 0; j < board.length; j++) {
      var cell = board[i][j];
      var className = "cell cell-" + i + "-" + j;
      strHTML += `<td oncontextmenu="cellMarked(this)" onclick="cellClicked(this, ${i}, ${j})" class="${className}"></td>`;
    }
    strHTML += "</tr>";
  }
  strHTML += "</tbody></table>";
  var elContainer = document.querySelector(".board-container");
  elContainer.innerHTML = strHTML;
}

function showAllMines(){
  
}

function checkGameOver() {
  endStopWatch();
  gGame.isOn = false
}

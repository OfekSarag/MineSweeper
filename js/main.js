"use strict";

const MINE ="💣"


var gBoard;

var gLevel = {
  size: 4,
  mines: 2,
};

function init() {
  gBoard = buildBoard();
  renderBoard(gBoard);
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
    text: "",
  };
}

function setMinesNegsCount(board, rowIdx, colIdx) {
  board.minesAroundCount= 0;
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i > board.length - 1) continue;
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j > board[0].length - 1) continue;
      if (i === rowIdx && j === colIdx) continue;
      var currCell = board[i][j];
      if(currCell.isMine) board.minesAroundCount++;
    }
  }
  return board.minesAroundCount;
}

function cellClicked(elCell, i, j) {
  elCell.isShown = true;
  var minesAmount = setMinesNegsCount(gBoard, i, j)
  if (gBoard[i][j].isMine) {
    elCell.innerHTML = `<span class = 'nums'>${MINE}</span>`;
  } else {
    elCell.innerHTML = `<span class ='nums'>${minesAmount}</span>`
  }
}

function renderBoard(board) {
  var strHTML = "<table><tbody>";
  for (var i = 0; i < board.length; i++) {
    strHTML += "<tr>";
    for (var j = 0; j < board.length; j++) {
      var cell = board[i][j];
      var className = "cell cell-" + i + "-" + j;
      strHTML += `<td onclick="cellClicked(this, ${i}, ${j})" class="${className}"></td>`;
    }
    strHTML += "</tr>";
  }
  strHTML += "</tbody></table>";
  var elContainer = document.querySelector(".board-container");
  elContainer.innerHTML = strHTML;
}

function renderCell(location, value) {
  var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

"use strict";

const MINE = {
  text: "💣",
};
var gBoard;

var gLevel = {
  size: 4,
};

function init() {
  gBoard = buildBoard();
  renderBoard();
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
  board[2][1] = MINE;
  board[0][3] = MINE;
  board[2][1].isMine = true;
  board[0][3].isMine = true;
  setMinesNegsCount(board, 2, 1);
  setMinesNegsCount(board, 0, 3);
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
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i > board.length - 1) continue;
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j > board[0].length - 1) continue;
      if (i === rowIdx && j === colIdx) continue;
      var currCell = board[i][j];
      currCell.minesAroundCount++;
    }
  }
}

function cellClicked(elCell, i, j) {
  elCell.isShown = true;
  renderCell({ i, j }, gBoard[i][j].text);
}

function renderBoard() {
  var strHTML = "<table><tbody>";
  for (var i = 0; i < gBoard.length; i++) {
    strHTML += "<tr>";
    for (var j = 0; j < gBoard.length; j++) {
      var cell = gBoard[i][j];
      var className = "cell cell-" + i + "-" + j;
      strHTML += `<td onclick="cellClicked(this,${i}, ${j})" class="${className}">
        ${cell.isShown ? cell.text : cell.minesAroundCount}
      </td>`;
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
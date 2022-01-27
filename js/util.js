function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }


  function startStopWatch() {
    gWatchInterval = setInterval(updateWatch, 1);
    gStartTime = Date.now();
  }
  
  function updateWatch() {
    var now = Date.now();
    var time = ((now - gStartTime) / 1000).toFixed(3);
    var elTime = document.querySelector(".timer");
    elTime.innerText = time;
  }
  
  function endStopWatch() {
    clearInterval(gWatchInterval);
    gWatchInterval = null;
  }
  
  
function renderCell(location, value) {
  var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function setMinesNegsCount(board, rowIdx, colIdx) {
  board.minesAroundCount = 0;
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i > board.length - 1) continue;
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j > board[0].length - 1) continue;
      if (i === rowIdx && j === colIdx) continue;
      var currCell = board[i][j];
      if (currCell.isMine) board.minesAroundCount++;
    }
  }
  return board.minesAroundCount;
}
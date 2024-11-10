const boardSize = { rows: 3, cols: 4 };
const gameBoard = document.getElementById('game-board');

const transitionPoints = [];

let board = [];
let selectedPiece = null;
let currentStage = 1;

const winningZones = [
  { row: 1, col: 1 }, { row: 1, col: 3 }
];



function initializeBoard(rows, cols) {
  boardSize.rows = rows;
  boardSize.cols = cols;
  board = Array.from({ length: rows }, () => Array(cols).fill('empty'));

  board[1][2] = 'gray';
  board[2][0] = 'purple';

  drawBoard(gameBoard); 

  
  const start = { row: 2, col: 0 };  

  const visited = Array.from({ length: boardSize.rows }, () => Array(boardSize.cols).fill(false));
  dfs(start.row, start.col, visited); 
  bfs(start.row, start.col, visited); 
}


function drawBoard(container) {
  container.innerHTML = '';
  console.log("Drawing the board...");
  for (let row = 0; row < boardSize.rows; row++) {
    for (let col = 0; col < boardSize.cols; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell', board[row][col]);
      cell.dataset.row = row;
      cell.dataset.col = col;

      if (isWinningCell(row, col)) {
        cell.classList.add('winning-zone');
      }

      if (board[row][col] === 'black') {
        cell.classList.add('fixed'); 
      } else {
        cell.addEventListener('click', () => handleMove(row, col, container));
      }
      container.appendChild(cell);
    }
  }
  console.log("Board state after draw:", board);
}


function isWinningCell(row, col) {
  return winningZones.some(cell => cell.row === row && cell.col === col);
}


function dfs(row, col, visited) {
  console.log(`DFS - Checking cell: (${row}, ${col})`); 
  if (row < 0 || row >= boardSize.rows || col < 0 || col >= boardSize.cols) {
    console.log(`DFS - Out of bounds: (${row}, ${col})`); 
    return false;
  }
  if (board[row][col] === 'black' || visited[row][col]) {
    console.log(`DFS - Skipping visited or blocked cell: (${row}, ${col})`); 
    return false;
  }

  visited[row][col] = true; 

 
  if (isWinningCell(row, col)) {
    console.log(`DFS - Reached winning cell: (${row}, ${col})`); 
    return true;
  }

 
  console.log(`DFS - Exploring neighbors of: (${row}, ${col})`);
  return (
    dfs(row + 1, col, visited) ||  
    dfs(row - 1, col, visited) ||  
    dfs(row, col + 1, visited) ||  
    dfs(row, col - 1, visited)     
  );
}



function bfs(startRow, startCol) {
  const queue = [];
  const visited = Array.from({ length: boardSize.rows }, () => Array(boardSize.cols).fill(false));
  queue.push({ row: startRow, col: startCol });
  visited[startRow][startCol] = true;

  while (queue.length > 0) {
    const { row, col } = queue.shift();
    console.log(`BFS - Checking cell: (${row}, ${col})`);

    
    if (isWinningCell(row, col)) {
      console.log(`BFS - Reached winning cell: (${row}, ${col})`);
      return true;
    }

   
    const neighbors = [
      { row: row + 1, col }, 
      { row: row - 1, col }, 
      { row, col: col + 1 }, 
      { row, col: col - 1 }  
    ];

    for (const neighbor of neighbors) {
      const { row: nRow, col: nCol } = neighbor;
      if (
        nRow >= 0 && nRow < boardSize.rows &&
        nCol >= 0 && nCol < boardSize.cols &&
        !visited[nRow][nCol] &&
        board[nRow][nCol] !== 'black'
      ) {
        queue.push(neighbor);
        visited[nRow][nCol] = true;
      }
    }
  }

  console.log("BFS - No winning path found.");
  return false;
}




function checkWinCondition() {
  const visited = Array.from({ length: boardSize.rows }, () => Array(boardSize.cols).fill(false));

 
  const winningPieces = [];
  for (let row = 0; row < boardSize.rows; row++) {
    for (let col = 0; col < boardSize.cols; col++) {
      if (board[row][col] === 'purple' || board[row][col] === 'gray') {
        winningPieces.push({ row, col });
      }
    }
  }

  console.log("Checking winning condition...");
  console.log("Winning pieces:", winningPieces);
  console.log("Winning Zones:", winningZones);

  
  const allInWinningZone = winningPieces.every(piece => isWinningCell(piece.row, piece.col));

  if (allInWinningZone) {
    alert("تم الوصول إلى منطقة الفوز! كل الكرات الرمادية والبنفسجية موجودة في مناطق الفوز.");
    console.log("Win condition met!");
  } else {
    console.log("Win condition not met yet.");
  }
}

function handleMove(row, col, container) {
  const piece = board[row][col];

  if (piece === 'purple') {
    selectedPiece = { row, col };
    drawBoard(container);
  } else if (selectedPiece && board[row][col] === 'empty') {
    board[row][col] = 'purple';
    board[selectedPiece.row][selectedPiece.col] = 'empty';
    selectedPiece = null;
    drawBoard(container);

   
    checkWinCondition();
  }
}

function goToStage(stageNumber) {
  currentStage = stageNumber;

  if (stageNumber === 1) {
    gameBoard.style.display = 'grid'; 
    secondBoard.style.display = 'none'; 
    initializeBoard(3, 4); 
  } 
  
}

initializeBoard(3, 4);  

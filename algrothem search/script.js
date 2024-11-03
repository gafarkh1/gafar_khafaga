const boardSize = { rows: 3, cols: 4 };
const gameBoard = document.getElementById('game-board');
const secondBoard = document.getElementById('second-game-board');
const thirdBoard = document.getElementById('third-game-board');
const fourthBoard = document.getElementById('fourth-game-board');

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
}


function drawBoard(container) {
  container.innerHTML = '';
  for (let row = 0; row < boardSize.rows; row++) {
    for (let col = 0; col < boardSize.cols; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell', board[row][col]);
      cell.dataset.row = row;
      cell.dataset.col = col;

      
      if (isWinningCell(row, col)) {
        cell.classList.add('winning-zone');
      }

  
      if (selectedPiece && selectedPiece.row === row && selectedPiece.col === col) {
        cell.classList.add('selected');
      }

    
      if (board[row][col] === 'black') {
        cell.classList.add('fixed'); 
      } else {
        cell.addEventListener('click', () => handleMove(row, col, container));
      }

      container.appendChild(cell);
    }
  }
}


function isWinningCell(row, col) {
  return winningZones.some(cell => cell.row === row && cell.col === col);
}


function handleMove(row, col, container) {
  const piece = board[row][col];


  if (piece === 'purple') {
    selectedPiece = { row, col };
    drawBoard(container);
  } else if (selectedPiece && board[row][col] === 'empty') {
  
    board[row][col] = 'purple';
    board[selectedPiece.row][selectedPiece.col] = 'empty';

  
    applyRepelEffect(row, col);


    selectedPiece = null;
    drawBoard(container);

    
    checkWinCondition(container);
  }
}



function applyRepelEffect(row, col) {

  for (let c = 0; c < boardSize.cols; c++) {
    if (c !== col && board[row][c] !== 'empty') {
      const direction = c < col ? -1 : 1;
      const targetCol = c + direction;

      if (targetCol >= 0 && targetCol < boardSize.cols && board[row][targetCol] === 'empty') {
        board[row][targetCol] = board[row][c];
        board[row][c] = 'empty';
      }
    }
  }

  for (let r = 0; r < boardSize.rows; r++) {
    if (r !== row && board[r][col] !== 'empty') {
      const direction = r < row ? -1 : 1;
      const targetRow = r + direction;

      if (targetRow >= 0 && targetRow < boardSize.rows && board[targetRow][col] === 'empty') {
        board[targetRow][col] = board[r][col];
        board[r][col] = 'empty';
      }
    }
  }
}



function checkWinCondition(container) {
  const isWinning = winningZones.every(zone =>
    board[zone.row][zone.col] === 'purple' || board[zone.row][zone.col] === 'gray'
  );

  if (isWinning) {
    
    // container.style.display = 'none';
    document.getElementById('next-stage-button').style.display = 'block';


    setTimeout(() => {
      alert("تم الفوز! يمكنك الانتقال إلى المرحلة التالية بالنقر على الزر.");
    }, 500);
  }
}




function initializeSecondBoard() {
  secondBoard.style.display = 'grid'; 
  gameBoard.style.display = 'none'; 

 
  boardSize.rows = 5; 
  boardSize.cols = 5; 
  board = Array.from({ length: boardSize.rows }, () => Array(boardSize.cols).fill('empty'));

 
  board[4][0] = 'purple';
  board[1][2] = 'gray';
  board[3][2] = 'gray';
  board[2][3] = 'gray';
  board[2][1] = 'gray';
  winningZones.length = 0;
  winningZones.push({ row: 4, col: 2 }, { row: 2, col: 2 }, { row: 2, col: 0 }, { row: 2, col: 4 }, { row: 0, col: 2 }); // تحديث مناطق الفوز

  drawBoard(secondBoard); 
}
function initializethreedBoard() {
  thirdBoard.style.display = 'grid'; 
  secondBoard.style.display = 'none'; 
  gameBoard.style.display = 'none'; 

  
  boardSize.rows = 3; 
  boardSize.cols = 4; 
  board = Array.from({ length: boardSize.rows }, () => Array(boardSize.cols).fill('empty'));

 
  board[2][0] = 'purple'; 
  board[1][2] = 'gray';   


 
  board[0][0] = 'black'; 
  board[0][1] = 'black'; 
  board[0][2] = 'black';

  winningZones.length = 0;
  winningZones.push(
    { row: 2, col: 3 },
    { row: 0, col: 3 },

  ); 

  drawBoard(thirdBoard);
}
function initializeFourthBoard() {
  const fourthBoard = document.getElementById('fourth-game-board'); 
  fourthBoard.style.display = 'grid'; 
  secondBoard.style.display = 'none'; 
  gameBoard.style.display = 'none'; 
  thirdBoard.style.display = 'none'; 


  boardSize.rows = 5;
  boardSize.cols = 3; 
  board = Array.from({ length: boardSize.rows }, () => Array(boardSize.cols).fill('empty'));

  
  board[2][0] = 'purple'; 
  board[1][1] = 'gray';   
  board[3][1] = 'gray';


  
  board[1][0] = 'black'; 
  board[3][0] = 'black'; 
 
  winningZones.length = 0;
  winningZones.push(
    { row: 0, col: 0 },
    { row: 0, col: 2 },
    { row: 4, col: 1 }
  );

  drawBoard(fourthBoard); 
}




function goToStage(stageNumber) {
  currentStage = stageNumber;

  if (stageNumber === 1) {
    gameBoard.style.display = 'grid'; 
    secondBoard.style.display = 'none'; 
    initializeBoard(3, 4); 
  } else if (stageNumber === 2) {
    secondBoard.style.display = 'grid'; 
    gameBoard.style.display = 'none'; 
    initializeSecondBoard(); 
  } else if (stageNumber === 3) {
    thirdBoard.style.display = 'grid'; 
    secondBoard.style.display = 'none'; 
    gameBoard.style.display = 'none';
    initializethreedBoard(); 
  } else if (stageNumber === 4) {
    
    const fourthBoard = document.getElementById('fourth-game-board');
    fourthBoard.style.display = 'grid';
    secondBoard.style.display = 'none';
    gameBoard.style.display = 'none';
    thirdBoard.style.display = 'none';
    initializeFourthBoard();
  }

 
  document.getElementById('next-stage-button').style.display = 'none';
}





initializeBoard(3, 4);

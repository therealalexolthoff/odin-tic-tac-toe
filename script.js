function createPlayer (name,symbol) {
    
    let score = 0;
    const getScore = () => score;
    const increaseScore = () => score++;
   
    let active = false
    const toggleActive = () => active = !active
    const getActiveStatus = () => active

    const getSymbol = () => symbol;
    return {name, getScore, increaseScore, getSymbol, toggleActive,getActiveStatus};
}
const PLAYERS = [createPlayer(prompt('Input a name for player one.'),'X'), createPlayer(prompt('Input a name for player two.'), 'O')]

const GAMEBOARD = (function () {
    let board = [[],[],[]];
    
    const getBoard = () => board
    const clearBoard = () => board = [[],[],[]]
    const addSymbol = (index,index2,symbol) => board[index][index2] = symbol;
    return {getBoard,addSymbol,clearBoard};
})()

// Helper functions
const countOccurrences = (arr, val) =>
    arr.reduce((a, v) => (v === val[0] || v === val[1] ? a + 1 : a), 0);
function setSymbol(square,symbol) {
    square.innerHTML = symbol;
}
function checkActivePlayer () {
    return PLAYERS[0].getActiveStatus() ? PLAYERS[0] : PLAYERS[1];
}
function switchActive() {
    PLAYERS[0].toggleActive();
    PLAYERS[1].toggleActive();
}
function clearUIBoard () {
    document.querySelectorAll('td').forEach(cell => cell.innerHTML = '')
}


(function () {
    document.querySelectorAll('td').forEach(square => {
        square.addEventListener('click', (e)=> {
            if (square.innerHTML === ''){
                const rowIndex = parseInt(e.target.parentElement.id[3])
                const cellIndex = parseInt(e.target.getAttribute('name')[4])
                const activePlayer = checkActivePlayer();
                const symbol = activePlayer.getSymbol();
                setSymbol(square,symbol);
                GAMEBOARD.addSymbol(rowIndex,cellIndex,symbol);
                gameLoop();
            }
            else {
                alert('Spot taken!');
            }
        })
    });
})();

function checkRows (board) {
    for (row of board)  {
        const occurences = countOccurrences(row,['X','O'])
        if (occurences === 3){
            return row[0];
        }
    }
    return null;
}

function checkColumn(board){
    const column1 = [];
    const column2 = [];
    const column3 = [];
    for (row of board) {
        column1.push(row[0]);
        column2.push(row[1]);
        column3.push(row[2]);
    }
   if (countOccurrences(column1,['X','O']) === 3){
    return column1[0];
   }
   else if (countOccurrences(column2,['X','O']) === 3){
    return column2[0];
   }
   else if (countOccurrences(column3,['X','O']) === 3){
    return column3[0];
   }
   else {
    return null;
   }
}
function checkDiagonal(board) {
    let diagonalOne = [];
    let diagonalTwo = [];
    let counter = 0;
    for (row of board) {
        if(counter === 0){
            diagonalOne.push(row[0]);
            diagonalTwo.push(row[2])
        }
        else if(counter === 1) {
            diagonalOne.push(row[1])
            diagonalTwo.push(row[1])
        }
        else if (counter === 2){
            diagonalOne.push(row[2])
            diagonalTwo.push(row[0])
        }
    }
    if (countOccurrences(diagonalOne,['X','O']) === 3){
        return diagonalOne[0];
       }
       else if (countOccurrences(diagonalTwo,['X','O']) === 3){
        return diagonalTwo[0];
       }
       else {
        return null;
       }
}
function checkForWinner (board) {
    const diagonalWin = checkDiagonal(board);
    const rowWin = checkRows(board);
    const columnWin = checkColumn(board);
    return columnWin ? columnWin : rowWin ? rowWin : diagonalWin ? diagonalWin : null;
}
function chooseWinner(winnerSymbol,players) {
    players.forEach(player => {
        if (player.getSymbol() === winnerSymbol){
            player.increaseScore;
        }
    })
}
const gameLoop = function() {
    const board = GAMEBOARD.getBoard();
    const winnerSymbol = checkForWinner(board);
    console.log(board)
    if (winnerSymbol) {
        chooseWinner(winnerSymbol,PLAYERS);
        GAMEBOARD.clearBoard();
        clearUIBoard();
    }
    switchActive();
}



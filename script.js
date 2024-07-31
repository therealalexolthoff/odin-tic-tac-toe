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
    arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
function setSymbol(square,symbol) {
    square.innerHTML = symbol;
}

function checkArrayForOccurences (line) {
    const occurencesOfX = countOccurrences(line,'X');  
    const occurencesOfY = countOccurrences(line,'O');  
    if (occurencesOfX === 3){
        return 'X';
    }
    else if (occurencesOfY === 3){
        return 'Y';
    }
    else {
        return null;
    }
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

function setPlayerNames(){
    document.getElementById('player-name').innerHTML = PLAYERS[0].name;
    document.getElementById('player-two-name').innerHTML = PLAYERS[1].name;
}
function updatePlayerScore() {
    document.getElementById('player-score').querySelector('strong').innerHTML = PLAYERS[0].getScore();
    document.getElementById('player-two-score').querySelector('strong').innerHTML = PLAYERS[1].getScore();
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
                
                gameLoop(rowIndex,cellIndex,symbol);
            }
            else {
                alert('Spot taken!');
            }
        })
    });
    setPlayerNames();
    document.getElementById('edit-player-name').addEventListener('click', ()=> {
        PLAYERS[0].name = prompt("What new name would you like to assign to player 1?");
        setPlayerNames();
    });
    document.getElementById('edit-player-two-name').addEventListener('click', ()=> {
        PLAYERS[1].name = prompt("What new name would you like to assign to player 1?");
        setPlayerNames();
    })
})();

function checkColumn(board){
    const column1 = [];
    const column2 = [];
    const column3 = [];
    for (row of board) {
        column1.push(row[0]);
        column2.push(row[1]);
        column3.push(row[2]);
    }
    board.push(column1,column2,column3)
    return board;
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
        counter++;
    }
    board.push(diagonalOne,diagonalTwo)
    return board;
}

function checkBoard (board) {
    const checkedBoard = checkDiagonal(checkColumn(board))
    for (line of checkedBoard) {
        let winnerStatus = checkArrayForOccurences(line)
        if (winnerStatus){
            return winnerStatus;
        }
    }
    return null;
}

function chooseWinner(winnerSymbol,players) {
    players.forEach(player => {
        if (player.getSymbol() === winnerSymbol){
            player.increaseScore();
        }
    })
}

const gameLoop = function(row,cell,symbol) {
    GAMEBOARD.addSymbol(row,cell,symbol);
    let boardForThisRound =[...GAMEBOARD.getBoard()];
    const winnerSymbol = checkBoard(boardForThisRound);
    if (winnerSymbol) {
        chooseWinner(winnerSymbol,PLAYERS);
        GAMEBOARD.clearBoard();
        setTimeout(clearUIBoard,2000);
        updatePlayerScore();
        if (!PLAYERS[0].getActiveStatus()){
            switchActive()
        }
    }
    else {
        switchActive();
    }
}
PLAYERS[0].toggleActive()


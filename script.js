function createPlayer (name,symbol) {
    let score = 0;
    const getScore = () => score;
    const increaseScore = () => score++;
    const getSymbol = () => symbol;
    return {name, getScore, increaseScore, getSymbol}
}

const gameBoard = (function () {
    let board = [[],[],[]]
    const addSymbol = (index,index2,symbol) => board[index][index2]= symbol;
    return {board,addSymbol}
})()
gameBoard.addSymbol(0,0,'X')

function setSymbol(square,symbol) {
    square.innerHTML = symbol
}
document.querySelectorAll('td').forEach(square => {
    square.addEventListener('click', ()=> {
        setSymbol(square,'X')
    })
})
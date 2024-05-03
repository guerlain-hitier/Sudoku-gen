var board = [
    [],[],[],
    [],[],[],
    [],[],[]
];

var counter = 1;
var coloredTiles = [];
var outputy = document.getElementById('outputy');
var outputx = document.getElementById('outputx');
var output = document.getElementById('output');
var allowedInputs = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
var x;
var y;
var grid;
var row;
var col;
var solvedBoard;

for (var i = 0; i < 9; i++) {
    //get current inner div
    var currArr = Array.from(document.getElementById('inner' + ((i)+1)).children);
    
    //add each input to the board
    for (var j = 0; j < 9; j++) {
        board[i].push(currArr[j]);
    }

    //add event listener to each input
    for (var j = 0; j < 9; j++) {
        board[i][j].addEventListener('input', function(event) {
            
            setValues(event);
            checkInput(event, row, col, grid);
         

        });
        counter++;
    }
}

function solvable(board) {
    // Create a copy of the board so we don't modify the original
    var copyBoard = board;

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (copyBoard[i][j].value == '') {
                for (var num = 1; num <= 9; num++) {
                    if (possible(i, j, num)) {
                        copyBoard[i][j].value = num;
                        if (solvable(copyBoard)) {
                            return true;
                        }
                        copyBoard[i][j].value = '';
                    }
                }
                return false; // return false when no number can be placed in the current cell
            }
        }
    }
    return true; // return true when all cells are filled
}

function generateSolvedBoard() {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j].value == '') {
                var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                numbers = shuffle(numbers); // shuffle the numbers
                for (var k = 0; k < 9; k++) {
                    if (possible(i, j, numbers[k])) {
                        board[i][j].value = numbers[k];
                        if (generateSolvedBoard()) {
                            return true;
                        }
                        board[i][j].value = '';
                    }
                }
                return false; // return false when no number can be placed in the current cell
            }
        }
    }
    solvedBoard = board;
    return true; // return true when all cells are filled
}

// Function to shuffle an array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function generateBoard() {
    generateSolvedBoard();
    removeValues(getFilledCells());
}

async function removeValues(filledCells) {
    if (filledCells.length == 0 || !solvable(board)) {
        return;
    }
    currentCell = getRandomFilledCell(getFilledCells());
    console.log(currentCell);
    if (solvable(getFilledCells)) {
        console.log('solvable');
        let oldVal = currentCell.value;
        currentCell.value = '';
        console.log(currentCell.value == '');
        //sleep to see the board
        await new Promise(r => setTimeout(r, 500));
        if (!solvable(getFilledCells)) {
            console.log('not solvable');
            currentCell.value = oldVal;
            return;
        }else {
            removeValues(getFilledCells());
    }
}
    
}



function getFilledCells() {
    let filledCells = [];
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j].value != '') {
                filledCells.push(board[i][j]);
            }
        }
    }
    return filledCells;
}

function getRandomFilledCell(filledCells) {
    let randomIndex = Math.floor(Math.random() * filledCells.length);
    return filledCells[randomIndex];
}


function getEmptyCells() {
    let emptyCells = [];
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j].value == '') {
                emptyCells.push(board[i][j]);
            }
        }
    
    }
    return emptyCells;
}

function getRamdomEmptyCell(emptyCells) {
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
}

function possible(x, y, n) {
    setValues({target: board[x][y]});
    return getPossibleValues(row, col, grid).includes(n);
}

function getPossibleValues(row, col, grid) {
    let allValues = [];

    for (var i = 0; i < 9; i++) {
        if (row[i].value != '') {
            allValues.push(parseInt(row[i].value));
        }
        if (col[i].value != '') {
            allValues.push(parseInt(col[i].value));
        }
        if (grid[i].value != '') {
            allValues.push(parseInt(grid[i].value));
        }
    }

    let usedValues = new Set(allValues);
    
    let possibleValues = [];
    for (let i = 1; i <= 9; i++) {
        if (!usedValues.has(i)) {
            possibleValues.push(i);
        }
    }

    return possibleValues;

}

function resetBoard() {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            board[i][j].value = '';
        }
    }
}

function setValues(event) {
    x = getX(event.target);
    y = getY(event.target);
    grid = getGrid(x, y);
    row = getRow(y);
    col = getCol(x);
}


function checkInput(event, row, col, grid) {
    
    //check if input is valid (1-9) or valid sudoku move if invalid, set to nothing
    if(!allowedInputs.includes(event.target.value) || !checkValidMove(event.target, row, col, grid)) {
        event.target.value = '';
        return;
    }
}

function getRow(x) {
    return board[x];
}

function getCol(y) {
    let col = [];
    for (var i = 0; i < 9; i++) {
        col.push(board[i][y]);
    }
    return col;
}

function getGrid(x, y) {
    let grid = [];
    let thirdY = Math.floor(y/3) + 1;
    let target = document.getElementById('third' + thirdY).children;
    let thirdX = Math.floor(x/3) + 1;

    for (var i = 0; i < 3; i++) {
        currArr = Array.from(target[i].children);
        if (thirdX == 1) {
            grid.push(currArr[0]);
            grid.push(currArr[1]);
            grid.push(currArr[2]);
        }
        if (thirdX == 2) {
            grid.push(currArr[3]);
            grid.push(currArr[4]);
            grid.push(currArr[5]);
        }
        if (thirdX == 3) {
            grid.push(currArr[6]);
            grid.push(currArr[7]);
            grid.push(currArr[8]);
        }
    }
    return grid;
}

function checkValidMove(target, row, col, grid) { 

    //if target is empty, return true
    if (target.value == '') {
        return true;
    }

    //reset colored tiles
    if (coloredTiles.length > 0) {
        for (var i = 0; i < coloredTiles.length; i++) {
            coloredTiles[i].style.backgroundColor = 'rgb(152, 152, 152)';
        }
        coloredTiles = [];
    }

    let value = target.value;

    //check if value if valid move
    for (var i = 0; i < 9; i++) {
        if (row[i].value == value && row[i] != target) {
            coloredTiles.push(row[i]);
            row[i].style.backgroundColor = 'red';
            return false;        
        }

        if (col[i].value == value && col[i] != target) {
            coloredTiles.push(col[i]);
            col[i].style.backgroundColor = 'red';
            return false; 
        }

        if (grid[i].value == value && grid[i] != target) {
            coloredTiles.push(grid[i]);
            grid[i].style.backgroundColor = 'red';
            return false; 
        }
    }
    
    return true;


}

function getY(target) {
    let x = target.parentElement.id[5];
    return x-1;
}

function getX(target) {
    let y = target.className[17];  

    return y-1;
}





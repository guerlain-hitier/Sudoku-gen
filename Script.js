var board = [
    [],[],[],
    [],[],[],
    [],[],[]
];

var counter = 1;
var redTiles = [];
var greenTiles = [];
var outputy = document.getElementById('outputy');
var outputx = document.getElementById('outputx');
var output = document.getElementById('output');
var slider = document.getElementById("myRange");
slider.oninput = function() {
    minRemoved = 81 + parseInt(this.value);
  }
var allowedInputs = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
var x;
var y;
var grid;
var row;
var col;
var solvedBoard;
var minRemoved = 43;
var removed;
var savedBoardValues = [];
var savedBoarditems = [];

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
            if (isSolved()) {
                colorTiles();
            } else {
                resetTiles();
            }

         

        });
        counter++;
    }
}

//dummy solveBoard that calls generateSolvedBoard
function solveBoard() {
    generateSolvedBoard();
}

//colors all tiles green 
function colorTiles() {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            board[i][j].style.backgroundColor = 'green';
            //add to greenTiles array
            greenTiles.push(board[i][j]);
        }
    }
}

//resets tiles to gray if not red
function resetTiles() {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (greenTiles.includes(board[i][j]) && !redTiles.includes(board[i][j])) {
                board[i][j].style.backgroundColor = 'rgb(152, 152, 152)';
            }
        }
    }
}

//checks if board is solved
function isSolved() {
    if (getEmptyCells().length > 0) {
        return false;
    }
    return true;
}

// Function to generate a solved board
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

//shuffles an array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // while there remain elements to shuffle
    while (0 !== currentIndex) {

        // pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // swap it with the current element
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// generate a board then removes values depending on set difficulty
function generateBoard() {
    resetTiles();
    generateSolvedBoard();
    removed = 0;
    removeValues(getFilledCells());
    savedBoardValues = elementsToValueArr(board);
    console.log(savedBoardValues);
}

// recursive call to remove values from the board until minRemoved is reached
 function removeValues() {
    if (removed >= minRemoved) {
        return;
    }
    removed++;
    // await new Promise(r => setTimeout(r, 0));
    let currentCell = getRandomFilledCell(getFilledCells());
    currentCell.value = '';
    removeValues();
}

// convert array of html elements to array of values within the elements
function elementsToValueArr(arr) {
    // Your code here
    let newArr = [];
    for (var i = 0; i < arr.length; i++) {
        newArr.push([]);
        for (var j = 0; j < arr[i].length; j++) {
            newArr[i].push(arr[i][j].value);
        }
       
    }
    return newArr;
}

// returns array of all filled cells
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

// returns random filled cell
function getRandomFilledCell(filledCells) {
    let randomIndex = Math.floor(Math.random() * filledCells.length);
    return filledCells[randomIndex];
}

// returns array of all empty cells
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

// returns random empty cell
function getRamdomEmptyCell(emptyCells) {
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
}

// checks if a number can be placed in a cell
function possible(x, y, n) {
    setValues({target: board[x][y]});
    return getPossibleValues(row, col, grid).includes(n);
}

// returns array of possible values for a cell
function getPossibleValues(row, col, grid) {
    let allValues = [];

    // add existing values to allValues array
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

    // remove duplicates
    let usedValues = new Set(allValues);
    
    // get possible values if value is not in usedValues
    let possibleValues = [];
    for (let i = 1; i <= 9; i++) {
        if (!usedValues.has(i)) {
            possibleValues.push(i);
        }
    }

    return possibleValues;

}

// resets board to saved values
function resetBoard() {
    resetTiles();
    console.log(savedBoardValues);
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            board[i][j].value = savedBoardValues[i][j];
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
    if (redTiles.length > 0) {
        for (var i = 0; i < redTiles.length; i++) {
            redTiles[i].style.backgroundColor = 'rgb(152, 152, 152)';
        }
        redTiles = [];
    }

    let value = target.value;

    //check if value if valid move
    for (var i = 0; i < 9; i++) {
        if (row[i].value == value && row[i] != target) {
            redTiles.push(row[i]);
            row[i].style.backgroundColor = '#FF0000';
            return false;        
        }

        if (col[i].value == value && col[i] != target) {
            redTiles.push(col[i]);
            col[i].style.backgroundColor = '#FF0000';
            return false; 
        }

        if (grid[i].value == value && grid[i] != target) {
            redTiles.push(grid[i]);
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





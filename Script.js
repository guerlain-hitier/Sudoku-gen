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
            var x = getX(event.target);
            var y = getY(event.target);
            var grid = getGrid(x, y);

            outputy.innerHTML = "y: " + y;
            outputx.innerHTML = "x: " + x;
            
            var row = getRow(y);
            var col = getCol(x);

            
            checkInput(event, row, col, grid);

        });
        counter++;
    }
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





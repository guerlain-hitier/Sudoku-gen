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
            
            var row = getRow(x);
            var col = getCol(y);
            

            if(!checkValid(event.target.value, x, y, row, col, grid)){
                event.target.value = '';
            }
        });
        counter++;
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

function checkValid(val, x, y, row, col, grid) { 

    var valid = true;

    //if some tiles are already colored, reset them
    if (coloredTiles.length > 0) {
        for (var i = 0; i < coloredTiles.length; i++) {
            coloredTiles[i].style.backgroundColor = 'rgb(152, 152, 152)';
        }
        coloredTiles = [];
    }

    //if the input is empty, return
    if (val == '') {
        return;
    }

    //check if the input is valid
    for (var i = 0; i < 9; i++) {

        if(i == y || i == x) {
            //tile being checked is the same as the input
            continue;
        }

        //check row 
        if (row[i].value == val) {
            row[i].style.backgroundColor = 'red';
            coloredTiles.push(row[i]);
            valid = false;
        }

        //check collumn
        if (col[i].value == val) {
            col[i].style.backgroundColor = 'red';
            coloredTiles.push(col[i]);
            valid = false;
        }

        if (grid[i].value == val) {
            grid[i].style.backgroundColor = 'red';
            coloredTiles.push(grid[i]);
            valid = false;
        }
    }
    return valid;
    
}

function getY(target) {
    let x = target.parentElement.id[5];
    return x-1;
}

function getX(target) {
    let y = target.className[17];  

    return y-1;
}





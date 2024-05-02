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
            
            var row = getRow(y);
            var col = getCol(x);

            

            if(!checkValid(event.target, row, col, grid)){
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

function checkValid(target, row, col, grid) { 

    if (target.value == '') {
        return true;
    }


    let value = target.value;

    for (var i = 0; i < 9; i++) {
        if (row[i].value == value && row[i] != target) {

            return false;        
        }

        if (col[i].value == value && col[i] != target) {
            return false; 
        }

        if (grid[i].value == value && grid[i] != target) {
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





// Must hard-code every puzzle in this variable
let grid = [
            [0,0,0, 8,0,0, 4,2,0],
            [5,0,0, 6,7,0, 0,0,0],
            [0,0,0, 0,0,9, 0,0,5],

            [7,4,0, 1,0,0, 0,0,0],
            [0,0,9, 0,3,0, 7,0,0],
            [0,0,0, 0,0,7, 0,4,8],

            [8,0,0, 4,0,0, 0,0,0],
            [0,0,0, 0,9,8, 0,0,3],
            [0,9,5, 0,0,3, 0,0,0]
];

// checks if new entry meets all constraints
function isValid(row, col, num, board) {

    // validate row
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num && col !== i) {
            return false;
        }
    }

    // validate column
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num && row !== i) {
            return false;
        }
    }

    // validate square
    let box_X = Math.floor(col / 3);
    let box_Y = Math.floor(row / 3);
    for (let i = box_Y * 3; i < (box_Y * 3) + 3; i++) {
        for (let j = box_X * 3; j < (box_X * 3) + 3; j++) {
            if (board[i][j] === num && [i,j] !== [row,col]) {
                return false;
            }
        }
    }
    return true;
}

// testing performance of 'solve' function
let t0 = performance.now();

// main recursive function
function solve(board = grid) {

    // function finds the next empty cell in the board
    // if there are no more empty cells, returns null
    function findEmptyCell(board) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === " ") {
                    return [i, j];
                }
            }
        }
        return null;
    }

    // array consisting of [row, col]
    let pos = findEmptyCell(board);

    if (pos === null) {
        drawTable(board, "solution");
        document.getElementById('solveButton').disabled = true;
        return true;
    }
    else {
        let row = pos[0];
        let col = pos[1];

        for (let i = 1; i <= 9; i++) {
            if (isValid(row, col, i, board)) {
                board[row][col] = i;
                // recursive call on next cell in the board
                if (solve(board)) {
                    return true;
                }
                board[row][col] = " ";
            }
        }
        return false;
    }
}
// timing performance of 'solve' function
let t1 = performance.now();
console.log('this took ' + (t1 - t0) + " milliseconds");

// print the table dynamically with table element of HTML
function drawTable(board = grid, id = "problem") {
    let table = document.getElementById(id);
    // loop through each cell in 2d array
    board[0].forEach( (col, i) => {
        let x = document.createElement("tr");
        board.forEach( (row, j) => {
            let y = document.createElement("td");
            // remove 0's from the output
            if(board[i][j] === 0) {board[i][j] = " "} 
            let content = document.createTextNode(board[i][j]);
            y.appendChild(content);
            x.appendChild(y);
        });
        table.appendChild(x);
    });
    document.body.appendChild(table);
}
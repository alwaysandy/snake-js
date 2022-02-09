function createBoard() {
    const board = [];
    for (let i = 0; i < 10; i++) {
        board[i] = [];
    }

    return board;
}

function populateBoard(board) {
    const boardDiv = document.querySelector('#board-div')

    for (let y = 0; y < 10; y++) {
        const line = document.createElement('div');
        line.classList.add('line')
        for (let x = 0; x < 10; x++) {
            const tile = document.createElement('div');
            tile.style.width = "10px";
            tile.style.height = "10px";
            tile.style.border = "1px solid black";
            tile.dataset.x = x;
            tile.dataset.y = y;
            line.appendChild(tile);
            board[x].push(tile);
        }
        boardDiv.appendChild(line);
    }

    return board;
}

// function moveSnake(dir) {
//     console.table(snake);
//     const snakeEnd = snake.length - 1;
//     board[snake[0][0]][snake[0][1]].classList.remove('snake');
//     snake.push([...snake[snakeEnd]]);
//     snake.splice(0, 1);

//     console.table(snake);
//     switch (dir) {
//         case 'right':
//             snake[snakeEnd][0] += 1;
//             break;
//         case 'left':
//             snake[snakeEnd][0] -= 1;
//             break;
//         case 'down':
//             snake[snakeEnd][1] += 1;
//             break;
//         case 'up':
//             snake[snakeEnd][1] -= 1;
//             break;
//     }
    
//     board[snake[snakeEnd][0]][snake[snakeEnd][1]].classList.add('snake');
// }

function moveSnake(dir) {
    // Remove the tail, and change background back to white
    // Copy the head to the beginning, and move the head to the end
    const snakeEnd = snake.length - 1;
    board[snake[snakeEnd][0]][snake[snakeEnd][1]].classList.remove('snake');
    snake.splice(0, 0, [...snake[0]]);
    snake.pop();
    switch (dir) {
        case 'right':
            snake[0][0] += 1;
            break;
        case 'left':
            snake[0][0] -= 1;
            break;
        case 'down':
            snake[0][1] += 1;
            break;
        case 'up':
            snake[0][1] -= 1;
            break;
    }
    if (isOutOfBounds(snake[0][0], snake[0][1])) return false;
    if (isCollided(snake[0][0], snake[0][1])) return false;
    board[snake[0][0]][snake[0][1]].classList.add('snake')
    console.log(board[snake[0][0]][snake[0][1]].classList[0]);
}

function isCollided(x, y) {
    if (board[x][y].classList[0] === 'snake') {
        errorHeader.textContent = "COLLIDED";
        return true;
    }
    return false;
}

function isOutOfBounds(x, y) {
    console.log([board.length, board[0].length]);
    console.log([x, y])
    if ((x < 0 || y < 0) || (x >= board.length || y >= board[0].length)) {
        errorHeader.textContent = "OUT OF BOUNDS";
        return true;
    }
    return false;
}

const board = populateBoard(createBoard());
const snake = [];

// for (let i = 3; i < 6; i++) {
//     board[i][4].classList.add('snake');
//     snake.push([i, 4]);
// }

for (let i = 8; i > 1; i--) {
    board[i][4].classList.add('snake');
    snake.push([i, 4]);
}

const down = document.querySelector('#down');
down.addEventListener('click', () => moveSnake('down'));

const right = document.querySelector('#right');
right.addEventListener('click', () => moveSnake('right'));

const up = document.querySelector('#up');
up.addEventListener('click', () => moveSnake('up'));

const left = document.querySelector('#left');
left.addEventListener('click', () => moveSnake('left'));

const errorHeader = document.querySelector('.error-header');
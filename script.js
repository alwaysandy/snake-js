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
            tile.style.width = "1em";
            tile.style.height = "1em";
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
}

function isCollided(x, y) {
    if (board[x][y].classList[0] === 'snake') {
        errorHeader.textContent = "COLLIDED";
        return true;
    }
    return false;
}

function isOutOfBounds(x, y) {
    if ((x < 0 || y < 0) || (x >= board.length || y >= board[0].length)) {
        errorHeader.textContent = "OUT OF BOUNDS";
        return true;
    }
    return false;
}

function changeDir(newDir, currDir) {
    switch (newDir) {
        case 'right':
            if (snake[0][0] >= snake[1][0]) {
                return 'right';
            } else {
                return false;
            }
        case 'left':
            if (snake[0][0] <= snake[1][0]) {
                return 'left';
            } else {
                return false;
            }
        case 'up':
            if (snake[0][1] <= snake[1][1]) {
                return 'up';
            } else {
                return false;
            }
        case 'down':
            if (snake[0][1] >= snake[1][1]) {
                return 'down';
            } else {
                return false;
            }
    }
}

const board = populateBoard(createBoard());
const snake = [];
let direction = 'right';

for (let i = 8; i > 1; i--) {
    board[i][4].classList.add('snake');
    snake.push([i, 4]);
}

// const down = document.querySelector('#down');
// down.addEventListener('click', () => {
//     direction = changeDir('down', direction);
//     moveSnake(direction);
// });

// const right = document.querySelector('#right');
// right.addEventListener('click', () => {
//     direction = changeDir('right', direction);
//     moveSnake(direction);
// });

// const up = document.querySelector('#up');
// up.addEventListener('click', () => {
//     direction = changeDir('up', direction);
//     moveSnake(direction);
// });

// const left = document.querySelector('#left');
// left.addEventListener('click', () => {
//     direction = changeDir('left', direction);
//     moveSnake(direction);
// });
const errorHeader = document.querySelector('.error-header');

const directionButtons = document.querySelectorAll('button');
directionButtons.forEach((b) => {
    b.addEventListener('click', () => {
        direction = changeDir(b.id, direction);
        if (direction) moveSnake(direction);
    });
});
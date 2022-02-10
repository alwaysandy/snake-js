function createBoard() {
    const board = [];
    for (let i = 0; i < 30; i++) {
        board[i] = [];
    }

    return board;
}

function populateBoard(board) {
    const boardDiv = document.querySelector('#board-div')

    for (let y = 0; y < 30; y++) {
        const line = document.createElement('div');
        line.classList.add('line')
        for (let x = 0; x < 30; x++) {
            const tile = document.createElement('div');
            tile.style.width = "2.5vh";
            tile.style.height = "2.5vh";
            tile.style.border = "1px solid #888";
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
    snake.splice(0, 0, [...snake[0]]);
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
    if (isOutOfBounds(snake[0][0], snake[0][1])) {
        clearInterval(intervalID);
        return;
    }

    if (isCollided(snake[0][0], snake[0][1])) {
        clearInterval(intervalID);
        return;
    }

    board[snake[0][0]][snake[0][1]].classList.add('snake')

    const snakeEnd = snake.length - 1;
    if (!snakeGrew) {
        board[snake[snakeEnd][0]][snake[snakeEnd][1]].classList.remove('snake');
    } else {
        snakeGrew = false;
    }

    snake.pop();

    if (eatApple(snake[0][0], snake[0][1])) growSnake();
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

function eatApple(x, y) {
    if (board[x][y].classList[0] === 'apple') {
        let newApple = generateApple();
        moveApple(apple, newApple);
        apple = newApple;
        speedUp();
        return true;
    }

    return false;
}

function growSnake() {
    snake.push([...snake[snake.length - 1]]);
    snakeGrew = true;
}

function changeDir(newDir, currDir) {
    switch (newDir) {
        case 'right':
            if (snake[0][0] >= snake[1][0]) {
                return 'right';
            } else {
                return currDir;
            }
        case 'left':
            if (snake[0][0] <= snake[1][0]) {
                return 'left';
            } else {
                return currDir;
            }
        case 'up':
            if (snake[0][1] <= snake[1][1]) {
                return 'up';
            } else {
                return currDir;
            }
        case 'down':
            if (snake[0][1] >= snake[1][1]) {
                return 'down';
            } else {
                return currDir;
            }
    }
}

function generateApple() {
    let x, y;
    do {
        x = Math.floor(Math.random() * board.length);
        y = Math.floor(Math.random() * board.length);
        console.log(board[x][y].classList);
    } while (board[x][y].classList.length === 1);
    return [x, y];
}

function moveApple(currApple, newApple) {
    if (currApple) {
        board[currApple[0]][currApple[1]].classList.remove('apple');
    }
    board[newApple[0]][newApple[1]].classList.add('apple');
}

function speedUp() {
    clearInterval(intervalID);
    if (intervalSpeed >= 50) {
        intervalSpeed -= 3;
    }
    intervalID = setInterval(() => moveSnake(direction), intervalSpeed);
}

/*function moveApple() {
    if apple[0] === undefined {

    }
}*/

const board = populateBoard(createBoard());
const snake = [];
let snakeGrew = false;
const errorHeader = document.querySelector('.error-header');
let direction = 'right';
let intervalSpeed = 100;
let intervalID = null;

for (let i = 12; i > 10; i--) {
    board[i][15].classList.add('snake');
    snake.push([i, 15]);
}

let apple = generateApple();
moveApple(null, apple);

const directionButtons = document.querySelectorAll('button');
directionButtons.forEach((b) => {
    b.addEventListener('click', () => {
        direction = changeDir(b.id, direction);
        //if (direction) moveSnake(direction);
    });
});

window.addEventListener('keydown', (e) => {
    if (intervalID === null) {
        intervalID = setInterval(() => moveSnake(direction), intervalSpeed);
    }
    switch (e.key) {
        case 'ArrowDown':
            direction = changeDir('down', direction);
            break;
        case 'ArrowRight':
            direction = changeDir('right', direction);
            break;
        case 'ArrowLeft':
            direction = changeDir('left', direction);
            break;
        case 'ArrowUp':
            direction = changeDir('up', direction);
            break;
    }
});

const startGame = document.querySelector('#start-game');
startGame.addEventListener('click', () => {
    if (intervalID === null) {
        intervalID = setInterval(() => moveSnake('right'), intervalSpeed);
    }
});


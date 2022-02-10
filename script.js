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
            tile.classList.add('tile');
            
            tile.dataset.x = x;
            tile.dataset.y = y;
            line.appendChild(tile);
            board[x].push(tile);
        }
        boardDiv.appendChild(line);
    }

    return board;
}

function addControlEventListeners() {
    window.addEventListener('keydown', (e) => {
        if (intervalID === null) {
            intervalID = setInterval(() => moveSnake(), snakeSpeed);
        }
        switch (e.key) {
            case 'ArrowDown':
            case 's':
                direction = changeDir('down', direction);
                break;
            case 'ArrowRight':
            case 'd':
                direction = changeDir('right', direction);
                break;
            case 'ArrowLeft':
            case 'a':
                direction = changeDir('left', direction);
                break;
            case 'ArrowUp':
            case 'w':
                direction = changeDir('up', direction);
                break;
        }
    });
    
    const startGameButton = document.querySelector('#start-game');
    startGameButton.addEventListener('click', () => {
        if (intervalID === null) {
            direction = 'right';
            intervalID = setInterval(() => moveSnake(), snakeSpeed);
        }
    });
    
    const directionButtons = document.querySelectorAll('.dir-button');
    directionButtons.forEach((b) => {
        b.addEventListener('click', () => direction = changeDir(b.id, direction));
    });
    
    const resetGameButton = document.querySelector('#reset');
    resetGameButton.addEventListener('click', () => {
        resetBoard();
    });
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

function placeSnake() {
    for (let i = 12; i > 10; i--) {
        board[i][15].classList.add('snake');
        snake.push([i, 15]);
    }
}

function moveSnake() {
    snake.splice(0, 0, [...snake[0]]);
    switch (direction) {
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
        snake.pop();
    } else {
        snakeGrew = false;
    }

    eatApple(snake[0][0], snake[0][1])
}

function isCollided(x, y) {
    if (board[x][y].classList.contains('snake')) {
        displayError("COLLIDED");
        return true;
    }
    return false;
}

function isOutOfBounds(x, y) {
    if ((x < 0 || y < 0) || (x >= board.length || y >= board[0].length)) {
        displayError("OUT OF BOUNDS");
        return true;
    }
    return false;
}

function generateApple() {
    let x, y;
    do {
        x = Math.floor(Math.random() * board.length);
        y = Math.floor(Math.random() * board.length);
        console.log(board[x][y].classList);
    } while (board[x][y].classList.contains('snake'));
    return [x, y];
}

function moveApple(currApple) {
    if (currApple) {
        board[currApple[0]][currApple[1]].classList.remove('apple');
    }
    const newApple = generateApple()
    board[newApple[0]][newApple[1]].classList.add('apple');
    return newApple;
}

function eatApple(x, y) {
    if (board[x][y].classList.contains('apple')) {
        apple = moveApple(apple);
        speedUp();
        score += 1;
        displayUpdatedScore();
        snakeGrew = true;
    }
}

function speedUp() {
    clearInterval(intervalID);
    if (snakeSpeed >= 60) {
        snakeSpeed -= 3;
    }
    intervalID = setInterval(() => moveSnake(), snakeSpeed);
}

function displayUpdatedScore() {
    const scoreHeader = document.querySelector('.score');
    scoreHeader.textContent = `Score: ${score}`;
}

function displayError(e) {
    const errorHeader = document.querySelector('.error-header');
    errorHeader.textContent = e;
    errorHeader.style.opacity = 100;
}

function resetBoard() {
    clearInterval(intervalID);
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile) => {
        tile.classList.remove('snake');
    });
    snake.splice(0, snake.length);
    intervalID = null;
    snakeSpeed = 100;
    placeSnake();
    const errorHeader = document.querySelector('.error-header');
    errorHeader.style.opacity = 0;
    score = 0;
    displayUpdatedScore();
    apple = moveApple(apple);
    direction = 'right';
}

/*function moveApple() {
    if apple[0] === undefined {

    }
}*/

// Initial variables required to run game

// This is the grid of tiles
const board = populateBoard(createBoard());
// This will store the coordinates of every 'snake' tile
const snake = [];
let snakeGrew = false;
let direction = 'right';
let score = 0;
let snakeSpeed = 100;
let intervalID = null;
// Add snake and apple to board
placeSnake();
let apple = moveApple();

addControlEventListeners();
var dotSize = 40;
var gameBoardSize = 800;
var direction = 'right';
var snake = [{ top: 0, left: 0 }];
var apple = null;
var gameInterval = null;

function updateSnake() {
    var head = Object.assign({}, snake[0]); // copy head
    if (direction === 'right') head.left += dotSize;
    if (direction === 'down') head.top += dotSize;
    if (direction === 'left') head.left -= dotSize;
    if (direction === 'up') head.top -= dotSize;
    snake.unshift(head);

    if (apple && apple.top === head.top && apple.left === head.left) { // ate the apple
        apple = null; // remove apple
    } else {
        snake.pop(); // remove tail
    }

    if (head.left < 0 || head.top < 0 || head.left === gameBoardSize || head.top === gameBoardSize || snake.find((dot, index) => index !== 0 && dot.top === head.top && dot.left === head.left)) {
        // game over
        gameOver();
    }
}

function updateApple() {
    if (!apple) {
        apple = { top: Math.floor(Math.random() * gameBoardSize / dotSize) * dotSize, left: Math.floor(Math.random() * gameBoardSize / dotSize) * dotSize };
    }
}

function draw() {
    var gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    snake.forEach(function(dot) {
        var dotElement = document.createElement('div');
        dotElement.className = 'dot';
        dotElement.style.top = `${dot.top}px`;
        dotElement.style.left = `${dot.left}px`;
        gameBoard.appendChild(dotElement);
    });

    if (apple) {
        var appleElement = document.createElement('div');
        appleElement.className = 'dot';
        appleElement.style.top = `${apple.top}px`;
        appleElement.style.left = `${apple.left}px`;
        appleElement.style.background = '#f00';
        gameBoard.appendChild(appleElement);
    }
}

function gameOver() {
    clearInterval(gameInterval);
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('start-button').style.display = 'block';
}

function startGame() {
    snake = [{ top: 0, left: 0 }];
    direction = 'right';
    apple = null;
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('start-button').style.display = 'none';
    gameInterval = setInterval(function() {
        updateSnake();
        updateApple();
        draw();
    }, 200);
}

window.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowUp' && direction !== 'down') direction = 'up';
    if (e.key === 'ArrowDown' && direction !== 'up') direction = 'down';
    if (e.key === 'ArrowRight' && direction !== 'left') direction = 'right';
    if (e.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
});

document.getElementById('start-button').addEventListener('click', startGame);

startGame();
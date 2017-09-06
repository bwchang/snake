var canvas;
var ctx;
var interval;
var currentSpeed;
var timer;

var xVelocity; var yVelocity;
var gridSize; var tileCount;
var xApple; var yApple;
var xPos; var yPos;
var lastPos;

var trail = [];
var tail = 5;
var score;
// 0 is at start menu, 1 is in game, 2 is at end game menu
var gameStatus;
// 0 is win, 1 is lose, 2 is both lose
var winStatus;
MAX_SCORE = 5;
AI_START = 5;

var gameArea = {
    start : function() {
        resetGame();
    },
    clear : function() {
    	ctx.fillStyle = currentColor.bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function advanceGame() {
	timer += 1;
	xPos += xVelocity;
	yPos += yVelocity;
	if (xPos < 0 || xPos >= tileCount || yPos < 0 || yPos >= tileCount) {
		winStatus = 1;
		endGame();
		return;
	}

	updateCanvas();

	trail.push({x: xPos, y: yPos});
	while (trail.length > tail) {
		lastPos = trail.shift();
	}

	if (xApple == xPos && yApple == yPos) {
		incrementScore();
	}
	if (score == MAX_SCORE) {
		winStatus = 0;
		endGame();
	} else {
		ctx.fillStyle = currentColor.apple;
		ctx.fillRect(xApple * gridSize, yApple * gridSize, gridSize - 2, gridSize - 2);
		displayScore(score, 0);
	}
}

function keyDown(event) {
	switch(event.keyCode) {
		case 37:
			xVelocity = -1;
			yVelocity = 0;
			break;
		case 38:
			xVelocity = 0;
			yVelocity = -1;
			break;
		case 39:
			xVelocity = 1;
			yVelocity = 0;
			break;
		case 40:
			xVelocity = 0;
			yVelocity = 1;
			break;
		case 32:
			if (gameStatus != 1) {
				showMenu();
			}
			break;
		case 49: case 50: case 51: case 52: case 53:
			if (gameStatus == 2) {
				switchColor(event.keyCode - 49);
			}
			break;
		case 83:
			if (gameStatus == 0) {
				gameArea.start();
			}
			break;
		case 77:

	}
}

function endGame() {
	clearInterval(interval);
	reDraw(currentColor.snakeDark, currentColor.appleDark);
	gameStatus = 2;
}

function resetGame() {
	currentSpeed = 10;
	interval = setInterval(advanceGame, 1000/currentSpeed);
	timer = 0;
	xVelocity = 1;
	yVelocity = 0;
	gridSize = 20;
	tileCount = 25;
	xApple = 15;
	yApple = 15;
	xPos = 12;
	yPos = 12;
	trail = [];
	tail = 5;
	score = 0;
	gameStatus = 1;
}

function speedUp() {
	clearInterval(interval);
	currentSpeed = Math.min(25, currentSpeed + 1);
	interval = setInterval(advanceGame, 1000/currentSpeed);
}

function incrementScore() {
	tail++;
	score++;
	xApple = Math.floor(Math.random() * tileCount);
	yApple = Math.floor(Math.random() * tileCount);
	while (contains(xApple, yApple)) {
		xApple = Math.floor(Math.random() * tileCount);
		yApple = Math.floor(Math.random() * tileCount);
	}

	if (score % 3 == 0) {
		speedUp();
	}
}

function contains(x, y) {
	for (var i = 0; i < trail.length; i++) {
		if (trail[i].x == x && trail[i].y == y) {
			return true;
		}
	}
	return false;
}

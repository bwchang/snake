var canvas;
var ctx;
var interval;
var currentSpeed;

var xVelocity; var yVelocity;
var gridSize; var tileCount;
var xApple; var yApple;
var xPos; var yPos;
var lastPos;

var trail = [];
var tail = 5;
var score;
var inGame;

function showMenu() {
    canvas = document.getElementById("gc");
    ctx = canvas.getContext("2d");
	if (typeof currentColor == 'undefined') {
    	currentColor = colorSchemes[0];
    }
    ctx.fillStyle = currentColor.bg;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.font="20px Courier";
	ctx.fillStyle = "white";
	ctx.fillText("Choose Game Mode:", 150, 180);
	ctx.fillText("[S]: Singleplayer", 150, 250);
	ctx.fillText("[M]: Multiplayer against AI", 100, 290);
    // startGame();
    document.addEventListener("keydown", keyDown);
}

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
	xPos += xVelocity;
	yPos += yVelocity;
	if (xPos < 0 || xPos >= tileCount || yPos < 0 || yPos >= tileCount) {
		loseGame();
		return;
	}

	ctx.fillStyle = currentColor.bg;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = currentColor.snake;
	for (var i = 0; i < trail.length; i++) {
		ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);
		if (trail[i].x == xPos && trail[i].y == yPos) {
			loseGame();
			return;
		}
	}

	trail.push({x: xPos, y: yPos});
	while (trail.length > tail) {
		lastPos = trail.shift();
	}

	if (xApple == xPos && yApple == yPos) {
		incrementScore();
	}
	ctx.fillStyle = currentColor.apple;
	ctx.fillRect(xApple * gridSize, yApple * gridSize, gridSize - 2, gridSize - 2);

	ctx.font="20px Courier";
	ctx.fillStyle = "white";
	ctx.fillText(score, 470, 20);
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
			if (!inGame) {
				showMenu();
			}
			break;
		case 49: case 50: case 51: case 52: case 53:
			if (!inGame) {
				switchColor(event.keyCode - 49);
			}
			break;
		case 83:
			if (!inGame) {
				gameArea.start();
			}
			break;
		case 77:

	}
}

function loseGame() {
	clearInterval(interval);
	reDraw(currentColor.snakeDark, currentColor.appleDark);
	inGame = false;
}

function resetGame() {
	currentSpeed = 10;
	interval = setInterval(advanceGame, 1000/currentSpeed);
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
	inGame = true;
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

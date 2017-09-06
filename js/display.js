var colorSchemes = [
	{name: "Classic", bg: "black", snake: "lime", apple: "red", snakeDark: "#168716", appleDark: "#8B0000", ai: "Gold", aiDark: "#ceaf0a"},
	{name: "Trojan", bg: "#043163", snake: "LightSkyBlue", apple: "white", snakeDark: "#0092ed", appleDark: "DarkGray"},
	{name: "Gold", bg: "#350e5b", snake: "Gold", apple: "#f61192", snakeDark: "#ceaf0a", appleDark: "#882D61"},
	{name: "Sunset", bg: "DarkOrange", snake: "#915217", apple: "yellow", snakeDark: "#915217", appleDark: "GoldenRod"},
	{name: "Forest", bg: "#4f2d0e", snake: "DarkGreen", apple: "Salmon", snakeDark: "DarkGreen", appleDark: "Salmon"}
]
var currentColor;

COLORSCHEMEX = 180;
COLORSCHEMEY = 270;
COLORSCHEMEDY = 30;
SCORE1X = 470;
SCORE2X = 15;
SCOREY = 20;

function showMenu() {
    canvas = document.getElementById("gc");
    ctx = canvas.getContext("2d");
	if (typeof currentColor == 'undefined') {
    	currentColor = colorSchemes[0];
    }
    gameStatus = 0;
    ctx.fillStyle = currentColor.bg;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.font="20px Courier";
	ctx.fillStyle = "white";
	ctx.fillText("Choose Game Mode:", 150, 180);
	ctx.fillText("[S]: Singleplayer", 150, 250);
	ctx.fillText("[M]: Multiplayer against AI", 100, 290);
    document.addEventListener("keydown", keyDown);
}

function updateCanvas() {
	ctx.fillStyle = currentColor.bg;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = currentColor.snake;
	for (var i = 0; i < trail.length; i++) {
		ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);
		if (trail[i].x == xPos && trail[i].y == yPos) {
			winStatus = 1;
			endGame();
			return;
		}
	}
}

function switchColor(index) {
	currentColor = colorSchemes[index];
	reDraw(currentColor.snake, currentColor.apple);
}

function reDraw(snake, apple) {
	gameArea.clear();
	ctx.fillStyle = snake;
	for (var i = 0; i < trail.length; i++) {
		ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);
	}
	ctx.fillRect(lastPos.x * gridSize, lastPos.y * gridSize, gridSize - 2, gridSize - 2);
	// ctx.fillStyle = apple;
	// ctx.fillRect(xApple * gridSize, yApple * gridSize, gridSize - 2, gridSize - 2);
	ctx.font="20px Courier";
	ctx.fillStyle = "white";
	switch (winStatus) {
		case 0:
			text = "YOU WIN!";
			break;
		case 1:
			text = "YOU LOSE!";
			break;
		case 2:
			text = "GAME OVER!";
			break;
	}
	ctx.fillText(text, 200, 120);
	ctx.fillText("Press [SPACE] to play again.", 100, 150);
	displayColorOptions();
}

function displayColorOptions() {
	ctx.fillText("Choose a color scheme:", 130, 220);
	ctx.fillText("[1]: " + colorSchemes[0].name, COLORSCHEMEX, COLORSCHEMEY);
	ctx.fillText("[2]: " + colorSchemes[1].name, COLORSCHEMEX, COLORSCHEMEY + COLORSCHEMEDY);
	ctx.fillText("[3]: " + colorSchemes[2].name, COLORSCHEMEX, COLORSCHEMEY + COLORSCHEMEDY * 2);
	ctx.fillText("[4]: " + colorSchemes[3].name, COLORSCHEMEX, COLORSCHEMEY + COLORSCHEMEDY * 3);
	ctx.fillText("[5]: " + colorSchemes[4].name, COLORSCHEMEX, COLORSCHEMEY + COLORSCHEMEDY * 4);
}

function displayScore(score1, score2) {
	ctx.font="20px Courier";
	ctx.fillStyle = "white";
	ctx.fillText(score1, SCORE1X, SCOREY);
	ctx.fillText(score1, SCORE2X, SCOREY);
}

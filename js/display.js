var colorSchemes = [
	{name: "Classic", bg: "black", snake: "lime", apple: "red", snakeDark: "#168716", appleDark: "#8B0000"},
	{name: "Trojan", bg: "#043163", snake: "LightSkyBlue", apple: "white", snakeDark: "#0092ed", appleDark: "DarkGray"},
	{name: "Gold", bg: "#350e5b", snake: "Gold", apple: "#f61192", snakeDark: "#ceaf0a", appleDark: "#882D61"},
	{name: "Sunset", bg: "DarkOrange", snake: "#915217", apple: "yellow", snakeDark: "#915217", appleDark: "GoldenRod"},
	{name: "Forest", bg: "#4f2d0e", snake: "DarkGreen", apple: "Salmon", snakeDark: "DarkGreen", appleDark: "Salmon"}
]
var currentColor;

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
	ctx.fillStyle = apple;
	ctx.fillRect(xApple * gridSize, yApple * gridSize, gridSize - 2, gridSize - 2);
	ctx.font="20px Courier";
	ctx.fillStyle = "white";
	ctx.fillText("Score: " + score, 200, 120);
	ctx.fillText("Press [SPACE] to play again.", 100, 150);
	ctx.fillText("Choose a color scheme:", 130, 220);
	ctx.fillText("[1]: " + colorSchemes[0].name, 180, 270);
	ctx.fillText("[2]: " + colorSchemes[1].name, 180, 300);
	ctx.fillText("[3]: " + colorSchemes[2].name, 180, 330);
	ctx.fillText("[4]: " + colorSchemes[3].name, 180, 360);
	ctx.fillText("[5]: " + colorSchemes[4].name, 180, 390);
}

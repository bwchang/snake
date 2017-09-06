var aixVelocity; var aiyVelocity;
var aixPos; var aiyPos;
var aiLastPos;

var aiTrail = [];
var aiTail = 5;
var aiScore;

var aiPlayer = {
	reset : function() {
		aixVelocity = 0;
		aiyVelocity = 1;
		aixPos = 1;
		aiyPos = 0;
		aiTrail = [];
		aiTail = 5;
		aiScore = 0;
	}
}

function manhattan(x, y) {
	return Math.abs(x - xApple) + Math.abs(y - yApple);
}

function stateScore(x, y, dx, dy) {
	manhattan = manhattan();
}
class Paddle {
    constructor(canvas) {
        this.color = '#0095DD';
        this.width = 75;
        this.height = 10;
        this.x = (canvas.width - this.width) / 2;
    }
    drawPaddle(canvas, ctx, rightPressed, leftPressed) {
        if (rightPressed && this.x < canvas.width - this.width) {
            this.x -= 7;
        } else if (leftPressed && this.x > 0) {
            this.x += 7;
        }
        ctx.beginPath();
        ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}
//// CONSTANTS
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
//// INITIALIZATIONS
const ball1 = new Ball();
// BRICK VALUES 
const brickRowCount = 5;
const brickColumnCount = 3;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        // THIS CREATES THE BRICK'S AND THEIR POSITIONS
        const brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r] = new Brick(brickX, brickY, 1);
    }
}
const paddle = new Paddle(canvas)
/// / EVENT HANDLERS AND EVENT LISTENERS
let rightPressed = false
let leftPressed = false
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
function keyDownHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = true;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = false;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = false;
    }
}
// this generates the canvas and draws all the class objects onto it
function renderObjectsOnCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // generate ball and move it
    ball1.drawBall(ctx);
    ball1.move(canvas);
    // we need to draw each brick, every frame!
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                // draw brick if status == 1
                bricks[c][r].drawBrick(ctx);
                // detect collision of ball during drawing!
                bricks[c][r].detectCollision(ball1)
            }
        }
    }
    // update paddle position
    paddle.drawPaddle(canvas, ctx, leftPressed, rightPressed)
    // confirm loss state
    ball1.determineLoss(canvas, paddle)
}
setInterval(renderObjectsOnCanvas, 10);
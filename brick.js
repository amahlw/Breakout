class Brick {
    constructor(argX, argY, argStatus) {
        this.x = argX;
        this.y = argY;
        this.status = argStatus;
        this.color = '#0095DD';
        this.width = 75;
        this.height = 20;
    }
    // methods here
    // THIS DRAWS THE BRICKS AND APPLYS OFFSETS
    drawBrick(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    detectCollision(ball) {
        // detect collision of ball during drawing!
        if (ball.x > this.x && ball.x < this.x + this.width
            && ball.y > this.y
            && ball.y < this.y + this.height) {
            ball.dy = -(ball.dy);
            this.status = 0;
        }
    }
}
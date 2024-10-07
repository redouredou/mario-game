const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.8;

const marioImage = new Image();
marioImage.src = 'assets/mario.png';

const koopaImage = new Image();
koopaImage.src = 'assets/koopa.png';

const backgroundImage = new Image();
backgroundImage.src = 'assets/background.png';

class Player {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.x = 50;
        this.y = canvas.height - this.height - 100;
        this.dx = 0;
        this.dy = 0;
        this.gravity = 0.5;
        this.jumpStrength = -12;
        this.isJumping = false;
        this.isOnGround = false;
        this.speed = 5;
        this.sprite = marioImage;
    }

    draw() {
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        this.dy += this.gravity;

        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;

        if (this.y + this.height >= canvas.height - 50) {
            this.y = canvas.height - 50 - this.height;
            this.dy = 0;
            this.isOnGround = true;
            this.isJumping = false;
        } else {
            this.isOnGround = false;
        }

        this.draw();
    }

    jump() {
        if (this.isOnGround) {
            this.dy = this.jumpStrength;
            this.isJumping = true;
            this.isOnGround = false;
        }
    }

    moveLeft() {
        this.dx = -this.speed;
    }

    moveRight() {
        this.dx = this.speed;
    }

    stop() {
        this.dx = 0;
    }
}

class Enemy {
    constructor(x, y) {
        this.width = 50;
        this.height = 50;
        this.x = x;
        this.y = y;
        this.dx = 2;
        this.sprite = koopaImage;
        this.alive = true;
    }

    draw() {
        if (this.alive) {
            ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        }
    }

    update() {
        if (this.alive) {
            this.x += this.dx;

            if (this.x <= 0 || this.x + this.width >= canvas.width) {
                this.dx *= -1;
            }

            this.draw();
        }
    }
}

const player = new Player();
const enemies = [new Enemy(300, canvas.height - 100 - 50), new Enemy(600, canvas.height - 100 - 50)];

const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const jumpBtn = document.getElementById('jumpBtn');

leftBtn.addEventListener('touchstart', () => player.moveLeft());
leftBtn.addEventListener('touchend', () => player.stop());

rightBtn.addEventListener('touchstart', () => player.moveRight());
rightBtn.addEventListener('touchend', () => player.stop());

jumpBtn.addEventListener('touchstart', () => player.jump());

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

    player.update();
    enemies.forEach(enemy => enemy.update());

    requestAnimationFrame(gameLoop);
}

window.onload = () => {
    gameLoop();
};
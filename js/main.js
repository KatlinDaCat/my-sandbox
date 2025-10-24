import { getCanvas, loadImage, global, Sprite } from "./util.js";

const cvs = getCanvas('canvas');
const ctx = cvs.getContext('2d');

/* Setup */

// Controls

global.keys = {};

document.addEventListener('keydown', (e) => {
    global.keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    global.keys[e.key] = false;
});

function joystick() {
    let joyX = 0;
    let joyY = 0;

    if (global.keys.ArrowRight) {
        joyX += 1;
    }
    if (global.keys.ArrowLeft) {
        joyX -= 1;
    }

    if (global.keys.ArrowDown) {
        joyY += 1;
    }
    if (global.keys.ArrowUp) {
        joyY -= 1;
    }

    return { x: joyX, y: joyY };
}




/* Sprites */

const cat = new Sprite('./img/scratchcat.png');

cat.local.speedX = 0;
cat.local.speedY = 0;

cat.local.maxSpeed = 7;

cat._update_ = function(deltaTime) {
    this.local.speedX += joystick().x;

    if (this.local.speedX > this.local.maxSpeed) {
        this.local.speedX = this.local.maxSpeed;
    }
    if (this.local.speedX < this.local.maxSpeed * -1) {
        this.local.speedX = this.local.maxSpeed * -1;
    }

    this.local.speedY += joystick().y;

    if (this.local.speedY > this.local.maxSpeed) {
        this.local.speedY = this.local.maxSpeed;
    }
    if (this.local.speedY < this.local.maxSpeed * -1) {
        this.local.speedY = this.local.maxSpeed * -1;
    }

    this.x += this.local.speedX;
    this.y += this.local.speedY;
}







/* Other stuff I don't know how to describe */

function update(deltaTime) {
    for (const sprite of global.sprites) {
        sprite._update_(deltaTime);
    }
}

function draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (const sprite of global.sprites) {
        sprite.draw(ctx);
    }
}

let lastFrameTime = 0;

function gameLoop(currentTime) {
    const deltaTime = (currentTime - lastFrameTime) / 1000;
    lastFrameTime = currentTime;

    update(deltaTime);
    draw();

    window.requestAnimationFrame(gameLoop);
}

gameLoop();

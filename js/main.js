import { getCanvas, loadImage, global, Sprite } from "./util.js";

const cvs = getCanvas('canvas');
const ctx = cvs.getContext('2d');

/* Setup */

global.keys = {};

document.addEventListener('keydown', (e) => {
    global.keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    global.keys[e.key] = false;
});

/* Sprites */

const cat = new Sprite('./img/scratchcat.png');

cat._update_ = function(deltaTime) {
    let joyx = 0;
    let joyy = 0;

    if (global.keys.ArrowRight) {
        joyx += 1;
    }
    if (global.keys.ArrowLeft) {
        joyx -= 1;
    }

    if (global.keys.ArrowUp) {
        joyy += 1;
    }
    if (global.keys.ArrowDown) {
        joyy -= 1;
    }

    this.x += joyx;
    this.y += joyy;
}







/* Other stuff I don't know how to describe */

function update(deltaTime) {
    for (const sprite of global.sprites) {
        sprite._update_(deltaTime);
    }
}

function draw() {
    for (const sprite of global.sprites) {
        sprite.drawSprite();
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

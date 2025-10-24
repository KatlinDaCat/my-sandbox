import { getCanvas, loadImage, global, Sprite } from "./util";

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

/* Other stuff I don't know how to describe */

function update(deltaTime) {
    for (const sprite of global.sprites) {
        sprite._update_(deltaTime);
    }
}

function draw() {

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
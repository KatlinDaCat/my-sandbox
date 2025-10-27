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

const hotbar = new Sprite('./img/hotbar.png');

hotbar.local.slot = 1;



hotbar._update_ = function() {
    const nums = [ "1", "2", "3", "4", "5", "6", "7", "8", "9" ];

    for (const num of nums) {
        if (global.keys[num] == true) {
            this.local.slot = parseInt(num);
            break;
        }
    }

    this.x = (cvs.width / 2) - (this.images[this.currentImage].width / 2);
    this.y = cvs.height - 32;
}



const hotbarBox = new Sprite('./img/hotbar_box.svg');

hotbarBox._update_ = function() {
    
}







/* Other stuff I don't know how to describe */

function update(deltaTime) {
    for (const sprite of global.sprites) {
        sprite._update_(deltaTime);
    }
}

function draw() {
    cvs.width  = 640;
    cvs.height = 480;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (const sprite of global.sprites) {
        sprite.draw(ctx);
    }

    cvs.width  = window.innerWidth;
    cvs.height = cvs.width * ( 3 / 4 );
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

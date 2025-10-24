export function getCanvas(id) {
    const cvs = document.getElementById(id);
    if (cvs instanceof HTMLCanvasElement) {
        return cvs;
    } else {
        return null;
    }
}

export function loadImage(path) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
            resolve(img);
        };
    });
}

export const global = {};
global.sprites = [];

export class Sprite {
    x = 0;
    y = 0;

    images = [];
    currentImage = 0;

    _update_;
    _onclick_;

    local = {};

    constructor(...imgs) {
        this.addImages(imgs)
            .then(() => {
                global.sprites.push(this);
            })
    }

    async addImages(pathArray) {
        for (const path of pathArray) {
            const image = await loadImage(path);
            this.images.push(image);
        }
    }

    draw(ctx) {
        ctx.drawImage(this.images[this.currentImage], this.x, this.y);
    }
}

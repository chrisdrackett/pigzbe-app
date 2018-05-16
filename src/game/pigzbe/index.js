import {Sprite} from 'pixi.js';
const {min, max} = Math;

export default class Pigzbe {
    constructor({x, y, maxX, maxY, mapW}) {
        this.x = x;
        this.y = y;
        this.maxX = maxX;
        this.maxY = maxY;
        this.mapW = mapW;

        this.sprite = Sprite.from('pig');
        this.sprite.anchor.set(0.5);
        this.sprite.position.set(x, y);
        this.w = this.sprite.width;
        this.h = this.sprite.height;
        this.hw = this.w / 2;
        this.hh = this.h / 2;

        this.hitRect = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        };
    }

    update(vec, delta) {
        this.x += vec.x * delta;
        this.y += vec.y * delta;

        if (this.maxX) {
            this.x = max(this.hw, min(this.x, this.maxX - this.hw));
        }

        if (this.maxY) {
            this.y = max(this.hh, min(this.y, this.maxY - this.hh));
        }

        this.sprite.position.set(this.x, this.y);

        this.rx = this.x % this.mapW;
        this.hitRect.top = this.y - 20;
        this.hitRect.bottom = this.y + 20;
        this.hitRect.left = this.rx - 30;
        this.hitRect.right = this.rx + 30;
    }
}

import lerp from 'usfl/math/lerp';
import {Container, Sprite} from 'pixi.js';
const {
    abs,
    min,
    max
} = Math;

export default class Pigzbe {
    constructor({x, y, maxX, maxY, mapW}) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.ox = 0;
        this.oy = 0;
        this.maxX = maxX;
        this.maxY = maxY;
        this.mapW = mapW;

        this.sprite = new Container();
        this.sprite.position.set(x, y);
        this.w = 128;
        this.h = 128;
        this.hw = this.w / 2;
        this.hh = this.h / 2;

        const container = new Container();
        this.sprite.addChild(container);
        container.position.set(0 - this.hw, 0 - this.hh);

        const feet = Sprite.from('pigzbe_feet');
        container.addChild(feet);

        const bg = Sprite.from('pigzbe_bodybackground');
        container.addChild(bg);

        const body = Sprite.from('pigzbe_body');
        container.addChild(body);

        const eyes = Sprite.from('pigzbe_eyes');
        container.addChild(eyes);

        const nose = Sprite.from('pigzbe_nose');
        container.addChild(nose);

        this.feet = feet;
        this.bg = bg;
        this.eyes = eyes;
        this.nose = nose;

        this.hitRect = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        };
    }

    update(vec, delta) {
        this.dx = vec.x * delta;
        this.dy = vec.y * delta;
        this.x += this.dx;
        this.y += this.dy;

        if (this.maxX) {
            this.x = max(this.hw, min(this.x, this.maxX - this.hw));
        }

        if (this.maxY) {
            this.y = max(this.hh, min(this.y, this.maxY - this.hh));
        }

        // this.sprite.position.set(round(this.x), round(this.y));
        this.sprite.position.set(this.x, this.y);

        this.rx = this.x;
        while (this.rx < 0) {
            this.rx += this.mapW;
        }
        while (this.rx > this.mapW) {
            this.rx -= this.mapW;
        }

        this.hitRect.top = this.y - 20;
        this.hitRect.bottom = this.y + 20;
        this.hitRect.left = this.rx - 30;
        this.hitRect.right = this.rx + 30;

        const tx = max(-4, min(this.dx, 4));
        const ty = max(-4, min(this.dy, 4));

        this.ox = lerp(this.ox, 0 - tx, 0.2);
        this.oy = lerp(this.oy, 0 - ty, 0.2);

        if (abs(this.ox) < 0.01) {
            this.ox = 0;
        }

        if (abs(this.oy) < 0.01) {
            this.oy = 0;
        }

        this.bg.position.x = this.ox;
        this.bg.position.y = this.oy;

        this.feet.position.x = this.ox * -0.5;
        this.feet.position.y = this.oy * 0.5;

        this.eyes.position.x = this.ox * -0.5;
        this.eyes.position.y = this.oy * -0.5;

        this.nose.position.x = this.ox * -1;
        this.nose.position.y = this.oy * -1;
    }
}

import {Container} from 'pixi.js';

export default class LayerWrapper {
    constructor(a, b, w) {
        this.create(a, b, w);
    }

    create(a, b, w) {
        this.container = new Container();
        this.container.addChild(a);
        this.container.addChild(b);
        this.a = a;
        this.b = b;
        this.w = w || a.width;
    }

    update(camera) {
        this.container.position.set(0 - camera.x, 0 - camera.y);

        const aX = this.a.position.x;
        const bX = this.b.position.x;

        if (aX > camera.x && bX > camera.x) {
            const toMove = aX > bX ? this.a : this.b;
            toMove.position.x = aX < bX ? aX - this.w : bX - this.w;
        }

        if (aX + this.w < camera.x + camera.w && bX + this.w < camera.x + camera.w) {
            const toMove = aX < bX ? this.a : this.b;
            toMove.position.x = aX > bX ? aX + this.w : bX + this.w;
        }
    }
}

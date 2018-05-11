import {Container, Sprite, Texture} from 'pixi.js';
import linkedList from 'usfl/linked-list';
import objectPool from 'usfl/object-pool';
import distanceSQ from 'usfl/math/distance-sq';
import Text from '../utils/text';

export default class Wollo {
    constructor() {
        const texture = Texture.from('wollo.png');

        this.list = linkedList();
        this.sprites = linkedList();
        this.pool = objectPool(() => {
            const s = new Sprite(texture);
            const t = new Text('N');
            s.t = t;
            t.position.set(0, 0);
            s.addChild(t);
            return s;
        });
        this.container = new Container();

        this.create();
    }

    create() {
        // TODO: how to decide positions
        // TODO: store positions and create on demand?

        for (let i = 0; i < 40; i++) {
            const token = this.pool.get();
            this.list.add(token);
            token.t.text = String(i);
            token.anchor.set(0.5);
            token.position.set(-4000 + 200 * i, 300 + Math.sin(i) * 100);
            this.container.addChild(token);
        }
    }

    removeToken(token) {
        this.list.remove(token);
        this.container.removeChild(token);
        this.pool.dispose(token);
    }

    update(dx = 0, dy = 0, center, containerY) {
        if (dx === 0) {
            return;
        }
        let token = this.list.first;
        while (token) {
            const next = token.next;
            token.position.set(token.position.x - dx, token.position.y - dy);
            const distSq = distanceSQ(center.x, center.y - containerY, token.position.x, token.position.y);
            const hitRadius = 60;
            const hitRadiusSq = hitRadius * hitRadius;
            if (distSq < hitRadiusSq) {
                this.removeToken(token);
            }
            token = next;
        }
    }
}

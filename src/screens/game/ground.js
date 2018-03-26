import randomChoice from 'usfl/array/random-choice';
import * as PIXI from 'pixi.js';
import linkedList from 'usfl/linked-list';
import objectPool from 'usfl/object-pool';
import Text from './text';

let uid = 0;

const sections = [{
    index: 0,
    name: 'ground_high.png',
    nextAllowed: [0, 2],
    prevAllowed: [0, 3]
}, {
    index: 1,
    name: 'ground_low.png',
    nextAllowed: [1, 3],
    prevAllowed: [1, 2]
}, {
    index: 2,
    name: 'ground_slope_down.png',
    nextAllowed: [1, 3],
    prevAllowed: [0, 3]
}, {
    index: 3,
    name: 'ground_slope_up.png',
    nextAllowed: [0, 2],
    prevAllowed: [1, 2]
}];

export default class Ground {
    constructor() {
        this.sections = sections.map(s => Object.assign({}, s, {
            texture: PIXI.Texture.from(s.name),
            sprite: null
        }));

        this.list = linkedList();
        this.sprites = linkedList();
        // this.pool = objectPool(() => new PIXI.Sprite(this.sections[0].texture));
        this.pool = objectPool(() => {
            const s = new PIXI.Sprite(this.sections[0].texture);
            const t = new Text('N');
            s.t = t;
            t.position.set(40, 230);
            s.addChild(t);
            return s;
        });
        this.container = new PIXI.Container();
    }

    randomSection(from) {
        if (!from) {
            return Object.assign({uid: uid++}, randomChoice(this.sections));
        }
        return Object.assign({uid: uid++}, this.sections[randomChoice(from)]);
    }

    getSection(section, from) {
        if (!section) {
            return this.randomSection(from);
        }
        return section;
    }

    addSection(direction = 1) {
        const sprite = this.pool.get();
        this.container.addChild(sprite);

        let section = null;
        let x = 0;

        if (!this.sprites.first) {
            this.sprites.add(sprite);
            section = this.randomSection();
            this.list.add(section);
            sprite.texture = section.texture;
        } else if (direction > 0) {
            const last = this.sprites.last;
            if (last.section.next) {
                section = last.section.next;
            } else {
                section = this.randomSection(last.section.nextAllowed);
                this.list.add(section);
            }
            sprite.texture = section.texture;
            x = last.x + last.width;
            this.sprites.add(sprite);
        } else {
            const first = this.sprites.first;
            if (first.section.prev) {
                section = first.section.prev;
            } else {
                section = this.randomSection(first.section.prevAllowed);
                this.list.insertBefore(section, this.list.first);
            }
            sprite.texture = section.texture;
            x = first.x - sprite.width;
            this.sprites.insertBefore(sprite, first);
        }

        sprite.section = section;
        sprite.t.text = section.uid;
        sprite.position.set(x, 0);

        return sprite;
    }

    removeSection(direction = 1) {
        // console.log('removeSection', this.container.children.length);
        const spriteToRemove = direction > 0 ? this.sprites.first : this.sprites.last;
        const sprite = this.sprites.remove(spriteToRemove);
        this.container.removeChild(sprite);
        this.pool.dispose(sprite);
    }

    addInitialSections(vW) {
        this.addSection();

        while (this.sprites.last.x + this.sprites.last.width < vW) {
            this.addSection();
        }
    }

    update(dx = 0, dy = 0, vW = 0) {
        if (dx === 0) {
            return;
        }
        let sprite = this.sprites.first;
        while (sprite) {
            sprite.position.set(sprite.position.x - dx, sprite.position.y - dy);
            sprite = sprite.next;
        }

        const direction = Math.sign(dx);

        if (direction > 0) {
            if (this.sprites.last.x + this.sprites.last.width < vW) {
                this.addSection(direction);
            }

            if (this.sprites.first.x + this.sprites.first.width < 0) {
                this.removeSection(direction);
            }
        } else {
            if (this.sprites.first.x > 0) {
                this.addSection(direction);
            }

            if (this.sprites.last.x > vW) {
                this.removeSection(direction);
            }
        }

    }
}

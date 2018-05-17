import ObjectWrapper from '../../utils/object-wrapper';

const {sin, cos} = Math;

const WATERFALL_ANIM = 'waterfall_anim';
const GROUND_ANIM = 'ground_anim';
const OVERGROUND_DECORATION_01 = 'overground_decoration_01';
const OVERGROUND_DECORATION_02 = 'overground_decoration_02';
const CHESTS = 'chests';
const SECRET = 'secret';

export default class Animations {
    constructor(map) {
        this.create(map);
    }

    create(map) {
        const layers = [WATERFALL_ANIM, GROUND_ANIM, OVERGROUND_DECORATION_01, OVERGROUND_DECORATION_02, CHESTS, SECRET];
        const objects = layers.reduce((arr, name) => arr.concat(map.layer[name].objects), []);
        const containers = layers.reduce((arr, name) => arr.concat(map.layer[name].container), []);
        this.wrapper = new ObjectWrapper(objects, containers, map.width);
        this.container = this.wrapper.container;

        this.counter = 0;
    }

    processItem = (visible, item) => {
        this.counter += 0.001;
        if (visible) {
            switch (item.layer) {
                case CHESTS:
                    item.sprite.rotation = sin(this.counter) * 0.2;
                    item.sprite.position.y = item.sprite.height / 2 + cos(this.counter) * 6;
                    break;
                default:

            }
        }
        if (typeof item.sprite.playing === 'undefined') {
            return;
        }
        if (visible) {
            if (!item.sprite.playing) {
                item.sprite.play();
            }
        } else {
            if (item.sprite.playing) {
                item.sprite.stop();
            }
        }
    }

    update(camera) {
        this.wrapper.update(camera, this.processItem);
    }
}

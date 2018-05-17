import ObjectWrapper from '../../utils/object-wrapper';

const {sin, cos} = Math;

export const WATERFALL_ANIM = 'waterfall_anim';
export const GROUND_ANIM = 'ground_anim';
export const OVERGROUND_DECORATION_01 = 'overground_decoration_01';
export const OVERGROUND_DECORATION_02 = 'overground_decoration_02';
export const CHESTS = 'chests';
export const SECRET = 'secret';

export default class Animations {
    constructor(map) {
        this.create(map);
    }

    create(map) {
        const layers = [WATERFALL_ANIM, GROUND_ANIM, OVERGROUND_DECORATION_01, OVERGROUND_DECORATION_02, CHESTS, SECRET];
        const objects = layers.reduce((arr, name) => arr.concat(map.layer[name].objects), []);
        this.wrapper = new ObjectWrapper(objects, map.width);

        this.containers = layers.reduce((ob, name) => {
            ob[name] = map.layer[name].container;
            return ob;
        }, {});

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
                case GROUND_ANIM:
                    item.sprite.position.y = item.sprite.position.y + 0.5;
                    // console.log('GROUND_ANIM', item.sprite.position.y);
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

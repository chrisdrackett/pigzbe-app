import ObjectWrapper from '../../utils/object-wrapper';

export default class Animations {
    constructor(map) {
        this.create(map);
    }

    create(map) {
        const layers = ['waterfall_anim', 'ground_anim', 'overground_decoration_01', 'overground_decoration_02', 'chests', 'secret'];
        const objects = layers.reduce((arr, name) => arr.concat(map.layer[name].objects), []);
        const containers = layers.reduce((arr, name) => arr.concat(map.layer[name].container), []);
        this.wrapper = new ObjectWrapper(objects, containers, map.width);
        this.container = this.wrapper.container;
    }

    processItem = (visible, item) => {
        // console.log('item', item.layer);
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

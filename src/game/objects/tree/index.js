import ObjectWrapper from '../../utils/object-wrapper';

export default class Tree {
    constructor(map) {
        this.create(map);
    }

    create(map) {
        const objects = map.layer.tree.objects;
        this.wrapper = new ObjectWrapper(objects, map.width);
        this.container = map.layer.tree.container;
        map.layer.tree.objects[0].sprite.stop();
    }

    update(camera) {
        this.wrapper.update(camera);
    }
}

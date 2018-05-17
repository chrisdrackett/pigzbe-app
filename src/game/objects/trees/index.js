import ObjectWrapper from '../../utils/object-wrapper';
import intersects from '../../utils/intersects';

export default class Trees {
    constructor(map) {
        this.create(map);
    }

    create(map) {
        const objects = map.layer.trees.objects;

        this.wrapper = new ObjectWrapper(objects, map.width);
        this.container = map.layer.trees.container;

        this.counter = 0;
    }

    collide = (visible, tree) => {
        this.counter += 0.01;

        if (visible) {
            const hit = intersects(tree, this.hitRect);
            if (hit) {
                // tree.sprite.tint = 0xff0000;
            }
        }
    }

    update(camera, hitRect) {
        this.hitRect = hitRect;
        this.wrapper.update(camera, this.collide);
    }
}

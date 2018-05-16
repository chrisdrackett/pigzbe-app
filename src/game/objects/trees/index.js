import ObjectWrapper from '../../utils/object-wrapper';
import intersects from '../../utils/intersects';

export default class Trees {
    constructor(map) {
        this.create(map);
    }

    create(map) {
        const objects = map.layer.trees.objects;
        const containers = [map.layer.trees.container];
        console.log('objects', objects);
        this.wrapper = new ObjectWrapper(objects, containers, map.width);
        this.container = this.wrapper.container;
    }

    collide = (visible, tree) => {
        if (visible) {
            // tree.top = tree.sprite.y - this.wrapper.container.position.y;
            // tree.bottom = tree.top + tree.height;
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

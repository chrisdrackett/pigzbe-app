import {Container} from 'pixi.js';
import linkedList from 'usfl/linked-list';

export default class ObjectWrapper {
    constructor(objects, containers, w) {
        this.create(objects, containers, w);
    }

    create(objects, containers, w) {
        this.container = new Container();
        containers.forEach(c => this.container.addChild(c));
        this.items = linkedList(objects);
        this.w = w;
    }

    update(camera, processItem) {
        this.container.position.y = 0 - camera.y;

        const isWrapping = camera.right > this.w;

        let item = this.items.first;
        while (item) {
            const next = item.next;

            const displayObject = item.container || item.sprite;

            const visibleL = item.x + item.width > camera.left;

            let visible = visibleL && item.x - item.width < camera.right;

            if (isWrapping) {
                visible = visibleL || item.x - item.width < camera.right - this.w;
                visible = true;
            }

            displayObject.visible = visible;

            if (visible) {
                displayObject.position.x = 0 - camera.left + item.x;
                // displayObject.position.y = 0 - camera.y + item.y;

                if (isWrapping && !visibleL) {
                    displayObject.position.x = 0 - camera.left + this.w + item.x;
                }
            }

            if (processItem) {
                processItem(visible, item, this.items);
            }

            item = next;
        }
    }
}

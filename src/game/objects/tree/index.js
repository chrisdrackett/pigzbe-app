import ObjectWrapper from '../../utils/object-wrapper';
import distanceSq from 'usfl/math/distance-sq';
// import nearest from 'usfl/array/nearest';

const DIST = 180;
const DIST_SQ = DIST * DIST;

export default class Tree {
    constructor(map) {
        this.create(map);
    }

    create(map) {
        const layer = map.layer.tree;
        const objects = layer.objects;
        const object = layer.objects[0];

        this.wrapper = new ObjectWrapper(objects, map.width);
        this.container = layer.container;

        this.object = object;
        this.treeContainer = object.container;
        this.treeSprite = object.sprite;
        this.treeSprite.stop();
        this.treeSprite.onFrameChange = this.onUpdate.bind(this);
        // this.targetFrames = [0, 40, 80, 120, 160];
        this.targetFrame = 0;
    }

    onUpdate(frame) {
        if (frame >= this.targetFrame) {
            this.treeSprite.stop();
        }
    }

    update(camera, coinsCollected, totalCoins) {
        this.wrapper.update(camera);

        const cx = this.object.x + this.object.width / 2;
        const cy = this.object.y + this.object.height / 2;

        if (this.treeContainer.visible) {
            const distSq = distanceSq(cx, cy, camera.cx, camera.cy);
            if (distSq < DIST_SQ) {
                const progress = coinsCollected / totalCoins;
                const max = this.treeSprite.totalFrames - 1;
                const targetFrame = Math.min(max, Math.floor(this.treeSprite.totalFrames * progress));
                // console.log('neaerst', nearest(targetFrame, this.targetFrames));

                if (targetFrame !== this.targetFrame) {
                    this.targetFrame = targetFrame;
                    this.treeSprite.play();
                }
            }
        }

    }
}

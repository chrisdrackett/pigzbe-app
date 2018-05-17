import {Container, Sprite} from 'pixi.js';
import LayerWrapper from '../../utils/layer-wrapper';

export default class Level {
    constructor(map, app) {
        this.create(map, app);
    }

    create(map) {
        const [sunA] = map.layer.sun.container.children;
        const sunB = new Sprite(sunA.texture);
        sunB.position.copy(sunA.position);
        // console.log('sunA', sunA);
        const groundA = map.layer.ground.container;
        const groundB = new Sprite(groundA.texture);

        const levelA = new Container();
        levelA.addChild(sunA);
        levelA.addChild(groundA);

        const levelB = new Container();
        // sunB.tint = 0xff0000;
        levelB.addChild(sunB);
        levelB.addChild(groundB);

        this.wrapper = new LayerWrapper(levelA, levelB, map.width);
        this.container = this.wrapper.container;
    }

    update(camera) {
        this.wrapper.update(camera);
    }
}

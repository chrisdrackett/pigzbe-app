import * as PIXI from 'pixi.js';
import roundTo from 'usfl/math/round-to';
// import SoundPlayer from './sound-player';
import World from './world';
import Text from '../utils/text';

export default class Demo {
    constructor(app, dims) {
        this.dims = dims;

        this.createWorld(app, dims);
    }

    createWorld(app, dims) {
        const {center} = dims;

        const world = new World(app, dims);
        app.stage.addChild(world.container);

        const text = new Text('Game!');
        text.position.set(20, 40);
        app.stage.addChild(text);

        const pig = PIXI.Sprite.from('pig.png');
        pig.position.set(center.x - pig.width / 2, center.y - pig.height / 2);
        app.stage.addChild(pig);
        pig.alpha = 0.5;

        const arrow = new PIXI.Container();
        const arrowGfx = PIXI.Sprite.from('arrow.png');
        arrow.addChild(arrowGfx);
        app.stage.addChild(arrow);
        arrowGfx.position.set(0 - arrow.width / 2, 0 - arrow.height / 2);
        arrow.position.set(center.x, center.y);

        this.app = app;
        this.world = world;
        this.text = text;
        this.pig = pig;
        this.arrow = arrow;
    }

    update(delta, vec, touchOrigin) {
        // console.log('update', delta, vec.x, vec.y);

        this.world.update(delta, vec);

        this.arrow.position.set(touchOrigin.x, touchOrigin.y);
        this.arrow.rotation = vec.rotation;
        const rendererType = (this.app.renderer instanceof PIXI.CanvasRenderer) ? 'canvas' : 'webgl';
        const rendererRes = this.app.renderer.resolution;
        const dpr = window.devicePixelRatio || 1;
        const {width, height} = this.app.renderer;
        this.text.text = `${width}/${height}\n${rendererType}\nres: ${rendererRes} dpr: ${dpr}\nangle: ${roundTo(vec.rotation, 1)}\nx/y: ${roundTo(vec.x)}/${roundTo(vec.y)}`;
    }

    pointerDown(point) {
        console.log('pointerDown', point);
    }

    pointerUp(point) {
        console.log('pointerUp', point);
    }

    resize(dims) {
        this.dims = dims;
        this.world.resize(dims);

        const {center} = this.dims;
        this.pig.position.set(center.x - this.pig.width / 2, center.y - this.pig.height / 2);
    }
}

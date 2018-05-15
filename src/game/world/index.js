import * as PIXI from 'pixi.js';
import roundTo from 'usfl/math/round-to';
// import SoundPlayer from './sound-player';
import Map from '../map';
import fps from 'usfl/fps';
fps.auto();

export default class World {
    constructor(app, dims) {
        this.dims = dims;

        this.createWorld(app, dims);
    }

    createWorld(app, dims) {
        const {center} = dims;

        const map = new Map(app, dims);
        app.stage.addChild(map.container);

        const arrow = new PIXI.Container();
        const arrowGfx = PIXI.Sprite.from('arrow');
        arrow.addChild(arrowGfx);
        app.stage.addChild(arrow);
        arrowGfx.position.set(0 - arrow.width / 2, 0 - arrow.height / 2);
        arrow.position.set(center.x, center.y);

        this.app = app;
        this.map = map;
        this.arrow = arrow;
    }

    devInfo(vec) {
        const rendererType = (this.app.renderer instanceof PIXI.CanvasRenderer) ? 'canvas' : 'webgl';
        const rendererRes = this.app.renderer.resolution;
        const dpr = window.devicePixelRatio || 1;
        const {width, height} = this.app.renderer;
        const info = `${width}/${height}\n${rendererType} res: ${rendererRes} dpr: ${dpr}\nangle: ${roundTo(vec.rotation, 1)}\nx/y: ${roundTo(vec.x)}/${roundTo(vec.y)}`;
        fps.log(info.replace(/\n/g, '<br>'));
    }

    update(delta, vec, touchOrigin) {
        this.map.update(delta, vec);

        this.arrow.position.set(touchOrigin.x, touchOrigin.y);
        this.arrow.rotation = vec.rotation;

        this.devInfo(vec);
    }

    resize(dims) {
        this.dims = dims;
        this.map.resize(dims);
    }
}

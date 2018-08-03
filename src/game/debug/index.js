import * as PIXI from 'pixi.js';
import roundTo from 'usfl/math/round-to';
import fps from 'usfl/fps';

export default class Debug {
    constructor(app, world) {
        this.create(app, world);

        fps.style({left: '5px', top: '20px'});
        fps.auto();
    }

    create(app, world) {
        const arrow = new PIXI.Container();
        const arrowGfx = PIXI.Sprite.from('arrow');
        arrow.addChild(arrowGfx);
        app.stage.addChild(arrow);
        arrowGfx.position.set(0 - arrow.width / 2, 0 - arrow.height / 2);

        this.app = app;
        this.world = world;
        this.arrow = arrow;
    }

    devInfo(vec) {
        const rendererType = (this.app.renderer instanceof PIXI.CanvasRenderer) ? 'canvas' : 'webgl';
        const rendererRes = this.app.renderer.resolution;
        const dpr = window.devicePixelRatio || 1;
        const {width, height} = this.app.renderer;
        const info = `
            ${width}/${height}
            ${rendererType} res: ${rendererRes} dpr: ${dpr}
            angle: ${roundTo(vec.rotation, 1)}
            x/y: ${roundTo(vec.x)}/${roundTo(vec.y)}
            camera: ${Math.round(this.world.camera.left)} ${Math.round(this.world.camera.right)}
        `;
        fps.log(info.replace(/\n/g, '<br>'));
    }

    update(vec, touchOrigin, isDown) {
        this.arrow.position.set(touchOrigin.x, touchOrigin.y);
        this.arrow.rotation = vec.rotation;
        this.arrow.visible = isDown;

        this.devInfo(vec);
    }

    resize(dims) {
        this.dims = dims;
    }
}

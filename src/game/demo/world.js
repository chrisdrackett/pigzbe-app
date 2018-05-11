import * as PIXI from 'pixi.js';
import Ground from './ground';
import Wollo from './wollo';

const addTilingSprite = (id, w, h) => {
    const texture = PIXI.Texture.from(id);
    const sprite = new PIXI.extras.TilingSprite(texture, w || texture.width, h || texture.height);
    return sprite;
};

const vertSpace = 150;

export default class World {
    constructor(app, dims) {
        this.dims = dims;

        this.createWorld(app, dims);
    }

    createWorld(app, dims) {
        const {vW, vH} = dims;

        const container = new PIXI.Container();
        app.stage.addChild(container);

        const hillsBack = addTilingSprite('hillsBack', vW);
        hillsBack.position.set(0, vH - hillsBack.height + vertSpace - 120);
        container.addChild(hillsBack);

        const hillsFront = addTilingSprite('hillsFront', vW);
        hillsFront.position.set(0, vH - hillsFront.height + vertSpace - 80);
        container.addChild(hillsFront);

        const ground = new Ground();
        ground.container.position.set(0, vH - 400 + vertSpace);
        container.addChild(ground.container);
        ground.addInitialSections(vW);

        const clouds = addTilingSprite('clouds', vW);
        clouds.position.set(0, 80 - vertSpace);
        container.addChild(clouds);
        clouds.alpha = 0.5;

        const cloudsLow = addTilingSprite('clouds', vW);
        cloudsLow.position.set(0, 160 - vertSpace);
        container.addChild(cloudsLow);

        const wollo = new Wollo();
        container.addChild(wollo.container);

        this.app = app;
        this.container = container;
        this.hillsBack = hillsBack;
        this.hillsFront = hillsFront;
        this.ground = ground;
        this.clouds = clouds;
        this.cloudsLow = cloudsLow;
        this.wollo = wollo;
    }

    positionWorld() {
        const {vW, vH} = this.dims;

        this.hillsBack.width = vW;
        this.hillsFront.width = vW;
        this.clouds.width = vW;
        this.cloudsLow.width = vW;

        this.ground.fillSections(vW);

        this.hillsBack.position.set(0, vH - this.hillsBack.height + vertSpace - 120);
        this.hillsFront.position.set(0, vH - this.hillsFront.height + vertSpace - 80);
        this.ground.container.position.set(0, vH - 400 + vertSpace);
        this.clouds.position.set(0, 80 - vertSpace);
        this.cloudsLow.position.set(0, 160 - vertSpace);
    }

    update(delta, vec) {
        // console.log('update', delta, vec.x, vec.y);
        const {center, vW} = this.dims;

        this.clouds.tilePosition.x -= 0.032 * vec.x * delta;
        this.cloudsLow.tilePosition.x -= 0.064 * vec.x * delta;
        this.hillsBack.tilePosition.x -= 0.128 * vec.x * delta;
        this.hillsFront.tilePosition.x -= 0.64 * vec.x * delta;
        this.ground.update(2 * vec.x * delta, 0, vW);
        this.wollo.update(2 * vec.x * delta, 0, center, this.container.position.y);

        this.container.position.y -= vec.y * delta;
        if (this.container.position.y < 0 - vertSpace) {
            this.container.position.y = 0 - vertSpace;
        }
        if (this.container.position.y > vertSpace) {
            this.container.position.y = vertSpace;
        }
    }

    resize(dims) {
        this.dims = dims;
        this.positionWorld();
    }
}

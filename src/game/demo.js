import * as PIXI from 'pixi.js';
import roundTo from 'usfl/math/round-to';
// import SoundPlayer from './sound-player';
import Ground from './ground';
import Text from './text';

const addTilingSprite = (id, w, h) => {
    const texture = PIXI.Texture.from(id);
    const sprite = new PIXI.extras.TilingSprite(texture, w || texture.width, h || texture.height);
    return sprite;
};

const vertSpace = 150;

export default class Demo {
    constructor(app, dims) {
        this.dims = dims;

        this.createWorld(app, dims);
    }

    createWorld(app, dims) {
        const {vW, vH, center} = dims;

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

        const text = new Text('Game!');
        text.position.set(20, 40);
        app.stage.addChild(text);

        const clouds = addTilingSprite('clouds', vW);
        clouds.position.set(0, 80 - vertSpace);
        container.addChild(clouds);
        clouds.alpha = 0.5;

        const cloudsLow = addTilingSprite('clouds', vW);
        cloudsLow.position.set(0, 160 - vertSpace);
        container.addChild(cloudsLow);

        const pig = PIXI.Sprite.from('pig.png');
        pig.position.set(center.x - pig.width / 2, center.y - pig.height / 2);
        app.stage.addChild(pig);

        const arrow = new PIXI.Container();
        const arrowGfx = PIXI.Sprite.from('arrow.png');
        arrow.addChild(arrowGfx);
        app.stage.addChild(arrow);
        arrowGfx.position.set(0 - arrow.width / 2, 0 - arrow.height / 2);
        arrow.position.set(center.x, center.y);

        this.container = container;
        this.hillsBack = hillsBack;
        this.hillsFront = hillsFront;
        this.ground = ground;
        this.text = text;
        this.clouds = clouds;
        this.cloudsLow = cloudsLow;
        this.pig = pig;
        this.arrow = arrow;
    }

    positionWorld() {
        const {vW, vH, center} = this.dims;

        this.pig.position.set(center.x - this.pig.width / 2, center.y - this.pig.height / 2);

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
        const {vW, center} = this.dims;

        this.clouds.tilePosition.x -= 0.032 * vec.x * delta;
        this.cloudsLow.tilePosition.x -= 0.064 * vec.x * delta;
        this.hillsBack.tilePosition.x -= 0.128 * vec.x * delta;
        this.hillsFront.tilePosition.x -= 0.64 * vec.x * delta;
        this.ground.update(2 * vec.x * delta, 0, vW);

        this.container.position.y -= vec.y * delta;
        if (this.container.position.y < 0 - vertSpace) {
            this.container.position.y = 0 - vertSpace;
        }
        if (this.container.position.y > vertSpace) {
            this.container.position.y = vertSpace;
        }

        this.arrow.position.set(center.x, center.y);
        this.arrow.rotation = vec.rotation;
        this.text.text = `angle: ${roundTo(vec.rotation, 1)}\nx/y: ${roundTo(vec.x)}/${roundTo(vec.y)}`;
    }

    pointerDown(point) {
        console.log('pointerDown', point);
    }

    pointerUp(point) {
        console.log('pointerUp', point);
    }

    resize(dims) {
        this.dims = dims;
        this.positionWorld();
    }
}

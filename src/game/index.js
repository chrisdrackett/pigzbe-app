import * as PIXI from 'pixi.js';
import Demo from './demo';
import {registerFont} from './assets/fonts';
import angle from 'usfl/math/angle';
import distance from 'usfl/math/distance';
// import roundTo from 'usfl/math/round-to';
import SoundPlayer from './utils/sound-player';
import images from './assets/images';
import sounds from './assets/sounds';

// import as js ob
const spritesJSON = require('./assets/images/sprites.json');

global.PIXI = PIXI;

export default class Game {
    constructor(el) {
        this.isDown = false;

        const {width, height} = el.getBoundingClientRect();
        const resolution = window.devicePixelRatio || 1;

        const app = new PIXI.Application({
            backgroundColor: 0xE0F0FA,
            autoStart: false,
            resolution,
            width: width,
            height: height
        });
        this.app = app;
        this.el = el;

        this.el.appendChild(app.view);
        app.view.style.width = '100%';
        app.view.style.height = '100%';
        app.view.style.cursor = 'pointer';

        app.stage.interactive = true;
        app.stage.hitArea = new PIXI.Rectangle(0, 0, width, height);
        app.stage.on('pointerdown', event => {
            app.view.style.cursor = 'all-scroll';
            this.touchDown(event.data.global);
        });
        app.stage.on('pointermove', event => this.touchMove(event.data.global));
        app.stage.on('pointerup', event => {
            app.view.style.cursor = 'pointer';
            this.touchUp(event.data.global);
        });

        window.addEventListener('resize', () => this.resize());

        this.dims = this.updateDims();

        this.vec = {x: 0, y: 0, rotation: 0};

        this.touchOrigin = {x: 0, y: 0};

        this.load(app, images);
    }

    load(app, resources) {

        SoundPlayer.load(sounds).then(() => {
            console.log('PLAY SOUND!');
            SoundPlayer.stop('music');
            SoundPlayer.play('music', true);
        });

        Object.keys(resources).map(key =>
            app.loader.add(key, resources[key])
        );

        app.loader.load((loader, assets) => {
            // parse fonts
            registerFont(assets.fontPng.texture);
            // parse spritesheets
            const spriteSheet = assets.sprites;
            const sheet = new PIXI.Spritesheet(spriteSheet.texture.baseTexture, spritesJSON);

            sheet.parse(textures => {
                console.log('Spritesheet parsed!');
                console.log(Object.keys(textures));

                this.onLoad(app);
            });
        });
    }

    onLoad(app) {
        this.updateDims();
        this.demo = new Demo(app, this.dims);

        app.start();
        app.ticker.remove(this.update);
        app.ticker.add(this.update);
    }

    update = delta => {
        this.demo.update(delta, this.vec, this.touchOrigin);

        if (!this.isDown) {
            this.vec.x *= 0.9;
            this.vec.y *= 0.9;
            if (Math.abs(this.vec.x) < 0.005) {
                this.vec.x = 0;
            }
            if (Math.abs(this.vec.y) < 0.005) {
                this.vec.y = 0;
            }
        }
    }

    pause = () => {
        console.log('Game.pause');
        SoundPlayer.stop('music');
        this.app.ticker.remove(this.update);
    }

    resume = () => {
        console.log('Game.resume');
        if (this.demo) {
            SoundPlayer.stop('music');
            SoundPlayer.play('music', true);
            this.app.ticker.remove(this.update);
            this.app.ticker.add(this.update);
        }
    }

    touchUp = point => {
        this.isDown = false;

        if (this.demo) {
            this.demo.pointerUp(point);
        }
    }

    touchDown = point => {
        this.isDown = true;

        this.touchOrigin.x = point.x;
        this.touchOrigin.y = point.y;

        if (this.demo) {
            this.demo.pointerDown(point);
        }
    }

    touchMove = point => {
        if (!this.isDown) {
            return;
        }
        const {vW, vH} = this.dims;
        const {touchOrigin} = this;

        const rotation = angle(touchOrigin.x, touchOrigin.y, point.x, point.y);
        const maxDist = Math.min(vW, vH) / 4;
        const dist = Math.min(distance(touchOrigin.x, touchOrigin.y, point.x, point.y), maxDist);
        const force = dist / maxDist;

        const speed = 10;
        this.vec.x = Math.cos(rotation) * force * speed;
        this.vec.y = Math.sin(rotation) * force * speed;
        this.vec.rotation = rotation;
    }

    updateDims = () => {
        if (!(this.app && this.app.renderer)) {
            return {};
        }

        const {width, height, resolution} = this.app.renderer;
        const vW = width / resolution;
        const vH = height / resolution;
        const center = {
            x: vW / 2,
            y: vH / 2
        };

        console.log('1. center', center);

        this.dims = {
            vW,
            vH,
            resolution,
            width,
            height,
            center
        };

        return this.dims;
    }

    resize() {
        const {width, height} = this.el.getBoundingClientRect();
        this.app.renderer.resize(width, height);
        this.demo.resize(this.updateDims());
        this.app.stage.hitArea.width = width;
        this.app.stage.hitArea.height = height;
    }
}

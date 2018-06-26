import * as PIXI from 'pixi.js';
import World from './world';
// import {registerFont} from './assets/fonts';
import parseSpritesheets from './utils/parse-spritesheets';
import angle from 'usfl/math/angle';
import distance from 'usfl/math/distance';
import images from './assets/images';
import sounds from './assets/sounds';
import Debug from './debug';
import EventEmitter from 'eventemitter3';
import sono from 'sono';
import {
    READY,
    LOG,
    ERROR
} from './constants';
import map from 'usfl/math/map';

const {abs, min, cos, sin} = Math;

const MOVE_SPEED = 8;

const spritesheets = {
    tiles0: require('./assets/images/textures/tiles0.json'),
    objects0: require('./assets/images/textures/objects0.json'),
    objects1: require('./assets/images/textures/objects1.json'),
    objects2: require('./assets/images/textures/objects2.json'),
    objects3: require('./assets/images/textures/objects3.json'),
};

global.PIXI = PIXI;
console.log('PIXI.settings.PRECISION_VERTEX', PIXI.settings.PRECISION_VERTEX);
console.log('PIXI.settings.PRECISION_FRAGMENT', PIXI.settings.PRECISION_FRAGMENT);
// PIXI.settings.PRECISION_FRAGMENT = 'highp';
// PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

export default class Game {
    constructor(el) {
        this.isDown = false;

        const {width, height} = el.getBoundingClientRect();

        const app = new PIXI.Application({
            backgroundColor: 0xE0F0FA,
            autoStart: false,
            roundPixels: false,
            transparent: false,
            antialias: true,
            forceFXAA: false,
            resolution: 1,
            width,
            height
        });
        app.emitter = new EventEmitter();

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

        this.w = 0;
        this.h = 0;

        this.vec = {x: 0, y: 0, rotation: 0};

        this.touchOrigin = {x: 0, y: 0};

        this.load(app, images);
    }

    load(app, resources) {
        Object.keys(sounds).map(key => {
            sono.create({
                id: key,
                src: sounds[key]
            });
        });

        const music = sono.get('music');
        // music.singlePlay = true;
        music.loop = true;
        music.stop();
        music.play();
        this.music = music;

        console.log('Object.keys(resources)', Object.keys(resources));

        Object.keys(resources).map(key =>
            app.loader.add(key, resources[key])
        );

        app.loader.onError.add(error => {
            app.emitter.emit(ERROR, error.message);
        });

        app.loader.load((loader, assets) => {
            // parse fonts
            // registerFont(assets.fontPng.texture);

            const sheets = Object.keys(spritesheets).map(key => ({
                baseTexture: assets[key].texture.baseTexture,
                json: spritesheets[key]
            }));

            parseSpritesheets(sheets).then(textures => {
                console.log('Spritesheets parsed.', textures.length, 'textures found.');
                console.log(Object.keys(textures));
                this.onLoad(app);
            });
        });
    }

    onLoad(app) {
        this.resize();

        this.world = new World(app, this.w, this.h);

        if (process.env.NODE_ENV === 'development') {
            this.debug = new Debug(app, this.world);
        }

        const rendererType = (app.renderer instanceof PIXI.CanvasRenderer) ? 'canvas' : 'webgl';
        app.emitter.emit(LOG, rendererType);

        if (rendererType === 'canvas') {
            this.onReady(app);
            return;
        }

        app.renderer.plugins.prepare.upload(app.stage, () => this.onReady(app));
    }

    onReady(app) {
        app.start();
        app.ticker.remove(this.update);
        app.ticker.add(this.update);
        app.emitter.emit(READY);
    }

    update = delta => {
        this.world.update(delta, this.vec);

        if (this.debug) {
            this.debug.update(this.vec, this.touchOrigin, this.isDown);
        }

        if (!this.isDown) {
            this.vec.x *= 0.85;
            this.vec.y *= 0.85;

            const threshold = 0.5;

            if (abs(this.vec.x) < threshold) {
                this.vec.x = 0;
            }
            if (abs(this.vec.y) < threshold) {
                this.vec.y = 0;
            }
        }
    }

    accelerometer = ({x, y}) => {
        const MIN = 500;
        const MAX = 4000;
        const FORCE = 1.2;

        if (abs(y) > MIN) {
            this.vec.x = MOVE_SPEED * map(y, -MAX, MAX, -FORCE, FORCE, true);
        }

        if (abs(x) > MIN) {
            this.vec.y = MOVE_SPEED * map(x, -MAX, MAX, -FORCE, FORCE, true);
        }
    }

    pause = () => {
        console.log('Game.pause');
        if (this.music) {
            this.music.pause();
        }
        this.app.ticker.remove(this.update);
    }

    resume = () => {
        console.log('Game.resume');
        if (this.world) {
            if (this.music) {
                this.music.stop();
                this.music.play();
            }
            this.app.ticker.remove(this.update);
            this.app.ticker.add(this.update);
        }
    }

    touchUp = () => {
        this.isDown = false;
    }

    touchDown = point => {
        this.isDown = true;

        this.touchOrigin.x = point.x;
        this.touchOrigin.y = point.y;
    }

    touchMove = point => {
        if (!this.isDown) {
            return;
        }
        const {w, h, touchOrigin} = this;

        const rotation = angle(touchOrigin.x, touchOrigin.y, point.x, point.y);
        const maxDist = min(w, h) / 4;
        const dist = min(distance(touchOrigin.x, touchOrigin.y, point.x, point.y), maxDist);
        const force = dist / maxDist;

        this.vec.x = cos(rotation) * force * MOVE_SPEED;
        this.vec.y = sin(rotation) * force * MOVE_SPEED;
        this.vec.rotation = rotation;
    }

    resize() {
        const {width, height} = this.el.getBoundingClientRect();
        const {resolution} = this.app.renderer;
        this.app.renderer.resize(width, height);
        this.app.stage.hitArea.width = width;
        this.app.stage.hitArea.height = height;

        this.w = width / resolution;
        this.h = height / resolution;
        if (this.world) {
            this.world.resize(this.w, this.h);
        }
    }
}

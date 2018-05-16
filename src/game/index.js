import * as PIXI from 'pixi.js';
import World from './world';
import {registerFont} from './assets/fonts';
import angle from 'usfl/math/angle';
import distance from 'usfl/math/distance';
import SoundPlayer from './utils/sound-player';
import images from './assets/images';
import sounds from './assets/sounds';
import Debug from './debug';
const {abs, min, cos, sin} = Math;

const removeFolderNames = json => {
    return Object.assign(json, {
        frames: Object.keys(json.frames).reduce((ob, key) => {
            ob[key.split('/').pop()] = json.frames[key];
            return ob;
        }, {})
    });
};
// import as js ob
const spritesJSON = removeFolderNames(require('./assets/images/textures/objects0.json'));
const tilesJSON = removeFolderNames(require('./assets/images/textures/tiles0.json'));

global.PIXI = PIXI;
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

        SoundPlayer.load(sounds).then(() => {
            console.log('PLAY SOUND!');
            SoundPlayer.stop('music');
            SoundPlayer.play('music', true);
        });

        console.log('Object.keys(resources)', Object.keys(resources));

        Object.keys(resources).map(key =>
            app.loader.add(key, resources[key])
        );

        app.loader.load((loader, assets) => {
            // parse fonts
            registerFont(assets.fontPng.texture);
            // parse spritesheets
            const sprites = new PIXI.Spritesheet(assets.objects0.texture.baseTexture, spritesJSON);
            const tiles = new PIXI.Spritesheet(assets.tiles0.texture.baseTexture, tilesJSON);

            sprites.parse(spriteTextures => {
                console.log('Sprites parsed!');
                console.log(Object.keys(spriteTextures));
                tiles.parse(tileTextures => {
                    console.log('Tiles parsed!');
                    console.log(Object.keys(tileTextures));

                    this.onLoad(app);
                });
            });
        });
    }

    onLoad(app) {
        this.resize();

        this.world = new World(app, this.w, this.h);

        if (process.env.NODE_ENV === 'development') {
            this.debug = new Debug(app, this.world);
        }

        app.start();
        app.ticker.remove(this.update);
        app.ticker.add(this.update);
    }

    update = delta => {
        this.world.update(delta, this.vec);

        if (this.debug) {
            this.debug.update(this.vec, this.touchOrigin, this.isDown);
        }

        if (!this.isDown) {
            this.vec.x *= 0.9;
            this.vec.y *= 0.9;

            const threshold = 0.5;

            if (abs(this.vec.x) < threshold) {
                this.vec.x = 0;
            }
            if (abs(this.vec.y) < threshold) {
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
        if (this.world) {
            SoundPlayer.stop('music');
            SoundPlayer.play('music', true);
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

        const speed = 10;
        this.vec.x = cos(rotation) * force * speed;
        this.vec.y = sin(rotation) * force * speed;
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

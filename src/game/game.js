import {Platform} from 'react-native';
import * as PIXI from 'pixi.js';
import Demo from './demo';
import {registerFont} from './fonts';
import angle from 'usfl/math/angle';
import distance from 'usfl/math/distance';
// import roundTo from 'usfl/math/round-to';
import SoundPlayer from './sound-player';
import sounds from './sounds';

// import as js ob
const spritesJSON = require('./images/sprites.json');

global.PIXI = PIXI;

export default class Game {
    constructor(opts, resources, navigation) {
        this.isDown = false;
        this.context = opts.context;

        navigation.addListener('didBlur', () => this.onBlur());
        navigation.addListener('didFocus', () => this.onFocus());
        // const blurSub = // blurSub.remove();

        const app = new PIXI.Application(Object.assign({}, opts, {
            backgroundColor: 0xE0F0FA,
            autoStart: false
        }));
        this.app = app;

        this.dims = this.updateDims();

        this.vec = {x: 0, y: 0, rotation: 0};

        this.load(app, resources);
    }

    load(app, resources) {

        SoundPlayer.load(sounds).then(() => {
            console.log('PLAY SOUND!');
            SoundPlayer.stop('music');
            // SoundPlayer.play('music', true);
        });

        Object.keys(resources).map(key =>
            app.loader.add(key, resources[key])
        );

        app.loader.load((loader, assets) => {
            // parse fonts
            registerFont(assets.fontPng.texture);
            // parse spritesheets
            const spriteSheet = Platform.OS === 'web' ? assets.sprites : assets.spritesA;
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
        this.demo.update(delta, this.vec);

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

    onBlur = () => {
        console.log('onBlur');
        SoundPlayer.stop('music');
        this.app.ticker.remove(this.update);
    }

    onFocus = () => {
        console.log('onFocus');
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

        this.dims.center.x = point.x;
        this.dims.center.y = point.y;

        if (this.demo) {
            this.demo.pointerDown(point);
        }
    }

    touchMove = point => {
        if (!this.isDown) {
            return;
        }
        const {center, vW, vH} = this.dims;

        const rotation = angle(center.x, center.y, point.x, point.y);
        const maxDist = Math.min(vW, vH) / 2;
        const dist = Math.min(distance(center.x, center.y, point.x, point.y), maxDist);
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

    resize = rect => {
        console.log('resize', rect.width, rect.height);
        this.app.renderer.resize(rect.width, rect.height);
        this.demo.resize(this.updateDims());
    }
}

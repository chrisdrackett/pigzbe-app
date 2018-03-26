import {Platform} from 'react-native';
import * as PIXI from 'pixi.js';
import {registerFont} from './fonts';
import angle from 'usfl/math/angle';
import distance from 'usfl/math/distance';
import roundTo from 'usfl/math/round-to';
import SoundPlayer from './sound-player';
const spritesJSON = require('./images/sprites.json');
global.PIXI = PIXI;
import Ground from './ground';
import Text from './text';

const addTilingSprite = (id, w, h) => {
    const texture = PIXI.Texture.from(id);
    const sprite = new PIXI.extras.TilingSprite(texture, w || texture.width, h || texture.height);
    return sprite;
};

export default function startGame(opts, resources, sounds, navigation) {
    const app = new PIXI.Application(Object.assign({}, opts, {
        backgroundColor: 0xE0F0FA
    }));

    app.onFocus = () => {};

    console.log('sounds', Object.keys(sounds));

    // Object.keys(sounds).forEach(key => console.log(key, '-', sounds[key]));

    const soundPlayer = new SoundPlayer(sounds);
    soundPlayer.load().then(() => {
        console.log('PLAY SOUND!');
        // soundPlayer.play('music', true);
    });

    Object.keys(resources).map(key =>
        app.loader.add(key, resources[key])
    );

    app.loader
        .load((loader, assets) => {
            // parse fonts
            registerFont(assets.fontPng.texture);
            // parse spritesheets
            const spriteSheet = Platform.OS === 'web' ? assets.sprites : assets.spritesA;
            const sheet = new PIXI.Spritesheet(spriteSheet.texture.baseTexture, spritesJSON);

            sheet.parse(textures => {
                console.log('Spritesheet parsed!');
                console.log(Object.keys(textures));

                const {width, height, resolution} = app.renderer;
                const vW = width / resolution;
                const vH = height / resolution;
                const vertSpace = 150;
                const center = {
                    x: vW / 2,
                    y: vH / 2
                };
                console.log('width', width);
                console.log('resolution', resolution);

                const container = new PIXI.Container();
                app.stage.addChild(container);

                // const hillsBack = addTilingSprite('hills_back.png');
                const hillsBack = addTilingSprite('hillsBack', vW);
                hillsBack.position.set(0, vH - hillsBack.height + vertSpace - 120);
                container.addChild(hillsBack);

                // const hillsFront = addTilingSprite('hills_front.png');
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

                const pig = PIXI.Sprite.from('pig.png');
                pig.position.set(center.x - pig.width / 2, center.y - pig.height / 2);
                // container.addChild(pig);

                const arrow = new PIXI.Container();
                const arrowGfx = PIXI.Sprite.from('arrow.png');
                arrow.addChild(arrowGfx);
                app.stage.addChild(arrow);
                arrowGfx.position.set(0 - arrow.width / 2, 0 - arrow.height / 2);
                arrow.position.set(center.x, center.y);

                let isDown = false;
                let force = 0;
                let rotation = 0;
                const vec = {x: 0, y: 0};

                const text = new Text('This is a \npixi text');
                text.position.set(0, 100);
                app.stage.addChild(text);

                app.onBlur = () => {
                    console.log('app.onBlur');
                    soundPlayer.stop('music');
                };

                app.onFocus = () => {
                    console.log('app.onFocus');
                    soundPlayer.play('music', true);
                };

                app.touchUp = point => {
                    console.log('touchUp', point);
                    isDown = false;
                };

                app.touchDown = point => {
                    console.log('touchDown', point);
                    isDown = true;
                    // running = !running;
                };

                app.touchMove = point => {
                    if (!isDown) {
                        return;
                    }
                    // console.log('touchMove', point);

                    pig.position.x = point.x;

                    rotation = angle(center.x, center.y, point.x, point.y);
                    const maxDist = Math.min(vW, vH) / 2;
                    const dist = Math.min(distance(center.x, center.y, point.x, point.y), maxDist);
                    force = dist / maxDist;

                    const speed = 10;
                    vec.x = Math.cos(rotation) * force * speed;
                    vec.y = Math.sin(rotation) * force * speed;

                    text.text = `angle: ${roundTo(rotation, 1)}\nforce: ${roundTo(force, 1)}\nvec: ${roundTo(vec.x)}/${roundTo(vec.y)}`;

                    arrow.rotation = rotation;

                };

                if (Platform.OS === 'web') {
                    app.stage.interactive = true;
                    app.stage.hitArea = new PIXI.Rectangle(0, 0, width, height);
                    app.stage.on('pointerdown', event => app.touchDown(event.data.global));
                    app.stage.on('pointermove', event => app.touchMove(event.data.global));
                    app.stage.on('pointerup', event => app.touchUp(event.data.global));
                }

                app.resize = rect => {
                    app.renderer.resize(rect.width, rect.height);
                };

                app.ticker.add(delta => {
                    clouds.tilePosition.x -= 0.032 * vec.x * delta;
                    cloudsLow.tilePosition.x -= 0.064 * vec.x * delta;
                    hillsBack.tilePosition.x -= 0.128 * vec.x * delta;
                    hillsFront.tilePosition.x -= 0.64 * vec.x * delta;
                    ground.update(2 * vec.x * delta, 0, vW);

                    container.position.y -= vec.y * delta;
                    if (container.position.y < 0 - vertSpace) {
                        container.position.y = 0 - vertSpace;
                    }
                    if (container.position.y > vertSpace) {
                        container.position.y = vertSpace;
                    }

                    if (!isDown) {
                        vec.x *= 0.9;
                        vec.y *= 0.9;
                        if (Math.abs(vec.x) < 0.005) {
                            vec.x = 0;
                        }
                        if (Math.abs(vec.y) < 0.005) {
                            vec.y = 0;
                        }
                    }
                });
            });
        });

    // const blurSub =
    navigation.addListener('didBlur', () => app.onBlur());
    navigation.addListener('didFocus', () => app.onFocus());
    // blurSub.remove();

    return app;
}

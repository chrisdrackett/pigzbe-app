import {DOMParser} from 'xmldom-qsa';
import fontTxt from './fonts/font';
import angle from 'usfl/math/angle';
import distance from 'usfl/math/distance';
import roundTo from 'usfl/math/round-to';
const spritesJSON = require('./images/sprites.json');
import SoundPlayer from './sound-player';

export default function startGame(app, PIXI, resources, sounds) {

    console.log('sounds', Object.keys(sounds));

    // Object.keys(sounds).forEach(key => console.log(key, '-', sounds[key]));

    const soundPlayer = new SoundPlayer(sounds);
    soundPlayer.load().then(() => {
        console.log('PLAY SOUND!');
        soundPlayer.play('music', true);
    });

    Object.keys(resources).map(key =>
        app.loader.add(key, resources[key])
    );

    app.loader
        .load((loader, assets) => {
            // parse fonts
            const xmlData = new DOMParser().parseFromString(fontTxt, 'application/xml');
            PIXI.extras.BitmapText.registerFont(xmlData, assets.fontPng.texture);
            // parse spritesheets
            const sheet = new PIXI.Spritesheet(assets.sprites.texture.baseTexture, spritesJSON);
            sheet.parse(textures => {
                console.log('Spritesheet parsed!');
                console.log(Object.keys(textures));

                const {width, height, resolution} = app.renderer;
                const vW = width / resolution;
                const vH = height / resolution;
                const center = {
                    x: vW / 2,
                    y: vH / 2
                };
                console.log('width', width);
                console.log('resolution', resolution);

                // const bg = new PIXI.Graphics();
                // bg.beginFill(0x0000ff);
                // bg.drawRect(0, 0, vW, vH);
                // bg.endFill();
                // app.stage.addChild(bg);
                // const sprite = PIXI.Sprite.from(assets.pig.texture);
                const pig = PIXI.Sprite.from('pig.png');
                console.log('premultipliedAlpha', assets.sprites.texture.baseTexture.premultipliedAlpha);
                pig.position.set(center.x - pig.width / 2, center.y - pig.height / 2);
                app.stage.addChild(pig);

                const arrow = new PIXI.Container();
                // const arrowGfx = PIXI.Sprite.from(assets.arrow.texture);
                const arrowGfx = PIXI.Sprite.from('arrow.png');
                arrow.addChild(arrowGfx);
                app.stage.addChild(arrow);
                arrowGfx.position.set(0 - arrow.width / 2, 0 - arrow.height / 2);
                arrow.position.set(center.x, center.y);

                let counter = 0;
                let running = false;
                let isDown = false;

                const text = new PIXI.extras.BitmapText('This is a \npixi text', {font: '64px Chalkboard'});
                text.scale.set(0.5);
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
                    running = !running;
                };

                app.touchMove = point => {
                    if (!isDown) {
                        return;
                    }
                    console.log('touchMove', point);

                    pig.position.x = point.x;

                    const a = angle(center.x, center.y, point.x, point.y);
                    const maxDist = Math.min(vW, vH) / 2;
                    const dist = Math.min(distance(center.x, center.y, point.x, point.y), maxDist);
                    const force = dist / maxDist;

                    text.text = `angle: ${roundTo(a, 1)}\nforce: ${roundTo(force, 1)}\ncoords: ${point.x}/${point.y}`;

                    arrow.rotation = a;
                    arrow.scale.set(0.5 + force);
                };

                // desktop:
                app.stage.interactive = true;
                app.stage.hitArea = new PIXI.Rectangle(0, 0, width, height);
                app.stage.on('pointerdown', event => app.touchDown(event.data.global));
                app.stage.on('pointermove', event => app.touchMove(event.data.global));
                app.stage.on('pointerup', event => app.touchUp(event.data.global));

                app.ticker.add(() => {
                    if (running) {
                        counter += 0.1;
                        pig.position.y = 200 + Math.sin(counter) * 150;
                    }
                });
            });
        });

}

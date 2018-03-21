import {DOMParser} from 'xmldom-qsa';
import fontTxt from './font';
import angle from 'usfl/math/angle';
import distance from 'usfl/math/distance';
import roundTo from 'usfl/math/round-to';

export default function startGame(app, PIXI, resources) {

    Object.keys(resources).map(key =>
        app.loader.add(key, resources[key])
    );

    app.loader
        .load((loader, assets) => {
            const {width, height, resolution} = app.renderer;
            const vW = width / resolution;
            const vH = height / resolution;
            const center = {
                x: vW / 2,
                y: vH / 2
            };
            console.log('width', width);
            console.log('resolution', resolution);
            const sprite = PIXI.Sprite.from(assets.pig.texture);
            app.stage.addChild(sprite);
            sprite.position.set(vW / 2 - 60, 200);

            const arrow = new PIXI.Container();
            const arrowGfx = PIXI.Sprite.from(assets.arrow.texture);
            arrow.addChild(arrowGfx);
            app.stage.addChild(arrow);
            arrowGfx.position.set(0 - arrow.width / 2, 0 - arrow.height / 2);
            arrow.position.set(center.x, center.y);

            let counter = 0;
            let running = false;

            const xmlData = new DOMParser().parseFromString(fontTxt, 'application/xml');
            PIXI.BitmapText.registerFont(xmlData, assets.fontPng.texture);
            const text = new PIXI.BitmapText('This is a \npixi text', {font: '64px Chalkboard'});
            text.scale.set(0.5);
            text.position.set(0, 100);
            app.stage.addChild(text);

            app.touchUp = point => {
                console.log('touchUp', point);
            };

            app.touchDown = point => {
                console.log('touchDown', point);
                running = !running;
            };

            app.touchMove = point => {
                console.log('touchMove', point);
                // running = !running;
                sprite.position.x = point.x;

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
                    sprite.position.y = 200 + Math.sin(counter) * 150;
                }
            });
        });

}

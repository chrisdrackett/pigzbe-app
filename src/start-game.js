import {DOMParser} from 'xmldom-qsa';
import fontTxt from './font';

export default function startGame(app, PIXI, resources) {

    Object.keys(resources).map(key =>
        app.loader.add(key, resources[key])
    );

    app.loader
        .load((loader, assets) => {
            const {width, height, resolution} = app.renderer;
            console.log('width', width);
            console.log('resolution', resolution);
            const sprite = PIXI.Sprite.from(assets.pig.texture);
            app.stage.addChild(sprite);
            sprite.position.set(width / resolution / 2 - 60, 200);

            let counter = 0;
            let running = false;

            const xmlData = new DOMParser().parseFromString(fontTxt, 'application/xml');
            PIXI.BitmapText.registerFont(xmlData, assets.fontPng.texture);
            const text = new PIXI.BitmapText('This is a pixi text', {font: '64px Chalkboard'});
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

export default function startGame(app, PIXI, resources) {

    Object.keys(resources).map(key =>
        app.loader.add(key, resources[key])
    );



    app.loader
        .load((loader, assets) => {
            const {width, resolution} = app.renderer;
            console.log('width', width);
            console.log('resolution', resolution);
            const sprite = PIXI.Sprite.from(assets.pig.texture);
            app.stage.addChild(sprite);
            sprite.position.set(width / resolution / 2 - 60, 200);

            let counter = 0;
            let running = false;

            sprite.interactive = true;
            sprite.on('pointerdown', () => {
                running = !running;
            });

            app.touchUp = point => {
                // running = !running;
            };

            app.touchDown = point => {
                running = !running;
            };

            app.touchMove = point => {
                // running = !running;
                sprite.position.x = point.x;
            };

            app.ticker.add(() => {
                if (running) {
                    counter += 0.1;
                    sprite.position.y = 200 + Math.sin(counter) * 150;
                }
            });
        });

}

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

            app.ticker.add(() => {
                counter += 0.1;
                sprite.position.y = 200 + Math.sin(counter) * 150;
            });
        });

}

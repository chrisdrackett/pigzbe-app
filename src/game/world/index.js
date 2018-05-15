import {Container} from 'pixi.js';
import TileMap from '../tiled/tile-map';
import Pigzbe from '../pigzbe';
import Camera from '../camera';
import Background from '../background';
import Coins from '../coins';

const mapJSON = require('../assets/maps/pigzbe_game.json');

export default class World {
    constructor(app, w, h) {
        this.create(app, w, h);
    }

    create(app, w, h) {
        const container = new Container();
        app.stage.addChild(container);

        const map = new TileMap(mapJSON);
        console.log('layers', Object.keys(map.layer));

        const level = map.render(app.renderer);
        container.addChild(level);

        this.background = new Background(map);

        this.coins = new Coins(map);

        const pigzbe = new Pigzbe({
            x: map.width / 2,
            y: map.height / 2,
            maxX: map.width,
            maxY: map.height,
        });
        container.addChild(pigzbe.sprite);

        this.camera = new Camera({
            target: pigzbe,
            maxX: map.width,
            maxY: map.height,
            x: 0,
            y: 0,
            w,
            h
        });

        this.map = map;
        this.container = container;
        this.pigzbe = pigzbe;
    }

    update(delta, vec) {
        this.pigzbe.update(vec, delta);
        this.camera.update();

        this.container.position.set(0 - this.camera.x, 0 - this.camera.y);

        this.background.update(this.camera);

        this.coins.collide(this.pigzbe.hitRect);
    }

    resize(w, h) {
        this.camera.resize(w, h);
    }
}

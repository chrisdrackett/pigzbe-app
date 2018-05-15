import {Container} from 'pixi.js';
import TileMap from '../tiled/tile-map';
import linkedList from 'usfl/linked-list';
import SoundPlayer from '../utils/sound-player';
import Pigzbe from '../pigzbe';
import Camera from '../camera';
import Background from '../background';
import intersects from '../utils/intersects';

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

        this.coins = linkedList(map.layer.coins_A.objects.concat(map.layer.coins_B.objects));
        const level = map.render(app.renderer);
        container.addChild(level);

        this.background = new Background(map);

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

        let coin = this.coins.first;
        while (coin) {
            const next = coin.next;
            const hit = intersects(coin, this.pigzbe.hitRect);
            if (hit) {
                // coin.sprite.tint = 0xff0000;
                coin.sprite.parent.removeChild(coin.sprite);
                this.coins.remove(coin);
                SoundPlayer.play('notificationCoinsCaptured');
            }
            coin = next;
        }

        this.background.update(this.camera);
    }

    resize(w, h) {
        this.camera.resize(w, h);
    }
}

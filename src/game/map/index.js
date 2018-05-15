import {Container} from 'pixi.js';
import TileMap from '../tiled/tile-map';
import linkedList from 'usfl/linked-list';
import SoundPlayer from '../utils/sound-player';
import Pigzbe from '../pigzbe';
import Camera from '../camera';
import intersects from '../utils/intersects';

const mapJSON = require('../assets/maps/pigzbe_game.json');

export default class Map {
    constructor(app, dims) {
        this.dims = dims;

        this.createWorld(app, dims);
    }

    createWorld(app, dims) {
        const {vW, vH} = dims;

        const container = new Container();
        app.stage.addChild(container);

        const map = new TileMap(mapJSON);
        console.log('layers', Object.keys(map.layer));

        this.coins = linkedList(map.layer.coins_A.objects.concat(map.layer.coins_B.objects));
        const level = map.render(app.renderer);
        container.addChild(level);

        this.mountains = map.layer.mountains.sprite;
        this.mountains.width = map.width;

        this.hills = map.layer.hills.sprite;
        this.hills.width = map.width;

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
            w: vW,
            h: vH
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

        this.mountains.tilePosition.x -= 0.064 * this.camera.dx;
        this.hills.tilePosition.x -= 0.128 * this.camera.dy;
    }

    resize(dims) {
        this.dims = dims;
        this.camera.resize(dims.vW, dims.vH);
    }
}

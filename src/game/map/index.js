import {Container} from 'pixi.js';
import TileMap from '../tiled/tile-map';

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

        const level = map.render();
        container.addChild(level);

        container.position.x = (vW - map.width) / 2;
        container.position.y = (vH - map.height) / 2;

        this.map = map;
        this.container = container;
    }

    containWorld() {
        const {vW, vH} = this.dims;

        if (this.container.position.x > 0) {
            this.container.position.x = 0;
        }

        const minX = vW - this.map.width;
        if (this.container.position.x < minX) {
            this.container.position.x = minX;
        }

        if (this.container.position.y > 0) {
            this.container.position.y = 0;
        }

        const minY = vH - this.map.height;
        if (this.container.position.y < minY) {
            this.container.position.y = minY;
        }
    }

    update(delta, vec) {
        this.container.position.x -= vec.x * delta;
        this.container.position.y -= vec.y * delta;

        this.containWorld();
    }

    resize(dims) {
        this.dims = dims;
        this.containWorld();
    }
}

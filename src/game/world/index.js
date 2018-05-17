import {Container} from 'pixi.js';
import TileMap from '../tiled/tile-map';
import Camera from '../camera';
import Ground from '../objects/ground';
import Pigzbe from '../objects/pigzbe';
import Background from '../objects/background';
import Coins from '../objects/coins';
import Characters from '../objects/characters';
import Trees from '../objects/trees';
import Animations, {
    WATERFALL_ANIM,
    GROUND_ANIM,
    OVERGROUND_DECORATION_01,
    OVERGROUND_DECORATION_02,
    CHESTS,
    SECRET
} from '../objects/animations';

const mapJSON = require('../assets/maps/pigzbe_game.json');

export default class World {
    constructor(app, w, h) {
        this.create(app, w, h);
    }

    create(app, w, h) {
        const map = new TileMap(mapJSON);
        map.render(app.renderer, {
            // showObjectRects: process.env.NODE_ENV === 'development'
            showObjectRects: false
        });

        console.log('layers', Object.keys(map.layer));
        console.log('map.width', map.width);

        this.background = new Background(map);
        app.stage.addChild(this.background.container);

        this.trees = new Trees(map);
        app.stage.addChild(this.trees.container);

        this.ground = new Ground(map, app);
        app.stage.addChild(this.ground.container);

        this.anims = new Animations(map);
        app.stage.addChild(this.anims.containers[WATERFALL_ANIM]);
        app.stage.addChild(this.anims.containers[GROUND_ANIM]);

        this.coins = new Coins(map);
        app.stage.addChild(this.coins.coinsB);

        app.stage.addChild(this.anims.containers[OVERGROUND_DECORATION_02]);
        app.stage.addChild(this.anims.containers[OVERGROUND_DECORATION_01]);
        app.stage.addChild(this.anims.containers[CHESTS]);
        app.stage.addChild(this.anims.containers[SECRET]);

        app.stage.addChild(this.coins.coinsA);

        this.characters = new Characters(map);
        app.stage.addChild(this.characters.container);

        const container = new Container();
        app.stage.addChild(container);

        const pigzbe = new Pigzbe({
            x: map.width / 2,
            y: map.height / 2,
            // maxX: map.width,
            maxX: 0,
            maxY: map.height,
            mapW: map.width,
        });
        container.addChild(pigzbe.sprite);

        this.camera = new Camera({
            target: pigzbe,
            // maxX: map.width,
            maxX: 0,
            maxY: map.height,
            wrapW: map.width,
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

        this.ground.update(this.camera);

        this.background.update(this.camera);

        this.coins.update(this.camera, this.pigzbe.hitRect);

        this.trees.update(this.camera, this.pigzbe.hitRect);

        this.anims.update(this.camera);

        this.characters.update(this.camera);
    }

    resize(w, h) {
        this.camera.resize(w, h);
    }
}

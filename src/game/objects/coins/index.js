import {extras, Texture} from 'pixi.js';
import ObjectWrapper from '../../utils/object-wrapper';
import intersects from '../../utils/intersects';
import array from 'usfl/array/array';
import objectPool from 'usfl/object-pool';
import sono from 'sono';

export default class Coins {
    constructor(map) {
        this.create(map);
    }

    create(map) {
        const objects = map.layer.coins_A.objects.concat(map.layer.coins_B.objects);
        this.wrapper = new ObjectWrapper(objects, map.width);
        this.coinsA = map.layer.coins_A.container;
        this.coinsB = map.layer.coins_B.container;

        const popTextures = array(9).map(n => ({
            texture: Texture.from(`coin_pop_0000${n}`),
            time: n === 0 ? 200 : 50
        }));

        this.popPool = objectPool(() => {
            const pop = new extras.AnimatedSprite(popTextures, true);
            pop.loop = false;
            pop.visible = false;
            return pop;
        });
        this.popPool.fill(3);

        this.coinsCollected = 0;
        this.totalCoins = objects.length;
    }

    collide = (visible, coin, coins) => {
        if (visible) {
            const hit = intersects(coin, this.hitRect);
            if (hit && !coin.hit) {
                coin.hit = true;

                this.coinsCollected++;

                coin.container.removeChild(coin.sprite);

                const pop = this.popPool.get();
                coin.container.addChild(pop);
                pop.gotoAndStop(0);
                pop.visible = true;
                pop.onComplete = () => {
                    coin.container.parent.removeChild(coin.container);
                    coins.remove(coin);
                    this.popPool.dispose(pop);
                };
                pop.play();

                const sound = sono.get('notificationCoinsCaptured');
                sound.volume = 0.5;
                sound.play();
            }
        }
    }

    update(camera, hitRect) {
        this.hitRect = hitRect;
        this.wrapper.update(camera, this.collide);
    }
}

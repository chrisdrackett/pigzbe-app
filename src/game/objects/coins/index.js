import ObjectWrapper from '../../utils/object-wrapper';
import SoundPlayer from '../../utils/sound-player';
import intersects from '../../utils/intersects';

export default class Coins {
    constructor(map) {
        this.create(map);
    }

    create(map) {
        const objects = map.layer.coins_A.objects.concat(map.layer.coins_B.objects);
        const containers = [map.layer.coins_A.container, map.layer.coins_B.container];
        this.wrapper = new ObjectWrapper(objects, containers, map.width);
        this.container = this.wrapper.container;
    }

    collide = (visible, coin, coins) => {
        if (visible) {
            const hit = intersects(coin, this.hitRect);
            if (hit) {
                coin.container.parent.removeChild(coin.container);
                coins.remove(coin);
                SoundPlayer.play('notificationCoinsCaptured');
            }
        }
    }

    update(camera, hitRect) {
        this.hitRect = hitRect;
        this.wrapper.update(camera, this.collide);
    }
}
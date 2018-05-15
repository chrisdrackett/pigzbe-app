import linkedList from 'usfl/linked-list';
import SoundPlayer from '../utils/sound-player';
import intersects from '../utils/intersects';

export default class World {
    constructor(map) {
        this.create(map);
    }

    create(map) {
        this.coins = linkedList(map.layer.coins_A.objects.concat(map.layer.coins_B.objects));
    }

    collide(hitRect) {
        let coin = this.coins.first;
        while (coin) {
            const next = coin.next;
            const hit = intersects(coin, hitRect);
            if (hit) {
                // coin.sprite.tint = 0xff0000;
                coin.sprite.parent.removeChild(coin.sprite);
                this.coins.remove(coin);
                SoundPlayer.play('notificationCoinsCaptured');
            }
            coin = next;
        }
    }
}

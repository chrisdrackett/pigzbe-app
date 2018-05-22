import ObjectWrapper from '../../utils/object-wrapper';

export default class Characters {
    constructor(map, onTap) {
        this.create(map, onTap);
    }

    create(map, onTap) {
        const objects = map.layer.characters.objects;
        this.wrapper = new ObjectWrapper(objects, map.width);
        this.container = map.layer.characters.container;

        const {rabbit} = map.layer.characters.object;
        rabbit.sprite.interactive = true;
        rabbit.sprite.buttonMode = true;
        rabbit.sprite.on('pointerdown', event => {
            event.stopPropagation();
            onTap();
        });
    }

    processItem = (visible, character) => {
        if (typeof character.sprite.playing === 'undefined') {
            return;
        }
        if (visible) {
            if (!character.sprite.playing) {
                character.sprite.play();
            }
        } else {
            if (character.sprite.playing) {
                character.sprite.stop();
            }
        }
    }

    update(camera) {
        this.wrapper.update(camera, this.processItem);
    }
}

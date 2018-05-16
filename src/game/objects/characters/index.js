import ObjectWrapper from '../../utils/object-wrapper';

export default class Characters {
    constructor(map) {
        this.create(map);
    }

    create(map) {
        const objects = map.layer.characters.objects;
        const containers = [map.layer.characters.container];
        this.wrapper = new ObjectWrapper(objects, containers, map.width);
        this.container = this.wrapper.container;
    }

    processItem = (visible, character) => {
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

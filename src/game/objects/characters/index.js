import ObjectWrapper from '../../utils/object-wrapper';

export default class Characters {
    constructor(map) {
        this.create(map);
    }

    create(map) {
        const objects = map.layer.characters.objects;
        this.wrapper = new ObjectWrapper(objects, map.width);
        this.container = map.layer.characters.container;
    }

    processItem = (visible, character) => {
        // if (character.name.includes('bird')) {
        //     character.sprite.x -= 1;
        // }
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

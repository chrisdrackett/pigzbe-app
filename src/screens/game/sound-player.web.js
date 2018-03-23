import map from 'usfl/object/map';

export default class SoundPlayer {
    constructor(sounds) {
        this.sounds = sounds;
    }

    load() {
        const getSound = src => {
            const sound = new Audio();
            sound.src = src;
            return sound;
        };

        this.sounds = map(this.sounds, (key, value) => ({
            url: value,
            sound: getSound(value)
        }));

        return Promise.resolve();
    }

    play(id, loop = false) {
        const {sound} = this.sounds[id];
        sound.loop = loop;
        sound.play();
    }

    stop(id) {
        const {sound} = this.sounds[id];
        sound.pause();
    }
}

import map from 'usfl/object/map';

class SoundPlayer {
    load(sounds) {
        const getSound = src => {
            const sound = new Audio();
            sound.src = src;
            return sound;
        };

        this.sounds = map(sounds, (key, value) => ({
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

export default new SoundPlayer();

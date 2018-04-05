import Expo from 'expo';
import map from 'usfl/object/map';

class SoundPlayer {
    load(sounds) {
        this.sounds = map(sounds, (key, value) => ({
            url: value,
            sound: new Expo.Audio.Sound()
        }));

        return Promise.all(Object.keys(this.sounds).map(key => this.sounds[key].sound.loadAsync(this.sounds[key].url)))
            .then(() => console.log('SOUNDS LOADED'));
    }

    async play(id, loop = false) {
        const {sound} = this.sounds[id];
        await sound.setIsLoopingAsync(loop);
        sound.playAsync();
    }

    async stop(id) {
        const {sound} = this.sounds[id];
        sound.stopAsync();
    }
}

export default new SoundPlayer();

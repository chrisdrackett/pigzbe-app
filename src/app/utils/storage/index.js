import {AsyncStorage} from 'react-native';

const key = '@PigzbeStore:state';

export const load = async () => {
    let value = null;

    try {
        value = await AsyncStorage.getItem(key);
        if (value) {
            value = JSON.parse(value);
        }
    } catch (error) {
        console.error(error);
    }

    return value && typeof value === 'object' ? value : {};
};

export const save = async state => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
        console.error(error);
    }
};

export const clear = async () => {
    await AsyncStorage.removeItem(key);
};

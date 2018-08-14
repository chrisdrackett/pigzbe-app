import {AsyncStorage} from 'react-native';
import CryptoJS from 'crypto-js';

const getKey = key => `@PigzbeStore:${key}`;

export const load = async (key, encryptionKey) => {
    let value = null;

    try {
        value = await AsyncStorage.getItem(getKey(key));
        if (value && encryptionKey) {
            value = CryptoJS.AES.decrypt(value, encryptionKey).toString(CryptoJS.enc.Utf8);
        }
        if (value) {
            value = JSON.parse(value);
        }
    } catch (error) {
        console.log(error);
    }

    return value && typeof value === 'object' ? value : {};
};

export const save = async (key, ob, encryptionKey) => {
    try {
        let json = JSON.stringify(ob);
        if (encryptionKey) {
            json = CryptoJS.AES.encrypt(json, encryptionKey).toString();
        }
        await AsyncStorage.setItem(getKey(key), json);
    } catch (error) {
        console.log(error);
    }
};

export const clear = async key => {
    await AsyncStorage.removeItem(getKey(key));
};

export default module.exports;

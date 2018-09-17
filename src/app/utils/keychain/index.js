import * as Keychain from 'react-native-keychain';

export const KEYCHAIN_NO_CREDENTIALS_STORED = 'No credentials stored';
export const KEYCHAIN_NO_ACCESS = 'Keychain could not be accessed';

export const save = async (id, key) => await Keychain.setGenericPassword('pigzbekey', key, id);

export const load = async id => {
    let key = null;
    let error = null;

    try {
        const credentials = await Keychain.getGenericPassword(id);

        if (credentials) {
            key = credentials.password;
        } else {
            error = new Error(KEYCHAIN_NO_CREDENTIALS_STORED);
        }
    } catch (err) {
        error = new Error(KEYCHAIN_NO_ACCESS);
        console.log(err);
    }

    if (error) {
        console.log(error);
    }

    return key;
};

export const clear = async id => await Keychain.resetGenericPassword(id);

export default module.exports;

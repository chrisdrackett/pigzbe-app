import * as Keychain from 'react-native-keychain';

export const KEYCHAIN_NO_CREDENTIALS_STORED = 'Keychain error: No credentials stored';
export const KEYCHAIN_NO_ACCESS = 'Keychain error: Keychain could not be accessed';

export const save = async (id, key) => await Keychain.setGenericPassword('pigzbekey', key, id);

export const load = async id => {
    let key = null;
    let error = null;

    try {
        const credentials = await Keychain.getGenericPassword(id);

        if (credentials) {
            key = credentials.password;
        } else {
            error = `${KEYCHAIN_NO_CREDENTIALS_STORED} for key ${id}`;
        }
    } catch (err) {
        error = KEYCHAIN_NO_ACCESS;
    }

    if (error) {
        console.log(error);
    }

    return key;
};

export const clear = async id => await Keychain.resetGenericPassword(id);

export default module.exports;

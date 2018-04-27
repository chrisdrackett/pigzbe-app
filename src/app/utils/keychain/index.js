import * as Keychain from 'react-native-keychain';

export const KEYCHAIN_NO_CREDENTIALS_STORED = 'No credentials stored';
export const KEYCHAIN_NO_ACCESS = 'Keychain could not be accessed';

export const save = async key => await Keychain.setGenericPassword('pigzbekey', key);

export const load = async () => {
    let key = null;
    let error = null;

    try {
        const credentials = await Keychain.getGenericPassword();

        if (credentials) {
            key = credentials.password;
        } else {
            error = new Error(KEYCHAIN_NO_CREDENTIALS_STORED);
        }
    } catch (err) {
        error = new Error(KEYCHAIN_NO_ACCESS);
    }

    return {
        key,
        error
    };
};

export const clear = async () => await Keychain.resetGenericPassword();

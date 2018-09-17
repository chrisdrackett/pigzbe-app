import {NativeModules} from 'react-native';
import bip39 from 'bip39';
import {derivePath} from './ed25519-hd-key';
import {Keypair} from '@pigzbe/stellar-utils';

const ENTROPY_BITS = 128; // 12 words

const randomBytesAsync = length => {
    return new Promise((resolve, reject) => {
        NativeModules.RNRandomBytes.randomBytes(length, (err, base64String) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(new Buffer(base64String, 'base64'));
        });
    });
};

export const isValidMnemonic = str => {
    const numWords = str.trim().split(/\s+/g).length;
    if (numWords !== 12) {
        return false;
    }
    return bip39.validateMnemonic(str);
};

export const generateMnemonic = async () => {
    const length = ENTROPY_BITS / 8;
    const rndBytes = await randomBytesAsync(length);
    const wordlist = bip39.wordlists.english;
    return bip39.generateMnemonic(ENTROPY_BITS, () => rndBytes, wordlist);
};

export const getSeedHex = mnemonic => {
    if (!isValidMnemonic(mnemonic)) {
        throw new Error('Invalid mnemonic');
    }
    return bip39.mnemonicToSeedHex(mnemonic);
};

export const getKeypair = (seedHex, index = 0) => {
    const data = derivePath(`m/44'/148'/${index}'`, seedHex);

    return Keypair.fromRawEd25519Seed(data.key);
};

export default module.exports;

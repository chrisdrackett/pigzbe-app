import Stellar from './';

export const isValidPublicKey = key => {
    let valid = true;
    try {
        Stellar.Keypair.fromPublicKey(key);
    } catch (e) {
        valid = false;
    }
    return valid;
};

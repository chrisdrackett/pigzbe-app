import {LOCAL_STORAGE} from '../constants/action-types';
import {checkUserCache} from './eth';
import Keychain from '../utils/keychain';
import Storage from '../utils/storage';
import {KEYCHAIN_ID_ETH_KEY, STORAGE_KEY_BURNING} from '../constants';

export const loadLocalStorage = () => async (dispatch) => {
    const payload = await Storage.load(STORAGE_KEY_BURNING);
    dispatch({
        type: LOCAL_STORAGE,
        payload
    });

    dispatch(checkUserCache());
};

export const clearClaimData = () => () => {
    Keychain.clear(KEYCHAIN_ID_ETH_KEY);
    Storage.clear(STORAGE_KEY_BURNING);
};

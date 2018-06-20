import {LOCAL_STORAGE} from '../constants/action-types';
import {checkUserCache} from './eth';
import Keychain from '../utils/keychain';
import Storage from '../utils/storage';
import {KEYCHAIN_ID_ETH_KEY} from '../constants';

export const loadLocalStorage = () => async (dispatch) => {
    const payload = await Storage.load('burning');
    dispatch({
        type: LOCAL_STORAGE,
        payload
    });

    dispatch(checkUserCache());
};

export const clearClaimData = () => () => {
    Keychain.clear(KEYCHAIN_ID_ETH_KEY);
    Storage.clear('burning');
};

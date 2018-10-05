import Keychain from '../utils/keychain';
import Storage from '../utils/storage';
import {KEYCHAIN_ID_ETH_KEY, STORAGE_KEY_BURNING} from '../constants';
import {checkUserCache} from './claim-eth';

export const CLAIM_UPDATE_DATA = 'CLAIM_UPDATE_DATA';
export const CLAIM_CLEAR_DATA = 'CLAIM_CLEAR_DATA';

export const loadClaimData = () => async (dispatch) => {
    const payload = await Storage.load(STORAGE_KEY_BURNING);
    dispatch(updateClaimData(payload));
    dispatch(checkUserCache());
};

export const updateClaimData = payload => async (dispatch, getState) => {
    console.log('updateClaimData');
    console.log(' -- before:', getState().claimData);
    dispatch({type: CLAIM_UPDATE_DATA, payload});
    const {claimData} = getState();
    await Storage.save(STORAGE_KEY_BURNING, claimData);
    console.log(' -- after:', getState().claimData);
};

export const clearClaimData = () => dispatch => {
    Keychain.clear(KEYCHAIN_ID_ETH_KEY);
    Storage.clear(STORAGE_KEY_BURNING);
    dispatch({type: CLAIM_CLEAR_DATA});
};

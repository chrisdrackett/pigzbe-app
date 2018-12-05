import Keychain from '../utils/keychain';
import Storage from '../utils/storage';
import {KEYCHAIN_ID_ETH_KEY, STORAGE_KEY_BURNING} from '../constants';
import {checkUserCache, getClaimBalance} from './claim-eth';

export const CLAIM_UPDATE_DATA = 'CLAIM_UPDATE_DATA';
export const CLAIM_CLEAR_DATA = 'CLAIM_CLEAR_DATA';

const getClaimStorageKey = currentClaim => `${STORAGE_KEY_BURNING}_${currentClaim}`;

const getClaimKeychainId = currentClaim => `${KEYCHAIN_ID_ETH_KEY}_${currentClaim}`;

export const loadClaimPrivateKey = () => async (dispatch, getState) => {
    try {
        const {currentClaim} = getState().claim;
        const id = getClaimKeychainId(currentClaim);
        return await Keychain.load(id);
    } catch (e) {
        return null;
    }
};

export const saveClaimPrivateKey = privateKey => async (dispatch, getState) => {
    const {currentClaim} = getState().claim;
    const id = getClaimKeychainId(currentClaim);
    return await Keychain.save(id, privateKey);
};

export const loadClaimData = () => async (dispatch, getState) => {
    const {currentClaim} = getState().claim;
    const payload = await Storage.load(getClaimStorageKey(currentClaim));
    await dispatch(updateClaimData({...payload, loaded: false, error: null}));
    await dispatch(checkUserCache(payload));
    await dispatch(getClaimBalance());
    await dispatch(updateClaimData({loaded: true}));
};

export const updateClaimData = payload => async (dispatch, getState) => {
    const {currentClaim} = getState().claim;
    dispatch({type: CLAIM_UPDATE_DATA, payload});
    const {data} = getState().claim.claims[currentClaim];
    await Storage.save(getClaimStorageKey(currentClaim), data);
};

export const clearClaimData = () => (dispatch, getState) => {
    const {currentClaim} = getState().claim;
    Keychain.clear(getClaimKeychainId(currentClaim));
    Storage.clear(getClaimStorageKey(currentClaim));
    dispatch({type: CLAIM_CLEAR_DATA});
};

export const flagClaimDataForReload = () => ({type: CLAIM_UPDATE_DATA, payload: {loaded: false}});

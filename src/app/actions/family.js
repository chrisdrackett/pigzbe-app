import Storage from '../utils/storage';
import {STORAGE_KEY_FAMILY} from '../constants';
import {createSubAccount, getAccountBalance} from './';

export const FAMILY_LOAD = 'FAMILY_LOAD';
export const FAMILY_LOADING = 'FAMILY_LOADING';
export const FAMILY_PARENT_NICKNAME = 'FAMILY_PARENT_NICKNAME';
export const FAMILY_NUM_KIDS_TO_ADD = 'FAMILY_NUM_KIDS_TO_ADD';
export const FAMILY_ADD_KID = 'FAMILY_ADD_KID';

const familyLoading = value => ({type: FAMILY_LOADING, value});

export const loadFamily = () => async (dispatch, getState) => {
    console.log('loadFamily');
    try {
        // const {secretKey} = getState().wollo;
        // const data = await Storage.load(STORAGE_KEY_FAMILY, secretKey);
        const data = await Storage.load(STORAGE_KEY_FAMILY);
        // console.log('data', data);
        // console.log(JSON.stringify(data, null, 2));
        dispatch({type: FAMILY_LOAD, ...data});

        const {kids} = getState().family;
        for (const kid of kids) {
            kid.balance = await dispatch(getAccountBalance());
        }
    } catch (error) {
        console.log(error);
    }
};

export const saveFamily = () => async (dispatch, getState) => {
    console.log('saveFamily');
    try {
        const data = getState().family;
        console.log('data', data);
        // const {secretKey} = getState().wollo;
        // await Storage.save(STORAGE_KEY_FAMILY, data, secretKey);
        await Storage.save(STORAGE_KEY_FAMILY, data);
    } catch (error) {
        console.log(error);
    }
};

export const familyParentNickname = parentNickname => ({type: FAMILY_PARENT_NICKNAME, parentNickname});

export const familyNumKidsToAdd = numKidsToAdd => ({type: FAMILY_NUM_KIDS_TO_ADD, numKidsToAdd});

export const familyAddKid = (name, dob, photo) => async dispatch => {
    console.log('FAMILY_ADD_KID', name, dob, photo);
    dispatch(familyLoading(true));

    const address = await dispatch(createSubAccount(name));

    console.log('address', address);

    // addChild
    // create stellar account
    // trust wollo
    // add main account as signer
    // store locally (encrypt using stellar key?)
    dispatch(({type: FAMILY_ADD_KID, kid: {name, dob, photo, address, balance: '0'}}));
    await dispatch(saveFamily());
    dispatch(familyLoading(false));
};

import Storage from '../utils/storage';
import {STORAGE_KEY_KIDS} from '../constants';
import {loadAccount} from '@pigzbe/stellar-utils';
import {createKidAccount, getAccountBalance, sendWollo, fundKidAccount} from './';

export const KIDS_LOAD = 'KIDS_LOAD';
export const KIDS_LOADING = 'KIDS_LOADING';
export const KIDS_PARENT_NICKNAME = 'KIDS_PARENT_NICKNAME';
export const KIDS_NUM_TO_ADD = 'KIDS_NUM_TO_ADD';
export const KIDS_ADD_KID = 'KIDS_ADD_KID';
export const KIDS_SENDING_WOLLO = 'KIDS_SENDING_WOLLO';
export const KIDS_BALANCE_UPDATE = 'KIDS_BALANCE_UPDATE';

const kidsLoading = value => ({type: KIDS_LOADING, value});

const sendingWolloToKid = value => ({type: KIDS_SENDING_WOLLO, value});

export const loadKids = () => async dispatch => {
    console.log('loadKids');
    try {
        const data = await Storage.load(STORAGE_KEY_KIDS);
        // console.log('data', data);
        // console.log(JSON.stringify(data, null, 2));
        dispatch({type: KIDS_LOAD, ...data});
    } catch (error) {
        console.log(error);
    }
};

export const saveKids = () => async (dispatch, getState) => {
    console.log('saveKids');
    try {
        const data = getState().kids;
        console.log('data', data);
        await Storage.save(STORAGE_KEY_KIDS, data);
    } catch (error) {
        console.log(error);
    }
};

export const setParentNickname = parentNickname => ({type: KIDS_PARENT_NICKNAME, parentNickname});

export const setNumKidsToAdd = numKidsToAdd => ({type: KIDS_NUM_TO_ADD, numKidsToAdd});

export const addKid = (name, dob, photo) => async (dispatch, getState) => {
    console.log('KIDS_ADD_KID', name, dob, photo);
    dispatch(kidsLoading(true));

    const {kids} = getState().kids;

    const index = kids.length ? kids.reduce((i, kid) => Math.max(kid.index, i), 0) + 2 : 1;

    console.log('nextIndex', index);

    const address = await dispatch(createKidAccount(name, index));
    console.log('address', address);

    dispatch(({type: KIDS_ADD_KID, kid: {name, dob, photo, address, balance: '0', index}}));
    await dispatch(saveKids());
    dispatch(kidsLoading(false));
};

export const sendWolloToKid = (address, amount) => async (dispatch, getState) => {
    console.log('sendWolloToKid');
    dispatch(sendingWolloToKid(true));
    try {
        const account = await loadAccount(address);
        console.log('account ---->');
        console.log(account);
    } catch (e) {
        console.log('Could not load account');
        const name = getState().kids.kids.find(k => k.address === address).name;
        await dispatch(fundKidAccount(name, address));
    }
    try {
        const {parentNickname} = getState().kids;
        await dispatch(sendWollo(address, amount, `From ${parentNickname || 'Parent'}`));
    } catch (error) {
        console.log(error);
    }
    dispatch(sendingWolloToKid(false));
};

export const updateKidBalance = (address, balance) => ({type: KIDS_BALANCE_UPDATE, address, balance});

export const loadKidsBalances = address => async (dispatch, getState) => {
    try {
        const kids = getState().kids.kids.filter(k => !address || k.address === address);
        for (const kid of kids) {
            const balance = await dispatch(getAccountBalance(kid.address));
            console.log(kid.name, 'balance', balance);
            dispatch(updateKidBalance(kid.address, balance));
        }
    } catch (error) {
        console.log(error);
    }
};

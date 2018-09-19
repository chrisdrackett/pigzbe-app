import Storage from '../utils/storage';
import {STORAGE_KEY_KIDS} from '../constants';
import {loadAccount, sendPayment} from '@pigzbe/stellar-utils';
import {createKidAccount, getAccountBalance, fundKidAccount, getWolloBalance} from './';
import {wolloAsset} from '../selectors';
import wait from '../utils/wait';

export const KIDS_LOAD = 'KIDS_LOAD';
export const KIDS_LOADING = 'KIDS_LOADING';
export const KIDS_PARENT_NICKNAME = 'KIDS_PARENT_NICKNAME';
export const KIDS_NUM_TO_ADD = 'KIDS_NUM_TO_ADD';
export const KIDS_ADD_KID = 'KIDS_ADD_KID';
export const KIDS_SENDING_WOLLO = 'KIDS_SENDING_WOLLO';
export const KIDS_SEND_ERROR = 'KIDS_SEND_ERROR';
export const KIDS_SEND_COMPLETE = 'KIDS_SEND_COMPLETE';
export const KIDS_BALANCE_UPDATE = 'KIDS_BALANCE_UPDATE';

const kidsLoading = value => ({type: KIDS_LOADING, value});

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

export const restoreKid = (name, address, index, account) => async dispatch => {
    console.log('restoreKid', name);
    dispatch(kidsLoading(true));

    dispatch(({type: KIDS_ADD_KID, kid: {
        name,
        address,
        balance: getWolloBalance(account),
        index
    }}));
    await dispatch(saveKids());
    dispatch(kidsLoading(false));
};

const sendingWolloToKid = address => ({type: KIDS_SENDING_WOLLO, address});
const sendError = error => ({type: KIDS_SEND_ERROR, error});
const sendComplete = address => ({type: KIDS_SEND_COMPLETE, address});

export const sendWolloToKid = (address, amount) => async (dispatch, getState) => {
    console.log('sendWolloToKid', address, amount);
    dispatch(sendError(null));
    dispatch(sendComplete(null));
    dispatch(sendingWolloToKid(address));
    try {
        await loadAccount(address);
    } catch (e) {
        console.log('Could not load account. Attemptiung to fund');
        const name = getState().kids.kids.find(k => k.address === address).name;
        await dispatch(fundKidAccount(name, address));
    }
    try {
        const {parentNickname} = getState().kids;
        // await dispatch(sendWollo(address, amount, `From ${parentNickname || 'Parent'}`));
        const memo = `From ${parentNickname || 'Parent'}`;
        const asset = wolloAsset(getState());
        const {secretKey} = getState().keys;
        await sendPayment(secretKey, address, amount, memo, asset);
        dispatch(sendComplete(address));
    } catch (error) {
        console.log(error);
        dispatch(sendError(new Error('Failed to send Wollo')));
    }
    dispatch(loadKidsBalances(address, 1));
    dispatch(sendingWolloToKid(null));
};

export const updateKidBalance = (address, balance) => ({type: KIDS_BALANCE_UPDATE, address, balance});

export const loadKidsBalances = (address, waitSeconds = 0) => async (dispatch, getState) => {
    console.log('loadKidsBalances', address, waitSeconds);
    try {
        await wait(waitSeconds);
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

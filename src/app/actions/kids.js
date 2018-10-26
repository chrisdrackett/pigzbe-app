import Storage from '../utils/storage';
import {loadAccount, sendPayment} from '@pigzbe/stellar-utils';
import {
    createKidAccount,
    createHomeAccount,
    fundKidAccount,
    updateBalance,
    refreshBalance,
    loadKidActions
} from './';
import {wolloAsset} from '../selectors';
import wait from '../utils/wait';
import formatMemo from 'app/utils/format-memo';
import {
    STORAGE_KEY_KIDS,
    KID_WALLET_BALANCE_XLM,
    MEMO_PREPEND_CREATE,
    MEMO_PREPEND_HOME,
    MEMO_PREPEND_PRESENT
} from '../constants';

export const KIDS_LOAD = 'KIDS_LOAD';
export const KIDS_LOADING = 'KIDS_LOADING';
export const KIDS_PARENT_NICKNAME = 'KIDS_PARENT_NICKNAME';
export const KIDS_NUM_TO_ADD = 'KIDS_NUM_TO_ADD';
export const KIDS_ADD_KID = 'KIDS_ADD_KID';
export const KIDS_SENDING_WOLLO = 'KIDS_SENDING_WOLLO';
export const KIDS_SEND_ERROR = 'KIDS_SEND_ERROR';
export const KIDS_SEND_COMPLETE = 'KIDS_SEND_COMPLETE';
export const KIDS_BALANCE_UPDATE = 'KIDS_BALANCE_UPDATE';

export const kidsLoading = value => ({type: KIDS_LOADING, value});

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
    try {
        const data = getState().kids;
        await Storage.save(STORAGE_KEY_KIDS, data);
    } catch (error) {
        console.log(error);
    }
};

export const setParentNickname = parentNickname => ({type: KIDS_PARENT_NICKNAME, parentNickname});

export const setNumKidsToAdd = numKidsToAdd => ({type: KIDS_NUM_TO_ADD, numKidsToAdd});

export const addKid = (nickname, dob, photo) => async dispatch => {
    dispatch(kidsLoading(true));
    try {
        const address = await dispatch(createKidAccount(MEMO_PREPEND_CREATE, nickname, KID_WALLET_BALANCE_XLM));
        if (!address) {
            throw new Error('Could not create kid account');
        }

        const home = await dispatch(createHomeAccount(MEMO_PREPEND_HOME, nickname, address));
        if (!home) {
            throw new Error('Could not create kid home account');
        }

        dispatch(({type: KIDS_ADD_KID, kid: {name: nickname, dob, photo, address, home, balance: '0'}}));
        await dispatch(saveKids());

    } catch (error) {
        console.log(error);
    }
    dispatch(kidsLoading(false));
};

export const restoreKid = (name, address, home, goals) => async dispatch => {
    dispatch(kidsLoading(true));

    dispatch(({type: KIDS_ADD_KID, kid: {
        name,
        address,
        home,
        goals
    }}));

    await dispatch(saveKids());
    dispatch(kidsLoading(false));
};

const sendingWolloToKid = address => ({type: KIDS_SENDING_WOLLO, address});
const sendError = error => ({type: KIDS_SEND_ERROR, error});
const sendComplete = address => ({type: KIDS_SEND_COMPLETE, address});

export const sendWolloToKid = (address, amount) => async (dispatch, getState) => {
    dispatch(sendError(null));
    dispatch(sendComplete(null));
    dispatch(sendingWolloToKid(address));
    try {
        await loadAccount(address);
    } catch (e) {
        console.log('Could not load account. Attemptiung to fund');
        const name = getState().kids.kids.find(k => k.address === address).name;
        await dispatch(fundKidAccount(`${MEMO_PREPEND_CREATE}${name}`, address, KID_WALLET_BALANCE_XLM));
    }
    try {
        const {parentNickname} = getState().kids;
        const memo = formatMemo(`${MEMO_PREPEND_PRESENT}${parentNickname || 'Parent'}`);
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
    dispatch(refreshBalance());
};

export const updateKidBalance = (address, balance) => ({type: KIDS_BALANCE_UPDATE, address, balance});

export const loadKidsBalances = (address, waitSeconds = 0) => async (dispatch, getState) => {
    try {
        await wait(waitSeconds);
        const kids = getState().kids.kids.filter(k => !address || k.address === address);
        for (const kid of kids) {
            for (const goal of kid.goals) {
                dispatch(updateBalance(goal.address));
            }
            dispatch(updateBalance(kid.home));
        }
    } catch (error) {
        console.log(error);
    }
};

export const loadKidsActions = () => async (dispatch, getState) => {
    console.log('loadKidsActions');
    try {
        const kids = getState().kids.kids;
        for (const kid of kids) {
            await dispatch(loadKidActions(kid.address));
        }
    } catch (error) {
        console.log(error);
    }
};

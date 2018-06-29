/* eslint-disable no-console */

import {
    USER_BALANCE,
    USER_LOGIN,
    LOCAL_STORAGE,
    ERROR,
    LOADING,
    PRIVATE_KEY
} from '../constants/action-types';
import {isValidSeed, generateAddressFromSeed} from '../utils/web3';
import {load, save} from '../utils/keychain';
import {KEYCHAIN_ID_ETH_KEY} from '../constants';
import BigNumber from 'bignumber.js';

const getNumBurnTokens = (balanceWei, config) => {
    const {network, stellar} = config;
    const {maxClaimTokens} = stellar.networks[network];

    const maxAmount = new BigNumber(maxClaimTokens).plus(Math.random()).times(10 ** 18).toString(10);
    const amountBurn = BigNumber.min(balanceWei, maxAmount).toString(10);

    console.log('maxClaimTokens', maxClaimTokens);
    console.log('maxAmount', maxAmount);
    console.log('balanceWei', balanceWei);
    console.log('amountBurn', amountBurn);
    console.log('balanceWei - amountBurn', new BigNumber(balanceWei).minus(amountBurn).toString(10));

    return amountBurn;
};

export const getBalance = () => async (dispatch, getState) => {
    try {
        const web3 = getState().web3.instance;
        const contract = getState().contract.instance;
        const accountBalanceWei = await contract.methods.balanceOf(getState().user.get('coinbase')).call();
        const balanceWei = getNumBurnTokens(accountBalanceWei, getState().config);
        const balanceWollo = new BigNumber(web3.utils.fromWei(balanceWei, 'ether')).toFixed(7, BigNumber.ROUND_DOWN);
        dispatch({type: USER_BALANCE, payload: {
            balanceWei,
            balanceWollo
        }});

    } catch (e) {
        console.log(e);
        dispatch({type: ERROR, payload: e.message});
    }

};

export const checkUserCache = () => async (dispatch, getState) => {
    const {localStorage} = getState().content;
    const {coinbase} = localStorage;
    const privateKey = await load(KEYCHAIN_ID_ETH_KEY);

    if (!coinbase || !privateKey.key) {
        return;
    }

    dispatch({
        type: USER_LOGIN,
        payload: {
            coinbase
        },
    });

    dispatch({
        type: PRIVATE_KEY,
        payload: {
            privateKey: privateKey.key
        },
    });

    dispatch(getBalance());
};

export const userLogin = (mnemonic, pk) => async (dispatch, getState) => {
    const web3 = getState().web3.instance;

    dispatch({type: LOADING, payload: null});

    try {
        if (!isValidSeed(mnemonic)) {
            throw new Error('Please check your 12 memorable words');
        }

        if (!web3.utils.isAddress(pk)) {
            throw new Error('Please check your wallet address');
        }

        const address = generateAddressFromSeed(mnemonic, pk);
        const account = web3.eth.accounts.privateKeyToAccount(`0x${address.privateKey}`);
        const coinbase = account.address;

        await save(KEYCHAIN_ID_ETH_KEY, address.privateKey);

        dispatch({
            type: LOCAL_STORAGE,
            payload: {
                coinbase
            }
        });

        dispatch({
            type: PRIVATE_KEY,
            payload: {
                privateKey: address.privateKey
            },
        });

        dispatch({
            type: USER_LOGIN,
            payload: {
                coinbase
            },
        });

        dispatch(getBalance());

        return true;
    } catch (e) {
        console.log(e);
        dispatch({type: ERROR, payload: e.message});
        return false;
    }
};

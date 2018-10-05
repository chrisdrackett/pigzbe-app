import {isValidSeed, generateAddressFromSeed} from '../utils/web3';
import Keychain from '../utils/keychain';
import {KEYCHAIN_ID_ETH_KEY} from '../constants';
import BigNumber from 'bignumber.js';
import {utils} from 'web3';
import {updateClaimData} from './claim-data';
import {claimLoading, claimError} from './claim-api';

export const CLAIM_ETH_COINBASE = 'CLAIM_ETH_COINBASE';
export const CLAIM_ETH_BALANCE = 'CLAIM_ETH_BALANCE';
export const CLAIM_ETH_PRIVATE_KEY = 'CLAIM_ETH_PRIVATE_KEY';

const getMaxNumBurnTokens = config => {
    const {network, stellar} = config;
    const {maxClaimTokens} = stellar.networks[network];

    return new BigNumber(maxClaimTokens / 2)
        .plus(new BigNumber(maxClaimTokens / 2).times(BigNumber.random()))
        .times(10 ** 18)
        .integerValue(BigNumber.ROUND_FLOOR)
        .toString(10);
};

export const getClaimBalance = () => async (dispatch, getState) => {
    try {
        const web3 = getState().web3.instance;
        const contract = getState().contract.instance;

        const accountBalanceWei = await contract.methods.balanceOf(getState().eth.coinbase).call();
        const maxAmount = getState().eth.maxAmount || getMaxNumBurnTokens(getState().config);
        const balanceWei = BigNumber.min(accountBalanceWei, maxAmount).toString(10);
        const balanceWollo = new BigNumber(web3.utils.fromWei(balanceWei, 'ether')).toFixed(7, BigNumber.ROUND_DOWN);

        dispatch({type: CLAIM_ETH_BALANCE, payload: {
            balanceWei,
            balanceWollo,
            maxAmount
        }});

    } catch (e) {
        console.log(e);
        dispatch(claimError(e.message));
    }

};

export const loadPrivateKey = () => async dispatch => {
    try {
        const privateKey = await Keychain.load(KEYCHAIN_ID_ETH_KEY);

        if (privateKey) {
            dispatch(setPrivateKey(privateKey));
        }
    } catch (e) {}
};

export const setPrivateKey = privateKey => ({type: CLAIM_ETH_PRIVATE_KEY, privateKey});

export const setCoinbase = coinbase => ({type: CLAIM_ETH_COINBASE, coinbase});

export const checkUserCache = () => async (dispatch, getState) => {
    const {claimData} = getState();
    const {coinbase} = claimData;
    const privateKey = await Keychain.load(KEYCHAIN_ID_ETH_KEY);

    if (!coinbase || !privateKey) {
        return;
    }

    dispatch(setCoinbase(coinbase));
    dispatch(setPrivateKey(privateKey));

    dispatch(getClaimBalance());
};

export const userLogin = (mnemonic, pk) => async (dispatch, getState) => {
    const web3 = getState().web3.instance;

    dispatch(claimLoading(null));

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

        await Keychain.save(KEYCHAIN_ID_ETH_KEY, address.privateKey);

        dispatch(updateClaimData({coinbase}));
        dispatch(setPrivateKey(address.privateKey));
        dispatch(setCoinbase(coinbase));

        dispatch(getClaimBalance());

        return true;
    } catch (e) {
        console.log(e);
        dispatch(claimError(e.message));
        return false;
    }
};

export const getGasPrice = () => async (disptach, getState) => {
    console.log('getGasPrice');
    const web3 = getState().web3.instance;

    console.log('web3', web3);

    let gasPrice = utils.toWei('20', 'gwei');
    let egsGasPrice = '0';

    try {
        const egs = await (await fetch('https://ethgasstation.info/json/ethgasAPI.json')).json();
        egsGasPrice = utils.toWei(String(egs.safeLow), 'gwei');
    } catch (error) {}

    try {
        gasPrice = await web3.eth.getGasPrice();
    } catch (error) {}

    console.log('web3 gasPrice', gasPrice);
    console.log('ethgasstation gasPrice', egsGasPrice);
    console.log('max gasPrice', BigNumber.max(gasPrice, egsGasPrice).toString(10));

    return BigNumber.max(gasPrice, egsGasPrice).toString(10);
};

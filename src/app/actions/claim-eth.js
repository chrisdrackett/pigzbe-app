import {isValidSeed, generateAddressFromSeed} from '../utils/web3';
import BigNumber from 'bignumber.js';
import {utils} from 'web3';
import {updateClaimData, loadClaimPrivateKey, saveClaimPrivateKey} from './claim-data';
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
        const {currentClaim, claims} = getState().claim;
        const web3 = claims[currentClaim].web3.instance;
        const contract = claims[currentClaim].contract.instance;
        const eth = claims[currentClaim].eth;

        const accountBalanceWei = await contract.methods.balanceOf(eth.coinbase).call();
        const maxAmount = eth.maxAmount || getMaxNumBurnTokens(getState().config);
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
        const privateKey = await dispatch(loadClaimPrivateKey());
        if (privateKey) {
            dispatch(setPrivateKey(privateKey));
        }
    } catch (e) {}
};

export const setPrivateKey = privateKey => ({type: CLAIM_ETH_PRIVATE_KEY, privateKey});

export const setCoinbase = coinbase => ({type: CLAIM_ETH_COINBASE, coinbase});

export const checkUserCache = () => async (dispatch, getState) => {
    const {currentClaim, claims} = getState().claim;
    const {coinbase} = claims[currentClaim].eth;
    const privateKey = await dispatch(loadClaimPrivateKey());

    if (!coinbase || !privateKey) {
        return;
    }

    dispatch(setCoinbase(coinbase));
    dispatch(setPrivateKey(privateKey));

    await dispatch(getClaimBalance());
};

export const userLogin = (mnemonic, publicKey) => async (dispatch, getState) => {
    const {currentClaim, claims} = getState().claim;
    const web3 = claims[currentClaim].web3.instance;

    dispatch(claimLoading(null));

    try {
        if (!isValidSeed(mnemonic)) {
            throw new Error('Please check your 12 memorable words');
        }

        if (!web3.utils.isAddress(publicKey)) {
            throw new Error('Please check your wallet address');
        }

        const address = generateAddressFromSeed(mnemonic, publicKey);
        const account = web3.eth.accounts.privateKeyToAccount(`0x${address.privateKey}`);
        const coinbase = account.address;

        if (!coinbase) {
            throw new Error('Could not load wallet');
        }

        await dispatch(saveClaimPrivateKey(address.privateKey));

        dispatch(updateClaimData({coinbase}));
        dispatch(setPrivateKey(address.privateKey));
        dispatch(setCoinbase(coinbase));

        dispatch(getClaimBalance());

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};

export const userLoginPrivateKey = (privateKey, publicKey) => async (dispatch, getState) => {
    const {currentClaim, claims} = getState().claim;
    const web3 = claims[currentClaim].web3.instance;

    dispatch(claimLoading(null));

    try {
        if (!web3.utils.isAddress(publicKey)) {
            throw new Error('Please check your wallet address');
        }

        let privKey = privateKey.trim();
        if (privKey.substr(0, 2) === '0x') {
            privKey = privKey.slice(2);
        }

        const account = web3.eth.accounts.privateKeyToAccount(`0x${privKey}`);
        const coinbase = account.address;

        if (!coinbase) {
            throw new Error('Could not load wallet');
        }

        await dispatch(saveClaimPrivateKey(privKey));

        dispatch(updateClaimData({coinbase}));
        dispatch(setPrivateKey(privKey));
        dispatch(setCoinbase(coinbase));

        dispatch(getClaimBalance());

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};

export const getGasPrice = () => async (disptach, getState) => {
    const {currentClaim, claims} = getState().claim;
    const web3 = claims[currentClaim].web3.instance;

    let gasPrice = utils.toWei('20', 'gwei');
    let egsGasPrice = '0';

    try {
        const egs = await (await fetch('https://ethgasstation.info/json/ethgasAPI.json')).json();
        egsGasPrice = utils.toWei(String(egs.safeLow), 'gwei');
    } catch (error) {}

    try {
        gasPrice = await web3.eth.getGasPrice();
    } catch (error) {}

    // console.log('web3 gasPrice', gasPrice);
    // console.log('ethgasstation gasPrice', egsGasPrice);
    // console.log('max gasPrice', BigNumber.max(gasPrice, egsGasPrice).toString(10));

    return BigNumber.max(gasPrice, egsGasPrice).toString(10);
};

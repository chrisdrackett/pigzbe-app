import {isValidSeed, generateAddressFromSeed} from '../utils/web3';
import BigNumber from 'bignumber.js';
import {utils} from 'web3';
import {updateClaimData, loadClaimPrivateKey, saveClaimPrivateKey} from './claim-data';
import {claimLoading, claimError} from './claim-api';
import {getClaim} from '../selectors';

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
        const claim = getClaim(getState());
        const web3 = claim.web3.instance;
        const contract = claim.contract.instance;
        const eth = claim.eth;

        const accountBalanceWei = await contract.methods.balanceOf(eth.coinbase).call();
        const maxAmount = eth.maxAmount || getMaxNumBurnTokens(getState().config);
        const balanceWei = BigNumber.min(accountBalanceWei, maxAmount).toString(10);
        const balanceWollo = new BigNumber(web3.utils.fromWei(balanceWei, 'ether')).toFixed(7, BigNumber.ROUND_DOWN);

        dispatch({type: CLAIM_ETH_BALANCE, payload: {
            balanceWei,
            balanceWollo,
            maxAmount
        }});
        return true;
    } catch (e) {
        console.log(e);
        dispatch(claimError('Could not get balance'));
        return false;
    }
};

export const setPrivateKey = privateKey => ({type: CLAIM_ETH_PRIVATE_KEY, privateKey});

export const setCoinbase = coinbase => ({type: CLAIM_ETH_COINBASE, coinbase});

export const checkUserCache = data => async dispatch => {
    const {coinbase} = data;
    const privateKey = await dispatch(loadClaimPrivateKey());

    console.log('checkUserCache:');
    console.log('  coinbase', !!coinbase);
    console.log('  privateKey', !!privateKey);

    if (!coinbase || !privateKey) {
        return;
    }

    dispatch(setCoinbase(coinbase));
    dispatch(setPrivateKey(privateKey));

    await dispatch(getClaimBalance());
};

export const addHexPrefix = hexStr => {
    if (hexStr.substr(0, 2) !== '0x') {
        return `0x${hexStr}`;
    }
    return hexStr;
};

export const removeHexPrefix = hexStr => {
    if (hexStr.substr(0, 2) === '0x') {
        return hexStr.slice(2);
    }
    return hexStr;
};

export const userLogin = (mnemonic, publicKey) => async (dispatch, getState) => {
    const claim = getClaim(getState());
    const web3 = claim.web3.instance;

    dispatch(claimLoading(null));
    dispatch(claimError(null));

    try {
        mnemonic = mnemonic.trim();
        publicKey = addHexPrefix(publicKey.trim());

        const validSeed = isValidSeed(mnemonic);
        const validAddress = web3.utils.isAddress(publicKey);

        if (!validSeed || !validAddress) {
            return {validSeed, validAddress};
        }

        const address = generateAddressFromSeed(mnemonic, publicKey);
        const account = web3.eth.accounts.privateKeyToAccount(addHexPrefix(address.privateKey));
        const coinbase = account.address;

        if (!coinbase) {
            return {};
        }

        await dispatch(saveClaimPrivateKey(address.privateKey));

        dispatch(updateClaimData({coinbase}));
        dispatch(setPrivateKey(address.privateKey));
        dispatch(setCoinbase(coinbase));

        const success = await dispatch(getClaimBalance());

        return {success};
    } catch (e) {
        console.log(e);
        dispatch(claimError(e));
        return {};
    }
};

export const userLoginPrivateKey = (privateKey, publicKey) => async (dispatch, getState) => {
    const claim = getClaim(getState());
    const web3 = claim.web3.instance;

    dispatch(claimLoading(null));
    dispatch(claimError(null));

    try {
        privateKey = removeHexPrefix(privateKey.trim());
        publicKey = addHexPrefix(publicKey.trim());

        const validAddress = web3.utils.isAddress(publicKey);

        if (!validAddress) {
            return {validAddress};
        }

        const account = web3.eth.accounts.privateKeyToAccount(addHexPrefix(privateKey));
        const coinbase = account.address;

        if (!coinbase) {
            return {};
        }

        await dispatch(saveClaimPrivateKey(privateKey));

        dispatch(updateClaimData({coinbase}));
        dispatch(setPrivateKey(privateKey));
        dispatch(setCoinbase(coinbase));

        const success = await dispatch(getClaimBalance());

        return {success};
    } catch (e) {
        console.log(e);
        dispatch(claimError(e));
        return {};
    }
};

export const getGasEstimate = () => async (dispatch, getState) => {
    const claim = getClaim(getState());
    const contract = claim.contract.instance;
    const eth = claim.eth;
    const amountBurn = eth.balanceWei;

    dispatch(claimError(null));

    let estimatedCost = null;
    try {
        const gasPrice = await dispatch(getGasPrice());
        const estimatedGas = await contract.methods.burn(amountBurn).estimateGas({from: eth.coinbase});
        estimatedCost = utils.fromWei(String(estimatedGas * gasPrice), 'ether');
    } catch (e) {
        return null;
    }

    let estimatedCostUSD = '';
    try {
        const exchange = await (await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,GBP,EUR,JPY')).json();
        estimatedCostUSD = (exchange.USD * Number(estimatedCost)).toFixed(2);
    } catch (e) {}

    return {
        estimatedCost,
        estimatedCostUSD
    };
};

export const getGasPrice = () => async (disptach, getState) => {
    const claim = getClaim(getState());
    const web3 = claim.web3.instance;

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

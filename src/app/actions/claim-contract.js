import Tx from 'ethereumjs-tx';
import {watchConfirmations} from '../utils/web3';
import {NUM_VALIDATIONS} from '../constants';
import {apiURL} from '../selectors';
import {getClaimBalance, getGasPrice} from './claim-eth';
import {loadClaimData, updateClaimData} from './claim-data';
import {claimLoading, claimError, validateClaim} from './claim-api';

export const CLAIM_INIT_WEB3 = 'CLAIM_INIT_WEB3';
export const CLAIM_CONTRACT_UPDATE = 'CLAIM_CONTRACT_UPDATE';
export const CLAIM_BURNED = 'CLAIM_BURNED';

const getContract = () => async (dispatch, getState) => {

    console.log('getContract');

    try {
        const {network, ethereum} = getState().config;
        const {currentClaim, claims} = getState().claim;
        const {web3: {instance: web3}, eth: {coinbase}} = claims[currentClaim];

        console.log('network:', network);
        console.log('ethereum:', ethereum);

        const address = ethereum.networks[network].address.trim();

        console.log('address', address);

        // const gasPrice = await web3.eth.getGasPrice();
        const gasPrice = await dispatch(getGasPrice());
        console.log('contract gasPrice', gasPrice);

        const deployedContract = new web3.eth.Contract(ethereum.abi, address, {
            gasPrice,
            gas: 6721975,
        });

        console.log(deployedContract);

        const results = await Promise.all([
            deployedContract.methods.totalSupply().call(),
            deployedContract.methods.name().call(),
            deployedContract.methods.symbol().call(),
            deployedContract.methods.owner().call()
        ]);

        console.log(results);

        dispatch({
            type: CLAIM_CONTRACT_UPDATE,
            payload: {
                owner: results[3],
                instance: deployedContract,
                address: address,
                abi: deployedContract.abi,
                supply: results[0],
                name: results[1],
                symbol: results[2]
            }
        });

        if (coinbase) {
            dispatch(getClaimBalance());
        }

        dispatch(loadClaimData());

        return null;
    } catch (e) {
        console.log(e);
        return dispatch(claimError(e));
    }
};

export const initWeb3 = () => async (dispatch, getState) => {
    const {network, ethereum} = getState().config;
    const {rpc} = ethereum.networks[network];

    dispatch({
        type: CLAIM_INIT_WEB3,
        payload: {network, rpc}
    });

    await dispatch(getContract());
};

const sendSignedTransaction = (web3, serializedTx, error) => new Promise(async (resolve, reject) => {
    await web3.eth.sendSignedTransaction(serializedTx)
        .on('transactionHash', (hash) => {
            resolve(hash);
        })
        .on('error', (e) => {
            console.log('error', e);
            reject(error);
        });
});

export const burn = () => async (dispatch, getState) => {
    const api = apiURL(getState());
    const {publicKey} = getState().keys;
    const {network} = getState().config;

    const {currentClaim, claims} = getState().claim;
    const claim = claims[currentClaim];
    const {address, instance} = claim.contract;
    const {coinbase, privateKey, balanceWei: amount} = claim.eth;
    const claimData = claim.data;
    const web3 = claim.web3.instance;

    console.log('BURN', amount);

    // return

    dispatch(claimError(null));
    dispatch(claimLoading('Waiting for network confirmation'));

    try {

        if (!claimData.started) {
            console.log(`${api}/stellar`);
            const payload = await (await fetch(`${api}/stellar`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    pk: publicKey,
                    eth: coinbase,
                    value: amount,
                })
            })).json();

            console.log(payload);

            if (payload.error) {
                console.log('payload error', payload.error);
                dispatch(claimError('Error creating Stellar account'));
                return;
            }

            dispatch(updateClaimData({
                ethAddress: coinbase,
                value: amount,
                started: true,
            }));
        }

        let transactionHash;

        if (!claimData.transactionHash) {
            const bufferPrivateKey = new Buffer(privateKey, 'hex');
            const data = instance.methods.burn(amount).encodeABI();

            const gasPrice = await dispatch(getGasPrice());
            console.log('burn gasPrice', gasPrice);

            const rawTx = {
                nonce: web3.utils.toHex(await web3.eth.getTransactionCount(coinbase)),
                gasPrice: web3.utils.toHex(gasPrice),
                gasLimit: web3.utils.toHex(4700000),
                value: web3.utils.toHex(0),
                to: address,
                from: coinbase,
                data
            };

            const tx = new Tx(rawTx);
            tx.sign(bufferPrivateKey);
            const serializedTx = '0x' + tx.serialize().toString('hex');

            // TODO: if user quits while this is awaiting do we end up duping transactions?
            // could we save nonce and resubmit with higher gas?
            // or should we search for an existing transaction?

            transactionHash = await sendSignedTransaction(web3, serializedTx, 'Transaction failed');

            console.log('transactionHash', transactionHash);

            dispatch(updateClaimData({
                transactionHash: transactionHash
            }));

            dispatch(claimLoading('Transaction accepted!\n\nWaiting for network confirmations\n\nThis step can take a while, it\'s safe to come back later'));

            if (!transactionHash) {
                dispatch(claimError('Transaction failed'));
                // setTimeout(dispatch, 6000, {type: LOADING, payload: null});
                return;
            }
        } else {
            transactionHash = claimData.transactionHash;
        }

        if (!claimData.burned) {
            dispatch(claimLoading('Transaction accepted!\n\nWaiting for network confirmations\n\nThis step can take a while, it\'s safe to come back later'));
            console.log(transactionHash);

            const validations = NUM_VALIDATIONS;

            const onValidatedBlock = (blocks) => dispatch(claimLoading(`Blocks confirmed: ${blocks} / ${validations}\n\nThis step can take a while, it\'s safe to come back later`));
            console.log('network', network);
            console.log('web3', !!web3);
            console.log('transactionHash', transactionHash);

            const validateTransaction = await watchConfirmations({
                network,
                web3,
                transactionHash,
                validations,
                onValidatedBlock
            });

            console.log('validateTransaction', validateTransaction);

            if (validateTransaction.from.toLowerCase() !== coinbase.toLowerCase()) {
                console.log('error', validateTransaction);
                dispatch(claimError('Ethereum transaction invalid'));
                // setTimeout(dispatch, 4000, {type: LOADING, payload: null});
                return;
            }

            console.log(validateTransaction);

            dispatch(claimLoading('ERC20 Tokens burned, transfering Wollo'));

            dispatch(updateClaimData({
                burned: true
            }));

            dispatch({type: CLAIM_BURNED, transactionHash});
        }

        console.log('burned');

        // dispatch(getActivity());
        dispatch(validateClaim());

    } catch (e) {
        console.log(e);
        dispatch(claimError(e.message || e));
    }
};

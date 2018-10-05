import Tx from 'ethereumjs-tx';
import {watchConfirmations} from '../utils/web3';
import {NUM_VALIDATIONS} from '../constants';
import {apiURL} from '../selectors';
import {loadPrivateKey, getClaimBalance, getGasPrice} from './claim-eth';
import {loadClaimData, updateClaimData} from './claim-data';
import {claimLoading, claimError, validate} from './claim-api';

export const CLAIM_INIT_WEB3 = 'CLAIM_INIT_WEB3';
export const CLAIM_CONTRACT_UPDATE = 'CLAIM_CONTRACT_UPDATE';
export const CLAIM_BURNED = 'CLAIM_BURNED';

const getContract = () => async (dispatch, getState) => {

    console.log('getContract');

    try {
        const {network, ethereum} = getState().config;
        const web3 = getState().web3.instance;
        const {coinbase} = getState().eth;

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
    console.log('changeNetwork');
    const {network, ethereum} = getState().config;
    const {rpc} = ethereum.networks[network];
    console.log('rpc', rpc);
    dispatch({
        type: CLAIM_INIT_WEB3,
        payload: {network, rpc}
    });

    await dispatch(getContract());

    await dispatch(loadPrivateKey());
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

export const burn = (amount) => async (dispatch, getState) => {
    const {publicKey} = getState().keys;
    const {address, instance} = getState().contract;
    const {coinbase, privateKey} = getState().eth;
    const {claimData} = getState();
    const {network} = getState().config;
    const web3 = getState().web3.instance;
    const api = apiURL(getState());

    dispatch(claimLoading('Waiting Ethereum network confirmation'));

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

            transactionHash = await sendSignedTransaction(web3, serializedTx, 'An error occurred when burning your tokens');

            dispatch(updateClaimData({
                transactionHash: transactionHash
            }));

            dispatch(claimLoading('Transaction accepted!\n\nWaiting for network confirmations\n\nThis step can take a while, it\'s safe to come back later'));

            if (!transactionHash) {
                dispatch(claimError('An error occurred when burning your tokens'));
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

            const validateTransaction = await watchConfirmations({
                network,
                web3,
                transactionHash,
                validations,
                onValidatedBlock
            });

            if (validateTransaction.from.toLowerCase() !== coinbase.toLowerCase()) {
                console.log('error', validateTransaction);
                dispatch(claimError('Ethereum Transaction invalid'));
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
        dispatch(validate());

    } catch (e) {
        console.log(e);
        dispatch(claimError(e.message));
    }
};

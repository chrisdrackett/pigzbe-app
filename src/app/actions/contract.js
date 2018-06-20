import Tx from 'ethereumjs-tx';
import {
    ERROR,
    CONTRACT_UPDATE,
    LOADING,
    STELLAR,
    PRIVATE_KEY,
    NETWORK_CHANGE,
    LOCAL_STORAGE,
    BURNED,
} from '../constants/action-types';
import getAPIURL from '../utils/api-url';
import {watchConfirmations} from '../utils/web3';
import Contract from '../constants/contract';
import {getBalance} from './eth';
import {validate} from './api';
import {loadLocalStorage} from './content';
import {NUM_VALIDATIONS} from '../constants';
import {Keypair} from '@pigzbe/stellar-utils';
import Config from 'react-native-config';
import Keychain from '../utils/keychain';
import {KEYCHAIN_ID_STELLAR_KEY, KEYCHAIN_ID_ETH_KEY} from '../constants';

const getContract = () => async (dispatch, getState) => {

    console.log('getContract');

    try {
        const {network} = getState().contract;
        const web3 = getState().web3.instance;
        const {coinbase} = getState().user;

        console.log('contract.network:', network);

        const deployedContract = new web3.eth.Contract(Contract[network].ABI, Contract[network].ADDRESS, {
            gasPrice: await web3.eth.getGasPrice(),
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
            type: CONTRACT_UPDATE,
            payload: {
                owner: results[3],
                instance: deployedContract,
                address: Contract[network].ADDRESS,
                abi: deployedContract.abi,
                supply: results[0],
                name: results[1],
                symbol: results[2]
            }
        });

        if (coinbase) {
            dispatch(getBalance());
        }

        dispatch(loadLocalStorage());

        return null;
    } catch (e) {
        console.log(e);
        return dispatch({
            type: ERROR,
            payload: e,
        });
    }
};

const getKeys = () => async dispatch => {
    console.log('INIT KEYS');
    try {
        const stellar = await Keychain.load(KEYCHAIN_ID_STELLAR_KEY);
        const eth = await Keychain.load(KEYCHAIN_ID_ETH_KEY);

        if (stellar.key) {
            const keypair = Keypair.fromSecret(stellar.key);
            console.log('INIT KEYS STELLAR', keypair.publicKey());

            dispatch({type: STELLAR, payload: {
                pk: keypair.publicKey(),
                sk: keypair.secret()
            }});
        }

        if (eth.key) {
            console.log('INIT KEYS ETHER', eth.key);
            dispatch({type: PRIVATE_KEY, payload: {
                privateKey: eth.key
            }});
        }

        return true;
    } catch (e) {
        return false;
    }
};

export const init = (network) => async (dispatch) => {
    console.log('changeNetwork');
    dispatch({
        type: NETWORK_CHANGE,
        payload: network
    });

    await dispatch(getContract());

    await dispatch(getKeys());
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
    const {address, instance} = getState().contract;
    const {coinbase, stellar, privateKey} = getState().user;
    const {localStorage} = getState().content;
    const web3 = getState().web3.instance;

    dispatch({type: LOADING, payload: 'Waiting Ethereum network confirmation'});

    try {
        const result = await Keychain.load(KEYCHAIN_ID_STELLAR_KEY);
        const keypair = (stellar && stellar.sk && Keypair.fromSecret(stellar.sk)) || await Keypair.randomAsync();

        console.log('keypair', keypair.publicKey());

        if (!result.key) {
            await Keychain.save(KEYCHAIN_ID_STELLAR_KEY, keypair.secret());
        }

        dispatch({type: STELLAR, payload: {
            pk: keypair.publicKey(),
            sk: keypair.secret()
        }});

        if (!localStorage.started) {
            console.log(`${getAPIURL()}/stellar`);
            const payload = await (await fetch(`${getAPIURL()}/stellar`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    pk: keypair.publicKey(),
                    eth: coinbase,
                    value: amount,
                })
            })).json();

            console.log(payload);

            if (payload.error) {
                console.log('payload error', payload.error);
                // dispatch({type: ERROR, payload});
                dispatch({type: ERROR, payload: 'Error creating Stellar account'});
                // setTimeout(dispatch, 4000, {type: LOADING, payload: null});
                return;
            }

            dispatch({
                type: LOCAL_STORAGE,
                payload: {
                    stellar: {pk: keypair.publicKey()},
                    ethAddress: coinbase,
                    value: amount,
                    started: true,
                }
            });
        }

        let transactionHash;

        if (!localStorage.transactionHash) {
            const bufferPrivateKey = new Buffer(privateKey, 'hex');
            const data = instance.methods.burn(amount).encodeABI();

            const rawTx = {
                nonce: web3.utils.toHex(await web3.eth.getTransactionCount(coinbase)),
                gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
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

            dispatch({
                type: LOCAL_STORAGE,
                payload: {
                    transactionHash: transactionHash
                }
            });

            dispatch({type: LOADING, payload: 'Transaction accepted!\n\nWaiting for network confirmations\n\nThis step can take a while, it\'s safe to come back later'});

            if (!transactionHash) {
                dispatch({type: ERROR, payload: 'An error occurred when burning your tokens'});
                // setTimeout(dispatch, 6000, {type: LOADING, payload: null});
                return;
            }
        } else {
            transactionHash = localStorage.transactionHash;
        }

        if (!localStorage.burned) {
            dispatch({type: LOADING, payload: 'Transaction accepted!\n\nWaiting for network confirmations\n\nThis step can take a while, it\'s safe to come back later'});
            console.log(transactionHash);

            const validations = Config.NUM_VALIDATIONS || NUM_VALIDATIONS;

            const onValidatedBlock = (blocks) => dispatch({type: LOADING, payload: `Blocks confirmed: ${blocks} / ${validations}\n\nThis step can take a while, it\'s safe to come back later`});

            const validateTransaction = await watchConfirmations({
                web3,
                transactionHash,
                validations,
                onValidatedBlock
            });

            if (validateTransaction.from.toLowerCase() !== coinbase.toLowerCase()) {
                console.log('error', validateTransaction);
                dispatch({type: ERROR, payload: 'Ethereum Transaction invalid'});
                // setTimeout(dispatch, 4000, {type: LOADING, payload: null});
                return;
            }

            console.log(validateTransaction);

            dispatch({
                type: LOADING,
                payload: 'ERC20 Tokens burned, transfering Wollo',
            });

            dispatch({
                type: LOCAL_STORAGE,
                payload: {
                    burned: true
                }
            });

            dispatch({
                type: BURNED,
                payload: transactionHash
            });
        }

        console.log('burned');

        // dispatch(getActivity());
        dispatch(validate());

    } catch (e) {
        console.log(e);
        dispatch({type: ERROR, payload: e});
    }
};

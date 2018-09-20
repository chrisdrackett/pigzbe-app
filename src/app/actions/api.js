import {apiURL} from '../selectors';
import {
    ERROR,
    CLAIM,
    TRANSFER,
    LOADING,
    LOCAL_STORAGE
} from '../constants/action-types';
import {getBalance} from './eth';
import {trustStellarAsset} from './stellar';

export const validate = () => async (dispatch, getState) => {
    const {stellar} = getState().user;
    const {localStorage} = getState().content;
    const transactionHash = localStorage.transactionHash || getState().events.transactionHash;
    const api = apiURL(getState());

    console.log('validate');
    console.log(transactionHash);

    dispatch({type: LOADING, payload: 'Finishing Ethereum validation'});

    try {
        let payload;

        if (!(localStorage.stellarAccount && localStorage.receipt)) {
            payload = await (await fetch(`${api}/claim`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    tx: transactionHash,
                    pk: stellar.pk,
                })
            })).json();

            if (payload.error) {
                console.log(payload);
                dispatch({type: ERROR, payload: 'Invalid transaction'});
                setTimeout(dispatch, 5000, {type: LOADING, payload: null});
                return;
            }

            console.log(payload);

            dispatch({
                type: LOCAL_STORAGE,
                payload: {
                    stellarAccount: {pk: payload.stellar.pk},
                    receipt: payload.receipt,
                }
            });

        } else {
            payload = {
                stellar: localStorage.stellarAccount,
                receipt: localStorage.receipt,
            };
        }

        dispatch({type: CLAIM, payload});
        dispatch(trustStellarAsset());
    } catch (e) {
        console.log(e);
        dispatch({type: ERROR, payload: e});
    }
};

export const claim = () => async (dispatch, getState) => {
    const {stellar} = getState().user;
    const {localStorage} = getState().content;
    const transactionHash = localStorage.transactionHash || getState().events.transactionHash;
    const api = apiURL(getState());

    dispatch({type: LOADING, payload: 'Validating Ethereum Transaction'});

    console.log('stellar.pk', stellar.pk);

    try {
        let payload;

        if (!localStorage.complete) {
            payload = await (await fetch(`${api}/transfer`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    tx: transactionHash,
                    pk: stellar.pk,
                })
            })).json();

            console.log(payload);

            if (payload.error) {
                if (payload.error === 1) {
                    dispatch({type: ERROR, payload: 'Payment already made'});
                } else {
                    dispatch({type: ERROR, payload: payload.message});
                }
                return;
            }

            dispatch({
                type: LOCAL_STORAGE,
                payload: {
                    transfer: payload,
                }
            });

        } else {
            payload = localStorage.transfer;
        }

        dispatch({type: TRANSFER, payload});
        dispatch(getBalance());
        // dispatch(getActivity());
        dispatch({type: LOADING, payload: 'Transfer Wollo Complete'});
        setTimeout(dispatch, 2000, {
            type: LOADING,
            payload: null,
        });

        dispatch({
            type: LOCAL_STORAGE,
            payload: {
                complete: true,
            }
        });
    } catch (e) {
        console.log(e);
        dispatch({type: ERROR, payload: e});
    }
};

import {apiURL, wolloAsset} from '../selectors';
import {trustAsset} from '@pigzbe/stellar-utils';
import {getClaimBalance} from './claim-eth';
import {updateClaimData} from './claim-data';

export const CLAIM_LOADING = 'CLAIM_LOADING';
export const CLAIM_ERROR = 'CLAIM_ERROR';
export const CLAIM_TRANSFER = 'CLAIM_TRANSFER';
// export const CLAIM_CLAIM = 'CLAIM_CLAIM';

export const claimLoading = payload => ({type: CLAIM_LOADING, payload});

export const claimError = payload => async dispatch => {
    dispatch({type: CLAIM_ERROR, payload});
    dispatch(updateClaimData({error: payload}));
};

export const validate = () => async (dispatch, getState) => {
    const {publicKey} = getState().keys;
    const {claimData} = getState();
    const transactionHash = claimData.transactionHash || getState().events.transactionHash;
    const api = apiURL(getState());

    console.log('validate');
    console.log(transactionHash);

    dispatch(claimLoading('Finishing validation'));

    try {
        let payload;

        if (!(claimData.stellarAccount && claimData.receipt)) {
            payload = await (await fetch(`${api}/claim`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    tx: transactionHash,
                    pk: publicKey,
                })
            })).json();

            if (payload.error) {
                console.log(payload);
                dispatch(claimError('Invalid transaction'));
                setTimeout(() => dispatch(claimLoading(null)), 5000);
                return;
            }

            console.log(payload);

            dispatch(updateClaimData({
                stellarAccount: payload.stellar.pk,
                receipt: payload.receipt,
            }));

        } else {
            payload = {
                stellar: claimData.stellarAccount,
                receipt: claimData.receipt,
            };
        }

        // dispatch({type: CLAIM_CLAIM, payload});
        dispatch(trustStellarAsset());
    } catch (e) {
        console.log(e);
        dispatch(claimError(e));
    }
};

export const claim = () => async (dispatch, getState) => {
    const {publicKey} = getState().keys;
    const {claimData} = getState();
    const transactionHash = claimData.transactionHash || getState().events.transactionHash;
    const api = apiURL(getState());

    dispatch(claimLoading('Validating Transaction'));

    console.log('stellar publicKey', publicKey);

    try {
        let payload;

        if (!claimData.complete) {
            payload = await (await fetch(`${api}/transfer`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    tx: transactionHash,
                    pk: publicKey,
                })
            })).json();

            console.log(payload);

            if (payload.error) {
                if (payload.error === 1) {
                    dispatch(claimError('Payment already made'));
                } else {
                    dispatch(claimError(payload.message));
                }
                return;
            }

            dispatch(updateClaimData({
                transfer: payload,
            }));

        } else {
            payload = claimData.transfer;
        }

        dispatch({type: CLAIM_TRANSFER, payload});
        dispatch(getClaimBalance());

        dispatch(claimLoading('Transfer Wollo Complete'));

        setTimeout(() => dispatch(claimLoading(null)), 2000);

        dispatch(updateClaimData({
            complete: true,
        }));

    } catch (e) {
        console.log(e);
        dispatch(claimError(e));
    }
};

export const trustStellarAsset = () => async (dispatch, getState) => {
    const {claimData} = getState();
    const {secretKey} = getState().keys;

    dispatch(claimLoading('Trusting WLO asset'));

    try {
        if (!claimData.wolloTrusted) {
            const asset = wolloAsset(getState());
            await trustAsset(secretKey, asset);

            dispatch(claimLoading('WLO asset trusted'));

            dispatch(updateClaimData({
                wolloTrusted: true,
            }));
        }

        dispatch(claim());

    } catch (e) {
        console.log(e);
        dispatch(claimError('Error trusting Stellar asset'));
    }
};

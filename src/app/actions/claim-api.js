import {apiURL, wolloAsset, getClaim, claimToken} from '../selectors';
import {trustAsset} from '@pigzbe/stellar-utils';
import {
    getClaimBalance,
    updateClaimBalance,
    storeLoginDetails,
    updateClaimData,
    flagClaimDataForReload,
    stayLoggedIn
} from './';

export const CLAIM_START = 'CLAIM_START';
export const CLAIM_LOADING = 'CLAIM_LOADING';
export const CLAIM_ERROR = 'CLAIM_ERROR';
export const CLAIM_TRANSFER = 'CLAIM_TRANSFER';

export const claimStart = currentClaim => ({type: CLAIM_START, currentClaim});

export const claimStop = () => dispatch => dispatch(flagClaimDataForReload());

export const claimLoading = payload => ({type: CLAIM_LOADING, payload});

export const claimError = payload => async dispatch => {
    dispatch({type: CLAIM_ERROR, payload});
    dispatch(updateClaimData({error: payload}));
};

export const validateClaim = () => async (dispatch, getState) => {
    const {publicKey} = getState().keys;
    const {data, events} = getClaim(getState());
    const tokenName = claimToken(getState());
    const transactionHash = data.transactionHash || events.transactionHash;
    const api = apiURL(getState());

    console.log('validateClaim');
    console.log(transactionHash);

    dispatch(claimLoading('Finishing validation'));

    try {
        let payload;

        if (!(data.stellarAccount && data.receipt)) {
            console.log('api', api);
            console.log('tokenName', tokenName);
            payload = await (await fetch(`${api}/claim`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    tk: tokenName,
                    tx: transactionHash,
                    pk: publicKey,
                })
            })).json();

            if (payload.error) {
                console.log('Claim error:');
                console.log(payload);
                if (payload.message && payload.message.includes('createUserAccount')) {
                    dispatch(claimError('Could not create user account'));
                } else {
                    dispatch(claimError('Invalid transaction'));
                }
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
                stellar: data.stellarAccount,
                receipt: data.receipt,
            };
        }

        const trustlineCreated = await dispatch(trustStellarAsset());
        if (trustlineCreated) {
            dispatch(claim());
        }
    } catch (e) {
        console.log(e);
        dispatch(claimError(e));
    }
};

export const claim = () => async (dispatch, getState) => {
    const api = apiURL(getState());
    const {publicKey} = getState().keys;
    const tokenName = claimToken(getState());
    const currentClaim = getClaim(getState());
    const claimData = currentClaim.data;
    const events = currentClaim.events;
    const transactionHash = claimData.transactionHash || events.transactionHash;

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
                    tk: tokenName,
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
    const {secretKey} = getState().keys;
    const currentClaim = getClaim(getState());
    const claimData = currentClaim.data;

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
        return true;
    } catch (e) {
        console.log(e);
        dispatch(claimError('Error trusting Stellar asset'));
        return false;
    }
};

export const getAirdropClaim = (address, code) => async (dispatch, getState) => {
    try {
        const api = apiURL(getState());
        const result = await (await fetch(`${api}/airdrop/confirm?address=${address}&code=${code}`)).json();

        if (!result.error) {
            await dispatch(storeLoginDetails(code, address));
            await dispatch(updateClaimBalance({balanceWollo: result.amount}));
        }
        return {success: !result.error, ...result};
    } catch (e) {
        return {success: false, error: e.message};
    }
};

export const claimAirdrop = () => async (dispatch, getState) => {
    const {publicKey} = getState().keys;
    const {data, events, eth} = getClaim(getState());
    const tokenName = claimToken(getState());
    const transactionHash = data.transactionHash || events.transactionHash;
    const api = apiURL(getState());

    console.log('---> validateClaim');
    console.log('  transactionHash', transactionHash);
    console.log('  data.stellarAccount', data.stellarAccount);
    console.log('  data.receipt', data.receipt);

    dispatch(stayLoggedIn(true));
    dispatch(claimLoading('Validating claim'));

    try {
        if (!(data.stellarAccount && data.receipt)) {
            console.log('api', api);
            console.log('tokenName', tokenName);
            const payload = await (await fetch(`${api}/airdrop/claim`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    pk: publicKey,
                    address: eth.coinbase,
                    code: eth.privateKey,
                })
            })).json();

            if (payload.error) {
                if (payload.message && payload.message.includes('createStellarAccount')) {
                    dispatch(claimError('Could not create account'));
                } else {
                    dispatch(claimError('Claim failed'));
                }
                setTimeout(() => dispatch(claimLoading(null)), 5000);
                dispatch(stayLoggedIn(false));
                return;
            }

            console.log('claim payload:');
            console.log(payload);

            await dispatch(updateClaimData({
                stellarAccount: payload.stellar.pk,
                receipt: payload,
                started: true,
                ethAddress: eth.coinbase,
            }));
        }

        const trustlineCreated = await dispatch(trustStellarAsset());
        if (trustlineCreated) {
            dispatch(claimLoading('Transferring Wollo'));

            const payload = await (await fetch(`${api}/airdrop/transfer`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    address: eth.coinbase,
                    code: eth.privateKey,
                })
            })).json();

            console.log('transfer payload', payload);

            if (payload.error) {
                throw new Error(payload.message);
            }

            dispatch(claimLoading('Transfer Wollo Complete'));

            setTimeout(() => dispatch(claimLoading(null)), 2000);

            dispatch(updateClaimData({
                complete: true,
            }));
        }
    } catch (e) {
        console.log(e);
        dispatch(claimError(e));
    }
    dispatch(stayLoggedIn(false));
};

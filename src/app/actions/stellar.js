import {Asset, trustAsset} from '@pigzbe/stellar-utils';
import {claim} from './api';
import {LOADING, LOCAL_STORAGE, ERROR} from '../constants/action-types';

export const trustStellarAsset = () => async (dispatch, getState) => {
    const {localStorage} = getState().content;
    const {network, stellar} = getState().config;
    const {code, address} = stellar.networks[network];
    const {user} = getState();

    dispatch({
        type: LOADING,
        payload: 'Trusting WLO asset',
    });

    try {
        if (!localStorage.wolloTrusted) {
            const asset = new Asset(code, address);
            await trustAsset(user.stellar.sk, asset);
            dispatch({
                type: LOADING,
                payload: 'WLO asset trusted',
            });

            dispatch({
                type: LOCAL_STORAGE,
                payload: {
                    wolloTrusted: true,
                }
            });
        }

        dispatch(claim());

    } catch (e) {
        console.log(e);
        dispatch({
            type: ERROR,
            payload: 'Error trusting Stellar asset',
        });
    }


};

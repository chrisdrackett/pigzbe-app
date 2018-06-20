import {Asset, trustAsset} from '@pigzbe/stellar-utils';
import {claim} from './api';
import {LOADING, LOCAL_STORAGE, ERROR} from '../constants/action-types';
import Config from 'react-native-config';

export const trustStellarAsset = () => async (dispatch, getState) => {
    const {localStorage} = getState().content;

    dispatch({
        type: LOADING,
        payload: 'Trusting WLO asset',
    });

    try {
        if (!localStorage.wolloTrusted) {
            const {stellar} = getState().user;
            console.log('stellar', stellar);
            const asset = new Asset(Config.STELLAR_TOKEN_CODE, Config.STELLAR_TOKEN_ISSUER);
            await trustAsset(stellar.sk, asset);
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

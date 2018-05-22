import apiURL from '../utils/api-url';
import {COINS} from '../constants';

export const EXCHANGE_LOAD = 'EXCHANGE_LOAD';

export const getExchange = () => async (dispatch) => {

    try {
        const values = await (await fetch(`${apiURL()}/compare?coins=${COINS.toString()}`, {
            method: 'GET'
        })).json();

        dispatch({type: EXCHANGE_LOAD, payload: {
            exchange: values,
            error: null
        }});

    } catch (error) {
        dispatch({type: EXCHANGE_LOAD, payload: {
            exchange: null,
            error: new Error('Network error')
        }});
    }
};

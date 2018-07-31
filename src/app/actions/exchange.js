import {COINS} from '../constants';
import {apiURL} from '../selectors';

export const EXCHANGE_LOAD = 'EXCHANGE_LOAD';

export const loadExchange = () => async (dispatch, getState) => {
    console.log('9. loadExchange');
    try {
        const api = apiURL(getState());
        const values = await (await fetch(`${api}/compare?coins=${COINS.toString()}`)).json();

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

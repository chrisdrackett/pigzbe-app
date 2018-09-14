import {CURRENCIES} from '../constants';
import {apiURL} from '../selectors';

export const EXCHANGE_LOAD = 'EXCHANGE_LOAD';

export const loadExchange = () => async (dispatch, getState) => {
    try {
        const api = apiURL(getState());
        const coins = Object.keys(CURRENCIES).toString();
        const values = await (await fetch(`${api}/compare?coins=${coins}`)).json();

        dispatch({type: EXCHANGE_LOAD, payload: {
            exchange: values,
            error: null
        }});

    } catch (error) {
        dispatch({type: EXCHANGE_LOAD, payload: {
            exchange: null,
            error: new Error('Could not load exchange')
        }});
    }
};

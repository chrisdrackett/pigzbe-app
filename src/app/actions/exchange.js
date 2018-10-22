import Storage from '../utils/storage';
import {CURRENCIES, STORAGE_KEY_EXCHANGE} from '../constants';
import {apiURL} from '../selectors';

export const EXCHANGE_LOAD = 'EXCHANGE_LOAD';

export const loadCachedExchange = () => async (dispatch) => {
    try {
        const data = await Storage.load(STORAGE_KEY_EXCHANGE);
        if (data && Object.keys(data).length > 0) {
            dispatch({type: EXCHANGE_LOAD, payload: {
                exchange: data,
            }});
        }
    } catch (error) {
        console.log(error);
    }
};

export const loadExchange = () => async (dispatch, getState) => {
    try {
        const api = apiURL(getState());
        const coins = Object.keys(CURRENCIES).toString();
        const values = await (await fetch(`${api}/compare?coins=${coins}`)).json();

        dispatch({type: EXCHANGE_LOAD, payload: {
            exchange: values,
        }});

        await Storage.save(STORAGE_KEY_EXCHANGE, values);

        return true;
    } catch (error) {
        return false;
    }
};


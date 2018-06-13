import {LOCAL_STORAGE} from '../constants/action-types';
import {
    // clear,
    load
} from '../utils/storage';

export const loadLocalStorage = () => async (dispatch) => {
    console.log('loadLocalStorage');
    const payload = await load('burning');
    console.log('AAAAAAA', payload);
    dispatch({
        type: LOCAL_STORAGE,
        payload
    });
};

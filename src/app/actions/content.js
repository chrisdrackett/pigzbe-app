import {LOCAL_STORAGE} from '../constants/action-types';
import {
    // clear,
    load
} from '../utils/storage';
import {checkUserCache} from './eth';

export const loadLocalStorage = () => async (dispatch) => {
    const payload = await load('burning');
    dispatch({
        type: LOCAL_STORAGE,
        payload
    });

    dispatch(checkUserCache());
};

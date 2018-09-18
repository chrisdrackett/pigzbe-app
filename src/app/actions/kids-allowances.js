import {saveKids} from './';

export const KIDS_ADD_ALLOWANCE = 'KIDS_ADD_ALLOWANCE';
export const KIDS_DELETE_ALLOWANCE = 'KIDS_DELETE_ALLOWANCE';
export const KIDS_LOADING_ALLOWANCE = 'KIDS_LOADING_ALLOWANCE';

const allowanceLoading = value => ({type: KIDS_LOADING_ALLOWANCE, value});

export const addAllowance = (kid, amount, interval, day) => async dispatch => {
    console.log('addAllowance amount =', amount);
    dispatch(allowanceLoading(true));

    dispatch(({type: KIDS_ADD_ALLOWANCE, kid, data: {amount, interval, day}}));
    // await dispatch(addAllowance());
    await dispatch(saveKids());
    dispatch(allowanceLoading(false));
};

export const deleteAllowance = (kid, allowance) => async dispatch => {
    dispatch(allowanceLoading(true));
    dispatch(({type: KIDS_DELETE_ALLOWANCE, data: {kid, allowance}}));
    // await dispatch(deleteAllowance());
    await dispatch(saveKids());
    dispatch(allowanceLoading(false));
};

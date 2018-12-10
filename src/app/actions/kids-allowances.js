import {saveKids, appAddSuccessAlert, appAddWarningAlert} from './';
import {handleAllowances, getNextPaymentDate} from 'app/utils/allowances';
import moment from 'moment';

export const KIDS_ADD_ALLOWANCE = 'KIDS_ADD_ALLOWANCE';
export const KIDS_DELETE_ALLOWANCE = 'KIDS_DELETE_ALLOWANCE';
export const KIDS_LOADING_ALLOWANCE = 'KIDS_LOADING_ALLOWANCE';
export const KIDS_UPDATE_ALLOWANCE = 'KIDS_UPDATE_ALLOWANCE';

const allowanceLoading = value => ({type: KIDS_LOADING_ALLOWANCE, value});

export const addAllowance = (kid, amount, interval, day, nextDate, timezone, numKidsAdded) => async (dispatch, getState) => {
    try {
        console.log('addAllowance amount =', amount);
        dispatch(allowanceLoading(true));

        dispatch(({type: KIDS_ADD_ALLOWANCE, kid, data: {amount, interval, day, nextDate, timezone, payments: []}, numKidsAdded}));
        await dispatch(saveKids());
        dispatch(appAddSuccessAlert('Added allowance'));

        // Fire and forget the logic to handle allowances
        handleAllowances({dispatch, getState});
    } catch (error) {
        console.log(error);
        dispatch(appAddWarningAlert('Add allowance has failed'));
    }
    dispatch(allowanceLoading(false));
};

export const deleteAllowance = (kid, allowance) => async dispatch => {
    try {
        dispatch(allowanceLoading(true));
        dispatch(({type: KIDS_DELETE_ALLOWANCE, data: {kid, allowance}}));
        // await dispatch(deleteAllowance());
        await dispatch(saveKids());
        dispatch(appAddSuccessAlert('Deleted allowance'));
    } catch (error) {
        console.log(error);
        dispatch(appAddWarningAlert('Delete allowance has failed'));
    }
    dispatch(allowanceLoading(false));
};

/**
 * Need two seperate actions:
 * - updateAllowance is called when updating the config from the UI
 * - setAllowance is called from the background code to update payments
 */
export const updateAllowance = (kid, allowance) => async (dispatch, getState) => {
    console.log('updateAllowance');
    /**
     * If our updated allowance config has a payment date of today AND this
     * allowance has already paid out for today, then we need to bump the
     * date up to the next occurance to avoid multiple payments in the same day
     */
    const dateToday = moment();
    const nextPaymentDate = moment(allowance.nextDate);

    if (nextPaymentDate.format('L') === dateToday.format('L')) {
        const existingPaymentToday = allowance.payments.some(payment =>
            payment.date && moment(payment.date).format('L') === dateToday.format('L')
        );
        if (existingPaymentToday) {
            allowance.nextDate = getNextPaymentDate({
                lastPaymentDate: nextPaymentDate,
                interval: allowance.interval,
                day: allowance.day,
            }).toISOString();
        }
    }

    dispatch(allowanceLoading(true));
    dispatch(({type: KIDS_UPDATE_ALLOWANCE, data: {kid, allowance}}));
    await dispatch(saveKids());
    // Fire and forget the logic to handle allowances
    await handleAllowances({dispatch, getState}, false);
    dispatch(allowanceLoading(false));
};

export const setAllowance = (kid, allowance) => async dispatch => {
    // dispatch(allowanceLoading(true));
    dispatch(({type: KIDS_UPDATE_ALLOWANCE, data: {kid, allowance}}));
    await dispatch(saveKids());
    // dispatch(allowanceLoading(false));
};

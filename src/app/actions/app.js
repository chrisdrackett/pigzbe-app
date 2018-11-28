import {strings} from 'app/constants';

const getErrorDetail = error => {
    if (!error) {
        return strings.errorUnknown;
    }
    if (typeof error === 'string') {
        return error;
    }
    if (error.message && error.message.title) {
        return error.message.title;
    }
    if (error.message) {
        return error.message;
    }
    return strings.errorUnknown;
};

export const APP_CONNECTION_STATUS = 'APP_CONNECTION_STATUS';
export const APP_ADD_ALERT = 'APP_ADD_ALERT';
export const APP_DELETE_ALERT = 'APP_DELETE_ALERT';
export const APP_STAY_LOGGED_IN = 'APP_STAY_LOGGED_IN';

export const appError = error => {
    if (error === null) {
        return {type: APP_DELETE_ALERT};
    }
    return {type: APP_ADD_ALERT, alertType: 'error', alertMessage: getErrorDetail(error)};
};

export const appAddSuccessAlert = alertMessage => ({type: APP_ADD_ALERT, alertType: 'success', alertMessage});

export const appAddWarningAlert = alertMessage => ({type: APP_ADD_ALERT, alertType: 'warning', alertMessage});

export const appAddAlert = (alertType, alertMessage) => ({type: APP_ADD_ALERT, alertType, alertMessage});

export const appDeleteAlert = () => ({type: APP_DELETE_ALERT});

export const connectionState = isConnected => ({type: APP_CONNECTION_STATUS, isConnected});

export const stayLoggedIn = value => ({type: APP_STAY_LOGGED_IN, value});

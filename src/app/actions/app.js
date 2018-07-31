export const APP_CONNECTION_STATUS = 'APP_CONNECTION_STATUS';
export const APP_ERROR = 'APP_ERROR';

export const appError = error => ({type: APP_ERROR, error});

export const connectionState = isConnected => ({type: APP_CONNECTION_STATUS, isConnected});

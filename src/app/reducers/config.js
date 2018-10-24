import {CONFIG_UPDATE} from '../actions';

export const initialState = {
    network: null,
    ethereum: {},
    stellar: {},
    networkOverride: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CONFIG_UPDATE:
            return {
                ...state,
                ...action.config
            };
        default:
            return state;
    }
};

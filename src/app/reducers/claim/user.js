import {Record} from 'immutable';
import {
    // BUY_PLAYER,
    USER_LOGIN,
    USER_LOGOUT,
    USER_BALANCE,
    STELLAR,
    PRIVATE_KEY,
} from '../../constants/action-types';

const initialState = new Record({
    coinbase: null,
    balanceWei: null,
    balanceWollo: null,
    supply: null,
    loggedIn: false,
    stellar: null,
    privateKey: null,
})();

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGOUT:
            return state
                .set('loggedIn', false)
                .set('coinbase', null);

        case STELLAR:
            return state
                .set('stellar', Object.assign({}, action.payload));

        case PRIVATE_KEY:
            return state
                .set('privateKey', action.payload.privateKey);

        case USER_BALANCE:
            return state
                .set('balanceWei', action.payload.balanceWei)
                .set('balanceWollo', action.payload.balanceWollo);

        case USER_LOGIN:
            return state
                .set('loggedIn', true)
                .set('coinbase', action.payload.coinbase);

        default:
            return state;
    }
};

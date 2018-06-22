import Web3 from 'web3';
import {Record} from 'immutable';
import {
    NETWORK_CHANGE,
} from '../../constants/action-types';

const initialState = new Record({
    instance: null,
})();

export default (state = initialState, action) => {
    switch (action.type) {
        case NETWORK_CHANGE: {
            return state
                .set('instance', new Web3(new Web3.providers.HttpProvider(action.payload.provider)));
        }

        default:
            return state;
    }
};

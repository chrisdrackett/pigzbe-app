import Web3 from 'web3';
import {Record} from 'immutable';
import {
    INIT_WEB3,
} from '../../constants/action-types';

const initialState = new Record({
    instance: null,
})();

export default (state = initialState, action) => {
    switch (action.type) {
        case INIT_WEB3: {
            return state
                .set('instance', new Web3(new Web3.providers.HttpProvider(action.payload.rpc)));
        }

        default:
            return state;
    }
};

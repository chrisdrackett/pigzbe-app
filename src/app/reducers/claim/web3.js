import Web3 from 'web3';
import {CLAIM_INIT_WEB3} from '../../actions/claim-contract';

const initialState = {
    instance: null,
};

export default (state = initialState, action) => {
    if (!action.type) {
        throw new Error('UNDEFINED ACTION TYPE');
    }
    switch (action.type) {
        case CLAIM_INIT_WEB3:
            return {
                ...state,
                instance: new Web3(new Web3.providers.HttpProvider(action.payload.rpc))
            };
        default:
            return state;
    }
};

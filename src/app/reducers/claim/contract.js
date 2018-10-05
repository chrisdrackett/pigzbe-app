import {
    CLAIM_INIT_WEB3,
    CLAIM_CONTRACT_UPDATE,
} from '../../actions/claim-contract';

const initialState = {
    abi: null,
    address: '',
    supply: 0,
    name: '',
    symbol: '',
    owner: '',
    instance: null,
    network: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CLAIM_INIT_WEB3:
            return {
                ...state,
                network: action.payload.network
            };
        case CLAIM_CONTRACT_UPDATE:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

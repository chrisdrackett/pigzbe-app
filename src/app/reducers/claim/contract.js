import {Record} from 'immutable';
import {CONTRACT_UPDATE, INIT_WEB3} from '../../constants/action-types';

const initialState = new Record({
    abi: null,
    address: '',
    supply: 0,
    name: '',
    symbol: '',
    owner: '',
    instance: null,
    network: null,
})();

export default (state = initialState, action) => {
    switch (action.type) {
        case INIT_WEB3:
            console.log('INIT_WEB3', action.payload.network);
            return state
                .set('network', action.payload.network);
        case CONTRACT_UPDATE:
            return state
                .set('instance', action.payload.instance)
                .set('abi', action.payload.abi)
                .set('supply', action.payload.supply)
                .set('name', action.payload.name)
                .set('symbol', action.payload.symbol)
                .set('owner', action.payload.owner)
                .set('address', action.payload.address);

        default:
            return state;
    }
};

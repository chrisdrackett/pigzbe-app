import Web3 from 'web3';

import {ID_AIRDROP, ID_ICO} from '../constants';

import {
    CLAIM_START,
    CLAIM_UPDATE_DATA,
    CLAIM_CLEAR_DATA,
    CLAIM_INIT_WEB3,
    CLAIM_CONTRACT_UPDATE,
    CLAIM_ETH_PRIVATE_KEY,
    CLAIM_ETH_COINBASE,
    CLAIM_ETH_BALANCE,
    CLAIM_BURNED,
    CLAIM_TRANSFER,
    CLAIM_LOADING,
    CLAIM_ERROR,
} from '../actions';

const defaultClaim = {
    data: {},
    contract: {
        abi: null,
        address: '',
        supply: 0,
        name: '',
        symbol: '',
        owner: '',
        instance: null,
        network: null,
    },
    eth: {
        coinbase: null,
        balanceWei: null,
        balanceWollo: null,
        privateKey: null,
        maxAmount: null,
    },
    events: {
        transfer: null,
        loading: null,
        error: null,
        transactionHash: null,
    },
    web3: {
        instance: null,
    }
};

const initialState = {
    currentClaim: null,
    claims: {
        [ID_AIRDROP]: {...defaultClaim},
        [ID_ICO]: {...defaultClaim},
    },
};

const updateClaim = (state, ob) => ({
    ...state,
    claims: {
        ...state.claims,
        [state.currentClaim]: {
            ...state.claims[state.currentClaim],
            ...ob,
        }
    }
});

export default (state = initialState, action) => {
    if (state.currentClaim) {
        console.log('===>', state.currentClaim, action && action.type);
        console.log(state);
    }
    switch (action.type) {
        case CLAIM_START:
            return {
                ...state,
                currentClaim: action.currentClaim,
            };
        case CLAIM_UPDATE_DATA:
            if (!state.currentClaim) {
                return state;
            }
            return updateClaim(state, {
                data: {
                    ...state.claims[state.currentClaim].data,
                    ...action.payload,
                }
            });
        case CLAIM_INIT_WEB3:
            return updateClaim(state, {
                web3: {
                    ...state.claims[state.currentClaim].web3,
                    instance: new Web3(new Web3.providers.HttpProvider(action.payload.rpc))
                },
                contract: {
                    ...state.claims[state.currentClaim].contract,
                    network: action.payload.network
                }
            });
        case CLAIM_CONTRACT_UPDATE:
            return updateClaim(state, {
                contract: {
                    ...state.claims[state.currentClaim].contract,
                    ...action.payload
                }
            });
        case CLAIM_ETH_PRIVATE_KEY:
            return updateClaim(state, {
                eth: {
                    ...state.claims[state.currentClaim].eth,
                    privateKey: action.privateKey
                }
            });
        case CLAIM_ETH_BALANCE:
            return updateClaim(state, {
                eth: {
                    ...state.claims[state.currentClaim].eth,
                    balanceWei: action.payload.balanceWei,
                    balanceWollo: action.payload.balanceWollo,
                    maxAmount: action.payload.maxAmount,
                }
            });
        case CLAIM_ETH_COINBASE:
            return updateClaim(state, {
                eth: {
                    ...state.claims[state.currentClaim].eth,
                    coinbase: action.coinbase,
                }
            });
        case CLAIM_BURNED:
            return updateClaim(state, {
                events: {
                    ...state.claims[state.currentClaim].events,
                    transactionHash: action.transactionHash,
                }
            });
        case CLAIM_ERROR:
            console.log('CLAIM_ERROR', action.payload);
            return updateClaim(state, {
                events: {
                    ...state.claims[state.currentClaim].events,
                    error: action.payload,
                    loading: null,
                }
            });
        case CLAIM_LOADING:
            if (!state.currentClaim) {
                return state;
            }
            return updateClaim(state, {
                events: {
                    ...state.claims[state.currentClaim].events,
                    loading: action.payload
                }
            });
        case CLAIM_TRANSFER:
            return updateClaim(state, {
                events: {
                    ...state.claims[state.currentClaim].events,
                    transfer: action.payload
                }
            });
        case CLAIM_CLEAR_DATA:
            return {
                ...state,
                currentClaim: null,
                claims: Object.keys(state.claims)
                    .reduce((ob, key) => {
                        if (key === state.currentClaim) {
                            ob[key] = {...defaultClaim};
                        } else {
                            ob[key] = state.claims[key];
                        }
                        return ob;
                    }, {})
            };
        default:
            return state;
    }
};

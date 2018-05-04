import {
    ESCROW_SET,
    ESCROW_ACCOUNT,
    ESCROW_TX_VALIDATE,
    ESCROW_TX_RESULT,
    ESCROW_SUBMITTING,
    ESCROW_ERROR
} from '../actions';

export const initialState = {
    destinationPublicKey: null,
    escrowPublicKey: null,
    transactions: [],
    account: null,
    balance: '0',
    submitting: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ESCROW_SET:
            return {
                ...state,
                ...action.escrow
            };
        case ESCROW_ACCOUNT:
            return {
                ...state,
                account: action.account,
                balance: action.balance
            };
        case ESCROW_TX_VALIDATE:
            return {
                ...state,
                transactions: state.transactions.map(t => {
                    if (t.xdr === action.xdr) {
                        return {
                            ...t,
                            validation: action.validation
                        };
                    }
                    return t;
                })
            };
        case ESCROW_TX_RESULT:
            return {
                ...state,
                tx: action.tx
            };
        case ESCROW_SUBMITTING:
            return {
                ...state,
                submitting: action.value
            };
        case ESCROW_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};

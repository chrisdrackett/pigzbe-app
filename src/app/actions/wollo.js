// import Stellar from '../stellar';
import {getServer, setServer} from '../stellar/server';
import {ASSET_CODE} from '../constants';
import {loadContent} from './';

export const WOLLO_USE_TESTNET = 'WOLLO_USE_TESTNET';
export const WOLLO_UPDATE_ACCOUNT = 'WOLLO_UPDATE_ACCOUNT';
export const WOLLO_UPDATE_BALANCE = 'WOLLO_UPDATE_BALANCE';
export const WOLLO_SET_ESCROW = 'WOLLO_SET_ESCROW';

const getWolloBalance = account => {
    const wollo = account.balances.find(b => b.asset_code === ASSET_CODE);
    return wollo ? wollo.balance : '0';
};

export const setUseTestnet = useTestnet => dispatch => {
    setServer(useTestnet);
    dispatch({type: WOLLO_USE_TESTNET, useTestnet});
};

export const updateBalance = balance => ({type: WOLLO_UPDATE_BALANCE, balance});

export const loadAccount = publicKey => dispatch => {
    return getServer().loadAccount(publicKey)
        .then(account => {
            dispatch({type: WOLLO_UPDATE_ACCOUNT, account});
            dispatch(updateBalance(getWolloBalance(account)));
            return account;
        });
};

export const loadEscrow = () => (dispatch, getState) => {
    const {publicKey} = getState().auth;
    return dispatch(loadContent('sys.id=4NWW9JokdOM4S4kAIo6q4q'))
        .then(result => result.items.pop().fields.data)
        .then(data => {
            console.log('loadContent', data);
            const escrow = data.find(e => e.destinationPublicKey === publicKey);
            console.log('loadEscrow recipient', escrow);
            dispatch({type: WOLLO_SET_ESCROW, escrow});
        });
};

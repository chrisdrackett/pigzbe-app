// import Stellar from '../stellar';
import {getServer, setServer} from '../stellar/server';
import {ASSET_CODE} from '../constants';

export const WOLLO_USE_TESTNET = 'USE_TESTNET';
export const WOLLO_UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const WOLLO_UPDATE_BALANCE = 'UPDATE_BALANCE';

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

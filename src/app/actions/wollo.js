import {getServer, setServer} from '../stellar/server';
import {ASSET_CODE} from '../constants';

export const WOLLO_USE_TESTNET = 'WOLLO_USE_TESTNET';
export const WOLLO_UPDATE_ACCOUNT = 'WOLLO_UPDATE_ACCOUNT';
export const WOLLO_UPDATE_BALANCE = 'WOLLO_UPDATE_BALANCE';

export const getWolloBalance = account => {
    const wollo = account.balances.find(b => b.asset_code === ASSET_CODE);
    return wollo ? wollo.balance : '0';
};

export const setUseTestnet = useTestnet => dispatch => {
    setServer(useTestnet);
    dispatch({type: WOLLO_USE_TESTNET, useTestnet});
};

const updateBalance = balance => ({type: WOLLO_UPDATE_BALANCE, balance});

export const loadAccount = publicKey => dispatch => {
    return getServer().loadAccount(publicKey)
        .then(account => {
            dispatch({type: WOLLO_UPDATE_ACCOUNT, account});
            dispatch(updateBalance(getWolloBalance(account)));
            return account;
        });
};

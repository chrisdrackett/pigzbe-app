import Stellar from '../stellar';

const server = new Stellar.Server('https://horizon-testnet.stellar.org');
Stellar.Network.useTestNetwork();

export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const UPDATE_BALANCE = 'UPDATE_BALANCE';

const getWolloBalance = account => {
    const wollo = account.balances.find(b => b.asset_code === 'WOL');
    return wollo ? wollo.balance : '0';
};

export const updateBalance = balance => ({type: UPDATE_BALANCE, balance});

export const loadAccount = publicKey => dispatch => {
    return server.loadAccount(publicKey)
        .then(account => {
            dispatch({type: UPDATE_ACCOUNT, account});
            dispatch(updateBalance(getWolloBalance(account)));
            return account;
        });
};

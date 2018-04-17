import Stellar from '../stellar';

const server = new Stellar.Server('https://horizon-testnet.stellar.org');
Stellar.Network.useTestNetwork();

export const UPDATE_BALANCE = 'UPDATE_BALANCE';

export const loadAccount = publicKey => () => server.loadAccount(publicKey);

export const updateBalance = balance => ({type: UPDATE_BALANCE, balance});

export const fetchBalance = publicKey => dispatch => {
    return server.loadAccount(publicKey)
        .then(data => data.balances.find(b => b.asset_code === 'WOL'))
        .then(wol => {
            if (!wol) {
                return '0';
            }
            return wol.balance;
        })
        .then(balance => dispatch(updateBalance(balance)))
        .catch(error => console.error(error));
};

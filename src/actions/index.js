import Stellar from '../stellar';

// console.log('Stellar', Object.keys(Stellar).join(','));

const server = new Stellar.Server('https://horizon-testnet.stellar.org');
Stellar.Network.useTestNetwork();

export const AUTH_LOGIN_START = 'AUTH_LOGIN_START';
export const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL';
export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const authLogin = secretKey => dispatch => {
    dispatch({type: AUTH_LOGIN_START});

    let keypair = null;

    try {
        keypair = Stellar.Keypair.fromSecret(secretKey);
    } catch (e) {}

    if (!keypair) {
        dispatch({type: AUTH_LOGIN_FAIL, error: new Error('Invalid key')});
        return;
    }

    server.loadAccount(keypair.publicKey())
        .then(() => dispatch({type: AUTH_LOGIN, keypair}))
        .catch(error => dispatch({type: AUTH_LOGIN_FAIL, error}));
};

export const authLogout = () => ({type: AUTH_LOGOUT});


export const UPDATE_BALANCE = 'UPDATE_BALANCE';

export const updateBalance = balance => ({type: UPDATE_BALANCE, balance});

export const fetchBalance = publicKey => dispatch => {
    server.loadAccount(publicKey)
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

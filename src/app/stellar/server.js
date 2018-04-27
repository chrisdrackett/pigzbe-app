import Stellar from './';
import {USE_TESTNET} from '../constants';

let server = null;

export const getServer = () => {
    if (!server) {
        setServer();
    }
    return server;
};

export const setServer = (useTestnet = USE_TESTNET) => {
    if (useTestnet) {
        Stellar.Network.useTestNetwork();
    } else {
        Stellar.Network.usePublicNetwork();
    }

    const uri = useTestnet ? 'https://horizon-testnet.stellar.org' : 'https://horizon.stellar.org';

    server = new Stellar.Server(uri);
};

export const getServerURL = () => getServer().serverURL.href();

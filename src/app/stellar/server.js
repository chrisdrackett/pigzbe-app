import {Server, Network} from './';
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
        Network.useTestNetwork();
    } else {
        Network.usePublicNetwork();
    }

    const uri = useTestnet ? 'https://horizon-testnet.stellar.org' : 'https://horizon.stellar.org';

    server = new Server(uri);
};

export const getServerURL = () => getServer().serverURL.href();

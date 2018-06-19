import Config from 'react-native-config';

export default () => {
    console.log('apiURL network =', Config.NETWORK);
    switch (Config.NETWORK) {
        case 'private':
        case 'local':
            return `http://${Config.OFFLINE_HOST || '0.0.0.0'}:5001`;
        case 'mainnet':
        case 'production':
            return 'https://api.pigzbe.com';
        default:
            return 'https://staging.api.pigzbe.com';
    }
};

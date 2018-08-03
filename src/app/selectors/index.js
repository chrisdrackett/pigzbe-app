import {createSelector} from 'reselect';
import Config from 'react-native-config';

const configSelector = state => state.config;

export const apiURL = createSelector(
    configSelector,
    config => {
        console.log('config.network', config.network);
        if (!config.network) {
            console.error('No config network');
        }
        switch (config.network) {
            case config.NETWORK_LOCAL:
                return `http://${Config.OFFLINE_HOST || '0.0.0.0'}:5001`;
            case config.NETWORK_MAINNET:
                return 'https://api.pigzbe.com';
            default:
                return 'https://staging.api.pigzbe.com';
        }
    }
);

import {createSelector} from 'reselect';
import Config from 'react-native-config';
import {Asset} from '@pigzbe/stellar-utils';

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

export const wolloAsset = createSelector(
    configSelector,
    config => {
        const {network, stellar} = config;
        const {code, address} = stellar.networks[network];
        return new Asset(code, address);
    }
);

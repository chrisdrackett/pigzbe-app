import Config from 'react-native-config';
import {setUseTestnet} from './';
import blockchainConfig from 'app/data/blockchain';

export const CONFIG_UPDATE = 'CONFIG_UPDATE';

export const configUpdate = config => ({type: CONFIG_UPDATE, config});

export const initializeConfig = () => dispatch => {
    dispatch(configUpdate({
        networkOverride: Config.NETWORK,
    }));
};

export const loadConfig = () => async dispatch => {
    try {
        dispatch(configUpdate(blockchainConfig));
        dispatch(setUseTestnet(blockchainConfig.network !== blockchainConfig.NETWORK_MAINNET));
    } catch (error) {
        console.log(error);
    }
};

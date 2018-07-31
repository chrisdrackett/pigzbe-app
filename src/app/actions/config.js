import Config from 'react-native-config';
import {setUseTestnet} from './';

export const CONFIG_INIT = 'CONFIG_INIT';

export const configInit = config => ({type: CONFIG_INIT, config});

export const loadConfig = () => async dispatch => {
    console.log('5. loadConfig');
    try {
        const {NETWORK, CONFIG_URL} = Config;
        const configURL = NETWORK ? `${CONFIG_URL}?network=${NETWORK}` : CONFIG_URL;
        const config = await (await fetch(configURL)).json();
        if (config.message === 'Missing Authentication Token') {
            throw new Error('Failed to load config');
        }
        console.log(Object.keys(config));
        dispatch(configInit(config));
        dispatch(setUseTestnet(config.network !== config.NETWORK_MAINNET));
    } catch (error) {
        console.log(error);
    }
};

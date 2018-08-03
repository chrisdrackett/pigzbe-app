import Config from 'react-native-config';
import {setUseTestnet} from './';

export const CONFIG_UPDATE = 'CONFIG_UPDATE';

export const configUpdate = config => ({type: CONFIG_UPDATE, config});

export const initializeConfig = () => dispatch => {
    dispatch(configUpdate({
        configURL: Config.CONFIG_URL,
        networkOverride: Config.NETWORK,
    }));
};

export const loadConfig = () => async (dispatch, getState) => {
    try {
        const {configURL, networkOverride} = getState().config;
        const url = networkOverride ? `${configURL}?network=${networkOverride}` : configURL;
        const config = await (await fetch(url)).json();
        if (config.message === 'Missing Authentication Token') {
            throw new Error('Failed to load config');
        }
        // console.log(JSON.stringify(config, null, 2));
        dispatch(configUpdate(config));
        dispatch(setUseTestnet(config.network !== config.NETWORK_MAINNET));
    } catch (error) {
        console.log(error);
    }
};

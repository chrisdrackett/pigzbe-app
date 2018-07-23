import {createSwitchNavigator} from 'react-navigation';
import CreateKeys from '../../screens/create-keys';
import ImportKeys from '../../screens/import-keys';
import SaveKeys from '../../screens/save-keys';
import {
    SCREEN_CREATE_KEYS,
    SCREEN_IMPORT_KEYS,
    SCREEN_SAVE_KEYS,
} from '../../constants';

const nav = {
    [SCREEN_CREATE_KEYS]: {
        screen: CreateKeys
    },
    [SCREEN_IMPORT_KEYS]: {
        screen: ImportKeys
    },
    [SCREEN_SAVE_KEYS]: {
        screen: SaveKeys
    },
};

export default createSwitchNavigator(nav, {
    initialRouteName: SCREEN_CREATE_KEYS
});

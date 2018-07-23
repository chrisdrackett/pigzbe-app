import {createSwitchNavigator} from 'react-navigation';
import KeysCreate from '../../screens/keys-create';
import KeysImport from '../../screens/keys-import';
import KeysSave from '../../screens/keys-save';
import {
    SCREEN_CREATE_KEYS,
    SCREEN_IMPORT_KEYS,
    SCREEN_SAVE_KEYS,
} from '../../constants';

const nav = {
    [SCREEN_CREATE_KEYS]: {
        screen: KeysCreate
    },
    [SCREEN_IMPORT_KEYS]: {
        screen: KeysImport
    },
    [SCREEN_SAVE_KEYS]: {
        screen: KeysSave
    },
};

export default createSwitchNavigator(nav, {
    initialRouteName: SCREEN_CREATE_KEYS
});

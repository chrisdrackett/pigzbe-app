import {createSwitchNavigator} from 'react-navigation';
import KeysCreate from '../../screens/keys-create';
import KeysSave from '../../screens/keys-mnemonic';
import KeysRestore from '../../screens/keys-restore';
import {
    SCREEN_CREATE_KEYS,
    SCREEN_MNEMONIC,
    SCREEN_RESTORE_KEYS,
} from '../../constants';

const nav = {
    [SCREEN_CREATE_KEYS]: {
        screen: KeysCreate
    },
    [SCREEN_MNEMONIC]: {
        screen: KeysSave
    },
    [SCREEN_RESTORE_KEYS]: {
        screen: KeysRestore
    },
};

export default createSwitchNavigator(nav, {
    initialRouteName: SCREEN_CREATE_KEYS
});

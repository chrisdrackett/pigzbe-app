import {SwitchNavigator} from 'react-navigation';
import Home from '../../screens/home';
import SetPasscode from '../../screens/set-passcode';
import Login from '../../screens/login';
import DeviceAuth from '../../screens/device-auth';
import {
    SCREEN_HOME,
    SCREEN_LOGIN,
    SCREEN_SET_PASSCODE,
    SCREEN_DEVICE_AUTH
} from '../../constants';

const nav = {
    [SCREEN_HOME]: {
        screen: Home
    },
    [SCREEN_LOGIN]: {
        screen: Login
    },
    [SCREEN_SET_PASSCODE]: {
        screen: SetPasscode
    },
    [SCREEN_DEVICE_AUTH]: {
        screen: DeviceAuth
    }
};

export default SwitchNavigator(nav, {
    initialRouteName: SCREEN_HOME
});

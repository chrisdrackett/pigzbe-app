import {createSwitchNavigator} from 'react-navigation';
import Home from '../../screens/home';
import Login from '../../screens/login';
import DeviceAuth from '../../screens/device-auth';
import TouchId from '../../screens/touch-id';
import SetPasscode from '../../screens/set-passcode';
import {
    SCREEN_HOME,
    SCREEN_LOGIN,
    SCREEN_DEVICE_AUTH,
    SCREEN_TOUCH_ID,
    SCREEN_SET_PASSCODE
} from '../../constants';

const nav = {
    [SCREEN_HOME]: {
        screen: Home
    },
    [SCREEN_LOGIN]: {
        screen: Login
    },
    [SCREEN_DEVICE_AUTH]: {
        screen: DeviceAuth
    },
    [SCREEN_TOUCH_ID]: {
        screen: TouchId
    },
    [SCREEN_SET_PASSCODE]: {
        screen: SetPasscode
    },
};

export default createSwitchNavigator(nav, {
    initialRouteName: SCREEN_HOME
});

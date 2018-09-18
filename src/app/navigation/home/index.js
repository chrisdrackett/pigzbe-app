import {createSwitchNavigator} from 'react-navigation';
import Home from '../../screens/home';
import PasscodeLogin from '../../screens/passcode-login';
import DeviceAuth from '../../screens/device-auth';
import TouchId from '../../screens/touch-id';
import PasscodeSet from '../../screens/passcode-set';
import KidSetLogin from '../../screens/kid-set-login';
import KidLogin from '../../screens/kid-login';
import {
    SCREEN_HOME,
    SCREEN_LOGIN,
    SCREEN_DEVICE_AUTH,
    SCREEN_TOUCH_ID,
    SCREEN_SET_PASSCODE,
    SCREEN_KID_SET_LOGIN,
    SCREEN_KID_LOGIN
} from '../../constants';

const nav = {
    [SCREEN_HOME]: {
        screen: Home
    },
    [SCREEN_LOGIN]: {
        screen: PasscodeLogin
    },
    [SCREEN_DEVICE_AUTH]: {
        screen: DeviceAuth
    },
    [SCREEN_TOUCH_ID]: {
        screen: TouchId
    },
    [SCREEN_SET_PASSCODE]: {
        screen: PasscodeSet
    },
    [SCREEN_KID_SET_LOGIN]: {
        screen: KidSetLogin
    },
    [SCREEN_KID_LOGIN]: {
        screen: KidLogin
    },
};

export default createSwitchNavigator(nav, {
    initialRouteName: SCREEN_HOME
});

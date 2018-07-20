import {SwitchNavigator} from 'react-navigation';
import Home from '../../screens/home';
import CreateAccount from '../../screens/create-account';
import Login from '../../screens/login';
import DeviceAuth from '../../screens/device-auth';
import {
    SCREEN_HOME,
    SCREEN_LOGIN,
    SCREEN_CREATE_ACCOUNT,
    SCREEN_DEVICE_AUTH
} from '../../constants';

const nav = {
    [SCREEN_HOME]: {
        screen: Home
    },
    [SCREEN_LOGIN]: {
        screen: Login
    },
    [SCREEN_CREATE_ACCOUNT]: {
        screen: CreateAccount
    },
    [SCREEN_DEVICE_AUTH]: {
        screen: DeviceAuth
    }
};

export default SwitchNavigator(nav, {
    initialRouteName: SCREEN_HOME
});

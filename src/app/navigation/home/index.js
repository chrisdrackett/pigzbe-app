import {SwitchNavigator} from 'react-navigation';
import Home from '../../components/home';
import CreateAccount from '../../components/create-account';
import Login from '../../components/login';
import {
    SCREEN_HOME,
    SCREEN_LOGIN,
    SCREEN_CREATE_ACCOUNT
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
    }
};

export default SwitchNavigator(nav, {
    initialRouteName: SCREEN_HOME
});

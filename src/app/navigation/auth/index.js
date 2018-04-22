import {SwitchNavigator} from 'react-navigation';
import Login from '../../components/login';
import Help from '../../components/help';
import {
    SCREEN_LOGIN,
    SCREEN_HELP
} from '../../constants';

const nav = {
    [SCREEN_LOGIN]: {
        screen: Login
    },
    [SCREEN_HELP]: {
        screen: Help
    }
};

export default SwitchNavigator(nav, {
    initialRouteName: SCREEN_LOGIN
});

import {SwitchNavigator} from 'react-navigation';
import Login from '../login';
import Help from '../help';

const nav = {
    Login: {
        screen: Login
    },
    Help: {
        screen: Help
    }
};

export default SwitchNavigator(nav, {
    initialRouteName: 'Login'
});

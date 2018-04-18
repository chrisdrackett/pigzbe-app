import {SwitchNavigator} from 'react-navigation';
import Balance from '../balance';
import Profile from '../profile';

const nav = {
    Balance: {
        screen: Balance
    },
    Profile: {
        screen: Profile
    }
};

export default SwitchNavigator(nav, {
    initialRouteName: 'Balance'
});

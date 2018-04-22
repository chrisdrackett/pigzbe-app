import {SwitchNavigator} from 'react-navigation';
import Balance from '../../components/balance';
import Profile from '../../components/profile';
import {
    SCREEN_BALANCE,
    SCREEN_PROFILE
} from '../../constants';

const nav = {
    [SCREEN_BALANCE]: {
        screen: Balance
    },
    [SCREEN_PROFILE]: {
        screen: Profile
    }
};

export default SwitchNavigator(nav, {
    initialRouteName: SCREEN_BALANCE
});

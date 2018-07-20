import {createSwitchNavigator} from 'react-navigation';
import Balance from '../../screens/balance';
import Profile from '../../screens/profile';
import Escrow from '../../screens/escrow';
import {
    SCREEN_BALANCE,
    SCREEN_PROFILE,
    SCREEN_ESCROW
} from '../../constants';

const nav = {
    [SCREEN_BALANCE]: {
        screen: Balance
    },
    [SCREEN_PROFILE]: {
        screen: Profile
    },
    [SCREEN_ESCROW]: {
        screen: Escrow
    }
};

export default createSwitchNavigator(nav, {
    initialRouteName: SCREEN_BALANCE
});

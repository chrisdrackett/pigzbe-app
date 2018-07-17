import {createSwitchNavigator} from 'react-navigation';
import Balance from '../../components/balance';
import Profile from '../../components/profile';
import Escrow from '../../components/escrow';
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

import {createSwitchNavigator} from 'react-navigation';
import Balance from '../../screens/balance';
import Settings from '../../screens/settings';
import Escrow from '../../screens/escrow';
import Claim from '../../screens/claim';
import ClaimICO from '../../screens/claim-ico';
import {
    SCREEN_BALANCE,
    SCREEN_SETTINGS,
    SCREEN_ESCROW,
    SCREEN_CLAIM,
    SCREEN_CLAIM_ICO
} from '../../constants';

const nav = {
    [SCREEN_BALANCE]: {
        screen: Balance
    },
    [SCREEN_SETTINGS]: {
        screen: Settings
    },
    [SCREEN_ESCROW]: {
        screen: Escrow
    },
    [SCREEN_CLAIM]: {
        screen: Claim
    },
    [SCREEN_CLAIM_ICO]: {
        screen: ClaimICO
    },
};

export default createSwitchNavigator(nav, {
    initialRouteName: SCREEN_BALANCE
});

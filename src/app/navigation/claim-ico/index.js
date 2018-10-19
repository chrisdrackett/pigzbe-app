import {createStackNavigator} from 'react-navigation';
import ClaimICO from '../../screens/claim-ico';
import InfoB from '../../screens/claim-ico/info-b';
import InfoC from '../../screens/claim-ico/info-c';
import EnterKeys from '../../screens/claim-ico/enter-keys';
import Balance from '../../screens/claim-ico/balance';
import EstimateGas from '../../screens/claim-ico/estimate-gas';
import Burn from '../../screens/claim-ico/burn';

import {
    SCREEN_CLAIM_ICO,
    SCREEN_CLAIM_ICO_INFO_B,
    SCREEN_CLAIM_ICO_INFO_C,
    SCREEN_CLAIM_ICO_ENTER_KEYS,
    SCREEN_CLAIM_ICO_BALANCE,
    SCREEN_CLAIM_ICO_ESTIMATE_GAS,
    SCREEN_CLAIM_ICO_BURN,
} from '../../constants';

const nav = {
    [SCREEN_CLAIM_ICO]: {
        screen: ClaimICO
    },
    [SCREEN_CLAIM_ICO_INFO_B]: {
        screen: InfoB
    },
    [SCREEN_CLAIM_ICO_INFO_C]: {
        screen: InfoC
    },
    [SCREEN_CLAIM_ICO_ENTER_KEYS]: {
        screen: EnterKeys
    },
    [SCREEN_CLAIM_ICO_BALANCE]: {
        screen: Balance
    },
    [SCREEN_CLAIM_ICO_ESTIMATE_GAS]: {
        screen: EstimateGas
    },
    [SCREEN_CLAIM_ICO_BURN]: {
        screen: Burn
    },
};

export default createStackNavigator(nav, {
    initialRouteName: SCREEN_CLAIM_ICO,
    headerMode: 'none',
});

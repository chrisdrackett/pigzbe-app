import {createStackNavigator} from 'react-navigation';
import ClaimAirdrop from 'app/screens/claim-airdrop';
import EnterKeys from 'app/screens/claim-airdrop/enter-keys';
import Balance from 'app/screens/claim-airdrop/balance';
import EstimateGas from 'app/screens/claim-airdrop/estimate-gas';
import Burn from 'app/screens/claim-airdrop/burn';

import {
    SCREEN_CLAIM_AIRDROP,
    SCREEN_CLAIM_AIRDROP_ENTER_KEYS,
    SCREEN_CLAIM_AIRDROP_BALANCE,
    SCREEN_CLAIM_AIRDROP_ESTIMATE_GAS,
    SCREEN_CLAIM_AIRDROP_BURN,
} from 'app/constants';

const nav = {
    [SCREEN_CLAIM_AIRDROP]: {
        screen: ClaimAirdrop
    },
    [SCREEN_CLAIM_AIRDROP_ENTER_KEYS]: {
        screen: EnterKeys
    },
    [SCREEN_CLAIM_AIRDROP_BALANCE]: {
        screen: Balance
    },
    [SCREEN_CLAIM_AIRDROP_ESTIMATE_GAS]: {
        screen: EstimateGas
    },
    [SCREEN_CLAIM_AIRDROP_BURN]: {
        screen: Burn
    },
};

export default createStackNavigator(nav, {
    initialRouteName: SCREEN_CLAIM_AIRDROP,
    headerMode: 'none',
});

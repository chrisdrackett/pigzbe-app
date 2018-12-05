import {createStackNavigator} from 'react-navigation';
import ClaimAirdrop from 'app/screens/claim-airdrop';
import EnterKeys from 'app/screens/claim-airdrop/enter-keys';
import Balance from 'app/screens/claim-airdrop/balance';
import Claim from 'app/screens/claim-airdrop/claim';

import {
    SCREEN_CLAIM_AIRDROP,
    SCREEN_CLAIM_AIRDROP_ENTER_KEYS,
    SCREEN_CLAIM_AIRDROP_BALANCE,
    SCREEN_CLAIM_AIRDROP_CLAIM,
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
    [SCREEN_CLAIM_AIRDROP_CLAIM]: {
        screen: Claim
    },
};

export default createStackNavigator(nav, {
    initialRouteName: SCREEN_CLAIM_AIRDROP,
    headerMode: 'none',
});

import {createStackNavigator} from 'react-navigation';
import ClaimAirdrop from 'app/screens/claim-vip';
import Register from 'app/screens/claim-vip/register';
import VerifyEmail from 'app/screens/claim-vip/verify-email';
import RequestCode from 'app/screens/claim-vip/request-code';
import VerifyCode from 'app/screens/claim-vip/verify-code';
import Finish from 'app/screens/claim-vip/finish';

import {
    SCREEN_CLAIM_VIP,
    SCREEN_CLAIM_VIP_REGISTER,
    SCREEN_CLAIM_VIP_VERIFY_EMAIL,
    SCREEN_CLAIM_VIP_REQUEST_CODE,
    SCREEN_CLAIM_VIP_VERIFY_CODE,
    SCREEN_CLAIM_VIP_FINISH,
} from 'app/constants';

const nav = {
    [SCREEN_CLAIM_VIP]: {
        screen: ClaimAirdrop
    },
    [SCREEN_CLAIM_VIP_REGISTER]: {
        screen: Register
    },
    [SCREEN_CLAIM_VIP_VERIFY_EMAIL]: {
        screen: VerifyEmail
    },
    [SCREEN_CLAIM_VIP_REQUEST_CODE]: {
        screen: RequestCode
    },
    [SCREEN_CLAIM_VIP_VERIFY_CODE]: {
        screen: VerifyCode
    },
    [SCREEN_CLAIM_VIP_FINISH]: {
        screen: Finish
    },
};

export default createStackNavigator(nav, {
    initialRouteName: SCREEN_CLAIM_VIP,
    headerMode: 'none',
});

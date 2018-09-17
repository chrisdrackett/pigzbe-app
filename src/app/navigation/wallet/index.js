import {createSwitchNavigator} from 'react-navigation';
import Balance from '../../screens/balance';
import Settings from '../../screens/settings';
import Escrow from '../../screens/escrow';
import Claim from '../../screens/claim';
import ClaimICO from '../../screens/claim-ico';
import ClaimVIP from '../../screens/claim-vip';
import ClaimAirdrop from '../../screens/claim-airdrop';
import PasscodeSet from '../../screens/passcode-set';
import FamilyIntro from '../../screens/family-intro';
import ChildDash from '../../screens/child-dash';
import FamilyMemberType from '../../screens/family-member-type';
import FamilyNumberKids from '../../screens/family-number-kids';
import FamilyEnterChild from '../../screens/family-enter-child';
import TasksList from '../../screens/tasks-list';
import TasksAssign from '../../screens/tasks-assign';
import AllowanceAmount from '../../screens/allowance-amount';
import AllowanceInterval from '../../screens/allowance-interval';
import EmailSet from '../../screens/email-set';
import CurrencySet from '../../screens/currency-set';
import {
    SCREEN_BALANCE,
    SCREEN_SETTINGS,
    SCREEN_ESCROW,
    SCREEN_CLAIM,
    SCREEN_CLAIM_ICO,
    SCREEN_CLAIM_VIP,
    SCREEN_CLAIM_AIRDROP,
    SCREEN_SET_EMAIL,
    SCREEN_SET_CURRENCY,
    SCREEN_CHANGE_PASSCODE,
    SCREEN_FAMILY_INTRO,
    SCREEN_CHILD_DASH,
    SCREEN_FAMILY_MEMBER_TYPE,
    SCREEN_FAMILY_NUMBER_KIDS,
    SCREEN_FAMILY_ENTER_CHILD,
    SCREEN_TASKS_LIST,
    SCREEN_TASKS_ASSIGN,
    SCREEN_ALLOWANCE_AMOUNT,
    SCREEN_ALLOWANCE_INTERVAL,
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
    [SCREEN_CLAIM_VIP]: {
        screen: ClaimVIP
    },
    [SCREEN_CLAIM_AIRDROP]: {
        screen: ClaimAirdrop
    },
    [SCREEN_SET_EMAIL]: {
        screen: EmailSet
    },
    [SCREEN_SET_CURRENCY]: {
        screen: CurrencySet
    },
    [SCREEN_CHANGE_PASSCODE]: {
        screen: PasscodeSet
    },
    [SCREEN_FAMILY_INTRO]: {
        screen: FamilyIntro
    },
    [SCREEN_CHILD_DASH]: {
        screen: ChildDash
    },
    [SCREEN_FAMILY_MEMBER_TYPE]: {
        screen: FamilyMemberType
    },
    [SCREEN_FAMILY_NUMBER_KIDS]: {
        screen: FamilyNumberKids
    },
    [SCREEN_FAMILY_ENTER_CHILD]: {
        screen: FamilyEnterChild
    },
    [SCREEN_TASKS_LIST]: {
        screen: TasksList
    },
    [SCREEN_TASKS_ASSIGN]: {
        screen: TasksAssign
    },
    [SCREEN_ALLOWANCE_AMOUNT]: {
        screen: AllowanceAmount
    },
    [SCREEN_ALLOWANCE_INTERVAL]: {
        screen: AllowanceInterval
    },
};

export default createSwitchNavigator(nav, {
    initialRouteName: SCREEN_BALANCE
});

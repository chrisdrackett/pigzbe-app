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
import FamilyMemberType from '../../screens/family-member-type';
import FamilyNumberKids from '../../screens/family-number-kids';
import FamilyEnterChild from '../../screens/family-enter-child';
import TasksList from '../../screens/tasks-list';
import TasksAssign from '../../screens/tasks-assign';
import {
    SCREEN_BALANCE,
    SCREEN_SETTINGS,
    SCREEN_ESCROW,
    SCREEN_CLAIM,
    SCREEN_CLAIM_ICO,
    SCREEN_CLAIM_VIP,
    SCREEN_CLAIM_AIRDROP,
    SCREEN_CHANGE_PASSCODE,
    SCREEN_FAMILY_INTRO,
    SCREEN_FAMILY_MEMBER_TYPE,
    SCREEN_FAMILY_NUMBER_KIDS,
    SCREEN_FAMILY_ENTER_CHILD,
    SCREEN_TASKS_LIST,
    SCREEN_TASKS_ASSIGN,
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
    [SCREEN_CHANGE_PASSCODE]: {
        screen: PasscodeSet
    },
    [SCREEN_FAMILY_INTRO]: {
        screen: FamilyIntro
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
};

export default createSwitchNavigator(nav, {
    initialRouteName: SCREEN_BALANCE
});

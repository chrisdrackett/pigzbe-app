import {createSwitchNavigator} from 'react-navigation';
import Dashboard from '../../screens/dashboard';
import Settings from '../../screens/settings';
import Escrow from '../../screens/escrow';
import Claim from '../../screens/claim';
import ClaimICO from '../../screens/claim-ico';
import ClaimVIP from '../../screens/claim-vip';
import ClaimAirdrop from '../../screens/claim-airdrop';
import PasscodeSet from '../../screens/passcode-set';
import KidsIntro from '../../screens/kids-intro';
import KidDashboard from '../../screens/kid-dashboard';
import KidTransactions from '../../screens/kid-transactions';
import KidGoalAdd from '../../screens/kid-goal-add';
import KidsParentNickname from '../../screens/kids-parent-nickname';
import KidsNumberToAdd from '../../screens/kids-number-to-add';
import KidsEnterProfile from '../../screens/kids-enter-profile';
import TasksList from '../../screens/tasks-list';
import TasksAssign from '../../screens/tasks-assign';
import AllowanceAmount from '../../screens/allowance-amount';
import AllowanceInterval from '../../screens/allowance-interval';
import EmailSet from '../../screens/email-set';
import CurrencySet from '../../screens/currency-set';
import {
    SCREEN_DASHBOARD,
    SCREEN_SETTINGS,
    SCREEN_ESCROW,
    SCREEN_CLAIM,
    SCREEN_CLAIM_ICO,
    SCREEN_CLAIM_VIP,
    SCREEN_CLAIM_AIRDROP,
    SCREEN_SET_EMAIL,
    SCREEN_SET_CURRENCY,
    SCREEN_CHANGE_PASSCODE,
    SCREEN_KIDS_INTRO,
    SCREEN_KID_DASHBOARD,
    SCREEN_KID_GOAL_ADD,
    SCREEN_KID_TRANSACTIONS,
    SCREEN_KIDS_PARENT_NICKNAME,
    SCREEN_KIDS_NUMBER_TO_ADD,
    SCREEN_KIDS_ENTER_PROFILE,
    SCREEN_TASKS_LIST,
    SCREEN_TASKS_ASSIGN,
    SCREEN_ALLOWANCE_AMOUNT,
    SCREEN_ALLOWANCE_INTERVAL,
} from '../../constants';

const nav = {
    [SCREEN_DASHBOARD]: {
        screen: Dashboard
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
    [SCREEN_KIDS_INTRO]: {
        screen: KidsIntro
    },
    [SCREEN_KID_DASHBOARD]: {
        screen: KidDashboard
    },
    [SCREEN_KID_TRANSACTIONS]: {
        screen: KidTransactions
    },
    [SCREEN_KID_GOAL_ADD]: {
        screen: KidGoalAdd
    },
    [SCREEN_KIDS_PARENT_NICKNAME]: {
        screen: KidsParentNickname
    },
    [SCREEN_KIDS_NUMBER_TO_ADD]: {
        screen: KidsNumberToAdd
    },
    [SCREEN_KIDS_ENTER_PROFILE]: {
        screen: KidsEnterProfile
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
    initialRouteName: SCREEN_DASHBOARD
});

import {createStackNavigator} from 'react-navigation';
import Dashboard from 'app/screens/dashboard';
import Transactions from 'app/screens/transactions';
import Settings from 'app/screens/settings';
import Escrow from 'app/screens/escrow';
import Claim from 'app/screens/claim';
import ClaimICO from 'app/navigation/claim-ico';
import ClaimVIP from 'app/navigation/claim-vip';
import ClaimAirdrop from 'app/navigation/claim-airdrop';
import PasscodeSet from 'app/screens/passcode-set';
import KidsIntro from 'app/screens/kids-intro';
import KidDashboard from 'app/screens/kid-dashboard';
import KidTransactions from 'app/screens/kid-transactions';
import KidGoalAdd from 'app/screens/kid-goal-add';
import KidsParentNickname from 'app/screens/kids-parent-nickname';
import KidsNumberToAdd from 'app/screens/kids-number-to-add';
import KidsEnterProfile from 'app/screens/kids-enter-profile';
import TasksList from 'app/screens/tasks-list';
import TasksAssign from 'app/screens/tasks-assign';
import AllowanceAmount from 'app/screens/allowance-amount';
import AllowanceInterval from 'app/screens/allowance-interval';
import EmailSet from 'app/screens/email-set';
import CurrencySet from 'app/screens/currency-set';
import Device from 'app/screens/device';
import {
    SCREEN_DASHBOARD,
    SCREEN_TRANSACTIONS,
    SCREEN_SETTINGS,
    SCREEN_ESCROW,
    SCREEN_CLAIM,
    SCREEN_CLAIM_ICO,
    SCREEN_CLAIM_VIP,
    SCREEN_CLAIM_AIRDROP,
    SCREEN_SET_EMAIL,
    SCREEN_SET_CURRENCY,
    SCREEN_DEVICE,
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
    [SCREEN_TRANSACTIONS]: {
        screen: Transactions
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
    [SCREEN_DEVICE]: {
        screen: Device
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

export default createStackNavigator(nav, {
    initialRouteName: SCREEN_DASHBOARD,
    headerMode: 'none',
});

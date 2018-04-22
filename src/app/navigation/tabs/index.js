import {TabNavigator, TabBarBottom} from 'react-navigation';
import Wallet from '../wallet';
import Game from '../../components/game';
import Messages from '../../components/messages';
import {
    SCREEN_WALLET,
    SCREEN_GAME,
    SCREEN_MESSAGES
} from '../../constants';
import {
    color,
    fontFamily
} from '../../styles';

const nav = {
    [SCREEN_WALLET]: {
        screen: Wallet,
        navigationOptions: {
            title: 'Wallet'
        },
        _icon: 'ios-card'
    },
    [SCREEN_GAME]: {
        screen: Game,
        navigationOptions: {
            title: 'Game'
        },
        _icon: 'ios-game-controller-b'
    },
    [SCREEN_MESSAGES]: {
        screen: Messages,
        navigationOptions: {
            title: 'Messages'
        },
        _icon: 'ios-notifications'
    }
};

// https://reactnavigation.org/docs/tab-navigator.html

export default TabNavigator(nav, {
    initialRouteName: SCREEN_WALLET,
    // navigationOptions: ({navigation}) => ({
    // tabBarIcon: ({focused, tintColor}) => {
    //     const {routeName} = navigation.state;
    //     const iconName = `${nav[routeName]._icon}${focused ? '' : '-outline'}`;
    //     return <Ionicons name={iconName} size={25} color={tintColor} />;
    // }
    // }),
    tabBarOptions: {
        activeTintColor: color.pink,
        inactiveTintColor: color.blue,
        labelStyle: {
            fontFamily,
            fontSize: 12
        }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false
});

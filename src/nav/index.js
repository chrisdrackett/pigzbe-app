import {TabNavigator, TabBarBottom} from 'react-navigation';
import Wallet from '../wallet';
import Game from '../game';
import Messages from '../messages';

const nav = {
    Wallet: {
        screen: Wallet,
        _icon: 'ios-card'
    },
    Game: {
        screen: Game,
        _icon: 'ios-game-controller-b'
    },
    Messages: {
        screen: Messages,
        _icon: 'ios-notifications'
    }
};

export default TabNavigator(nav, {
    initialRouteName: 'Wallet',
    // navigationOptions: ({navigation}) => ({
    //     tabBarIcon: ({focused, tintColor}) => {
    //         const {routeName} = navigation.state;
    //         const iconName = `${nav[routeName]._icon}${focused ? '' : '-outline'}`;
    //         return <Ionicons name={iconName} size={25} color={tintColor} />;
    //     }
    // }),
    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray'
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false
});

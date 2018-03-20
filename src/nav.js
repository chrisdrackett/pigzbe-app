import React from 'react';
import GameScreen from './screens/game';
import HomeScreen from './screens/home';
import MessagesScreen from './screens/messages';
import {TabNavigator, TabBarBottom} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const nav = {
    Home: {
        screen: HomeScreen,
        _icon: 'ios-home'
    },
    Game: {
        screen: GameScreen,
        _icon: 'ios-game-controller-b'
    },
    Messages: {
        screen: MessagesScreen,
        _icon: 'ios-notifications'
    }
};

export default TabNavigator(nav, {
    navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, tintColor}) => {
            const {routeName} = navigation.state;
            const iconName = `${nav[routeName]._icon}${focused ? '' : '-outline'}`;
            return <Ionicons name={iconName} size={25} color={tintColor} />;
        }
    }),
    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray'
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false
});

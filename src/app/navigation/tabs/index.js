import React from 'react';
import {TabNavigator, TabBarBottom} from 'react-navigation';
import {View, Image} from 'react-native';
import Wallet from '../wallet';
import Game from '../../components/game';
import Messages from '../../components/messages';
import {
    strings,
    SCREEN_WALLET,
    SCREEN_GAME,
    SCREEN_MESSAGES
} from '../../constants';
import {
    color,
    fontFamily
} from '../../styles';
import images from './images';

const nav = {
    [SCREEN_WALLET]: {
        screen: Wallet,
        navigationOptions: {
            title: strings.menuWallet
        },
        _icon: 'wallet',
        _iconW: 19,
        _iconH: 19
    },
    [SCREEN_GAME]: {
        screen: Game,
        navigationOptions: {
            title: strings.menuGame
        },
        _icon: 'game',
        _iconW: 20,
        _iconH: 20
    },
    [SCREEN_MESSAGES]: {
        screen: Messages,
        navigationOptions: {
            title: strings.menuMessages
        },
        _icon: 'messages',
        _iconW: 20,
        _iconH: 13
    }
};

// https://reactnavigation.org/docs/tab-navigator.html

const Tabs = TabNavigator(nav, {
    initialRouteName: SCREEN_WALLET,
    navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused}) => {
            const {routeName} = navigation.state;
            const navItem = nav[routeName];
            const iconName = `${navItem._icon}${focused ? 'Active' : ''}`;
            const source = images[iconName];
            return (
                <Image
                    style={{
                        width: navItem._iconW,
                        height: navItem._iconH
                    }}
                    source={source}
                />
            );
        }
    }),
    tabBarOptions: {
        activeTintColor: color.blue,
        inactiveTintColor: color.grey,
        tabStyle: {
            height: 50
        },
        style: {
            height: 50,
            borderTopWidth: 0
        },
        labelStyle: {
            fontFamily,
            fontWeight: 'bold',
            fontSize: 10
        }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false
});

export default () => (
    <View style={{
        alignSelf: 'stretch',
        flex: 1
    }}>
        <View style={{
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            height: 5,
            position: 'absolute',
            bottom: 50,
            left: 0,
            right: 0,
            zIndex: 1
        }}/>
        <Tabs/>
    </View>
);

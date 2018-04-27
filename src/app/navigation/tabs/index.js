import React from 'react';
import {connect} from 'react-redux';
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
        icon: 'wallet',
        iconW: 19,
        iconH: 19
    },
    [SCREEN_GAME]: {
        screen: Game,
        navigationOptions: {
            title: strings.menuGame
        },
        icon: 'game',
        iconW: 20,
        iconH: 20
    },
    [SCREEN_MESSAGES]: {
        screen: Messages,
        navigationOptions: {
            title: strings.menuMessages
        },
        icon: 'messages',
        iconW: 20,
        iconH: 13
    }
};

const TabBarIcon = connect(state => ({
    messagesNotify: state.messages.messagesNotify
}))(({
    navItem: {
        icon,
        iconW,
        iconH
    },
    focused,
    messagesNotify
}) => {
    const iconName = `${icon}${focused ? 'Active' : ''}`;

    if (icon === 'messages' && messagesNotify) {
        return (
            <View>
                <Image
                    style={{
                        width: iconW,
                        height: iconH
                    }}
                    source={images[iconName]}
                />
                <Image
                    style={{
                        position: 'absolute',
                        right: -5,
                        top: -5,
                        width: 10,
                        height: 10
                    }}
                    source={images.notify}
                />
            </View>
        );
    }

    return (
        <Image
            style={{
                width: iconW,
                height: iconH
            }}
            source={images[iconName]}
        />
    );
});


// https://reactnavigation.org/docs/tab-navigator.html

const Tabs = TabNavigator(nav, {
    initialRouteName: SCREEN_WALLET,
    navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused}) => {
            const {routeName} = navigation.state;
            const navItem = nav[routeName];
            return (
                <TabBarIcon
                    navItem={navItem}
                    focused={focused}
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

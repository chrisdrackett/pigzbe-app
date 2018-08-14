import React from 'react';
import {connect} from 'react-redux';
import {createBottomTabNavigator} from 'react-navigation';
import {View, Image} from 'react-native';
import Wallet from '../wallet';
import Messages from '../../screens/messages';
import Transfer from '../transfer';
import {
    strings,
    SCREEN_WALLET,
    SCREEN_MESSAGES,
    SCREEN_TRANSFER
} from '../../constants';
import {
    color,
    fontFamily
} from '../../styles';
import images from './images';
import styles from './styles';

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
    [SCREEN_TRANSFER]: {
        screen: Transfer,
        navigationOptions: {
            title: strings.menuTransfer
        },
        icon: 'transfer',
        iconW: 19,
        iconH: 17
    },
    [SCREEN_MESSAGES]: {
        screen: Messages,
        navigationOptions: {
            title: strings.menuMessages
        },
        icon: 'messages',
        iconW: 20,
        iconH: 13
    },
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
                    style={styles.notify}
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

export default createBottomTabNavigator(nav, {
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
            backgroundColor: color.white,
            height: 50,
            borderTopWidth: 0
        },
        labelStyle: {
            fontFamily,
            fontWeight: 'bold',
            fontSize: 10
        },
    },
    animationEnabled: false,
    swipeEnabled: false
});

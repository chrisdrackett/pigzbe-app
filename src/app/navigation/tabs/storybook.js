import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import {View, Image} from 'react-native';
import {
    strings,
    SCREEN_WALLET,
    SCREEN_GAME,
    SCREEN_MESSAGES,
    SCREEN_TRANSFER
} from '../../constants';
import {
    color,
    fontFamily
} from '../../styles';
import images from './images';
import styles from './styles';
import StepModule from '../../components/step-module';
import Button from '../../components/button';

const Screen = ({}) => (
    <StepModule
        title={'Screen'}
        icon="keys"
        scroll={true}
        content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis."
        pad
    >
        <View>
            <Button
                theme="outline"
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
            <Button
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
        </View>
    </StepModule>
);

const nav = {
    [SCREEN_WALLET]: {
        screen: Screen,
        navigationOptions: {
            title: strings.menuWallet
        },
        icon: 'wallet',
        iconW: 19,
        iconH: 19
    },
    [SCREEN_TRANSFER]: {
        screen: Screen,
        navigationOptions: {
            title: strings.menuTransfer
        },
        icon: 'transfer',
        iconW: 19,
        iconH: 17
    },
    [SCREEN_GAME]: {
        screen: Screen,
        navigationOptions: {
            title: strings.menuGame
        },
        icon: 'game',
        iconW: 20,
        iconH: 20
    },
    [SCREEN_MESSAGES]: {
        screen: Screen,
        navigationOptions: {
            title: strings.menuMessages
        },
        icon: 'messages',
        iconW: 20,
        iconH: 13
    },
};

const TabBarIcon = ({
    navItem: {
        icon,
        iconW,
        iconH
    },
    focused,
    messagesNotify = true
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
};

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

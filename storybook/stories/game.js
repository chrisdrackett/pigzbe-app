import React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {Game} from '../../src/app/screens/game';
import Learn from '../../src/app/screens/learn';
import GameTasks from '../../src/app/screens/game-tasks';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        addListener: () => ({remove: () => {}}),
        state: {
            key: 'SCREEN_GAME',
            routeName: 'SCREEN_GAME'
        },
        actions: {}
    },
    exchange: {
        XLM: 0.3936,
        BTC: 0.0000147,
        ETH: 0.00025584,
        EUR: 0.102828,
        USD: 0.12,
        JPY: 13.8984,
        GBP: 0.091956,
        GOLD: 0.0031452
    },
    wolloCollected: 10,
    overlayOpen: false,
    kid: {
        name: 'Ella',
        dob: '01/01/2010',
        photo: null,
        balance: '20',
        tasks: []
    },
    parentNickname: 'Dad',
};

storiesOf('Game')
    .add('default', () => (
        <Game {...props}/>
    ))
    .add('with learn', () => (
        <Game {...{
            ...props,
            overlayOpen: true
        }}/>
    ))
    .add('with tasks', () => (
        <Game {...{
            ...props,
            kid: {
                ...props.kid,
                tasks: [{
                    task: 'Clean the car',
                    reward: '10',
                }, {
                    task: 'Do your homework',
                    reward: '100',
                }]
            },
        }}/>
    ))
    .add('learn', () => (
        <View style={{flex: 1, backgroundColor: 'black'}}>
            <Learn {...{
                ...props,
                overlayOpen: true,
            }}/>
        </View>
    ))
    .add('tasks', () => (
        <View style={{flex: 1, backgroundColor: 'black'}}>
            <GameTasks {...{
                ...props,
                kid: {
                    ...props.kid,
                    tasks: [{
                        task: 'Clean the car',
                        reward: '10',
                    }, {
                        task: 'Do your homework',
                        reward: '100',
                    }]
                },
            }}/>
        </View>
    ));

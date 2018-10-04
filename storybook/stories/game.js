import React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {Game} from '../../src/app/screens/game';
import Learn from '../../src/app/screens/learn';
import GameTasks from '../../src/app/screens/game-tasks';
import GameBg from '../../src/app/components/game-bg';
import {
    TRANSFER_TYPE_TASK,
    TRANSFER_TYPE_GIFT,
    TRANSFER_TYPE_ALLOWANCE,
} from 'app/constants/game';

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
        tasks: [],
        actions: [
            {
                memo: 'Task: Tidy your room',
                type: TRANSFER_TYPE_TASK,
                amount: '7',
                totalAmount: '7',
                hash: '6d3c2a5960fc02cb9cc87a6f74d2c8ebc64a795e079589bb3a618185095ac866',
                date: '2018-10-02T13:09:00Z'
            },
            {
                memo: 'From dad',
                type: TRANSFER_TYPE_GIFT,
                amount: '14',
                totalAmount: '14',
                hash: '8dc2a1571d8e781398d67e26b6520dcd23f40eef259e126476441f02160333e6',
                date: '2018-10-02T13:09:15Z'
            },
            {
                memo: 'Allowance #2.1 to Iggy',
                type: TRANSFER_TYPE_ALLOWANCE,
                amount: '2',
                totalAmount: '2',
                hash: 'bc4fc79e3ebb25a7a5cab899654abb262e69ba9b218676604151319a014c26de',
                date: '2018-10-02T13:09:45Z'
            },
            {
                memo: 'Allowance #2.1 to Iggy',
                type: TRANSFER_TYPE_ALLOWANCE,
                amount: '2',
                totalAmount: '2',
                hash: '18e3fb908459e4dfe3d3a4493a9a4ed5fb62295d6eed3330093e7f2543c5e24d',
                date: '2018-10-02T13:09:50Z'
            }
        ]
    },
    parentNickname: 'Dad',
};

storiesOf('Game')
    .add('default', () => (
        <Game {...props}/>
    ))
    .add('bg start', () => (
        <GameBg />
    ))
    .add('bg anim', () => (
        <GameBg targetX={2000} />
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

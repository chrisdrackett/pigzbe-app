import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {BalanceComponent} from '../../src/app/screens/balance';

const props = {
    dispatch: () => {},
    navigation: {
        state: {
            key: 'SCREEN_BALANCE',
            routeName: 'SCREEN_BALANCE'
        },
        actions: {}
    },
    error: null,
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
    balance: '100',
    baseCurrency: 'USD',
    escrow: null,
    firstTime: false
};

storiesOf('Balance')
    .add('default view', () => (
        <BalanceComponent {...props}/>
    ))
    .add('first time', () => (
        <BalanceComponent {...{...props, firstTime: true}}/>
    ));

import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {Transfer} from '../../src/app/screens/transfer';
import {Send} from '../../src/app/screens/send';
import Payments from '../../src/app/components/payments';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        state: {
            key: 'SCREEN_TRANSFER',
            routeName: 'SCREEN_TRANSFER'
        },
        actions: {}
    },
    error: null,
    balance: '100',
    balanceXLM: '2',
    minXLM: '1.51',
    hasGas: true,
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
    sending: false,
    sendStatus: null,
    sendComplete: false,
};

storiesOf('Transfer')
    .add('send', () => (
        <Send {...props}/>
    ))
    .add('payments', () => (
        <Payments {...props}/>
    ))
    .add('transfer', () => (
        <Transfer {...props}/>
    ));

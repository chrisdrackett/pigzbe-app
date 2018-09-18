import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {AllowanceAmount} from '../../src/app/screens/allowance-amount';
import {AllowanceInterval} from '../../src/app/screens/allowance-interval';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        addListener: () => {},
        state: {
            key: 'SCREEN_ALLOWANCE_AMOUNT',
            routeName: 'SCREEN_ALLOWANCE_AMOUNT'
        },
        actions: {},
    },
    baseCurrency: 'GBP',
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
};

storiesOf('Allowance')
    .add('amount', () => (
        <AllowanceAmount {...props}/>
    ))
    .add('interval', () => (
        <AllowanceInterval {...props}/>
    ));

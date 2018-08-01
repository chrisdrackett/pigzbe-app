import React from 'react';
import renderer from 'react-test-renderer';
import {Balance} from './';

const props = {
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
    balance: '0',
    baseCurrency: 'USD',
    escrow: null,
    firstTime: true
};

describe('Balance', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<Balance {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {Send} from './';
import wollo from '../../reducers/wollo';
// import coins from '../../reducers/coins';
import settings from '../../reducers/settings';
import {mockStore} from '../../../setupTests';

const exchange = () => ({
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
    error: null,
    balance: '0',
    publicKey: 'GD5Q7KRFQC3Q7YQPYAZ4G65B65EBCJOVSHPE65MIYQMCLUQULQDKBLUX',
});

describe('Send', () => {
    test('renders correctly', () => {
        renderer.create(
            <Provider store={mockStore({wollo, exchange, settings})}>
                <Send />
            </Provider>
        );
    });
});

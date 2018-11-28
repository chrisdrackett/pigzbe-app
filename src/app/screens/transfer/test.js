import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {Transfer} from './';
import wallet from '../../reducers/wallet';
import keys from '../../reducers/keys';
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
    balances: {WLO: '0', XLM: '0'},
    publicKey: 'GD5Q7KRFQC3Q7YQPYAZ4G65B65EBCJOVSHPE65MIYQMCLUQULQDKBLUX',
});

const props = {
    selectedToken: 'WLO',
};

describe('Transfer', () => {
    test('renders correctly', () => {
        renderer.create(
            <Provider store={mockStore({wallet, exchange, settings, keys})}>
                <Transfer {...props} />
            </Provider>
        );
    });
});

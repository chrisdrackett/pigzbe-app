import React from 'react';
import renderer from 'react-test-renderer';
import ConvertBalance from './';

const coins = ['XLM', 'BTC', 'ETH', 'EUR', 'USD', 'JPY', 'GBP'];
const dps = {XLM: 7, BTC: 8, ETH: 8, EUR: 2, USD: 2, JPY: 0, GBP: 2};

const props = {
    exchange: {XLM: 1, BTC: 0.00004463, ETH: 0.0006136, EUR: 0.3459, USD: 0.4183, JPY: 47.3, GBP: 0.3023},
    balance: '1223.00',
    coins,
    dps,
};

describe('ConvertBalance', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<ConvertBalance {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

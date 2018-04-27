import React from 'react';
import renderer from 'react-test-renderer';
import ConvertBalance from './';

const coins = ['xlm', 'btc', 'eth', 'eur', 'usd', 'jpy', 'gbp'];

const props = {
    exchange: {"XLM":1,"BTC":0.00004463,"ETH":0.0006136,"EUR":0.3459,"USD":0.4183,"JPY":47.3,"GBP":0.3023},
    balance: '1223.00',
    coins,
};

describe('ConvertBalance', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<ConvertBalance {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

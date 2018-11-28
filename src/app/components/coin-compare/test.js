import React from 'react';
import renderer from 'react-test-renderer';
import Coin from './';

const props = {
    coin: 'BTC',
    value: '1231.12312'
};

describe('Coin', () => {
    test('renders correctly', () => {
        renderer.create(<Coin {...props}/>);
    });
});

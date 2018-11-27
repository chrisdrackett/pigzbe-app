import React from 'react';
import renderer from 'react-test-renderer';
import CoinIcon from './';

const props = {
    coin: 'btc',
    style: null
};

describe('CoinIcon', () => {
    test('renders correctly', () => {
        renderer.create(<CoinIcon {...props}/>);
    });
});

import React from 'react';
import renderer from 'react-test-renderer';
import CoinIcon from './';

const props = {
    coin: 'btc',
    style: null
};

describe('CoinIcon', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<CoinIcon {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

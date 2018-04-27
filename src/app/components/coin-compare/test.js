import React from 'react';
import renderer from 'react-test-renderer';
import Coin from './';

const props = {
    coin: 'btc',
    value: '1231.12312'
};

describe('Coin', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<Coin {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

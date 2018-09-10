import React from 'react';
import renderer from 'react-test-renderer';
import WolloInput from './';

const props = {
    currency: 'GBP',
    exchange: 0.091956,
    onChangeAmount: () => {}
};

describe('WolloInput', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<WolloInput {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

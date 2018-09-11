import React from 'react';
import renderer from 'react-test-renderer';
import CurrencyToggle from './';

const props = {
    currency: 'GBP',
    onCurrencyChange: () => {}
};

describe('CurrencyToggle', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<CurrencyToggle {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

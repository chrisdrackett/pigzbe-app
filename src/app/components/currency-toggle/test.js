import React from 'react';
import renderer from 'react-test-renderer';
import CurrencyToggle from './';

const props = {
    currency: 'GBP',
    onCurrencyChange: () => {}
};

describe('CurrencyToggle', () => {
    test('renders correctly', () => {
        renderer.create(<CurrencyToggle {...props}/>);
    });
});

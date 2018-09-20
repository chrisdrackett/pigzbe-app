import React from 'react';
import renderer from 'react-test-renderer';
import Graph from './';

const props = {
    balance: '100.0000',
    balanceConvert: '1231.00',
};

describe('Balance Graph', () => {
    test('renders correctly', () => {
        renderer.create(<Graph {...props}/>);
    });
});

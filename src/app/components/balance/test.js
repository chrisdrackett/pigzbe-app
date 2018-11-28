import React from 'react';
import renderer from 'react-test-renderer';
import Balance from './';

const props = {
    balance: '100.0000'
};

describe('Wollo', () => {
    test('renders correctly', () => {
        renderer.create(<Balance {...props}/>);
    });
});

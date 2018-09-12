import React from 'react';
import renderer from 'react-test-renderer';
import Wollo from './';

const props = {
    balance: '100.0000'
};

describe('Wollo', () => {
    test('renders correctly', () => {
        renderer.create(<Wollo {...props}/>);
    });
});

import React from 'react';
import renderer from 'react-test-renderer';
import {Balance} from './';

const props = {
    balance: '100.0000',
    name: 'Name',
    image: null
};

describe('Balance', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<Balance {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

import React from 'react';
import renderer from 'react-test-renderer';
import {BalanceComponent} from './';

const props = {
    balance: '100.0000',
    name: 'Name',
    image: null
};

describe('Balance', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<BalanceComponent {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

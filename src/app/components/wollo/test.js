import React from 'react';
import renderer from 'react-test-renderer';
import Wollo from './';

const props = {
    balance: '100.0000'
};

describe('Wollo', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<Wollo {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

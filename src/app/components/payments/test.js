import React from 'react';
import renderer from 'react-test-renderer';
import Payments from './';

const props = {
};

describe('Payments', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<Payments {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

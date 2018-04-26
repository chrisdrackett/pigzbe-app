import React from 'react';
import renderer from 'react-test-renderer';
import Pig from './';

describe('Pig', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<Pig/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

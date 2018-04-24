import React from 'react';
import renderer from 'react-test-renderer';
import Help from './';

describe('Help', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<Help/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

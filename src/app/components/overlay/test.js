import React from 'react';
import renderer from 'react-test-renderer';
import Overlay from './';

describe('Overlay', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<Overlay/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

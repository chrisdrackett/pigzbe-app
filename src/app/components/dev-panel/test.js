import React from 'react';
import renderer from 'react-test-renderer';
import DevPanel from './';

describe('DevPanel', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<DevPanel/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

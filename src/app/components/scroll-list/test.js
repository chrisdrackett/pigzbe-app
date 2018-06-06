import React from 'react';
import renderer from 'react-test-renderer';
import ScrollList from './';

const props = {
    items: []
};

describe('Scroll List', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<ScrollList {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

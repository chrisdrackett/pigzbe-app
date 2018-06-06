import React from 'react';
import renderer from 'react-test-renderer';
import Title from './';

const props = {
    text: 'Hello'
};

describe('Title', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<Title {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

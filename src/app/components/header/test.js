import React from 'react';
import renderer from 'react-test-renderer';
import Header from './';

const props = {
    showSettings: false,
    navigation: null
};

describe('Header', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<Header {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

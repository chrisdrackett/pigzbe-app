import React from 'react';
import renderer from 'react-test-renderer';
import Alert from './';

const props = {
    error: new Error('Testing')
};

describe('Alert', () => {
    test('renders correctly with error prop', () => {
        const tree = renderer.create(<Alert {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders correctly without error prop', () => {
        const tree = renderer.create(<Alert/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

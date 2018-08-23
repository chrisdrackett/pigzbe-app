import React from 'react';
import renderer from 'react-test-renderer';
import Alert from './';

const props = {
    error: new Error('Testing')
};

describe('Alert', () => {
    beforeEach(() => {
        // Fixes issue with Animated causing jest to hang
        // https://github.com/facebook/jest/issues/4359
        jest.useFakeTimers()
    });

    test('renders correctly with error prop', () => {
        const tree = renderer.create(<Alert {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders correctly without error prop', () => {
        const tree = renderer.create(<Alert/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

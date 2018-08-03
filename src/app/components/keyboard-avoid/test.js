import React from 'react';
import renderer from 'react-test-renderer';
import KeyboardAvoid from './';

const props = {};

describe('Keyboard Avoid', () => {
    test('renders correctly', () => {
        const tree = renderer.create((
            <KeyboardAvoid {...props}/>
        )).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

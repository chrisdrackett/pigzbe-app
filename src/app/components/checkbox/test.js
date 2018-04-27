import React from 'react';
import renderer from 'react-test-renderer';
import Checkbox from './';

const props = {
    value: false,
    onValueChange: () => {}
};

describe('Checkbox', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<Checkbox {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

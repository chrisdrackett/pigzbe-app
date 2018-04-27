import React from 'react';
import renderer from 'react-test-renderer';
import TextInput from './';

const props = {
    label: 'Label',
    onPress: () => {},
    plain: false
};

describe('TextInput', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<TextInput {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

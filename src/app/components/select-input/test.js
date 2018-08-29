import React from 'react';
import renderer from 'react-test-renderer';
import SelectInput from './';

const props = {
    label: 'Label',
    onPress: () => {},
    value: '',
    placeholder: 'Title',
    onChangeSelection: () => {},
    options: ['Mr', 'Mrs', 'Miss', 'Ms', 'Sir', 'Dr'],
};

describe('SelectInput', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<SelectInput {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('renders correctly with options open', () => {
        const testRenderer = renderer.create(<SelectInput {...props}/>);
        testRenderer.root.instance.setState({open: true});
        const tree = testRenderer.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

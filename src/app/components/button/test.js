import React from 'react';
import renderer from 'react-test-renderer';
import Button from './';

const props = {
    label: 'Label',
    onPress: () => {},
    plain: false
};

describe('Button', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<Button {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders correctly in plain mode', () => {
        const tree = renderer.create(
            <Button {...Object.assign({}, props, {
                plain: true
            })}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

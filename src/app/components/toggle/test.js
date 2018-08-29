import React from 'react';
import renderer from 'react-test-renderer';
import Toggle from './';

const props = {
    label: 'Label',
    onPress: () => {},
    active: false,
    style: {},
    innerStyle: {},
    label: '1',
};

describe('Toggle', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<Toggle {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders correctly in active mode', () => {
        const tree = renderer.create(
            <Toggle {...Object.assign({}, props, {
                active: true
            })}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

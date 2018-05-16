import React from 'react';
import renderer from 'react-test-renderer';
import ButtonIcon from './';

const props = {
    icon: 'banana',
    onClick: () => {},
};

describe('ButtonIcon Icon', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<ButtonIcon {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

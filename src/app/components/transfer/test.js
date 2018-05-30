import React from 'react';
import renderer from 'react-test-renderer';
import Transfer from './';

const props = {
};

describe('Transfer', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<Transfer {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

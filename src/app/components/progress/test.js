import React from 'react';
import renderer from 'react-test-renderer';
import Progress from './';

const props = {
};

describe('Progress', () => {
    test('renders correctly', () => {
        const tree = renderer.create((
            <Progress {...props}/>
        )).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

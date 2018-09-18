import React from 'react';
import renderer from 'react-test-renderer';
import Kids from './';

const props = {
    dispatch: () => {},
    kids: [],
};

describe('Kids', () => {
    test('renders correctly', () => {
        renderer.create(<Kids {...props}/>);
    });
});

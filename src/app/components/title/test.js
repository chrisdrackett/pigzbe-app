import React from 'react';
import renderer from 'react-test-renderer';
import Title from './';

const props = {
    text: 'Hello'
};

describe('Title', () => {
    test('renders correctly', () => {
        renderer.create(<Title {...props}/>);
    });
});

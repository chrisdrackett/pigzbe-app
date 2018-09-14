import React from 'react';
import renderer from 'react-test-renderer';
import Header from './';

const props = {
    showSettings: false,
    navigation: null
};

describe('Header', () => {
    test('renders correctly', () => {
        renderer.create(<Header {...props}/>);
    });
});

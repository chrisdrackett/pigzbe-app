import React from 'react';
import renderer from 'react-test-renderer';
import {LoginComponent} from './';

const props = {
    error: null,
    isLoggingIn: false,
    isLoadingProfile: false
};

describe('Login', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<LoginComponent {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

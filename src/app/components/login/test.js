import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {store} from '../../';
import Login from './';

const props = {
    error: null,
    isLoggingIn: false,
    isLoadingProfile: false
};

describe('Login', () => {
    test('renders correctly', () => {
        const tree = renderer.create((
            <Provider store={store}>
                <Login {...props}/>
            </Provider>
        )).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

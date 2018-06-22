import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import Login from './';
import auth from '../../reducers/auth';
import wollo from '../../reducers/wollo';
import {mockStore} from '../../../setupTests';

const props = {
    error: null,
    isLoggingIn: false,
    isLoadingProfile: false
};

describe('Login', () => {
    test('renders correctly', () => {
        const tree = renderer.create((
            <Provider store={mockStore({auth, wollo})}>
                <Login {...props}/>
            </Provider>
        )).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

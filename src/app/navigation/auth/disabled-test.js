import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {store} from '../../';
import Auth from './';

describe('Navigation: Auth', () => {
    test('renders correctly', () => {
        const tree = renderer.create((
            <Provider store={store}>
                <Auth/>
            </Provider>
        )).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

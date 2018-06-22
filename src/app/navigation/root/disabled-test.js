import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {store} from '../../';
import Root from './';

describe('Navigation: Root', () => {
    test('renders correctly', () => {
        const tree = renderer.create((
            <Provider store={store}>
                <Root/>
            </Provider>
        )).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

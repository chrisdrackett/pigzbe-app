import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {store} from '../../';
import Create from './';

describe('Navigation: Create', () => {
    test('renders correctly', () => {
        const tree = renderer.create((
            <Provider store={store}>
                <Create/>
            </Provider>
        )).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

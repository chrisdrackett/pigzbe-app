import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {store} from '../../';
import Tabs from './';

describe('Navigation: Tabs', () => {
    test('renders correctly', () => {
        const tree = renderer.create((
            <Provider store={store}>
                <Tabs/>
            </Provider>
        )).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {store} from '../../';
import Overlay from './';

describe('Overlay', () => {
    test('renders correctly', () => {
        const tree = renderer.create((
            <Provider store={store}>
                <Overlay/>
            </Provider>
        )).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {store} from '../../';
import Wallet from './';

describe('Navigation: Wallet', () => {
    test('renders correctly', () => {
        const tree = renderer.create((
            <Provider store={store}>
                <Wallet/>
            </Provider>
        )).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {store} from '../../';
import Payments from './';

const props = {
};

describe('Payments', () => {
    test('renders correctly', () => {
        const tree = renderer.create((
            <Provider store={store}>
                <Payments {...props}/>
            </Provider>
        )).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

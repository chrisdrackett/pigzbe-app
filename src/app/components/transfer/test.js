import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {store} from '../../';
import Transfer from './';

const props = {
};

describe('Transfer', () => {
    test('renders correctly', () => {
        const tree = renderer.create((
            <Provider store={store}>
                <Transfer {...props}/>
            </Provider>
        )).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

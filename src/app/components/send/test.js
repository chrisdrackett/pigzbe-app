import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {store} from '../../';
import Send from './';

const props = {
};

describe('Send', () => {
    test('renders correctly', () => {
        const tree = renderer.create((
            <Provider store={store}>
                <Send {...props}/>
            </Provider>
        )).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

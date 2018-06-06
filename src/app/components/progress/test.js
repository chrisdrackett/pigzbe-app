import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {store} from '../../';
import Progress from './';

const props = {
};

describe('Progress', () => {
    test('renders correctly', () => {
        const tree = renderer.create((
            <Provider store={store}>
                <Progress {...props}/>
            </Provider>
        )).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

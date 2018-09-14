import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import Send from './';
import wollo from '../../reducers/wollo';
import coins from '../../reducers/coins';
import {mockStore} from '../../../setupTests';

const props = {
};

describe('Send', () => {
    test('renders correctly', () => {
        renderer.create(
            <Provider store={mockStore({wollo, coins})}>
                <Send {...props}/>
            </Provider>
        );
    });
});

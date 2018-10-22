import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import Learn from './';
import exchange from '../../reducers/exchange';
import game from '../../reducers/game';
import {mockStore} from '../../../setupTests';

describe('Learn', () => {
    test('renders correctly', () => {
        renderer.create(
            <Provider store={mockStore({exchange, game})}>
                <Learn/>
            </Provider>
        );
    });
});

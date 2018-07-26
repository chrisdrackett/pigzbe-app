import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import Learn from './';
import coins from '../../reducers/coins';
import game from '../../reducers/game';
import {mockStore} from '../../../setupTests';

describe('Learn', () => {
    test('renders correctly', () => {
        const tree = renderer.create((
            <Provider store={mockStore({coins, game})}>
                <Learn/>
            </Provider>
        )).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

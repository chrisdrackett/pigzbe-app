import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import Overlay from './';
import coins from '../../reducers/coins';
import game from '../../reducers/game';
import {mockStore} from '../../../setupTests';

describe('Overlay', () => {
    test('renders correctly', () => {
        const tree = renderer.create((
            <Provider store={mockStore({coins, game})}>
                <Overlay/>
            </Provider>
        )).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

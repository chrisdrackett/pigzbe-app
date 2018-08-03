import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import Game from './';
import coins from '../../reducers/coins';
import game from '../../reducers/game';
import {mockStore} from '../../../setupTests';

describe('Game', () => {
    test('renders correctly', () => {
        const navigation = {
            navigate: jest.fn(),
            addListener: jest.fn()
        };
        const tree = renderer.create((
            <Provider store={mockStore({coins, game})}>
                <Game navigation={navigation}/>
            </Provider>
        )).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

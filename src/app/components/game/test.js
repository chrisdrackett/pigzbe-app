import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {store} from '../../';
import Game from './';

describe('Game', () => {
    test('renders correctly', () => {
        const navigation = {
            navigate: jest.fn(),
            addListener: jest.fn()
        };
        const tree = renderer.create((
            <Provider store={store}>
                <Game navigation={navigation}/>
            </Provider>
        )).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

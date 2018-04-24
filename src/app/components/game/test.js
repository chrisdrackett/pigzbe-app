import React from 'react';
import renderer from 'react-test-renderer';
import Game from './';

jest.mock('../../../game/game.html', () => 'html');
jest.mock('WebView', () => 'WebView');

describe('Game', () => {
    test('renders correctly', () => {
        const navigation = {
            navigate: jest.fn(),
            addListener: jest.fn()
        };
        const tree = renderer.create(<Game navigation={navigation}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

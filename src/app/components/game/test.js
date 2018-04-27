import React from 'react';
import renderer from 'react-test-renderer';
import Game from './';

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

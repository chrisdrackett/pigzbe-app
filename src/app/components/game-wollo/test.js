import React from 'react';
import renderer from 'react-test-renderer';
import GameWollo from './';

describe('GameWollo', () => {
    test('renders correctly', () => {
        renderer.create(<GameWollo/>);
    });
});

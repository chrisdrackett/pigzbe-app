import React from 'react';
import renderer from 'react-test-renderer';
import GameCloud from './';

describe('GameCloud', () => {
    test('renders correctly', () => {
        renderer.create(
            <GameCloud value={30} type="allowance" callback={() => {
                console.log('callback');
            }} />
        );
    });
});

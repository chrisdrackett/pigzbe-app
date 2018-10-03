import React from 'react';
import renderer from 'react-test-renderer';
import GameCloudFlow from './';

describe('GameCloudFlow', () => {
    test('renders correctly', () => {
        renderer.create(
            <GameCloudFlow value={30} status={null} cloudData={{}} />
        );
    });
});

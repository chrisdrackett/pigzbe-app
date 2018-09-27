import React from 'react';
import renderer from 'react-test-renderer';
import Leaf from './';

describe('Leaf', () => {
    test('renders correctly', () => {
        renderer.create(
            <Leaf diameter={40} />
        );
    });
});

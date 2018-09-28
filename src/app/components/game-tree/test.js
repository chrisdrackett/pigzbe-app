import React from 'react';
import renderer from 'react-test-renderer';
import Tree from './';

describe('Tree', () => {
    test('renders correctly', () => {
        renderer.create(
            <Tree value={30} />
        );
    });
});

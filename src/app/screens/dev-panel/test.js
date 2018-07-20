import React from 'react';
import renderer from 'react-test-renderer';
import {DevPanelComponent} from './';

describe('DevPanel', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<DevPanelComponent/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

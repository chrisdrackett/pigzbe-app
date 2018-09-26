import React from 'react';
import renderer from 'react-test-renderer';
import {DevPanelComponent} from './';

describe('DevPanel', () => {
    test('renders correctly', () => {
        renderer.create(<DevPanelComponent/>);
    });
});

import React from 'react';
import renderer from 'react-test-renderer';
import {KeysMnemonic} from './';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        state: {
            key: 'SCREEN_SAVE_KEYS',
            routeName: 'SCREEN_SAVE_KEYS'
        },
        actions: {}
    },
};

describe('Keys Mnemonic', () => {
    test('renders correctly', () => {
        renderer.create(
            <KeysMnemonic
                {...props}
            />
        );
    });
});

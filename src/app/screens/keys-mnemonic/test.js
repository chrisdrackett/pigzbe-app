import React from 'react';
import renderer from 'react-test-renderer';
import {KeysMnemonic} from './';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        state: {
            key: 'SCREEN_MNEMONIC',
            routeName: 'SCREEN_MNEMONIC'
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

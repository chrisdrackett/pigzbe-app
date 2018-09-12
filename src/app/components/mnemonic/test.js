import React from 'react';
import renderer from 'react-test-renderer';
import Mnemonic from './';

describe('Mnemonic', () => {
    test('renders correctly', () => {
        renderer.create(
            <Mnemonic
                confirm={false}
                mnemonic="a b c"
                words={['a', 'b', 'c']}
                mnemonicConfirm={['a', 'b', 'c']}
                onSelect={() => {}}
            />
        );
    });
    test('renders correctly with confirm', () => {
        renderer.create(
            <Mnemonic
                confirm={true}
                mnemonic="a b c"
                words={['a', 'b', 'c']}
                mnemonicConfirm={['a', 'b', 'c']}
                onSelect={() => {}}
            />
        );
    });
});

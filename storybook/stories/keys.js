import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {KeysCreate} from '../../src/app/screens/keys-create';
import {KeysMnemonic} from '../../src/app/screens/keys-mnemonic';
import {KeysRestore} from '../../src/app/screens/keys-restore';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        state: {
            key: 'SCREEN_CREATE_KEYS',
            routeName: 'SCREEN_CREATE_KEYS'
        },
        actions: {}
    },
};

storiesOf('Keys')
    .add('create', () => (
        <KeysCreate {...props}/>
    ))
    .add('mnemonic', () => (
        <KeysMnemonic/>
    ))
    .add('mnemonic warn', () => (
        <KeysMnemonic warningOpen={true}/>
    ))
    .add('restore', () => (
        <KeysRestore {...{
            ...props
        }}/>
    ))
    .add('restore error', () => (
        <KeysRestore {...{
            ...props,
            error: new Error('Incorrect. Please try again.')
        }}/>
    ));

import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {KeysCreate} from '../../src/app/screens/keys-create';
import {KeysImport} from '../../src/app/screens/keys-import';
import {KeysMnemonic} from '../../src/app/screens/keys-mnemonic';

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
    .add('import', () => (
        <KeysImport {...props}/>
    ))
    .add('import with error', () => (
        <KeysImport {...{
            ...props,
            error: new Error('Error importing keys')
        }}/>
    ));

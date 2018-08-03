import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {KeysCreate} from '../../src/app/screens/keys-create';
import {KeysImport} from '../../src/app/screens/keys-import';
import {KeysSave} from '../../src/app/screens/keys-save';

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
    .add('import', () => (
        <KeysImport {...props}/>
    ))
    .add('import with error', () => (
        <KeysImport {...{
            ...props,
            error: new Error('Error importing keys')
        }}/>
    ))
    .add('save', () => (
        <KeysSave {...{
            ...props,
            publicKey: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
            secretKey: 'SBBZSQRKV4NDIKRVSXYL3T7NYKR3QP4X23VYGLEWYITFCKFN6Y4GY2PA'
        }}/>
    ));

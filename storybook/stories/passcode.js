import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {PasscodeLogin} from '../../src/app/screens/passcode-login';
import {PasscodeSet} from '../../src/app/screens/passcode-set';

const props = {
    isLoading: false,
    error: null,
    dispatch: () => {}
};

storiesOf('Passcode')
    .add('login', () => (
        <PasscodeLogin {...props}/>
    ))
    .add('set passcode', () => (
        <PasscodeSet {...props}/>
    ))
    .add('verify', () => (
        <PasscodeSet {...{
            ...props,
            code: '111111'
        }}/>
    ))
    .add('loading', () => (
        <PasscodeLogin {...{
            ...props,
            isLoading: true
        }}/>
    ));

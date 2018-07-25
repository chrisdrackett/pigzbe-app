import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {LoginComponent} from '../../src/app/screens/login';
import {SetPasscodeComponent} from '../../src/app/screens/set-passcode';

const props = {
    isLoading: false,
    error: null,
    dispatch: () => {}
};

storiesOf('Passcode')
    .add('login', () => (
        <LoginComponent {...props}/>
    ))
    .add('set passcode', () => (
        <SetPasscodeComponent {...props}/>
    ));

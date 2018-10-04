import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {DeviceAuth} from '../../src/app/screens/device-auth';
import VerfiyCode from '../../src/app/components/verify-code';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        state: {
            key: 'DEVICE_AUTH',
            routeName: 'DEVICE_AUTH'
        },
        actions: {}
    },
    online: true,
    id: null,
    qrCode: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/200px-QR_code_for_mobile_English_Wikipedia.svg.png',
    error: null,
    loading: false,
    requested: false,
    verified: false,
    failCount: 0,
};

storiesOf('Device Auth')
    .add('default', () => (
        <DeviceAuth {...props}/>
    ))
    .add('loading', () => (
        <DeviceAuth {...{
            ...props,
            loading: true
        }}/>
    ))
    .add('registered', () => (
        <DeviceAuth {...{
            ...props,
            id: '123'
        }}/>
    ))
    .add('registered no qr', () => (
        <DeviceAuth {...{
            ...props,
            id: '123',
            qrCode: null,
        }}/>
    ))
    .add('registered loading', () => (
        <DeviceAuth {...{
            ...props,
            id: '123',
            loading: true
        }}/>
    ))
    .add('verify component', () => (
        <VerfiyCode {...{
            ...props,
            id: '123',
            loading: true
        }}/>
    ));

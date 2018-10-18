import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {
    ClaimVIP,
    STEP_DEVICE_AUTH,
    STEP_TOKEN_CODE,
    STEP_TEXT_CODE_REQUEST,
    STEP_TEXT_CODE_ENTER,
    STEP_FINISH
} from '../../src/app/screens/claim-vip';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        addListener: () => {},
        state: {
            key: 'SCREEN_CLAIM_VIP',
            routeName: 'SCREEN_CLAIM_VIP'
        },
        actions: {},
    },
    country: '44',
    email: 'someone@example.com',
    phone: '79347891011',
};

const store = createStore(combineReducers({
    vip: () => ({
        loading: false,
        error: null,
    }),
    settings: () => ({
        email: 'someone@example.com',
        authyId: '1234',
        phone: '79347891011',
        country: '44',
    }),
    auth: () => ({
        touchIdSupport: true,
    }),
    deviceAuth: () => ({
        online: true,
        id: null,
        qrCode: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/200px-QR_code_for_mobile_English_Wikipedia.svg.png',
        error: null,
        loading: false,
        requested: false,
        verified: false,
        failCount: 0,
    }),
}), applyMiddleware(thunk));

storiesOf('ClaimVIP')
    .addDecorator(story => <Provider store={store}>{story()}</Provider>)
    .add('intro', () => (
        <ClaimVIP {...props} />
    ))
    .add('device auth', () => (
        <ClaimVIP {...{
            ...props,
            step: STEP_DEVICE_AUTH
        }} />
    ))
    .add('token code', () => (
        <ClaimVIP {...{
            ...props,
            step: STEP_TOKEN_CODE
        }} />
    ))
    .add('code request', () => (
        <ClaimVIP {...{
            ...props,
            step: STEP_TEXT_CODE_REQUEST
        }} />
    ))
    .add('code enter', () => (
        <ClaimVIP {...{
            ...props,
            step: STEP_TEXT_CODE_ENTER
        }} />
    ))
    .add('finish', () => (
        <ClaimVIP {...{
            ...props,
            step: STEP_FINISH
        }} />
    ));

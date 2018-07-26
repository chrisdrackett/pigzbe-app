import '../../src/app/global.js';
import React from 'react';
import {storiesOf} from '@storybook/react-native';
import Claim from '../../src/app/screens/claim';
import {ClaimICO} from '../../src/app/screens/claim-ico';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        state: {
            key: 'SCREEN_CLAIM',
            routeName: 'SCREEN_CLAIM'
        },
        actions: {}
    },
    config: null,
    user: null,
    events: null,
    contract: null,
    localStorage: null,
    web3: null,
    loading: null,
    errorBurning: null,
    userLogin: () => {},
    initWeb3: () => {},
    transfer: () => {},
    burn: () => {},
    clearClaimData: () => {},
    refreshBalance: () => {}
};

storiesOf('Claim')
    .add('default', () => (
        <Claim {...props}/>
    ))
    .add('claim ico', () => (
        <ClaimICO {...props}/>
    ));

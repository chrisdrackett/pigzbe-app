import React from 'react';
import {storiesOf} from '@storybook/react-native';
import ViewAddress from '../../src/app/screens/view-address';

const props = {
    publicKey: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
};

storiesOf('ViewAddress')
    .add('default', () => (
        <ViewAddress {...props}/>
    ));

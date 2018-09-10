import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View} from 'react-native';
import HDWallet from '../../src/app/components/hd-wallet';
import {KeysMnemonic} from '../../src/app/screens/keys-mnemonic';

const style = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
};

const CenteredView = ({children}) => (
    <View style={style}>
        {children}
    </View>
);

storiesOf('HD Wallet')
    .add('default', () => (
        <CenteredView>
            <KeysMnemonic/>
        </CenteredView>
    ))
    .add('default2', () => (
        <CenteredView>
            <HDWallet/>
        </CenteredView>
    ));

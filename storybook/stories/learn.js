import React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import Learn from '../../src/app/screens/learn';

const style = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 40,
};

const props = {
    dispatch: () => {},
    exchange: {
        XLM: 0.3936,
        BTC: 0.0000147,
        ETH: 0.0002558,
        EUR: 0.102828,
        USD: 0.12,
        JPY: 13.8984,
        GBP: 0.091956,
        GOLD: 0.003145
    },
    wolloCollected: 10,
    overlayOpen: true,
};

storiesOf('Learn')
    .add('default', () => (
        <View style={style}>
            <Learn {...props}/>
        </View>
    ));

import React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import TokenSelector from '../../src/app/components/token-selector';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';

const store = createStore(combineReducers({
    wollo: () => ({
        balance: '0',
        balanceXLM: '0',
        selectedToken: 'WLO',
    }),
}));

storiesOf('TokenSelector')
    .addDecorator(story => <Provider store={store}>{story()}</Provider>)
    .add('default', () => (
        <View style={{flex: 1, backgroundColor: 'black', padding: 45, alignItems: 'center'}}>
            <TokenSelector />
        </View>
    ));

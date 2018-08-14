import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {GameView} from '../../src/app/screens/game';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        addListener: () => ({remove: () => {}}),
        state: {
            key: 'SCREEN_GAME',
            routeName: 'SCREEN_GAME'
        },
        actions: {}
    },
    exchange: {
        XLM: 0.3936,
        BTC: 0.0000147,
        ETH: 0.00025584,
        EUR: 0.102828,
        USD: 0.12,
        JPY: 13.8984,
        GBP: 0.091956,
        GOLD: 0.0031452
    },
    wolloCollected: 10,
    overlayOpen: false,
};

storiesOf('Game')
    .add('default', () => (
        <GameView {...props}/>
    ))
    .add('with learn', () => (
        <GameView {...{
            ...props,
            overlayOpen: true
        }}/>
    ));

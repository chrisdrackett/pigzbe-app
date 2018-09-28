import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, Dimensions} from 'react-native';

import GameMessageBubble from 'app/components/game-message-bubble';
import GameNotification from 'app/components/game-notification';
import GameCounter from 'app/components/game-counter';
import GameCarousel from 'app/components/game-carousel';

const style = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AEECFB'
};
const CenteredView = ({children}) => (
    <View style={style}>
        {children}
    </View>
);

storiesOf('Game Components')
    .add('message bubble - white', () => (
        <CenteredView>
            <GameMessageBubble
                content="I think we are going to be great friends."
            />
        </CenteredView>
    ))
    .add('message bubble - white - more text', () => (
        <CenteredView>
            <GameMessageBubble
                content="This shows you the total of how much Wollo you have saved in the app."
            />
        </CenteredView>
    ))
    .add('message bubble - blue', () => (
        <CenteredView>
            <GameMessageBubble
                top
                content="I think we are going to be great friends."
            />
        </CenteredView>
    ))
    .add('counter', () => (
        <CenteredView>
            <GameCounter
                value="10"
            />
        </CenteredView>
    ))
    .add('counter 50.868', () => (
        <CenteredView>
            <GameCounter
                small
                value="50.868"
            />
        </CenteredView>
    ))
    .add('notification', () => (
        <CenteredView>
            <GameNotification
                amount="50"
                text="Allowance"
            />
        </CenteredView>
    ))
    .add('notification task', () => (
        <CenteredView>
            <GameNotification
                amount="50"
                text="Take out trash all week"
            />
        </CenteredView>
    ))
    .add('notification 100.4567', () => (
        <CenteredView>
            <GameNotification
                amount="100.4567"
                text="Allowance"
            />
        </CenteredView>
    ))
    .add('notification carousel', () => (
        <CenteredView>
            <GameCarousel
                {...{
                    Item: GameNotification,
                    width: Dimensions.get('window').width,
                    itemWidth: 200,
                    data: [{
                        key: '1',
                        amount: '1',
                        text: 'Allowance',
                    }, {
                        key: '2',
                        amount: '2',
                        text: 'Wash the dishes',
                    }, {
                        key: '3',
                        amount: '3',
                        text: 'Do your homework',
                    }]
                }}
            />
        </CenteredView>
    ));

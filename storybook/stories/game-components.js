import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, Text} from 'react-native';

import GameMessageBubble from 'app/components/game-message-bubble';

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
    ));
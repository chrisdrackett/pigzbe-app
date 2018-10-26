import React, {Component} from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, Dimensions} from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {kids} from './dashboard';
import {
    TRANSFER_TYPE_ALLOWANCE,
    TRANSFER_TYPE_TASK,
    TRANSFER_TYPE_PRESENT,
} from 'app/constants/game';


import Button from 'app/components/button';

import GameBG from 'app/components/game-bg';
import GameMessageBubble from 'app/components/game-message-bubble';
import GameNotification from 'app/components/game-notification';
import GameCounter from 'app/components/game-counter';
import GameCarousel from 'app/components/game-carousel';
import GameGoalOverlay from 'app/components/game-goal-overlay';

const store = createStore(combineReducers({
    settings: () => ({
        baseCurrency: 'GBP'
    }),
    exchange: () => ({
        exchange: {
            XLM: 0.3936,
            BTC: 0.0000147,
            ETH: 0.00025584,
            EUR: 0.102828,
            USD: 0.12,
            JPY: 13.8984,
            GBP: 0.091956,
            GOLD: 0.0031452
        }
    }),
    wollo: () => ({
        loading: false,
        payments: [],
    }),
    kids: () => ({
        goalLoading: false,
    }),
}), applyMiddleware(thunk));

const style = {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
};
const CenteredView = ({children}) => (
    <View style={{flex: 1}}>
        <GameBG />
        <View style={style}>
            {children}
        </View>
    </View>
);

class GoalOverlayTest extends Component {
    state = {isOpen: false};
    render() {
        return (
            <CenteredView>
                <Button label="Open goal overlay" style={{marginBottom: 200}} onPress={() => this.setState({isOpen: true})} />
                <Provider store={store}>
                    <GameGoalOverlay
                        kid={kids.slice(0, 1).pop()}
                        isOpen={this.state.isOpen}
                        onClose={() => this.setState({isOpen: false})}
                        {...this.props}
                    />
                </Provider>
            </CenteredView>
        );
    }
}

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
    .add('goal overlay - new', () => (
        <GoalOverlayTest />
    ))
    .add('goal overlay - existing', () => (
        <GoalOverlayTest
            goalAddress="aaa"
            goals={[
                {address: 'aaa', name: 'Goal A'},
                {address: 'bbb', name: 'Goal B'},
                {address: 'ccc', name: 'Goal B'},
            ]}
            goalBalance={130}
            parentName="Mum"
        />
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
                memo="Allowance"
            />
        </CenteredView>
    ))
    .add('notification task', () => (
        <CenteredView>
            <GameNotification
                amount="50"
                memo="Task: Take out trash all week"
            />
        </CenteredView>
    ))
    .add('notification 100.4567', () => (
        <CenteredView>
            <GameNotification
                amount="100.4567"
                memo="Task: Tidy your room"
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
                    data: [
                        {
                            memo: 'Task: Tidy your room',
                            type: TRANSFER_TYPE_TASK,
                            amount: '7',
                            totalAmount: '7',
                            hash: '6d3c2a5960fc02cb9cc87a6f74d2c8ebc64a795e079589bb3a618185095ac866',
                            date: '2018-10-02T13:09:00Z'
                        },
                        {
                            memo: 'From dad',
                            type: TRANSFER_TYPE_PRESENT,
                            amount: '14',
                            totalAmount: '14',
                            hash: '8dc2a1571d8e781398d67e26b6520dcd23f40eef259e126476441f02160333e6',
                            date: '2018-10-02T13:09:15Z'
                        },
                        {
                            memo: 'Allowance #2.1 to Iggy',
                            type: TRANSFER_TYPE_ALLOWANCE,
                            amount: '2',
                            totalAmount: '2',
                            hash: 'bc4fc79e3ebb25a7a5cab899654abb262e69ba9b218676604151319a014c26de',
                            date: '2018-10-02T13:09:45Z'
                        },
                        {
                            memo: 'Allowance #2.1 to Iggy',
                            type: TRANSFER_TYPE_ALLOWANCE,
                            amount: '2',
                            totalAmount: '2',
                            hash: '18e3fb908459e4dfe3d3a4493a9a4ed5fb62295d6eed3330093e7f2543c5e24d',
                            date: '2018-10-02T13:09:50Z'
                        }
                    ]
                }}
            />
        </CenteredView>
    ));

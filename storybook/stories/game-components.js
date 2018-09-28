import React, {Component} from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, Dimensions} from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
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
    coins: () => ({
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
    <View style={{ flex: 1}}>
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
                        isOpen={this.state.isOpen}
                        onClose={() => this.setState({isOpen: false})}
                        {...this.props}
                    />
                </Provider>
            </CenteredView>
        )
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

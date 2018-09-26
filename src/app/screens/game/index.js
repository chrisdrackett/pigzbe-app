import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import styles from './styles';
import Learn from '../learn';
import GameTasks from '../game-tasks';

export class Game extends Component {
    render() {
        const {
            dispatch,
            exchange,
            wolloCollected,
            overlayOpen,
            kid,
            parentNickname
        } = this.props;

        return (
            <View style={styles.full}>
                <View
                    ref={el => (this.el = el)}
                    style={styles.full}
                />
                <Learn
                    dispatch={dispatch}
                    exchange={exchange}
                    wolloCollected={wolloCollected}
                    overlayOpen={overlayOpen}
                />
                {kid.tasks.length ? (
                    <GameTasks
                        dispatch={dispatch}
                        parentNickname={parentNickname}
                        kid={kid}
                    />
                ) : null}
                <View style={{position: 'absolute', top: 30, left: 0, padding: 5, backgroundColor: 'white'}}>
                    <Text>{kid.name}</Text>
                    <Text>Address: {kid.address}</Text>
                    <Text>Balance: {kid.balance}</Text>
                    <Text>Tasks: {kid.tasks.length}</Text>
                </View>
            </View>
        );
    }
}

export default connect(state => ({
    kid: state.kids.kids.find(k => k.address === state.auth.kid),
    parentNickname: state.kids.parentNickname,
    exchange: state.coins.exchange,
    wolloCollected: state.game.wolloCollected,
    overlayOpen: state.game.overlayOpen
}))(Game);

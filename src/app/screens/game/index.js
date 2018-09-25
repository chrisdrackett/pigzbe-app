import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import styles from './styles';
import Learn from '../learn';
import {gameWolloCollected, gameOverlayOpen} from '../../actions';
import {PAUSE, RESUME, READY, COLLECTED, LEARN, LOG, ERROR} from '../../../game/constants';
import GameTasks from '../game-tasks';

export class Game extends Component {
    state = {
        message: 'Loading game',
    }

    onBlur = () => this.sendPostMessage(PAUSE)

    onFocus = () => this.sendPostMessage(RESUME)

    onError = error => console.log(error)

    onMessage = event => {
        const {dispatch} = this.props;
        const message = event.nativeEvent.data;
        const {name, value} = JSON.parse(message);

        // console.log('On Message', name, value);
        switch (name) {
            case READY:
                this.setState({loading: false});
                break;
            case COLLECTED:
                dispatch(gameWolloCollected(value));
                break;
            case LEARN:
                dispatch(gameOverlayOpen(true));
                break;
            case LOG:
                console.log('webview log', value);
                break;
            case ERROR:
                console.log('webview error', value);
                break;
            default:
        }
    }

    sendPostMessage(msg) {
        console.log('Sending post message', msg);
        this.el.postMessage(msg);
    }

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

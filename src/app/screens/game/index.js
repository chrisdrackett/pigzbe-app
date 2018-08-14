import React from 'react';
import {connect} from 'react-redux';
import {Platform, View, WebView} from 'react-native';
import NavListener from './nav-listener';
import styles from './styles';
import Learn from '../learn';
import Loader from '../../components/loader';
import {gameWolloCollected, gameOverlayOpen} from '../../actions';
import {PAUSE, RESUME, READY, COLLECTED, LEARN, LOG, ERROR} from '../../../game/constants';

console.log('Platform.OS', Platform.OS);
const source = Platform.OS === 'android' ? {uri: 'file:///android_asset/game.html'} : require('../../../game/game.html');
// const source = Platform.OS === 'android' ? {uri: 'file:///android_asset/game.html'} : {uri: './game.html'};

export class GameView extends NavListener {
    state = {
        loading: true,
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
        const {dispatch, exchange, wolloCollected, overlayOpen} = this.props;

        return (
            <View style={styles.full}>
                <WebView
                    ref={el => (this.el = el)}
                    style={styles.full}
                    source={source}
                    originWhitelist={['*']}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    mediaPlaybackRequiresUserAction={false}
                    scrollEnabled={false}
                    bounces={false}
                    onMessage={this.onMessage}
                    onError={this.onError}
                />
                <Learn
                    dispatch={dispatch}
                    exchange={exchange}
                    wolloCollected={wolloCollected}
                    overlayOpen={overlayOpen}
                />
                <Loader
                    loading={this.state.loading}
                    message={this.state.message}
                />
            </View>
        );
    }
}

export default connect(state => ({
    exchange: state.coins.exchange,
    wolloCollected: state.game.wolloCollected,
    overlayOpen: state.game.overlayOpen
}))(GameView);

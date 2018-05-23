import React from 'react';
import {connect} from 'react-redux';
import {Platform, View, WebView} from 'react-native';
import NavListener from './nav-listener';
import styles from './styles';
import Overlay from '../overlay';
import Loader from '../loader';
import {gameWolloCollected, gameOverlayOpen} from '../../actions';

// const localWebURL = require('../../../game/game.html');
console.log('Platform.OS', Platform.OS);
const source = Platform.OS === 'android' ? {uri: 'file:///android_asset/game.html'} : require('../../../game/game.html');

// https://facebook.github.io/react-native/docs/webview.html

class GameView extends NavListener {
    state = {
        isLoading: true
    }

    onBlur() {
        this.sendPostMessage('pause');
    }

    onFocus() {
        this.sendPostMessage('resume');
    }

    onMessage(event) {
        const {dispatch} = this.props;
        const message = event.nativeEvent.data;
        const {name, value} = JSON.parse(message);
        console.log('On Message', name, value);
        switch (name) {
            case 'ready':
                this.setState({isLoading: false});
                break;
            case 'collected':
                dispatch(gameWolloCollected(value));
                break;
            case 'learn':
                dispatch(gameOverlayOpen(true));
                break;
            case 'log':
                console.log('webview log', value);
                break;
            case 'error':
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
        return (
            <View style={styles.full}>
                <WebView
                    ref={el => (this.el = el)}
                    style={styles.full}
                    source={source}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    mediaPlaybackRequiresUserAction={false}
                    onMessage={event => this.onMessage(event)}
                    onError={event => console.log(event)}
                />
                <Overlay/>
                <Loader isLoading={this.state.isLoading} message={'Loading'}/>
            </View>
        );
    }
}

export default connect()(GameView);

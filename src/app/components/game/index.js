import React from 'react';
import {View, WebView} from 'react-native';
import NavListener from './nav-listener';
import styles from './styles';
import Overlay from '../overlay';
import Loader from '../loader';

const localWebURL = require('../../../game/game.html');

// https://facebook.github.io/react-native/docs/webview.html

export default class GameView extends NavListener {
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
        const message = event.nativeEvent.data;
        console.log('On Message', message);
        switch (message) {
            case 'ready':
                this.setState({isLoading: false});
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
                    source={localWebURL}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    onMessage={event => this.onMessage(event)}
                />
                <Overlay coins={1531}/>
                <Loader isLoading={this.state.isLoading} message={'Loading'}/>
            </View>
        );
    }
}

import React from 'react';
import {View, WebView} from 'react-native';
import NavListener from './nav-listener';
import styles from './styles';
import Overlay from '../overlay';

const localWebURL = require('../../../game/game.html');

// https://facebook.github.io/react-native/docs/webview.html

export default class GameView extends NavListener {
    onBlur() {
        this.sendPostMessage('pause');
    }

    onFocus() {
        this.sendPostMessage('resume');
    }

    onMessage(event) {
        console.log('On Message', event.nativeEvent.data);
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
                <Overlay/>
            </View>
        );
    }
}

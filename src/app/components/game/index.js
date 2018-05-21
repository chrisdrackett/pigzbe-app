import React from 'react';
import {connect} from 'react-redux';
import {View, WebView} from 'react-native';
import NavListener from './nav-listener';
import styles from './styles';
import Overlay from '../overlay';
import Loader from '../loader';
import {gameWolloCollected} from '../../actions';

const localWebURL = require('../../../game/game.html');

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
        const message = event.nativeEvent.data;
        const {name, value} = JSON.parse(message);
        console.log('On Message', name, value);
        switch (name) {
            case 'ready':
                this.setState({isLoading: false});
                break;
            case 'collected':
                this.props.dispatch(gameWolloCollected(value));
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
                <Overlay/>
                <Loader isLoading={this.state.isLoading} message={'Loading'}/>
            </View>
        );
    }
}

export default connect()(GameView);

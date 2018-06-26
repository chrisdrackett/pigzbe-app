import React from 'react';
import {connect} from 'react-redux';
import {Platform, View, WebView, Text, TouchableOpacity} from 'react-native';
import NavListener from './nav-listener';
import styles from './styles';
import Overlay from '../overlay';
import Loader from '../loader';
import {gameWolloCollected, gameOverlayOpen} from '../../actions';
import {strings} from '../../constants';
import {
    PAUSE,
    RESUME,
    READY,
    COLLECTED,
    LEARN,
    LOG,
    ERROR,
    ACCELEROMETER
} from '../../../game/constants';
import Controller, {OINK} from '../controller';

// const localWebURL = require('../../../game/game.html');
console.log('Platform.OS', Platform.OS);
const source = Platform.OS === 'android' ? {uri: 'file:///android_asset/game.html'} : require('../../../game/game.html');

// https://facebook.github.io/react-native/docs/webview.html

const ControllerInfo = ({scanning, connected, onPress}) => (
    <TouchableOpacity
        onPress={onPress}
        style={{
            position: 'absolute',
            bottom: 25,
            right: 18,
            backgroundColor: scanning ? '#ffaa00' : connected ? '#00ff00' : '#ccc',
            height: 29,
            borderRadius: 29 / 2,
            paddingTop: 3,
            paddingBottom: 3,
            paddingLeft: 3,
            paddingRight: 6,
        }}>
        <Text style={{
            color: '#000',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            lineHeight: 26,
        }}>
            {scanning ? 'Scanning' : connected ? 'Connected' : 'Idle' }
        </Text>
    </TouchableOpacity>
);

class GameView extends NavListener {
    state = {
        isLoading: true,
        connected: false,
        scanning: false
    }

    onBlur() {
        this.sendPostMessage(PAUSE);
    }

    onFocus() {
        this.sendPostMessage(RESUME);
    }

    componentDidMount() {
        Controller.init();
        Controller.on('accelerometer', this.onAccelerometer, this);
        Controller.on('connect', () => this.setState({connected: true}));
        Controller.on('disconnect', () => this.setState({connected: false}));
        Controller.on('scanning', value => this.setState({scanning: value}));
    }

    componentWillUnmount() {
        Controller.destroy();
    }

    onAccelerometer(accelerometer) {
        // this.sendPostMessage(ACCELEROMETER, accelerometer);
        if (this.postingAccelerometer) {
            return;
        }

        requestAnimationFrame(() => {
            this.postingAccelerometer = false;
            this.sendPostMessage(ACCELEROMETER, accelerometer);
        });

        this.postingAccelerometer = true;
    }

    oink() {
        const result = Controller.send(OINK);
        console.log('result', result);
    }

    onMessage(event) {
        const {dispatch} = this.props;
        const message = event.nativeEvent.data;
        const {name, value} = JSON.parse(message);
        console.log('On Message', name, value);
        switch (name) {
            case READY:
                this.setState({isLoading: false});
                Controller.scan();
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

    sendPostMessage(command, data) {
        // console.log('Sending post message', command);
        this.el.postMessage(JSON.stringify({command, data}));
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
                <ControllerInfo
                    scanning={this.state.scanning}
                    connected={this.state.connected}
                    onPress={() => Controller.disconnect()}
                />
                <Loader
                    isLoading={this.state.isLoading}
                    message={strings.gameLoading}
                />
            </View>
        );
    }
}

export default connect()(GameView);

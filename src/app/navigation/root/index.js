import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NetInfo, AppState, PanResponder, View} from 'react-native';
import BackgroundTask from 'react-native-background-task';
import Auth from '../auth';
import Alert from 'app/components/alert';
import {connectionState, appDeleteAlert, authLogout, appActive} from 'app/actions';
import {strings} from 'app/constants';

class Root extends Component {

    panResponder = null
    timeout = null

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponderCapture: this.onShouldSetPanResponderCapture,
            onPanResponderTerminationRequest: this.onShouldSetPanResponderCapture,
            onStartShouldSetPanResponderCapture: this.onShouldSetPanResponderCapture,
        });
    }

    async componentDidMount() {
        NetInfo.isConnected.fetch(this.onConnectionChange);
        NetInfo.isConnected.addEventListener('connectionChange', this.onConnectionChange);

        AppState.addEventListener('change', this.onAppStateChange);

        BackgroundTask.schedule();

        setInterval(this.checkConnection, 1000 * 10);
    }

    checkConnection = async () => {
        if (AppState.currentState !== 'active') {
            return;
        }
        try {
            await fetch('https://pigzbe.com', {method: 'HEAD'});
            this.onConnectionChange(true, 'ping');
        } catch (e) {
            this.onConnectionChange(false, 'ping');
        }
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.onConnectionChange);
        AppState.removeEventListener('change', this.onAppStateChange);
    }

    onConnectionChange = (isConnected, source = 'netinfo') => {
        if (isConnected === this.props.isConnected) {
            return;
        }
        console.log('=======> onConnectionChange isConnected', isConnected, source);
        this.props.dispatch(connectionState(isConnected));
    }

    onAppStateChange = (nextAppState) => {
        this.props.dispatch(appActive(nextAppState === 'active'));

        if (nextAppState === 'background' && !this.props.stayLoggedIn) {
            this.onLogout();
        }
    }

    onDismiss = () => this.props.dispatch(appDeleteAlert())

    onLogout = () => this.props.dispatch(authLogout())

    onShouldSetPanResponderCapture = () => {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.onLogout, this.props.inactivityTimeout);
        return false;
    }

    render() {
        const {alertType, alertMessage, isConnected} = this.props;
        return (
            <View style={{flex: 1}} {...this.panResponder.panHandlers}>
                <Auth/>
                <Alert
                    type={alertType || (!isConnected ? 'error' : null)}
                    message={alertMessage || (!isConnected ? strings.errorConnection : null)}
                    onDismiss={alertMessage ? this.onDismiss : null}
                />
            </View>
        );
    }
}

export default connect(
    state => ({
        isActive: state.app.isActive,
        isConnected: state.app.isConnected,
        stayLoggedIn: state.app.stayLoggedIn,
        alertType: state.app.alertType,
        alertMessage: state.app.alertMessage,
        inactivityTimeout: state.settings.inactivityTimeout,
    })
)(Root);

import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {NetInfo, AppState} from 'react-native';
import BackgroundTask from 'react-native-background-task';
import Auth from '../auth';
import Alert from 'app/components/alert';
import {connectionState, appDeleteAlert, authLogout} from 'app/actions';
import {strings} from 'app/constants';

class Root extends Component {

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
        if (nextAppState === 'background') {
            this.props.dispatch(authLogout());
        }
    }

    onDismiss = () => this.props.dispatch(appDeleteAlert())

    render() {
        const {alertType, alertMessage, isConnected} = this.props;
        return (
            <Fragment>
                <Auth/>
                <Alert
                    type={alertType || (!isConnected ? 'error' : null)}
                    message={alertMessage || (!isConnected ? strings.errorConnection : null)}
                    onDismiss={alertMessage ? this.onDismiss : null}
                />
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        isConnected: state.app.isConnected,
        alertType: state.app.alertType,
        alertMessage: state.app.alertMessage,
    })
)(Root);

import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {NetInfo} from 'react-native';
import Tabs from '../tabs';
import Create from '../create';
import Auth from '../auth';
import Alert from '../../components/alert';
import {connectionState} from '../../actions/check-connection';

class Root extends Component {

    componentDidMount() {
        NetInfo.isConnected.getConnectionInfo().then(this._handleConnectionChange).catch(() => {
            this.props.dispatch(connectionState({status: false}));
        });
        NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
    }

    _handleConnectionChange = (isConnected) => {
        this.props.dispatch(connectionState({status: isConnected}));
    }

    getChild() {
        const {
            isLoggedIn,
            hasProfile,
            isLoading,
        } = this.props;
        if (isLoggedIn && hasProfile && !isLoading) {
            return <Tabs/>;
        }

        if (isLoggedIn && !isLoading) {
            return <Create/>;
        }

        return <Auth/>;
    }

    onDismiss = () => {

    }

    render() {
        const {
            error,
            isConnected,
        } = this.props;

        const errorMessage = error || (!isConnected ? new Error('Internet is down') : null);

        return (
            <Fragment>
                {this.getChild()}
                <Alert error={errorMessage} onDismiss={this.onDismiss} />
            </Fragment>
        );
    }
}

const filterErrors = (state) => {
    const key = Object.keys(state).find(r => state[r].error);
    return state[key] ? state[key].error : null;
};

export default connect(
    state => ({
        error: filterErrors(state),
        isLoggedIn: state.auth.isLoggedIn,
        hasProfile: state.profile.hasProfile,
        isLoading: state.loader.isLoading,
        isConnected: state.connected.isConnected,
    })
)(Root);

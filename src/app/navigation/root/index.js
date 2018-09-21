import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {NetInfo} from 'react-native';
import Auth from '../auth';
import Alert from '../../components/alert';
import {connectionState, appAddAlert, appDeleteAlert} from '../../actions';
import {strings} from '../../constants';

class Root extends Component {

    componentDidMount() {
        NetInfo.isConnected.fetch(this.onConnectionChange);
        NetInfo.isConnected.addEventListener('connectionChange', this.onConnectionChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.onConnectionChange);
    }

    onConnectionChange = isConnected => this.props.dispatch(connectionState(isConnected))

    render() {
        const {alertType, alertMessage, isConnected} = this.props;
        return (
            <Fragment>
                <Auth/>
                <Alert
                    type={alertType || (!isConnected ? 'error' : null)}
                    message={alertMessage || (!isConnected ? strings.errorConnection : null)}
                    onDismiss={alertMessage ? () => this.props.dispatch(appDeleteAlert()) : null}
                />
            </Fragment>
        );
    }
}

// const filterErrors = (state) => {
//     const key = Object.keys(state).find(r => state[r].error);
//     return state[key] ? state[key].error : null;
// };

export default connect(
    state => ({
        // error: filterErrors(state),
        isConnected: state.app.isConnected,
        alertType: state.app.alertType,
        alertMessage: state.app.alertMessage,
    })
)(Root);

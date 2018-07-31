import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {NetInfo} from 'react-native';
import Auth from '../auth';
import Alert from '../../components/alert';
import {connectionState} from '../../actions/check-connection';
import {strings} from '../../constants';

class Root extends Component {

    componentDidMount() {
        NetInfo.isConnected.fetch(this._handleConnectionChange);
        NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
    }

    _handleConnectionChange = (isConnected) => {
        // console.log('NetInfo.isConnected', isConnected);
        this.props.dispatch(connectionState({status: isConnected}));
    }

    render() {
        const {
            error,
            isConnected,
        } = this.props;

        const errorMessage = error || (!isConnected ? new Error(strings.errorConnection) : null);

        return (
            <Fragment>
                <Auth/>
                <Alert error={errorMessage}/>
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
        isConnected: state.connected.isConnected,
    })
)(Root);

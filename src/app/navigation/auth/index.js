import React, {Component} from 'react';
import {connect} from 'react-redux';
import Tabs from '../tabs';
import Create from '../create';
import Home from '../home';

class Auth extends Component {
    render() {
        const {
            isLoggedIn,
            hasProfile,
            isLoading,
        } = this.props;

        console.log('isLoggedIn', isLoggedIn);
        console.log('hasProfile', hasProfile);
        console.log('isLoading', isLoading);

        if (isLoggedIn && hasProfile && !isLoading) {
            return <Tabs/>;
        }

        if (isLoggedIn && !isLoading) {
            return <Create/>;
        }

        return <Home/>;
    }
}

export default connect(
    state => ({
        isLoggedIn: state.auth.isLoggedIn,
        hasProfile: state.profile.hasProfile,
        isLoading: state.loader.isLoading,
        isConnected: state.connected.isConnected,
    })
)(Auth);

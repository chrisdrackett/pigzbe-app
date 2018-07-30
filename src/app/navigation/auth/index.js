import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Tabs from '../tabs';
import Keys from '../keys';
import Home from '../home';
import Footer from '../../components/footer';

class Auth extends Component {
    render() {
        const {
            isLoggedIn,
            keysSaved,
            isLoading,
        } = this.props;

        console.log('isLoggedIn', isLoggedIn);
        console.log('keysSaved', keysSaved);
        console.log('isLoading', isLoading);

        if (isLoggedIn && keysSaved && !isLoading) {
            return (
                <Fragment>
                    <Tabs/>
                    <Footer/>
                </Fragment>
            );
        }

        if (isLoggedIn && !isLoading) {
            return <Keys/>;
        }

        return <Home/>;
    }
}

export default connect(
    state => ({
        isLoggedIn: state.auth.isLoggedIn,
        keysSaved: state.wollo.keysSaved,
        isLoading: state.loader.isLoading,
        isConnected: state.connected.isConnected,
    })
)(Auth);

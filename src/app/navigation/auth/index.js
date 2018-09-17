import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Tabs from '../tabs';
import Keys from '../keys';
import Home from '../home';
import Game from '../../screens/game';
import Footer from '../../components/footer';

class Auth extends Component {
    render() {
        const {loggedIn, kid, keysSaved, loading} = this.props;

        // console.log('loggedIn', loggedIn);
        // console.log('keysSaved', keysSaved);
        // console.log('loading', loading);

        if (loggedIn && keysSaved && !loading) {
            return (
                <Fragment>
                    <Tabs />
                    <Footer />
                </Fragment>
            );
        }

        if (loggedIn && !loading && !kid) {
            return <Keys />;
        }

        if (loggedIn && !loading && kid) {
            return <Game />;
        }

        return <Home />;
    }
}

export default connect(state => ({
    loggedIn: state.auth.loggedIn,
    kid: state.auth.kid,
    keysSaved: state.keys.keysSaved,
    loading: state.loader.loading
}))(Auth);

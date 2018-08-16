import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Tabs from "../tabs";
import Keys from "../keys";
import Home from "../home";
import Game from "../../screens/game";
import Footer from "../../components/footer";

class Auth extends Component {
    render() {
        const { loggedIn, address, keysSaved, loading } = this.props;

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

        if (loggedIn && !loading && !address) {
            return <Keys />;
        }

        if (loggedIn && !loading && address) {
            return <Game navigation={{addListener: ()=>{}}} />;
        }

        return <Home />;
    }
}

export default connect(state => ({
    loggedIn: state.auth.loggedIn,
    address: state.auth.address,
    keysSaved: state.wollo.keysSaved,
    loading: state.loader.loading
}))(Auth);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Game from '../../screens/game';
import Loader from '../../components/loader';
import {loginAndLoadKid} from '../../actions';

class Kid extends Component {
    static defaultProps = {
        loading: true,
    }

    componentWillMount() {
        // TODO: move this to kid login and supply passcode as arg
        this.props.dispatch(loginAndLoadKid());
    }

    render() {
        const {
            loggedIn,
            loading,
        } = this.props;

        console.log('loading', loading);

        if (loading) {
            return <Loader loading message="Loading content" />;
        }

        if (loggedIn && !loading) {
            return <Game navigation={this.props.navigation}/>;
        }

        // TODO: return kid create login or login screen
        return <Game navigation={this.props.navigation}/>;
    }
}

export default connect(
    state => ({
        loggedIn: state.auth.loggedIn,
        loading: state.loader.loading,
    })
)(Kid);

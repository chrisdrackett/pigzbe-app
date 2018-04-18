import React, {Component} from 'react';
import {connect} from 'react-redux';
import Nav from '../nav';
import Profile from '../profile';
import Login from '../login';
import {loadFont} from '../styles';
import {Platform} from 'react-native';

class Home extends Component {
    state = {
        fontLoaded: false
    }

    componentDidMount() {
        console.log('Platform', Platform.OS);
        loadFont().then(() => {
            console.log('FONT LOADED');
            this.setState({fontLoaded: true});
        });
    }

    render() {
        const {
            fontLoaded
        } = this.state;

        if (!fontLoaded) {
            return null;
        }

        const {
            isLoggedIn,
            hasProfile
        } = this.props;

        if (isLoggedIn && hasProfile) {
            return <Nav/>;
        }

        if (isLoggedIn) {
            return <Profile/>;
        }

        return <Login/>;
    }
}

export default connect(
    state => ({
        isLoggedIn: state.auth.isLoggedIn,
        hasProfile: state.profile.hasProfile
    })
)(Home);

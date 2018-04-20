import React, {Component} from 'react';
import {connect} from 'react-redux';
import Nav from '../nav';
import Account from '../account';
import Auth from '../auth';
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
            hasProfile,
            isLoadingProfile
        } = this.props;

        if (isLoggedIn && hasProfile) {
            return <Nav/>;
        }

        if (isLoggedIn && !isLoadingProfile) {
            return <Account/>;
        }

        return <Auth/>;
    }
}

export default connect(
    state => ({
        isLoggedIn: state.auth.isLoggedIn,
        hasProfile: state.profile.hasProfile,
        isLoadingProfile: state.profile.isLoadingProfile
    })
)(Home);

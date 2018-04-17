import React, {Component} from 'react';
import {connect} from 'react-redux';
import Nav from '../nav';
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
            isLoggedIn
        } = this.props;

        return isLoggedIn ? <Nav/> : <Login/>;
    }
}

export default connect(
    state => ({
        isLoggedIn: state.auth.isLoggedIn
    })
)(Home);

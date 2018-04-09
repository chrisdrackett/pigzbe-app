import React from 'react';
import {connect} from 'react-redux';
import Nav from '../nav';
import Login from '../login';

export default connect(
    state => ({
        isLoggedIn: state.auth.isLoggedIn
    })
)(({
    isLoggedIn
}) => (
    isLoggedIn ? <Nav/> : <Login/>
));

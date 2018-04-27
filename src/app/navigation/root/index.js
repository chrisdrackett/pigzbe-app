import React from 'react';
import {connect} from 'react-redux';
import Tabs from '../tabs';
import Create from '../create';
import Auth from '../auth';

export default connect(
    state => ({
        isLoggedIn: state.auth.isLoggedIn,
        hasProfile: state.profile.hasProfile,
        isLoading: state.loader.isLoading
    })
)(({
    isLoggedIn,
    hasProfile,
    isLoading
}) => {
    if (isLoggedIn && hasProfile && !isLoading) {
        return <Tabs/>;
    }

    if (isLoggedIn && !isLoading) {
        return <Create/>;
    }

    return <Auth/>;
});

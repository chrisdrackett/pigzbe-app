import React from 'react';
import {connect} from 'react-redux';
import Tabs from '../tabs';
import Create from '../create';
import Auth from '../auth';

export default connect(
    state => ({
        isLoggedIn: state.auth.isLoggedIn,
        hasProfile: state.profile.hasProfile,
        isLoadingProfile: state.profile.isLoadingProfile
    })
)(({
    isLoggedIn,
    hasProfile,
    isLoadingProfile
}) => {
    if (isLoggedIn && hasProfile) {
        return <Tabs/>;
    }

    if (isLoggedIn && !isLoadingProfile) {
        return <Create/>;
    }

    return <Auth/>;
});

import {createSwitchNavigator} from 'react-navigation';
import Profile from '../../components/profile';
import Privacy from '../../components/privacy';
import {
    SCREEN_PROFILE,
    SCREEN_PRIVACY
} from '../../constants';

const nav = {
    [SCREEN_PROFILE]: {
        screen: Profile
    },
    [SCREEN_PRIVACY]: {
        screen: Privacy
    }
};

export default createSwitchNavigator(nav, {
    initialRouteName: SCREEN_PROFILE
});

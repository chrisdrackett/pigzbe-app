import {SwitchNavigator} from 'react-navigation';
import Profile from '../profile';
import Privacy from '../privacy';

const nav = {
    Profile: {
        screen: Profile
    },
    Privacy: {
        screen: Privacy
    }
};

export default SwitchNavigator(nav, {
    initialRouteName: 'Profile'
});

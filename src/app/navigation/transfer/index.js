import {createStackNavigator} from 'react-navigation';
import Transfer from '../../screens/transfer';
import Send from '../../screens/send';
import {
    SCREEN_TRANSFER,
    SCREEN_SEND
} from '../../constants';

const nav = {
    [SCREEN_TRANSFER]: {
        screen: Transfer
    },
    [SCREEN_SEND]: {
        screen: Send
    }
};

export default createStackNavigator(nav, {
    initialRouteName: SCREEN_TRANSFER,
    headerMode: 'none',
});

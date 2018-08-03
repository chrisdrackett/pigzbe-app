import {createSwitchNavigator} from 'react-navigation';
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

export default createSwitchNavigator(nav, {
    initialRouteName: SCREEN_TRANSFER
});

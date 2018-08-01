import {StyleSheet} from 'react-native';
import {color} from '../../styles';

export default StyleSheet.create({
    container: {
        backgroundColor: color.blue,
        flex: 1,
        justifyContent: 'space-between',
    },
    scroll: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
});

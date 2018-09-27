import {StyleSheet} from 'react-native';
import {color, fontFamily} from '../../styles';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 27,
    },
    container__small: {
        height: 23,
    },
    wollo: {
        width: 23,
        height: 23,
    },
    wollo__small: {
        width: 19,
        height: 19,
    },
    times: {
        width: 12,
        height: 12,
        marginLeft: 5,
        marginRight: 5,
    },
    text: {
        fontFamily,
        fontWeight: 'bold',
        fontSize: 20,
        color: color.blue,
    },
    text__small: {
        fontSize: 16,
    },
});

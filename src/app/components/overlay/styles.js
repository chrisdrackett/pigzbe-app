import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    overlay: {
        backgroundColor: color.blue,
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    title: {
        fontFamily,
        color: color.white,
        fontSize: 18
    },
    text: {
        fontFamily,
        color: color.white,
        fontSize: 16
    },
    button: {
        backgroundColor: color.yellow,
        width: 40,
        height: 40,
        position: 'absolute',
        bottom: 20,
        left: 20
    }
});

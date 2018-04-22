import {StyleSheet} from 'react-native';
import {
    container,
    color,
    fontFamily,
    paddingTop
} from '../../styles';

export default StyleSheet.create({
    container,
    welcome: {
        fontFamily,
        color: color.white,
        fontSize: 18
    },
    balance: {
        fontFamily,
        color: color.white,
        fontSize: 40
    },
    label: {
        fontFamily,
        color: color.white,
        fontSize: 18
    },
    settings: {
        backgroundColor: color.yellow,
        width: 40,
        height: 40,
        position: 'absolute',
        top: paddingTop + 20,
        right: 20
    }
});

import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily,
    paddingH
} from '../../styles';

export default StyleSheet.create({
    overlay: {
        backgroundColor: color.blue,
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 2
    },
    inner: {
        paddingLeft: paddingH,
        paddingRight: paddingH,
        paddingTop: paddingH
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
    closeBtn: {
        fontFamily,
        fontWeight: 'bold',
        color: color.white,
        fontSize: 16
    },
    settingsIcon: {
        width: 18,
        height: 18
    },
    settings: {
        width: 18,
        height: 18,
        position: 'absolute',
        top: 34,
        right: 20
    }
});

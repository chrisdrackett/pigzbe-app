import {StyleSheet} from 'react-native';
import {color, fontFamily} from '../../styles';

export default StyleSheet.create({
    overlay: {
        backgroundColor: color.blueOpacity80,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        borderRadius: 10,
        backgroundColor: color.white,
        paddingTop: 46,
        paddingBottom: 39,
        paddingLeft: 18,
        paddingRight: 18,
        justifyContent: 'center',
        alignItems: 'center',
        width: 263,
    },
    bar: {
        position: 'relative',
        backgroundColor: color.mediumGrey,
        borderRadius: 11.5,
        height: 23,
        width: 222,
        marginTop: 14,
        marginBottom: 14,
    },
    barInner: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: color.blue,
        borderRadius: 11.5,
        height: 23,
        width: 23,
    },
    barError: {
        width: 222,
        backgroundColor: color.red,
    },
    check: {
        width: 52,
        height: 51,
    },
    title: {
        fontFamily,
        color: color.darkGrey,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 26,
    },
    inner: {
        width: 216,
    },
    text: {
        fontFamily,
        color: color.mediumDarkGrey,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 30,
    },
    error: {
        color: color.red,
    },
});

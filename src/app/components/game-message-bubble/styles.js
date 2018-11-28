import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    boxOuter: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 15,
        maxWidth: 230,
        marginBottom: 12,
        marginTop: 12,
        paddingTop: 2,
    },
    boxInner: {
        backgroundColor: 'white',
        borderRadius: 15,
        position: 'relative',
        bottom: 2,
    },
    boxInnerTop: {
        backgroundColor: 'rgb(0, 50, 120)',
    },
    textContainer: {
        padding: 15,
    },
    text: {
        fontFamily,
        color: color.blue,
        fontSize: 14,
        fontWeight: 'bold',
    },
    textTop: {
        color: color.white,
    },
    tail: {
        width: 16,
        height: 16,
        position: 'absolute',
        left: 20,
        bottom: 0,
    },
    tailContainer: {
        position: 'absolute',
        top: 1,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    tailTop: {
        width: 16,
        height: 16,
    },
});

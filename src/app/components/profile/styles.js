import {StyleSheet} from 'react-native';
import {
    input,
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    outer: {
        backgroundColor: color.blue,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    avatar: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    avatarText: {
        fontFamily,
        color: color.whiteOpacity60,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 20
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    },
    title: {
        fontFamily,
        color: color.white,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 0,
        marginTop: 10
    },
    error: {
        fontFamily,
        color: color.red,
        fontSize: 18
    },
    input,
    inputError: {
        ...input,
        borderColor: color.red
    }
});

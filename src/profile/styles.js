import {StyleSheet} from 'react-native';
import {
    container,
    input,
    color,
    fontFamily
} from '../styles';

export default StyleSheet.create({
    container,
    avatar: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    avatarText: {
        fontFamily,
        color: color.white,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20
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
        fontSize: 50,
        textAlign: 'center',
        marginBottom: 20
    },
    subscribe: {
        flex: 1,
        flexDirection: 'row'
    },
    subscribeText: {
        fontFamily,
        color: color.white,
        fontSize: 20,
        marginRight: 10
    },
    error: {
        fontFamily,
        color: color.red,
        fontSize: 18
    },
    input,
    inputError: {
        ...input,
        borderColor: '#ff0000'
    }
});

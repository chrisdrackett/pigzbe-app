import {StyleSheet} from 'react-native';
import {
    container,
    input,
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    container: {
        ...container,
        paddingLeft: '9.375%',
        paddingRight: '9.375%',
        flex: 0
    },
    avatar: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    avatarText: {
        fontFamily,
        color: color.white,
        fontSize: 14,
        opacity: 0.6,
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
        marginBottom: 20,
        marginTop: 10
    },
    subscribe: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 25,
        marginBottom: 25,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10
    },
    subscribeText: {
        fontFamily,
        color: color.white,
        fontSize: 14,
        fontWeight: 'bold',
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

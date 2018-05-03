import {StyleSheet} from 'react-native';
import {
    container,
    input,
    color,
    fontFamily,
    paddingH
} from '../../styles';

export default StyleSheet.create({
    scrollContainer: {
        position: 'relative',
        backgroundColor: color.blue,
        alignSelf: 'stretch'
    },
    container: {
        ...container,
        paddingLeft: paddingH,
        paddingRight: paddingH,
        justifyContent: 'flex-start'
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
    subscribe: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        alignSelf: 'stretch',
    },
    subscribeText: {
        fontFamily,
        color: color.white,
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 10
    },
    buttonContainer: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexGrow: 2
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

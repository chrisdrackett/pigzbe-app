import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.blue,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    },
    transparent: {
        backgroundColor: color.blueOpacity40,
    },
    light: {
        backgroundColor: color.lightGrey,
    },
    message: {
        fontFamily,
        fontWeight: 'bold',
        color: color.white,
        fontSize: 12,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20
    },
    messageLight: {
        color: color.blue
    }
});

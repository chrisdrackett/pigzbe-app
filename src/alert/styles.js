import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily
} from '../styles';

export default StyleSheet.create({
    error: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: color.red,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        height: 80
    },
    message: {
        fontFamily,
        color: color.white,
        fontSize: 16,
        textAlign: 'left',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 40,
        marginRight: 20
    },
    dismiss: {
        marginRight: 20
    }
});

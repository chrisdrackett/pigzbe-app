import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    error: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: color.orange,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        paddingTop: 20,
    },
    message: {
        fontFamily,
        color: color.white,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        width: '75%',
    },
    dismiss: {
        marginRight: 10
    },
    closeIcon: {
        width: 16,
        height: 16
    },
    close: {
        width: 40,
        height: 40,
        padding: 12,
    },
});

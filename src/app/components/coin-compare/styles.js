import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexShrink: 0,
        marginBottom: 20,
        width: '32%',
        minWidth: 85,
    },
    coin: {
        marginBottom: 15
    },
    coinName: {
        fontFamily,
        fontSize: 14,
        fontWeight: 'bold',
        color: color.darkPurple
    },
    value: {
        fontFamily,
        fontWeight: 'bold',
        fontSize: 14,
        color: color.darkPurple,
        opacity: 0.5
    }
});

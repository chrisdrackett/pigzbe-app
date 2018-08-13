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
        width: '26%',
        minWidth: '26%'
    },
    coin: {
        marginBottom: 12
    },
    coinName: {
        fontFamily,
        fontSize: 10,
        fontWeight: 'bold',
        color: color.lighterBlue
    },
    value: {
        fontFamily,
        fontWeight: 'bold',
        fontSize: 12,
        color: color.blue,
    }
});

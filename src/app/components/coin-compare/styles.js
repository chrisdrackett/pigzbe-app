import {StyleSheet, Dimensions} from 'react-native';
import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        minWidth: (Dimensions.get('window').width / 4) - 1,
        marginBottom: 20
    },
    coin: {
        width: 35,
        height: 35,
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

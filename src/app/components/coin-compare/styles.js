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
        marginBottom: 15
    },
    coinName: {
        fontFamily,
        fontSize: 14,
        fontWeight: 'bold',
        color: color.darkGrey
    },
    value: {
        fontFamily,
        fontWeight: 'bold',
        fontSize: 14,
        color: color.darkGreyOpacity50,
    }
});

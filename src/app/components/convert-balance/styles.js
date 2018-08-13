import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    container: {
        backgroundColor: color.white,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20,
        marginBottom: 40,
    },
    containerCoins: {
        flexDirection: 'row',
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
    },
    title: {
        fontFamily,
        fontSize: 16,
        color: color.blue,
        marginTop: 20,
    },
    bold: {
        fontWeight: 'bold',
    },
    label: {
        fontFamily,
        fontSize: 10,
        fontWeight: 'bold',
        color: color.lighterBlue
    },
    underline: {
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: color.lighterBlue,
    },
});

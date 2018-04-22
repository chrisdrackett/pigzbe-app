import {StyleSheet} from 'react-native';
import {
    container,
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    container,
    message: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: color.white
    },
    title: {
        fontFamily,
        color: color.white,
        fontSize: 18,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    date: {
        fontFamily,
        color: color.white,
        fontSize: 14
    },
    text: {
        fontFamily,
        color: color.white,
        fontSize: 16
    }
});

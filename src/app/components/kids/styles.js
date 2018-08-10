import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily,
    paddingH
} from '../../styles';

export default StyleSheet.create({
    container: {
        backgroundColor: color.mediumBlue,
        paddingLeft: paddingH,
        paddingRight: paddingH,
        paddingTop: 20,
        paddingBottom: 20,
    },
    title: {
        fontFamily,
        color: color.white,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12,
    },
    kid: {
        backgroundColor: color.white,
        borderColor: color.white,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
    },
});

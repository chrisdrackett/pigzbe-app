import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    text: {
        fontFamily,
        color: color.blue,
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 10
    },
    checkbox: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    outer: {
        width: 30,
        height: 30,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    outerInactive: {
        backgroundColor: color.white,
        borderColor: color.lighterBlue,
        borderWidth: 1,
        borderStyle: 'solid',
    },
    outerActive: {
        backgroundColor: color.turquoise,
        borderColor: color.turquoise,
        borderWidth: 1,
        borderStyle: 'solid',
    },
    innerInactive: {
        width: 16,
        height: 16,
        opacity: 0.3,
    },
    innerActive: {
        width: 16,
        height: 16,
        opacity: 1,
    },
    inner: {
        width: 16,
        height: 16,
    }
});

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
        justifyContent: 'space-between',
        alignSelf: 'stretch',
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
        borderWidth: 1,
        borderColor: color.blue,
        borderStyle: 'solid',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerInactive: {
        width: 16,
        height: 16,
        backgroundColor: color.blue,
        opacity: 0.3,
        borderRadius: 8
    },
    innerActive: {
        width: 16,
        height: 16,
        backgroundColor: color.blue,
        opacity: 1,
        borderRadius: 8
    },
});

import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    container: {
        backgroundColor: color.white,
        height: 29,
        borderRadius: 29 / 2,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 3,
        paddingRight: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wollo: {
        width: 23,
        height: 23,
    },
    times: {
        width: 12,
        height: 12,
        marginLeft: 5,
        marginRight: 5,
    },
    text: {
        fontFamily,
        fontWeight: 'bold',
        fontSize: 20,
        color: color.blue,
        lineHeight: 26,
    },
});

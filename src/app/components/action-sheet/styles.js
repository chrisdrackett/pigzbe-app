import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.blueOpacity80,
    },
    inner: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'flex-end',
    },
    options: {
        backgroundColor: color.lightGrey,
        marginBottom: 6,
        borderRadius: 5,
    },
    option: {
        paddingTop: 20,
        paddingBottom: 20,
        borderTopWidth: 1,
        borderTopColor: color.mediumGrey,

    },
    optionText: {
        fontFamily,
        color: color.blue,
        textAlign: 'center',
    },
    title: {
        fontFamily,
        color: color.grey,
        paddingTop: 15,
        paddingBottom: 15,
        textAlign: 'center',
        fontSize: 12,
    },
    button: {
        borderRadius: 5,
    },
});

import {StyleSheet} from 'react-native';
import {color} from '../../styles';

export default StyleSheet.create({
    text: {
        color: 'white',
        textAlign: 'center',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        backgroundColor: 'white',
        height: 21,
        borderRadius: 10,
        width: '45%',
        textAlign: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: color.blue,
        lineHeight: 21,
    },
    bubbleWrap: {
        marginTop: 20,
    },
    outer: {
        position: 'relative',
        width: 157,
        height: 66,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    },
});

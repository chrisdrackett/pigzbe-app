import {StyleSheet, Dimensions} from 'react-native';
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
        marginTop: 50,
    },
    outer: {
        position: 'absolute',
        width: 157,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        top: 0,
        left: Dimensions.get('window').width / 2,
        marginLeft: -79,
    },
});

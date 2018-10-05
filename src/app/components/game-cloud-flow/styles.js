import {StyleSheet, Dimensions} from 'react-native';
import {color} from '../../styles';

const WIDTH = 260;

export default StyleSheet.create({
    text: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    button: {
        backgroundColor: 'white',
        height: 21,
        borderRadius: 10,
        width: 100,
        textAlign: 'center',
        marginLeft: 8,
        marginRight: 8,
    },
    buttonText: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: color.blue,
        lineHeight: 21,
        fontSize: 12,
    },
    bubbleWrap: {
        marginTop: 20,
    },
    outer: {
        position: 'absolute',
        width: WIDTH,
        justifyContent: 'center',
        alignContent: 'center',
        top: 0,
        left: (Dimensions.get('window').width - WIDTH) / 2,
    },
    cloud: {
        left: (WIDTH - 157) / 2,
    },
});

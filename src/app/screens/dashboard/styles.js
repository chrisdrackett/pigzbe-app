import {StyleSheet, Dimensions} from 'react-native';
import {color, fontFamily} from 'app/styles';

const w = Math.min(300, Dimensions.get('window').width - 40);

export default StyleSheet.create({
    header: {
        alignItems: 'center',
        marginTop: 20,
        height: 130,
    },
    bubbleWrapper: {
        marginBottom: 0,
    },
    bubble: {
        maxWidth: w,
        width: w,
        marginTop: 0,
    },
    bubbleTailStyle: {
        left: w / 2 - 5,
    },
    bubbleTextStyle: {
        fontFamily,
        color: color.blue,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bubbleTextUnderline: {
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: color.blue,
    },
});

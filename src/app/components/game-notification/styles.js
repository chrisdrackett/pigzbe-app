import {StyleSheet} from 'react-native';
import {color, fontFamily} from '../../styles';

export default StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: 156,
    },
    cloud: {
        width: 156,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    amount: {
        marginTop: 6,
        marginBottom: 4,
    },
    text: {
        fontFamily,
        fontWeight: 'bold',
        fontSize: 10,
        color: color.blue,
        textAlign: 'center',
        width: 80,
        lineHeight: 12,
    },
});

import {StyleSheet} from 'react-native';
import {color, fontFamily} from '../../styles';

export default StyleSheet.create({
    title: {
        textAlign: 'center',
        marginTop: 28,
    },
    qrCode: {
        alignItems: 'center',
    },
    keyText: {
        color: color.blue,
        fontFamily,
        fontWeight: 'bold',
        fontSize: 11,
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
        width: 220,
    },
});

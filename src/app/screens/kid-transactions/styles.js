import {StyleSheet} from 'react-native';
import {color, fontFamily} from '../../styles';

export default StyleSheet.create({
    header: {
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 10,
    },
    name: {
        fontFamily,
        color: color.white,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 6,
    },
});

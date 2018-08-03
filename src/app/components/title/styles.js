import {StyleSheet} from 'react-native';
import {color, fontFamily} from '../../styles';

export default StyleSheet.create({
    title: {
        fontFamily,
        color: color.white,
        fontSize: 22,
        fontWeight: 'bold',
    },
    dark: {
        color: color.blue,
        marginBottom: 10,
    },
});

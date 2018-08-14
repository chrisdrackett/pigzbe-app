import {StyleSheet} from 'react-native';
import {color} from '../../styles';

export default StyleSheet.create({
    numpad: {
        backgroundColor: color.white,
        alignItems: 'center',
        paddingBottom: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 250,
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    flexEl: {
        width: '33.3%',
        marginBottom: 10,
        alignItems: 'center',
    },
});

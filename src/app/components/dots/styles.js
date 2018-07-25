import {StyleSheet} from 'react-native';
import {color} from '../../styles';

export default StyleSheet.create({
    dots: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 284,
        height: 60,
    },
    dot: {
        borderColor: color.white,
        borderWidth: 1,
        borderRadius: 4.5,
        width: 9,
        height: 9,
        margin: 3,
    },
    dotActive: {
        backgroundColor: color.pink,
        borderColor: color.pink,
        borderWidth: 1,
        borderRadius: 7.5,
        width: 15,
        height: 15,
    },
});

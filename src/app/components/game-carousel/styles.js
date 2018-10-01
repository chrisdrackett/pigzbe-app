import {StyleSheet} from 'react-native';
import {color} from '../../styles';

export default StyleSheet.create({
    wrapper: {
        alignItems: 'center',
    },
    itemWrapper: {
        alignItems: 'center',
    },
    dotsWrapper: {
        marginTop: 10,
    },
    dots: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    dot: {
        backgroundColor: color.blue,
        borderRadius: 3,
        width: 6,
        height: 6,
        margin: 3,
        opacity: 0.5,
    },
    dot__light: {
        backgroundColor: color.white,
    },
    dot__active: {
        opacity: 1,
    },
});

import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily,
    paddingH
} from '../../styles';

export default StyleSheet.create({
    valueWrapper: {
        position: 'relative',
        marginLeft: 20,
        marginRight: 20,
    },
    value: {
        backgroundColor: color.blue,
        borderRadius: 5,
        color: color.white,
        width: 34,
        height: 28,
        paddingTop: 4,
        marginLeft: -17,
        marginBottom: 5,
    },
    valuePoint: {
        backgroundColor: color.blue,
        width: 5,
        height: 5,
        bottom: 0,
        left: 15,
        transform: [{rotate: '45deg'}]
    },
    valueText: {
        fontFamily,
        color: color.white,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    exchange: {
        fontFamily,
        color: color.lighterBlue,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'right',
        marginBottom: 10,
        paddingRight: 6,
    },
});

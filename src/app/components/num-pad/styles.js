import {StyleSheet} from 'react-native';
import {color, fontFamily} from '../../styles';

export default StyleSheet.create({
    numpad: {
        backgroundColor: color.white,
        alignItems: 'center',
        marginTop: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 284,
        height: 60,
    },
    numKey: {
        backgroundColor: color.white,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    num: {
        fontFamily,
        color: color.blue,
        fontSize: 38,
        textAlign: 'center',
    },
    del: {
        width: 26,
        height: 19
    },
});

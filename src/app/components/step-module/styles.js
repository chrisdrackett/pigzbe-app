import {StyleSheet} from 'react-native';

import {
    paddingH,
    color,
} from '../../styles';

export default StyleSheet.create({
    containerText: {
        paddingLeft: paddingH,
        paddingRight: paddingH,
        paddingTop: 30,
    },
    pad: {
        paddingTop: 30,
        paddingBottom: 12,
        paddingLeft: paddingH,
        paddingRight: paddingH,
    },
    bg: {
        backgroundColor: color.mediumBlue,
        height: '50%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    error: {
        color: color.red,
    }
});

import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    input: {
        flex: 1,
        fontFamily,
        color: color.blue,
        fontSize: 14,
        fontWeight: 'bold',
        textAlignVertical: 'top',
        lineHeight: 21,
    },
});

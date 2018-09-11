import {StyleSheet} from 'react-native';

import {
    color
} from '../../styles';

export default StyleSheet.create({
    container: {
        backgroundColor: color.lighterBlue,
        height: 45,
        borderRadius: 22.5,
        width: 80,
        position: 'relative',
    },
    text: {
        color: color.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    wollo: {
        position: 'absolute',
        left: 14,
        top: 16,
        width: 16,
        height: 13,
    },
    currency: {
        position: 'absolute',
        right: 17,
        top: 13,
    },
    handle: {
        position: 'absolute',
        backgroundColor: color.blue,
        height: 41,
        width: 41,
        borderRadius: 20.5,
        top: 2,
        shadowColor: color.black,
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 2,
    }
});

import {StyleSheet} from 'react-native';

import {
    color
} from '../../styles';

export default StyleSheet.create({
    container: {
        backgroundColor: color.lighterBlue,
        height: 50,
        borderRadius: 25,
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
        left: 16,
        top: 18,
        width: 16,
        height: 13,
    },
    currency: {
        position: 'absolute',
        right: 16,
        top: 15,
    },
    handle: {
        position: 'absolute',
        backgroundColor: color.blue,
        height: 46,
        width: 46,
        borderRadius: 23,
        top: 2,
        shadowColor: color.black,
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 2,
    }
});

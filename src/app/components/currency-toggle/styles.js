import {StyleSheet} from 'react-native';

import {
    color
} from '../../styles';

export default StyleSheet.create({
    container: {
        backgroundColor: color.lighterBlue,
        height: 50,
        borderRadius: 25,
        width: 84,
        position: 'relative',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center'
    },
    text: {
        color: color.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '42%'
    },
    icon: {
        height: 20,
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

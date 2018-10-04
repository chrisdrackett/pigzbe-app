import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    modal: {
        margin: 0,
    },
    container: {
        flex: 1,
    },
    spacer: {
        height: '45%',
    },
    title: {
        fontFamily,
        color: color.white,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    dots: {
        alignItems: 'center',
        marginBottom: 10,
    },
    loader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    backIcon: {
        position: 'absolute',
        left: 10,
        top: 40,
    },
});

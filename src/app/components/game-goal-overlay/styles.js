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
        height: '50%',
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
    }
});

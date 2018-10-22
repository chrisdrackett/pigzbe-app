import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    container: {
        backgroundColor: color.blue,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '20%',
        paddingRight: '20%',
    },
    text: {
        fontFamily,
        color: color.white,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
})
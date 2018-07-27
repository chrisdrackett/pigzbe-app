import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily,
    paddingH
} from '../../styles';

export default StyleSheet.create({
    list: {
    },
    listItem: {
        marginBottom: 20,
        paddingLeft: 30,
        position: 'relative',
    },
    text: {
        fontFamily,
        color: color.blue,
        fontSize: 14,
        textAlign: 'left',
        marginBottom: 10,
    },
    num: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    error: {
        color: color.red,
        fontSize: 18
    },
    warning: {
        color: color.orange,
        fontWeight: 'bold',
    },
    modalConfirm: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        paddingLeft: paddingH,
        paddingRight: paddingH,
        paddingTop: 20,
        paddingBottom: 20,
    },
    modalTitle: {
        fontFamily,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalTitleCost: {
        marginBottom: 30,
    },
    modalText: {
        fontFamily,
        fontSize: 14,
        marginBottom: 30,
        textAlign: 'center',
    },
});

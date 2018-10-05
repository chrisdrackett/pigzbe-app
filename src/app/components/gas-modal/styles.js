import {StyleSheet} from 'react-native';
import {fontFamily, paddingH} from '../../styles';

export default StyleSheet.create({
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

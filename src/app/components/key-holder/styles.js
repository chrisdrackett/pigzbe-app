import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    boxKeys: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: color.white,
        paddingTop: 20,
        paddingBottom: 10,
        paddingLeft: 18,
        paddingRight: 18,
        marginTop: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    boxKeysTitle: {
        fontFamily,
        color: color.white,
        fontWeight: 'bold',
        fontSize: 10,
        textAlign: 'center',
        backgroundColor: color.blue,
        marginTop: -28,
        alignSelf: 'center',
        paddingLeft: 8,
        paddingRight: 8,
    },
    boxTx: {
        backgroundColor: color.green
    },
    boxKeysInner: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    boxKeysText: {
        fontFamily,
        color: color.white,
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'left',
        width: 165,
    },
    boxKeysCopy: {
        width: 45,
        height: 45,
    },
});

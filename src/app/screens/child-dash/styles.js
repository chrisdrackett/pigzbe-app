import {StyleSheet} from 'react-native';
import {color, fontFamily, paddingH} from '../../styles';

export default StyleSheet.create({
    header: {
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 10,
    },
    name: {
        fontFamily,
        color: color.white,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 6,
    },
    box: {
        backgroundColor: color.white,
        borderColor: color.white,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingTop: 20,
        paddingBottom: 12,
        paddingLeft: paddingH,
        paddingRight: paddingH,
    },
    panel: {
        marginTop: 8,
    },
    panelFirst: {
        marginTop: 18,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    itemTitle: {
        fontFamily,
        color: color.blue,
        fontSize: 14,
        fontWeight: 'bold',
    },
    itemSubTitle: {
        fontWeight: 'normal',
    },
    itemBorder: {
        borderTopWidth: 1,
        borderTopColor: color.greyBlue,
        paddingTop: 12,
        marginTop: 8,
    },
    itemAmount: {
        minWidth: 80,
        alignItems: 'flex-end',
    },
    iconOverflow: {
    }
});

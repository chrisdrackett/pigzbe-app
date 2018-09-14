import {StyleSheet} from 'react-native';
import {
    input,
    color,
    fontFamily,
    paddingH
} from '../../styles';

export default StyleSheet.create({
    section: {
        backgroundColor: color.white,
        borderRadius: 5,
        paddingLeft: paddingH,
        paddingRight: paddingH,
        paddingTop: 25,
        paddingBottom: 25,
        marginBottom: 15,
    },
    sectionNoVPadding: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    sectionTitle: {
        fontFamily,
        fontWeight: 'bold',
        fontSize: 18,
        color: color.white,
        marginBottom: 15,
        textAlign: 'center',
    },
    item: {
        flexDirection: 'row',
        borderBottomColor: color.mediumGrey,
        borderBottomWidth: 1,
    },
    itemLast: {
        marginBottom: 0,
        borderBottomWidth: 0,
    },
    itemInner: {
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    itemName: {
        fontFamily,
        color: color.blue,
        fontWeight: 'bold',
    },
    itemValue: {
        fontFamily,
        color: color.lighterBlue,
        fontSize: 14,
    },
});

import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        borderRadius: 15,
        backgroundColor: color.white,
        paddingTop: 12,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 284,
        height: 454,
    },
    close: {
        position: 'absolute',
        top: 15,
        right: 15,
        paddingTop: 12,
        paddingRight: 12,
        paddingBottom: 12,
        paddingLeft: 12,
    },
    title: {
        fontFamily,
        fontWeight: 'bold',
        color: color.blue,
        fontSize: 25,
        marginTop: 8,
        marginBottom: 5,
        textAlign: 'center',
    },
    text: {
        fontFamily,
        fontWeight: 'bold',
        color: color.blue,
        fontSize: 14,
        textAlign: 'center',
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
    itemBorder: {
        borderTopWidth: 1,
        borderTopColor: color.greyBlue,
        paddingTop: 12,
        marginTop: 8,
    },
    itemAmount: {
        minWidth: 80,
        alignItems: 'flex-start'
    },
    button: {
        position: 'absolute',
        bottom: 12,
        right: 18
    }
});

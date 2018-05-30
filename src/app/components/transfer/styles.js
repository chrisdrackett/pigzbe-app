import {StyleSheet} from 'react-native';
import {
    container,
    color,
    fontFamily,
    paddingH
} from '../../styles';

export default StyleSheet.create({
    container,
    pig: {
        marginTop: 20,
    },
    containerBody: {
        backgroundColor: color.red,
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    buttonWrapper: {
        backgroundColor: color.lightGrey,
        height: 95,
        flexBasis: 95,
        flexGrow: 0,
        paddingLeft: paddingH,
        paddingRight: paddingH,
        paddingTop: 20,
        paddingBottom: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },

    transaction: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: color.mediumGrey
    },
    date: {
        fontFamily,
        color: color.blue,
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 5
    },
    text: {
        fontFamily,
        color: color.darkGrey,
        fontSize: 14
    },
    address: {
        fontFamily,
        color: color.darkGrey,
        fontSize: 10,
        maxWidth: '100%',
        overflow: 'hidden',
    },
});

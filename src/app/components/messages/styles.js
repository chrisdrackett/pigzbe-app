import {StyleSheet} from 'react-native';
import {
    container,
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    container,
    containerHeader: {
        height: 162,
        flexBasis: 162,
        flexGrow: 0,
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    containerBody: {
        backgroundColor: color.lightGrey,
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily,
        color: color.white,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        textAlign: 'center'
    },
    message: {
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
    border: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        height: 5,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1
    }
});

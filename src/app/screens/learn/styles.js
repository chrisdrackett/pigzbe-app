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
        alignSelf: 'stretch',
        position: 'absolute',
        top: 30,
        left: 16,
        bottom: 25,
        right: 16,
    },
    close: {
        backgroundColor: color.white,
        position: 'absolute',
        top: 15,
        right: 15,
        width: 40,
        height: 40,
        paddingTop: 12,
        paddingRight: 12,
        paddingBottom: 12,
        paddingLeft: 12,
    },
    closeImg: {
        width: 16,
        height: 16
    },
    rabbit: {
        width: 63,
        height: 85
    },
    title: {
        fontFamily,
        fontWeight: 'bold',
        color: color.blue,
        fontSize: 25,
        marginTop: 8,
        marginBottom: 5,
    },
    text: {
        fontFamily,
        fontWeight: 'bold',
        color: color.blue,
        fontSize: 14,
        textAlign: 'center',
    },
    containerText: {
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    containerButtons: {
        width: 220,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10,
    },
    containerComparison: {
        width: 260,
        height: 150,
        flexDirection: 'row',
        alignContent: 'flex-start',
        marginTop: 10,
        justifyContent: 'space-between',
    },
    containerBlockCompare: {
        width: 110,
    },
    pile: {
        width: 90,
        height: 90,
        marginLeft: 10,
        marginRight: 10,
    },
    equals: {
        width: 25,
        height: 21,
        marginTop: 50,
    },
    textCompare: {
        fontFamily,
        fontWeight: 'bold',
        fontSize: 14,
        color: color.blue,
        textAlign: 'center',
        width: 110,
    },
    button: {
        position: 'absolute',
        bottom: 25,
        left: 18
    }
});

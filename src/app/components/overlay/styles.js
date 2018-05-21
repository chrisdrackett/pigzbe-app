import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    overlay: {
        backgroundColor: color.blueOpacity40,
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
        borderRadius: 10,
        backgroundColor: color.mediumBlue,
        width: '90%',
        maxHeight: '80%',
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerButtons: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        marginBottom: 30,
    },
    containerCoins: {
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignContent: 'center',
        marginBottom: 10,
        justifyContent: 'center',
    },
    coin: {
        width: 20,
        height: 20,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 0,
        marginBottom: 5,
    },
    equal: {
        fontFamily,
        fontSize: 25,
        color: color.white,
        alignSelf: 'center',
        width: 130,
        marginTop: -30,
        textAlign: 'center',
    },
    textCompare: {
        fontFamily,
        fontSize: 16,
        color: color.white,
        textAlign: 'center',
        justifyContent: 'center'
    },
    containerComparison: {
        width: '90%',
        height: 'auto',
        marginTop: 30,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    containerBlockCompare: {
        maxWidth: '45%',
        justifyContent: 'center',
    },
    title: {
        fontFamily,
        color: color.white,
        fontSize: 30
    },
    text: {
        fontFamily,
        color: color.white,
        fontSize: 16
    },
    button: {
        position: 'absolute',
        bottom: 20,
        left: 18
    }
});

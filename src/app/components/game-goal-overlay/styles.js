import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily
} from '../../styles';
import isIphoneX from 'app/utils/is-iphonex';

export default StyleSheet.create({
    modal: {
        margin: 0,
    },
    container: {
        flex: 1,
    },
    spacer: {
        height: '41%',
    },
    title: {
        fontFamily,
        color: color.white,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    dots: {
        alignItems: 'center',
        marginBottom: 10,
    },
    loader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    backIcon: {
        position: 'absolute',
        left: 15,
        top: isIphoneX ? 60 : 30,
    },
    goalValueWrap: {
        width: 87,
        height: 26,
        position: 'relative',
        alignSelf: 'center',
        marginBottom: 5,
    },
    goalBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    goalValue: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 10,
        fontWeight: 'bold',
        marginTop: 2,
    },
    newGoal: {
        paddingTop: 20,
    },
    balance: {
        alignItems: 'center',
        marginTop: '20%',
    },
    balanceText: {
        color: 'white',
        fontFamily,
        fontWeight: 'bold',
        fontSize: 16,
    },
});

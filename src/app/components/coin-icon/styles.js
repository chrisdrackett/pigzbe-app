import {StyleSheet} from 'react-native';
import {color, fontFamily} from 'app/styles';

export default StyleSheet.create({
    coin: {
        width: 40,
        height: 40,
    },
    coinSmall: {
        width: 23,
        height: 23,
    },
    coinHolder: {
        borderRadius: 20,
        backgroundColor: color.blue,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 3,
    },
    coinText: {
        fontFamily,
        color: color.white,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

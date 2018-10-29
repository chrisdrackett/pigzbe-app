import {StyleSheet, Dimensions} from 'react-native';
import {color} from '../../styles';

export default StyleSheet.create({
    buttonStyle: {
        borderColor: color.blue,
        fontSize: 14,
        paddingTop: 10,
        lineHeight: 40,
        marginBottom: 20,
        width: '45%',
        textAlign: 'center',
    },
    innerStyle: {
        borderRadius: 22.5,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').width > 450 ? 45 : Dimensions.get('window').width * 0.35,
    },
    flexStyle: {
        display: 'flex',
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
